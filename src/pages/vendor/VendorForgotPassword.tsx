
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Mail } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const VendorForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, this would connect to authentication service
    console.log('Password reset requested for:', email);
    
    // Show success message
    toast({
      title: "Reset link sent",
      description: "If an account exists with that email, we've sent a password reset link.",
    });
    
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center">
            <ShoppingBag className="h-8 w-8 text-theme-purple" />
            <span className="ml-2 text-2xl font-bold">QuickOrder</span>
          </Link>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Reset Password
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Enter your email to receive a password reset link
          </p>
        </div>

        <div className="mt-8 bg-white shadow-sm rounded-lg p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="mt-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-theme-purple hover:bg-theme-purple/80"
              >
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <Mail className="h-12 w-12 mx-auto text-theme-purple" />
              <h3 className="mt-2 text-xl font-medium text-gray-900">Check your email</h3>
              <p className="mt-1 text-sm text-gray-500">
                We've sent a password reset link to {email}
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="link" 
                className="mt-4 text-theme-purple"
              >
                Try another email
              </Button>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <Link to="/vendor/login" className="text-sm font-medium text-theme-purple hover:text-theme-purple/80">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorForgotPassword;
