
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Plus, ShoppingBag } from 'lucide-react';

const AdminProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Sample products data
  const products = [
    { 
      id: "P001", 
      name: "Organic Apples", 
      vendor: "Fresh Grocery Market",
      category: "Fruits",
      price: 3.99,
      status: "Approved"
    },
    { 
      id: "P002", 
      name: "Fresh Bread", 
      vendor: "Artisan Bakery",
      category: "Bakery",
      price: 2.49,
      status: "Approved"
    },
    { 
      id: "P003", 
      name: "Free Range Eggs", 
      vendor: "Farm Direct",
      category: "Dairy",
      price: 4.99,
      status: "Pending"
    },
    { 
      id: "P004", 
      name: "Sourdough Bread", 
      vendor: "Urban Bakers",
      category: "Bakery",
      price: 3.99,
      status: "Rejected"
    },
    { 
      id: "P005", 
      name: "Premium Coffee", 
      vendor: "Beans & More",
      category: "Beverages",
      price: 12.99,
      status: "Approved"
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Products</h1>
      <p className="text-muted-foreground mb-4">
        Manage products across all vendors
      </p>
      
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
          <option value="beverages">Beverages</option>
        </select>
        <select className="p-2 border rounded-md">
          <option value="all">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      
      {/* Products Table */}
      <div className="mt-6 rounded-md border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded bg-muted/30 flex items-center justify-center mr-2">
                        <ShoppingBag className="h-4 w-4" />
                      </div>
                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell>{product.vendor}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${product.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      product.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {product.status === 'Pending' && (
                        <>
                          <Button variant="outline" size="sm" className="text-green-600">
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-muted-foreground">Showing 5 of 34 products</p>
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

export default AdminProducts;
