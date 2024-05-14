const mongoose = require('mongoose');
const hotel=require("../models/hotel")
const Room=require("../models/room");
const Dining= require("../models/dining")
const revie= require("../models/Revie")
const User=require("../models/user")
const Bookingroom= require("../models/book")
const { ObjectId } = require('mongodb');
const cloudinary = require('../config/cloudnary');
// const uploadOnCloudinary=require("../config/cloudnary");
require("dotenv").config();
//  const uploadIMageToCloudinary =require("../config/cloudnary")
// const upload = multer({ dest: '/' });
const addhotel = async(req,res)=>{
  console.log("req--",req.body);
    try {
//featch data
        const { hotelName, description, phoneNumber, email, description2, hpDescription,Price, Descriptionoutside } = req.body;
        const valuesArray = req.files.map(file => file.path);
        console.log("bhbhbwjhbf==",valuesArray[0]);
  if(!hotelName || !description || !phoneNumber || !email || !description2 || !hpDescription||!Price)
  {
    return res.status(500).json({
                success: false,
                message: 'passwoord not match successfully',
    
                });
  }
  const user= req.user
   console.log("user--", user);
   
    // console.log("hotl detail---",hotelde);
    // console.log("hotl detail---",valuesArray);
 

    try {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(valuesArray[0], {
        resource_type: 'auto'
      });

      console.log(result)
      console.log("secyre url",result.secure_url)
      const newHotel = new hotel({
        hotelName,
        description,
        phoneNumber,
        email,
        description2,
        hpDescription,
        Price,
        images:result.secure_url,
        Descriptionoutside
      });
    const addhotel=await newHotel.save();
   console.log("addhotel",addhotel);
  
    // const imag=uploadImagecloud(imagePath);
    // console.log("image---",image);
    // Here you would save roomDetails to your database.
  
    // res.json({ message: 'Room details and image uploaded successfully', data: result });
  }catch (error) {
      console.error('Error uploading to Cloudinary:', error);
    return  res.status(500).json({ 
      success: false,
      message: 'Failed to upload image',
       error: error.message });
    }


     

     res.status(500).json({
        success: true,
        message: 'add hotel sucessfully successfully',
         data:addhotel,
        });

      } catch (error) {
          res.status(500).json({
            success: false,
            message: 'hotel successfully',
            message:error.message

            });
      } 
  
}








const handleRoomUpload = async(req, res) => {
  const  {
    roomtype,
    dec1,
    wifi,
    area,
    capacity,
    bed,
    price,
    dec,
    hotelk,
    roomcount
    // Path to the uploaded image
  }=req.body;
 const imagePath= req.files ? req.file.path : null
    console.log("r=",req.body,"f",req.file);
  //  console.log("kunj==",imagePath);
   console.log("kunj==t",req.file.path);
 if(!roomtype|| !dec1 ||!wifi ||!area ||!capacity ||!bed ||!price ||!dec ||!price ||!dec ||!hotelk||!roomcount
  )
 {
  return res.status(500).json({
    success: false,
    message: 'fild all data',

    });
 }
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto'
    });


console.log(result)
console.log("image url",result.secure_url)

  const newroom =new Room({
    roomtype:roomtype,
    description1:dec1 ,
    wifi:wifi,
    area: area,
    capacity:capacity ,
    bed:bed ,
    price: price,
    description: dec,   
    imagePath:result.secure_url,
    roomcount:roomcount
  })
   const  nroom= await newroom.save();
  //  ****worj
  const hotelf = await hotel.findOne({ hotelName: hotelk });
  console.log("hotel------------",hotelf);

  console.log("hotelf-",hotelf);
  const addro= await hotel.findOneAndUpdate(
    { hotelName: hotelk }, 
    { $push: { rooms: newroom } }, 
    { new: true } 
  )
   console.log("addro----------",addro);


  res.json({ 
    success: true,
    message: 'Room details and image uploaded successfully',
  data :newroom });
}catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to upload image', 
      error: error.message });
  }
};

