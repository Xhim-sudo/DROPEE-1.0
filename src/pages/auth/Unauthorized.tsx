
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <ShieldAlert className="h-20 w-20 text-red-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Access Denied
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          You don't have permission to access this page.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            <Button 
              className="w-full flex items-center justify-center"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            
            <Button 
              className="w-full flex items-center justify-center"
              variant="outline"
              asChild
            >
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            
            <Button 
              className="w-full bg-theme-purple hover:bg-theme-purple-dark"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
