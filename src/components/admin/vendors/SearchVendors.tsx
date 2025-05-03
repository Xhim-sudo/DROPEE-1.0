
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchVendorsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchVendors: React.FC<SearchVendorsProps> = ({ searchTerm, setSearchTerm }) => {
  return (
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
  );
};

export default SearchVendors;
