const User =require("../models/user");
const maileSender =require("../utils/mailSEnder");
const bcrypt = require('bcrypt');

exports.resetPasswordTokem= async (req,res)=>{
   try {
    
     //get emaiil
     const email =req.body.email;

     const user= await User.finOne({email});
     if(!user)
     {
         return res.json({
             success:false,
             message:'yor email not registed'
         })
     }
 
     //genderat token
 
     const token =crypto.randomUUID();
     const upadtedDeatiles = await User.finOneAndUpdate(email,{
         token:token,
         resetPasswordExpires:Date.now() +5*60*100,
     },{new:true});

    const url=`http://localhost:3000/update-password/${token}`

await maileSender(email,
    "password resent link",
    `password resent link ${url}`);

    return res.json({
        success:true,
        message:"email send sucees full ples chanche"
    })
   } catch (error) {
    return res.json({
        success:false,
        message:"not resent password"
    })
   }
}


//resent password

exports.resetPassword =async (req,res)=>{
  try {
      //data fatch
      const {passWord,conformPassWord,token}=req.body;
      if(passWord !== conformPassWord){
          return res.json({
              success:false,
              message:" password not match"
          })
      }
  
     const userDeatile = await User.finOne({token});
  
     if(!userDeatile)
     {
      return res.json({
          success:false,
          message:" token invaild"
      })
     }
     if(userDeatile.resetPasswordExpires< Date.now()){
      return res.json({
          success:false,
          message:" token is expire"
      })
     }
  
     const hashpassword= await bcrypt.hash(passWord,10);
     await User.finOneAndUpdate(token,{passWord:hashpassword},{new:true});
     return res.status(200).json({
      success:true,
          message:" passwor reset succes fully"
     })
  } catch (error) {
    return res.status(200).json({
        success:false,
            message:" passwor reset smothin wrong"
       })
  }

}