
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  vendorId: string;
  vendorName: string;
  showQuickBuy?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  description,
  vendorId,
  vendorName,
  showQuickBuy = false
}) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      quantity: 1,
      image,
      vendorId,
      vendorName
    });
  };

  const handleQuickBuy = () => {
    // First add to cart
    addItem({
      id,
      name,
      price,
      quantity: 1,
      image,
      vendorId,
      vendorName
    });
    // Then redirect to checkout
    window.location.href = '/checkout';
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <Link to={`/product/${id}`}>
        <div className="aspect-square overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-lg truncate">{name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
        <div className="mt-2 font-semibold">₹{price.toFixed(2)}</div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          onClick={handleAddToCart} 
          className="w-full bg-theme-purple hover:bg-theme-purple-dark"
        >
          Add to Cart
        </Button>
        {showQuickBuy && (
          <Button 
            onClick={handleQuickBuy} 
            variant="outline" 
            className="w-full"
          >
            Buy Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
