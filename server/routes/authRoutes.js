const express = require('express');
const rateLimit = require('express-rate-limit');
const {
  signup,
  login,
  refresh,
  logout,
  me,
} = require('../controllers/authController');
const { authenticateAccessToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Rate limiters for auth endpoints to mitigate brute-force attacks
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 6, // limit each IP to 6 login requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit signups per IP
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/signup', signupLimiter, signup);
router.post('/login', loginLimiter, login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', authenticateAccessToken, me);

module.exports = router;
