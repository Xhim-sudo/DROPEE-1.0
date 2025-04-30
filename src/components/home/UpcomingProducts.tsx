
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from '@/components/ui/use-toast';
import { upcomingProducts } from '@/data/mockData';

const UpcomingProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const handleNotifyClick = (productId: string) => {
    setSelectedProduct(productId);
  };
  
  const handleSubmitNotification = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would send the notification request to a backend
    toast({
      title: "Notification set!",
      description: "We'll text you when this product becomes available.",
    });
    
    setSelectedProduct(null);
    setPhoneNumber('');
  };

  return (
    <section className="py-10 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Coming Soon</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingProducts.map(product => (
            <Card key={product.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row h-full">
                <div className="sm:w-1/3">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover aspect-square sm:aspect-auto"
                  />
                </div>
                <CardContent className="p-6 sm:w-2/3 flex flex-col">
                  <div className="mb-1 text-xs font-medium text-theme-purple">
                    Pre-order • Available {new Date(product.releaseDate).toLocaleDateString()}
                  </div>
                  <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                  <div className="text-sm mb-4">By {product.vendorName}</div>
                  <div className="mt-auto">
                    <Button 
                      className="w-full sm:w-auto"
                      onClick={() => handleNotifyClick(product.id)}
                    >
                      Notify Me
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={selectedProduct !== null} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Get notified</DialogTitle>
            <DialogDescription>
              We'll send you a text message when this product becomes available.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitNotification} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default UpcomingProducts;
