import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Spline from '@splinetool/react-spline';
import { Link } from 'react-router-dom';
import LeftSideModel from './LeftSideModel';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [role, setRole] = useState('attendee');
const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profilePhotoUrl: '',
    organiser: false,
  });

  const navigate = useNavigate();

const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === 'role') {
    setFormData((prev) => ({
      ...prev,
      organiser: value === 'organizer', 
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
   console.log(formData);
    try {
      const res = await axios.post('api/users/register', formData);

      if (res.data.success) {
        toast.success('Signup successful!');
        navigate('/login');
      } else {
        toast.error(res.data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Signup failed, please try again.');
    }
  };


  return (
 <div className="flex h-screen w-screen overflow-hidden">
      <div className="w-1/2 h-full">
        <LeftSideModel />
      </div>

      <div className="w-1/2 flex items-center justify-center bg-white p-10 overflow-y-auto">
        <div className="w-full max-w-md shadow-lg rounded-lg p-8 bg-white">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-1 font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter a strong password"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <span className="block mb-1 font-medium text-gray-700">Sign Up As</span>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="attendee"
                    checked={!formData.organiser}
                    onChange={handleChange}
                  />
                  Attendee
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="organizer"
                    checked={formData.organiser}
                    onChange={handleChange}
                  />
                  Organizer
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
