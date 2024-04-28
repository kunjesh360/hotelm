import React from 'react'
import { useAuth } from './AuthContext';
const Design = (props) => {
  const { userProfile } = useAuth();
  console.log("user profile--",userProfile);
  
    const roundImageStyle = {
      borderRadius: '50%',
      width: '100px',
      height: '100px',
      objectFit: 'cover',
    };
  return (
<div  >
    {/* <div className='grid place-items-center text-richblack-100 text-3xl h-full'>kunjesh undhafd</div> */}
    <div>user profile</div>

    <div >
     
      {userProfile && (
        <div className="max-w-sm mx-auto my-10 overflow-hidden rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:shadow-xl transition-shadow duration-300 ease-in-out">
  <div className="px-6 py-4 text-lg text-white bg-opacity-75 bg-gray-800">
    Profile
  </div>
  <img className="object-cover object-center w-full h-56" src={userProfile.image} alt="avatar" />
  <div className="flex items-center justify-between px-6 py-4 bg-white">
    <h1 className="text-lg font-semibold">{userProfile.firstName} {userProfile.lastName}</h1>
    <span className="px-2 py-1 text-xs text-white bg-opacity-75 rounded-full bg-green-500">{userProfile.typeacouent}</span>
  </div>
  <div className="px-6 py-4 bg-white">
    <div className="text-sm">
      <p><span className="font-bold">Email:</span> {userProfile.email}</p>
      <p><span className="font-bold">Phone:</span> {userProfile.phone}</p>
      <p><span className="font-bold">Country:</span> {userProfile.country}</p>
      <p><span className="font-bold">Postal Code:</span> {userProfile.postalCode}</p>
    </div>
  </div>
</div>
      )}
    </div>
    </div>

  )
}

export default Design