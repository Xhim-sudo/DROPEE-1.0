
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">DROPEE</h3>
            <p className="text-gray-600 mb-4">Your one-stop shop for fast, convenient deliveries and services.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-theme-purple">Home</Link></li>
              <li><Link to="/categories" className="text-gray-600 hover:text-theme-purple">Categories</Link></li>
              <li><Link to="/shops" className="text-gray-600 hover:text-theme-purple">Shops</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-theme-purple">Services</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-600 hover:text-theme-purple">Service Delivery</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-theme-purple">Parcel Delivery</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-theme-purple">Grocery Delivery</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-theme-purple">Medicine Delivery</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-600">
              <p>Email:hashtagDropee@gmail.com</p>
              <p>Phone: +91 7005498122</p>
              <p>Hours: 8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()}DROPEE. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/terms" className="text-gray-600 text-sm hover:text-theme-purple">Terms of Service</Link>
            <Link to="/privacy" className="text-gray-600 text-sm hover:text-theme-purple">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
