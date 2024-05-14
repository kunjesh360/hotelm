import React, { useState } from 'react';

function RoomForm() {
  const [roomDetails, setRoomDetails] = useState({
    dec1:'',
    wifi:'',
    roomtype: '',
    area: '',
    capacity: '',
    bed: '',
    price: '',
    dec:'',
    hotelk:'',
    roomcount:''
  });
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    setRoomDetails({
      ...roomDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("f=",file,"kunj");
    const formData = new FormData();
    Object.entries(roomDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    // Append the file separately
    if (file) {
      formData.append('image', file);
    }

    try {
      const response = await fetch('/room', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log('Success:', result);
      alert('Data submitted successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Imperial_Hotel_Osaka_regular_floor_standard_twin_room_20120630-001.jpg/1200px-Imperial_Hotel_Osaka_regular_floor_standard_twin_room_20120630-001.jpg')"}}>
    <div className="w-1/2 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="roomtype" placeholder="Room Type" onChange={handleInputChange} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <input type="text" name="dec1" placeholder="dec1" onChange={handleInputChange} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <input type="text" name="wifi" placeholder="wifi" onChange={handleInputChange} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <input type="text" name="area" placeholder="Area" onChange={handleInputChange} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <input type="text" name="capacity" placeholder="Capacity" onChange={handleInputChange} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <input type="text" name="bed" placeholder="Bed" onChange={handleInputChange} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <input type="text" name="price" placeholder="Price" onChange={handleInputChange} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <input type="text" name="dec" placeholder="dec" onChange={handleInputChange} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <input type="text" name="hotelk" placeholder="hotelk" onChange={handleInputChange} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <input type="text" name="roomcount" placeholder="roomcount" onChange={handleInputChange} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <input type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Submit</button>
      </form>
    </div>
  </div>
  
  
  );
}



























// import React, { useState } from 'react';
// import axios from 'axios';

// function hoteladd() {
//   const [formData, setFormData] = useState({
//     hotelName: '',
//     description: '',
//     phoneNumber: '',
//     email: '',
//     description2: '',
//     hpDescription: '', // Assuming hpdec meant another description
//   });
//   const [images, setImages] = useState([]);

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     Object.keys(formData).forEach(key => data.append(key, formData[key]));
//     images.forEach(image => data.append('images', image));

//     try {
//       const response = await fetch('/addhotel', {
//         method: 'POST',
//         body: data,
//       });
//       const result = await response.json();
//       console.log('Success:', result);
//       alert('Data submitted successfully');
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to submit data');
//     }


//     // try {
//     //   await axios.post('/addhotel', data, {
//     //     headers: {
//     //       'Content-Type': 'multipart/form-data',
//     //     },
//     //   });
//     //   alert('Data submitted successfully');
//     // } catch (error) {
//     //   console.error('Error submitting form:', error);
//     //   alert('Failed to submit data');
//     // }
//   };

//   return (
//     <div className="App">
//       <h1>Hotel Information Uploader</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="hotelName" placeholder="Hotel Name" onChange={handleInputChange} required />
//         <textarea name="description" placeholder="Description" onChange={handleInputChange} required />
//         <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleInputChange} required />
//         <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
//         <input type="text" name="description2" placeholder="description2" onChange={handleInputChange} required />
//         <textarea name="hpDescription" placeholder="Additional Description" onChange={handleInputChange} required />
//         <input type="file" multiple onChange={handleFileChange} accept="image/*" />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }


// ***********
  //   const formData = new FormData();
  //   formData.append('roomtype', roomDetails.roomtype);
  //   formData.append('dec1', roomDetails.dec1);
  //   formData.append('wifi', roomDetails.wifi);
  //   formData.append('dec', roomDetails.dec);
  //   formData.append('area', roomDetails.area);
  //   formData.append('capacity', roomDetails.capacity);
  //   formData.append('bed', roomDetails.bed);
  //   formData.append('price', roomDetails.price);
  //   formData.append('image', file);
  //   formData.append('hotel', roomDetails.hotel);
  //  console.log("data==",formData);
  /********** */


export default RoomForm;