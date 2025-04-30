
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import PageHeader from '@/components/PageHeader';
import CategoryCard from '@/components/CategoryCard';
import { categories } from '@/data/mockData';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Search } from 'lucide-react';

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter categories based on search query
  const filteredCategories = categories.filter(category => 
    searchQuery === '' || 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.subcategories?.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container py-8">
          <PageHeader 
            title="Categories" 
            description="Browse all our product and service categories"
          />
          
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search categories..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredCategories.map(category => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                icon={category.icon}
                subcategories={category.subcategories}
              />
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No matching categories found</h3>
              <p className="text-muted-foreground mt-2">Try a different search term</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
