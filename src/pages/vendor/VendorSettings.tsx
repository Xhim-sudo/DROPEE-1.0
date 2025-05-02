
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StoreInfoForm from '@/components/vendor/settings/StoreInfoForm';
import PaymentSettings from '@/components/vendor/settings/PaymentSettings';
import ShippingSettings from '@/components/vendor/settings/ShippingSettings';
import AccountSettings from '@/components/vendor/settings/AccountSettings';

const VendorSettings = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <p className="text-muted-foreground mb-6">
        Manage your store settings and preferences
      </p>

      <Tabs defaultValue="store">
        <TabsList className="mb-6">
          <TabsTrigger value="store">Store Information</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        {/* Store Information Tab */}
        <TabsContent value="store">
          <StoreInfoForm />
        </TabsContent>
        
        {/* Payments Tab */}
        <TabsContent value="payments">
          <PaymentSettings />
        </TabsContent>
        
        {/* Shipping Tab */}
        <TabsContent value="shipping">
          <ShippingSettings />
        </TabsContent>
        
        {/* Account Tab */}
        <TabsContent value="account">
          <AccountSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorSettings;
