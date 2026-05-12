import { Product } from "./types";

export const categories = [
  "Engine Parts",
  "Body Parts",
  "Electronics",
  "Brakes",
  "Suspension",
  "Transmission",
  "Exhaust",
  "Interior",
];

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Engine Oil Filter",
    description:
      "High-quality oil filter for most car models. Ensures clean oil circulation and engine protection.",
    price: 15.99,
    category: "Engine Parts",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&h=500&fit=crop",
    stock: 50,
    specifications: {
      Compatibility: "Universal",
      Material: "Steel",
      "Thread Size": "3/4-16",
    },
  },
  {
    id: "2",
    name: "Brake Pad Set",
    description:
      "Premium ceramic brake pads for superior stopping power and reduced noise.",
    price: 89.99,
    category: "Brakes",
    image:
      "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=500&h=500&fit=crop",
    stock: 30,
    specifications: {
      Material: "Ceramic",
      Position: "Front",
      Warranty: "2 Years",
    },
  },
  {
    id: "3",
    name: "LED Headlight Bulbs",
    description:
      "Ultra-bright LED headlight bulbs with 6000K color temperature for better visibility.",
    price: 45.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=500&h=500&fit=crop",
    stock: 75,
    specifications: {
      Brightness: "6000 Lumens",
      "Color Temp": "6000K",
      Lifespan: "50,000 hours",
    },
  },
  {
    id: "4",
    name: "Air Filter",
    description:
      "High-flow air filter for improved engine performance and fuel efficiency.",
    price: 24.99,
    category: "Engine Parts",
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&h=500&fit=crop",
    stock: 60,
    specifications: {
      Type: "Reusable",
      Material: "Cotton Gauze",
      "Flow Rate": "High",
    },
  },
  {
    id: "5",
    name: "Shock Absorbers",
    description:
      "Heavy-duty shock absorbers for smooth ride and improved handling.",
    price: 129.99,
    category: "Suspension",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&h=500&fit=crop",
    stock: 20,
    specifications: {
      Type: "Gas-charged",
      Position: "Rear",
      "Load Capacity": "Heavy Duty",
    },
  },
  {
    id: "6",
    name: "Side Mirror",
    description:
      "Replacement side mirror with heated glass and turn signal indicator.",
    price: 79.99,
    category: "Body Parts",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
    stock: 25,
    specifications: {
      Side: "Driver",
      Features: "Heated, Signal",
      Color: "Black",
    },
  },
  {
    id: "7",
    name: "Spark Plugs Set",
    description:
      "Iridium spark plugs for better ignition and fuel economy. Set of 4.",
    price: 34.99,
    category: "Engine Parts",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&h=500&fit=crop",
    stock: 100,
    specifications: {
      Material: "Iridium",
      Gap: '0.044"',
      Quantity: "4 Pack",
    },
  },
  {
    id: "8",
    name: "Car Battery",
    description:
      "12V maintenance-free car battery with 3-year warranty and high cold cranking amps.",
    price: 149.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=500&h=500&fit=crop",
    stock: 15,
    specifications: {
      Voltage: "12V",
      CCA: "650A",
      Warranty: "3 Years",
    },
  },
];
