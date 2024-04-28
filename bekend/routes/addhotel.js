const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addhotel } = require('../controllers/addhotel');

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

router.post('/', upload.array('images'), addhotel);
// router.post('/', upload.single('image'), addhotel);

module.exports = router;