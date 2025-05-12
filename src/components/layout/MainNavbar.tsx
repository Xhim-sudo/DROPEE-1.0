
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Menu, X } from 'lucide-react';
import NavbarActions from './NavbarActions';

const MainNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { title: 'Home', href: '/' },
    { title: 'Categories', href: '/categories' },
    { title: 'Shops', href: '/shops' },
    { title: 'Services', href: '/services' }
  ];

  return (
    <header className="border-b sticky top-0 z-50 w-full bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <ShoppingBag className="h-6 w-6 text-theme-purple" />
            <span className="ml-2 text-xl font-bold">QuickOrder</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link to={item.href}>
                    <NavigationMenuLink 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive(item.href) && "bg-accent font-medium"
                      )}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Actions (search, cart, user) */}
        <div className="hidden md:block">
          <NavbarActions />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  isActive(item.href) 
                    ? "bg-gray-100 text-theme-purple" 
                    : "text-gray-700 hover:bg-gray-50 hover:text-theme-purple"
                )}
              >
                {item.title}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200 mt-4 flex justify-center">
              <NavbarActions />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainNavbar;
