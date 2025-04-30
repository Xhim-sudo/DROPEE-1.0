
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import PageHeader from '@/components/PageHeader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { AlertCircle, CloudRain, CloudSun, Weight, MapPin } from 'lucide-react';
import { calculateDeliveryFee } from '@/utils/deliveryUtils';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    instructions: '',
    deliveryOption: 'vendor',
    paymentMethod: 'cash'
  });
  
  // New states for delivery fee calculation
  const [distance, setDistance] = useState(3); // in km
  const [weight, setWeight] = useState(1); // in kg
  const [weather, setWeather] = useState('normal'); // normal, rainy, extreme
  const [deliveryFees, setDeliveryFees] = useState({
    baseFee: 100,
    distanceFee: 0,
    weightFee: 0,
    weatherFee: 0,
    totalFee: 100
  });
  
  // Calculate delivery fees when factors change
  useEffect(() => {
    const fees = calculateDeliveryFee(distance, weight, weather);
    setDeliveryFees(fees);
  }, [distance, weight, weather]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleWeatherChange = (value: string) => {
    setWeather(value);
  };
  
  const handleNumberChange = (name: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      if (name === 'distance') setDistance(numValue);
      if (name === 'weight') setWeight(numValue);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would send the order to a backend
    toast({
      title: "Order placed successfully!",
      description: "You will receive a WhatsApp message with your order details.",
    });
    
    // Clear the cart and redirect to success page
    clearCart();
    navigate('/order-success');
  };
  
  // Redirect to home if cart is empty
  if (items.length === 0) {
    navigate('/');
    return null;
  }
  
  // Calculate totals
  const subtotal = getSubtotal();
  const deliveryFee = deliveryFees.totalFee;
  const total = subtotal + deliveryFee + (formData.deliveryOption === 'third-party' ? 50 : 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container py-8">
        <PageHeader 
          title="Checkout" 
          description="Complete your order with just a few steps"
        />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="flex-grow">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (optional)</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        placeholder="Enter your full address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="instructions">Delivery Instructions (optional)</Label>
                      <Textarea
                        id="instructions"
                        name="instructions"
                        placeholder="Any special instructions for delivery"
                        value={formData.instructions}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Delivery Details - New section for distance and weight */}
                    <div className="border-t pt-4 mt-2">
                      <h3 className="text-lg font-medium mb-3">Delivery Factors</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <Label htmlFor="distance">Distance (km)</Label>
                          </div>
                          <Input
                            id="distance"
                            type="number"
                            min="0"
                            step="0.1"
                            value={distance}
                            onChange={(e) => handleNumberChange('distance', e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Distance between vendor and delivery address
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Weight className="h-4 w-4" />
                            <Label htmlFor="weight">Package Weight (kg)</Label>
                          </div>
                          <Input
                            id="weight"
                            type="number"
                            min="0"
                            step="0.1"
                            value={weight}
                            onChange={(e) => handleNumberChange('weight', e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Estimated weight of your order
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2">
                          {weather === 'rainy' ? (
                            <CloudRain className="h-4 w-4" />
                          ) : (
                            <CloudSun className="h-4 w-4" />
                          )}
                          <Label>Weather Conditions</Label>
                        </div>
                        <RadioGroup
                          value={weather}
                          onValueChange={handleWeatherChange}
                          className="grid md:grid-cols-3 gap-4 pt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem id="normal-weather" value="normal" />
                            <Label htmlFor="normal-weather" className="font-medium">Normal</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem id="rainy-weather" value="rainy" />
                            <Label htmlFor="rainy-weather" className="font-medium">Rainy</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem id="extreme-weather" value="extreme" />
                            <Label htmlFor="extreme-weather" className="font-medium">Extreme</Label>
                          </div>
                        </RadioGroup>
                        <p className="text-xs text-muted-foreground">
                          Current weather conditions may affect delivery fees
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Delivery & Payment Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Delivery Option</Label>
                    <RadioGroup
                      value={formData.deliveryOption}
                      onValueChange={(value) => handleSelectChange('deliveryOption', value)}
                      className="grid md:grid-cols-2 gap-4 pt-2"
                    >
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem id="vendor-delivery" value="vendor" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="vendor-delivery" className="font-medium">Vendor Delivery</Label>
                          <p className="text-sm text-muted-foreground">
                            The shop will handle the delivery directly to you
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem id="third-party" value="third-party" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="third-party" className="font-medium">Third-Party Delivery</Label>
                          <p className="text-sm text-muted-foreground">
                            We'll assign a courier for faster delivery (+₹50)
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleSelectChange('paymentMethod', value)}
                      className="grid md:grid-cols-2 gap-4 pt-2"
                    >
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem id="cash" value="cash" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="cash" className="font-medium">Cash on Delivery</Label>
                          <p className="text-sm text-muted-foreground">
                            Pay when your order arrives
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem id="online" value="online" disabled />
                        <div className="grid gap-1.5">
                          <Label htmlFor="online" className="font-medium">Online Payment</Label>
                          <p className="text-sm text-muted-foreground">
                            Coming soon
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col">
                <div className="flex items-start gap-2 text-xs text-muted-foreground mt-4 p-3 bg-muted rounded-md w-full">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    By placing your order, you agree to be contacted by the vendor via WhatsApp
                    for order confirmations and delivery updates.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-80">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.quantity}× {item.name}</span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  {/* Delivery Fee Breakdown */}
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Base Delivery Fee</span>
                    <span>₹{deliveryFees.baseFee.toFixed(2)}</span>
                  </div>
                  
                  {deliveryFees.distanceFee > 0 && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Distance Fee ({distance} km)</span>
                      <span>₹{deliveryFees.distanceFee.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {deliveryFees.weightFee > 0 && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Weight Fee ({weight} kg)</span>
                      <span>₹{deliveryFees.weightFee.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {deliveryFees.weatherFee > 0 && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{weather === 'rainy' ? 'Rainy' : 'Extreme'} Weather Fee</span>
                      <span>₹{deliveryFees.weatherFee.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Total Delivery Fee</span>
                    <span>₹{deliveryFees.totalFee.toFixed(2)}</span>
                  </div>
                  
                  {formData.deliveryOption === 'third-party' && (
                    <div className="flex justify-between">
                      <span>Third-Party Delivery</span>
                      <span>₹50.00</span>
                    </div>
                  )}
                  <div className="border-t pt-4 flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4 mt-6">
                  <Button 
                    type="submit"
                    form="checkout-form"
                    className="w-full bg-theme-purple hover:bg-theme-purple-dark"
                  >
                    Place Order
                  </Button>
                  <Link to="/cart">
                    <Button variant="outline" className="w-full">
                      Back to Cart
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
