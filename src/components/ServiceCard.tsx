
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  basePrice: number;
  isAdmin?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  icon,
  description,
  basePrice,
  isAdmin = false,
  onEdit,
  onDelete
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
        {isAdmin ? (
          <div className="w-full flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onEdit && onEdit(id)}
            >
              <Pencil className="h-4 w-4 mr-2" /> Edit
            </Button>
            <Button 
              variant="destructive" 
              className="flex-1"
              onClick={() => onDelete && onDelete(id)}
            >
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </Button>
          </div>
        ) : (
          <Link to={`/service-detail/${id}`} className="w-full">
            <Button className="w-full bg-theme-purple hover:bg-theme-purple-dark">
              View Details
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
