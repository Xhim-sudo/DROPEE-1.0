
import React from 'react';
import ServiceFeature from './ServiceFeature';

const ServiceFeatures: React.FC = () => {
  return (
    <div className="container py-10">
      <ServiceFeature 
        title="Cash Delivery Service"
        description="Need cash but can't make it to an ATM? We'll deliver it to your doorstep! Our secure cash delivery service uses PIN verification for safety."
        features={[
          "Secure PIN verification system",
          "Partnered with trusted banks",
          "Same-day delivery available"
        ]}
        icon="💰"
        serviceId="1"
        buttonText="Get Cash Delivered"
        imageRight={false}
      />
      
      <ServiceFeature 
        title="Parcel Delivery Service"
        description="Send packages across town quickly and reliably. Our weight-based pricing ensures transparency and fair rates."
        features={[
          "Base price covers parcels up to 5kg",
          "Fair surcharge for heavier items",
          "Real-time delivery tracking"
        ]}
        icon="📦"
        serviceId="2"
        buttonText="Send a Parcel"
        imageRight={true}
      />
    </div>
  );
};

export default ServiceFeatures;
