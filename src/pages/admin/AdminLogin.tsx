
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, ShoppingBag } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Admin login form submitted', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center">
            <ShoppingBag className="h-8 w-8 text-theme-purple" />
            <span className="ml-2 text-2xl font-bold">QuickOrder</span>
          </Link>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Admin Login
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Access the admin dashboard
          </p>
        </div>

        <div className="mt-8 bg-white shadow-sm rounded-lg">
          <div className="bg-gray-800 rounded-t-lg py-4 px-6">
            <div className="flex items-center text-white">
              <ShieldCheck className="h-5 w-5 mr-2" />
              <span className="font-semibold">Admin Portal</span>
            </div>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/admin/forgot-password" className="text-sm text-theme-purple hover:text-theme-purple/80">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-theme-purple focus:ring-theme-purple border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              
              <div>
                <Button 
                  type="submit"
                  className="w-full bg-gray-800 hover:bg-gray-700"
                >
                  Sign In
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
