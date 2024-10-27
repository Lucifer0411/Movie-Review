// src/components/PrivateRoute.js

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // If user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
