import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';
import { FaRegCalendarDays } from "react-icons/fa6";
import toast from 'react-hot-toast';
// import toast from 'react-hot-toast';
import {  useLocation } from 'react-router-dom';

// const Bookticket =()=>{
//   const location = useLocation();
//   const roomid = location.state?.roomid;
//   async function  handleSubmit () {
//     const bookingData = {

//       // console.log(people,"room",Room,"selectedDate",selectedDate,"selectedfromDate",selectedfromDate,"formData",formData);
//       people,
//       Room,
//       selectedDate,
//       selectedfromDate,
//       formData
//       // Include any other relevant data you want to send to the backend
//     };
//     console.log("booking--",bookingData);
  
//     const savedUserResponse = await fetch(
//       `/bookings`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ...bookingData }),
//       }
//     );

//     console.log("FORM RESPONSE......", savedUserResponse);

//   };
  
//   //for person add and romve 
//   const [people, setPeople] = useState(0);
//   const handleAddPerson =(value)=>{
    
//     setPeople(people+1);
//   }
//   const handleRemovePerson =(value)=>{
//     if(people>=1)
//     setPeople(people-1);
//     else
//     toast.error("This didn't work.")
//   }

//   //add room and romove
//   const[Room,SetRoom]=useState(0);
//   const handleAddRoom =()=>{
//     SetRoom(Room+1);
//     console.log(people,"room",Room,"selectedDate",selectedDate,"selectedfromDate",selectedfromDate,"formData",formData);
//   }
//   const handleRemoveRoom =()=>{
//     if(Room>=1)
//     SetRoom(Room-1);
//     else
//     toast.error("This didn't work.")
//   }
//   // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedfromDate, setfromSelectedDate] = useState(null);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [showfromCalendar, setfromShowCalendar] = useState(false);
//   const handleShowButtonClick = () => {
//     setShowCalendar(true);
//   };
   
//     const handleButtonClick = () => {
//       setShowCalendar(true); 
//     };

//      const handlefromShowButtonClick =()=>{
//          setfromShowCalendar(true);
//      }

  
//     const handleSaveButtonClick = () => {
//       setShowCalendar(false); 
//       console.log("Date Saved to:", selectedDate); 
//      const dayjsDate = selectedDate;
//      const dateObject = {
//       day: dayjsDate.date(), 
//       month: dayjsDate.month() + 1, 
//       year: dayjsDate.year(),
//     };
    
//     console.log("date to-----------",dateObject); 
      
    
//     }; 

//   const handlefromSaveButtonClick =()=>{
//     setfromShowCalendar(false);
//     console.log("Date Saved from:",selectedfromDate);
//     const dayjsDate = selectedfromDate;
//     const dateObject = {
//       day: dayjsDate.date(), 
//       month: dayjsDate.month() + 1, // Gets the month (1-indexed)
//       year: dayjsDate.year(), // Gets the year
//     };
    
//     console.log("date to-----------",dateObject); 
//   }
//   const handleDateChange = (newValue) => {
//     setSelectedDate(newValue);
//     console.log(selectedDate);
    
//   };
//   const handlefromDateChange = (newValue)=>{
//     setfromSelectedDate(newValue)
//     console.log(selectedfromDate);
//   }
//   const addt=()=>{
//     console.log("kunj---");
//     handleSubmit()
//     console.log("kunj");
//   }
//   const [formData, setFormData] = useState({
//     firstName: "",
//     password: "",
// });
//   function changeHandler(event) {
//     setFormData((prev) => ({
//         ...prev,
//         [event.target.name]: event.target.value,
//     }));
// }
//     return (
//    <div>
//           <div className='flex flex-col'>
//           <div>
//                {/* searc */}
//               <div>
//               <label className="w-full">
//                   {/* <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
//                     Search<sup className="text-pink-200">*</sup>
//                   </p> */}
//                   <input
//                     className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
//                     required
//                     type="text"
//                     name="firstName"
//                     id="firstName"
//                     onChange={changeHandler}
//                     value={formData.firstName}
//                     placeholder="Search Hoteal and more"
//                   />
//                 </label>

//               </div>

//               {/* calendar */}
//              <div>
//              <div>
//                   <div>
//                   {!showCalendar && <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700" onClick={handleShowButtonClick}><p className=' text-richblack-25'>from <FaRegCalendarDays /></p></button>} {/* Button to trigger the calendar */}
//                           {showCalendar && (
//                             <div className="bg-white text-black"> {/* Tailwind classes for background and text color */}
//                               <LocalizationProvider
//                                 dateAdapter={AdapterDayjs}
//                                 localeText={{
//                                   calendarWeekNumberHeaderText: '#',
//                                   calendarWeekNumberText: (weekNumber) => `${weekNumber}.`,
//                                 }}
//                               >
//                                 <DateCalendar
//                                   displayWeekNumber
//                                   onChange={handleDateChange}
//                                   value={selectedDate} // Bind the DateCalendar's value to the state
//                                   />
//                                     <button onClick={handleSaveButtonClick}>Save Date</button>
                                
//                               </LocalizationProvider>
//                             </div>
//                           )}
//                   </div>
//                     <div>
//                     {!showfromCalendar && <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700" onClick={handlefromShowButtonClick}><p className=' text-richblack-25'>to <FaRegCalendarDays /></p></button>} {/* Button to trigger the calendar */}
//                             {showfromCalendar && (
//                               <div className="bg-white text-black"> {/* Tailwind classes for background and text color */}
//                                 <LocalizationProvider
//                                   dateAdapter={AdapterDayjs}
//                                   localeText={{
//                                     calendarWeekNumberHeaderText: '#',
//                                     calendarWeekNumberText: (weekNumber) => `${weekNumber}.`,
//                                   }}
//                                 >
//                                   <DateCalendar
//                                     displayWeekNumber
//                                     onChange={handlefromDateChange}
//                                     value={selectedfromDate} // Bind the DateCalendar's value to the state
//                                     />
//                                       <button onClick={handlefromSaveButtonClick}>Save Date</button>
                                  
//                                 </LocalizationProvider>
//                               </div>
//                             )}
//                     </div>
//                </div>
//             </div>
//           </div>
//           {/* add room and person */}
//           <div>
//            <div> <p>person</p>
//             <div className=' text-richblack-25'>
//             <button onClick={handleAddPerson}>Add Person</button>{people}
//           <button onClick={handleRemovePerson}>Remove Person</button>
//             </div></div>
//            <div> <p>Room</p>
//             <div className=' text-richblack-25'>
//             <button onClick={handleAddRoom}>Add Room</button>{Room}
//           <button onClick={handleRemoveRoom}>Remove Room</button>
//             </div></div>
//           </div>
//           {/* for coupen */}
//           <div>
//           <label className="w-full">
//                   {/* <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
//                     Search<sup className="text-pink-200">*</sup>
//                   </p> */}
//                   <input
//                     className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
//                     required
//                     type="text"
//                     name="firstName"
//                     id="firstName"
//                     onChange={changeHandler}
//                     value={formData.firstName}
//                     placeholder="add promocode"
//                   />
//                 </label>
//           </div>
//           {/* //button chake avebletiy */}
//           <div>
//               <button  onClick={addt} className=' text-richblack-25'>
//               CHECK AVAILABILITY
//               </button>
//           </div>
//           </div>
//           <div>
          
//           </div>
//    </div>
     
//     );
// }

