
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Search, Filter, Plus } from 'lucide-react';

const VendorProducts = () => {
  // Sample products data
  const products = [
    { 
      id: "P001", 
      name: "Organic Apples", 
      category: "Fruits",
      price: 3.99,
      stock: 120,
      status: "Active"
    },
    { 
      id: "P002", 
      name: "Fresh Bread", 
      category: "Bakery",
      price: 2.49,
      stock: 45,
      status: "Active"
    },
    { 
      id: "P003", 
      name: "Free Range Eggs", 
      category: "Dairy",
      price: 4.99,
      stock: 80,
      status: "Active"
    },
    { 
      id: "P004", 
      name: "Avocados", 
      category: "Fruits",
      price: 5.99,
      stock: 30,
      status: "Low Stock"
    },
    { 
      id: "P005", 
      name: "Sourdough Bread", 
      category: "Bakery",
      price: 3.99,
      stock: 0,
      status: "Out of Stock"
    },
    { 
      id: "P006", 
      name: "Milk", 
      category: "Dairy",
      price: 2.99,
      stock: 65,
      status: "Active"
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage your product catalog
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-theme-purple hover:bg-theme-purple-dark">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>
      
      {/* Filters and Search */}
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
      </div>
      
      {/* Products Table */}
      <div className="mt-6 rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="py-3 px-4 text-left font-medium">ID</th>
                <th className="py-3 px-4 text-left font-medium">Name</th>
                <th className="py-3 px-4 text-left font-medium">Category</th>
                <th className="py-3 px-4 text-right font-medium">Price</th>
                <th className="py-3 px-4 text-right font-medium">Stock</th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t hover:bg-muted/50">
                  <td className="py-3 px-4">{product.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded bg-muted/30 flex items-center justify-center mr-2">
                        <ShoppingBag className="h-4 w-4" />
                      </div>
                      {product.name}
                    </div>
                  </td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4 text-right">${product.price.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">{product.stock}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${product.status === 'Active' ? 'bg-green-100 text-green-800' :
                      product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center space-x-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-muted-foreground">Showing 6 of 24 products</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="bg-muted">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default VendorProducts;