const dingadd=async(req,res)=>{
  try {
        const {
          restorentName,
          description,
          phoneNumber,
          email,
          Cuisine,
          Lunch,
          DressCode,
          Dinner,
          Price,
          Table,
          hotelName,
        }=req.body;
    // console.log("r--",req.body);
    // const Menu=req.files ? req.file.path : null;
    const kunj=req.files;
    console.log("menu==",req.files);
    const restaurantImagePath =kunj.RestaurantImage[0].path;
console.log("restornt",restaurantImagePath);

const menuFilePaths = kunj.MenuFiles.map(file => file.path);
console.log("menufile",menuFilePaths);
menuFilePaths.forEach((path, index) => {
  console.log(`Path ${index + 1}: ${path}`);
})
    console.log("menyu--",kunj);
    console.log("menyu--men",kunj.MenuFiles[0].path);
    // if(!restorentName||!description ||!phoneNumber ||!email ||!Cuisine ||!Lunch||!DressCode ||!Dinner ||!Price ||!Table ||!hotelName )
    // {
    //   return res.status(500).json({
    //     success: false,
    //     message: 'passwoord not match successfully',

    //     });
    // }

    console.log("kunj");
   
    const restrontimage = await cloudinary.uploader.upload(restaurantImagePath, {
      resource_type: 'auto'
    });
    console.log("restrontimage",restrontimage);

    const uploadPromises = menuFilePaths.map(path => {
      return cloudinary.uploader.upload(path, { resource_type: 'auto' });
    });
     // Wait for all the upload promises to resolve
     const results = await Promise.all(uploadPromises);
     console.log("result--",results);

// If you need to process results further or store them in an array:
const menuurl = results.map(result => result.secure_url);
console.log(menuurl);

console.log("kunj=====");


    const newding =new Dining({
      restorentName,
      description,
      phoneNumber,
      email,
      Cuisine,
      Lunch,
      DressCode,
      Dinner,
      Price,
      Table,
      hotelName,
      Menu:menuurl,
      image:restrontimage.secure_url
    })
    const addding= await newding.save();

    console.log("add ding ==",addding);
    const hotelf = await hotel.findOne({ hotelName: hotelName });
    if(!hotelf)
    {
      return  res.json({ 
        success: false,
        message: 'add first hotel'});
    }
    console.log("hotelf-",hotelf);
    const adddi= await hotel.findOneAndUpdate(
      { hotelName: hotelName }, // Find a document with this condition
      { $push: { dining: newding } }, // Add 'Jane Doe' to the 'friends' array
      { new: true } // Returns the document after update was applied
    )
     console.log("addro=================-",adddi);

    res.status(500).json({ 
      success: true,
      message: 'add ding', 
      data:addding  
    });
    
  } 
  
  catch (error) {
    console.error('Error uploading to ding:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to upload image', 
      error: error.message });
  }
}

