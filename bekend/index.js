const express = require("express");
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const app = express();
const cloudinary = require('./config/cloudnary');
const httpServer = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer, {
    cors: { origin: "*" }
});
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const User = require("./models/user");

// Environment and Database Setup
require("dotenv").config();
const dbConnect = require("./config/database");
dbConnect();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Import Routes and Middleware
const roomRoutes = require('./routes/addroom');
const hotelRoutes = require('./routes/addhotel');
const dingRoutes = require('./routes/addding');
const profilRouter=require('./routes/updateprofile');
const { singups, login,paseworsupadat } = require('./controllers/otpg');
const { authenticate, admin } = require("./midlwer/mid");
const { allhotel, hotlfeedback, onehotel,likeh } = require('./controllers/addhotel');
const { roombook, bookTable } = require("./controllers/bookingh");

// Routes Setup
app.use('/room', roomRoutes);

app.use('/addding', dingRoutes);
app.use('/hotel', authenticate, admin, hotelRoutes);
app.post('/signup', singups);
app.post('/login', login);
// app.post('/updatep', profilRouter);
app.post('/onehotel', authenticate, onehotel);
app.post('/roombook', authenticate, roombook);
app.post('/bookTable', authenticate, bookTable);
app.get('/allhotel', allhotel);
app.post('/hotelfeedback', authenticate, upload.any(), hotlfeedback);
app.post('/hotels/by-ids',likeh);



app.post('/logout', authenticate, async (req, res) => {
    try {
      console.log("entrr a logout");
        const userId = req.user.id;
        console.log("usr like data",req.body);
        const likeh=req.body;
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $set: { likeh: likeh } },
          { new: true } 
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "somthibg wrong" });
    }
      
        await User.findByIdAndUpdate(userId, { $inc: { tokenVersion: 1 } });
        res.clearCookie('token');
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error logging out'
        });
    }
});


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user:  process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASSWORD
  }
});

app.post('/send-otp', async (req, res) => {
  console.log("add in foget email",req.body);
  const { email } = req.body;
  const otpCode = Math.floor(100000 + Math.random() * 900000); 
  const otpExpiration = new Date(new Date().getTime() + 30*60000); 


   
  try {
     const user = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          otps: {
            code: otpCode,
            expires: otpExpiration
          }
        }
      },
      { new: true, upsert: true } 
    );
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is ${otpCode}. It is valid for 10 minutes.`
    });
    res.status(200).json({ message: 'OTP sent successfully', otp: otpCode });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});



//update profile

app.post('/updatep', authenticate,upload.none(), async (req, res) => {
  try {
      console.log("data",req.body); 
const{ firstName,
lastName,
email,
phone,
country,
postalCode}=req.body;
const user= req.user

const userb=user.id;

const userId = new mongoose.Types.ObjectId(userb);
console.log("userb--",userId);

        const updateData = {
            firstName,
            lastName,
            email,
            phone,
            country,
            postalCode,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        };

      
        const updatedUser = await User.findByIdAndUpdate(userb, updateData, { new: true });

        res.status(200).json({
            message: "Profile updated successfully",
            data: updatedUser
        });

  } catch (error) {
      console.error('Error while updating profile:', error);
      res.status(500).json({ message: "Failed to update profile due to server error" });
  }
});



app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    const lastOtp = user.otps.sort((a, b) => b.created - a.created)[0];

    // Check if the OTP is correct and not expired
    const isOtpValid = lastOtp && lastOtp.code === otp && new Date(lastOtp.expires) > new Date();

    if (!isOtpValid) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    
    user.otps = user.otps.filter(o => o.code !== otp);
    await user.save();

    
    res.cookie('user_email', email, {
      maxAge: 600000, 
      httpOnly: true,
      secure: true 
    });

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.post('/update-password',paseworsupadat );





// Socket.IO Connection Handling
io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    socket.on("chat", (payload) => {
        console.log("Chat payload:", payload);
        io.emit("chat", payload);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
    });
});


httpServer.listen(PORT, () => {
    console.log(`Server started successfully at http://localhost:${PORT}`);
});


























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