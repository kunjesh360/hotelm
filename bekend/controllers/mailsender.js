const Booking = require('../models/book'); // Your booking model
const nodemailer = require('nodemailer');
require('dotenv').config();

const bookingAndPaymentController = async (req, res) => {
  try {
    const { name, checkInDate, checkOutDate, roomNumber, hotel, guests, roomType, email, phoneNumber } = req.body;
    
    // Create the booking in the database
    const booking = await Booking.create({
      name, checkInDate, checkOutDate, roomNumber, hotel, guests, roomType
    });
     if(!name ||!checkInDate ||!checkOutDate ||!roomNumber ||!hotel ||!guests ||!roomType)
     {
      return res.status(500).json({
        success: false,
        message: 'fill all data',

        });
     }
    // Redirect to payment service page
    // This is a placeholder, replace with your actual payment integration
    // e.g., res.redirect('https://yourpaymentservice.com/checkout?bookingId=' + booking._id);
    
    // Assuming payment is successful and you're now in the callback after payment
    // You might handle this in another route that the payment service redirects to after payment


   
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: 'Error processing booking and payment',
      error: error.message,
    });
  }
};

module.exports = { bookingAndPaymentController };
