// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [likedHotels, setLikedHotels] = useState([]);
  // Value that will be provided to consumers of the AuthContext
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userProfile,
    setUserProfile,
    likedHotels,
    setLikedHotels
  };
  console.log("user profile----",userProfile);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
