const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// 1. Configure Storage for Icons
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/icons'));
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  },
});

// 2. File Filter for Icons Only
const fileFilter = (req, file, cb) => {
  const allowedIconTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

  if (file.fieldname === 'icon') {
    if (allowedIconTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid icon type. Only JPEG, PNG, JPG, and WEBP are allowed.'), false);
    }
  } else {
    cb(new Error('Only "icon" field is allowed for job category uploads.'), false);
  }
};

// 3. Export Middleware for Icon Uploads
const iconUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB max
}).single('icon');

module.exports = iconUpload;
