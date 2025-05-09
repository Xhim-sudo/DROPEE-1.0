
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ServiceForm from './ServiceForm';
import { Service } from '@/types/ServiceTypes';

interface ServiceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  service: Service;
  isProcessing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
  formType: 'add' | 'edit';
}

const ServiceFormDialog: React.FC<ServiceFormDialogProps> = ({
  open,
  onOpenChange,
  title,
  service,
  isProcessing,
  onInputChange,
  onSave,
  formType
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ServiceForm 
          service={service}
          isProcessing={isProcessing}
          onInputChange={onInputChange}
          onCancel={() => onOpenChange(false)}
          onSave={onSave}
          formType={formType}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ServiceFormDialog;
