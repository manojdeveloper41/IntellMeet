const cloudinary = require('cloudinary').v2;

const { CLOUDINARY_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (CLOUDINARY_URL) {
  // Try to parse cloudinary://API_KEY:API_SECRET@CLOUD_NAME
  const m = CLOUDINARY_URL.match(/^cloudinary:\/\/(.+?):(.+?)@(.+)$/);
  if (m) {
    cloudinary.config({ cloud_name: m[3], api_key: m[1], api_secret: m[2], secure: true });
  } else {
    // Let cloudinary try to consume the URL directly
    cloudinary.config({ cloudinary_url: CLOUDINARY_URL, secure: true });
  }
} else if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
  cloudinary.config({ cloud_name: CLOUDINARY_CLOUD_NAME, api_key: CLOUDINARY_API_KEY, api_secret: CLOUDINARY_API_SECRET, secure: true });
}

module.exports = cloudinary;
