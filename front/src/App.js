import "./App.css";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./Components/Home";
import { HotelReviewForm ,About} from "./Components/About";
import { LoginForm, LogoutButton,ForgotPassword,OTPVerification,UpdatePassword } from "./Components/LoginForm"
import Dashboard from "./pages/Dashboard"
import SignupForm from "./Components/SignupForm"
import PrivateRoute from "./Components/PrivateRoute";
import { HotelHome, HotelList, Hotel, Dining, Roomhotel,Like } from "./Components/hotel"
import {Design,Chat} from "./Components/Design";
import Hoteladd from  "./Components/hotel/addhoetl" ;
import RoomForm from "./Components/hotel/addroom";
import { Roombook, TableBooking } from "./Components/bookroom";
import { AddDiningForm } from "./Components/hotel/addding";
import { AuthProvider } from "./Components/AuthContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="w-screen h-screen bg-richblack-900 flex flex-col">
      <AuthProvider>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/addroom" element={<RoomForm />} />
          <Route path="/addhotel" element={<Hoteladd />} />
          <Route path="/addding" element={<AddDiningForm />} />
          <Route path="/HotelReviewForm" element={<HotelReviewForm />} />
          <Route path="/Roombook" element={<Roombook />} />
          <Route path="/TableBooking" element={<TableBooking />} />
          <Route path="/HotelList" element={<HotelList />} />
          <Route path="/LogoutButton" element={<LogoutButton setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/hotel/*" element={<Hotel />}>
            <Route path="HotelHome" element={<HotelHome />} />
            <Route path="Dining" element={<Dining />} />
            <Route path="Roomhotel" element={<Roomhotel />} />
          </Route>
          <Route path="/Ding" element={<Design />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/About" element={<About />} />
          <Route path="/like" element={<Like />} />
          <Route path="/UpdatePassword" element={<UpdatePassword />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/OTPVerification" element={<OTPVerification />} />
          <Route path="/LoginForm" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignupForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/dashboard" element={<PrivateRoute isLoggedIn={isLoggedIn}><Dashboard /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;









   {/* <Route path="/otp" element={<OtpPage />} /> */}
        {/* <Route path="/addotp" element={<VerifyOtpPage />} /> */}

        {/* <Route path='/posts' element={<Posts />}>
           <Route path='knew' element={<Kpo />} />
           <Route path='new' element={<NewPost />} />
        </Route> */}