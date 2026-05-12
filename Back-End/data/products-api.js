// products-api.js
const express = require("express");
const cors = require("cors");
const productsData = require("./products.json");

const app = express();
app.use(cors());
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5000", credentials: true }));

// جميع المنتجات
app.get("/api/products", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const start = (page - 1) * limit;
  const end = start + limit;

  const filtered = productsData.products.slice(start, end);

  res.json({
    success: true,
    products: filtered,
    pagination: {
      page,
      limit,
      total: productsData.products.length,
      pages: Math.ceil(productsData.products.length / limit),
    },
  });
});

// بحث
app.get("/api/products/search", (req, res) => {
  const query = req.query.q?.toLowerCase() || "";

  const results = productsData.products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.arabicName?.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
  );

  res.json({
    success: true,
    products: results,
    count: results.length,
  });
});

// منتج واحد
app.get("/api/products/:id", (req, res) => {
  const product = productsData.products.find((p) => p.id == req.params.id);

  if (product) {
    res.json({
      success: true,
      product,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
});

// إحصائيات
app.get("/api/products/stats", (req, res) => {
  const totalProducts = productsData.products.length;
  const totalStock = productsData.products.reduce((sum, p) => sum + p.stock, 0);
  const totalValue = productsData.products.reduce(
    (sum, p) => sum + p.price * p.stock,
    0
  );

  res.json({
    success: true,
    stats: {
      totalProducts,
      totalStock,
      totalValue: totalValue.toFixed(2),
    },
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Products API running on http://localhost:${PORT}`);
});
