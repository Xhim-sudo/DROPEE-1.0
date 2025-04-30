
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface VendorCardProps {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  deliveryRadius: string;
  featured?: boolean;
  location?: string;
}

const VendorCard: React.FC<VendorCardProps> = ({
  id,
  name,
  logo,
  description,
  rating,
  deliveryRadius,
  featured = false,
  location
}) => {
  return (
    <Card className={`overflow-hidden h-full flex flex-col ${featured ? 'border-theme-purple' : ''}`}>
      {featured && (
        <div className="bg-theme-purple text-white text-center text-xs py-1">
          Featured Shop
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
            <img
              src={logo}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-medium text-lg">{name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Star size={16} fill="gold" className="text-yellow-500" />
                <span className="ml-1">{rating.toFixed(1)}</span>
              </div>
              <span className="mx-1">•</span>
              <span>{location}</span>
              <span className="mx-1">•</span>
              <span>Delivers up to {deliveryRadius}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{description}</p>
      </div>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Link to={`/shop/${id}`} className="w-full">
          <Button 
            className="w-full"
            variant={featured ? "default" : "outline"} 
          >
            View Shop
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default VendorCard;
