
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import UserMenu from './UserMenu';

const NavbarActions: React.FC = () => {
  // You can implement cart items count from your cart context
  const cartItemsCount = 0;

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" className="hidden md:flex">
        <Search className="h-5 w-5" />
      </Button>
      <Link to="/cart">
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItemsCount > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-theme-purple"
              variant="default"
            >
              {cartItemsCount}
            </Badge>
          )}
        </Button>
      </Link>
      <UserMenu />
    </div>
  );
};

export default NavbarActions;
