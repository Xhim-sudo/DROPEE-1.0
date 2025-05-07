
import React, { useState } from 'react';
import ProductsHeader from '@/components/vendor/products/ProductsHeader';
import ProductFilters from '@/components/vendor/products/ProductFilters';
import ProductsTable from '@/components/vendor/products/ProductsTable';
import ProductPagination from '@/components/vendor/products/ProductPagination';
import AddProductModal from '@/components/vendor/products/AddProductModal';
import EditProductModal from '@/components/vendor/products/EditProductModal';
import { Product } from '@/components/vendor/products/ProductTypes';
import { ProductFormValues } from '@/components/vendor/products/EditProductModal';
import { useToast } from "@/components/ui/use-toast";

const VendorProducts = () => {
  const { toast } = useToast();
  // Sample products data with additional fields including images
  const [products, setProducts] = useState<Product[]>([
    { 
      id: "P001", 
      name: "Organic Apples", 
      category: "Fruits",
      price: 3.99,
      discountedPrice: 2.99,
      stock: 120,
      status: "Active",
      hasOffer: true,
      offerEnds: "2023-06-30",
      images: [
        "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=2070",
        "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&q=80&w=2070"
      ]
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
      offerEnds: null,
      images: [
        "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=2832"
      ]
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
      offerEnds: "2023-06-25",
      images: [
        "https://images.unsplash.com/photo-1618580929348-9e8d57d98560?auto=format&fit=crop&q=80&w=1916"
      ]
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
      offerEnds: null,
      images: []
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
      offerEnds: null,
      images: []
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
      offerEnds: "2023-07-15",
      images: [
        "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=1374"
      ]
    },
  ]);

  // State for product modals and pagination
  const [showProductModal, setShowProductModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalProducts = 24; // This would come from your API in a real app

  // Handle edit product
  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setShowEditModal(true);
  };

  // Save edited product
  const handleSaveProduct = (formData: ProductFormValues) => {
    if (currentProduct) {
      // Update the product in the array
      setProducts(products.map(p => 
        p.id === currentProduct.id 
          ? { 
              ...p, 
              ...formData,
              // Update status based on stock
              status: formData.stock === 0 
                ? "Out of Stock" 
                : formData.stock < 10 
                  ? "Low Stock" 
                  : "Active"
            } 
          : p
      ));
      
      toast({
        title: "Product updated",
        description: `${formData.name} has been updated successfully.`,
      });
    }
  };

  // Handle delete product
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    
    toast({
      title: "Product deleted",
      description: "Product has been removed successfully.",
    });
  };
  
  // Handle offer management
  const handleManageOffer = (product: Product) => {
    setCurrentProduct(product);
    setShowEditModal(true);
  };

  return (
    <div>
      <ProductsHeader onAddProduct={() => setShowProductModal(true)} />
      <ProductFilters />
      <ProductsTable 
        products={products} 
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        onManageOffer={handleManageOffer}
      />
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
      
      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        product={currentProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

export default VendorProducts;
