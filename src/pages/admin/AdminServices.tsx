
import React, { useState, useEffect } from 'react';
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
import { Pencil, Plus, Trash2, Loader2 } from 'lucide-react';
import { 
  getFirestore, 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { app } from '@/config/firebase';
import { createNotification } from '@/utils/notificationUtils';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  basePrice: number;
}

const AdminServices = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentService, setCurrentService] = useState<Service>({
    id: '',
    name: '',
    icon: '',
    description: '',
    basePrice: 0
  });
  const db = getFirestore(app);

  useEffect(() => {
    const servicesQuery = query(collection(db, "services"), orderBy("name"));
    
    const unsubscribe = onSnapshot(servicesQuery, (snapshot) => {
      const servicesList: Service[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          icon: data.icon,
          description: data.description,
          basePrice: data.basePrice || 0
        };
      });
      
      setServices(servicesList);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching services:", error);
      toast({
        title: "Error",
        description: "Failed to load services. Please try again later.",
        variant: "destructive"
      });
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [db, toast]);

  const handleAddService = () => {
    setCurrentService({
      id: '',
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

  const handleDeleteService = async (id: string, name: string) => {
    try {
      setIsProcessing(true);
      await deleteDoc(doc(db, "services", id));
      
      await createNotification(
        'system_alert',
        'Service Removed',
        `The "${name}" service has been removed from the platform.`
      );
      
      toast({
        title: "Service Deleted",
        description: "The service has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting service:", error);
      toast({
        title: "Error",
        description: "Failed to delete the service. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveService = async (isNew: boolean) => {
    try {
      setIsProcessing(true);
      
      if (isNew) {
        const { id, ...serviceData } = currentService;
        const docRef = await addDoc(collection(db, "services"), serviceData);
        
        await createNotification(
          'system_alert',
          'New Service Added',
          `A new service "${currentService.name}" has been added to the platform.`
        );
        
        setAddDialogOpen(false);
        toast({
          title: "Service Added",
          description: "New service has been successfully added.",
        });
      } else {
        const { id, ...serviceData } = currentService;
        await updateDoc(doc(db, "services", id), serviceData);
        
        await createNotification(
          'system_alert',
          'Service Updated',
          `The "${currentService.name}" service has been updated.`
        );
        
        setEditDialogOpen(false);
        toast({
          title: "Service Updated",
          description: "The service has been successfully updated.",
        });
      }
    } catch (error) {
      console.error("Error saving service:", error);
      toast({
        title: "Error",
        description: `Failed to ${isNew ? 'add' : 'update'} the service. Please try again.`,
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
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
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 text-theme-purple animate-spin" />
                <span className="ml-2">Loading services...</span>
              </div>
            ) : services.length === 0 ? (
              <Alert>
                <AlertDescription>
                  No services found. Create your first service by clicking the "Add Service" button.
                </AlertDescription>
              </Alert>
            ) : (
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
                      <TableCell>{service.description.length > 50 ? `${service.description.slice(0, 50)}...` : service.description}</TableCell>
                      <TableCell>₹{service.basePrice}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditService(service)}
                          disabled={isProcessing}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteService(service.id, service.name)}
                          disabled={isProcessing}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
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
                disabled={isProcessing}
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
                disabled={isProcessing}
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
                disabled={isProcessing}
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
                disabled={isProcessing}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)} disabled={isProcessing}>Cancel</Button>
            <Button onClick={() => handleSaveService(true)} disabled={isProcessing}>
              {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Service
            </Button>
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
                disabled={isProcessing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-icon">Icon (Emoji)</Label>
              <Input 
                id="edit-icon" 
                name="icon" 
                value={currentService.icon}
                onChange={handleInputChange}
                disabled={isProcessing}
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
                disabled={isProcessing}
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
                disabled={isProcessing}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)} disabled={isProcessing}>Cancel</Button>
            <Button onClick={() => handleSaveService(false)} disabled={isProcessing}>
              {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
