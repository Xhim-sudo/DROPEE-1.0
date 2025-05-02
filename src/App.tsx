
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";

// Pages
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import Shops from "./pages/Shops";
import ShopDetail from "./pages/ShopDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";

// Vendor Pages
import VendorSignup from "./pages/vendor/VendorSignup";
import VendorLogin from "./pages/vendor/VendorLogin";
import VendorLayout from "./components/vendor/VendorLayout";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import VendorProducts from "./pages/vendor/VendorProducts";
import VendorOrders from "./pages/vendor/VendorOrders";
import VendorDeliveries from "./pages/vendor/VendorDeliveries";
import VendorCustomers from "./pages/vendor/VendorCustomers";
import VendorNotifications from "./pages/vendor/VendorNotifications";
import VendorSettings from "./pages/vendor/VendorSettings";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";

// Admin Panel
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/shops" element={<Shops />} />
            <Route path="/shop/:id" element={<ShopDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/services" element={<Services />} />
            
            {/* Vendor Authentication Routes */}
            <Route path="/vendor/signup" element={<VendorSignup />} />
            <Route path="/vendor/login" element={<VendorLogin />} />
            
            {/* Vendor Panel Routes */}
            <Route path="/vendor" element={<VendorLayout />}>
              <Route path="dashboard" element={<VendorDashboard />} />
              <Route path="products" element={<VendorProducts />} />
              <Route path="orders" element={<VendorOrders />} />
              <Route path="deliveries" element={<VendorDeliveries />} />
              <Route path="customers" element={<VendorCustomers />} />
              <Route path="notifications" element={<VendorNotifications />} />
              <Route path="settings" element={<VendorSettings />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Admin Panel Routes */}
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
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
