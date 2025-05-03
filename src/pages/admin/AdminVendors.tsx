import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { getFirestore, collection, onSnapshot, doc, updateDoc, addDoc, serverTimestamp, deleteDoc, query, orderBy } from 'firebase/firestore';
import { app } from '@/config/firebase';

import VendorTable from '@/components/admin/vendors/VendorTable';
import SearchVendors from '@/components/admin/vendors/SearchVendors';
import VendorDialog, { vendorFormSchema, VendorFormValues } from '@/components/admin/vendors/VendorDialog';
import { Vendor } from '@/components/admin/vendors/VendorTypes';

const db = getFirestore(app);

const AdminVendors = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);
  const [isEditVendorOpen, setIsEditVendorOpen] = useState(false);
  const [currentVendorId, setCurrentVendorId] = useState<string | number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  // Get vendors from Firebase
  useEffect(() => {
    setIsLoading(true);
    
    const vendorsQuery = query(
      collection(db, "vendorApplications"),
      orderBy("dateApplied", "desc")
    );
    
    const unsubscribe = onSnapshot(vendorsQuery, (snapshot) => {
      const vendorsList: Vendor[] = snapshot.docs.map(doc => {
        const data = doc.data();
        const dateJoined = data.dateApplied ? new Date(data.dateApplied.toDate()).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
        
        return {
          id: doc.id as unknown as number,
          name: data.name || '',
          owner: data.owner || '',
          email: data.email || '',
          phone: data.phone || '',
          products: data.products || 0,
          status: data.status as "active" | "inactive" | "pending",
          dateJoined,
        };
      });
      
      setVendors(vendorsList);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching vendors:", error);
      toast({
        title: "Error",
        description: "Failed to load vendors. Please try again later.",
        variant: "destructive"
      });
      setIsLoading(false);
    });
    
    return () => unsubscribe();
  }, [toast]);

  // Filter vendors based on search term
  const filteredVendors = vendors.filter(
    vendor => 
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      vendor.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const paginatedVendors = filteredVendors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusChange = async (id: string | number, newStatus: "active" | "inactive" | "pending") => {
    try {
      await updateDoc(doc(db, "vendorApplications", id.toString()), {
        status: newStatus
      });
      
      const statusMessages = {
        active: "Vendor has been approved and activated.",
        inactive: "Vendor has been deactivated.",
        pending: "Vendor status has been set to pending."
      };
      
      toast({
        title: "Status updated",
        description: statusMessages[newStatus],
      });
      
    } catch (error) {
      console.error("Error updating vendor status:", error);
      toast({
        title: "Update failed",
        description: "There was an error updating the vendor status.",
        variant: "destructive"
      });
    }
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

  const onSubmitAdd = async (data: VendorFormValues) => {
    try {
      await addDoc(collection(db, "vendorApplications"), {
        name: data.name,
        owner: data.owner,
        email: data.email,
        phone: data.phone,
        products: 0,
        status: data.status,
        dateApplied: serverTimestamp(),
      });
      
      setIsAddVendorOpen(false);
      form.reset();
      
      toast({
        title: "Vendor added",
        description: "New vendor has been successfully added.",
      });
    } catch (error) {
      console.error("Error adding vendor:", error);
      toast({
        title: "Error",
        description: "Failed to add vendor. Please try again.",
        variant: "destructive"
      });
    }
  };

  const onSubmitEdit = async (data: VendorFormValues) => {
    if (currentVendorId) {
      try {
        await updateDoc(doc(db, "vendorApplications", currentVendorId.toString()), {
          name: data.name,
          owner: data.owner,
          email: data.email,
          phone: data.phone,
          status: data.status,
        });
        
        setIsEditVendorOpen(false);
        setCurrentVendorId(null);
        form.reset();
        
        toast({
          title: "Vendor updated",
          description: "Vendor information has been successfully updated.",
        });
      } catch (error) {
        console.error("Error updating vendor:", error);
        toast({
          title: "Update failed",
          description: "There was an error updating the vendor information.",
          variant: "destructive"
        });
      }
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

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-theme-purple"></div>
        </div>
      ) : (
        <VendorTable 
          filteredVendors={paginatedVendors} 
          handleEditVendor={handleEditVendor} 
          handleStatusChange={handleStatusChange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

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
