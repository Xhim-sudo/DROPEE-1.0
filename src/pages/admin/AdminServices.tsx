
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

interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  basePrice: number;
}

const AdminServices = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Cash Delivery',
      icon: '💰',
      description: 'We deliver cash to your doorstep securely and quickly.',
      basePrice: 150
    },
    {
      id: '2',
      name: 'Parcel Delivery',
      icon: '📦',
      description: 'Send packages across town with our reliable delivery service.',
      basePrice: 100
    },
    {
      id: '3',
      name: 'Grocery Delivery',
      icon: '🧺',
      description: 'Get your groceries delivered right to your door.',
      basePrice: 50
    },
    {
      id: '4',
      name: 'Medicine Delivery',
      icon: '💊',
      description: 'Urgent medicine delivery within 90 minutes.',
      basePrice: 80
    }
  ]);

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service>({
    id: '',
    name: '',
    icon: '',
    description: '',
    basePrice: 0
  });

  const handleAddService = () => {
    setCurrentService({
      id: Date.now().toString(),
      name: '',
      icon: '',
      description: '',
      basePrice: 0
    });
    setAddDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setCurrentService({ ...service });
    setEditDialogOpen(true);
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
    toast({
      title: "Service Deleted",
      description: "The service has been successfully deleted.",
    });
  };

  const handleSaveService = (isNew: boolean) => {
    if (isNew) {
      setServices([...services, currentService]);
      setAddDialogOpen(false);
      toast({
        title: "Service Added",
        description: "New service has been successfully added.",
      });
    } else {
      setServices(services.map(service => service.id === currentService.id ? currentService : service));
      setEditDialogOpen(false);
      toast({
        title: "Service Updated",
        description: "The service has been successfully updated.",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'basePrice') {
      setCurrentService({
        ...currentService,
        [name]: parseFloat(value) || 0
      });
    } else {
      setCurrentService({
        ...currentService,
        [name]: value
      });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Services</h1>
      <p className="text-muted-foreground">
        Manage special delivery services
      </p>

      <div className="mt-6">
        <div className="flex justify-end mb-4">
          <Button onClick={handleAddService}>
            <Plus className="h-4 w-4 mr-2" /> Add Service
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Services</CardTitle>
            <CardDescription>
              Manage the services you offer to customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Icon</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Base Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="text-2xl">{service.icon}</TableCell>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>{service.description.slice(0, 50)}...</TableCell>
                    <TableCell>₹{service.basePrice}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEditService(service)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteService(service.id)}>
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

      {/* Add Service Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Service Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={currentService.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Icon (Emoji)</Label>
              <Input 
                id="icon" 
                name="icon" 
                value={currentService.icon}
                onChange={handleInputChange}
                placeholder="Paste an emoji here"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                rows={4}
                value={currentService.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Price (₹)</Label>
              <Input 
                id="basePrice" 
                name="basePrice" 
                type="number"
                value={currentService.basePrice.toString()}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => handleSaveService(true)}>Add Service</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Service Name</Label>
              <Input 
                id="edit-name" 
                name="name" 
                value={currentService.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-icon">Icon (Emoji)</Label>
              <Input 
                id="edit-icon" 
                name="icon" 
                value={currentService.icon}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea 
                id="edit-description" 
                name="description" 
                rows={4}
                value={currentService.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-basePrice">Base Price (₹)</Label>
              <Input 
                id="edit-basePrice" 
                name="basePrice" 
                type="number"
                value={currentService.basePrice.toString()}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => handleSaveService(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