const onehotel=async(req,res)=>{
  try {
    console.log("enter in onr h");
    console.log("re--",req.body);
 const hotelo=req.body;
   console.log("hotel",hotelo);
   console.log("hotel",hotelo._id);
   const hoteloId = new ObjectId(hotelo._id);
   console.log("k--",hoteloId);
   //ding and room 
  const hotelWithDiningData = await hotel.aggregate([
    {
      $match: {
        "_id":hoteloId,// Directly using ObjectId in the query
      }
    },
    {
      $lookup: {
        from: "dinings", // Assuming "dinings" is the correct collection name
        localField: "dining", // Field in the "hotel" documents containing ObjectId references to "dinings" documents
        foreignField: "_id", // The "_id" field in the "dinings" documents
        as: "diningOptions" // The array field to add to the resulting documents; contains the joined "dinings" documents
      }
    }
    // Add additional stages here as needed
  ]);
  // console.log("kunj------------------",hotelWithDiningData,"------------------");
  let hotelObjectd = {};

  if (hotelWithDiningData.length > 0) {
    const diningOptions = hotelWithDiningData[0].diningOptions;
    console.log(diningOptions); // This will log the array of dining option documents to the console
    hotelObjectd = {
   // Spread operator to include all properties of the hotel document
      diningOptions: diningOptions // Adding the dining options explicitly
    };
  }
  // console.log("lllllllllllllllllllllllll:",hotelObjectd);
  let hotelObjectr = {};
  const hotelWithroom = await hotel.aggregate([
    {
      $match: {
        "_id":hoteloId,// Directly using ObjectId in the query
      }
    },
    {
      $lookup: {
        from: "rooms", // Assuming "dinings" is the correct collection name
        localField: "rooms", // Field in the "hotel" documents containing ObjectId references to "dinings" documents
        foreignField: "_id", // The "_id" field in the "dinings" documents
        as: "roomOptions" // The array field to add to the resulting documents; contains the joined "dinings" documents
      }
    }
    // Add additional stages here as needed
  ]);

  // console.log("kunj------------------",hotelWithroom,"------------------");
  if (hotelWithroom.length > 0) {
    const roomOptions = hotelWithroom[0].roomOptions;
    console.log(roomOptions); // This will log the array of dining option documents to the console
    hotelObjectr={
      roomOptions:roomOptions
    }
  }
  // console.log("lllllllllllllllllllllllll:",hotelObjectr);


  //rewie
  const hotelWithrewi = await hotel.aggregate([
    {
      $match: {
        "_id":hoteloId,// Directly using ObjectId in the query
      }
    },
    {
      $lookup: {
        from: "revies", // Assuming "dinings" is the correct collection name
        localField: "reviews", // Field in the "hotel" documents containing ObjectId references to "dinings" documents
        foreignField: "_id", // The "_id" field in the "dinings" documents
        as: "reviewsOptions" // The array field to add to the resulting documents; contains the joined "dinings" documents
      }
    }
    // Add additional stages here as needed
  ]);
let  hotelObjectre={};
  if (hotelWithrewi.length > 0) {
    const reviewsOptions = hotelWithrewi[0].reviewsOptions;
    console.log("r--",reviewsOptions); // This will log the array of dining option documents to the console
    hotelObjectre={
      reviewsOptions:reviewsOptions
    }
  }
  // console.log("lllllllllllllllllllllllll:",hotelObjectr);
  const hotelObject={
    ...hotelObjectr,
    ...hotelObjectd,
    ...hotelObjectre
  }
  // console.log("lllllllllllllllllllllllll:",hotelObject);
  
  res.status(500).json({ 
    success: true,
    message: 'fatch all data', 
    data:hotelObject  
  });


  } catch (error) {
    console.log("error--",error);
  }
}




// const hotel = require("../models/hotel")
const allhotel= async(req,res)=>{
  try {
    console.log("kunj");
    const allh=await hotel.find({});
  

   
console.log("kunjesh");





    
    console.log("allh==",allh);
    res.json({
      success:true,
      data:allh
    })
  } catch (error) {
    console.log("error===",error);
    res.status(500).json({ success: false, error: error });
  }
}


