# Frontend-Backend Integration Guide

This guide explains how to connect the React frontend (`/workspace/shadcn-ui`) with the Node.js backend (`/workspace/sparecar-backend`).

## Quick Start

### 1. Start the Backend

```bash
cd /workspace/sparecar-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start MongoDB (make sure it's running)
# Then seed the database
npm run seed

# Start the backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### 2. Update Frontend Configuration

Create an API configuration file in the frontend:

**File: `/workspace/shadcn-ui/src/lib/api.ts`**

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// API request helper
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  
  register: (name: string, email: string, password: string) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),
  
  getMe: () => apiRequest('/auth/me'),
};

// Products API
export const productsAPI = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return apiRequest(`/products${query}`);
  },
  
  getById: (id: string) => apiRequest(`/products/${id}`),
  
  create: (productData: any) =>
    apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    }),
  
  update: (id: string, productData: any) =>
    apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    }),
  
  delete: (id: string) =>
    apiRequest(`/products/${id}`, {
      method: 'DELETE',
    }),
};

// Orders API
export const ordersAPI = {
  create: (orderData: any) =>
    apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
  
  getMyOrders: () => apiRequest('/orders/myorders'),
  
  getById: (id: string) => apiRequest(`/orders/${id}`),
};
```

### 3. Update AuthContext to Use Real API

**File: `/workspace/shadcn-ui/src/context/AuthContext.tsx`**

Replace the mock authentication with real API calls:

```typescript
import { authAPI } from '@/lib/api';

const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await authAPI.login(email, password);
    const { token, user } = response;
    
    localStorage.setItem('token', token);
    setUser(user);
    toast.success('Welcome back!');
    return true;
  } catch (error: any) {
    toast.error(error.message || 'Invalid credentials');
    return false;
  }
};

const register = async (email: string, password: string, name: string): Promise<boolean> => {
  try {
    const response = await authAPI.register(name, email, password);
    const { token, user } = response;
    
    localStorage.setItem('token', token);
    setUser(user);
    toast.success('Account created successfully!');
    return true;
  } catch (error: any) {
    toast.error(error.message || 'Registration failed');
    return false;
  }
};
```

### 4. Update Product Pages to Fetch from API

**File: `/workspace/shadcn-ui/src/pages/Products.tsx`**

```typescript
import { useEffect, useState } from 'react';
import { productsAPI } from '@/lib/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getAll();
        setProducts(response.products);
      } catch (error) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Rest of component...
}
```

### 5. Update Order Creation

**File: `/workspace/shadcn-ui/src/pages/Checkout.tsx`**

```typescript
import { ordersAPI } from '@/lib/api';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsProcessing(true);

  try {
    const orderData = {
      orderItems: cartItems.map(item => ({
        product: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.image
      })),
      shippingAddress: shippingInfo,
      paymentMethod: 'Card',
      itemsPrice: subtotal,
      shippingPrice: shipping,
      taxPrice: 0,
      totalPrice: total
    };

    await ordersAPI.create(orderData);
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/profile');
  } catch (error: any) {
    toast.error(error.message || 'Failed to create order');
  } finally {
    setIsProcessing(false);
  }
};
```

### 6. Environment Variables

Create `.env` file in frontend:

**File: `/workspace/shadcn-ui/.env`**

```env
VITE_API_URL=http://localhost:5000/api
```

## Testing the Integration

1. **Start Backend:**
```bash
cd /workspace/sparecar-backend
npm run dev
```

2. **Start Frontend:**
```bash
cd /workspace/shadcn-ui
pnpm run dev
```

3. **Test Flow:**
   - Register a new account or login with demo credentials
   - Browse products (fetched from MongoDB)
   - Add items to cart
   - Complete checkout (creates order in database)
   - View order history in profile

## Demo Credentials

**Admin:**
- Email: admin@sparecar.com
- Password: admin123

**Customer:**
- Email: user@sparecar.com
- Password: user123

## API Endpoints Reference

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get single product
- POST `/api/products` - Create product (Admin)
- PUT `/api/products/:id` - Update product (Admin)
- DELETE `/api/products/:id` - Delete product (Admin)

### Orders
- POST `/api/orders` - Create order
- GET `/api/orders/myorders` - Get user orders
- GET `/api/orders/:id` - Get order by ID
- GET `/api/orders` - Get all orders (Admin)

## Common Issues

### CORS Errors
Make sure backend `.env` has correct `FRONTEND_URL`:
```env
FRONTEND_URL=http://localhost:5173
```

### MongoDB Connection
Ensure MongoDB is running:
```bash
# Check MongoDB status
brew services list | grep mongodb  # macOS
sudo systemctl status mongod       # Linux
```

### Token Issues
Clear localStorage if authentication fails:
```javascript
localStorage.clear();
```

## Production Deployment

### Backend (Node.js)
- Deploy to Heroku, Railway, or DigitalOcean
- Use MongoDB Atlas for database
- Set environment variables
- Enable HTTPS

### Frontend (React)
- Build: `pnpm run build`
- Deploy to Vercel, Netlify, or AWS S3
- Update `VITE_API_URL` to production backend URL

## Next Steps

1. Implement real payment gateway (Stripe/PayPal)
2. Add email notifications
3. Implement file upload for product images
4. Add product reviews and ratings
5. Implement advanced search with Elasticsearch
6. Add real-time order tracking
7. Implement admin analytics dashboard

## Support

For issues or questions:
- Check backend logs: `npm run dev` output
- Check frontend console: Browser DevTools
- Verify MongoDB is running
- Check network requests in browser DevTools