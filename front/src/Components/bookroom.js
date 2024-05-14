import {  useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker,TimePicker } from '@mui/x-date-pickers';

const Roombook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomid, hotelid } = location.state;
  const [customerName, setCustomerName] = useState('');
  const [checkInDate, setCheckInDate] = useState(dayjs());
  const [checkOutDate, setCheckOutDate] = useState(dayjs().add(1, 'day'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      customerName,
      checkInDate: checkInDate.format('YYYY-MM-DD'),
      checkOutDate: checkOutDate.format('YYYY-MM-DD'),
      roomid,
      hotelid
    };

    try {
      const response = await fetch('/roombook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      alert(result.message); 
      navigate('/HotelList'); 
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit data');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('https://i.pinimg.com/736x/21/71/35/2171358ee3a18ff8191a88fc60ac8073.jpg')]">
        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col gap-5 items-center p-8 w-full max-w-md mx-auto rounded-lg shadow-lg bg-white/90 backdrop-blur-sm"
        >
          <TextField
            label="Customer Name"
            variant="outlined"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            className="w-full"
          />
          <DatePicker
            label="Check-in Date"
            value={checkInDate}
            onChange={setCheckInDate}
            minDate={dayjs()}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="Check-out Date"
            value={checkOutDate}
            onChange={setCheckOutDate}
            minDate={checkInDate.add(1, 'day')}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button
            variant="contained"
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-150 ease-in-out"
          >
            Book
          </Button>
        </form>
      </div>
    </LocalizationProvider>
  );
};

const TableBooking = () => {
  const navigate = useNavigate();
  const [bookingDate, setBookingDate] = useState(dayjs());
  const [bookingTime, setBookingTime] = useState(dayjs());
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const location = useLocation();
  const { diningid, hotelid } = location.state;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookingData = {
      bookingDate: bookingDate.format('YYYY-MM-DD'),
      bookingTime: bookingTime.format('HH:mm'),
      numberOfPeople,
      customerName,
      diningid,
      hotelid
    };

    console.log("Booking data", bookingData);

    try {
      const response = await fetch('/bookTable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) throw new Error('Network response was not ok.');

      const result = await response.json();
      console.log(result);
      alert('Booking successful');
      navigate('/HotelList'); 
      // Reset form
      setBookingDate(dayjs());
      setBookingTime(dayjs());
      setNumberOfPeople(1);
      setCustomerName('');
    } catch (error) {
      console.error('Error:', error);
      alert('Booking failed');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: "url('https://st2.depositphotos.com/30312588/47073/i/450/depositphotos_470735506-stock-photo-metal-plaque-words-reserved-stands.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col gap-4 p-8 bg-white shadow-md rounded-lg max-w-md mx-auto backdrop-filter backdrop-blur-lg bg-opacity-90"
        >
          <DatePicker
            label="Booking Date"
            value={bookingDate}
            onChange={setBookingDate}
            renderInput={(params) => <TextField {...params} className="w-full" />}
            minDate={dayjs()}
          />
          <TimePicker
            label="Booking Time"
            value={bookingTime}
            onChange={setBookingTime}
            renderInput={(params) => <TextField {...params} className="w-full" />}
          />
          <TextField
            label="Number of People"
            type="number"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            InputProps={{ inputProps: { min: 1 } }}
            className="w-full"
          />
          <TextField
            label="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full"
          />
          <Button
            type="submit"
            variant="contained"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Book Table
          </Button>
        </form>
      </div>
    </LocalizationProvider>
  );
};


export { Roombook, TableBooking};
