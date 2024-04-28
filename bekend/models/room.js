const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema( 
    {roomtype: {
    type: String,
    trim: true,
    required: true
  },
  description1: { // assuming 'dec1' was meant to be 'description1'
    type: String,
    trim: true,
  },
  wifi: {
    type: String,
    trim: true,
    required: true
  },
  area: {
    type: String,
    trim: true,
    required: true
  },
  capacity: {
    type: String,
    trim: true,
    required: true
  },
  bed: {
    type: String,
    trim: true,
    required: true
  },
  price: {
    type: String,
    trim: true,
    required: true
  },
  description: { // assuming 'dec' was meant to be a short form for 'description'
    type: String,
    trim: true,
  },
  imagePath: {
    type: String // Path to the image of the room
  },
  roomcount:{
    type:String,
    trim: true,
  },
  isBooked: { type: Boolean, default: false }
})

module.exports = mongoose.model("Room", RoomSchema );