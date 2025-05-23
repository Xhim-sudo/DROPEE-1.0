
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Check, X, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { Vendor } from './VendorTypes';

interface VendorTableProps {
  filteredVendors: Vendor[];
  handleEditVendor: (vendor: Vendor) => void;
  handleStatusChange: (id: string | number, status: "active" | "inactive" | "pending") => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const VendorTable: React.FC<VendorTableProps> = ({
  filteredVendors,
  handleEditVendor,
  handleStatusChange,
  currentPage,
  totalPages,
  onPageChange
}) => {
  const getStatusBadge = (status: "active" | "inactive" | "pending") => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-500">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Pending
        </Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
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
          {filteredVendors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                No vendors found
              </TableCell>
            </TableRow>
          ) : (
            filteredVendors.map((vendor) => (
              <TableRow 
                key={vendor.id.toString()} 
                className={vendor.status === 'pending' ? 'bg-yellow-50' : ''}
              >
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
                      
                      {vendor.status === 'pending' && (
                        <DropdownMenuItem onClick={() => handleStatusChange(vendor.id, 'active')}>
                          <Check className="h-4 w-4 mr-2 text-green-500" /> Approve Application
                        </DropdownMenuItem>
                      )}
                      
                      {vendor.status !== 'active' && vendor.status !== 'pending' && (
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
            ))
          )}
        </TableBody>
      </Table>
      
      <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default VendorTable;
