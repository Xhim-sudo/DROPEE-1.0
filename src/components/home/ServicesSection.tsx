
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard';
import { Link } from 'react-router-dom';
import { getFirestore, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { app } from '@/config/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { Service } from '@/types/ServiceTypes';

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Our Services</h2>
          <Link to="/services">
            <Button variant="link" className="text-theme-purple">
              View All
            </Button>
          </Link>
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
              />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground py-8">
              No services available at the moment.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
