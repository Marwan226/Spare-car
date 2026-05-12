export interface Station {
  id: string;
  name: string;
  area: string;
  latitude: number;
  longitude: number;
  phone: string;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface ServiceRequest {
  name: string;
  phone: string;
  carType: string;
  issue: string;
  userLocation: UserLocation;
  stationId: string;
}

export interface StationWithDistance extends Station {
  distance: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
  // أضف هذه الخصائص الجديدة
  brand?: string;
  model?: string;
  year?: number;
  condition?: string;
  color?: string;
}

//* Product Types from API *//
export interface Product {
  _id: string;
  name: string;
  arabicName?: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  carBrand: string;
  carModel: string;
  year?: string;
  partNumber: string;
  stock: number;
  images: string[];
  rating: number;
  reviews: number;
  discount?: number;
  isFeatured?: boolean;
  specifications?: Record<string, any>;
  compatibility?: string[];
  createdAt?: string;
  updatedAt?: string;
}
export interface CartItem extends Product {
  quantity: number;
}
export interface ApiResponse {
  success: boolean;
  products: Product[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}