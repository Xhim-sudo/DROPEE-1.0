
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from 'lucide-react';
import { Service } from '@/types/ServiceTypes';

interface ServiceTableProps {
  services: Service[];
  isProcessing: boolean;
  onEdit: (service: Service) => void;
  onDelete: (id: string, name: string) => void;
}

const ServiceTable: React.FC<ServiceTableProps> = ({
  services,
  isProcessing,
  onEdit,
  onDelete
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Icon</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Base Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.id}>
            <TableCell className="text-2xl">{service.icon}</TableCell>
            <TableCell className="font-medium">{service.name}</TableCell>
            <TableCell>{service.description.length > 50 ? `${service.description.slice(0, 50)}...` : service.description}</TableCell>
            <TableCell>₹{service.basePrice}</TableCell>
            <TableCell className="text-right">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onEdit(service)}
                disabled={isProcessing}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onDelete(service.id, service.name)}
                disabled={isProcessing}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ServiceTable;
