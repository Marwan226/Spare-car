// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const setupNoSQLSecurity = require("./middleware/securityMiddleware");
require("dotenv").config();

const app = express();
app.use(mongoSanitize());
app.use(express.urlencoded({ extended: true }));

//* Important: Ensure the security middleware is set up after body parsers and before routes *//
setupNoSQLSecurity(app);
app.post("/login", (req, res) => {
  // الكود هنا أصبح محمياً الآن
});

// ============= Middleware =============
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// ============= Database Connection =============
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ============= Passport Configuration =============
require("./config/passport")(passport);

// ============= Routes =============
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
// إضافة routes المنتجات
const productRoutes = require("./routes/productRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes); // إضافة هذا السطر

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Car Parts Store API is running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// API Documentation
app.get("/api", (req, res) => {
  res.json({
    message: "🚗 Car Parts Store API",
    version: "1.0.0",
    endpoints: {
      auth: {
        login: "POST /api/auth/login",
        register: "POST /api/auth/register",
        logout: "POST /api/auth/logout",
        current: "GET /api/auth/current",
      },
      products: {
        getAll: "GET /api/products",
        search: "GET /api/products/search",
        stats: "GET /api/products/stats",
        filters: "GET /api/products/filters",
        featured: "GET /api/products/featured",
        getById: "GET /api/products/:id",
      },
      user: {
        profile: "GET /api/user/profile",
        update: "PUT /api/user/profile",
      },
    },
  });
});

// ============= Error Handler =============
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ============= Login Security Auth =============
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // البيانات هنا دخلت "الفلتر" واتنضفت خلاص
    // الميزة هنا إن Mongoose بتعمل Parameterization تلقائي فإنت كدة محمي 100%
    console.log(`Searching for user: ${username}`);

    // افتراضاً إن عندك موديل اسمه User
    // const user = await User.findOne({ username, password });

    res.status(200).json({
      message: "البيانات وصلت نظيفة تماماً والسيرفر عالجها بأمان",
      receivedUsername: username,
    });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر" });
  }
});

// ============= Start Server =============
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(
    `📍 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5173"}`
  );
  console.log("\n📚 API Endpoints:");
  console.log("   GET  /api/products           - Get all products");
  console.log("   GET  /api/products/search    - Search products");
  console.log("   GET  /api/products/stats     - Get store statistics");
  console.log("   GET  /api/products/filters   - Get available filters");
  console.log("   GET  /api/products/featured  - Get featured products");
  console.log("   GET  /api/products/:id       - Get product by ID");
});





