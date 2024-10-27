
// src/components/EditProfile.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store/userSlice';

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure new password and confirm password match
    if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
      alert('New passwords do not match!');
      return;
    }

    // Dispatch an action to update the user's profile (with password confirmation)
    dispatch(updateUser(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="password">Current Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="newPassword">New Password</label>
        <input
          id="newPassword"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="confirmNewPassword">Confirm New Password</label>
        <input
          id="confirmNewPassword"
          type="password"
          name="confirmNewPassword"
          value={formData.confirmNewPassword}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Update Profile</button>
    </form>
  );
};

export default EditProfile;
