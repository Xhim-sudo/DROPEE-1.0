
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingBag, Store, Upload } from 'lucide-react';

const VendorSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    storeName: '',
    storeAddress: '',
    storeDescription: '',
    businessType: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Form submission would be handled by Firebase authentication
    console.log('Vendor signup form submitted', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center">
            <ShoppingBag className="h-8 w-8 text-theme-purple" />
            <span className="ml-2 text-2xl font-bold">QuickOrder</span>
          </Link>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Become a Vendor
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Join our marketplace and start selling your products to customers
          </p>
        </div>

        <div className="mt-8 bg-white shadow-sm rounded-lg">
          <div className="bg-theme-purple rounded-t-lg py-4 px-6">
            <div className="flex items-center text-white">
              <Store className="h-5 w-5 mr-2" />
              <span className="font-semibold">Vendor Application</span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    All vendor applications require approval from our admin team. 
                    You will be notified via email once your application has been reviewed.
                  </p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                  
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  
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
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Create Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Store Information</h3>
                  
                  <div>
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input
                      id="storeName"
                      name="storeName"
                      type="text"
                      required
                      value={formData.storeName}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="storeAddress">Store Address</Label>
                    <Input
                      id="storeAddress"
                      name="storeAddress"
                      type="text"
                      required
                      value={formData.storeAddress}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    <select
                      id="businessType"
                      name="businessType"
                      required
                      value={formData.businessType}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-theme-purple focus:border-theme-purple"
                    >
                      <option value="">Select business type</option>
                      <option value="grocery">Grocery</option>
                      <option value="clothing">Clothing & Apparel</option>
                      <option value="electronics">Electronics</option>
                      <option value="handcrafts">Handcrafts & Art</option>
                      <option value="food">Food & Beverages</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="storeDescription">Store Description</Label>
                    <Textarea
                      id="storeDescription"
                      name="storeDescription"
                      required
                      rows={4}
                      value={formData.storeDescription}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <Label>Store Logo or Photo</Label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-medium text-theme-purple hover:text-theme-purple/80"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-theme-purple focus:ring-theme-purple border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    I agree to the{" "}
                    <Link to="/terms" className="text-theme-purple hover:text-theme-purple/80">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-theme-purple hover:text-theme-purple/80">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
              
              <div>
                <Button 
                  type="submit"
                  className="w-full bg-theme-purple hover:bg-theme-purple/80"
                >
                  Submit Application
                </Button>
              </div>
            </form>
            
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/vendor/login" className="font-medium text-theme-purple hover:text-theme-purple/80">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;
