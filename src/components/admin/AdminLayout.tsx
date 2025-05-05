
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  ShoppingBag, 
  Store,
  Settings,
  BarChart3,
  LogOut,
  ChevronRight,
  Package,
  PackagePlus,
  Calendar,
  RefreshCcw,
  Bell
} from 'lucide-react';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { app } from '@/config/firebase';
import { Badge } from "@/components/ui/badge";
import { NotificationProvider } from '@/context/NotificationContext';
import NotificationDropdown from './notifications/NotificationDropdown';

const db = getFirestore(app);

const AdminLayout = () => {
  const location = useLocation();
  const [pendingVendors, setPendingVendors] = useState(0);
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Customers', path: '/admin/customers' },
    { 
      icon: Store, 
      label: 'Vendors', 
      path: '/admin/vendors',
      badge: pendingVendors > 0 ? pendingVendors : undefined 
    },
    { icon: ShoppingBag, label: 'Products', path: '/admin/products' },
    { icon: BarChart3, label: 'Orders', path: '/admin/orders' },
    { icon: Package, label: 'Services', path: '/admin/services' },
    { icon: PackagePlus, label: 'Categories', path: '/admin/categories' },
    { icon: Calendar, label: 'Updates', path: '/admin/updates' },
    { icon: RefreshCcw, label: 'Delivery Factors', path: '/admin/delivery-factors' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  useEffect(() => {
    const pendingVendorsQuery = query(
      collection(db, "vendorApplications"), 
      where("status", "==", "pending")
    );

    const unsubscribe = onSnapshot(pendingVendorsQuery, (snapshot) => {
      setPendingVendors(snapshot.docs.length);
    });

    return () => unsubscribe();
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 text-gray-100 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <Link to="/admin/dashboard" className="flex items-center">
                <ShoppingBag className="h-6 w-6 text-theme-purple" />
                <span className="ml-2 text-xl font-bold">Admin Panel</span>
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
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <Badge variant="destructive" className="ml-auto mr-2">
                          {item.badge}
                        </Badge>
                      )}
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
                  Exit Admin
                </Button>
              </Link>
            </div>
          </aside>
          
          {/* Main content */}
          <main className="flex-1 overflow-y-auto bg-gray-100">
            <header className="h-14 border-b bg-background/95 backdrop-blur flex items-center px-8 justify-end">
              <div className="flex items-center space-x-2">
                <NotificationDropdown />
              </div>
            </header>
            <div className="py-6 px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </NotificationProvider>
  );
};

export default AdminLayout;
