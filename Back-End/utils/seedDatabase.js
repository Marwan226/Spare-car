// utils/seedProducts.js
console.log("🚀 Starting database seed...");

require("dotenv").config();
const mongoose = require("mongoose");

// تعريف نموذج المنتج
const productSchema = new mongoose.Schema(
  {
    name: String,
    arabicName: String,
    description: String,
    price: Number,
    category: String,
    brand: String,
    carBrand: String,
    carModel: String,
    year: String,
    partNumber: String,
    stock: Number,
    images: [String],
    rating: Number,
    discount: Number,
    isFeatured: Boolean,
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

async function seed() {
  try {
    console.log("🔗 Connecting to MongoDB...");

    // استخدام MongoDB URI من البيئة أو المحلي
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sparecar";
    console.log(`📡 Connecting to: ${mongoURI}`);

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // تنظيف البيانات القديمة
    console.log("🧹 Cleaning old data...");
    await Product.deleteMany({});
    console.log("✅ Old data cleared");

    // إضافة البيانات الجديدة
    console.log("🌱 Seeding new data...");
    await Product.insertMany(products);
    console.log(`✅ Added ${products.length} products`);

    // التحقق من البيانات
    const count = await Product.countDocuments();
    console.log(`📊 Total products in database: ${count}`);

    // عرض عينة من البيانات
    const sampleProducts = await Product.find().limit(3);
    console.log("\n📦 Sample products:");
    sampleProducts.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} - $${p.price} (Stock: ${p.stock})`);
    });

    // إغلاق الاتصال
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected from MongoDB");
    console.log("🎉 Seeding completed successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  }
}

// تشغيل عملية الـ seed
seed();
