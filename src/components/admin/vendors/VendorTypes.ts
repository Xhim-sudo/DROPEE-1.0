
export interface Vendor {
  id: number;
  name: string;
  owner: string;
  email: string;
  phone: string;
  products: number;
  status: "active" | "inactive" | "pending"; // Ensure this is strictly typed
  dateJoined: string;
}
