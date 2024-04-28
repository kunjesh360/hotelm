const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingDate: {
    type: Date,
    required: true
  },
  bookingTime: {
    type: String,
    required: true
  },
  numberOfPeople: {
    type: Number,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  dinings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dining',
    required: true
  },
  hotelid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'hotel', // Reference to Hotel model if needed
    required: true
  }
});

module.exports = mongoose.model('Bookingtable', bookingSchema);