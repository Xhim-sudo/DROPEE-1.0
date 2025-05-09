
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Service } from '@/types/ServiceTypes';

interface ServiceFormProps {
  service: Service;
  isProcessing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCancel: () => void;
  onSave: () => void;
  formType: 'add' | 'edit';
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  service,
  isProcessing,
  onInputChange,
  onCancel,
  onSave,
  formType
}) => {
  const idPrefix = formType === 'add' ? '' : 'edit-';
  const buttonText = formType === 'add' ? 'Add Service' : 'Save Changes';

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}name`}>Service Name</Label>
        <Input 
          id={`${idPrefix}name`}
          name="name" 
          value={service.name}
          onChange={onInputChange}
          disabled={isProcessing}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}icon`}>Icon (Emoji)</Label>
        <Input 
          id={`${idPrefix}icon`}
          name="icon" 
          value={service.icon}
          onChange={onInputChange}
          placeholder="Paste an emoji here"
          disabled={isProcessing}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}description`}>Description</Label>
        <Textarea 
          id={`${idPrefix}description`}
          name="description" 
          rows={4}
          value={service.description}
          onChange={onInputChange}
          disabled={isProcessing}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}basePrice`}>Base Price (₹)</Label>
        <Input 
          id={`${idPrefix}basePrice`}
          name="basePrice" 
          type="number"
          value={service.basePrice.toString()}
          onChange={onInputChange}
          disabled={isProcessing}
        />
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel} disabled={isProcessing}>Cancel</Button>
        <Button onClick={onSave} disabled={isProcessing}>
          {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {buttonText}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default ServiceForm;
