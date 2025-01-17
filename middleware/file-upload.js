const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

// If we have set the CLOUDINARY_URL environment variable on our project
// this requires no additional configuration
const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});

//const upload = multer({ dest: './../public/images' });
// when cloudinary is set up change to : const upload = multer({ storage });

const upload = multer({ storage });
module.exports = upload;
