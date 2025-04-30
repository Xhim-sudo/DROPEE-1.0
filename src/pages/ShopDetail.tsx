
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from '@/components/PageHeader';
import ProductCard from '@/components/ProductCard';
import { vendors, products, categories } from '@/data/mockData';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Star, MapPin, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const ShopDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();
  
  // Find shop by ID
  const shop = vendors.find(v => v.id === id);
  
  // If shop not found, render not found message
  if (!shop) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Shop Not Found</h1>
          <p className="mb-6">The shop you're looking for doesn't exist.</p>
          <Link to="/shops">
            <Button>Back to Shops</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Get category information
  const category = categories.find(c => c.id === shop.categoryId);
  
  // Get shop's products
  const shopProducts = products.filter(p => p.vendorId === shop.id);
  
  // Filter products based on search query
  const filteredProducts = shopProducts.filter(product => 
    searchQuery === '' || 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Shop Header */}
        <div className="bg-gradient-to-r from-theme-purple-light to-theme-purple-dark py-6">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 bg-white rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={shop.logo}
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-grow text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-white">{shop.name}</h1>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                  <div className="flex items-center text-white/90">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <span>{shop.rating.toFixed(1)}</span>
                  </div>
                  
                  <div className="flex items-center text-white/90">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{shop.location}</span>
                  </div>
                  
                  <div className="flex items-center text-white/90">
                    <span className="mr-1">🚚</span>
                    <span>Delivers up to {shop.deliveryRadius}</span>
                  </div>
                  
                  {category && (
                    <div className="flex items-center text-white/90">
                      <span className="mr-1">{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                  )}
                </div>
                
                <p className="mt-3 text-white/80">{shop.description}</p>
              </div>
              
              <div className="flex-shrink-0">
                <Button className="flex items-center gap-2 bg-white text-theme-purple hover:bg-white/90">
                  <Phone className="w-4 h-4" />
                  <span>Contact Shop</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Shop Content */}
        <div className="container py-8">
          <Tabs defaultValue="products">
            <TabsList className="mb-6">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="info">Shop Info</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products">
              {/* Search Bar */}
              <div className="mb-6">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    description={product.description}
                    vendorId={product.vendorId}
                    vendorName={shop.name}
                  />
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium">No products found</h3>
                  <p className="text-muted-foreground mt-2">Try a different search term</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="info">
              <div className="max-w-2xl mx-auto">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">About {shop.name}</h3>
                    <p className="mt-2 text-muted-foreground">{shop.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <a href={`https://wa.me/${shop.whatsapp}`} className="text-theme-purple hover:underline">
                        WhatsApp: {shop.whatsapp}
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Location</h3>
                    <p className="mt-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {shop.location} (Delivers up to {shop.deliveryRadius})
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Floating Cart Button */}
        {getTotalItems() > 0 && (
          <div className="fixed bottom-6 right-6">
            <Link to="/cart">
              <Button className="shadow-lg bg-theme-purple hover:bg-theme-purple-dark">
                View Cart ({getTotalItems()})
              </Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ShopDetail;