const hotlfeedback= async(req,res)=>{
  try {
    // const x=;
    const {
      username,
      hotelName,
      rating,
      description,
      image
    }=req.body;
    if(!username || !hotelName ||!rating)
    {
       
      return res.status(500).json({
        success: false,
        message: 'filed all data',

        });
    }
   


    const hotlf= await hotel.findOne({hotelName:hotelName})
    if(!hotlf)
    {
      return res.status(500).json({
        success: false,
        message: 'hotel not found',
        });

    }
    console.log("hotelf---------------------",hotlf);
    console.log("hotelfid---------------------",hotlf.id);
    const user= req.user
    console.log("user----------------------=", user);
    console.log("userid-------------------------------", user.id);
    const userb=user.id;

    const userr = await User.findOne({ _id: user.id });


    console.log("user find===",userr);

    const objectId = new mongoose.Types.ObjectId(hotlf.id);

console.log("object id========================",objectId); 

      try {
        const userbook = await User.find({
          hotelbook: new ObjectId(hotlf.id)
        });
          console.log("user book found or not=========================",userbook);
   if(userbook.length<=0)
    {
      console.log("usr noyttt---",userbook);
    return  res.status(500).json({ success: false,  message: 'plesh book the room ya table', });
    }
console.log("kunjesjmmamckjm",userbook.length);

    } catch (error) {
        res.status(500).send(error.message);
    }

   const nrew=revie({
    username,
    description,
    hotelName:  hotelName,
    rating:rating,
    image:image
   })

  const saverevi= await nrew.save();
  console.log("revuuu000000000000000000",saverevi);

  const adddr= await hotel.findOneAndUpdate(
    { hotelName: hotelName }, // Find a document with this condition
    { $push: { reviews: nrew } }, // Add 'Jane Doe' to the 'friends' array
    { new: true } // Returns the document after update was applied
  )
  console.log("drrrrrrrrrrrrrrrrrrrrrr");
  const adduser= await User.findOneAndUpdate(
    { _id: user.id }, 
    { $push: { reivehotel: saverevi } ,
      
   }, 
    { new: true } 
  )

  
   console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhh");

  return res.status(500).json({
    success: true,
    message: 'hotel feed back add sucess full',
  data:saverevi

    });

  } catch (error) {
    console.log("error===",error);
    res.status(500).json({ success: false, error: error });
  
  }
}


const updatep = async (req, res) => {
  try {
    console.log('Received fields:', req.body);
    console.log('Received file:', req.file);

    const { firstName, lastName, email, postalCode, country, phone } = req.body;
    // let imageUrl = null;  // Initialize image URL as null

    // Check if a file is uploaded and process it
    if (req.file) {
      console.log("File path:", req.file.path);

      // Upload to Cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path, {
      //   resource_type: 'auto'
      // });
      // console.log("Image upload result:", result);

      // // Use secure URL from Cloudinary's response
      // imageUrl = result.secure_url;
      // console.log("Image URL:", imageUrl);
    }

    // Create or update user data in the database (uncomment and modify this part as per your database schema)
    /*
    const userData = await User.create({
      firstName,
      lastName,
      email,
      image: imageUrl,
      postalCode,
      country,
      phone
    });
    console.log("User updated:", userData);
    */

    // Respond with success message
    return res.json({
      message: 'Profile updated successfully',
      data: {
        firstName,
        lastName,
        email,
        phone,
        country,
        postalCode,
        // imageUrl: imageUrl  // This could be the Cloudinary URL or null if no file was uploaded
      }
    });
  } catch (error) {
    console.error('Error in update profile:', error);
    return res.status(500).json({
      message: 'Failed to update profile',
      error: error.message || 'Internal server error'
    });
  }
}

const likeh= async (req, res) => {
  try {
    console.log("enter a like hote",req.body);
    const { hotelIds } = req.body;
    const hotels = await hotel.find({
      '_id': { $in: hotelIds }
    });
    console.log("hotels==",hotels);
    res.json({ hotels });
  } catch (error) {
    console.error('Failed to retrieve hotels:', error);
    res.status(500).json({ message: 'Failed to retrieve hotels' });
  }
}



module.exports ={addhotel,handleRoomUpload,allhotel,dingadd,hotlfeedback,onehotel,updatep,likeh};
































// *******************************



