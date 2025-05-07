
import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Clock, Package, Truck, Check, X } from 'lucide-react';
import { Order } from './OrderTypes';

interface OrdersTableProps {
  filteredOrders: Order[];
  onStatusChange: (orderId: string, newStatus: string) => void;
  onViewOrder: (order: Order) => void;
  getStatusBadge: (status: string) => JSX.Element;
  getPaymentStatusBadge: (status: string) => JSX.Element;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  filteredOrders,
  onStatusChange,
  onViewOrder,
  getStatusBadge,
  getPaymentStatusBadge
}) => {
  return (
    <div className="mt-6 rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>{order.customer}</div>
                  <div className="text-sm text-muted-foreground">{order.email}</div>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onViewOrder(order)}
                    >
                      View
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onStatusChange(order.id, 'Pending')}>
                          <Clock className="mr-2 h-4 w-4" /> Mark as Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onStatusChange(order.id, 'Processing')}>
                          <Package className="mr-2 h-4 w-4" /> Mark as Processing
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onStatusChange(order.id, 'Shipped')}>
                          <Truck className="mr-2 h-4 w-4" /> Mark as Shipped
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onStatusChange(order.id, 'Completed')}>
                          <Check className="mr-2 h-4 w-4" /> Mark as Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onStatusChange(order.id, 'Cancelled')}>
                          <X className="mr-2 h-4 w-4" /> Mark as Cancelled
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                No orders found matching your criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
