import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
