// // Require the Cloudinary library
// const cloudinary = require('cloudinary').v2

// exports.uploadIMageToCloudinary = async(File,folder,height,qulity)=>{
//     const options ={folder};
//     if(height)
//     {
//         options.height=height;

//     }if(qulity)
//     {
//         options.qulity=qulity;
//     }
//     options.resource_type="auto";
//     return await cloudinary.uploader.upload(File.tempFilePath,options);
// }



// const cloudinary = require('cloudinary').v2;
// const fs = require('fs');
// require("dotenv").config();


// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET 
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         console.log("kunjesh---");

//         if (!localFilePath) return null;
//         //upload the file on cloudinary
//         console.log("local---",localFilePath);
//         const folder=process.env.FOLDER_NAME;
  
//         const options ={folder};
//         console.log("kunj----",folder);
//         options.resource_type="auto";
//         console.log("kunj----",options);

//         const response = await cloudinary.uploader.upload(localFilePath,options)
//         console.log("kunj===");
//         // file has been uploaded successfull
//         //console.log("file is uploaded on cloudinary ", response.url);
//         fs.unlinkSync(localFilePath)
//         return response;

//     } catch (error) {
//         fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
//         return null;
//     }
// }



// // module.exports=uploadOnCloudinary;
// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null
//         //upload the file on cloudinary
//         console.log("kunj");
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })
//         // file has been uploaded successfull
//         //console.log("file is uploaded on cloudinary ", response.url);
//         fs.unlinkSync(localFilePath)
//         return response;

//     } catch (error) {
//         fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
//         return null;
//     }
// }

// module.exports=uploadOnCloudinary;

// export {uploadOnCloudinary}


// const cloudinary = require("cloudinary").v2;

// exports.cloudinaryconnect = () => {
//     try {
//         // compalsory
//         cloudinary.config({
//             cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//             api_key: process.env.CLOUDINARY_API_KEY, 
//             api_secret: process.env.CLOUDINARY_API_SECRET
//         })

        

//     } catch (error) {
        
//     }
// }

const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: "753137237938561",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
