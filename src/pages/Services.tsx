
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getFirestore, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { app } from '@/config/firebase';
import { Service } from '@/types/ServiceTypes';
import { useToast } from '@/components/ui/use-toast';
import { Plus } from 'lucide-react';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesList from '@/components/services/ServicesList';
import ServiceFeatures from '@/components/services/ServiceFeatures';
import ServicesPricingTable from '@/components/services/ServicesPricingTable';
import DeleteServiceDialog from '@/components/services/DeleteServiceDialog';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // In a real app, this would check auth status and admin role
  useEffect(() => {
    // Mock admin check - in a real app, this would be from Firebase Auth
    const checkIfAdmin = () => {
      // This is just a simple mock to demonstrate UI switching
      // In a real app you'd check the user's role from Firebase Auth
      const urlParams = new URLSearchParams(window.location.search);
      const adminMode = urlParams.get('admin') === 'true';
      setIsAdmin(adminMode);
    };
    
    checkIfAdmin();
  }, []);

  useEffect(() => {
    const db = getFirestore(app);
    const servicesQuery = query(collection(db, "services"), orderBy("name"));

    const unsubscribe = onSnapshot(servicesQuery, (snapshot) => {
      const servicesList: Service[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          icon: data.icon,
          description: data.description,
          basePrice: data.basePrice
        };
      });
      setServices(servicesList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching services:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddService = () => {
    navigate('/admin/services');
  };

  const handleEditService = (id: string) => {
    navigate(`/admin/services?editId=${id}`);
  };

  const handleDeletePrompt = (id: string) => {
    setSelectedServiceId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedServiceId) {
      // In a real implementation, you would delete from Firestore here
      // For now, we'll just show a toast
      toast({
        title: "Service deleted",
        description: "The service has been permanently removed.",
      });
      setDeleteDialogOpen(false);
      navigate('/admin/services');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <ServicesHero />
        
        {/* Services Grid */}
        <div className="container py-10">
          <div className="flex justify-between items-center mb-6">
            <PageHeader 
              title="Our Services" 
              description="Choose from our range of special delivery services"
            />
            {isAdmin && (
              <Button onClick={handleAddService} className="bg-theme-purple hover:bg-theme-purple-dark">
                <Plus className="h-4 w-4 mr-2" /> Add Service
              </Button>
            )}
          </div>
          
          <ServicesList 
            services={services} 
            loading={loading}
            isAdmin={isAdmin}
            onEdit={handleEditService}
            onDelete={handleDeletePrompt}
          />
        </div>
        
        {/* Feature Sections */}
        <ServiceFeatures />
        
        {/* Pricing Table */}
        <ServicesPricingTable />
      </main>
      <Footer />

      {/* Delete Confirmation Dialog */}
      <DeleteServiceDialog 
        open={deleteDialogOpen} 
        onOpenChange={setDeleteDialogOpen} 
        onConfirm={handleDeleteConfirm} 
      />
    </div>
  );
};

export default Services;
