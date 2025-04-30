
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MapPin, Weight, CloudRain, CloudSun } from 'lucide-react';

interface DeliveryFactorsProps {
  distance: number;
  weight: number;
  weather: string;
  onDistanceChange: (value: string) => void;
  onWeightChange: (value: string) => void;
  onWeatherChange: (value: string) => void;
}

const DeliveryFactors: React.FC<DeliveryFactorsProps> = ({
  distance,
  weight,
  weather,
  onDistanceChange,
  onWeightChange,
  onWeatherChange
}) => {
  return (
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
            onChange={(e) => onDistanceChange(e.target.value)}
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
            onChange={(e) => onWeightChange(e.target.value)}
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
          onValueChange={onWeatherChange}
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
  );
};

export default DeliveryFactors;
