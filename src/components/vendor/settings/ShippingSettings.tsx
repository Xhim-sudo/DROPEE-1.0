
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ShippingSettings = () => {
  return (
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
  );
};

export default ShippingSettings;
