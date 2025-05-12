
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  requiredRole?: 'admin' | 'vendor' | 'user';
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requiredRole,
  redirectPath = '/login'
}) => {
  const { currentUser, isAdmin, isVendor, isUser, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    // You could render a loading spinner here
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // Check if user is authenticated
  if (!currentUser) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }
  
  // Check if user has the required role
  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  if (requiredRole === 'vendor' && !isVendor) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  if (requiredRole === 'user' && !isUser && !isAdmin && !isVendor) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;
