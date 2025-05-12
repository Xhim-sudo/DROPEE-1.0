
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainNavbar from '@/components/layout/MainNavbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '@/config/firebase';
import { Service } from '@/types/ServiceTypes';

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      if (!id) {
        setError('Service ID is missing');
        setLoading(false);
        return;
      }

      try {
        const db = getFirestore(app);
        const serviceRef = doc(db, 'services', id);
        const serviceSnapshot = await getDoc(serviceRef);

        if (serviceSnapshot.exists()) {
          const serviceData = serviceSnapshot.data();
          setService({
            id: serviceSnapshot.id,
            name: serviceData.name,
            icon: serviceData.icon,
            description: serviceData.description,
            basePrice: serviceData.basePrice
          });
        } else {
          setError('Service not found');
        }
      } catch (err) {
        console.error('Error fetching service:', err);
        setError('Failed to load service details');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  // Features list (normally would be part of the service document)
  const features = [
    'Fast delivery to your doorstep',
    'Real-time tracking of your delivery',
    'Secure handling of all packages',
    'Dedicated customer support',
    'Insurance coverage included'
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <MainNavbar />
      <main className="flex-grow container py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-theme-purple">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link to="/services" className="hover:text-theme-purple">Services</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 font-medium">
            {loading ? 'Loading...' : service?.name || 'Service Details'}
          </span>
        </div>
        
        {/* Back button */}
        <div className="mb-6">
          <Link to="/services">
            <Button variant="outline" size="sm" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
              <div className="md:w-2/3 space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-40" />
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-6 rounded-lg text-center">
            <p className="text-red-500 text-lg">{error}</p>
            <Button 
              variant="default" 
              className="mt-4 bg-theme-purple hover:bg-theme-purple-dark"
              asChild
            >
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        ) : service && (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Service Icon/Image */}
            <div className="md:w-1/3">
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center text-6xl">
                {service.icon}
              </div>
            </div>
            
            {/* Service Details */}
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
              <p className="text-theme-purple text-xl font-semibold mb-4">
                From ₹{service.basePrice.toFixed(2)}
              </p>
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700">{service.description}</p>
              </div>
              
              <h3 className="text-lg font-medium mb-4">Service Features:</h3>
              <ul className="space-y-2 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="bg-theme-purple hover:bg-theme-purple-dark w-full md:w-auto">
                Book This Service
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
