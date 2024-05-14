// const otpGenerator=require("otp-generator");
const Otp =require("../models/otp");
const bcrypt = require('bcrypt');
const Userk = require("../models/user")
// const User= require("../models/user")
require("dotenv").config();
const jwt = require('jsonwebtoken');

const mailsend = require('../config/mailSEnder'); // Ensure you have a mail sending configuration

// OTP generation and sending controller
const generateOtp = async (req, res) => {
    const { email } = req.body;

    try {
        // Generate a 6-digit numeric OTP
        let otp = otpGenerator.generate(6, {
         digits: true,
         alphabets: false,
        upperCase: false, 
        specialChars: false 
         });
        console.log("otpn -----",otp);
        // Create OTP document
        const otpDocument = new Otp({
            email,
            otp
        });

        // Save OTP document to database
        await otpDocument.save();

        // Send OTP to user's email (implement mailSender accordingly)
        console.log("maill---");
        await mailsend(email, "otp send",otp);
        console.log("maill---");
    return    res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp 
        });
    } catch (error) {
        console.error('Error generating or sending OTP', error);
        res.status(500).json({
            success: false,
            message: 'Error generating or sending OTP'
        });
    }
};

const giveotp = async (req,res)=>{

    const recentOtp = await Otp.findOne({ email: email }).sort({ createdAt: -1 }).limit(1);
    res.json({ recentOtp });
}
// module.exports = { generateOtp };

const saltRounds = 10; 
// const myPlaintextPassword = 's0/\/\P4$$w0rD';

const singups = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, typeacouent, postalCode, country, phone } = req.body;
  if(!firstName || !lastName || !email || !password || !confirmPassword || !typeacouent ||!postalCode ||!country ||!phone)
  {
  return  res.status(201).json({ 
    success:false,
    message: "filed all data",
     });
  }
  const emailRegistered = await Userk.findOne({ email: email });
  if (emailRegistered) {
    return res.status(400).json({ message: 'Email is already registered.' });
  }
    // Hash the password
    const saltRounds = 10; // This should be defined somewhere in your config or directly here
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
  const userData = await Userk.create({
    firstName,
    lastName,
    password: hashedPassword,
    email,
    image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    postalCode,
    country,
    phone,
    typeacouent
  });
    
    console.log("Received signup data:", req.body);
  
    // Simulate database save or other processing
    // In real scenario, save the data to your database
  
    res.status(201).json({ message: "User signed up successfully", userData: req.body });
  }


  const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, "  ", password);
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Fill all data',
            });
        }
        const user = await Userk.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        console.log(user);
        console.log("image",user.image);
        const upassword = user.password;
        console.log("upassword");
        console.log(upassword);
        const match = await bcrypt.compare(password, upassword);
        console.log("match", match);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: 'Your password does not match',
            });
        } else {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.typeacouent // Assuming this should be 'typeAccount'
            }
            console.log("payload==", payload);

            let token;
            try {
                token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: "2h",
                });
                console.log(token);
            } catch (error) {
                console.error("Error generating token:", error);
                return res.status(500).json({
                    success: false,
                    message: 'Error generating token',
                });
            }

            console.log("token");
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Cookie expires in 3 days
                httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                secure: true, // Ensure this is set to true if your site is HTTPS only
                sameSite: 'strict', // Can be 'strict', 'lax', or 'none'
              };
            console.log("option", options,token);
            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                message: 'Logged in successfully',
                data:user
            });
        }
    } catch (error) {
        console.log("catch", error);
        res.status(500).json({
            success: false,
            message: 'An error occurred',
        });
    }
}

const updatep=async (req, res) => {
    try {
      console.log('Received fields:', req.body);
      console.log('Received file:', req.file);
  
      // You can now save req.body and req.file information to your database
      // Simulating database save operation
      // const savedUser = await saveUserProfile(req.body, req.file);
  
      // For now, just send back a success message
      res.status(200).send({ success: true, message: 'Profile updated successfully', data: req.body });
    } catch (error) {
      console.error('Error processing the profile update:', error);
      res.status(500).send({ success: false, message: 'Failed to update profile' });
    }
  }


  const paseworsupadat=async (req, res) => {
    const { newPassword } = req.body;

    try {
        // Check if the email cookie exists
        if (!req.cookies.user_email) {
            return res.status(403).json({ message: 'Session expired, please log in again.' });
        }

        const emailFromCookie = req.cookies.user_email;
console.log("email id",emailFromCookie);
        // Generate a salt and hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password in the database
        const updatedUser = await Userk.findOneAndUpdate(
            { email: emailFromCookie },
            { password: hashedPassword },
            { new: true }
        );

        if (updatedUser) {
            // Expire the cookie by setting its expiry to a past date
            res.cookie('user_email', '', { expires: new Date(0), httpOnly: true, secure: true });

            res.status(200).json({ message: 'Password updated successfully. Please log in again.' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  }
module.exports = {singups,login,updatep,paseworsupadat};



// const login = async(req,res)=>{
//     try {
//         const {email,password}=req.body;
//         console.log(email,"  ",password);
//         if(!email || !password)
//         {
//             return  res.status(500).json({
//                 success: false,
//                 message: 'fild all data',
                 
//             });
//         }
//         const user = await Userk.findOne({email:email})
//         console.log(user);
//         const upassword = user.password;
//         console.log("upassword");
//         console.log(upassword);;
//       const match=  await bcrypt.compare(password, upassword);
//       console.log("match",match);
//     if(!match)
//     {
//         res.status(500).json({
//             success: false,
//             message: 'youre password not match',
             
//         });   
//     }else
//     { 
//          const payload={
//         email:user.email,
//         id:user._id,
//         accountType:user.typeacouent
//         }
//         console.log("payload==",payload);
        
     
//      try {
//         const token = jwt.sign(payload, process.env.JWT_SECRET, {
//           expiresIn: "2h",
//         });
//         console.log(token);
//       } catch (error) {
//         console.error("Error generating token:", error);
//       }
     
//     console.log("token");
//      const options ={
//         expires:new Date(Date.now()+ 3*24*60*60*1000),
//         httpoOnly:true
//     }
//     console.log("option",options);
//     return  res.cookie("token",token,options).status(200).json({
//         success:true,
//         token,
//         emailfind,
//         message:'logged in successfully'
//       })
      
//     }

// }
    
       
//     catch (error) {
//         console.log("catch",error);

//         res.status(500).json({
//             success: false,
//             message: 'user not singup  successfully',
             
//         }); 
//     }
// }
