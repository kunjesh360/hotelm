

//otp

const User=require("../models/user");
const Otp=require("../models/otp");
const otpGenerator=require("otp-generator")

//send otp
exports.sendOtp = async (req,res)=>{
    try {
        const {email}=req.body;
        const userpresent= await User.findOne({email});
        if(userpresent)
        {
            return res.status(401).json({
                success:false,
                message:"user alreday registerd",
            })
        }
         var otp=otpGenerator.generate(6,{ upperCaseAlphabets: false,lowerCaseAlphabets:false, specialChars: false
         })

        console.log("otp ge",otp);

        let resultotp= await Otp.findOne({otp:otp});

        while (resultotp) {
            otp = otpGenerator({
                upperCaseAlphabets: false,lowerCaseAlphabets:false, specialChars: false
            })
            let resultotp= await Otp.findOne({otp:otp});
        }
        const otpPayload={email,otp};
       const otpBody =await Otp.create(otpPayload);
       res.status(200).json({
        success:true,
        message:"otp sent successfully",
        otp
       })
    } catch (error) {
        console.log("otp not sent",error);
        res.status(400).json({
            success:false,
            message:"otp not sent successfully",
        })
    }
}

//singup
//signup
const emailvalidator = require("email-validator");
const bcrypt = require('bcrypt');
exports.singup =async(req,res)=>{
  try {
    const {
        firstName,
        LastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp
    }= req.body;

    // email vaidens
   
if(emailvalidator.validate(email)){
        if(confirmPassword!==password)
        {
            return   res.status(400).json(
                {
                    success:false,
                    message: 'not password same'
                });  
        }
      // Your call to model here
      const emailresigter=User.findOne({email});
      if(emailresigter)
      {
         return   res.status(400).json(
            {
                success:false,
                message: 'email all readu register'
            });
      }
      
    //  finsd resnt sen otp
    const recentotp= await Otp.find({email}.sort({createdAt:-1}).limt(1))
       if(recentotp.length ==0)
       {
             return res.status(400).json({
                success:false,
                message:'otp not found'
             })
       }

       if(otp !== recentotp.otp){
        return res.status(400).json({
            success:false,
            message:'invaild otp'
        })
       }
       
       //hash password

       const hashpassword =await bcrypt.hash(password,10);

       //entry creat in db

       const profileDetails =await profile.create({
        gender:null,
        dataOfBirth:null,
        about:null,
        contactNumber:null
       })
    const user = await User.create({
        firstName,
        LastName,
        email,
        contactNumber,
        password:hashpassword,
        accountType,
        additionalDetiles:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${LastName}`,
        
    })

    //return responce

    return res.status(200).json({
        success:true,
        message:'user is reagisterd suceesfuly',
        user
    })

    }else{
       return res.status(400).send('Invalid Email');

   }
    
  } catch (error) {
    
    res.status(400).json({
        success:false,
        message:"user is reagisterd not suceesfuly",
    })
  }

}

//login
const jwt =require("jsonwebtoken");
require("dotenv").config();
exports.login =async (req,res)=>{
    try {
        const {
            email,
            password
        }= req.body;
        if(!email || !password)
        {
            return res.status(403).json({
                success:false,
                message:"all fields are required please try again"
            })
        }
        if(emailvalidator.validate(email)){
            // Your call to model here
             const emailfind =await User.findOne({email});
             if(!emailfind)
             {
                return res.status(400).json({
                    success:false,
                    message:"not find email"
                })
             }
    
             //mach possword and jwt
           
             if(await bcrypt.compare(password,emailfind.password))
             { 
                 const payload ={
                    email:emailfind.email,
                    id:emailfind._id,
                    accountType:emailfind.accountType
                 }
                 const token = jwt.sign(payload,process.env.JWT_SECRET,{
                    expiresIn:"2h",
                 });
             }
             emailfind.token=token;
             emailfind.password=undefined;
            // if(password !==User.findOne({password}))
            // {
            //     return res.status(400).json({
            //         success:false,
            //         message:"not find email"
            //     }) 
            // }
    
            const options ={
                expires:new Date(Date.now()+ 3*24*60*60*1000),
                httpoOnly:true
            }
              res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                emailfind,
                message:'logged in successfully'
              })
              }
              
            else{
               res.status(400).json({
            success:false,
            message:'Invalid Email'
         });
      }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'login fall'
        })
    }
}

//chanchpassowerd
exports.changePassword = async(req,res)=>{
    //get data body
    const {
        oldPassword,
        newPassword,
        confirmPassword,
        otp

    }= trq.body;
  //fild data or not
    if(!oldPassword || !newPassword ||!confirmPassword)
    {
        return res.status(400).json({
            success:false,
            message:"fild all data "
        })
    }
    const user =User.findOne({email});
    if(!user)
    {
        return res.status(400).json({
            success:false,
            message:"email notv resigter "
        })
    }
    // const salt = await bcrypt.genSalt(10);
    // password = await bcrypt.hash(password,salt);

    if(user.password !== oldPassword){
        return res.status(400).json({
            success:false,
            message:"password not match "
        })
    }
     //otp send
     const recentotp= await Otp.find({email}.sort({createdAt:-1}).limt(1))
     if(recentotp.length ==0)
     {
           return res.status(400).json({
              success:false,
              message:'otp not found'
           })
     }
  if(recentotp!==otp)
  {
    
    return res.status(400).json({
        success:false,
        message:'otp not mach'
     })
  }
  const hashpassword= await bcrypt.hash(newPassword,10);
  const apdatdata=await user.findOneAndUpdate(email,{
    newPassword:hashpassword
  })

//   unction(err,res){
//     if (err) throw err;
//     console.log("1 document updated");
     //email id chank 
    //
}





































































// const otpGenerator=require("otp-generator");
// const Otp =require("../models/otp");
// const User= require("../models/user")


// const mailSender = require('../config/mailSEnder'); // Ensure you have a mail sending configuration

// // OTP generation and sending controller
// const generateOtp = async (req, res) => {
//     const { email } = req.body;

//     try {
//         // Generate a 6-digit numeric OTP
//         let otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

//         // Create OTP document
//         const otpDocument = new Otp({
//             email,
//             otp
//         });

//         // Save OTP document to database
//         await otpDocument.save();

//         // Send OTP to user's email (implement mailSender accordingly)
//         await mailSender(email, otp);

//         res.status(200).json({
//             success: true,
//             message: 'OTP sent successfully',
//             otp // Note: For production, remove the OTP from the response
//         });
//     } catch (error) {
//         console.error('Error generating or sending OTP', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error generating or sending OTP'
//         });
//     }
// };

// module.exports = { generateOtp };




// // send otp
// // exports.sendOtp = async (req,res)=>{
// //     try {
// //         const {email}=req.body;
// //         const userpresent= await User.findOne({email});
// //         if(userpresent)
// //         {
// //             return res.status(401).json({
// //                 success:false,
// //                 message:"user alreday registerd",
// //             })
// //         }
// //          var otp=otpGenerator.generate(6,{ upperCaseAlphabets: false,lowerCaseAlphabets:false, specialChars: false
// //          })

// //         console.log("otp ge",otp);

// //         let resultotp= await Otp.findOne({otp:otp});

// //         while (resultotp) {
// //             otp = otpGenerator({
// //                 upperCaseAlphabets: false,lowerCaseAlphabets:false, specialChars: false
// //             })
// //             let resultotp= await Otp.findOne({otp:otp});
// //         }
// //         const otpPayload={email,otp};
// //        const otpBody =await Otp.create(otpPayload);
// //        res.status(200).json({
// //         success:true,
// //         message:"otp sent successfully",
// //         otp
// //        })
// //     } catch (error) {
// //         console.log("otp not sent",error);
// //         res.status(400).json({
// //             success:false,
// //             message:"otp not sent successfully",
// //         })
// //     }
// // }

// //signup
// // const emailvalidator = require("email-validator");
// // const bcrypt = require('bcrypt');
// // exports.singup =async(req,res)=>{
// //   try {
// //     const {
// //         firstName,
// //         LastName,
// //         email,
// //         password,
// //         confirmPassword,
// //         accountType,
// //         contactNumber,
// //         otp
// //     }= req.body;

// //     // email vaidens
   
// // if(emailvalidator.validate(email)){
// //         if(confirmPassword!==password)
// //         {
// //             return   res.status(400).json(
// //                 {
// //                     success:false,
// //                     message: 'not password same'
// //                 });  
// //         }
// //       // Your call to model here
// //       const emailresigter=User.findOne({email});
// //       if(emailresigter)
// //       {
// //          return   res.status(400).json(
// //             {
// //                 success:false,
// //                 message: 'email all readu register'
// //             });
// //       }
      
// //     //  finsd resnt sen otp
// //     const recentotp= await Otp.find({email}.sort({createdAt:-1}).limt(1))
// //        if(recentotp.length ==0)
// //        {
// //              return res.status(400).json({
// //                 success:false,
// //                 message:'otp not found'
// //              })
// //        }

// //        if(otp !== recentotp.otp){
// //         return res.status(400).json({
// //             success:false,
// //             message:'invaild otp'
// //         })
// //        }
       
// //        //hash password

// //        const hashpassword =await bcrypt.hash(password,10);

// //        //entry creat in db

// //        const profileDetails =await profile.create({
// //         gender:null,
// //         dataOfBirth:null,
// //         about:null,
// //         contactNumber:null
// //        })
// //     const user = await User.create({
// //         firstName,
// //         LastName,
// //         email,
// //         contactNumber,
// //         password:hashpassword,
// //         accountType,
// //         additionalDetiles:profileDetails._id,
// //         image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${LastName}`,
        
// //     })

// //     //return responce

// //     return res.status(200).json({
// //         success:true,
// //         message:'user is reagisterd suceesfuly',
// //         user
// //     })

// //     }else{
// //        return res.status(400).send('Invalid Email');

// //    }
    
// //   } catch (error) {
    
// //     res.status(400).json({
// //         success:false,
// //         message:"user is reagisterd not suceesfuly",
// //     })
// //   }

// // }