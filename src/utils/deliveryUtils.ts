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
  // Use parameters from current fee parameters
  const params = getCurrentFeeParams();
  
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

// Admin interface for updating fee parameters
export interface DeliveryFeeParams {
  baseRate: number;
  distanceRatePerKm: number;
  freeDistanceThreshold: number;
  weightRatePerKg: number;
  freeWeightThreshold: number;
  rainyWeatherFee: number;
  extremeWeatherFee: number;
}

// Default parameters
export const defaultFeeParams: DeliveryFeeParams = {
  baseRate: 100,
  distanceRatePerKm: 10,
  freeDistanceThreshold: 3,
  weightRatePerKg: 20,
  freeWeightThreshold: 5,
  rainyWeatherFee: 30,
  extremeWeatherFee: 50
};

// Store the current parameters - initially set to default
let currentFeeParams: DeliveryFeeParams = { ...defaultFeeParams };

/**
 * Get the current fee parameters
 * @returns Current delivery fee parameters
 */
export const getCurrentFeeParams = (): DeliveryFeeParams => {
  // In a real app, this might fetch from localStorage, context, or API
  return currentFeeParams;
};

/**
 * Update fee parameters (for admin use)
 * @param newParams - New parameters to update
 * @returns Updated fee parameters
 */
export const updateFeeParams = (newParams: Partial<DeliveryFeeParams>): DeliveryFeeParams => {
  // Update only the provided parameters
  currentFeeParams = {
    ...currentFeeParams,
    ...newParams
  };
  
  // In a real app, this would save to a database or API
  // For now, we're just keeping it in memory
  // localStorage.setItem('deliveryFeeParams', JSON.stringify(currentFeeParams));
  
  return currentFeeParams;
};

/**
 * Reset fee parameters to default values
 * @returns Default fee parameters
 */
export const resetFeeParams = (): DeliveryFeeParams => {
  currentFeeParams = { ...defaultFeeParams };
  // localStorage.removeItem('deliveryFeeParams');
  return currentFeeParams;
};

// On app initialization, we could load saved params from storage
// This function would be called when the app starts
export const initializeFeeParams = (): void => {
  // In a real app with persistence:
  // const savedParams = localStorage.getItem('deliveryFeeParams');
  // if (savedParams) {
  //   try {
  //     currentFeeParams = JSON.parse(savedParams);
  //   } catch (e) {
  //     console.error('Failed to parse saved delivery parameters', e);
  //     currentFeeParams = { ...defaultFeeParams };
  //   }
  // }
};