// k.forEach(hotel => {
  //   console.log(`Hotel Name: ${hotel.hotelName}`);
  //   console.log('Dining Options:');
  
  //   // Check if diningOptions exist and is an array
  //   if (Array.isArray(hotel.diningOptions) && hotel.diningOptions.length > 0) {
  //     hotel.diningOptions.forEach(dining => {
  //       console.log(` - ${dining.restorentName}: ${dining.description}`);
     
  //     });
  //   } else {
  //     console.log(' - No dining options found for this hotel.');
  //   }
  
  //   console.log('----------');
  // });



// const addroom = async(req,res)=>{
//     try {
//         const{
//             roomtype,
//             area,
//             capcity,
//             bead,
//             price
    
//         }=req.body;
//         console.log("room image")
//         const roomi = req.files?.room[0]?.path;
//         // const roomi = req.file.path;
//         console.log("room imagess",roomi)
//         // if(!roomtype || !area || !capcity || !bead || !price || roomi)
//         // {
//         //    return res.status(500).json({
//         //         success: false,
//         //         message: 'passwoord not match successfully',
    
//         //         });
//         // }
//         console.log("data varify");
//         // const thumbnailImage = await uploadIMageToCloudinary(roomi,process.env.FOLDER_NAME);
//         const express = require('express');
//             const multer  = require('multer');
//             const { v2: cloudinary } = require('cloudinary');
//             const upload = multer({ dest: 'uploads/' });
//             require("dotenv").config();
//             cloudinary.config({
//             cloud_name:process.env.CNAME,
//             api_key: process.env.KEY, 
//             api_secret: process.env.SE
//             });

// console.log("kunjesh----");
//         const result = await cloudinary.uploader.upload(roomi, {
//             folder:process.env.FOLDER_NAME  // Optional: specify a folder in Cloudinary
//         });
//         console.log("upload clod nary");
//         const addhotelroom=await hotel.create({
//             // roomtype,
//             // area,
//             // capcity,
//             // bead,
//             // price,
//             image:roomi.secure_url
//         })

//         res.status(500).json({
//             success: true,
//             message: 'add room sucessfully successfully',

//             });
        
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'hotel room not  successfully',
//             message:error.message

//             });
//     }
// }
// const express = require('express');


// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
 
// const addroom = async(req, res) => {
//     try {
//       // req.file.path contains the url to the image in Cloudinary
//       console.log("kunj=---");

//       // const data=req.body;
//       // const roomi=req.file.path;
//       // console.log("data roo",data);
//       // console.log("data roo",roomi);
//       const roomDetails = {
//         roomtype: req.body.roomtype,
//         area: req.body.area,
//         capacity: req.body.capacity,
//         bed: req.body.bed,
//         price: req.body.price,
//         x: req.file.path
//          // URL to the uploaded image
//       };
//       console.log("kunj");
//   //  const 
//    console.log(x);
// //       const image = './path/to/image.jpg'; // This can also be a remote URL or a base64 DataURI

// // const result = await cloudinary.uploader.upload(image);
//     //   console.log("kunj=---2");
  
//     //   // Here you would typically save roomDetails to your database
  
//     //   console.log(roomDetails); // Logging the details for demonstration
//     //   res.json({ message: 'Room added successfully', roomDetails });
//     } catch (error) {
//       console.error('Error adding room:', error);
//       res.status(500).json({ message: 'Failed to add room', error: error.message });
//     }
//   };



// const addmargehole = async(req,res)=>{
//   try {
//     const{}
//   } catch (error) {
    
//   }
// }
    




// try {
//   const userbook=await User.aggregate([
//     {
//         $unwind: "$hotelbook"
//     },
//     {
//         $match: {
//             "hotelbook._id": objectId
//         }
//     }
// ]);
 
//   console.log("user book found or not=========================",userbook);
// } catch (error) {
//   console.log("add errrot------------",error);
//   res.status(500).send(err.message);
// }




    // const hotelbook = await Bookingro.findOne({})
    // const hotels = await User.find({_id: {$in: hotelbook}}).toArray();
    // console.log("hotels------",hotels);
    
    // if()