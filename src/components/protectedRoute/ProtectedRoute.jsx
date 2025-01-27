import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the user is logged in by verifying if a token exists in localStorage
  const token = localStorage.getItem('token');

  // If token doesn't exist, redirect to the login page
  if (!token) {
    return <Navigate to="/" />;
  }

  // If token exists, render the protected children (i.e., the component)
  return children;
};

export default ProtectedRoute;