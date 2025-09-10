// src/components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  
  // Check if user is admin
  const isAdmin = user && user.role === 'admin';
  
  return isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;