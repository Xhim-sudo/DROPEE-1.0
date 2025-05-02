
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Truck, Store, Calendar } from 'lucide-react';

const VendorDeliveries = () => {
  // Sample delivery data
  const deliveries = [
    {
      id: 'DEL001',
      orderId: 'ORD123',
      customer: 'John Smith',
      date: '2023-06-15',
      status: 'Delivered',
      type: 'Admin Delivery',
      address: '123 Main St, City'
    },
    {
      id: 'DEL002',
      orderId: 'ORD124',
      customer: 'Emma Wilson',
      date: '2023-06-16',
      status: 'In Transit',
      type: 'Admin Delivery',
      address: '456 Oak Ave, Town'
    },
    {
      id: 'DEL003',
      orderId: 'ORD125',
      customer: 'Michael Brown',
      date: '2023-06-17',
      status: 'Pending',
      type: 'Store Pickup',
      address: 'Your Store Location'
    },
    {
      id: 'DEL004',
      orderId: 'ORD126',
      customer: 'Sarah Davis',
      date: '2023-06-18',
      status: 'Scheduled',
      type: 'Appointment',
      address: 'Your Store Location'
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Deliveries</h1>
      <p className="text-muted-foreground">
        Track your order deliveries and pickups
      </p>
      
      {/* Delivery Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Admin Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-2xl font-bold">12</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">2 orders in transit</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Store Pickups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Store className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-2xl font-bold">8</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">3 pickups scheduled today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-2xl font-bold">5</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">1 appointment today</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Delivery Table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Deliveries</CardTitle>
          <CardDescription>Track all your delivery methods and their statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Delivery Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell className="font-medium">{delivery.id}</TableCell>
                  <TableCell>{delivery.orderId}</TableCell>
                  <TableCell>{delivery.customer}</TableCell>
                  <TableCell>{new Date(delivery.date).toLocaleDateString()}</TableCell>
                  <TableCell className="flex items-center">
                    {delivery.type === 'Admin Delivery' && (
                      <>
                        <Truck className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{delivery.type}</span>
                      </>
                    )}
                    {delivery.type === 'Store Pickup' && (
                      <>
                        <Store className="h-4 w-4 mr-1 text-green-500" />
                        <span>{delivery.type}</span>
                      </>
                    )}
                    {delivery.type === 'Appointment' && (
                      <>
                        <Calendar className="h-4 w-4 mr-1 text-purple-500" />
                        <span>{delivery.type}</span>
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${delivery.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      delivery.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      delivery.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'}`}>
                      {delivery.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Instructions for different delivery types */}
          <div className="mt-6 space-y-4">
            <div className="border rounded-md p-4">
              <div className="flex items-center mb-2">
                <Truck className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-medium">Admin Delivery Instructions</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Orders with Admin Delivery are handled by the platform. Make sure your products 
                are properly packaged and ready for pickup by our delivery partners.
              </p>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center mb-2">
                <Store className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-medium">Store Pickup Instructions</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                For Store Pickup orders, prepare the items and keep them ready for customer collection.
                Verify customer identity before handing over the items.
              </p>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center mb-2">
                <Calendar className="h-5 w-5 text-purple-500 mr-2" />
                <h3 className="font-medium">Appointment Scheduling</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Appointments allow customers to schedule a specific time to visit your store.
                Ensure you're available during the scheduled appointment times.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorDeliveries;
