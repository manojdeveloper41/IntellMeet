const express = require('express');
const multer = require('multer');
const { authenticateAccessToken } = require('../middleware/authMiddleware');
const { upsertProfile, uploadAvatar } = require('../controllers/profileController');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/', authenticateAccessToken, upsertProfile);
router.post('/avatar', authenticateAccessToken, upload.single('avatar'), uploadAvatar);

module.exports = router;
