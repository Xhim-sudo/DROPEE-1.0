
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { calculateDeliveryFee } from '@/utils/deliveryUtils';
import { useCart } from '@/context/CartContext';
import CustomerInfoForm from './CustomerInfoForm';
import DeliveryPaymentOptions from './DeliveryPaymentOptions';
import OrderSummary from './OrderSummary';

const CheckoutContainer: React.FC = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    instructions: '',
    deliveryOption: 'vendor',
    paymentMethod: 'cash'
  });

  // Use default values for delivery factors now managed by admin
  const distance = 3; // default distance in km
  const weight = 1; // default weight in kg
  const weather = 'normal'; // default weather condition
  const [deliveryFees, setDeliveryFees] = useState({
    baseFee: 100,
    distanceFee: 0,
    weightFee: 0,
    weatherFee: 0,
    totalFee: 100
  });

  // Calculate delivery fees using admin-set parameters
  useEffect(() => {
    const fees = calculateDeliveryFee(distance, weight, weather);
    setDeliveryFees(fees);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would send the order to a backend
    toast({
      title: "Order placed successfully!",
      description: "You will receive a WhatsApp message with your order details.",
    });
    
    // Clear the cart and redirect to success page
    clearCart();
    navigate('/order-success');
  };

  // Redirect to home if cart is empty
  if (items.length === 0) {
    navigate('/');
    return null;
  }

  // Calculate totals
  const subtotal = getSubtotal();
  const deliveryFee = deliveryFees.totalFee;
  const total = subtotal + deliveryFee + (formData.deliveryOption === 'third-party' ? 50 : 0);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Checkout Form */}
      <div className="flex-grow">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
              <CustomerInfoForm formData={formData} onChange={handleChange} />
            </form>
          </CardContent>
        </Card>
        
        <DeliveryPaymentOptions 
          deliveryOption={formData.deliveryOption}
          paymentMethod={formData.paymentMethod}
          onOptionChange={handleSelectChange}
        />
      </div>
      
      {/* Order Summary */}
      <div className="lg:w-80">
        <OrderSummary
          items={items}
          subtotal={subtotal}
          deliveryFees={deliveryFees}
          distance={distance}
          weight={weight}
          weather={weather}
          deliveryOption={formData.deliveryOption}
          total={total}
        />
      </div>
    </div>
  );
};

export default CheckoutContainer;
