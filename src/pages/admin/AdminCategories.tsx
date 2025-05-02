
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Plus, Trash2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories?: string[];
  description?: string;
}

const AdminCategories = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Electronics', icon: '📱', subcategories: ['Phones', 'Computers', 'Accessories'] },
    { id: '2', name: 'Clothing', icon: '👕', subcategories: ['Shirts', 'Pants', 'Shoes'] },
    { id: '3', name: 'Food', icon: '🍔', subcategories: ['Fast Food', 'Groceries', 'Desserts'] },
  ]);

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category>({ id: '', name: '', icon: '' });

  const handleAddCategory = () => {
    setCurrentCategory({ id: Date.now().toString(), name: '', icon: '' });
    setAddDialogOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setCurrentCategory({ ...category });
    setEditDialogOpen(true);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
    toast({
      title: "Category Deleted",
      description: "The category has been successfully deleted.",
    });
  };

  const handleSaveCategory = (isNew: boolean) => {
    if (isNew) {
      setCategories([...categories, currentCategory]);
      setAddDialogOpen(false);
      toast({
        title: "Category Added",
        description: "New category has been successfully added.",
      });
    } else {
      setCategories(categories.map(cat => cat.id === currentCategory.id ? currentCategory : cat));
      setEditDialogOpen(false);
      toast({
        title: "Category Updated",
        description: "The category has been successfully updated.",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentCategory({
      ...currentCategory,
      [name]: value
    });
  };

  const handleSubcategoriesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const subcategories = e.target.value.split(',').map(s => s.trim()).filter(s => s);
    setCurrentCategory({
      ...currentCategory,
      subcategories
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
      <p className="text-muted-foreground">
        Manage product and service categories
      </p>

      <div className="mt-6">
        <div className="flex justify-end mb-4">
          <Button onClick={handleAddCategory}>
            <Plus className="h-4 w-4 mr-2" /> Add Category
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Categories</CardTitle>
            <CardDescription>
              Manage the categories displayed on your store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Icon</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Subcategories</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="text-2xl">{category.icon}</TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.subcategories?.join(', ')}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEditCategory(category)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={currentCategory.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Icon (Emoji)</Label>
              <Input 
                id="icon" 
                name="icon" 
                value={currentCategory.icon}
                onChange={handleInputChange}
                placeholder="Paste an emoji here"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subcategories">Subcategories (comma separated)</Label>
              <Textarea 
                id="subcategories" 
                name="subcategories"
                value={currentCategory.subcategories?.join(', ') || ''}
                onChange={handleSubcategoriesChange}
                placeholder="e.g. Phones, Computers, Accessories"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea 
                id="description" 
                name="description"
                value={currentCategory.description || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => handleSaveCategory(true)}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Category Name</Label>
              <Input 
                id="edit-name" 
                name="name" 
                value={currentCategory.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-icon">Icon (Emoji)</Label>
              <Input 
                id="edit-icon" 
                name="icon" 
                value={currentCategory.icon}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-subcategories">Subcategories (comma separated)</Label>
              <Textarea 
                id="edit-subcategories" 
                name="subcategories"
                value={currentCategory.subcategories?.join(', ') || ''}
                onChange={handleSubcategoriesChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description (optional)</Label>
              <Textarea 
                id="edit-description" 
                name="description"
                value={currentCategory.description || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => handleSaveCategory(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCategories;
