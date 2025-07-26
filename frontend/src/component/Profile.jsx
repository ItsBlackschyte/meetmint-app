import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';

const Profile = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get('/api/users/getHome');
        setMessage(res.data); // assuming the backend returns plain text
      } catch (error) {
        console.error('Failed to fetch profile message:', error);
        setMessage('Error loading message');
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="text-lg font-semibold text-center mt-10">
      {message}
    </div>
  );
};

export default Profile;
