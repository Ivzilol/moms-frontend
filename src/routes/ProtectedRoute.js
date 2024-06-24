import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authorities } = useAuth();

  const roles = [];

  const hasRequiredRole = roles.length === 0 || roles.some(role => authorities.includes(role));

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!hasRequiredRole) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;