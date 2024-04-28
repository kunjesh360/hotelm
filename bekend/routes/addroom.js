// const express = require('express');
// const router = express.Router();
// const multer = require('multer');

// Import the controller
// const { handleRoomUpload } = require('../controllers/addhotel');

// // Set up storage for multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// // Define the route for uploading room details
// router.post('/', upload.single('image'), handleRoomUpload);

// module.exports = router;


// const express = require("express");
// const router = express.Router();

// const{handleRoomUpload}= require("../controllers/addhotel");

// router.post("/addroom",handleRoomUpload);
// module.exports = router;


const express = require('express');
const router = express.Router();
const multer = require('multer');
const { handleRoomUpload } = require('../controllers/addhotel');

// Setup multer for file handling
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), handleRoomUpload);
// router.post('/', upload.single('image'), addhotel);

module.exports = router;
