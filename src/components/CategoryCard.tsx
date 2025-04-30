
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  subcategories?: string[];
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  icon,
  subcategories
}) => {
  return (
    <Link to={`/categories/${id}`}>
      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <div className="text-4xl mb-2">{icon}</div>
          <h3 className="font-medium text-lg">{name}</h3>
          {subcategories && subcategories.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {subcategories.slice(0, 3).join(', ')}
              {subcategories.length > 3 ? '...' : ''}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
