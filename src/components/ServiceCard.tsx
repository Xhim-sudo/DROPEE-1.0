
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  basePrice: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  icon,
  description,
  basePrice
}) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
        <div className="mt-4 font-semibold">
          From ₹{basePrice.toFixed(2)}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Link to={`/services/${id}`} className="w-full">
          <Button className="w-full bg-theme-purple hover:bg-theme-purple-dark">
            Select
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
