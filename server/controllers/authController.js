const RefreshToken = require('../models/RefreshToken');
const User = require('../models/User');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  hashToken,
  createJti,
  decodeTokenExpiryMs,
} = require('../utils/tokenService');

const COOKIE_NAME = 'refreshToken';

function getRefreshCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/api/auth',
  };
}

function buildTokenPayload(user) {
  return {
    sub: String(user._id),
    email: user.email,
  };
}

async function issueTokensAndPersistRefresh(req, user, previousTokenDoc = null) {
  const accessToken = generateAccessToken(buildTokenPayload(user));
  const jti = createJti();

  const refreshToken = generateRefreshToken({
    ...buildTokenPayload(user),
    jti,
  });

  const refreshTokenDoc = await RefreshToken.create({
    user: user._id,
    jti,
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + decodeTokenExpiryMs(refreshToken)),
    createdByIp: req.ip,
    userAgent: req.get('user-agent') || null,
  });

  if (previousTokenDoc) {
    previousTokenDoc.revokedAt = new Date();
    previousTokenDoc.replacedByJti = jti;
    await previousTokenDoc.save();
  }

  return {
    accessToken,
    refreshToken,
    refreshTokenDoc,
  };
}

function sendAuthResponse(req, res, statusCode, user, tokenBundle) {
  res
    .cookie(COOKIE_NAME, tokenBundle.refreshToken, getRefreshCookieOptions())
    .status(statusCode)
    .json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken: tokenBundle.accessToken,
      refreshToken: tokenBundle.refreshToken,
    });
}

async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: 'Name, email, and password are required' });
      return;
    }

    if (String(password).length < 8) {
      res.status(400).json({ message: 'Password must be at least 8 characters long' });
      return;
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      res.status(409).json({ message: 'Email already in use' });
      return;
    }

    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password,
    });

    const tokenBundle = await issueTokensAndPersistRefresh(req, user);

    sendAuthResponse(req, res, 201, user, tokenBundle);
  } catch (error) {
    console.error('Signup error:', error);
    if (error && error.code === 11000) {
      res.status(409).json({ message: 'Email already in use' });
      return;
    }

    res.status(500).json({ message: 'Failed to sign up user' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const passwordMatches = await user.comparePassword(password);

    if (!passwordMatches) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const tokenBundle = await issueTokensAndPersistRefresh(req, user);

    sendAuthResponse(req, res, 200, user, tokenBundle);
  } catch (_error) {
    console.error('Login error:', _error);
    res.status(500).json({ message: 'Failed to log in user' });
  }
}

async function refresh(req, res) {
  try {
    const suppliedToken = req.cookies[COOKIE_NAME] || req.body.refreshToken;

    if (!suppliedToken) {
      res.status(401).json({ message: 'Refresh token is required' });
      return;
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(suppliedToken);
    } catch (_error) {
      res.status(401).json({ message: 'Invalid or expired refresh token' });
      return;
    }

    const tokenDoc = await RefreshToken.findOne({
      user: decoded.sub,
      jti: decoded.jti,
    });

    if (!tokenDoc || tokenDoc.revokedAt || tokenDoc.expiresAt <= new Date()) {
      res.status(401).json({ message: 'Refresh token has been revoked or expired' });
      return;
    }

    const tokenHash = hashToken(suppliedToken);
    if (tokenDoc.tokenHash !== tokenHash) {
      tokenDoc.revokedAt = new Date();
      await tokenDoc.save();
      res.status(401).json({ message: 'Refresh token is invalid' });
      return;
    }

    const user = await User.findById(decoded.sub);
    if (!user) {
      tokenDoc.revokedAt = new Date();
      await tokenDoc.save();
      res.status(401).json({ message: 'User not found' });
      return;
    }

    const tokenBundle = await issueTokensAndPersistRefresh(req, user, tokenDoc);

    sendAuthResponse(req, res, 200, user, tokenBundle);
  } catch (_error) {
    console.error('Refresh error:', _error);
    res.status(500).json({ message: 'Failed to refresh token' });
  }
}

async function logout(req, res) {
  try {
    const suppliedToken = req.cookies[COOKIE_NAME] || req.body.refreshToken;

    if (suppliedToken) {
      try {
        const decoded = verifyRefreshToken(suppliedToken);
        const tokenDoc = await RefreshToken.findOne({
          user: decoded.sub,
          jti: decoded.jti,
        });

        if (tokenDoc && !tokenDoc.revokedAt) {
          tokenDoc.revokedAt = new Date();
          await tokenDoc.save();
        }
      } catch (_error) {
        // Ignore invalid token on logout to keep the endpoint idempotent.
      }
    }

    res
      .clearCookie(COOKIE_NAME, getRefreshCookieOptions())
      .status(200)
      .json({ message: 'Logged out successfully' });
  } catch (_error) {
    console.error('Logout error:', _error);
    res.status(500).json({ message: 'Failed to log out user' });
  }
}

async function me(req, res) {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (_error) {
    console.error('Profile lookup error:', _error);
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
}

module.exports = {
  signup,
  login,
  refresh,
  logout,
  me,
};
