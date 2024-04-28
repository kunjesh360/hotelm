const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotelName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true
    },
    description2: {

      type: String,
      trim: true,
      
    },
    hpDescription: {
      type: String,
      trim: true,
    },
    images: {
      type: String,
      
    },
    rooms: [{type:mongoose.Schema.Types.ObjectId,
      ref:"Room"}],
    dining: [{type:mongoose.Schema.Types.ObjectId,
      ref:"Dining"}],
      Price: {
        type: String,
        trim: true,
      },
      reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"revie"

      }],
      Descriptionoutside:{
        type: String,
      }
  })


module.exports = mongoose.model("hotel", hotelSchema );