
import React from 'react';
import { Button } from "@/components/ui/button";

interface ProductPaginationProps {
  totalProducts: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ProductPagination = ({ totalProducts, currentPage, onPageChange }: ProductPaginationProps) => {
  // Sample pagination logic - in a real app, this would be more sophisticated
  const productsPerPage = 6;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  
  return (
    <div className="flex items-center justify-between mt-6">
      <p className="text-sm text-muted-foreground">
        Showing {productsPerPage} of {totalProducts} products
      </p>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <Button 
            key={page} 
            variant="outline" 
            size="sm" 
            className={currentPage === page ? "bg-muted" : ""}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
        
        <Button 
          variant="outline" 
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductPagination;
