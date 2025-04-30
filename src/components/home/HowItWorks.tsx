
import React from 'react';

const steps = [
  {
    id: 1,
    title: 'Browse & Select',
    description: 'Find what you need from our shops and services',
    icon: '🔍'
  },
  {
    id: 2,
    title: 'Add to Cart',
    description: 'Choose items or services and add them to your cart',
    icon: '🛒'
  },
  {
    id: 3,
    title: 'Checkout',
    description: 'Enter delivery details - no signup required',
    icon: '📝'
  },
  {
    id: 4,
    title: 'Get Delivery',
    description: 'Receive your order at your doorstep',
    icon: '🚚'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">How It Works</h2>
          <p className="text-muted-foreground mt-2">Simple steps to get what you need, delivered</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-16 h-16 bg-theme-purple rounded-full flex items-center justify-center text-white text-2xl mb-4">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200" style={{ width: 'calc(100% - 4rem)' }}>
                    <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 w-3 h-3 bg-theme-purple rounded-full"></div>
                  </div>
                )}
              </div>
              <h3 className="font-medium text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
