
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

interface ProductsHeaderProps {
  onAddProduct: () => void;
}

const ProductsHeader = ({ onAddProduct }: ProductsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground mt-1">
          Manage your product catalog
        </p>
      </div>
      <Button 
        className="mt-4 md:mt-0 bg-theme-purple hover:bg-theme-purple-dark"
        onClick={onAddProduct}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Product
      </Button>
    </div>
  );
};

export default ProductsHeader;
