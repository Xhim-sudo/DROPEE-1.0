
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Search, Filter, Plus, ShoppingBag, Trash, Edit, Check, X } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";

// Schema for product form validation
const productSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters." }),
  category: z.string().min(1, { message: "Category is required." }),
  vendor: z.string().min(1, { message: "Vendor is required." }),
  price: z.coerce.number().min(0.01, { message: "Price must be greater than 0." }),
  discountedPrice: z.coerce.number().min(0).optional().nullable(),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  stock: z.coerce.number().min(0, { message: "Stock cannot be negative." }),
  status: z.enum(["Approved", "Pending", "Rejected"]),
});

type ProductFormValues = z.infer<typeof productSchema>;

const AdminProducts = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  
  // Initialize form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      category: '',
      vendor: '',
      price: 0,
      discountedPrice: null,
      description: '',
      stock: 0,
      status: 'Pending',
    },
  });

  // Sample products data
  const [products, setProducts] = useState([
    { 
      id: "P001", 
      name: "Organic Apples", 
      vendor: "Fresh Grocery Market",
      category: "Fruits",
      price: 3.99,
      discountedPrice: null,
      description: "Fresh organic apples from local farms.",
      stock: 120,
      status: "Approved"
    },
    { 
      id: "P002", 
      name: "Fresh Bread", 
      vendor: "Artisan Bakery",
      category: "Bakery",
      price: 2.49,
      discountedPrice: 1.99,
      description: "Freshly baked artisan bread.",
      stock: 45,
      status: "Approved"
    },
    { 
      id: "P003", 
      name: "Free Range Eggs", 
      vendor: "Farm Direct",
      category: "Dairy",
      price: 4.99,
      discountedPrice: null,
      description: "Farm fresh free-range eggs.",
      stock: 80,
      status: "Pending"
    },
    { 
      id: "P004", 
      name: "Sourdough Bread", 
      vendor: "Urban Bakers",
      category: "Bakery",
      price: 3.99,
      discountedPrice: 2.99,
      description: "Traditional sourdough bread baked fresh daily.",
      stock: 0,
      status: "Rejected"
    },
    { 
      id: "P005", 
      name: "Premium Coffee", 
      vendor: "Beans & More",
      category: "Beverages",
      price: 12.99,
      discountedPrice: 10.99,
      description: "Premium coffee beans from Colombia.",
      stock: 50,
      status: "Approved"
    }
  ]);
  
  // Sample vendor list
  const vendors = [
    "Fresh Grocery Market",
    "Artisan Bakery",
    "Farm Direct",
    "Urban Bakers",
    "Beans & More"
  ];
  
  // Sample categories
  const categories = [
    "Fruits",
    "Vegetables",
    "Bakery",
    "Dairy",
    "Beverages",
    "Meat",
    "Seafood",
    "Snacks"
  ];

  // Filter products based on search term and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddProduct = () => {
    form.reset({
      name: '',
      category: categories[0],
      vendor: vendors[0],
      price: 0,
      discountedPrice: null,
      description: '',
      stock: 0,
      status: 'Pending',
    });
    setIsAddProductOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setCurrentProductId(product.id);
    form.reset({
      name: product.name,
      category: product.category,
      vendor: product.vendor,
      price: product.price,
      discountedPrice: product.discountedPrice,
      description: product.description,
      stock: product.stock,
      status: product.status,
    });
    setIsEditProductOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: "Product Deleted",
      description: "The product has been successfully removed.",
    });
  };

  const handleStatusChange = (id: string, newStatus: "Approved" | "Pending" | "Rejected") => {
    setProducts(products.map(product => 
      product.id === id ? {...product, status: newStatus} : product
    ));
    
    toast({
      title: "Status Updated",
      description: `The product status has been changed to ${newStatus}.`,
    });
  };

  const onSubmitAdd = (data: ProductFormValues) => {
    // Create a new product with form data
    const newProduct = {
      id: `P${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`, // Generate ID
      name: data.name,
      vendor: data.vendor,
      category: data.category,
      price: data.price,
      discountedPrice: data.discountedPrice,
      description: data.description,
      stock: data.stock,
      status: data.status,
    };
    
    setProducts([...products, newProduct]);
    setIsAddProductOpen(false);
    form.reset();
    
    toast({
      title: "Product Added",
      description: "New product has been successfully added.",
    });
  };

  const onSubmitEdit = (data: ProductFormValues) => {
    if (currentProductId) {
      setProducts(products.map(product => 
        product.id === currentProductId ? {
          ...product,
          name: data.name,
          vendor: data.vendor,
          category: data.category,
          price: data.price,
          discountedPrice: data.discountedPrice,
          description: data.description,
          stock: data.stock,
          status: data.status,
        } : product
      ));
      
      setIsEditProductOpen(false);
      setCurrentProductId(null);
      
      toast({
        title: "Product Updated",
        description: "The product has been successfully updated.",
      });
    }
  };

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
        <select 
          className="p-2 border rounded-md"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select 
          className="p-2 border rounded-md"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
        <Button onClick={handleAddProduct}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
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
                <TableHead className="text-center">Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded bg-muted/30 flex items-center justify-center mr-2">
                        <ShoppingBag className="h-4 w-4" />
                      </div>
                      <div>
                        <div>{product.name}</div>
                        {product.discountedPrice && (
                          <div className="text-xs text-green-600">On Sale</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.vendor}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">
                    {product.discountedPrice ? (
                      <div>
                        <span className="line-through text-muted-foreground">${product.price.toFixed(2)}</span>
                        <span className="ml-2 font-medium">${product.discountedPrice.toFixed(2)}</span>
                      </div>
                    ) : (
                      <span>${product.price.toFixed(2)}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={product.stock === 0 ? "text-red-500" : ""}>{product.stock}</span>
                  </TableCell>
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
                      <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                      {product.status === 'Pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-green-600"
                            onClick={() => handleStatusChange(product.id, 'Approved')}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600"
                            onClick={() => handleStatusChange(product.id, 'Rejected')}
                          >
                            <X className="h-4 w-4" />
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
        <p className="text-sm text-muted-foreground">Showing {filteredProducts.length} of {products.length} products</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="bg-muted">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Add a new product to your inventory.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitAdd)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <select 
                          className="w-full p-2 border rounded-md" 
                          {...field}
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="vendor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vendor</FormLabel>
                      <FormControl>
                        <select 
                          className="w-full p-2 border rounded-md" 
                          {...field}
                        >
                          {vendors.map(vendor => (
                            <option key={vendor} value={vendor}>{vendor}</option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Regular Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="discountedPrice"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Sale Price ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="Optional" 
                          value={value === null ? "" : value} 
                          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter product description" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full p-2 border rounded-md" 
                        {...field}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsAddProductOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Product</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Make changes to the product information.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <select 
                          className="w-full p-2 border rounded-md" 
                          {...field}
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="vendor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vendor</FormLabel>
                      <FormControl>
                        <select 
                          className="w-full p-2 border rounded-md" 
                          {...field}
                        >
                          {vendors.map(vendor => (
                            <option key={vendor} value={vendor}>{vendor}</option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Regular Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="discountedPrice"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Sale Price ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="Optional" 
                          value={value === null ? "" : value} 
                          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full p-2 border rounded-md" 
                        {...field}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsEditProductOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
