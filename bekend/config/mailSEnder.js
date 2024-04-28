const nodemailer = require('nodemailer');
require('dotenv').config();
    
    
    // Prepare nodemailer transporter
const mailsend = async (email,title,body)=>{
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // e.g., 'Gmail'
            auth: {
              user: process.env.EMAIL_USER, // Your email
              pass: process.env.EMAIL_PASSWORD, // Your email password
            },
          });


           // Email content
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: email, // List of receivers
        subject:title , // Subject line
        text: body // Plain text body
      };
    console.log("send mail");
      // Send email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.status(500).json({ success: false, message: 'Failed to send booking confirmation email.' });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({ success: true, message: 'Booking created and email sent successfully.' });
        }
      });
    } catch (error) {
        console.error(error);
        res.status(400).json({
          success: false,
          message: 'Error processing booking and payment',
          error: error.message,
        });
    }
}
module.exports=mailsend;


