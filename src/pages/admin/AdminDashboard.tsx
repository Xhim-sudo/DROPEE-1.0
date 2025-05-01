
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, ShoppingBag, Store, TrendingUp, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  // Example stats data
  const stats = [
    { title: 'Total Sales', value: '$12,426', icon: DollarSign, change: '+12%', trend: 'up' },
    { title: 'Active Customers', value: '2,315', icon: Users, change: '+5%', trend: 'up' },
    { title: 'Total Products', value: '845', icon: ShoppingBag, change: '+2%', trend: 'up' },
    { title: 'Active Vendors', value: '38', icon: Store, change: '-3%', trend: 'down' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your store performance and activity
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`flex items-center text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                <TrendingUp className={`h-3 w-3 mr-1 ${stat.trend === 'down' && 'transform rotate-180'}`} />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Last 5 orders placed on the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((order) => (
                <div key={order} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <div className="font-medium">Order #{1000 + order}</div>
                    <div className="text-sm text-muted-foreground">Customer: John Doe</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$124.00</div>
                    <div className="text-xs text-muted-foreground">2 hours ago</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>New Vendors</CardTitle>
            <CardDescription>
              Recent vendor applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[1, 2, 3].map((vendor) => (
                <div key={vendor} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <div className="font-medium">Vendor Store #{vendor}</div>
                    <div className="text-sm text-muted-foreground">{vendor === 1 ? 'Pending approval' : 'Approved'}</div>
                  </div>
                  <div>
                    <span className={`px-2 py-1 text-xs rounded-full ${vendor === 1 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {vendor === 1 ? 'Pending' : 'Approved'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
