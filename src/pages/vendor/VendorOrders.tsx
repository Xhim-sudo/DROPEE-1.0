
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from 'lucide-react';

const VendorOrders = () => {
  // Sample orders data
  const orders = [
    { 
      id: "ORD-1234", 
      customer: "John Doe", 
      date: "2025-05-01",
      items: 3,
      total: 124.00,
      status: "Delivered",
      payment: "Paid"
    },
    { 
      id: "ORD-1235", 
      customer: "Jane Smith", 
      date: "2025-05-01",
      items: 2,
      total: 85.00,
      status: "Processing",
      payment: "Paid"
    },
    { 
      id: "ORD-1236", 
      customer: "Robert Johnson", 
      date: "2025-04-30",
      items: 5,
      total: 256.50,
      status: "Shipped",
      payment: "Paid"
    },
    { 
      id: "ORD-1237", 
      customer: "Emily Davis", 
      date: "2025-04-30",
      items: 1,
      total: 75.25,
      status: "Pending",
      payment: "Pending"
    },
    { 
      id: "ORD-1238", 
      customer: "Michael Brown", 
      date: "2025-04-29",
      items: 4,
      total: 198.75,
      status: "Delivered",
      payment: "Paid"
    },
    { 
      id: "ORD-1239", 
      customer: "Sophie Wilson", 
      date: "2025-04-29",
      items: 2,
      total: 145.50,
      status: "Cancelled",
      payment: "Refunded"
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track customer orders
          </p>
        </div>
      </div>
      
      {/* Order Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-muted-foreground">Total Orders</p>
          <p className="text-2xl font-semibold mt-1">128</p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-semibold mt-1">24</p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-muted-foreground">Processing</p>
          <p className="text-2xl font-semibold mt-1">38</p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-muted-foreground">Delivered</p>
          <p className="text-2xl font-semibold mt-1">62</p>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-8"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
        <select className="p-2 border rounded-md">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select className="p-2 border rounded-md">
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
      
      {/* Orders Table */}
      <div className="mt-6 rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="py-3 px-4 text-left font-medium">Order ID</th>
                <th className="py-3 px-4 text-left font-medium">Customer</th>
                <th className="py-3 px-4 text-left font-medium">Date</th>
                <th className="py-3 px-4 text-center font-medium">Items</th>
                <th className="py-3 px-4 text-right font-medium">Total</th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-left font-medium">Payment</th>
                <th className="py-3 px-4 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-muted/50">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4 text-center">{order.items}</td>
                  <td className="py-3 px-4 text-right">${order.total.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${order.payment === 'Paid' ? 'bg-green-100 text-green-800' :
                      order.payment === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-muted-foreground">Showing 6 of 128 orders</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="bg-muted">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default VendorOrders;
