
import { Order } from './OrderTypes';

export const initialOrders: Order[] = [
  {
    id: "ORD-1001",
    customer: "John Smith",
    email: "john.smith@example.com",
    date: "2023-05-10",
    total: 142.50,
    status: "Completed",
    paymentStatus: "Paid",
    items: [
      { id: "P001", name: "Organic Apples", quantity: 2, price: 3.99 },
      { id: "P002", name: "Fresh Bread", quantity: 1, price: 2.49 },
      { id: "P005", name: "Premium Coffee", quantity: 1, price: 12.99 }
    ]
  },
  {
    id: "ORD-1002",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    date: "2023-05-11",
    total: 76.20,
    status: "Processing",
    paymentStatus: "Paid",
    items: [
      { id: "P003", name: "Free Range Eggs", quantity: 2, price: 4.99 },
      { id: "P004", name: "Sourdough Bread", quantity: 1, price: 3.99 }
    ]
  },
  {
    id: "ORD-1003",
    customer: "Michael Brown",
    email: "mbrown@example.com",
    date: "2023-05-12",
    total: 35.95,
    status: "Pending",
    paymentStatus: "Pending",
    items: [
      { id: "P001", name: "Organic Apples", quantity: 1, price: 3.99 },
      { id: "P003", name: "Free Range Eggs", quantity: 1, price: 4.99 }
    ]
  },
  {
    id: "ORD-1004",
    customer: "Emily Wilson",
    email: "emily.w@example.com",
    date: "2023-05-13",
    total: 129.75,
    status: "Shipped",
    paymentStatus: "Paid",
    items: [
      { id: "P005", name: "Premium Coffee", quantity: 2, price: 12.99 },
      { id: "P002", name: "Fresh Bread", quantity: 3, price: 2.49 }
    ]
  },
  {
    id: "ORD-1005",
    customer: "David Roberts",
    email: "droberts@example.com",
    date: "2023-05-14",
    total: 58.45,
    status: "Cancelled",
    paymentStatus: "Refunded",
    items: [
      { id: "P004", name: "Sourdough Bread", quantity: 2, price: 3.99 },
      { id: "P001", name: "Organic Apples", quantity: 3, price: 3.99 }
    ]
  }
];
