
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ShoppingBag,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Truck,
  Users,
  Bell
} from 'lucide-react';

const VendorLayout = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/vendor/dashboard' },
    { icon: ShoppingBag, label: 'Products', path: '/vendor/products' },
    { icon: BarChart3, label: 'Orders', path: '/vendor/orders' },
    { icon: Truck, label: 'Deliveries', path: '/vendor/deliveries' },
    { icon: Users, label: 'Customers', path: '/vendor/customers' },
    { icon: Bell, label: 'Notifications', path: '/vendor/notifications' },
    { icon: Settings, label: 'Settings', path: '/vendor/settings' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <Link to="/vendor/dashboard" className="flex items-center">
              <ShoppingBag className="h-6 w-6 text-theme-purple" />
              <span className="ml-2 text-xl font-bold">Vendor Panel</span>
            </Link>
          </div>
          
          <div className="flex-grow overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {menuItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                >
                  <Button
                    variant={isActive(item.path) ? "secondary" : "ghost"}
                    className={`w-full justify-start ${isActive(item.path) ? 'bg-gray-700' : ''}`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                    {isActive(item.path) && <ChevronRight className="ml-auto h-4 w-4" />}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t border-gray-700">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start">
                <LogOut className="h-5 w-5 mr-3" />
                Exit Panel
              </Button>
            </Link>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="py-6 px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;
