import React, { useState } from 'react';
import { FaQuoteRight, FaQuoteLeft } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import DECK from '../assets/img/sahil.jpg';
import { tw } from '@twind/react';
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import {  Route, Routes, Link,useLocation } from 'react-router-dom';

import { useAuth } from './AuthContext';
const HotelReviewForm = () => {
  const { userProfile } = useAuth();
  const image=userProfile.image;
  const location = useLocation();
  const hotelNamek = location.state?.hotelName;
  console.log("hotel namw--",hotelNamek);
  const [formData, setFormData] = useState({
    username: '',
    description: '',
    rating: 0, // Initialize rating as 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRatingChange = (ratingValue) => {
    setFormData({
      ...formData,
      rating: ratingValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    
  // Create a FormData object and populate it with formData state
const data = new FormData();
Object.keys(formData).forEach(key => data.append(key, formData[key]));
data.append("hotelName", hotelNamek)
data.append("image", userProfile.image);  

// Correct way to log FormData content
for (let [key, value] of data.entries()) {
  console.log(`${key}: ${value}`);
}
    try {
      // Make a POST request with the FormData object
      const response = await fetch('/hotelfeedback', {
        method: 'POST',
        body: data, // No need to set Content-Type header, browser does it automatically with FormData
      });


      const result = await response.json();
      console.log('Success=====:', result);
      // if(result.)
        // console.log("re----",result.message);
      alert(result.message);
      // alert('Feedback submitted successfully!');

      // // Reset the form after successful submission
      setFormData({
        username: '',
        description: '',
        hotelName: '',
        rating: 0,
      });

    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4">
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      {/* <input
        type="text"
        name="hotelName"
        placeholder="Hotel Name"
        value={formData.hotelName}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md"
      /> */}
     <div>
        <span className="text-lg">Rating:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(star)}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            onAnimationEnd={(e) => e.target.style.transform = 'scale(1)'}
            className={`text-lg cursor-pointer transition-transform duration-150 ease-in-out ${star <= formData.rating ? 'text-yellow-500' : 'text-gray-400'}`}
            style={{ transform: 'scale(1)', transition: 'transform 0.1s ease' }}
          >
            ★
          </button>
        ))}
      </div>
      
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
};



// const UserProfileComponent = () => {
//   // Use the `useAuth` hook to get access to the `userProfile`
//   const { userProfile } = useAuth();
//   console.log("user profile--",userProfile);
//   // Now you can use `userProfile` to access the user data
//   return (
//     <div>
//       <h1>User Profile...........</h1>
//       {userProfile && (
//         <div>
//           <p>Email: {userProfile.email}</p>
//           <p>First Name: {userProfile.firstName}</p>
//           <p>Last Name: {userProfile.lastName}</p>
//           {/* Display other user details */}
//         </div>
//       )}
//     </div>
//   );
// };





const ReviewCard = (props) => {
  const reviews = props.reviews;
  console.log("reviewww=====",reviews);
  const [index, setIndex] = useState(0);

  const leftShiftHandler = () => {
      index - 1 < 0 ? setIndex(reviews.length - 1) : setIndex(index - 1);
  };

  const rightShiftHandler = () => {
      index + 1 === reviews.length ? setIndex(0) : setIndex(index + 1);
  };

  const surpriseShiftHandler = () => {
      const surpriseIndex = Math.floor(Math.random() * reviews.length);
      setIndex(surpriseIndex);
  };

  const review = reviews[index];
  const le = reviews.length;
  console.log("le---", le);

  return (
    <>
      {le > 0 ? (
        <div className="flex flex-col items-center justify-center w-[85vw] md:w-[700px] bg-gray-100 hover:shadow-lg rounded-md transition-all duration-700 mt-10 p-10">
          <div className="flex flex-col md:relative">
            {/* Avatar and background circle commented out because it doesn't fit the gray theme directly
            <div className="absolute -top-[7rem] z-10">
                <img src={review.image} alt="image" className='w-[140px] h-[140px] rounded-full aspect-ratio z-25' />
                <div className="w-[140px] h-[140px] bg-gray-300 rounded-full absolute top-[-6px] z-[-10] left-[10px]"></div>
            </div> */}

            <div className="text-center mt-7">
                <p className="font-bold text-2xl text-gray-800 tracking-wider capitalize">{review.username}</p>
                {/* <p className="uppercase text-sm text-gray-500">{review.job}</p> */}
            </div>

            <div className="text-gray-400 mx-auto mt-5">
                <FaQuoteLeft />
            </div>

            <div className="text-center mt-4 text-gray-600">
                {review.description}
            </div>

            <div className="text-gray-400 mx-auto mt-5">
                <FaQuoteRight />
            </div>
          </div>

          <div className="flex mt-6 gap-3 text-3xl mx-auto font-bold text-gray-500 ">
              <button
                  className="cursor-pointer w-fit hover:text-gray-600 mt-5"
                  onClick={leftShiftHandler}
              >
                  <FiChevronLeft />
              </button>
              <button
                  className="cursor-pointer w-fit hover:text-gray-600 mt-5"
                  onClick={rightShiftHandler}
              >
                  <FiChevronRight />
              </button>
          </div>

          <div className="mt-5">
              <button
                  className="bg-gray-400 text-white font-bold px-10 py-2 rounded-md hover:bg-gray-500 transition-all duration-200 text-lg"
                  onClick={surpriseShiftHandler}
              >
                  Surprise Me
              </button>
          </div>
        </div>
      ) : (
        <p>No reviews available</p>
      )}
    </>
  );
};






const About = () => {
  return (
    <div className={tw`bg-white p-8`}>
      <div className={tw`container mx-auto max-w-6xl`}>
        <h1 className={tw`text-5xl font-bold text-center text-gray-900 mb-10`}>
          Discover Our Legacy
        </h1>
        <section className={tw`mb-12 text-center`}>
          <p className={tw`text-xl text-gray-800`}>
            With over 25 years of excellence in hospitality, our hotel blends the charm of tradition with modern sophistication.
          </p>
        </section>
        <div className={tw`grid grid-cols-1 md:grid-cols-2 gap-10 items-center`}>
          <img src="https://plus.unsplash.com/premium_photo-1661963141660-95914cc99cc5?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hotel Lobby" className={tw`rounded-lg shadow-2xl transform transition duration-500 hover:scale-105`} />
          <div>
            <h2 className={tw`text-3xl font-semibold text-gray-800`}>Our Mission</h2>
            <p className={tw`text-gray-700 mt-4`}>
              Our mission is to provide unparalleled hospitality that ensures every guest feels valued, at home, and eager to return.
            </p>
          </div>
        </div>
        <section className={tw`text-center my-12`}>
          <h2 className={tw`text-3xl font-semibold text-gray-800`}>Why Choose Us?</h2>
          <ul className={tw`list-disc list-inside text-gray-700 mt-4 space-y-2 text-left`}>
            <li>Central location with easy access to main attractions</li>
            <li>Exquisite culinary experiences in our award-winning restaurants</li>
            <li>Luxurious spa and wellness facilities</li>
            <li>Customized experiences and events</li>
          </ul>
        </section>
              <section className={tw`bg-gradient-to-r from-gray-100 to-gray-300 p-8 rounded-lg shadow-xl`}>
        <h2 className={tw`text-3xl font-semibold text-center text-gray-800`}>Meet Our Team</h2>
        <div className={tw`flex flex-wrap justify-center gap-8 mt-8`}>
          <ProfileCard name="Sahil Vaghasiya" role="General Manager" image="https://img.freepik.com/free-photo/medium-shot-smiley-man-sitting-desk_23-2149927603.jpg" />
          <ProfileCard name="Megha Agarwal" role="Head Chef" image="https://img.mensxp.com/media/content/2019/Apr/meet-auro-kitchen-amp-bar-rsquo-s-head-chef-megha-agarwal1200-1556280371.jpg" />
          <ProfileCard name="Alice Johnson" role="Administrator" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtPr9lQvwqcKpPflxZC9q4y30JkQukIZNAhl63zatcQQ&s" />
        </div>
      </section>
      </div>
    </div>
  );
}

const ProfileCard = ({ name, role, image }) => (
  <div className={tw`shadow-lg rounded-lg p-4 bg-gray-50`}>  {/* Changed background to a light gray */}
    <img src={image} alt={name} className={tw`w-32 h-32 rounded-full mx-auto`} />
    <div className={tw`text-center mt-4`}>
      <p className={tw`text-lg font-semibold text-gray-900`}>{name}</p> {/* Dark gray for primary text */}
      <p className={tw`text-sm text-gray-600`}>{role}</p> {/* Unchanged, already using gray */}
    </div>
  </div>
);









// const login =()=>{
//   return(
//     <duv>
//         <div>
//     <LoginSocialGoogle
//       client_id={"962087509873-vd543o0djpl3uo7ln42bnnerobpa4j6o.apps.googleusercontent.com"}
//       scope="openid profile email"
//       discoveryDocs="claims_supported"
//       access_type="offline"
//       onResolve={({ provider, data }) => {
//         console.log(provider, data);
//       }}
//       onReject={(err) => {
//         console.log(err);
//       }}
//     >
//       <GoogleLoginButton />
//     </LoginSocialGoogle>
//   </div>
//     </duv>
//   )
// }


 // Adjust the import path as necessary



// export default ;


export { HotelReviewForm,ReviewCard,About};
