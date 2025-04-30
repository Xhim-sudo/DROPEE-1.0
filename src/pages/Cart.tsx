
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/PageHeader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, AlertCircle } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, getSubtotal } = useCart();

  // Group items by vendor
  const itemsByVendor = items.reduce((acc, item) => {
    if (!acc[item.vendorId]) {
      acc[item.vendorId] = {
        vendorName: item.vendorName,
        items: []
      };
    }
    acc[item.vendorId].items.push(item);
    return acc;
  }, {} as Record<string, { vendorName: string; items: typeof items }>);

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container py-16 text-center">
          <PageHeader 
            title="Your Cart" 
            description="Your cart is currently empty."
          />
          <div className="max-w-md mx-auto py-10">
            <div className="text-6xl mb-6">🛒</div>
            <p className="mb-6 text-muted-foreground">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container py-8">
        <PageHeader 
          title="Your Cart" 
          description={`You have ${items.length} item(s) in your cart`}
        />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-grow">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Cart Items</h2>
              <Button variant="outline" size="sm" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
            
            {Object.entries(itemsByVendor).map(([vendorId, { vendorName, items }]) => (
              <Card key={vendorId} className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <span className="mr-2">🏪</span>
                    <Link to={`/shop/${vendorId}`} className="hover:text-theme-purple">
                      {vendorName}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                      <div className="sm:w-20 sm:h-20 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      
                      <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="flex items-center border rounded-md">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <div className="px-3 py-1">
                              {item.quantity}
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="ml-2"
                            onClick={() => removeItem(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="text-right font-medium">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-80">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹100.00</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{(getSubtotal() + 100).toFixed(2)}</span>
                </div>
                
                <div className="flex flex-col gap-2 mt-6">
                  <Button 
                    onClick={handleProceedToCheckout}
                    className="w-full bg-theme-purple hover:bg-theme-purple-dark"
                  >
                    Proceed to Checkout
                  </Button>
                  <Link to="/">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                <div className="flex items-start gap-2 text-xs text-muted-foreground mt-4 p-3 bg-muted rounded-md">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    Vendor will contact you via WhatsApp after placing your order for delivery updates.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
