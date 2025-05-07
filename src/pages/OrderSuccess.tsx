
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const OrderSuccess = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
          
          <p className="mb-6 text-muted-foreground">
            Thanks for your order. Your order details have been sent to the vendor via WhatsApp. They will contact you shortly to confirm and process your order.
          </p>
          
          <div className="p-4 bg-muted rounded-md mb-6 text-left">
            <h3 className="font-medium mb-2">What happens next?</h3>
            <ol className="list-decimal pl-5 text-sm space-y-2">
              <li>The vendor will confirm your order details and availability.</li>
              <li>You'll receive updates about your order preparation and delivery status.</li>
              <li>Have your payment ready according to your selected payment method.</li>
              <li>Please keep your phone handy to coordinate delivery or pickup.</li>
            </ol>
          </div>
          
          <div className="flex flex-col gap-4">
            <Link to="/">
              <Button className="w-full">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
