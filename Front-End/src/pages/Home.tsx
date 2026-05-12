import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ShoppingCart,
  ChevronRight,
  Shield,
  Truck,
  Wrench,
  ArrowRight,
  ChevronLeft,
  Star,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { mockProducts } from "@/lib/mockData";

const carouselSlides = [
  {
    id: 1,
    title: "Find the best English breakfast",
    subtitle: "in our app",
    buttonText: "Shop Now",
    link: "/products",
    image:
      "https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=1200&q=80",
    bgColor: "from-orange-600 to-orange-700",
  },
  {
    id: 2,
    title: "Premium Car Parts",
    subtitle: "Quality Guaranteed",
    buttonText: "Shop Now",
    link: "/products",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80",
    bgColor: "from-gray-800 to-gray-900",
  },
  {
    id: 3,
    title: "Expert Support",
    subtitle: "Professional Advice",
    buttonText: "Contact Us",
    link: "/contactUs",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80",
    bgColor: "from-blue-800 to-blue-900",
  },
];

const categories = [
  {
    name: "Tyres",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  },
  {
    name: "Brakes",
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&q=80",
  },
  {
    name: "Suspension",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80",
  },
  {
    name: "Transmission",
    image:
      "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=400&q=80",
  },
  {
    name: "Filters",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80",
  },
  {
    name: "Engine",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80",
  },
  {
    name: "Oils and fluids",
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&q=80",
  },
  {
    name: "Clutch",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80",
  },
  {
    name: "Body",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80",
  },
  {
    name: "Exhaust",
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&q=80",
  },
  {
    name: "Belts, chains",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80",
  },
  {
    name: "Other categories",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80",
  },
];

const accessories = [
  {
    name: "Car care",
    image:
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&q=80",
  },
  {
    name: "Auto detailing & car care",
    image:
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&q=80",
  },
  {
    name: "Tools & Equipment",
    image:
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&q=80",
  },
];

const carBrands = [
  "BMW",
  "VW",
  "AUDI",
  "MERCEDES-BENZ",
  "FORD",
  "VAUXHALL",
  "RENAULT",
  "TOYOTA",
  "PEUGEOT",
  "NISSAN",
  "VOLVO",
  "HONDA",
  "SKODA",
  "CITROEN",
  "FIAT",
  "MINI",
];

