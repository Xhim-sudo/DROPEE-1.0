
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/routes/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Unauthorized from './pages/auth/Unauthorized';

// Public Pages
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import CategoryProducts from "./pages/CategoryProducts";
import Shops from "./pages/Shops";
import ShopDetail from "./pages/ShopDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";

// Vendor Pages
import VendorSignup from "./pages/vendor/VendorSignup";
import VendorLogin from "./pages/vendor/VendorLogin";
import VendorForgotPassword from "./pages/vendor/VendorForgotPassword";
import VendorLayout from "./components/vendor/VendorLayout";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import VendorProducts from "./pages/vendor/VendorProducts";
import VendorOrders from "./pages/vendor/VendorOrders";
import VendorDeliveries from "./pages/vendor/VendorDeliveries";
import VendorCustomers from "./pages/vendor/VendorCustomers";
import VendorNotifications from "./pages/vendor/VendorNotifications";
import VendorSettings from "./pages/vendor/VendorSettings";

// Admin Pages
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVendors from "./pages/admin/AdminVendors";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminServices from "./pages/admin/AdminServices";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminUpdates from "./pages/admin/AdminUpdates";
import AdminDeliveryFactors from "./pages/admin/AdminDeliveryFactors";
import AdminNotifications from "./pages/admin/AdminNotifications";

// Create a new QueryClient instance directly
const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/:categoryId" element={<CategoryProducts />} />
                <Route path="/shops" element={<Shops />} />
                <Route path="/shop/:id" element={<ShopDetail />} />
                <Route path="/services" element={<Services />} />
                <Route path="/service-detail/:id" element={<ServiceDetail />} />
                
                {/* Authentication Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                
                {/* User Routes (require authentication) */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                </Route>
                
                {/* Vendor Authentication Routes */}
                <Route path="/vendor/signup" element={<VendorSignup />} />
                
                {/* Vendor Panel Routes */}
                <Route element={<ProtectedRoute requiredRole="vendor" redirectPath="/login" />}>
                  <Route path="/vendor" element={<VendorLayout />}>
                    <Route path="dashboard" element={<VendorDashboard />} />
                    <Route path="products" element={<VendorProducts />} />
                    <Route path="orders" element={<VendorOrders />} />
                    <Route path="deliveries" element={<VendorDeliveries />} />
                    <Route path="customers" element={<VendorCustomers />} />
                    <Route path="notifications" element={<VendorNotifications />} />
                    <Route path="settings" element={<VendorSettings />} />
                  </Route>
                </Route>
                
                {/* Admin Panel Routes */}
                <Route element={<ProtectedRoute requiredRole="admin" redirectPath="/login" />}>
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="vendors" element={<AdminVendors />} />
                    <Route path="customers" element={<AdminCustomers />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="services" element={<AdminServices />} />
                    <Route path="categories" element={<AdminCategories />} />
                    <Route path="updates" element={<AdminUpdates />} />
                    <Route path="delivery-factors" element={<AdminDeliveryFactors />} />
                    <Route path="notifications" element={<AdminNotifications />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                </Route>
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
