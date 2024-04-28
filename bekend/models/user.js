const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    password: { // Make sure to hash passwords before saving!
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    image: {
      type: String
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    typeacouent:{
      type: String,
      required: true
    },
   tablebook: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dining',
    }],
    hotelbook: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'hotel', 
    }],
    roombook: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
    reivehotel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'revie' }],
  });

module.exports = mongoose.model("User", userSchema);

