const User = require('../models/User');
const cloudinary = require('../utils/cloudinary');

async function upsertProfile(req, res) {
  try {
    const { name } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (name) user.name = String(name).trim();

    await user.save();

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl || null,
      },
    });
  } catch (error) {
    console.error('Profile upsert error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
}

async function uploadAvatar(req, res) {
  try {
    if (!req.file || !req.file.buffer) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'intellmeet/avatars', resource_type: 'image', transformation: [{ width: 500, height: 500, crop: 'limit' }] },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          res.status(500).json({ message: 'Failed to upload avatar' });
          return;
        }

        user.avatarUrl = result.secure_url;
        user.avatarPublicId = result.public_id;
        await user.save();

        res.status(200).json({ avatarUrl: user.avatarUrl });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error('Avatar upload error:', error);
    res.status(500).json({ message: 'Failed to upload avatar' });
  }
}

module.exports = {
  upsertProfile,
  uploadAvatar,
};
