
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from '@/components/ui/card';
import { CartItem } from '@/context/CartContext';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  deliveryFees: {
    baseFee: number;
    distanceFee: number;
    weightFee: number;
    weatherFee: number;
    totalFee: number;
  };
  distance: number;
  weight: number;
  weather: string;
  deliveryOption: string;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  deliveryFees,
  distance,
  weight,
  weather,
  deliveryOption,
  total
}) => {
  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.quantity}× {item.name}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          
          {/* Delivery Fee Breakdown */}
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Base Delivery Fee</span>
            <span>₹{deliveryFees.baseFee.toFixed(2)}</span>
          </div>
          
          {deliveryFees.distanceFee > 0 && (
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Distance Fee ({distance} km)</span>
              <span>₹{deliveryFees.distanceFee.toFixed(2)}</span>
            </div>
          )}
          
          {deliveryFees.weightFee > 0 && (
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Weight Fee ({weight} kg)</span>
              <span>₹{deliveryFees.weightFee.toFixed(2)}</span>
            </div>
          )}
          
          {deliveryFees.weatherFee > 0 && (
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{weather === 'rainy' ? 'Rainy' : 'Extreme'} Weather Fee</span>
              <span>₹{deliveryFees.weatherFee.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span>Total Delivery Fee</span>
            <span>₹{deliveryFees.totalFee.toFixed(2)}</span>
          </div>
          
          {deliveryOption === 'third-party' && (
            <div className="flex justify-between">
              <span>Third-Party Delivery</span>
              <span>₹50.00</span>
            </div>
          )}
          <div className="border-t pt-4 flex justify-between font-medium">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 mt-6">
          <Button 
            type="submit"
            form="checkout-form"
            className="w-full bg-theme-purple hover:bg-theme-purple-dark"
          >
            Place Order
          </Button>
          <Link to="/cart">
            <Button variant="outline" className="w-full">
              Back to Cart
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
