
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discountedPrice: number | null;
  stock: number;
  status: string;
  hasOffer: boolean;
  offerEnds: string | null;
}
