const mongoose = require('mongoose');

const revieSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      trim: true, 
    },
    description: {
      type: String,
      required: true,
    },
    hotelName: {
      type: String,
      required: true,
      trim: true,
    },
   
    rating: {
      type: Number,
      required: true,
      min: 0, 
      max: 5, 
    },
    image: {
      type: String,
      
    },
  }, {
    timestamps: true, 
  })


module.exports = mongoose.model("revie", revieSchema );