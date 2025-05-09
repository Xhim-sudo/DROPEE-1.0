
import React from 'react';

const ServicesPricingTable: React.FC = () => {
  return (
    <div className="container py-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Service Pricing</h2>
        <p className="text-muted-foreground">
          Transparent pricing for all our delivery services
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead className="bg-muted">
            <tr>
              <th className="py-3 px-4 text-left">Service</th>
              <th className="py-3 px-4 text-left">Base Price</th>
              <th className="py-3 px-4 text-left">Additional Fees</th>
              <th className="py-3 px-4 text-left">Delivery Time</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <span className="mr-2">💰</span>
                  <span>Cash Delivery</span>
                </div>
              </td>
              <td className="py-3 px-4">₹150 (PIN) + ₹100 (Delivery)</td>
              <td className="py-3 px-4">None</td>
              <td className="py-3 px-4">2-4 hours</td>
            </tr>
            <tr className="border-t">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <span className="mr-2">📦</span>
                  <span>Parcel Delivery</span>
                </div>
              </td>
              <td className="py-3 px-4">₹100</td>
              <td className="py-3 px-4">₹30/kg above 5kg</td>
              <td className="py-3 px-4">Same day</td>
            </tr>
            <tr className="border-t">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <span className="mr-2">🧺</span>
                  <span>Grocery Delivery</span>
                </div>
              </td>
              <td className="py-3 px-4">₹50</td>
              <td className="py-3 px-4">None</td>
              <td className="py-3 px-4">1-3 hours</td>
            </tr>
            <tr className="border-t">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <span className="mr-2">💊</span>
                  <span>Medicine Delivery</span>
                </div>
              </td>
              <td className="py-3 px-4">₹80</td>
              <td className="py-3 px-4">None</td>
              <td className="py-3 px-4">30-90 minutes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesPricingTable;
