
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { OrderStatus, PaymentStatus } from './OrderTypes';

export const getStatusBadge = (status: string) => {
  switch(status) {
    case 'Completed':
      return <Badge className="bg-green-500">Completed</Badge>;
    case 'Processing':
      return <Badge className="bg-blue-500">Processing</Badge>;
    case 'Pending':
      return <Badge className="bg-yellow-500">Pending</Badge>;
    case 'Shipped':
      return <Badge className="bg-purple-500">Shipped</Badge>;
    case 'Cancelled':
      return <Badge className="bg-red-500">Cancelled</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export const getPaymentStatusBadge = (status: string) => {
  switch(status) {
    case 'Paid':
      return <Badge className="bg-green-500">Paid</Badge>;
    case 'Pending':
      return <Badge className="bg-yellow-500">Pending</Badge>;
    case 'Refunded':
      return <Badge className="bg-red-500">Refunded</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};
