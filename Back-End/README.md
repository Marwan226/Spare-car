# SpareCar Backend API

Backend REST API for SpareCar e-commerce platform built with Node.js, Express, and MongoDB.

## Features

- ✅ User authentication with JWT
- ✅ Role-based access control (Customer/Admin)
- ✅ Product management (CRUD operations)
- ✅ Order processing and management
- ✅ User profile management
- ✅ Search and filter products
- ✅ Stock management
- ✅ RESTful API design

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: CORS enabled

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment variables:**
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27018
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

3. **Start MongoDB:**
Make sure MongoDB is running on your system:
```bash
# For macOS with Homebrew
brew services start mongodb-community

# For Linux
sudo systemctl start mongod

# For Windows
net start MongoDB
```

4. **Seed the database (optional):**
```bash
npm run seed
```

This will create:
- Admin user: admin@sparecar.com / admin123
- Customer user: user@sparecar.com / user123
- 8 sample products

5. **Start the server:**
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)
- `PUT /api/auth/password` - Update password (Protected)

### Products
- `GET /api/products` - Get all products (Public)
- `GET /api/products/:id` - Get single product (Public)
- `GET /api/products/category/:category` - Get products by category (Public)
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders/myorders` - Get user's orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)
- `DELETE /api/orders/:id` - Delete order (Admin only)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

## API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Database Models

### User
- name, email, password
- role (customer/admin)
- phone, address
- timestamps

### Product
- name, description, price
- category, image, stock
- specifications (key-value pairs)
- ratings, isActive
- timestamps

### Order
- user, orderItems
- shippingAddress
- paymentMethod, paymentResult
- prices (items, shipping, tax, total)
- status (pending/processing/shipped/delivered/cancelled)
- timestamps

## Project Structure

```
sparecar-backend/
├── controllers/        # Request handlers
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   └── userController.js
├── models/            # Database models
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── routes/            # API routes
│   ├── auth.js
│   ├── products.js
│   ├── orders.js
│   └── users.js
├── middleware/        # Custom middleware
│   └── auth.js
├── scripts/           # Utility scripts
│   └── seedData.js
├── .env.example       # Environment variables template
├── .gitignore
├── server.js          # Application entry point
├── package.json
└── README.md
```

## Demo Credentials

After running `npm run seed`:

**Admin Account:**
- Email: admin@sparecar.com
- Password: admin123

**Customer Account:**
- Email: user@sparecar.com
- Password: user123

## Frontend Integration

To connect the React frontend to this backend:

1. Update the frontend API base URL to `http://localhost:5000/api`
2. Store JWT token in localStorage after login
3. Include token in Authorization header for protected requests
4. Handle authentication state in React context

Example API call from frontend:
```javascript
const response = await fetch('http://localhost:5000/api/products', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

## Development

- Use `npm run dev` for development with auto-restart
- MongoDB must be running before starting the server
- Check server logs for any errors
- API is available at `http://localhost:5000`

## Production Deployment

1. Set `NODE_ENV=production` in environment variables
2. Use a production MongoDB instance (MongoDB Atlas recommended)
3. Set strong JWT_SECRET
4. Enable HTTPS
5. Set appropriate CORS origins
6. Use process manager like PM2

## License

MIT