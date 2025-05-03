import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";

import VendorTable from '@/components/admin/vendors/VendorTable';
import SearchVendors from '@/components/admin/vendors/SearchVendors';
import VendorDialog, { vendorFormSchema, VendorFormValues } from '@/components/admin/vendors/VendorDialog';
import { Vendor } from '@/components/admin/vendors/VendorTypes';

// Mock data for vendors with properly typed status values
const mockVendors: Vendor[] = [
  { 
    id: 1, 
    name: 'Organic Farms', 
    owner: 'Robert Johnson', 
    email: 'robert@organicfarms.com',
    phone: '(555) 123-4567',
    products: 45,
    status: 'active',
    dateJoined: '2023-05-12'
  },
  { 
    id: 2, 
    name: 'Tech Haven', 
    owner: 'Maria Garcia', 
    email: 'maria@techhaven.com',
    phone: '(555) 234-5678',
    products: 78,
    status: 'active',
    dateJoined: '2023-06-24'
  },
  { 
    id: 3, 
    name: 'Fashion Forward', 
    owner: 'James Wilson', 
    email: 'james@fashionforward.com',
    phone: '(555) 345-6789',
    products: 112,
    status: 'active',
    dateJoined: '2023-04-18'
  },
  { 
    id: 4, 
    name: 'Home Essentials', 
    owner: 'Sarah Brown', 
    email: 'sarah@homeessentials.com',
    phone: '(555) 456-7890',
    products: 63,
    status: 'inactive',
    dateJoined: '2023-07-30'
  },
  { 
    id: 5, 
    name: 'Craft Corner', 
    owner: 'Daniel Lee', 
    email: 'daniel@craftcorner.com',
    phone: '(555) 567-8901',
    products: 29,
    status: 'pending',
    dateJoined: '2023-09-05'
  }
];

const AdminVendors = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);
  const [isEditVendorOpen, setIsEditVendorOpen] = useState(false);
  const [currentVendorId, setCurrentVendorId] = useState<number | null>(null);

  // Initialize form for adding/editing vendors
  const form = useForm<VendorFormValues>({
    resolver: zodResolver(vendorFormSchema),
    defaultValues: {
      name: '',
      owner: '',
      email: '',
      phone: '',
      status: 'pending',
    },
  });

  // Filter vendors based on search term
  const filteredVendors = vendors.filter(
    vendor => 
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      vendor.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id: number, newStatus: "active" | "inactive" | "pending") => {
    setVendors(vendors.map(vendor => 
      vendor.id === id ? {...vendor, status: newStatus} : vendor
    ));
    
    toast({
      title: "Status updated",
      description: `Vendor status has been changed to ${newStatus}.`,
    });
  };

  const handleAddVendorOpen = () => {
    form.reset();
    setIsAddVendorOpen(true);
  };

  const handleEditVendor = (vendor: Vendor) => {
    setCurrentVendorId(vendor.id);
    form.reset({
      name: vendor.name,
      owner: vendor.owner,
      email: vendor.email,
      phone: vendor.phone,
      status: vendor.status,
    });
    setIsEditVendorOpen(true);
  };

  const onSubmitAdd = (data: VendorFormValues) => {
    // Create a new vendor with the form data
    const newVendor: Vendor = {
      id: Date.now(), // Generate a unique ID
      name: data.name,
      owner: data.owner,
      email: data.email,
      phone: data.phone,
      products: 0,
      status: data.status,
      dateJoined: new Date().toISOString().split('T')[0],
    };

    setVendors([...vendors, newVendor]);
    setIsAddVendorOpen(false);
    form.reset();
    
    toast({
      title: "Vendor added",
      description: "New vendor has been successfully added.",
    });
  };

  const onSubmitEdit = (data: VendorFormValues) => {
    if (currentVendorId) {
      setVendors(vendors.map(vendor => 
        vendor.id === currentVendorId ? {
          ...vendor,
          name: data.name,
          owner: data.owner,
          email: data.email,
          phone: data.phone,
          status: data.status,
        } : vendor
      ));
      
      setIsEditVendorOpen(false);
      setCurrentVendorId(null);
      form.reset();
      
      toast({
        title: "Vendor updated",
        description: "Vendor information has been successfully updated.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendors</h1>
          <p className="text-muted-foreground">
            Manage vendor accounts and applications
          </p>
        </div>
        <Button onClick={handleAddVendorOpen}>
          <UserPlus className="mr-2 h-4 w-4" /> Add New Vendor
        </Button>
      </div>

      <SearchVendors searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <VendorTable 
        filteredVendors={filteredVendors} 
        handleEditVendor={handleEditVendor} 
        handleStatusChange={handleStatusChange} 
      />

      {/* Add Vendor Dialog */}
      <VendorDialog 
        isOpen={isAddVendorOpen}
        onOpenChange={setIsAddVendorOpen}
        form={form}
        onSubmit={onSubmitAdd}
        isEdit={false}
      />

      {/* Edit Vendor Dialog */}
      <VendorDialog 
        isOpen={isEditVendorOpen}
        onOpenChange={setIsEditVendorOpen}
        form={form}
        onSubmit={onSubmitEdit}
        isEdit={true}
      />
    </div>
  );
};

export default AdminVendors;
