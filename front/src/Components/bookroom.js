import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker,TimePicker } from '@mui/x-date-pickers';

const Roombook = () => {
  const [customerName, setCustomerName] = useState('');
  const [checkInDate, setCheckInDate] = useState(dayjs()); // Initialize to current date
  const [checkOutDate, setCheckOutDate] = useState(dayjs().add(1, 'day')); // Initialize to next day
  const location = useLocation();
  const { roomid, hotelid } = location.state;
  
  console.log("hotel id---", roomid, hotelid);

  useEffect(() => {
    // Apply styles
    const originalStyle = {
      backgroundImage: document.body.style.backgroundImage,
      backgroundSize: document.body.style.backgroundSize,
      backgroundPosition: document.body.style.backgroundPosition,
      backgroundRepeat: document.body.style.backgroundRepeat,
      margin: document.body.style.margin,
      height: document.body.style.height,
    };

    document.body.style.backgroundImage = "url('https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.margin = '0';
    document.body.style.height = '100vh';

    return () => {
      // Reset to original style
      document.body.style.backgroundImage = originalStyle.backgroundImage;
      document.body.style.backgroundSize = originalStyle.backgroundSize;
      document.body.style.backgroundPosition = originalStyle.backgroundPosition;
      document.body.style.backgroundRepeat = originalStyle.backgroundRepeat;
      document.body.style.margin = originalStyle.margin;
      document.body.style.height = originalStyle.height;
    };
  }, []);

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
      console.log('Success roombook:', result);
      alert('Data submitted successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit data');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-5 items-center py-8 px-4 w-full max-w-md mx-auto rounded-lg shadow bg-white"
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Book
        </Button>
      </form>
    </LocalizationProvider>
  );
};


const TableBooking = () => {

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
      dinings:diningid,
      hotelid
    };

    console.log("boking data",bookingData);

    try {
      const response = await fetch('/bookTable', { // Replace '/api/bookTable' with your actual endpoint
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
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '300px' }}>
        <DatePicker
          label="Booking Date"
          value={bookingDate}
          onChange={setBookingDate}
          renderInput={(params) => <TextField {...params} />}
          minDate={dayjs()}
        />
        <TimePicker
          label="Booking Time"
          value={bookingTime}
          onChange={setBookingTime}
          renderInput={(params) => <TextField {...params} />}
        />
        <TextField
          label="Number of People"
          type="number"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
          InputProps={{ inputProps: { min: 1 } }}
        />
        <TextField
          label="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <Button type="submit" variant="contained">Book Table</Button>
      </form>
    </LocalizationProvider>
  );
};


export { Roombook, TableBooking};
