
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import ServiceCard from '@/components/ServiceCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getFirestore, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { app } from '@/config/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { Service } from '@/types/ServiceTypes';
import { useToast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus } from 'lucide-react';

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
        <div className="bg-gradient-to-r from-theme-purple-light to-theme-purple-dark text-white py-10 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold mb-4">Special Delivery Services</h1>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              From cash delivery to parcel shipping, we've got you covered with our range of specialized services.
            </p>
            <Button size="lg" className="bg-white text-theme-purple hover:bg-gray-100">
              Learn More
            </Button>
          </div>
        </div>
        
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {loading ? (
              // Loading skeletons
              Array(4).fill(0).map((_, index) => (
                <div key={`skeleton-${index}`} className="flex flex-col space-y-4 p-6 border rounded-lg">
                  <Skeleton className="h-16 w-16 rounded-full mx-auto" />
                  <Skeleton className="h-6 w-4/5 mx-auto" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-8 w-1/2 mx-auto" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))
            ) : services.length > 0 ? (
              services.map(service => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  name={service.name}
                  icon={service.icon}
                  description={service.description}
                  basePrice={service.basePrice}
                  isAdmin={isAdmin}
                  onEdit={handleEditService}
                  onDelete={handleDeletePrompt}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground py-8">
                No services available at the moment.
              </p>
            )}
          </div>
        </div>
        
        {/* Feature Sections */}
        <div className="container py-10">
          {/* Cash Delivery Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">Cash Delivery Service</h2>
              <p className="text-muted-foreground mb-4">
                Need cash but can't make it to an ATM? We'll deliver it to your doorstep! Our secure cash delivery service uses PIN verification for safety.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Secure PIN verification system</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Partnered with trusted banks</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Same-day delivery available</span>
                </li>
              </ul>
              <Link to="/services/1">
                <Button className="bg-theme-purple hover:bg-theme-purple-dark">
                  Get Cash Delivered
                </Button>
              </Link>
            </div>
            <div className="bg-gray-100 rounded-lg p-10 flex items-center justify-center">
              <div className="text-6xl">💰</div>
            </div>
          </div>
          
          {/* Parcel Delivery Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 bg-gray-100 rounded-lg p-10 flex items-center justify-center">
              <div className="text-6xl">📦</div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl font-bold mb-4">Parcel Delivery Service</h2>
              <p className="text-muted-foreground mb-4">
                Send packages across town quickly and reliably. Our weight-based pricing ensures transparency and fair rates.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Base price covers parcels up to 5kg</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Fair surcharge for heavier items</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Real-time delivery tracking</span>
                </li>
              </ul>
              <Link to="/services/2">
                <Button className="bg-theme-purple hover:bg-theme-purple-dark">
                  Send a Parcel
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Pricing Table */}
        <div className="container py-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Service Pricing</h2>
            <p className="text-muted-foreground">
              Transparent pricing for all our delivery services
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="py-3 px-4 text-left">Service</th>
                  <th className="py-3 px-4 text-left">Base Price</th>
                  <th className="py-3 px-4 text-left">Additional Fees</th>
                  <th className="py-3 px-4 text-left">Delivery Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="mr-2">💰</span>
                      <span>Cash Delivery</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">₹150 (PIN) + ₹100 (Delivery)</td>
                  <td className="py-3 px-4">None</td>
                  <td className="py-3 px-4">2-4 hours</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="mr-2">📦</span>
                      <span>Parcel Delivery</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">₹100</td>
                  <td className="py-3 px-4">₹30/kg above 5kg</td>
                  <td className="py-3 px-4">Same day</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="mr-2">🧺</span>
                      <span>Grocery Delivery</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">₹50</td>
                  <td className="py-3 px-4">None</td>
                  <td className="py-3 px-4">1-3 hours</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="mr-2">💊</span>
                      <span>Medicine Delivery</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">₹80</td>
                  <td className="py-3 px-4">None</td>
                  <td className="py-3 px-4">30-90 minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the service and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Services;
