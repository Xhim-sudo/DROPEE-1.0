
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
  Search, 
  MoreVertical, 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  const [searchTerm, setSearchTerm] = useState('');
  const [vendors, setVendors] = useState(mockVendors);

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
        <Button>Add New Vendor</Button>
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
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
    </div>
  );
};

export default AdminVendors;
