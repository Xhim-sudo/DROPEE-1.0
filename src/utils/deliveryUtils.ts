
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
  // Use parameters from defaultFeeParams
  const params = defaultFeeParams;
  
  // Base fee
  const baseFee = params.baseRate;
  
  // Distance fee calculation (rate per km after threshold)
  const distanceFee = distance > params.freeDistanceThreshold 
    ? Math.round((distance - params.freeDistanceThreshold) * params.distanceRatePerKm) 
    : 0;
  
  // Weight fee calculation (rate per kg after threshold)
  const weightFee = weight > params.freeWeightThreshold 
    ? Math.round((weight - params.freeWeightThreshold) * params.weightRatePerKg) 
    : 0;
  
  // Weather fee calculation
  let weatherFee = 0;
  if (weather === 'rainy') {
    weatherFee = params.rainyWeatherFee;
  } else if (weather === 'extreme') {
    weatherFee = params.extremeWeatherFee;
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
