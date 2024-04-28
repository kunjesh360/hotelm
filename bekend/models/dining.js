const mongoose = require('mongoose');

const DiningSchema = new mongoose.Schema({
    restorentName: {
      type: String,
      trim: true,
      required: true
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
    Cuisine: {
      type: String,
      trim: true,
    },
    Lunch: {
      type: String,
      trim: true,
    },
    DressCode: {
      type: String,
      trim: true,
    },
    Dinner: {
      type: String,
      trim: true,
    },
    Price: {
      type: String,
      trim: true,
    },
    Table:{
        type: Number,
      required: true
    },
    hotelName:{
      type: String,
      trim: true,
      required: true
    },
    Menu:[{
      type: String,
      required: true
    }],
    image:{
      type: String,
      required: true
    }

  })


module.exports = mongoose.model("Dining", DiningSchema );