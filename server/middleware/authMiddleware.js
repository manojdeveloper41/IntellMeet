const { verifyAccessToken } = require('../utils/tokenService');

function authenticateAccessToken(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    res.status(401).json({ message: 'Missing access token' });
    return;
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = {
      id: decoded.sub,
      email: decoded.email,
    };
    next();
  } catch (_error) {
    res.status(401).json({ message: 'Invalid or expired access token' });
  }
}

module.exports = {
  authenticateAccessToken,
};
