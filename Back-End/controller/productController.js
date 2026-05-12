const Product = require("../models/Product");

const productController = {
  // جلب جميع المنتجات مع Pagination
  async getProducts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 100;
      const skip = (page - 1) * limit;

      // بناء query للتصفية
      const filter = {};

      if (req.query.category) {
        filter.category = req.query.category;
      }

      if (req.query.brand) {
        filter.brand = req.query.brand;
      }

      if (req.query.carBrand) {
        filter.carBrand = req.query.carBrand;
      }

      if (req.query.minPrice || req.query.maxPrice) {
        filter.price = {};
        if (req.query.minPrice)
          filter.price.$gte = parseFloat(req.query.minPrice);
        if (req.query.maxPrice)
          filter.price.$lte = parseFloat(req.query.maxPrice);
      }

      if (req.query.search) {
        filter.$text = { $search: req.query.search };
      }

      // جلب المنتجات
      const products = await Product.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      // إجمالي عدد المنتجات
      const total = await Product.countDocuments(filter);

      res.json({
        success: true,
        products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching products",
        error: error.message,
      });
    }
  },

  // جلب منتج بواسطة ID
  async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.json({
        success: true,
        product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching product",
        error: error.message,
      });
    }
  },

  // البحث المتقدم
  async searchProducts(req, res) {
    try {
      const { query, category, carBrand, minPrice, maxPrice, inStock } =
        req.query;

      const filter = {};

      if (query) {
        filter.$or = [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { arabicName: { $regex: query, $options: "i" } },
          { partNumber: { $regex: query, $options: "i" } },
        ];
      }

      if (category) {
        filter.category = category;
      }

      if (carBrand) {
        filter.carBrand = carBrand;
      }

      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
      }

      if (inStock === "true") {
        filter.stock = { $gt: 0 };
      }

      const products = await Product.find(filter).limit(50);

      res.json({
        success: true,
        products,
        count: products.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error searching products",
        error: error.message,
      });
    }
  },

  // جلب الإحصائيات
  async getStats(req, res) {
    try {
      const totalProducts = await Product.countDocuments();

      const totalStock = await Product.aggregate([
        { $group: { _id: null, total: { $sum: "$stock" } } },
      ]);

      const categories = await Product.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);

      const brands = await Product.aggregate([
        { $group: { _id: "$brand", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]);

      const carBrands = await Product.aggregate([
        { $group: { _id: "$carBrand", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);

      res.json({
        success: true,
        stats: {
          totalProducts,
          totalStock: totalStock[0]?.total || 0,
          categories,
          topBrands: brands,
          carBrands,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching stats",
        error: error.message,
      });
    }
  },

  // جلب الفئات والماركات المتاحة
  async getFilters(req, res) {
    try {
      const categories = await Product.distinct("category");
      const brands = await Product.distinct("brand");
      const carBrands = await Product.distinct("carBrand");

      res.json({
        success: true,
        filters: {
          categories,
          brands,
          carBrands,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching filters",
        error: error.message,
      });
    }
  },

  // جلب المنتجات المميزة
  async getFeaturedProducts(req, res) {
    try {
      const products = await Product.find({ isFeatured: true }).limit(10);

      res.json({
        success: true,
        products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching featured products",
        error: error.message,
      });
    }
  },
};

module.exports = productController;
