
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to search results page with query
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="hero-gradient text-white py-12 md:py-20 px-4 rounded-b-3xl">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Quick Order, Quick Delivery
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Get anything delivered to your doorstep from local shops and services
        </p>
        
        <form onSubmit={handleSearch} className="max-w-lg mx-auto relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input
            type="search"
            placeholder="Search for products, shops, or services..."
            className="pl-10 h-12 rounded-full bg-white/90 text-black placeholder-gray-500 border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            type="submit" 
            className="absolute right-1.5 top-1.5 rounded-full"
          >
            Search
          </Button>
        </form>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/shops">
            <Button size="lg" className="bg-white text-theme-purple hover:bg-gray-100">
              Browse Shops
            </Button>
          </Link>
          <Link to="/services">
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
              Explore Services
            </Button>
          </Link>
        </div>
        
        <div className="mt-6 text-white/80 font-medium">
          Order now — No signup required!
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
