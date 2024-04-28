import React, { useState } from 'react';

function Hoteladd() {
    const [formData, setFormData] = useState({
      hotelName: '',
      description: '',
      phoneNumber: '',
      email: '',
      description2: '',
      Price:'',
      hpDescription: '', // Assuming hpdec meant another description
      Descriptionoutside: '', // Assuming hpdec meant another description
    });
    const [images, setImages] = useState([]);
  
    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleFileChange = (e) => {
      setImages([...e.target.files]);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("hotel",formData,"inage",images);
  console.log("kunj==",images);
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
         
      images.forEach(image => data.append('images', image));
      console.log("data",data);
      try {
        const response = await fetch('/hotel', {
          method: 'POST',
          body: data,
        });
        const result = await response.json();
        console.log('Success:', result);
        alert('Data submitted successfully');
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit data');
      }
  
  
      // try {
      //   await axios.post('/addhotel', data, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   });
      //   alert('Data submitted successfully');
      // } catch (error) {
      //   console.error('Error submitting form:', error);
      //   alert('Failed to submit data');
      // }
    };
  
    return (
      <div className="App bg-cover bg-center min-h-screen flex items-center justify-center" style={{ backgroundImage: "url('https://www.theworlds50best.com/asia/en/filestore/jpg/A50BR24-Profile-Florilege-int.jpg')" }}>
      <div className="w-full max-w-lg bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Hotel Information Uploader</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="hotelName" placeholder="Hotel Name" onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />


          <textarea name="description" placeholder="Description" onChange={handleInputChange} required className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea name="Descriptionoutside" placeholder="Descriptionoutside" onChange={handleInputChange} required className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" name="description2" placeholder="description2" onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" name="Price" placeholder="Price" onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea name="hpDescription" placeholder="Additional Description" onChange={handleInputChange} required className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="file" multiple onChange={handleFileChange} accept="image/*" className="w-full px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-none file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Submit</button>
        </form>
      </div>
    </div>
    
    );
  }
  export default Hoteladd;