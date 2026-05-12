const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    arabicName: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Engine",
        "Brakes",
        "Suspension",
        "Electrical",
        "Transmission",
        "Exhaust",
        "Cooling",
        "Body",
        "Interior",
        "Accessories",
      ],
    },
    subcategory: {
      type: String,
    },
    brand: {
      type: String,
      required: true,
    },
    carBrand: {
      type: String,
      required: true,
      enum: [
        "Toyota",
        "Honda",
        "Ford",
        "BMW",
        "Mercedes",
        "Nissan",
        "Hyundai",
        "Kia",
        "Chevrolet",
        "Volkswagen",
      ],
    },
    carModel: {
      type: String,
      required: true,
    },
    year: {
      type: String,
    },
    partNumber: {
      type: String,
      required: true,
      unique: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
      },
    ],
    specifications: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
    compatibility: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

// إنشاء indexes للبحث السريع
productSchema.index({ name: "text", description: "text" });
productSchema.index({ category: 1, brand: 1 });
productSchema.index({ carBrand: 1, carModel: 1 });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
