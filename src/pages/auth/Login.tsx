
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, ShieldCheck, Store } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'user' | 'vendor' | 'admin'>('user');
  
  const { login, userInfo } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (userInfo) {
      const from = location.state?.from?.pathname || getRedirectPath(userInfo.role);
      navigate(from, { replace: true });
    }
  }, [userInfo, navigate, location]);
  
  const getRedirectPath = (role: string) => {
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'vendor':
        return '/vendor/dashboard';
      default:
        return '/';
    }
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      // Redirect will happen via useEffect when userInfo updates
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
            Login
          </h1>
        </div>

        <div className="mt-8 bg-white shadow-sm rounded-lg">
          <Tabs defaultValue="user" onValueChange={(value) => setUserType(value as any)}>
            <div className="flex justify-center border-b">
              <TabsList className="my-4">
                <TabsTrigger value="user" className="flex items-center space-x-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Customer</span>
                </TabsTrigger>
                <TabsTrigger value="vendor" className="flex items-center space-x-2">
                  <Store className="h-4 w-4" />
                  <span>Vendor</span>
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Admin</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-theme-purple hover:text-theme-purple/80">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-theme-purple focus:ring-theme-purple border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                
                <div>
                  <Button 
                    type="submit"
                    className="w-full bg-theme-purple hover:bg-theme-purple-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
              </form>
              
              <div className="mt-4 text-center text-sm text-gray-600">
                {userType === 'user' && (
                  <p>Don't have an account? <Link to="/register" className="font-medium text-theme-purple hover:text-theme-purple/80">Sign up</Link></p>
                )}
                {userType === 'vendor' && (
                  <p>Want to become a vendor? <Link to="/vendor/signup" className="font-medium text-theme-purple hover:text-theme-purple/80">Apply now</Link></p>
                )}
              </div>
              
              <div className="mt-6 text-center text-xs text-gray-400">
                <p>Demo credentials:</p>
                <TabsContent value="user">
                  <p>user@example.com / password</p>
                </TabsContent>
                <TabsContent value="vendor">
                  <p>vendor@example.com / password</p>
                </TabsContent>
                <TabsContent value="admin">
                  <p>admin@example.com / password</p>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
