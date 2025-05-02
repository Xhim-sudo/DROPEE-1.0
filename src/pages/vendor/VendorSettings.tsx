
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
        </TabsContent>
        
        {/* Payments Tab */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>
                Configure how you receive payments from customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Payment Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="payment-credit" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="payment-credit">Credit & Debit Cards</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="payment-paypal" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="payment-paypal">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="payment-bank" className="h-4 w-4" />
                    <Label htmlFor="payment-bank">Bank Transfer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="payment-cash" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="payment-cash">Cash on Delivery</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Payout Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bank-name">Bank Name</Label>
                    <Input id="bank-name" defaultValue="First National Bank" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input id="account-number" defaultValue="********1234" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="routing-number">Routing Number</Label>
                    <Input id="routing-number" defaultValue="*******789" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-theme-purple hover:bg-theme-purple/80 ml-auto">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Shipping Tab */}
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
              <CardDescription>
                Configure how your products are shipped to customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Shipping Zones</h3>
                <div className="border rounded-md">
                  <div className="p-4 border-b bg-muted/20 flex justify-between items-center">
                    <h4 className="font-medium">Local Delivery (5 miles)</h4>
                    <div>
                      <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-600">Delete</Button>
                    </div>
                  </div>
                  <div className="p-4 border-b">
                    <p className="text-sm mb-2"><span className="font-medium">Fee:</span> $2.99</p>
                    <p className="text-sm"><span className="font-medium">Delivery Time:</span> 30-60 minutes</p>
                  </div>
                  
                  <div className="p-4 border-b bg-muted/20 flex justify-between items-center">
                    <h4 className="font-medium">City Delivery (5-15 miles)</h4>
                    <div>
                      <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-600">Delete</Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm mb-2"><span className="font-medium">Fee:</span> $5.99</p>
                    <p className="text-sm"><span className="font-medium">Delivery Time:</span> 1-2 hours</p>
                  </div>
                </div>
                <Button variant="outline" className="mt-4">
                  Add Shipping Zone
                </Button>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Shipping Options</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="free-shipping" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="free-shipping">Offer free shipping on orders over $50</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="packaging-fee" className="h-4 w-4" />
                    <Label htmlFor="packaging-fee">Add packaging fee ($1.00)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="pickup-option" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="pickup-option">Allow store pickup</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-theme-purple hover:bg-theme-purple/80 ml-auto">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Account Tab */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" defaultValue="Alex Johnson" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="alex@freshgrocery.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 987-6543" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div></div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-orders" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="notify-orders">New order notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-reviews" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="notify-reviews">Customer reviews</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-inventory" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="notify-inventory">Low inventory alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-marketing" className="h-4 w-4" />
                    <Label htmlFor="notify-marketing">Marketing updates</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-theme-purple hover:bg-theme-purple/80 ml-auto">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorSettings;
