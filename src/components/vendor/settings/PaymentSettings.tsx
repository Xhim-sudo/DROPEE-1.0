
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { QrCode, Wallet } from 'lucide-react';

const PaymentSettings = () => {
  return (
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
  );
};

export default PaymentSettings;
