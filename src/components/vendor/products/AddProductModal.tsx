
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal = ({ isOpen, onClose }: AddProductModalProps) => {
  const { toast } = useToast();
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      if (images.length + newFiles.length > 3) {
        toast({
          title: "Maximum 3 images allowed",
          description: "Please select fewer images.",
          variant: "destructive"
        });
        return;
      }
      
      // Create preview URLs for the images
      const newImageUrls = [...imageUrls];
      newFiles.forEach(file => {
        newImageUrls.push(URL.createObjectURL(file));
      });
      
      setImages([...images, ...newFiles]);
      setImageUrls(newImageUrls);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newImageUrls = [...imageUrls];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newImageUrls[index]);
    
    newImages.splice(index, 1);
    newImageUrls.splice(index, 1);
    
    setImages(newImages);
    setImageUrls(newImageUrls);
  };

  const uploadImages = async () => {
    if (images.length === 0) return [];
    
    setIsUploading(true);
    const storage = getStorage();
    const uploadedUrls: string[] = [];
    
    try {
      for (const image of images) {
        const fileName = `products/${Date.now()}-${image.name}`;
        const storageRef = ref(storage, fileName);
        
        await uploadBytes(storageRef, image);
        const downloadUrl = await getDownloadURL(storageRef);
        uploadedUrls.push(downloadUrl);
      }
      
      toast({
        title: "Images uploaded successfully",
        description: `${uploadedUrls.length} images have been uploaded.`,
      });
      
      return uploadedUrls;
    } catch (error) {
      console.error("Error uploading images:", error);
      
      toast({
        title: "Upload failed",
        description: "There was an error uploading your images. Please try again.",
        variant: "destructive"
      });
      
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would get all the form values and validate them
    // For now, we're just handling the image upload part
    
    const uploadedImageUrls = await uploadImages();
    
    if (uploadedImageUrls.length > 0) {
      // We would normally save the product with these image URLs
      console.log("Product images uploaded:", uploadedImageUrls);
      
      // Clear the form and close the modal
      setImages([]);
      setImageUrls([]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="product-name">Product Name</Label>
              <Input id="product-name" placeholder="Enter product name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-category">Category</Label>
              <select id="product-category" className="w-full border rounded-md p-2" required>
                <option value="">Select category</option>
                <option value="fruits">Fruits</option>
                <option value="bakery">Bakery</option>
                <option value="dairy">Dairy</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-price">Price (₹)</Label>
              <Input id="product-price" type="number" step="0.01" min="0" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-stock">Stock Quantity</Label>
              <Input id="product-stock" type="number" min="0" required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="product-description">Description</Label>
              <Textarea 
                id="product-description" 
                placeholder="Enter product description" 
                rows={4}
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-3">Product Images</h3>
            <div className="border border-dashed rounded-md p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {imageUrls.length > 0 ? (
                  imageUrls.map((url, index) => (
                    <div key={index} className="border rounded-md p-2 relative">
                      <div className="aspect-square bg-gray-100 overflow-hidden">
                        <img 
                          src={url} 
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button 
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        onClick={() => removeImage(index)}
                      >
                        <X size={16} />
                      </button>
                      <p className="text-xs mt-1 text-center">
                        {index === 0 ? 'Main Image' : `Additional Image ${index}`}
                      </p>
                    </div>
                  ))
                ) : (
                  <>
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
                  </>
                )}
              </div>
              
              <div className="mt-4 flex justify-center">
                <label className="cursor-pointer">
                  <div className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-colors">
                    <Upload size={16} />
                    <span>{images.length > 0 ? 'Add More Images' : 'Upload Images'}</span>
                  </div>
                  <Input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    multiple 
                    onChange={handleImageChange}
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2 text-center block w-full">
                  Upload up to 3 images. First image will be the main product image.
                </p>
              </div>
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
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              className="bg-theme-purple hover:bg-theme-purple/80"
              type="submit"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Save Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
