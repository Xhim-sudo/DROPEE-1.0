
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
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
  onOptionChange: (name: string, value: string) => void;
}

const DeliveryPaymentOptions: React.FC<DeliveryPaymentOptionsProps> = ({
  deliveryOption,
  paymentMethod,
  onOptionChange
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
                <RadioGroupItem id="vendor-delivery" value="vendor" />
                <div className="grid gap-1.5">
                  <Label htmlFor="vendor-delivery" className="font-medium">Vendor Delivery</Label>
                  <p className="text-sm text-muted-foreground">
                    The shop will handle the delivery directly to you
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem id="third-party" value="third-party" />
                <div className="grid gap-1.5">
                  <Label htmlFor="third-party" className="font-medium">Third-Party Delivery</Label>
                  <p className="text-sm text-muted-foreground">
                    We'll assign a courier for faster delivery (+₹50)
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>
          
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
                  <Label htmlFor="cash" className="font-medium">Cash on Delivery</Label>
                  <p className="text-sm text-muted-foreground">
                    Pay when your order arrives
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem id="online" value="online" disabled />
                <div className="grid gap-1.5">
                  <Label htmlFor="online" className="font-medium">Online Payment</Label>
                  <p className="text-sm text-muted-foreground">
                    Coming soon
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>
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
