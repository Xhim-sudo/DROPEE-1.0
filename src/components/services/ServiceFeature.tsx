
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ServiceFeatureProps {
  title: string;
  description: string;
  features: string[];
  icon: string;
  serviceId: string;
  buttonText: string;
  imageRight?: boolean;
}

const ServiceFeature: React.FC<ServiceFeatureProps> = ({
  title,
  description,
  features,
  icon,
  serviceId,
  buttonText,
  imageRight = false
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
      <div className={imageRight ? 'order-1' : 'order-1 md:order-1'}>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground mb-4">
          {description}
        </p>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link to={`/services/${serviceId}`}>
          <Button className="bg-theme-purple hover:bg-theme-purple-dark">
            {buttonText}
          </Button>
        </Link>
      </div>
      <div className={`bg-gray-100 rounded-lg p-10 flex items-center justify-center ${
        imageRight ? 'order-2' : 'order-2 md:order-1'
      }`}>
        <div className="text-6xl">{icon}</div>
      </div>
    </div>
  );
};

export default ServiceFeature;
