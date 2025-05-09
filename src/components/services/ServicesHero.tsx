
import React from 'react';
import { Button } from '@/components/ui/button';

const ServicesHero: React.FC = () => {
  return (
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
  );
};

export default ServicesHero;
