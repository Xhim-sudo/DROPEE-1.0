
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  User, 
  LogOut, 
  Settings, 
  ShoppingBag, 
  Heart, 
  ShieldCheck,
  Store
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const UserMenu = () => {
  const { currentUser, userInfo, logout, isAdmin, isVendor } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "There was an issue logging out. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // If not logged in, show login button
  if (!currentUser) {
    return (
      <Link to="/login">
        <Button variant="outline" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Login</span>
        </Button>
      </Link>
    );
  }
  
  // Get user initials for avatar
  const getInitials = () => {
    if (userInfo?.displayName) {
      return userInfo.displayName.charAt(0).toUpperCase();
    }
    if (userInfo?.email) {
      return userInfo.email.charAt(0).toUpperCase();
    }
    return 'U';
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isAdmin && (
            <DropdownMenuItem asChild>
              <Link to="/admin/dashboard" className="flex w-full items-center">
                <ShieldCheck className="mr-2 h-4 w-4" />
                <span>Admin Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}
          
          {isVendor && (
            <DropdownMenuItem asChild>
              <Link to="/vendor/dashboard" className="flex w-full items-center">
                <Store className="mr-2 h-4 w-4" />
                <span>Vendor Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}
          
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex w-full items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link to="/orders" className="flex w-full items-center">
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>Orders</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link to="/wishlist" className="flex w-full items-center">
              <Heart className="mr-2 h-4 w-4" />
              <span>Wishlist</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link to="/settings" className="flex w-full items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
