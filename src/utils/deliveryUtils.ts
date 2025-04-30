
interface DeliveryFees {
  baseFee: number;
  distanceFee: number;
  weightFee: number;
  weatherFee: number;
  totalFee: number;
}

/**
 * Calculates delivery fee based on distance, weight, and weather conditions
 * 
 * @param distance - Distance in kilometers
 * @param weight - Weight in kilograms
 * @param weather - Weather condition: 'normal', 'rainy', or 'extreme'
 * @returns DeliveryFees object containing fee breakdown and total
 */
export const calculateDeliveryFee = (
  distance: number,
  weight: number,
  weather: string
): DeliveryFees => {
  // Base fee
  const baseFee = 100;
  
  // Distance fee calculation (₹10 per km after first 3km)
  const distanceFee = distance > 3 ? Math.round((distance - 3) * 10) : 0;
  
  // Weight fee calculation (₹20 per kg after first 5kg)
  const weightFee = weight > 5 ? Math.round((weight - 5) * 20) : 0;
  
  // Weather fee calculation
  let weatherFee = 0;
  if (weather === 'rainy') {
    weatherFee = 30; // Additional ₹30 for rainy weather
  } else if (weather === 'extreme') {
    weatherFee = 50; // Additional ₹50 for extreme weather
  }
  
  // Calculate total fee
  const totalFee = baseFee + distanceFee + weightFee + weatherFee;
  
  return {
    baseFee,
    distanceFee,
    weightFee,
    weatherFee,
    totalFee
  };
};

// Admin interface for updating fee parameters (could be expanded in future)
export interface DeliveryFeeParams {
  baseRate: number;
  distanceRatePerKm: number;
  freeDistanceThreshold: number;
  weightRatePerKg: number;
  freeWeightThreshold: number;
  rainyWeatherFee: number;
  extremeWeatherFee: number;
}

// Default parameters - In a real app, these would be fetched from a database
export const defaultFeeParams: DeliveryFeeParams = {
  baseRate: 100,
  distanceRatePerKm: 10,
  freeDistanceThreshold: 3,
  weightRatePerKg: 20,
  freeWeightThreshold: 5,
  rainyWeatherFee: 30,
  extremeWeatherFee: 50
};
