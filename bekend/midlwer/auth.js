// const jwt = require("npm i multer");
// require("dotenv").config();
// const User = require("../models/user");
// const { request } = require("express");

// //auth
// exports.auth = async(req,res,next)=>{
//     try {
//             const token =req.cookies.token|| req.header("Authorisation").replace("Bearer"," ");
            
//             //token not genderate
//             if(!token)
//             {
//                 return res.status(401).json({
//                     sucess:false,
//                     message:'token is missing'
//                 })
//             }
//         try {
//                 //verfiy token
//                 const decode= jwt.verify(token,process.env.JWT_SECRET);
//                 console.log(decode);
//                 req.User=decode;
//         } catch (error) {
//                 return res.status(401).json({
//                     sucess:false,
//                     message:'token is not verfiy'
//                 })
//         }
//         next();
         
//     } catch (error) {
//         return res.status(401).json({
//             sucess:false,
//             message:'token is not featch'
//         })
//     }
// }
//  //is stdend
//  exports.isStudent = (req,res,next)=>{
//     try {
//          const acount=req.User.accountType;
//          if(acount !=="student"){
//             return res.status(401).json({
//                 sucess:false,
//                 message:'this for only student'
//             })
//          }
//          next();
//     } catch (error) {
//         return res.status(401).json({
//             sucess:false,
//             message:'acoount type stdent is not featch'
//         })
        
//     }
//  }

//  // isInstructor
//  exports.isInstructor = (req,res,next)=>{
//     try {
//          const acount=req.User.accountType;
//          if(acount !=="Instructor"){
//             return res.status(401).json({
//                 sucess:false,
//                 message:'this for only isInstructor'
//             })
//          }
//          next();
//     } catch (error) {
//         return res.status(401).json({
//             sucess:false,
//             message:'acoount type isInstructor is not featch'
//         })
        
//     }
//  }

//  //isAddmin

//  exports.isAddmin = (req,res,next)=>{
//     try {
//          const acount=req.User.accountType;
//          if(acount !=="Addmin"){
//             return res.status(401).json({
//                 sucess:false,
//                 message:'this for only isAddmin'
//             })
//          }
//          next();
//     } catch (error) {
//         return res.status(401).json({
//             sucess:false,
//             message:'acoount type isAddmin is not featch'
//         })
        
//     }
//  }