import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import {
  LogOut,
  LayoutDashboard,
  X,
  Menu,
  Search,
  Wrench,
  Shield,
  Headphones,
  Car,
  Plus,
} from "lucide-react";
import {
  ChevronRight,
  ChevronDown,
  Monitor,
  Package,
  ShoppingCart,
  User,
  Truck,
  Settings,
  Droplets,
  Zap,
  Filter,
  Circle,
  Gauge,
  Wind,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

//* Imported Images
import logo from "../../public/Logo.png";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [garageOpen, setGarageOpen] = useState(false);
  const [myVehicles, setMyVehicles] = useState([
    { id: 1, name: "BMW 320i", year: "2018" },
  ]);
  const { getCartCount } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const cartCount = getCartCount();
  const [openSections, setOpenSections] = useState({
    category: false,
    quickLinks: false,
    support: false,
    services: false,
  });

  // Car Parts Categories with subcategories
  const carPartsCategories = [
    {
      name: "Engine oil",
      icon: Droplets,
      subcategories: [
        "Engine Oil",
        "Transmission Oil",
        "Brake Fluid",
        "Coolant",
      ],
    },
    {
      name: "Tyres",
      icon: Circle,
      subcategories: ["Summer Tyres", "Winter Tyres", "All Season", "Run Flat"],
    },
    {
      name: "Oils and fluids",
      icon: Droplets,
      subcategories: [
        "Motor Oil",
        "Gear Oil",
        "Hydraulic Fluid",
        "Power Steering Fluid",
      ],
    },
    {
      name: "Brakes",
      icon: Shield,
      subcategories: [
        "Abs ring",
        "ABS sensor",
        "Accessory kit, brake shoes",
        "Assembly paste",
        "Brake accumulator",
        "Brake caliper",
        "Brake caliper carrier",
        "Brake caliper paint",
        "Brake caliper piston",
        "Brake caliper repair kit",
        "Brake disc back plate",
        "Brake disc bolts",
      ],
    },
    {
      name: "Filters",
      icon: Filter,
      subcategories: [
        "Air Filter",
        "Oil Filter",
        "Fuel Filter",
        "Cabin Filter",
      ],
    },
    {
      name: "Engine",
      icon: Settings,
      subcategories: ["Pistons", "Gaskets", "Timing Belt", "Spark Plugs"],
    },
    {
      name: "Electrics",
      icon: Zap,
      subcategories: ["Batteries", "Alternators", "Starters", "Fuses"],
    },
    {
      name: "Suspension",
      icon: Gauge,
      subcategories: ["Shock Absorbers", "Springs", "Control Arms", "Bushings"],
    },
    {
      name: "Wiper and washer system",
      icon: Wind,
      subcategories: [
        "Wiper Blades",
        "Washer Pumps",
        "Washer Fluid",
        "Wiper Motors",
      ],
    },
    {
      name: "Ignition and preheating",
      icon: Zap,
      subcategories: [
        "Spark Plugs",
        "Ignition Coils",
        "Glow Plugs",
        "Distributors",
      ],
    },
    {
      name: "Damping",
      icon: Gauge,
      subcategories: ["Shock Absorbers", "Struts", "Springs", "Mounts"],
    },
    {
      name: "Belts, chains, rollers",
      icon: Settings,
      subcategories: ["Timing Belts", "Drive Belts", "Chains", "Tensioners"],
    },
  ];

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const addVehicle = () => {
    const vehicleName = prompt("Enter vehicle name (e.g., BMW 320i):");
    const vehicleYear = prompt("Enter vehicle year:");
    if (vehicleName && vehicleYear) {
      setMyVehicles([
        ...myVehicles,
        { id: Date.now(), name: vehicleName, year: vehicleYear },
      ]);
    }
  };

  const userIsAdmin = isAdmin();

  return (
    <>
      {/* Top Bar - Hidden for Admin */}
      {!userIsAdmin && (
        <div className="w-full z-50 bg-[#0a2540] border-b border-[#1a3a5a] py-2 px-4 sm:px-6">
          <div className="w-full font-semibold relative left-0 mx-auto flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
            <Link
              to="/products"
              className="text-gray-300 focus:text-[#ff8555] hover:text-[#ff8555] transition-colors font-medium">
              SHOP
            </Link>
            <Link
              to="/ourServices"
              className="text-gray-300 focus:text-[#ff8555] hover:text-white transition-colors">
              OUR SERVICES
            </Link>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav
        className={`${
          !userIsAdmin ? "top-[42px]" : "top-0"
        } w-full bg-[#0d1b2a] z-50 shadow-lg border-b border-[#1a3a5a]`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-6">
            {/* Left Section - Menu Button & Logo (Mobile) */}
            <div className="flex items-center gap-2 sm:gap-4">
              {!userIsAdmin && (
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2 bg-[#1e3a5f] text-white px-4 py-2 rounded hover:bg-[#2a4a6f] transition-colors"
                    aria-label="Car parts menu">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm">Car parts</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        menuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  
                </div>
              )}

              {/* Logo - Visible on Mobile */}
              <Link to="/" className="flex md:hidden items-center">
                <img
                  src={logo}
                  alt="SpareCar"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
                <h1
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                  className="text-sm sm:text-base text-white font-bold tracking-widest ml-1">
                  SPARECAR
                </h1>
              </Link>
            </div>

            {/* Center Section - Logo & Search (Desktop) */}
            {!userIsAdmin && (
              <div className="hidden md:flex flex-1 max-w-3xl flex-col items-center justify-center gap-3">
                <Link to="/" className="flex items-center">
                  <img
                    src={logo}
                    alt="SpareCar"
                    className="w-14 h-14 lg:w-16 lg:h-16 object-contain"
                  />
                  <h1
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                    className="text-base lg:text-lg text-white font-bold tracking-widest">
                    SPARECAR
                  </h1>
                </Link>
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSearch(e);
                      }
                    }}
                    placeholder="Enter the part number or name"
                    className="w-full bg-white text-gray-900 px-4 py-2.5 pr-28 lg:pr-32 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6b35] placeholder:text-gray-500 text-sm"
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#007bff] hover:bg-[#0056b3] text-white px-4 lg:px-6 py-1.5 rounded-md flex items-center gap-2 transition-colors font-medium text-sm">
                    <Search size={16} />
                    <span className="hidden sm:inline">SEARCH</span>
                  </button>
                </div>
              </div>
            )}

            {/* Right Section - Icons & User */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* My Garage - Customer Only */}
              {!userIsAdmin && (
                <div className="relative">
                  <button
                    onClick={() => setGarageOpen(!garageOpen)}
                    className="hidden lg:flex flex-col items-center text-gray-300 hover:text-white transition-colors group">
                    <div className="flex items-center gap-1">
                      <LayoutDashboard
                        size={20}
                        className="group-hover:text-[#ff6b35]"
                      />
                      <span className="text-xs">My Garage</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {myVehicles.length} vehicle
                      {myVehicles.length !== 1 ? "s" : ""}
                    </span>
                  </button>

                  {/* Garage Dropdown */}
                  {garageOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setGarageOpen(false)}
                      />
                      <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
                        <div className="bg-[#0d1b2a] text-white p-4">
                          <h3 className="font-semibold text-lg">My Garage</h3>
                          <p className="text-xs text-gray-300 mt-1">
                            Manage your vehicles
                          </p>
                        </div>
                        <div className="p-4 max-h-64 overflow-y-auto">
                          {myVehicles.map((vehicle) => (
                            <div
                              key={vehicle.id}
                              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg mb-2 cursor-pointer">
                              <Car size={24} className="text-[#007bff]" />
                              <div>
                                <p className="font-medium text-gray-900">
                                  {vehicle.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {vehicle.year}
                                </p>
                              </div>
                            </div>
                          ))}
                          <button
                            onClick={addVehicle}
                            className="w-full mt-2 flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#007bff] hover:bg-blue-50 transition-colors text-gray-600 hover:text-[#007bff]">
                            <Plus size={20} />
                            <span className="text-sm font-medium">
                              Add Vehicle
                            </span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Cart - Customer Only */}
              {!userIsAdmin && (
                <Link to="/cart" className="relative group">
                  <div className="flex flex-col items-center text-gray-300 hover:text-white transition-colors">
                    <div className="relative">
                      <ShoppingCart
                        size={18}
                        className="group-hover:text-[#ff6b35]"
                      />
                      {cartCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 text-xs bg-[#ff6b35] text-white hover:bg-[#ff6b35] border-2 border-[#0d1b2a]">
                          {cartCount}
                        </Badge>
                      )}
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-xs mt-1">
                      <span className="text-gray-500">0 items</span>
                      <span className="text-white font-medium">£0.00</span>
                    </div>
                  </div>
                </Link>
              )}

              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex flex-col items-center text-gray-300 hover:text-white transition-colors group">
                      <User size={18} className="group-hover:text-[#ff6b35]" />
                      <span className="hidden sm:block text-xs mt-1">
                        {userIsAdmin ? "Admin" : "My SPARECAR"}
                      </span>
                      <span className="hidden lg:block text-xs text-gray-500">
                        {user.name}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-[#0d1b2a] border-[#1a3a5a] text-white">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                      {userIsAdmin && (
                        <Badge className="mt-1 bg-[#ff6b35]">Admin</Badge>
                      )}
                    </div>
                    <DropdownMenuSeparator className="bg-[#1a3a5a]" />

                    {!userIsAdmin && (
                      <DropdownMenuItem
                        onClick={() => navigate("/profile")}
                        className="hover:bg-[#1a3a5a] cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile & Orders
                      </DropdownMenuItem>
                    )}

                    {userIsAdmin && (
                      <DropdownMenuItem
                        onClick={() => navigate("/admin")}
                        className="hover:bg-[#1a3a5a] cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator className="bg-[#1a3a5a]" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="hover:bg-[#1a3a5a] cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  <button className="flex flex-col items-center text-gray-300 hover:text-white transition-colors group">
                    <User size={18} className="group-hover:text-[#ff6b35]" />
                    <span className="hidden sm:block text-xs mt-1">
                      My SPARECAR
                    </span>
                    <span className="hidden sm:block text-xs text-gray-500">
                      Sign in
                    </span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Secondary Navigation Bar - Customer Only */}
        {!userIsAdmin && (
          <div className="bg-[#0a1929] min-w-full flex justify-center items-center border-t border-[#1a3a5a] overflow-x-auto scrollbar-hide">
            <div className="max-w-full mx-auto px-3 sm:px-6 py-2">
              <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm whitespace-nowrap">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 text-white hover:text-[#ff6b35] transition-colors font-medium">
                  <Package size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span>Car parts</span>
                </button>
                <Link
                  to="/products?category=Truck"
                  className="text-gray-300 font-semibold hover:text-[#ff6b35] transition-colors flex items-center gap-2">
                  <Truck size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span>Truck parts</span>
                </Link>
                <Link
                  to="/products?category=Motorcycle"
                  className="text-gray-300 font-semibold hover:text-[#ff6b35] transition-colors flex items-center gap-2">
                  <Monitor size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span>Motorcycle parts</span>
                </Link>
                <Link
                  to="/products?category=Tyres"
                  className="hidden sm:flex text-gray-300 font-semibold hover:text-[#ff6b35] transition-colors items-center gap-2">
                  <Shield size={18} />
                  <span>Tyres</span>
                </Link>
                <Link
                  to="/products?category=Wheels"
                  className="hidden md:flex text-gray-300 font-semibold hover:text-[#ff6b35] transition-colors items-center gap-2">
                  <Wrench size={18} />
                  <span>Wheels</span>
                </Link>
                <Link
                  to="/products?category=Tools"
                  className="hidden lg:flex text-gray-300 font-semibold hover:text-[#ff6b35] transition-colors items-center gap-2">
                  <Wrench size={18} />
                  <span>Tools</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Overlay & Sidebar - Customer Only */}
      {!userIsAdmin && (
        <>
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${
              menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={() => setMenuOpen(false)}
          />

          {/* Sidebar with Car Parts Menu */}
          <div
            className={`fixed top-0 left-0 h-full w-full sm:w-[380px] md:w-[420px] bg-[#1a2332] shadow-2xl z-50 transition-transform duration-300 overflow-y-auto ${
              menuOpen ? "translate-x-0" : "translate-x-[-100%]"
            }`}>
            {/* Header */}
            <div className="sticky top-0 bg-[#0d1521] border-b border-gray-700 px-4 sm:px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <Car size={24} className="text-[#ff6b35]" />
                <h2 className="text-xl sm:text-2xl font-semibold text-white">
                  Car parts
                </h2>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                <X size={24} className="text-gray-300" />
              </button>
            </div>

            {/* Search in Sidebar - Mobile Only */}
            <div className="md:hidden px-4 py-3 bg-[#0d1521] border-b border-gray-700">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(e);
                    }
                  }}
                  placeholder="Search parts..."
                  className="w-full bg-[#1a2332] text-white px-4 py-2.5 pr-12 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6b35] placeholder:text-gray-400 text-sm border border-gray-600"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#007bff] hover:bg-[#0056b3] text-white p-2 rounded-md transition-colors">
                  <Search size={16} />
                </button>
              </div>
            </div>

            {/* Car Parts Categories */}
            <div className="px-4 sm:px-6 py-4">
              {carPartsCategories.map((category, index) => {
                const IconComponent = category.icon;
                const isOpen = openSections[`carPart_${index}`];

                return (
                  <div key={index} className="mb-3">
                    <div
                      onClick={() => toggleSection(`carPart_${index}`)}
                      className="flex items-center justify-between py-3 px-3 bg-[#0d1521] hover:bg-[#1a2837] border border-gray-700 rounded-lg cursor-pointer transition-all">
                      <div className="flex items-center gap-3">
                        <IconComponent size={20} className="text-[#ff6b35]" />
                        <h3 className="text-sm sm:text-base text-white font-medium">
                          {category.name}
                        </h3>
                      </div>
                      {isOpen ? (
                        <ChevronDown className="text-gray-400 transition-transform" />
                      ) : (
                        <ChevronRight className="text-gray-400 transition-transform" />
                      )}
                    </div>

                    {/* Subcategories */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen
                          ? "max-h-[600px] opacity-100 mt-2"
                          : "max-h-0 opacity-0"
                      }`}>
                      <ul className="space-y-1 pl-3">
                        {category.subcategories.map((sub, i) => (
                          <li
                            key={i}
                            onClick={() => {
                              navigate(
                                `/products?category=${encodeURIComponent(sub)}`
                              );
                              setMenuOpen(false);
                            }}
                            className="text-gray-300 hover:text-white hover:bg-[#1a2837] cursor-pointer px-4 py-2.5 rounded-lg transition-all duration-200 text-sm border-l-2 border-transparent hover:border-[#ff6b35]">
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}

              {/* Additional Menu Sections */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className="text-white font-semibold mb-3 px-3">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      navigate("/products");
                      setMenuOpen(false);
                    }}
                    className="w-full text-left text-gray-300 hover:text-white hover:bg-[#1a2837] transition-colors px-3 py-2.5 rounded-lg flex items-center gap-3">
                    <Package size={18} className="text-[#ff6b35]" />
                    <span>All Products</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate("/cart");
                      setMenuOpen(false);
                    }}
                    className="w-full text-left text-gray-300 hover:text-white hover:bg-[#1a2837] transition-colors px-3 py-2.5 rounded-lg flex items-center gap-3">
                    <ShoppingCart size={18} className="text-[#ff6b35]" />
                    <span>Shopping Cart</span>
                  </button>
                  {user && (
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-300 hover:text-white hover:bg-[#1a2837] transition-colors px-3 py-2.5 rounded-lg flex items-center gap-3">
                      <User size={18} className="text-[#ff6b35]" />
                      <span>My Orders</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
