
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/PageHeader';
import ProductCard from '@/components/ProductCard';
import { categories } from '@/data/mockData';

// Mock products data
const mockProducts = [
  {
    id: "p1",
    name: "Fresh Apples",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Locally sourced fresh apples",
    vendorId: "v1",
    vendorName: "Fresh Farms",
    categoryId: "1" // Corresponds to "Electronics" in mockData
  },
  {
    id: "p2",
    name: "Organic Bananas",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1566393028639-d108a42c46a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Organic bananas from sustainable farms",
    vendorId: "v1",
    vendorName: "Fresh Farms",
    categoryId: "1"
  },
  {
    id: "p3",
    name: "Cotton T-Shirt",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Comfortable cotton t-shirt",
    vendorId: "v2",
    vendorName: "Fashion Store",
    categoryId: "2" // Corresponds to "Clothing" in mockData
  },
  {
    id: "p4",
    name: "Denim Jeans",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Classic denim jeans",
    vendorId: "v2",
    vendorName: "Fashion Store",
    categoryId: "2"
  },
  {
    id: "p5",
    name: "Cheeseburger",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Delicious cheeseburger with fries",
    vendorId: "v3",
    vendorName: "Burger Joint",
    categoryId: "3" // Corresponds to "Food" in mockData
  }
];

const CategoryProducts = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<any>(null);
  
  useEffect(() => {
    // Find the category details from the mock data
    const foundCategory = categories.find(cat => cat.id === categoryId);
    setCategory(foundCategory);
  }, [categoryId]);
  
  // Filter products by category and search term
  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = product.categoryId === categoryId;
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Sort the products alphabetically
  const sortedProducts = [...filteredProducts].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container py-8">
          {category ? (
            <PageHeader 
              title={`${category.name} Products`}
              description={`Browse our selection of ${category.name.toLowerCase()} products`}
            />
          ) : (
            <PageHeader 
              title="Category Products"
              description="Browse our product selection"
            />
          )}
          
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {category && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Subcategories:</h3>
              <div className="flex flex-wrap gap-2">
                {category.subcategories?.map((subcategory: string) => (
                  <Button 
                    key={subcategory} 
                    variant="outline" 
                    size="sm"
                    className="bg-gray-50 hover:bg-gray-100"
                  >
                    {subcategory}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  description={product.description}
                  vendorId={product.vendorId}
                  vendorName={product.vendorName}
                  showQuickBuy={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground mt-2">Try a different search term or browse other categories</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryProducts;
