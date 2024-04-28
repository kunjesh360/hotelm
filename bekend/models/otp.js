// const mongoose =require("mongoose");
// const mailSEnder = require("../config/mailSEnder");
// // const Schema = mongoose.Schema;
// const otpSchema = new mongoose.Schema({
//    email:{
//     type:String,
//     required:true
//    },
//    otp:{
//     type:String,
//     required:true
//    },
//    creatrd:{
//     type:Date,
//     default:Date.now(),
//     expires:5*60
//    }
// });

// async function sendmail(email,otp){
//    try {
//       const mailSEnderresponce=await mailSEnder(email,"verification email from kunjesh",otp);
//       console.log("mail responce",mailSEnderresponce);
//    } catch (error) {
//       console.log("erro in sendinh mail otp.js",error);
//    }
// }

// otpSchema.pre("save",async function(next){
//    await sendmail(this.email,this.otp);
//    next();
// })
// module.exports = mongoose.model("Otp", otpSchema);



const mongoose = require("mongoose");
const mailSender = require("../config/mailSEnder"); // Ensure this path is correct

const otpSchema = new mongoose.Schema({
    email: {
    type: String,
    required: true
   },
   otp: {
    type: String,
    required: true
   },
//    created: { // Fixed typo here
//     type: Date,
//     default: Date.now, // Changed to use the function reference
//     expires: 5 * 60 // 5 minutes
//    }
},{ timestamps: true });



module.exports = mongoose.model("Otp", otpSchema);
















// async function mailsend(email, otp) { // Renamed for consistency
//    try {
//       const mailSenderResponse = await mailSender(email, "Verification email from kunjesh", otp); // Fixed typos
//       console.log("Mail response", mailSenderResponse);
//    } catch (error) {
//       console.error("Error in sending mail otp.js", error); // Fixed typo and used console.error for errors
//    }
// }

// otpSchema.pre("save", async function(next) {
//    await sendMail(this.email, this.otp); // Ensure this is the desired behavior on mail send failure
//    next();
// });