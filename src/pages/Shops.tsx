
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';
import PageHeader from '@/components/PageHeader';
import VendorCard from '@/components/VendorCard';
import { vendors, categories } from '@/data/mockData';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Search } from 'lucide-react';

const Shops = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  
  // Filter shops based on search and category
  const filteredShops = vendors.filter(shop => {
    const matchesSearch = searchQuery === '' || 
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || shop.categoryId === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Sort shops based on selected criteria
  const sortedShops = [...filteredShops].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // Add more sort options if needed
    return 0;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container py-8">
          <PageHeader 
            title="All Shops" 
            description="Discover local shops and vendors"
          />
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search shops..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4">
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="min-w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={sortBy}
                onValueChange={setSortBy}
              >
                <SelectTrigger className="min-w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedShops.map(shop => (
              <VendorCard
                key={shop.id}
                id={shop.id}
                name={shop.name}
                logo={shop.logo}
                description={shop.description}
                rating={shop.rating}
                deliveryRadius={shop.deliveryRadius}
                featured={shop.featured}
                location={shop.location}
              />
            ))}
          </div>

          {sortedShops.length === 0 && (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No matching shops found</h3>
              <p className="text-muted-foreground mt-2">Try a different search term or category</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shops;
