
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertCircle, MapPin, Truck, CreditCard, QrCode } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';

interface DeliveryPaymentOptionsProps {
  deliveryOption: string;
  paymentMethod: string;
  upiId: string;
  onOptionChange: (name: string, value: string) => void;
  onUpiIdChange: (value: string) => void;
}

const DeliveryPaymentOptions: React.FC<DeliveryPaymentOptionsProps> = ({
  deliveryOption,
  paymentMethod,
  upiId,
  onOptionChange,
  onUpiIdChange
}) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Delivery & Payment Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Delivery Option</Label>
            <RadioGroup
              value={deliveryOption}
              onValueChange={(value) => onOptionChange('deliveryOption', value)}
              className="grid md:grid-cols-2 gap-4 pt-2"
            >
              <div className="flex items-start space-x-2">
                <RadioGroupItem id="delivery" value="delivery" />
                <div className="grid gap-1.5">
                  <Label htmlFor="delivery" className="font-medium flex items-center gap-1">
                    <Truck className="h-4 w-4" /> Delivery
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Delivery to your address (delivery fee applies)
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem id="pickup" value="pickup" />
                <div className="grid gap-1.5">
                  <Label htmlFor="pickup" className="font-medium flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> Pickup
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Pickup from the store (no delivery fee)
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          {deliveryOption === 'delivery' && (
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) => onOptionChange('paymentMethod', value)}
                className="grid md:grid-cols-2 gap-4 pt-2"
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem id="cash" value="cash" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="cash" className="font-medium flex items-center gap-1">
                      <CreditCard className="h-4 w-4" /> Cash on Delivery
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Pay when your order arrives
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem id="upi" value="upi" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="upi" className="font-medium flex items-center gap-1">
                      <QrCode className="h-4 w-4" /> UPI Payment
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Pay via UPI to the vendor
                    </p>
                  </div>
                </div>
              </RadioGroup>
              
              {paymentMethod === 'upi' && (
                <div className="pt-2">
                  <Label htmlFor="upi-id" className="text-sm">Vendor UPI ID</Label>
                  <Input
                    id="upi-id"
                    placeholder="vendor@upi"
                    className="mt-1"
                    value={upiId}
                    onChange={(e) => onUpiIdChange(e.target.value)}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Please transfer the total amount to this UPI ID
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col">
        <div className="flex items-start gap-2 text-xs text-muted-foreground mt-4 p-3 bg-muted rounded-md w-full">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>
            By placing your order, you agree to be contacted by the vendor via WhatsApp
            for order confirmations and delivery updates.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DeliveryPaymentOptions;
