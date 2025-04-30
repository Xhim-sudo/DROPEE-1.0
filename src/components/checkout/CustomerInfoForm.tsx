
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface CustomerFormProps {
  formData: {
    name: string;
    phone: string;
    email: string;
    address: string;
    instructions: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CustomerInfoForm: React.FC<CustomerFormProps> = ({ formData, onChange }) => {
  return (
    <div className="grid gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={onChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email (optional)</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={onChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Delivery Address</Label>
        <Textarea
          id="address"
          name="address"
          placeholder="Enter your full address"
          value={formData.address}
          onChange={onChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="instructions">Delivery Instructions (optional)</Label>
        <Textarea
          id="instructions"
          name="instructions"
          placeholder="Any special instructions for delivery"
          value={formData.instructions}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CustomerInfoForm;
