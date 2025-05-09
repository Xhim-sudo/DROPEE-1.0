
import React from 'react';
import ServiceCard from '@/components/ServiceCard';
import { Service } from '@/types/ServiceTypes';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ServicesListProps {
  services: Service[];
  loading: boolean;
  isAdmin?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const ServicesList: React.FC<ServicesListProps> = ({
  services,
  loading,
  isAdmin = false,
  onEdit,
  onDelete,
  searchQuery = '',
  onSearchChange
}) => {
  return (
    <div>
      {onSearchChange && (
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      )}
      
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
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground py-8">
            {searchQuery ? "No services match your search." : "No services available at the moment."}
          </p>
        )}
      </div>
    </div>
  );
};

export default ServicesList;
