
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Home, Search, X, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo section */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl text-theme-purple">QuickOrder</span>
          </Link>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 mx-4">
          <div className="relative w-full max-w-md mx-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products, shops..."
              className="w-full pl-8 rounded-full bg-muted"
            />
          </div>
        </div>

        {/* Mobile Search Toggle */}
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
          </Button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/categories">
            <Button variant="ghost">Categories</Button>
          </Link>
          <Link to="/shops">
            <Button variant="ghost">Shops</Button>
          </Link>
          <Link to="/services">
            <Button variant="ghost">Services</Button>
          </Link>
          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart size={20} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-theme-purple text-white text-xs flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <Link to="/cart" className="mr-2">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart size={20} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-theme-purple text-white text-xs flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden px-4 py-2 border-b">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products, shops..."
              className="w-full pl-8 rounded-full bg-muted"
            />
          </div>
        </div>
      )}
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-14 bg-background z-40 animate-slide-in">
          <div className="flex flex-col p-4 space-y-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                <Home size={20} className="mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/categories" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2">🗂️</span>
                Categories
              </Button>
            </Link>
            <Link to="/shops" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2">🏪</span>
                Shops
              </Button>
            </Link>
            <Link to="/services" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2">🚚</span>
                Services
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
