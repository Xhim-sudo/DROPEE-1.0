
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import OrderFilters from '@/components/admin/orders/OrderFilters';
import OrdersTable from '@/components/admin/orders/OrdersTable';
import OrderDetailsDialog from '@/components/admin/orders/OrderDetailsDialog';
import OrderPagination from '@/components/admin/orders/OrderPagination';
import { getStatusBadge, getPaymentStatusBadge } from '@/components/admin/orders/OrderStatusBadge';
import { initialOrders } from '@/components/admin/orders/mockOrdersData';
import { Order, DateRange } from '@/components/admin/orders/OrderTypes';

const AdminOrders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange>({ from: '', to: '' });
  const [viewOrderDetails, setViewOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentPage] = useState(1);
  
  // Filter orders based on search, status, and date
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    // Date filtering logic
    let matchesDate = true;
    if (dateRange.from && !isNaN(new Date(dateRange.from).getTime())) {
      matchesDate = matchesDate && new Date(order.date) >= new Date(dateRange.from);
    }
    if (dateRange.to && !isNaN(new Date(dateRange.to).getTime())) {
      matchesDate = matchesDate && new Date(order.date) <= new Date(dateRange.to);
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setViewOrderDetails(true);
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus as Order["status"] } : order
    ));
    
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    });

    // If we're viewing the order details, update the selected order as well
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus as Order["status"] });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
      <p className="text-muted-foreground">
        Track and manage customer orders
      </p>
      
      <OrderFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <OrdersTable
        filteredOrders={filteredOrders}
        onStatusChange={handleStatusChange}
        onViewOrder={handleViewOrder}
        getStatusBadge={getStatusBadge}
        getPaymentStatusBadge={getPaymentStatusBadge}
      />

      <OrderPagination
        currentPage={currentPage}
        totalPages={1}
        onPageChange={() => {}}
      />

      <OrderDetailsDialog
        open={viewOrderDetails}
        setOpen={setViewOrderDetails}
        order={selectedOrder}
        onStatusChange={handleStatusChange}
        getStatusBadge={getStatusBadge}
        getPaymentStatusBadge={getPaymentStatusBadge}
      />
    </div>
  );
};

export default AdminOrders;
