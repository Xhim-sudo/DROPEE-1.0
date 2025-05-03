
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Search, 
  Calendar, 
  Filter, 
  MoreVertical,
  Truck,
  Check,
  X,
  Clock,
  Package
} from 'lucide-react';

// Mock data for orders
const initialOrders = [
  {
    id: "ORD-1001",
    customer: "John Smith",
    email: "john.smith@example.com",
    date: "2023-05-10",
    total: 142.50,
    status: "Completed",
    paymentStatus: "Paid",
    items: [
      { id: "P001", name: "Organic Apples", quantity: 2, price: 3.99 },
      { id: "P002", name: "Fresh Bread", quantity: 1, price: 2.49 },
      { id: "P005", name: "Premium Coffee", quantity: 1, price: 12.99 }
    ]
  },
  {
    id: "ORD-1002",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    date: "2023-05-11",
    total: 76.20,
    status: "Processing",
    paymentStatus: "Paid",
    items: [
      { id: "P003", name: "Free Range Eggs", quantity: 2, price: 4.99 },
      { id: "P004", name: "Sourdough Bread", quantity: 1, price: 3.99 }
    ]
  },
  {
    id: "ORD-1003",
    customer: "Michael Brown",
    email: "mbrown@example.com",
    date: "2023-05-12",
    total: 35.95,
    status: "Pending",
    paymentStatus: "Pending",
    items: [
      { id: "P001", name: "Organic Apples", quantity: 1, price: 3.99 },
      { id: "P003", name: "Free Range Eggs", quantity: 1, price: 4.99 }
    ]
  },
  {
    id: "ORD-1004",
    customer: "Emily Wilson",
    email: "emily.w@example.com",
    date: "2023-05-13",
    total: 129.75,
    status: "Shipped",
    paymentStatus: "Paid",
    items: [
      { id: "P005", name: "Premium Coffee", quantity: 2, price: 12.99 },
      { id: "P002", name: "Fresh Bread", quantity: 3, price: 2.49 }
    ]
  },
  {
    id: "ORD-1005",
    customer: "David Roberts",
    email: "droberts@example.com",
    date: "2023-05-14",
    total: 58.45,
    status: "Cancelled",
    paymentStatus: "Refunded",
    items: [
      { id: "P004", name: "Sourdough Bread", quantity: 2, price: 3.99 },
      { id: "P001", name: "Organic Apples", quantity: 3, price: 3.99 }
    ]
  }
];

const AdminOrders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [viewOrderDetails, setViewOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  
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

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setViewOrderDetails(true);
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    });
  };
  
  const getStatusBadge = (status: string) => {
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

  const getPaymentStatusBadge = (status: string) => {
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

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
      <p className="text-muted-foreground">
        Track and manage customer orders
      </p>
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="p-2 border rounded-md"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <div className="flex gap-2">
          <div className="relative">
            <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              className="pl-8"
              placeholder="From Date"
              value={dateRange.from}
              onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              className="pl-8"
              placeholder="To Date"
              value={dateRange.to}
              onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
            />
          </div>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Apply Filters</span>
        </Button>
      </div>

      {/* Orders Table */}
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
                        onClick={() => handleViewOrder(order)}
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
                          <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Pending')}>
                            <Clock className="mr-2 h-4 w-4" /> Mark as Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Processing')}>
                            <Package className="mr-2 h-4 w-4" /> Mark as Processing
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Shipped')}>
                            <Truck className="mr-2 h-4 w-4" /> Mark as Shipped
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Completed')}>
                            <Check className="mr-2 h-4 w-4" /> Mark as Completed
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Cancelled')}>
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

      {/* Pagination */}
      <div className="flex items-center justify-end mt-4">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <span className="mx-4 text-sm">
          Page 1 of 1
        </span>
        <Button variant="outline" size="sm" disabled>
          Next
        </Button>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={viewOrderDetails} onOpenChange={setViewOrderDetails}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              View and manage order information
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div>
                  <h3 className="font-semibold">Customer Information</h3>
                  <p className="mt-1">{selectedOrder.customer}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Order Information</h3>
                  <p className="mt-1">Date: {selectedOrder.date}</p>
                  <div className="flex space-x-2">
                    <p>Status: {getStatusBadge(selectedOrder.status)}</p>
                    <p>Payment: {getPaymentStatusBadge(selectedOrder.paymentStatus)}</p>
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
                    {selectedOrder.items.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-semibold">Total:</TableCell>
                      <TableCell className="text-right font-semibold">${selectedOrder.total.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <DialogFooter className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button onClick={() => handleStatusChange(selectedOrder.id, 'Processing')} variant="outline">
                    Mark Processing
                  </Button>
                  <Button onClick={() => handleStatusChange(selectedOrder.id, 'Shipped')} variant="outline">
                    Mark Shipped
                  </Button>
                  <Button onClick={() => handleStatusChange(selectedOrder.id, 'Completed')} variant="outline">
                    Mark Completed
                  </Button>
                </div>
                <Button onClick={() => setViewOrderDetails(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
