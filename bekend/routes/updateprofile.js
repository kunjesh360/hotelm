// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { updatep } = require('../controllers/addhotel');

// // Setup multer for file handling
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function(req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// router.post('/', upload.single('image'), updatep);
// // router.post('/', upload.single('image'), addhotel);

// module.exports = router;




// const multer = require('multer');

// // Set up the disk storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads'); // Ensure this directory exists
//     },
//     filename: function (req, file, cb) {
//         // Create a unique file name
//         cb(null, file.fieldname + '-' + Date.now() + file.originalname);
//     }
// });

// // Export the upload middleware configured with the disk storage
// const upload = multer({ storage: storage });
// module.exports = upload;
