
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/data/mockData';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Services = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-theme-purple-light to-theme-purple-dark text-white py-10 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold mb-4">Special Delivery Services</h1>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              From cash delivery to parcel shipping, we've got you covered with our range of specialized services.
            </p>
            <Button size="lg" className="bg-white text-theme-purple hover:bg-gray-100">
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Services Grid */}
        <div className="container py-10">
          <PageHeader 
            title="Our Services" 
            description="Choose from our range of special delivery services"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {services.map(service => (
              <ServiceCard
                key={service.id}
                id={service.id}
                name={service.name}
                icon={service.icon}
                description={service.description}
                basePrice={service.basePrice}
              />
            ))}
          </div>
        </div>
        
        {/* Feature Sections */}
        <div className="container py-10">
          {/* Cash Delivery Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">Cash Delivery Service</h2>
              <p className="text-muted-foreground mb-4">
                Need cash but can't make it to an ATM? We'll deliver it to your doorstep! Our secure cash delivery service uses PIN verification for safety.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Secure PIN verification system</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Partnered with trusted banks</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Same-day delivery available</span>
                </li>
              </ul>
              <Link to="/services/1">
                <Button className="bg-theme-purple hover:bg-theme-purple-dark">
                  Get Cash Delivered
                </Button>
              </Link>
            </div>
            <div className="bg-gray-100 rounded-lg p-10 flex items-center justify-center">
              <div className="text-6xl">💰</div>
            </div>
          </div>
          
          {/* Parcel Delivery Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 bg-gray-100 rounded-lg p-10 flex items-center justify-center">
              <div className="text-6xl">📦</div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl font-bold mb-4">Parcel Delivery Service</h2>
              <p className="text-muted-foreground mb-4">
                Send packages across town quickly and reliably. Our weight-based pricing ensures transparency and fair rates.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Base price covers parcels up to 5kg</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Fair surcharge for heavier items</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Real-time delivery tracking</span>
                </li>
              </ul>
              <Link to="/services/2">
                <Button className="bg-theme-purple hover:bg-theme-purple-dark">
                  Send a Parcel
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Pricing Table */}
        <div className="container py-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Service Pricing</h2>
            <p className="text-muted-foreground">
              Transparent pricing for all our delivery services
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="py-3 px-4 text-left">Service</th>
                  <th className="py-3 px-4 text-left">Base Price</th>
                  <th className="py-3 px-4 text-left">Additional Fees</th>
                  <th className="py-3 px-4 text-left">Delivery Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="mr-2">💰</span>
                      <span>Cash Delivery</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">₹150 (PIN) + ₹100 (Delivery)</td>
                  <td className="py-3 px-4">None</td>
                  <td className="py-3 px-4">2-4 hours</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="mr-2">📦</span>
                      <span>Parcel Delivery</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">₹100</td>
                  <td className="py-3 px-4">₹30/kg above 5kg</td>
                  <td className="py-3 px-4">Same day</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="mr-2">🧺</span>
                      <span>Grocery Delivery</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">₹50</td>
                  <td className="py-3 px-4">None</td>
                  <td className="py-3 px-4">1-3 hours</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="mr-2">💊</span>
                      <span>Medicine Delivery</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">₹80</td>
                  <td className="py-3 px-4">None</td>
                  <td className="py-3 px-4">30-90 minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
