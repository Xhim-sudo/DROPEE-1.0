
import React from 'react';
import { Button } from '@/components/ui/button';
import VendorCard from '@/components/VendorCard';
import { vendors } from '@/data/mockData';
import { Link } from 'react-router-dom';

const FeaturedShops = () => {
  // Filter featured vendors
  const featuredVendors = vendors.filter(vendor => vendor.featured);

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Shops</h2>
          <Link to="/shops">
            <Button variant="link" className="text-theme-purple">
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVendors.map(vendor => (
            <VendorCard
              key={vendor.id}
              id={vendor.id}
              name={vendor.name}
              logo={vendor.logo}
              description={vendor.description}
              rating={vendor.rating}
              deliveryRadius={vendor.deliveryRadius}
              featured={true}
              location={vendor.location}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedShops;
