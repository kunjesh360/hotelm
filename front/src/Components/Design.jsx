import React ,{ useState, useEffect } from 'react'
import { useAuth } from './AuthContext';
import io from 'socket.io-client';
const Design = () => {
  const { userProfile, setUserProfile } = useAuth(); 
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {userProfile && (
        <div className="max-w-sm w-full bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <div className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 rounded-t-lg p-4 flex flex-col items-center">
            <img
              className="rounded-full border-4 border-white shadow-sm"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              src={userProfile.image}
              alt="avatar"
            />
            <h1 className="mt-3 text-lg text-white font-semibold">
              {userProfile.firstName} {userProfile.lastName}
            </h1>
            <span className="px-3 py-1 mt-2 text-xs rounded-full bg-green-500 bg-opacity-75 text-white">
              {userProfile.typeacouent}
            </span>
            <button onClick={() => setModalOpen(true)} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded">
              Edit Profile
            </button>
          </div>
          <div className="px-6 py-4">
            <div className="text-sm text-gray-700">
              <p><span className="font-bold">Email:</span> {userProfile.email}</p>
              <p><span className="font-bold">Phone:</span> {userProfile.phone}</p>
              <p><span className="font-bold">Country:</span> {userProfile.country}</p>
              <p><span className="font-bold">Postal Code:</span> {userProfile.postalCode}</p>
            </div>
          </div>
        </div>
      )}
      <ProfileModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} userProfile={userProfile}  />
    </div>
  );
};



const ProfileModal = ({ isOpen, onClose, userProfile }) => {
  const {  setUserProfile } = useAuth(); 
  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      postalCode: ''
  });


  
  useEffect(() => {
      if (isOpen && userProfile) {
          setFormData({
              firstName: userProfile.firstName || '',
              lastName: userProfile.lastName || '',
              email: userProfile.email || '',
              phone: userProfile.phone || '',
              country: userProfile.country || '',
              postalCode: userProfile.postalCode || ''
          });
      }
  }, [isOpen, userProfile]);

  
  const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('country', formData.country);
    data.append('postalCode', formData.postalCode);


console.log("data==",...data);
    try {
        const response = await fetch('/updatep', {
            method: 'POST',
            body: data,
        });

        if (!response.ok) {
            const errorData = await response.text();  
            try {
                const errorObj = JSON.parse(errorData);
                throw new Error(errorObj.message || 'Failed to update profile');
            } catch (jsonError) {
                
                throw new Error('Failed to update profile due to server error');
            }
        }

        const result = await response.json();
        console.log('Success:', result);
        console.log('Success:', result.data);
        setUserProfile(result.data)
        alert('Profile updated successfully');
        
    } catch (error) {
        console.error('Error:', error);
        alert(error.message || "Network error, please try again later.");
    }

    onClose(); 
};


  if (!isOpen) return null;
  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Edit Profile</h2>
              <form onSubmit={handleSubmit}>
                
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="mb-2" />
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="mb-2" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="mb-2" />
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="mb-2" />
                  <input type="text" name="country" value={formData.country} onChange={handleChange} className="mb-2" />
                  <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="mb-2" />
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                  <button type="button" onClick={onClose} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              </form>
          </div>
      </div>
  );
};




const SERVER_URL = 'http://localhost:3000'; 
function Chat() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { userProfile } = useAuth();

  useEffect(() => {
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket.on('chat', (newMessage) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });
    }
  }, [socket]);

  const sendMessage = () => {
    if (socket && message) {
      const messageToSend = { text: message, sender: userProfile.firstName + " " + userProfile.lastName };
      socket.emit('chat', messageToSend);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-semibold text-center mb-4">Chat</h1>
      <ul className="flex flex-col flex-1 overflow-auto mb-4 bg-gray-800 p-4">
        {messages.map((msg, index) => (
          <li key={index} className="bg-gray-700 rounded-md p-2 mb-2">
            <p className="text-sm text-white">{msg.sender}</p>
            <p>{msg.text}</p>
          </li>
        ))}
      </ul>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : null}
          className="flex-1 rounded-l-md p-2 outline-none focus:ring-2 focus:ring-blue-500  text-black"
          placeholder="Type your message here..."
        />
        <button 
          onClick={sendMessage} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded-r-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}







export { Design,Chat};