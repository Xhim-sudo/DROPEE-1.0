import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { QrCode, Wallet } from 'lucide-react';

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
        
        {/* Payments Tab - Updated for COD and UPI only */}
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
                <RadioGroup defaultValue="cod">
                  <div className="flex items-center space-x-2 p-4 rounded-md border mb-3">
                    <RadioGroupItem value="cod" id="payment-cod" />
                    <Label htmlFor="payment-cod" className="flex items-center">
                      <Wallet className="h-5 w-5 mr-2 text-gray-600" />
                      <div>
                        <p className="font-medium">Cash on Delivery (COD)</p>
                        <p className="text-sm text-muted-foreground">Accept cash payments when the order is delivered</p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 rounded-md border">
                    <RadioGroupItem value="upi" id="payment-upi" />
                    <Label htmlFor="payment-upi" className="flex items-center">
                      <QrCode className="h-5 w-5 mr-2 text-gray-600" />
                      <div>
                        <p className="font-medium">UPI Payment</p>
                        <p className="text-sm text-muted-foreground">Accept payments via UPI ID or QR code</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">UPI Payment Details</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="upi-id">UPI ID</Label>
                    <Input id="upi-id" placeholder="yourname@bankname" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="upi-qr">UPI QR Code</Label>
                    <div className="border border-dashed rounded-md p-4 text-center">
                      <div className="w-64 h-64 mx-auto bg-gray-100 rounded-md flex items-center justify-center">
                        <span className="text-muted-foreground">QR Code Preview</span>
                      </div>
                      <Button variant="outline" size="sm" className="mt-4">
                        Upload QR Code
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload a QR code image that customers can scan to pay via UPI
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-theme-purple hover:bg-theme-purple/80 ml-auto">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Shipping Tab - Updated for admin delivery and store pickup options */}
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
              <CardDescription>
                Configure delivery options for your products
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Delivery through Admin</h3>
                <div className="space-y-4">
                  <div className="border rounded-md p-4 bg-muted/10">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Delivery Fee Contribution</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Set how much you're willing to contribute towards the delivery fee. 
                      Admin will handle the delivery and may provide discounted or free delivery to customers.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="delivery-fee">Your Contribution (₹)</Label>
                        <Input id="delivery-fee" type="number" min="0" placeholder="50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="min-order">Minimum Order Value (₹)</Label>
                        <Input id="min-order" type="number" min="0" placeholder="500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Store Options</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="store-pickup" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="store-pickup">Allow store pickup</Label>
                  </div>
                  <div className="ml-6 space-y-2">
                    <Label htmlFor="pickup-instructions">Pickup Instructions</Label>
                    <Textarea 
                      id="pickup-instructions" 
                      placeholder="Enter instructions for customers who choose store pickup..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4">
                    <input type="checkbox" id="appointment-option" className="h-4 w-4" />
                    <Label htmlFor="appointment-option">Allow appointment booking</Label>
                  </div>
                  <div className="ml-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="appointment-duration">Appointment Duration (minutes)</Label>
                      <Input id="appointment-duration" type="number" min="15" step="15" defaultValue="30" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Available Days</Label>
                      <div className="grid grid-cols-7 gap-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                          <div key={day} className="flex flex-col items-center">
                            <input type="checkbox" id={`day-${day}`} className="h-4 w-4" defaultChecked={day !== 'Sun'} />
                            <Label htmlFor={`day-${day}`} className="text-xs mt-1">{day}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="time-from">From</Label>
                        <Input id="time-from" type="time" defaultValue="10:00" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time-to">To</Label>
                        <Input id="time-to" type="time" defaultValue="18:00" />
                      </div>
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
