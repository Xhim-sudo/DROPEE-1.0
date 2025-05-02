
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal = ({ isOpen, onClose }: AddProductModalProps) => {
  if (!isOpen) return null;

  return (
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
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-theme-purple hover:bg-theme-purple/80">
            Save Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
