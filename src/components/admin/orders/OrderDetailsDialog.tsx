
import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Order } from './OrderTypes';

interface OrderDetailsDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  order: Order | null;
  onStatusChange: (orderId: string, newStatus: string) => void;
  getStatusBadge: (status: string) => JSX.Element;
  getPaymentStatusBadge: (status: string) => JSX.Element;
}

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({
  open,
  setOpen,
  order,
  onStatusChange,
  getStatusBadge,
  getPaymentStatusBadge
}) => {
  if (!order) return null;
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Order Details - {order?.id}</DialogTitle>
          <DialogDescription>
            View and manage order information
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <h3 className="font-semibold">Customer Information</h3>
            <p className="mt-1">{order.customer}</p>
            <p className="text-sm text-muted-foreground">{order.email}</p>
          </div>
          <div>
            <h3 className="font-semibold">Order Information</h3>
            <p className="mt-1">Date: {order.date}</p>
            <div className="flex space-x-2">
              <p>Status: {getStatusBadge(order.status)}</p>
              <p>Payment: {getPaymentStatusBadge(order.paymentStatus)}</p>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Order Items</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="text-right font-semibold">Total:</TableCell>
                <TableCell className="text-right font-semibold">${order.total.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <DialogFooter className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button onClick={() => onStatusChange(order.id, 'Processing')} variant="outline">
              Mark Processing
            </Button>
            <Button onClick={() => onStatusChange(order.id, 'Shipped')} variant="outline">
              Mark Shipped
            </Button>
            <Button onClick={() => onStatusChange(order.id, 'Completed')} variant="outline">
              Mark Completed
            </Button>
          </div>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
