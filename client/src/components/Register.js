// src/components/Register.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import '../assets/style/Login.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Dispatch the register action to handle user registration
    dispatch(registerUser({ name, email, password }))
      .then(() => {
        // Redirect the user to the dashboard or login page after successful registration
        navigate('/dashboard');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className='login-section'>
     <div className='login-container'>
     <h2>USER REGISTER</h2>
     <form onSubmit={handleSubmit}>
      <div className='input-div'>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className='input-div'>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className='input-div'>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className='input-div'>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      
      <button className='submit-btn' type="submit">Register</button>
    </form>
     </div>
    </div>
  );
};

export default Register;
