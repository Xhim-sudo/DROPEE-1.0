
import React from 'react';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/data/mockData';

const ServicesSection = () => {
  return (
    <section className="py-10">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Our Services</h2>
          <Button variant="link" className="text-theme-purple">
            View All
          </Button>
        </div>

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
    </section>
  );
};

export default ServicesSection;
