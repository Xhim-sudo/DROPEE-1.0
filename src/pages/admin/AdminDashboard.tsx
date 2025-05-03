import React from 'react';
import VendorApprovalAlert from "@/components/admin/vendors/VendorApprovalAlert";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <VendorApprovalAlert />
      
      {/* Dashboard cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-medium text-muted-foreground">Total Orders</h3>
          <p className="text-3xl font-bold">1,234</p>
          <div className="text-sm text-green-500 mt-2">↑ 12% from last month</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-medium text-muted-foreground">Active Vendors</h3>
          <p className="text-3xl font-bold">56</p>
          <div className="text-sm text-green-500 mt-2">↑ 3 new this month</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-medium text-muted-foreground">Total Revenue</h3>
          <p className="text-3xl font-bold">$12,345</p>
          <div className="text-sm text-green-500 mt-2">↑ 8% from last month</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-medium text-muted-foreground">Active Customers</h3>
          <p className="text-3xl font-bold">892</p>
          <div className="text-sm text-green-500 mt-2">↑ 24 new this week</div>
        </div>
      </div>
      
      {/* More dashboard content would go here */}
    </div>
  );
};

export default AdminDashboard;
