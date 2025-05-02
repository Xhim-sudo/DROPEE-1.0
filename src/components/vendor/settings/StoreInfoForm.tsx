
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from "@/components/ui/use-toast";

// Define the form schema with Zod
const storeFormSchema = z.object({
  storeName: z.string().min(2, {
    message: "Store name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(6, {
    message: "Please enter a valid phone number.",
  }),
  taxId: z.string().min(3, {
    message: "Please enter a valid tax ID.",
  }),
  address: z.string().min(3, {
    message: "Please enter a valid address.",
  }),
  city: z.string().min(2, {
    message: "Please enter a valid city.",
  }),
  state: z.string().min(2, {
    message: "Please enter a valid state.",
  }),
  zipCode: z.string().min(3, {
    message: "Please enter a valid postal code.",
  }),
  country: z.string().min(2, {
    message: "Please select a country.",
  }),
  description: z.string().optional(),
});

type StoreFormValues = z.infer<typeof storeFormSchema>;

const StoreInfoForm = () => {
  const { toast } = useToast();

  // Default values for the form
  const defaultValues: StoreFormValues = {
    storeName: "Fresh Grocery Market",
    email: "contact@freshgrocery.com",
    phone: "+1 (555) 123-4567",
    taxId: "TAX-123456789",
    address: "123 Market Street",
    city: "San Francisco",
    state: "California",
    zipCode: "94103",
    country: "us",
    description: "Fresh Grocery Market offers locally sourced organic produce, artisanal baked goods, and premium dairy products. Our mission is to provide the freshest ingredients to our community while supporting local farmers."
  };

  // Initialize form with react-hook-form
  const form = useForm<StoreFormValues>({
    resolver: zodResolver(storeFormSchema),
    defaultValues,
  });

  // Form submission handler
  const onSubmit = (data: StoreFormValues) => {
    console.log("Store info submitted:", data);
    toast({
      title: "Store information updated",
      description: "Your store information has been saved successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Information</CardTitle>
        <CardDescription>
          Update your store details and appearance
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Store Details */}
            <div>
              <h3 className="font-medium mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="storeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="taxId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax/Business ID</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Store Address */}
            <div>
              <h3 className="font-medium mb-4">Store Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-theme-purple focus:border-theme-purple"
                        >
                          <option value="us">United States</option>
                          <option value="ca">Canada</option>
                          <option value="uk">United Kingdom</option>
                          <option value="au">Australia</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Store Description */}
            <div>
              <h3 className="font-medium mb-4">About Your Store</h3>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Description</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Store Logo & Banner */}
            <div>
              <h3 className="font-medium mb-4">Store Appearance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="logo">Store Logo</Label>
                  <div className="border border-dashed rounded-md p-4 text-center">
                    <div className="w-32 h-32 bg-gray-100 mx-auto rounded-full flex items-center justify-center">
                      <span className="text-muted-foreground">Logo Preview</span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-4">
                      Upload Logo
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banner">Store Banner</Label>
                  <div className="border border-dashed rounded-md p-4 text-center">
                    <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-muted-foreground">Banner Preview</span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-4">
                      Upload Banner
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-theme-purple hover:bg-theme-purple/80 ml-auto">Save Changes</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default StoreInfoForm;
