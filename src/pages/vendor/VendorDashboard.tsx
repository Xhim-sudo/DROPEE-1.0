
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, ShoppingBag, Users, TrendingUp } from 'lucide-react';

const VendorDashboard = () => {
  // Sample data - in a real app this would come from an API
  const stats = [
    { title: "Total Sales", value: "$12,456", change: "+12.5%", icon: BarChart3, color: "text-blue-500" },
    { title: "Active Products", value: "34", change: "+2", icon: ShoppingBag, color: "text-purple-500" },
    { title: "New Customers", value: "45", change: "+5.2%", icon: Users, color: "text-green-500" },
    { title: "Conversion Rate", value: "3.2%", change: "+0.4%", icon: TrendingUp, color: "text-orange-500" },
  ];

  // Sample orders data
  const recentOrders = [
    { id: "ORD-1234", customer: "John Doe", date: "2025-05-01", status: "Delivered", total: "$124.00" },
    { id: "ORD-1235", customer: "Jane Smith", date: "2025-05-01", status: "Processing", total: "$85.00" },
    { id: "ORD-1236", customer: "Robert Johnson", date: "2025-04-30", status: "Shipped", total: "$256.50" },
    { id: "ORD-1237", customer: "Emily Davis", date: "2025-04-30", status: "Pending", total: "$75.25" },
    { id: "ORD-1238", customer: "Michael Brown", date: "2025-04-29", status: "Delivered", total: "$198.75" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome to your vendor dashboard
      </p>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Recent Orders */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Recent Orders</h2>
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="py-3 px-4 text-left font-medium">Order ID</th>
                <th className="py-3 px-4 text-left font-medium">Customer</th>
                <th className="py-3 px-4 text-left font-medium">Date</th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-left font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-muted/50">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sales Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-muted/20">
            <p className="text-muted-foreground">Sales chart will be displayed here</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Popular Products</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-muted/20">
            <p className="text-muted-foreground">Products chart will be displayed here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorDashboard;
