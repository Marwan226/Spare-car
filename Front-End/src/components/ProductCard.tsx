import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star, Car, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

// تعريف الأنواع الجديدة لتتوافق مع بيانات API
interface Product {
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
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  // حساب الخصم إن وجد
  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  // الحصول على الصورة الأولى أو صورة افتراضية
  const productImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://via.placeholder.com/300x200?text=Car+Part";

  // تحديد حالة المخزون
  const getStockStatus = () => {
    if (product.stock === 0)
      return { text: "Out of Stock", color: "text-red-600", bg: "bg-red-100" };
    if (product.stock < 5)
      return {
        text: `Low Stock (${product.stock})`,
        color: "text-orange-600",
        bg: "bg-orange-100",
      };
    return {
      text: `In Stock (${product.stock})`,
      color: "text-green-600",
      bg: "bg-green-100",
    };
  };

  const stockStatus = getStockStatus();

  // التنسيق العربي للمنتجات
  const displayName = product.arabicName || product.name;

  // دالة للذهاب إلى صفحة التفاصيل
  const goToProductDetails = () => {
    navigate(`/product/${product._id}`);
  };

  // منع الانتشار عند النقر على الأزرار التفاعلية
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card
      className="w-full bg-white border-2 border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
      onClick={() => {
        goToProductDetails();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}>
      {/* Badges - الجزء العلوي */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {hasDiscount && (
          <Badge className="bg-orange-500 text-white text-xs px-2 py-0.5 font-bold animate-pulse">
            -{product.discount}%
          </Badge>
        )}
        {product.isFeatured && (
          <Badge className="bg-purple-500 text-white text-xs px-2 py-0.5">
            🔥 مميز
          </Badge>
        )}
        {product.stock === 0 && (
          <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">
            ⚠️ نفذت
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className="absolute top-2 right-2 z-10 bg-white p-1.5 rounded-full border-2 border-gray-200 hover:border-orange-500 transition-colors shadow-sm"
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}>
        <Heart
          className={`w-4 h-4 transition-colors ${
            isWishlisted
              ? "fill-red-500 text-red-500"
              : "text-gray-400 group-hover:text-orange-500"
          }`}
        />
      </button>

      {/* Product Image */}
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={productImage}
          alt={displayName}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=Car+Part";
          }}
        />

        {/* Overlay على الصورة عند الـ Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
      </div>

      {/* Card Content */}
      <CardContent className="p-3 space-y-2">
        {/* Category & Brand */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="text-xs px-2 py-0.5 border-orange-200 text-orange-600 bg-orange-50">
              <Tag className="w-3 h-3 mr-1" />
              {product.category}
            </Badge>

            <Badge
              variant="outline"
              className="text-xs px-2 py-0.5 border-blue-200 text-blue-600 bg-blue-50">
              {product.brand}
            </Badge>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full">
            <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
            <span className="text-xs font-bold text-gray-800">
              {product.rating?.toFixed(1) || "4.5"}
            </span>
            <span className="text-xs text-gray-500">
              ({product.reviews || 0})
            </span>
          </div>
        </div>

        {/* Car Info */}
        <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-1.5 rounded-md">
          <Car className="w-3 h-3" />
          <span className="font-semibold">{product.carBrand}</span>
          <span className="text-gray-500">•</span>
          <span>{product.carModel}</span>
          {product.year && (
            <>
              <span className="text-gray-500">•</span>
              <span>{product.year}</span>
            </>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-sm text-gray-900 line-clamp-2 min-h-[40px] hover:text-orange-600 transition-colors">
          {displayName}
        </h3>

        {/* Part Number */}
        <div className="text-xs text-gray-500 font-mono bg-gray-50 p-1 rounded inline-block">
          رقم القطعة:{" "}
          <span className="font-bold text-gray-800">{product.partNumber}</span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2 min-h-[32px]">
          {product.description}
        </p>

        {/* Price & Stock */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          {/* Price Section */}
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="text-xs text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-orange-600">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <Badge className="bg-orange-100 text-orange-700 text-xs">
                    وفر {product.discount}%
                  </Badge>
                </div>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="text-right">
            <div
              className={`text-xs px-2 py-1 rounded-full ${stockStatus.bg} ${stockStatus.color}`}>
              {stockStatus.text}
            </div>
          </div>
        </div>
      </CardContent>

      {/* Card Footer - Add to Cart Button */}
      <CardFooter className="p-3 pt-0">
        <Button
          className={`w-full text-sm py-2.5 font-semibold transition-all ${
            product.stock === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed hover:bg-gray-300"
              : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg"
          }`}
          onClick={handleAddToCart}
          disabled={product.stock === 0}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock === 0
            ? "نفذت من المخزون"
            : product.stock < 5
            ? "أضف للسلة قبل نفادها"
            : "أضف للسلة"}
        </Button>
      </CardFooter>
    </Card>
  );
}
