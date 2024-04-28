const express = require('express');
const router = express.Router();
const multer = require('multer');
const { dingadd } = require('../controllers/addhotel');

// Setup multer for file handling
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
  
});

const upload = multer({ storage: storage });

router.post('/',  upload.fields([
  { name: 'MenuFiles', maxCount: 10 }, // Assuming up to 10 menu files
  { name: 'RestaurantImage', maxCount: 1 } // Single restaurant image
]), dingadd);
// router.post('/', upload.single('image'), addhotel);

module.exports = router;