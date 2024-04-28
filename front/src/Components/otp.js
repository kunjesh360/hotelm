
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const OtpPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleGetOtp = async () => {
    const response = await fetch('/otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    console.log("kunjesh otp",data); // Handle the response data as needed
   navigate('/addotp')

  };
    
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Get OTP</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleGetOtp}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition-colors"
        >
          Get OTP
        </button>
      </div>
    </div>
  );
};



const VerifyOtpPage = () => {
  const [fetchedOtp, setFetchedOtp] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [verificationResult, setVerificationResult] = useState('');

  useEffect(() => {
    // Fetch the OTP from the backend on component mount
    fetch('/giveotp')
      .then((response) => response.json())
      .then((data) => {
        setFetchedOtp(data.otp); // Assuming the response has an otp field
      })
      .catch((error) => console.error('Error fetching OTP:', error));
  }, []);

  const verifyOtp = async () => {
    if (fetchedOtp === userOtp) {
      setVerificationResult('OTP is correct. Verification successful.');
    } else {
      setVerificationResult('OTP is incorrect. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50"> {/* Changed bg color */}
    <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-lg"> {/* Adjusted width and spacing */}
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900"> {/* Increased font size and adjusted text color */}
        Verify OTP
      </h2>
      <input
        type="text"
        placeholder="Enter your OTP"
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
        value={userOtp}
        onChange={(e) => setUserOtp(e.target.value)}
      />{/* Enhanced focus styling */}
      <button
        onClick={verifyOtp}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
      >
        Verify OTP
      </button>
      {verificationResult && (
        <p className="mt-2 text-center text-sm text-gray-600"> {/* Adjusted text size and color */}
          {verificationResult}
        </p>
      )}
    </div>
  </div>
 
  );
};


export { OtpPage, VerifyOtpPage };