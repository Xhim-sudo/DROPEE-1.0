
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
  deliveryOption: string;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  deliveryFees,
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
          
          {deliveryOption === 'delivery' && (
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹{deliveryFees.totalFee.toFixed(2)}</span>
            </div>
          )}
          
          {deliveryOption === 'pickup' && (
            <div className="flex justify-between text-green-600">
              <span>Pickup (No Fee)</span>
              <span>₹0.00</span>
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
