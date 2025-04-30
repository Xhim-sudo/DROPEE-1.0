
import React from 'react';
import PageHeader from '@/components/PageHeader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CheckoutContainer from '@/components/checkout/CheckoutContainer';

const Checkout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container py-8">
        <PageHeader 
          title="Checkout" 
          description="Complete your order with just a few steps"
        />
        <CheckoutContainer />
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
