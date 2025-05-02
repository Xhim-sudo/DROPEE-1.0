
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

const VendorCustomers = () => {
  // Sample customer data
  const customers = [
    {
      id: 'CUST001',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      orders: 12,
      totalSpent: 482.50,
      lastOrder: '2023-06-10'
    },
    {
      id: 'CUST002',
      name: 'Emily Johnson',
      email: 'emily@example.com',
      phone: '+1 (555) 234-5678',
      orders: 8,
      totalSpent: 356.75,
      lastOrder: '2023-06-05'
    },
    {
      id: 'CUST003',
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '+1 (555) 345-6789',
      orders: 5,
      totalSpent: 215.30,
      lastOrder: '2023-05-28'
    },
    {
      id: 'CUST004',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+1 (555) 456-7890',
      orders: 15,
      totalSpent: 612.45,
      lastOrder: '2023-06-12'
    },
    {
      id: 'CUST005',
      name: 'David Miller',
      email: 'david@example.com',
      phone: '+1 (555) 567-8901',
      orders: 3,
      totalSpent: 98.20,
      lastOrder: '2023-05-15'
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
      <p className="text-muted-foreground">
        View and manage your customer base
      </p>
      
      {/* Customer Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹42.50</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Repeat Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers..."
            className="pl-8"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>
      
      {/* Customer Table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>Manage your customers and view their purchase history</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Orders</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>
                    <div>
                      <div>{customer.email}</div>
                      <div className="text-sm text-muted-foreground">{customer.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{customer.orders}</TableCell>
                  <TableCell className="text-right">₹{customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>{new Date(customer.lastOrder).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Order History</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Customer Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
            <CardDescription>Your highest spending customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers
                .sort((a, b) => b.totalSpent - a.totalSpent)
                .slice(0, 3)
                .map((customer, index) => (
                  <div key={customer.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div className="flex items-center">
                      <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{customer.totalSpent.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">{customer.orders} orders</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
            <CardDescription>New customers who joined recently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Robert Jackson</p>
                  <p className="text-sm text-muted-foreground">robert@example.com</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  Joined 2 days ago
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Linda Thomas</p>
                  <p className="text-sm text-muted-foreground">linda@example.com</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  Joined 3 days ago
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">James Wilson</p>
                  <p className="text-sm text-muted-foreground">james@example.com</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  Joined 5 days ago
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorCustomers;
