const jwt = require('jsonwebtoken');
require("dotenv").config();
const authenticate = (req, res, next) => {
  const token = req.cookies.token; // Access the token stored in the cookie named 'token'
  
  if (!token) {
    return res.status(403).json({ message: 'Authentication token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded token to the request object
    console.log("completed mid");
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const admin = async (req, res, next) => {
   
    try {
        const acount=req.user; 
        const ac=acount.accountType;
    
        // Access the token stored in the cookie named 'token'
        
        if (ac!=="admin") {
          return res.status(403).json({
        
             message:"this fro only admine" });
        }
        console.log("completed admin");
        next();
   } catch (error) {
       return res.status(401).json({
           sucess:false,
           message:'acoount type admin is not featch'
       })
       
   }
    
   
  };
module.exports = {authenticate,admin};