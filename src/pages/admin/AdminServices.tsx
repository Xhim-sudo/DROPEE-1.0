
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Plus } from 'lucide-react';
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
import { Service } from '@/types/ServiceTypes';
import ServiceTable from '@/components/admin/services/ServiceTable';
import ServiceFormDialog from '@/components/admin/services/ServiceFormDialog';

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
              <ServiceTable
                services={services}
                isProcessing={isProcessing}
                onEdit={handleEditService}
                onDelete={handleDeleteService}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Service Dialog */}
      <ServiceFormDialog
        open={isAddDialogOpen}
        onOpenChange={setAddDialogOpen}
        title="Add New Service"
        service={currentService}
        isProcessing={isProcessing}
        onInputChange={handleInputChange}
        onSave={() => handleSaveService(true)}
        formType="add"
      />

      {/* Edit Service Dialog */}
      <ServiceFormDialog
        open={isEditDialogOpen}
        onOpenChange={setEditDialogOpen}
        title="Edit Service"
        service={currentService}
        isProcessing={isProcessing}
        onInputChange={handleInputChange}
        onSave={() => handleSaveService(false)}
        formType="edit"
      />
    </div>
  );
};

export default AdminServices;
