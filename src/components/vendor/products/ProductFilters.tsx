
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from 'lucide-react';

const ProductFilters = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products..."
          className="pl-8"
        />
      </div>
      <Button variant="outline" className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
        <span>Filter</span>
      </Button>
      <select className="p-2 border rounded-md">
        <option value="all">All Categories</option>
        <option value="fruits">Fruits</option>
        <option value="bakery">Bakery</option>
        <option value="dairy">Dairy</option>
      </select>
      <select className="p-2 border rounded-md">
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="low">Low Stock</option>
        <option value="out">Out of Stock</option>
      </select>
      <select className="p-2 border rounded-md">
        <option value="all">All Offers</option>
        <option value="with-offer">With Offers</option>
        <option value="no-offer">No Offers</option>
      </select>
    </div>
  );
};

export default ProductFilters;