const manufacturers = [
  {
    name: "BOSCH",
    logo: "https://cdn.worldvectorlogo.com/logos/bosch-2.svg",
  },
  {
    name: "VALEO",
    logo: "https://cdn.worldvectorlogo.com/logos/valeo-2.svg",
  },
  {
    name: "BREMBO",
    logo: "https://cdn.worldvectorlogo.com/logos/brembo.svg",
  },
  {
    name: "MANN-FILTER",
    logo: "https://cdn.worldvectorlogo.com/logos/mann-filter.svg",
  },
  {
    name: "CASTROL",
    logo: "https://cdn.worldvectorlogo.com/logos/castrol-1.svg",
  },
  {
    name: "ZF",
    logo: "https://cdn.worldvectorlogo.com/logos/zf-friedrichshafen.svg",
  },
  {
    name: "MAHLE",
    logo: "https://cdn.worldvectorlogo.com/logos/mahle.svg",
  },
  {
    name: "LIQUI MOLY",
    logo: "https://cdn.worldvectorlogo.com/logos/liqui-moly.svg",
  },
  {
    name: "NGK",
    logo: "https://cdn.worldvectorlogo.com/logos/ngk.svg",
  },
  {
    name: "BRK",
    logo: "https://logo.clearbit.com/brembo.com",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedMaker, setSelectedMaker] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const featuredProducts = mockProducts.slice(0, 5);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Carousel and Search */}
      <section className="bg-white pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - Search Form */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Search car parts by registration number
              </h2>

              <div className="mb-4">
                <div className="flex gap-2">
                  <div className="flex items-center bg-[#0066cc] text-white px-3 py-2 rounded">
                    <span className="text-xs font-bold">GB</span>
                  </div>
                  <input
                    type="text"
                    placeholder="YOUR REG"
                    className="flex-1 px-4 py-2 bg-[#ffd700] text-gray-900 placeholder-gray-700 rounded font-bold text-center"
                  />
                  <button className="bg-[#0066cc] text-white px-8 py-2 rounded font-bold hover:bg-[#0052a3] transition-colors">
                    Search
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Find car parts for your vehicle
                </h3>

                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#ff6600] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      1
                    </div>
                    <select
                      value={selectedMaker}
                      onChange={(e) => setSelectedMaker(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#0066cc] appearance-none bg-white">
                      <option value="">Select maker</option>
                      {carBrands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      2
                    </div>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      disabled={!selectedMaker}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#0066cc] appearance-none bg-white disabled:bg-gray-100">
                      <option value="">Select model</option>
                    </select>
                  </div>

                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      3
                    </div>
                    <select
                      value={selectedEngine}
                      onChange={(e) => setSelectedEngine(e.target.value)}
                      disabled={!selectedModel}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#0066cc] appearance-none bg-white disabled:bg-gray-100">
                      <option value="">Select engine</option>
                    </select>
                  </div>

                  <button className="w-full bg-[#0066cc] text-white py-3 rounded font-bold hover:bg-[#0052a3] transition-colors">
                    Search
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <a
                    href="#"
                    className="text-[#0066cc] text-sm hover:underline">
                    CAN'T FIND YOUR CAR IN THE CATALOGUE?
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Carousel */}
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              {carouselSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`}>
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover mix-blend-overlay"
                    />
                  </div>
                  <div className="relative h-full flex flex-col justify-center px-12 text-white">
                    <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                    <p className="text-2xl mb-6">{slide.subtitle}</p>
                    <Link to={slide.link} className="bg-[#ff6600] text-white px-8 py-3 rounded font-bold hover:bg-[#e55a00] transition-colors w-fit">
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              ))}

              {/* Carousel Controls */}
              <button
                onClick={() =>
                  setCurrentSlide(
                    (prev) =>
                      (prev - 1 + carouselSlides.length) % carouselSlides.length
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors">
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors">
                <ChevronRight className="w-6 h-6 text-gray-900" />
              </button>

              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {carouselSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            AUTODOC AUTO PARTS STORE: BUY CAR PARTS ONLINE
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category, i) => (
              <Link key={i} to={`/products?category=${category.name}`}>
                <div className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Accessories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            CAR ESSENTIALS, ACCESSORIES, CLEANING PRODUCTS & TOOLS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accessories.map((item, i) => (
              <Link key={i} to={`/products?category=${item.name}`}>
                <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <h3 className="text-xl font-bold text-white">
                      {item.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Car Brands Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            BUY AUTO PARTS FOR THE MOST POPULAR CAR BRANDS
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {carBrands.map((brand, i) => (
              <Link key={i} to={`/products?brand=${brand}`}>
                <div className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
                  <p className="text-sm font-bold text-gray-900">{brand}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Shield className="w-12 h-12 text-[#0066cc] flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  Low-cost delivery
                </h3>
                <p className="text-sm text-gray-600">Fast shipping worldwide</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Truck className="w-12 h-12 text-[#0066cc] flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  Secure payments
                </h3>
                <p className="text-sm text-gray-600">SSL encrypted checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Wrench className="w-12 h-12 text-[#0066cc] flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  Extended warranty on returns
                </h3>
                <p className="text-sm text-gray-600">365 days return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <ShoppingCart className="w-12 h-12 text-[#0066cc] flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Original parts</h3>
                <p className="text-sm text-gray-600">
                  Genuine quality guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              AUTODOC BESTSELLERS: BUY AUTO CAR PARTS ONLINE AT A GOOD PRICE
            </h2>
            <Link to="/products">
              <button className="text-[#0066cc] hover:text-[#0052a3] flex items-center gap-2 font-medium">
                View All <ArrowRight size={20} />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
                <Link to={`/products/${product.id}`}>
                  <div className="relative">
                    {product.discount && (
                      <span className="absolute top-2 right-2 bg-[#ff6600] text-white text-xs font-bold px-2 py-1 rounded">
                        -{product.discount}%
                      </span>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4
                            ? "fill-[#ffd700] text-[#ffd700]"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">(24)</span>
                  </div>

                  <Link to={`/products/${product.id}`}>
                    <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 hover:text-[#0066cc]">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mb-3">
                    <span className="text-2xl font-bold text-gray-900">
                      £{product.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-[#cc0000] text-white py-2 rounded font-bold hover:bg-[#b30000] transition-colors text-sm">
                    Add to basket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturers Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            GET GREAT DEALS ON CAR SPARES FROM THE BEST MANUFACTURERS IN OUR
            ONLINE SHOP
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
            {manufacturers.map((manufacturer, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-lg p-4 flex items-center justify-center hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
                <img
                  src={manufacturer.logo}
                  alt={manufacturer.name}
                  className="max-w-full h-8 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            COMPREHENSIVE GUIDE ON CAR REPAIRS & MAINTENANCE
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 divide-x divide-white">
                <div className="p-4">
                  <h3 className="text-white font-bold mb-4 text-center">
                    BEFORE
                  </h3>
                  <img
                    src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80"
                    alt="Before"
                    className="w-full h-64 object-cover rounded"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold mb-4 text-center">
                    AFTER
                  </h3>
                  <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80"
                    alt="After"
                    className="w-full h-64 object-cover rounded"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">
                  Step-by-step guides
                </h3>
                <p className="text-sm text-gray-600">
                  Detailed instructions for common repairs and maintenance tasks
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">
                  Video tutorials
                </h3>
                <p className="text-sm text-gray-600">
                  Watch professional mechanics demonstrate repair procedures
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">Expert tips</h3>
                <p className="text-sm text-gray-600">
                  Learn from experienced technicians and save money on repairs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
