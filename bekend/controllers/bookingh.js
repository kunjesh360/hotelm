const Booking = require('../models/book');
const mailsend = require("../config/mailSEnder");
const Bookingroom=require("../models/book")
const Bookingtable = require("../models/tablebook")
const  User=require("../models/user")
require("dotenv").config();
// const dbConnect = require("./config/database");
const hBooks = async (req, res) => {
  try {
    // const booking = new Booking(req.body);
    console.log("kunjesh====");
    // const{name,checkInDate,checkOutDate,roomNumber,hotel,roomType,guests,email}= req.body;
  //  const booktiket = await Booking.create({
  //   name,checkInDate,checkOutDate,roomNumber,roomType,guests,hotel,email
  //  });
  //  if(!name || !checkInDate ||!checkOutDate ||!roomNumber ||!hotel || !roomType ||!guests || !email)

  const { customerName, dateFrom, dateTo, room,hotel } = req.body;
    
    console.log("data",customerName, dateFrom, dateTo, room,hotel);
  //  {
  //   return res.status(500).json({
  //     success: false,
  //     message: 'add all data',

  //     });
  //  }
  //  const sendmail= await mailsend(email,'Booking Confirmation',
  //  `Your booking has been successfully made for ${hotel}. Booking details: Room Number ${roomNumber}, Check-in Date: ${checkInDate}, Check-out Date: ${checkOutDate}.`);

  //  Contact us at ${phoneNumber} for any queries.
    res.status(201).json({
        success: true,
        message: 'Booking created successfully'
    });

  } catch (error) {
    console.error("err-",error);
    res.status(400).json({
        success: false,
        message: 'Error creating booking',
        error: error.message
    });
  }
};

const nodemailer = require('nodemailer');

const roombook = async (req, res) => {
  try {
    console.log("book room data==", req.body);
    const {
      customerName, checkInDate, checkOutDate, roomid, hotelid
    } = req.body;
    const user = req.user;
console.log("yser--",user);
    const bookroom = Bookingroom({
      customerName: customerName,
      dateFrom: checkInDate,
      dateTo: checkOutDate,
      room: roomid,
      hotel: hotelid,
      user: user.id
    });

    const bookr = await bookroom.save();

    const hotelf = await User.findOne({ _id: user.id });
    console.log("hotelf--", hotelf);

    const adduser = await User.findOneAndUpdate(
      { _id: user.id },
      {
        $push: { roombook: bookr, hotelbook: hotelid }
      },
      { new: true }
    );

    console.log("adduser===", adduser);

  
    await sendConfirmationEmail(customerName, user.email, checkInDate, checkOutDate, hotelid);

    return res.json({
      success: true,
      message: 'Booking successfully completed'
    });

  } catch (error) {
    console.log("error room booking===", error);
    return res.json({
      success: false,
      message: 'Booking was not successful'
    });
  }
};

async function sendConfirmationEmail(customerName, email, checkInDate, checkOutDate, hotelid) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER, 
      pass:process.env.EMAIL_PASSWORD 
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: email, 
    subject: 'Room Booking Confirmation', 
    text: `Dear ${customerName},\n\nYour booking has been confirmed for ${checkInDate} to ${checkOutDate} at hotel ID ${hotelid}.\n\nBest regards,\nHotel Booking Team`
  };

  await transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Error sending email: ', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const bookTable=async(req,res)=>{
  try {
    console.log("book table data==",req.body);
      const{
        bookingDate,
        bookingTime,
        numberOfPeople,
        customerName,
        dinings,
        hotelid
      }= req.body;

      const user= req.user
      console.log("user--", user);
      console.log("user--", user.id);
      const userb=user.id;
     //  ****worj
      const hotelf = await User.findOne({ _id: user.id });

      const bookroom=Bookingtable({
        bookingDate:  bookingDate,
        bookingTime:  bookingTime,
        numberOfPeople: numberOfPeople,
        customerName:  customerName,
        dinings:  dinings,
        hotelid: hotelid
      })
      const bookt=await bookroom.save();
      console.log("hotelf--",hotelf);
      const adduser= await User.findOneAndUpdate(
        { _id: user.id }, 
        { $push: { tablebook: bookt } }, 
        { new: true }
      )
   
   console.log("adduser===",adduser);
      return  res.json({ 
        success: true,
        message: 'booking sucees fully'});
  
    } catch (error) {
      console.log("error room booking===",error);
      return  res.json({ 
        success: false,
        message: 'booking not sucessfully'});
    }
}
module.exports = { hBooks,roombook,bookTable };
