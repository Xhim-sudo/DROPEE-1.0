
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AccountSettings = () => {
  return (
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
  );
};

export default AccountSettings;
