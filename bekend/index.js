const express = require("express");
const app = express();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const bodyParser = require('body-parser');
const User = require("./models/user")
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware to parse json request body
app.use(express.json());
app.use(bodyParser.json());
// Handling CORS (Cross-Origin Resource Sharing) for frontend requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any domain
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allowable methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allowable headers
  next();
});








app.use(express.static('public'));
//for router
const roomRoutes = require('./routes/addroom');
const hotelRoutes = require('./routes/addhotel');
const dingRoutes = require('./routes/addding');
const { singups,login}= require('./controllers/otpg');
const {authenticate,admin}=require("./midlwer/mid");
const{allhotel,hotlfeedback,onehotel}=require('./controllers/addhotel')
const{roombook,bookTable}=require("./controllers/bookingh")
// Routes
app.use('/room', roomRoutes);
app.use('/addding',dingRoutes);
app.use('/hotel',authenticate,admin, hotelRoutes);
// app.post('/signup',singups );
app.post('/signup',singups );
app.post('/login',login );
app.get('/logout',authenticate, async (req, res) => {
  try {
    // Assuming you have the user's ID available (e.g., from the session or decoded JWT)
    const userId = req.user.id;
    console.log("user id==", userId);
    await User.findByIdAndUpdate(userId, { $inc: { tokenVersion: 1 } });
    console.log("find id");
    res.clearCookie('token');
    console.log("find clear");
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error("Error on logout:", error);
    res.status(500).json({
      success: false,
      message: 'Error logging out'
    });
  }
});





app.post('/onehotel',authenticate,onehotel );
app.post('/roombook',authenticate,roombook);
app.post('/bookTable',authenticate,bookTable);



app.get('/allhotel',allhotel);

app.post('/hotelfeedback',authenticate, upload.any(),hotlfeedback)










//start server
app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
  });
  
  //connect to the database
  const dbConnect = require("./config/database");
  dbConnect();












/*   sinfup
   async (req, res) => {
  try {
    const formData = req.body;
    
    console.log('Received form data:', formData);
 
    // Perform validation and save to database here

    console.log("Sending response");
    
    // Send a successful response back
    res.status(201).json({
      message: 'User signed up successfully',
      userData: formData
    });
  } catch (error) {
    console.error("Error during signup:", error);
    // Send an error response
    res.status(500).json({
      message: 'An error occurred during signup',
    });
  }
}

*/




// ************************


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.post('/room', upload.single('image'), (req, res) => {
//   console.log("req come--");
//   const roomDetails = {
//     roomtype: req.body.roomtype,
//     price: req.body.price,
//     imagePath: req.file ? req.file.path : null, // Path to the uploaded image
//   };

//   console.log("room:",roomDetails);

//   // Ideally, you would now save roomDetails to your database.

//   res.json({ message: 'Room details and image uploaded successfully', data: roomDetails });
// });

// ****************


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Use the room routes with the base path '/room'
// app.use('/room', handleRoomUpload);



























  // const {hBooks}= require("./controllers/bookingh");
// app.post("/bookings",hBooks);





/*22-3-24*/

// const multer = require('multer');
// const parser = multer({ storage: storage });


// const{addhotel,handleRoomUpload }=require("./controllers/addhotel")
// app.post("/Otp",generateOtp);
// app.post("/email", bookingAndPaymentController);
// app.post("/singup",singup);


// app.post("/addhotel",addhotel);
// app.post("/giveotp",giveotp);
// app.post("/addroom",addroom );

// application/x-www-form-urlencoded

// Static files
// This serves files from the 'public' directory as static files. Adjust as needed.




// const { hBooks } = require("./controllers/bookingh");
// const { bookingAndPaymentController } = require("./controllers/mailsender");
// const{ login }=require("./controllers/otpg");

// app.post("/bookings", hBooks);
// app.post("/login",login)