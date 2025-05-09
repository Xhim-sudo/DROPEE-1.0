
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '@/config/firebase';
import { Service } from '@/types/ServiceTypes';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      if (!id) {
        setError('Service ID is missing');
        setLoading(false);
        return;
      }

      try {
        const db = getFirestore(app);
        const serviceDoc = await getDoc(doc(db, "services", id));
        
        if (serviceDoc.exists()) {
          const data = serviceDoc.data();
          setService({
            id: serviceDoc.id,
            name: data.name,
            icon: data.icon,
            description: data.description,
            basePrice: data.basePrice
          });
        } else {
          setError('Service not found');
        }
      } catch (err) {
        console.error('Error fetching service details:', err);
        setError('Failed to load service details');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container py-10">
          <div className="space-y-6">
            <Skeleton className="h-12 w-2/3" />
            <Skeleton className="h-80 w-full rounded-lg" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-40 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container py-10">
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Error</h2>
            <p>{error || 'Service not available'}</p>
            <Button 
              onClick={() => navigate('/services')} 
              variant="outline" 
              className="mt-4"
            >
              Back to Services
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-theme-purple-light to-theme-purple-dark text-white py-16 px-4">
          <div className="container mx-auto">
            <Button 
              variant="ghost" 
              className="text-white mb-4 hover:bg-white/10" 
              onClick={() => navigate('/services')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Services
            </Button>
            <div className="flex items-center justify-center md:justify-start">
              <div className="text-5xl mr-4">{service.icon}</div>
              <h1 className="text-3xl md:text-4xl font-bold">{service.name}</h1>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Service Description */}
            <div className="md:col-span-2 space-y-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">About This Service</h2>
                <p className="text-lg">{service.description}</p>
              </div>
              
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mt-8">
                <h3 className="text-xl font-semibold mb-4">Why Choose Our Service?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Fast and reliable delivery across the city</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Secure handling of all items</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Real-time tracking of your delivery</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Professional and courteous delivery personnel</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Service Pricing & Action */}
            <div className="md:col-span-1">
              <div className="bg-white border rounded-lg p-6 sticky top-4">
                <h3 className="text-xl font-bold mb-2">Service Pricing</h3>
                <p className="text-sm text-gray-500 mb-4">Starting from</p>
                <div className="text-3xl font-bold text-theme-purple mb-6">
                  ₹{service.basePrice.toFixed(2)}
                </div>
                
                <Button className="w-full bg-theme-purple hover:bg-theme-purple-dark mb-4">
                  Book This Service
                </Button>
                
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
                
                <div className="mt-6 text-sm text-gray-500">
                  <p>* Additional charges may apply based on distance and other factors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
