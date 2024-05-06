import React, { useEffect, useState,useRef,createContext, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast";
import {useAuth} from "./AuthContext"
const UserContext = createContext();

// import { useState } from "react";
// import { useAuth } from "./path/to/useAuth"; // Adjust the path as necessary
// import { useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify'; // Ensure react-toastify is installed

const LoginForm = () => {
  const { setIsLoggedIn, setUserProfile } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(event) {
    setFormData(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    toast.success("Login Success");
    setIsLoggedIn(true);
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUserProfile(data.data);
      navigate("/");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Login failed. Please try again.");
    }
  }

  return (
    <div className="relative min-h-screen bg-cover bg-[url('https://c0.wallpaperflare.com/preview/243/377/129/motel-hotel-sign-neon-sign.jpg')]">
      <div className="max-w-lg mx-auto p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl mt-20">
        <form onSubmit={submitHandler} className="flex flex-col gap-y-4">
          <div>
            <label htmlFor="email" className="text-lg font-medium text-gray-700">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={changeHandler}
              name="email"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="text-lg font-medium text-gray-700">Password *</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={changeHandler}
              name="password"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
            >
              {/* Eye Icon Here */}
            </span>
          </div>

          <a href="#" className="self-end text-blue-600 hover:text-blue-700 text-sm mt-2">Forgot Password?</a>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-150 ease-in-out"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;


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
