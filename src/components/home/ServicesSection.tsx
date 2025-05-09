
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getFirestore, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { app } from '@/config/firebase';
import { Service } from '@/types/ServiceTypes';
import ServicesList from '@/components/services/ServicesList';

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

        <ServicesList services={services} loading={loading} />
      </div>
    </section>
  );
};

export default ServicesSection;
