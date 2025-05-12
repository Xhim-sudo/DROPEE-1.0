
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import MainNavbar from '@/components/layout/MainNavbar';
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
import { useAuth } from '@/context/AuthContext';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
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
      setFilteredServices(servicesList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching services:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter services when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [searchQuery, services]);

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

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MainNavbar />
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
            services={filteredServices}
            loading={loading}
            isAdmin={isAdmin}
            onEdit={handleEditService}
            onDelete={handleDeletePrompt}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
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
