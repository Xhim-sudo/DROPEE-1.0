
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Search, 
  MoreVertical, 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight,
  UserPlus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Schema for vendor form validation
const vendorFormSchema = z.object({
  name: z.string().min(3, { message: "Vendor name must be at least 3 characters." }),
  owner: z.string().min(3, { message: "Owner name must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  status: z.enum(["active", "inactive", "pending"]),
});

type VendorFormValues = z.infer<typeof vendorFormSchema>;

// Mock data for vendors
const mockVendors = [
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
  const [vendors, setVendors] = useState(mockVendors);
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

  const handleStatusChange = (id: number, newStatus: string) => {
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

  const handleEditVendor = (vendor: any) => {
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
    const newVendor = {
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

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-500">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
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

      <div className="flex items-center py-4 bg-white px-4 rounded-lg shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Joined</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell className="font-medium">{vendor.name}</TableCell>
                <TableCell>{vendor.owner}</TableCell>
                <TableCell>
                  <div>{vendor.email}</div>
                  <div className="text-sm text-muted-foreground">{vendor.phone}</div>
                </TableCell>
                <TableCell>{vendor.products}</TableCell>
                <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                <TableCell>{vendor.dateJoined}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditVendor(vendor)}>
                        Edit
                      </DropdownMenuItem>
                      {vendor.status !== 'active' && (
                        <DropdownMenuItem onClick={() => handleStatusChange(vendor.id, 'active')}>
                          <Check className="h-4 w-4 mr-2" /> Activate
                        </DropdownMenuItem>
                      )}
                      {vendor.status !== 'inactive' && (
                        <DropdownMenuItem onClick={() => handleStatusChange(vendor.id, 'inactive')}>
                          <X className="h-4 w-4 mr-2" /> Deactivate
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <Button variant="outline" size="sm">
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Add Vendor Dialog */}
      <Dialog open={isAddVendorOpen} onOpenChange={setIsAddVendorOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Vendor</DialogTitle>
            <DialogDescription>
              Create a new vendor account. They'll receive an email to set up their password.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitAdd)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Store name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="owner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full p-2 border rounded-md" 
                        {...field}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsAddVendorOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Vendor</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Vendor Dialog */}
      <Dialog open={isEditVendorOpen} onOpenChange={setIsEditVendorOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Vendor</DialogTitle>
            <DialogDescription>
              Update the vendor's information.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="owner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full p-2 border rounded-md" 
                        {...field}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsEditVendorOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminVendors;
