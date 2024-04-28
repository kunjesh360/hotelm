// const express = require("express");
// const router = express.Router();

// const {hbook}=require("../controllers/bookingh");

// router.post("/bookings",hbook);
// module.exports = router;

// // //import routes for TODO API
// const hotelbook = require("./routes/hbook");

// // //mount the todo API routes
// app.use("/api/v1", hotelbook);


// const express = require("express");
// const router = express.Router();


// const { hBooks } = require("../controllers/bookingh");
// const { bookingAndPaymentController } = require("../controllers/mailsender");
// const{ generateOtp , singup,login,giveotp }=require("../controllers/otpg");
// const{addhotel,handleRoomUpload }=require("../controllers/addhotel")


// router.post("/Otp",generateOtp);
// router.post("/bookings", hBooks);
// router.post("/email", bookingAndPaymentController);
// router.post("/singup",singup);
// router.post("/login",login)
// router.post("/addhotel",addhotel);
// router.post("/giveotp",giveotp);
// router.post("/addroom",handleRoomUpload)

// module.exports = router;



// const singup = require("../controllers/otpg");
// const express = require('express');
//  // Adjust the path according to your project structure
// const router = express.Router();
// router.post('/sing',singup)
// module.exports = router;



// const express = require('express');
// const router = express.Router();

// // Assuming the signup function is exported from 'authController.js'
// // Replace 'path_to_signup_function' with the actual path to your signup function
// const { singup } = require('../controllers/otpg');

// // Register the signup function for the POST request to '/signup'
// router.post('/signup', singup);

// module.exports = router;
