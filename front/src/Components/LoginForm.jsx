import React, { useEffect, useState,useRef,createContext, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast";
import {useAuth} from "./AuthContext"
const UserContext = createContext();

const LoginForm = ({ props }) => {
  const { setIsLoggedIn, setUserProfile } = useAuth();
    
   

    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function changeHandler(event) {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }

    async function submitHandler(event) {

        event.preventDefault();
        console.log("fromdata==",formData);
        toast.success("Login Success");
        console.log(formData)
        setIsLoggedIn(true);
        try {
            const savedUserResponse = await fetch(
              `/login`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData }),
              }
            );
            const data = await savedUserResponse.json();

            console.log("data--",data.data);
            
            setIsLoggedIn(true); // Update isLoggedIn state in context
            setUserProfile(data.data); 
            // if (!savedUserResponse.ok) {
            //   throw new Error(`HTTP error! status kunj: ${savedUserResponse.status}`);
            // }
      
            console.log("FORM RESPONSE......", savedUserResponse);
      
        
          
            // console.log("Form submitted successfully. Server Response:", data);
            // Handle successful form submission here (e.g., display a message, redirect, etc.)
          } catch (error) {
            console.error("Form submission error:", error);
            // Handle form submission error here (e.g., display error message)
          }
      
        // console.log("userp----",userp.current);
        navigate("/");
    }

    return (
    <div>
            <form onSubmit={submitHandler} class="flex flex-col gap-y-4 mt-8 px-4 md:px-8 py-6 max-w-lg mx-auto bg-white rounded-2xl shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
        <div class="w-full">
          <label for="email" class="block text-lg font-medium text-gray-800 mb-2">
            Email Address <span class="text-rose-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            placeholder="Enter your email address"
            onChange={changeHandler}
            name="email"
            class="mt-1 block w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-gray-900 shadow placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>
    
        <div class="w-full relative">
          <label for="password" class="block text-lg font-medium text-gray-800 mb-2">
            Password <span class="text-rose-600">*</span>
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
            placeholder="Enter Password"
            onChange={changeHandler}
            name="password"
            class="mt-1 block w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-gray-900 shadow placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer hover:text-rose-600"
          >
            {/* Replace with eye/eye-off icon based on `showPassword` */}
          </span>
        </div>
    
        <a href="#" class="text-sm font-medium text-blue-600 hover:text-blue-700 mt-2 self-end">
          Forgot Password?
        </a>
    
        <button
          type="submit"
          class="mt-4 w-full bg-rose-600 hover:bg-rose-800 text-white font-bold py-3 px-6 rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-rose-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          Sign In
        </button>
    </form>
    
    </div>
      
    );
};

const LogoutButton = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn, setUserProfile } = useAuth();
    const handleLogout = async () => {
      try {
        const response = await fetch('/logout', {
          method: 'GET', // Or 'POST', if your backend requires
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include', // Include if using cookies
        });
        const data = await response.json();
        console.log("data", data);
  
        if (response.ok) {
          console.log("Logout data", data.message);
          setIsLoggedIn(false)
          navigate('/'); // Redirect to login page after successful logout
        } else {
          throw new Error(data.message || 'Failed to logout');
        }
      } catch (error) {
        console.error("Logout error:", error.message);
      }
    };
    useEffect(()=>{
        handleLogout()
    },[])
  
    return (
      <div></div>
    );
  };


export { LoginForm,LogoutButton};
