import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast";

exports.Addmoredatile = (props)=>{
    const navigate = useNavigate();
   function submitHandler(event){
    event.preventDefault();
    toast.success("addd more datile  Success full");
    console.log(formData)
    setIsLoggedIn(true);
    navigate("/dashboard");
   }
   const [count, setCount] = useState("notmaride");
    return(
        
       <div>
        <div>
            
        </div>
        <div>

        </div>
       </div>
    )
}