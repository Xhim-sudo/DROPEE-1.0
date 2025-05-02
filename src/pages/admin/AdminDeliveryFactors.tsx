
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  defaultFeeParams, 
  DeliveryFeeParams, 
  getCurrentFeeParams, 
  updateFeeParams,
  resetFeeParams
} from '@/utils/deliveryUtils';
import { useToast } from "@/components/ui/use-toast";

const AdminDeliveryFactors = () => {
  const { toast } = useToast();
  const [feeParams, setFeeParams] = useState<DeliveryFeeParams>(getCurrentFeeParams());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFeeParams(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFeeParams(feeParams);
    toast({
      title: "Settings Updated",
      description: "Delivery factor settings have been successfully updated.",
    });
  };

  const handleReset = () => {
    const defaults = resetFeeParams();
    setFeeParams(defaults);
    toast({
      title: "Settings Reset",
      description: "Delivery factor settings have been reset to default values.",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Delivery Factors</h1>
      <p className="text-muted-foreground">
        Configure and manage delivery fee calculation parameters
      </p>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Fee Parameters</CardTitle>
            <CardDescription>
              These parameters determine how delivery fees are calculated across the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="baseRate">Base Rate (₹)</Label>
                  <Input
                    id="baseRate"
                    name="baseRate"
                    type="number"
                    value={feeParams.baseRate}
                    onChange={handleChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    The starting fee for all deliveries
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="distanceRatePerKm">Rate per KM (₹)</Label>
                  <Input
                    id="distanceRatePerKm"
                    name="distanceRatePerKm"
                    type="number"
                    value={feeParams.distanceRatePerKm}
                    onChange={handleChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Additional fee per kilometer beyond threshold
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="freeDistanceThreshold">Distance Threshold (KM)</Label>
                  <Input
                    id="freeDistanceThreshold"
                    name="freeDistanceThreshold"
                    type="number"
                    value={feeParams.freeDistanceThreshold}
                    onChange={handleChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Distance included in base rate before additional fees apply
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weightRatePerKg">Rate per KG (₹)</Label>
                  <Input
                    id="weightRatePerKg"
                    name="weightRatePerKg"
                    type="number"
                    value={feeParams.weightRatePerKg}
                    onChange={handleChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Additional fee per kilogram beyond threshold
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="freeWeightThreshold">Weight Threshold (KG)</Label>
                  <Input
                    id="freeWeightThreshold"
                    name="freeWeightThreshold"
                    type="number"
                    value={feeParams.freeWeightThreshold}
                    onChange={handleChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Weight included in base rate before additional fees apply
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rainyWeatherFee">Rainy Weather Fee (₹)</Label>
                  <Input
                    id="rainyWeatherFee"
                    name="rainyWeatherFee"
                    type="number"
                    value={feeParams.rainyWeatherFee}
                    onChange={handleChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Additional fee for deliveries during rainy weather
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="extremeWeatherFee">Extreme Weather Fee (₹)</Label>
                  <Input
                    id="extremeWeatherFee"
                    name="extremeWeatherFee"
                    type="number"
                    value={feeParams.extremeWeatherFee}
                    onChange={handleChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Additional fee for deliveries during extreme weather conditions
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={handleReset}>
                  Reset to Defaults
                </Button>
                <Button type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDeliveryFactors;
