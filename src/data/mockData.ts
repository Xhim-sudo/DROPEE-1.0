
// Mock data for the application

// Categories
export const categories = [
  {
    id: '1',
    name: 'Food',
    icon: '🍔',
    subcategories: ['Pizza', 'Burgers', 'Desserts'],
  },
  {
    id: '2',
    name: 'Grocery',
    icon: '🧺',
    subcategories: ['Fresh Produce', 'Bakery', 'Dairy'],
  },
  {
    id: '3',
    name: 'Electronics',
    icon: '📱',
    subcategories: ['Phones', 'Laptops', 'Accessories'],
  },
  {
    id: '4',
    name: 'Fashion',
    icon: '👕',
    subcategories: ['Men', 'Women', 'Kids'],
  },
  {
    id: '5',
    name: 'Home & Kitchen',
    icon: '🏠',
    subcategories: ['Furniture', 'Appliances', 'Decor'],
  },
  {
    id: '6',
    name: 'Beauty',
    icon: '💄',
    subcategories: ['Skincare', 'Makeup', 'Haircare'],
  }
];

// Vendors
export const vendors = [
  {
    id: '1',
    name: "Maria's Bakery",
    logo: "/placeholder.svg",
    description: "Freshly baked goods, cakes, and pastries.",
    rating: 4.8,
    deliveryRadius: "5 km",
    whatsapp: "+1234567890",
    categoryId: '1',
    featured: true,
    location: "Downtown"
  },
  {
    id: '2',
    name: "Joe's Burger Shop",
    logo: "/placeholder.svg",
    description: "Juicy burgers and crispy fries made with love.",
    rating: 4.5,
    deliveryRadius: "3 km",
    whatsapp: "+0987654321",
    categoryId: '1',
    featured: true,
    location: "Midtown"
  },
  {
    id: '3',
    name: "Fresh Mart",
    logo: "/placeholder.svg",
    description: "Premium groceries and organic produce.",
    rating: 4.6,
    deliveryRadius: "7 km",
    whatsapp: "+1122334455",
    categoryId: '2',
    featured: false,
    location: "Uptown"
  },
  {
    id: '4',
    name: "TechZone",
    logo: "/placeholder.svg",
    description: "Latest gadgets and electronics accessories.",
    rating: 4.3,
    deliveryRadius: "10 km",
    whatsapp: "+5566778899",
    categoryId: '3',
    featured: false,
    location: "Tech Hub"
  },
  {
    id: '5',
    name: "Fashion Forward",
    logo: "/placeholder.svg",
    description: "Trendy clothing and accessories for everyone.",
    rating: 4.7,
    deliveryRadius: "5 km",
    whatsapp: "+9988776655",
    categoryId: '4',
    featured: true,
    location: "Mall Area"
  },
];

