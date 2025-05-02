
import React, { useState } from 'react';
import ProductsHeader from '@/components/vendor/products/ProductsHeader';
import ProductFilters from '@/components/vendor/products/ProductFilters';
import ProductsTable from '@/components/vendor/products/ProductsTable';
import ProductPagination from '@/components/vendor/products/ProductPagination';
import AddProductModal from '@/components/vendor/products/AddProductModal';

const VendorProducts = () => {
  // Sample products data with additional fields
  const products = [
    { 
      id: "P001", 
      name: "Organic Apples", 
      category: "Fruits",
      price: 3.99,
      discountedPrice: 2.99,
      stock: 120,
      status: "Active",
      hasOffer: true,
      offerEnds: "2023-06-30"
    },
    { 
      id: "P002", 
      name: "Fresh Bread", 
      category: "Bakery",
      price: 2.49,
      discountedPrice: null,
      stock: 45,
      status: "Active",
      hasOffer: false,
      offerEnds: null
    },
    { 
      id: "P003", 
      name: "Free Range Eggs", 
      category: "Dairy",
      price: 4.99,
      discountedPrice: 3.99,
      stock: 80,
      status: "Active",
      hasOffer: true,
      offerEnds: "2023-06-25"
    },
    { 
      id: "P004", 
      name: "Avocados", 
      category: "Fruits",
      price: 5.99,
      discountedPrice: null,
      stock: 30,
      status: "Low Stock",
      hasOffer: false,
      offerEnds: null
    },
    { 
      id: "P005", 
      name: "Sourdough Bread", 
      category: "Bakery",
      price: 3.99,
      discountedPrice: null,
      stock: 0,
      status: "Out of Stock",
      hasOffer: false,
      offerEnds: null
    },
    { 
      id: "P006", 
      name: "Milk", 
      category: "Dairy",
      price: 2.99,
      discountedPrice: 2.49,
      stock: 65,
      status: "Active",
      hasOffer: true,
      offerEnds: "2023-07-15"
    },
  ];

  // State for product modal and pagination
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalProducts = 24; // This would come from your API in a real app

  return (
    <div>
      <ProductsHeader onAddProduct={() => setShowProductModal(true)} />
      <ProductFilters />
      <ProductsTable products={products} />
      <ProductPagination 
        totalProducts={totalProducts} 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
      
      {/* Product Form Modal */}
      <AddProductModal 
        isOpen={showProductModal} 
        onClose={() => setShowProductModal(false)} 
      />
    </div>
  );
};

export default VendorProducts;
