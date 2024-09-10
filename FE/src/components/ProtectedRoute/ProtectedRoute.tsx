import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../Hooks/StoreHooks';
import React, { ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute : React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  
  
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;