// Products
export const products = [
  // Maria's Bakery Products
  {
    id: '101',
    vendorId: '1',
    name: "Chocolate Cake",
    image: "/placeholder.svg",
    price: 25.99,
    description: "Rich chocolate cake with ganache topping.",
    trending: true,
    categoryId: '1',
  },
  {
    id: '102',
    vendorId: '1',
    name: "Sourdough Bread",
    image: "/placeholder.svg",
    price: 5.99,
    description: "Freshly baked sourdough bread.",
    trending: false,
    categoryId: '1',
  },
  {
    id: '103',
    vendorId: '1',
    name: "Croissant",
    image: "/placeholder.svg",
    price: 3.49,
    description: "Buttery and flaky croissants.",
    trending: false,
    categoryId: '1',
  },
  
  // Joe's Burger Shop Products
  {
    id: '201',
    vendorId: '2',
    name: "Classic Cheeseburger",
    image: "/placeholder.svg",
    price: 9.99,
    description: "Beef patty with cheese, lettuce, and special sauce.",
    trending: true,
    categoryId: '1',
  },
  {
    id: '202',
    vendorId: '2',
    name: "Loaded Fries",
    image: "/placeholder.svg",
    price: 6.49,
    description: "Crispy fries topped with cheese and bacon.",
    trending: true,
    categoryId: '1',
  },
  {
    id: '203',
    vendorId: '2',
    name: "Milkshake",
    image: "/placeholder.svg",
    price: 4.99,
    description: "Creamy vanilla milkshake.",
    trending: false,
    categoryId: '1',
  },
  
  // Fresh Mart Products
  {
    id: '301',
    vendorId: '3',
    name: "Organic Apples",
    image: "/placeholder.svg",
    price: 3.99,
    description: "Fresh organic apples, 1lb pack.",
    trending: false,
    categoryId: '2',
  },
  {
    id: '302',
    vendorId: '3',
    name: "Whole Milk",
    image: "/placeholder.svg",
    price: 2.49,
    description: "Farm fresh whole milk, 1 gallon.",
    trending: false,
    categoryId: '2',
  },
  
  // TechZone Products
  {
    id: '401',
    vendorId: '4',
    name: "Phone Charger",
    image: "/placeholder.svg",
    price: 12.99,
    description: "Fast charging USB-C cable and adapter.",
    trending: true,
    categoryId: '3',
  },
  {
    id: '402',
    vendorId: '4',
    name: "Wireless Earbuds",
    image: "/placeholder.svg",
    price: 49.99,
    description: "Bluetooth wireless earbuds with charging case.",
    trending: true,
    categoryId: '3',
  },
  
  // Fashion Forward Products
  {
    id: '501',
    vendorId: '5',
    name: "Casual T-shirt",
    image: "/placeholder.svg",
    price: 19.99,
    description: "Cotton casual t-shirt, available in multiple colors.",
    trending: false,
    categoryId: '4',
  },
  {
    id: '502',
    vendorId: '5',
    name: "Denim Jeans",
    image: "/placeholder.svg",
    price: 39.99,
    description: "Classic fit denim jeans.",
    trending: true,
    categoryId: '4',
  },
];

// Blog posts
export const blogPosts = [
  {
    id: '1',
    title: "New Vendor Alert: Fresh Bakery in Town!",
    excerpt: "We're excited to welcome Maria's Bakery to our platform. Check out their amazing pastries!",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nunc nunc vitae nunc.",
    date: "2025-04-25",
    image: "/placeholder.svg",
    author: "Admin",
  },
  {
    id: '2',
    title: "Introducing Cash Delivery Service",
    excerpt: "Need cash but can't make it to an ATM? We'll deliver it to your doorstep!",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nunc nunc vitae nunc.",
    date: "2025-04-20",
    image: "/placeholder.svg",
    author: "Admin",
  },
  {
    id: '3',
    title: "Weight-Based Surcharge for Heavy Parcels",
    excerpt: "Understanding our new pricing model for packages over 5kg.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nunc nunc vitae nunc.",
    date: "2025-04-15",
    image: "/placeholder.svg",
    author: "Admin",
  },
];

// Upcoming product pre-orders
export const upcomingProducts = [
  {
    id: '1',
    name: "Limited Edition Chocolate Collection",
    vendorName: "Maria's Bakery",
    image: "/placeholder.svg",
    description: "Pre-order our special chocolate collection for the holidays.",
    releaseDate: "2025-05-15",
  },
  {
    id: '2',
    name: "Summer BBQ Grill Box",
    vendorName: "Joe's Burger Shop",
    image: "/placeholder.svg",
    description: "Everything you need for the perfect backyard BBQ.",
    releaseDate: "2025-05-20",
  },
];

// Services
export const services = [
  {
    id: '1',
    name: "Cash Delivery",
    icon: "💰",
    description: "Get cash delivered to your doorstep",
    basePrice: 150, // PIN generation fee
    deliveryFee: 100,
  },
  {
    id: '2',
    name: "Parcel Delivery",
    icon: "📦",
    description: "Send parcels anywhere in the city",
    basePrice: 100,
    weightSurcharge: 30, // per kg over 5kg
  },
  {
    id: '3',
    name: "Grocery Delivery",
    icon: "🧺",
    description: "Get groceries delivered from your favorite stores",
    basePrice: 50,
  },
  {
    id: '4',
    name: "Medicine Delivery",
    icon: "💊",
    description: "Emergency medicine delivery service",
    basePrice: 80,
  },
];
