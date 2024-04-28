import React, { useState } from 'react';

function AddDiningForm() {
  const [formData, setFormData] = useState({
    restorentName: '',
    description: '',
    phoneNumber: '',
    email: '',
    Cuisine: '',
    Lunch: '',
    DressCode: '',
    Dinner: '',
    Price: '',
    Table: '',
    hotelName: '',
    MenuFiles: [], // To store multiple menu files
  RestaurantImage: null 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
  if (name === "MenuFiles") {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: [...(prevFormData[name] || []), ...Array.from(files)]
    }));
  } else if (name === "RestaurantImage") {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: files[0] // Store the first file for the restaurant image
    }));
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("from fddmdksm--",formData);
const dataToSend = new FormData();
Object.keys(formData).forEach(key => {
  if (key === "MenuFiles") {
    formData[key].forEach(file => {
      dataToSend.append("MenuFiles", file);
    });
  } else if (key === "RestaurantImage") {
    dataToSend.append(key, formData[key]);
  } else {
    dataToSend.append(key, formData[key]);
  }
});
    console.log("datea send=",...dataToSend);
    try {
      const response = await fetch('/addding', {
        method: 'POST',
        body: dataToSend, // FormData will set the `Content-Type` to `multipart/form-data` for you
      });
    
      const result = await response.json();
      console.log(result);
      alert('Dining option added successfully');
    } catch (error) {
      console.error('Error adding dining option:', error);
      alert('Failed to add dining option');
    }
  };

  return (
    <div className=" bg-balack  bg-[url('https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?cs=srgb&dl=pexels-pixabay-260922.jpg&fm=jpg')] bg-cover
    pt-25 flex items-center justify-center bg-cover">
    <div className="bg-white bg-opacity-90 backdrop-blur-sm shadow-md rounded-lg p-6 space-y-4 max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Iterate over formData to create input fields */}
        {Object.keys(formData).map(key => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="mb-2 text-sm font-medium text-gray-900">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="border-2 border-gray-300 bg-gray-50 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}
        
        {/* Input for multiple menu files */}
<input type="file" multiple id="menuFiles" name="MenuFiles" onChange={handleFileChange} />
{/* Input for single restaurant image */}
<input type="file" id="restaurantImage" name="RestaurantImage" onChange={handleFileChange} />

        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg hover:bg-blue-600">Submit</button>
      </form>
    </div>
  </div>
  

  );
}



export { AddDiningForm };
