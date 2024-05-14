import React, { useEffect, useState,useRef,createContext, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast";
import {useAuth} from "./AuthContext"
const UserContext = createContext();



const LoginForm = () => {
  const { setIsLoggedIn, setUserProfile ,setLikedHotels} = useAuth();
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
    // toast.success("Login Success");
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
      console.log("data---------login from fatch",data.data);
      console.log("data---------login from fatch like hotel",data.data.likeh);
      setUserProfile(data.data);
      setLikedHotels(data.data.likeh)
      toast.success("login successful! Welcome aboard.");
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
            {/* <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
            >
              
            </span> */}
          </div>

          <a
            onClick={() => navigate('/ForgotPassword')}
            className="self-end text-blue-600 hover:text-blue-700 text-sm mt-2 cursor-pointer"
          >
            Forgot Password?
          </a>

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



const LogoutButton = () => {
    const navigate = useNavigate();
    
    const { setIsLoggedIn, likedHotels } = useAuth();
    console.log("likedHotels======",likedHotels);
    const handleLogout = async () => {
      try {
        const response = await fetch("/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(likedHotels),
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

  const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch('/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });
  
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error sending OTP");
        toast.success("OTP sent to your email!");
        navigate("/OTPVerification");
      } catch (error) {
        toast.error(`Failed to send OTP: ${error.message}`);
      }
    };
  
    return (
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
          <h1 className="text-center font-semibold text-lg">Reset Your Password</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5"
            >
              Send OTP
            </button>
          </form>
        </div>
      </div>
    );
  };

  const OTPVerification = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch('/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, otp })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error verifying OTP");
        toast.success("OTP verified successfully!");
        navigate("/UpdatePassword");
      } catch (error) {
        toast.error(`Failed to verify OTP: ${error.message}`);
      }
    };
  
    return (
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
          <h1 className="text-center font-semibold text-lg">Verify OTP</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                name="otp"
                id="otp"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    );
  };



  const UpdatePassword = () => {
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({
      password: '',
      confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setPasswords(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (passwords.password !== passwords.confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }
  
      try {
        const response = await fetch('/update-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ newPassword: passwords.password })
        });
  
        if (response.ok) {
          toast.success('Password updated successfully');
          navigate("/LoginForm");
        } else {
          toast.error('Failed to update password');
        }
      } catch (error) {
        toast.error('Error: ' + error.message);
      }
    };
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-center text-gray-700">Update Password</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={passwords.password}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <FontAwesomeIcon 
                  icon={showPassword ? faEyeSlash : faEye} 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="eye-icon absolute inset-y-0 right-3 flex items-center cursor-pointer"
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <FontAwesomeIcon 
                  icon={showPassword ? faEyeSlash : faEye} 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="eye-icon absolute inset-y-0 right-3 flex items-center cursor-pointer"
                />
              </div>
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Update Password
            </button>
          </form>
        </div>
      </div>
    );
  };
  
export { LoginForm,LogoutButton,ForgotPassword,OTPVerification,UpdatePassword};
