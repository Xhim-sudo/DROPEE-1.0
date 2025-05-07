import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Product } from './ProductTypes';
import { X, Upload, Plus } from 'lucide-react';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const productSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters." }),
  category: z.string().min(1, { message: "Category is required." }),
  price: z.coerce.number().min(0.01, { message: "Price must be greater than 0." }),
  discountedPrice: z.coerce.number().min(0).nullable().optional(),
  stock: z.coerce.number().min(0, { message: "Stock cannot be negative." }),
  hasOffer: z.boolean().default(false),
  offerEnds: z.string().nullable().optional(),
  images: z.array(z.string()).default([]),
});

export type ProductFormValues = z.infer<typeof productSchema>;

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (product: ProductFormValues) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onSave
}) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImageUrls, setNewImageUrls] = useState<string[]>([]);
  
  // Initialize form with product data
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? {
      name: product.name,
      category: product.category,
      price: product.price,
      discountedPrice: product.discountedPrice,
      stock: product.stock,
      hasOffer: product.hasOffer,
      offerEnds: product.offerEnds,
      images: product.images || [],
    } : {
      name: '',
      category: '',
      price: 0,
      discountedPrice: null,
      stock: 0,
      hasOffer: false,
      offerEnds: null,
      images: [],
    }
  });
  
  // Reset form and local state when product changes
  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        category: product.category,
        price: product.price,
        discountedPrice: product.discountedPrice,
        stock: product.stock,
        hasOffer: product.hasOffer,
        offerEnds: product.offerEnds,
        images: product.images || [],
      });
      setNewImages([]);
      setNewImageUrls([]);
    }
  }, [product, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const currentImages = form.getValues().images || [];
      const newFiles = Array.from(e.target.files);
      
      if (currentImages.length + newFiles.length + newImageUrls.length > 3) {
        toast({
          title: "Maximum 3 images allowed",
          description: "Please delete some images before adding more.",
          variant: "destructive"
        });
        return;
      }
      
      // Create preview URLs for the images
      const previewUrls = newFiles.map(file => URL.createObjectURL(file));
      
      setNewImages([...newImages, ...newFiles]);
      setNewImageUrls([...newImageUrls, ...previewUrls]);
    }
  };

  const removeNewImage = (index: number) => {
    const updatedImages = [...newImages];
    const updatedUrls = [...newImageUrls];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(updatedUrls[index]);
    
    updatedImages.splice(index, 1);
    updatedUrls.splice(index, 1);
    
    setNewImages(updatedImages);
    setNewImageUrls(updatedUrls);
  };

  const removeExistingImage = (index: number) => {
    const currentImages = [...form.getValues().images];
    const removedUrl = currentImages[index];
    
    // Remove the image URL from the form values
    currentImages.splice(index, 1);
    form.setValue('images', currentImages);
    
    // We could delete from storage here, but for safety we'll just log it
    // and let the user handle that separately if needed
    console.log(`Image removed: ${removedUrl}`);
  };
  
  const uploadNewImages = async () => {
    if (newImages.length === 0) return [];
    
    setIsUploading(true);
    const storage = getStorage();
    const uploadedUrls: string[] = [];
    
    try {
      for (const image of newImages) {
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
  
  // Handle form submission
  const handleSubmit = async (values: ProductFormValues) => {
    try {
      setIsUploading(true);
      
      // Upload any new images
      const uploadedImageUrls = await uploadNewImages();
      
      // Combine existing and new images
      const allImages = [...values.images, ...uploadedImageUrls];
      
      // Limit to first 3 images if there are more
      const finalImages = allImages.slice(0, 3);
      
      // Save the product with updated images
      onSave({
        ...values,
        images: finalImages
      });
      
      // Clean up preview URLs
      newImageUrls.forEach(url => URL.revokeObjectURL(url));
      setNewImages([]);
      setNewImageUrls([]);
      
      toast({
        title: "Product updated",
        description: "Your product has been successfully updated.",
      });
      
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Update failed",
        description: "There was an error updating your product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select className="w-full p-2 border rounded-md" {...field}>
                      <option value="Fruits">Fruits</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Meat">Meat</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
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
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Image Management Section */}
            <div className="space-y-2">
              <FormLabel>Product Images</FormLabel>
              <div className="border rounded-md p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  {/* Existing images */}
                  {form.getValues().images && form.getValues().images.map((image, index) => (
                    <div key={`existing-${index}`} className="border rounded-md p-2 relative">
                      <div className="aspect-square bg-gray-100 overflow-hidden">
                        <img 
                          src={image} 
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button 
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        onClick={() => removeExistingImage(index)}
                      >
                        <X size={16} />
                      </button>
                      <p className="text-xs mt-1 text-center">
                        {index === 0 ? 'Main Image' : `Additional Image ${index}`}
                      </p>
                    </div>
                  ))}
                  
                  {/* New image previews */}
                  {newImageUrls.map((url, index) => (
                    <div key={`new-${index}`} className="border rounded-md p-2 relative">
                      <div className="aspect-square bg-gray-100 overflow-hidden">
                        <img 
                          src={url} 
                          alt={`New Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button 
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        onClick={() => removeNewImage(index)}
                      >
                        <X size={16} />
                      </button>
                      <p className="text-xs mt-1 text-center">New Image</p>
                    </div>
                  ))}
                  
                  {/* Placeholder if no images */}
                  {form.getValues().images.length === 0 && newImageUrls.length === 0 && (
                    <div className="border rounded-md p-2">
                      <div className="aspect-square bg-gray-100 flex items-center justify-center">
                        <Plus className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-xs mt-1 text-center">No Images Added</p>
                    </div>
                  )}
                </div>
                
                {/* Only show upload button if we have room for more images */}
                {(form.getValues().images.length + newImageUrls.length < 3) && (
                  <div className="flex justify-center mt-4">
                    <label className="cursor-pointer">
                      <div className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-colors">
                        <Upload size={16} />
                        <span>Upload Images</span>
                      </div>
                      <Input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        multiple={false}  
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Maximum 3 images. First image will be the main product image.
                </p>
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="hasOffer"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Limited Time Offer</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Enable this to set a discounted price for a limited time
                    </p>
                  </div>
                </FormItem>
              )}
            />
            
            {form.watch("hasOffer") && (
              <div className="grid grid-cols-2 gap-4">
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
                          placeholder="Discounted price" 
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
                  name="offerEnds"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Offer Ends</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          value={value || ""}
                          onChange={(e) => onChange(e.target.value || null)}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isUploading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
