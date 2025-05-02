
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const StoreInfoForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Information</CardTitle>
        <CardDescription>
          Update your store details and appearance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Store Details */}
        <div>
          <h3 className="font-medium mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="store-name">Store Name</Label>
              <Input id="store-name" defaultValue="Fresh Grocery Market" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-email">Contact Email</Label>
              <Input id="store-email" type="email" defaultValue="contact@freshgrocery.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-phone">Contact Phone</Label>
              <Input id="store-phone" type="tel" defaultValue="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax-id">Tax/Business ID</Label>
              <Input id="tax-id" defaultValue="TAX-123456789" />
            </div>
          </div>
        </div>

        {/* Store Address */}
        <div>
          <h3 className="font-medium mb-4">Store Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="address">Address Line</Label>
              <Input id="address" defaultValue="123 Market Street" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" defaultValue="San Francisco" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" defaultValue="California" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">Postal Code</Label>
              <Input id="zip" defaultValue="94103" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="country">Country</Label>
              <select id="country" className="w-full border rounded-md p-2">
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="au">Australia</option>
              </select>
            </div>
          </div>
        </div>

        {/* Store Description */}
        <div>
          <h3 className="font-medium mb-4">About Your Store</h3>
          <div className="space-y-2">
            <Label htmlFor="description">Store Description</Label>
            <Textarea id="description" rows={4} defaultValue="Fresh Grocery Market offers locally sourced organic produce, artisanal baked goods, and premium dairy products. Our mission is to provide the freshest ingredients to our community while supporting local farmers." />
          </div>
        </div>

        {/* Store Logo & Banner */}
        <div>
          <h3 className="font-medium mb-4">Store Appearance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="logo">Store Logo</Label>
              <div className="border border-dashed rounded-md p-4 text-center">
                <div className="w-32 h-32 bg-gray-100 mx-auto rounded-full flex items-center justify-center">
                  <span className="text-muted-foreground">Logo Preview</span>
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  Upload Logo
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="banner">Store Banner</Label>
              <div className="border border-dashed rounded-md p-4 text-center">
                <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Banner Preview</span>
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  Upload Banner
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="bg-theme-purple hover:bg-theme-purple/80 ml-auto">Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default StoreInfoForm;
