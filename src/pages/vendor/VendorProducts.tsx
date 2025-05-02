import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingBag, Search, Filter, Plus, Image, Percent, Info, Calendar } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

  // State for product modal
  const [showProductModal, setShowProductModal] = useState(false);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage your product catalog
          </p>
        </div>
        <Button 
          className="mt-4 md:mt-0 bg-theme-purple hover:bg-theme-purple-dark"
          onClick={() => setShowProductModal(true)}
        >
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
        <select className="p-2 border rounded-md">
          <option value="all">All Offers</option>
          <option value="with-offer">With Offers</option>
          <option value="no-offer">No Offers</option>
        </select>
      </div>
      
      {/* Products Table */}
      <div className="mt-6 rounded-md border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Discount</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Limited Offer</TableHead>
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
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    {product.discountedPrice ? (
                      <span className="text-green-600">${product.discountedPrice.toFixed(2)}</span>
                    ) : "-"}
                  </TableCell>
                  <TableCell className="text-right">{product.stock}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${product.status === 'Active' ? 'bg-green-100 text-green-800' :
                      product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {product.hasOffer ? (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-amber-600" />
                        <span className="text-xs">Until {new Date(product.offerEnds).toLocaleDateString()}</span>
                      </div>
                    ) : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Image className="h-4 w-4 mr-1" />
                        <span>Images</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Percent className="h-4 w-4 mr-1" />
                        <span>Offer</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Info className="h-4 w-4 mr-1" />
                        <span>Details</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Product Form Modal - This would be shown when showProductModal is true */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input id="product-name" placeholder="Enter product name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-category">Category</Label>
                <select id="product-category" className="w-full border rounded-md p-2">
                  <option value="">Select category</option>
                  <option value="fruits">Fruits</option>
                  <option value="bakery">Bakery</option>
                  <option value="dairy">Dairy</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-price">Price (₹)</Label>
                <Input id="product-price" type="number" step="0.01" min="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-stock">Stock Quantity</Label>
                <Input id="product-stock" type="number" min="0" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="product-description">Description</Label>
                <Textarea 
                  id="product-description" 
                  placeholder="Enter product description" 
                  rows={4}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Product Images</h3>
              <div className="border border-dashed rounded-md p-4 text-center">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border rounded-md p-2">
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      <Plus className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-xs mt-1 text-center">Main Image</p>
                  </div>
                  <div className="border rounded-md p-2">
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      <Plus className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-xs mt-1 text-center">Additional Image</p>
                  </div>
                  <div className="border rounded-md p-2">
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      <Plus className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-xs mt-1 text-center">Additional Image</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  Upload Images
                </Button>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Special Offer</h3>
              <div className="flex items-center space-x-2 mb-4">
                <input type="checkbox" id="has-offer" className="h-4 w-4" />
                <Label htmlFor="has-offer">Add Limited Time Offer</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6">
                <div className="space-y-2">
                  <Label htmlFor="discounted-price">Offer Price (₹)</Label>
                  <Input id="discounted-price" type="number" step="0.01" min="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="offer-end">Offer Valid Until</Label>
                  <Input id="offer-end" type="date" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowProductModal(false)}>
                Cancel
              </Button>
              <Button className="bg-theme-purple hover:bg-theme-purple/80">
                Save Product
              </Button>
            </div>
          </div>
        </div>
      )}
      
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
