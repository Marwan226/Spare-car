import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import SingleLogo from "../public/Logo.png";
import AIChatbot from "./components/AIChatbot";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import ShippingInfo from "./pages/ShippingInfo";
import Returns from "./pages/Returns";
import FAQ from "./pages/FAQ";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminCustomers from "./pages/AdminCustomers";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminCategories from "./pages/AdminCategories";
import AdminShipping from "./pages/AdminShipping";
import AdminReviews from "./pages/AdminReviews";
import LiteRoad from "./pages/LiteRoad";
import MobileMachine from "./pages/MobileMachine";
import RequestMechanic from "./pages/RequestMechanic";
import TrackOrder from "./pages/TrackOrder";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import OurServices from "./pages/OurServices";
import CustomerSupport from "./pages/CustomerSupport";
import ScrollToTop from "./components/ScrollToTop";

// ✅ استيراد الـ Route Guards الجديدة
import {
  AdminRoute,
  CustomerRoute,
  PublicRoute,
} from "./components/RouteGuards";
import AuthSuccess from "./components/AuthSuccess";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">
                  {isLoading ? (
                    <div className="flex justify-center items-center flex-col min-h-screen bg-[#fff]">
                      <img
                        className="w-[300px] animate-splash"
                        src={SingleLogo}
                        alt="loading"
                      />
                      <h3
                        style={{
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                        }}
                        className=" absolute top-[60%] text-center text-[#111] font-semibold text-lg">
                        Loading...
                      </h3>
                    </div>
                  ) : (
                    <Routes>
                      {/* ===== Public Routes (للجميع) ===== */}
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/contactUs" element={<ContactUs />} />
                      <Route path="/aboutUs" element={<AboutUs />} />
                      <Route path="/shippingInfo" element={<ShippingInfo />} />
                      <Route path="/returns" element={<Returns />} />
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/auth/success" element={<AuthSuccess />} />
                      <Route path="/terms" element={<TermsOfService />} />
                      <Route path="/ourServices" element={<OurServices />} />
                      <Route path="/services/liteRoad" element={<LiteRoad />} />
                      <Route
                        path="/customerSupport"
                        element={<CustomerSupport />}
                      />
                      <Route
                        path="/services/mobilMachine"
                        element={<MobileMachine />}
                      />
                      <Route path="/faq" element={<FAQ />} />

                      {/* ===== Auth Routes (للزوار فقط - لو مسجل دخول يتحول تلقائياً) ===== */}
                      <Route
                        path="/login"
                        element={
                          <PublicRoute>
                            <Login />
                          </PublicRoute>
                        }
                      />
                      <Route
                        path="/register"
                        element={
                          <PublicRoute>
                            <Register />
                          </PublicRoute>
                        }
                      />

                      {/* ===== Customer Routes (للعملاء فقط - Admin مايقدرش يوصلها) ===== */}
                      <Route
                        path="/cart"
                        element={
                          <CustomerRoute>
                            <Cart />
                          </CustomerRoute>
                        }
                      />
                      <Route
                        path="/checkout"
                        element={
                          <CustomerRoute>
                            <Checkout />
                          </CustomerRoute>
                        }
                      />
                      <Route
                        path="/profile"
                        element={
                          <CustomerRoute>
                            <Profile />
                          </CustomerRoute>
                        }
                      />
                      <Route
                        path="/request"
                        element={
                          <CustomerRoute>
                            <RequestMechanic />
                          </CustomerRoute>
                        }
                      />
                      <Route
                        path="/track/:orderId"
                        element={
                          <CustomerRoute>
                            <TrackOrder />
                          </CustomerRoute>
                        }
                      />

                      {/* ===== Admin Routes (للأدمن فقط - العملاء مايقدروش يوصلوها) ===== */}
                      <Route
                        path="/admin"
                        element={
                          <AdminRoute>
                            <AdminDashboard />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/admin/products"
                        element={
                          <AdminRoute>
                            <AdminProducts />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/admin/orders"
                        element={
                          <AdminRoute>
                            <AdminOrders />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/admin/customers"
                        element={
                          <AdminRoute>
                            <AdminCustomers />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/admin/analytics"
                        element={
                          <AdminRoute>
                            <AdminAnalytics />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/admin/categories"
                        element={
                          <AdminRoute>
                            <AdminCategories />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/admin/shipping"
                        element={
                          <AdminRoute>
                            <AdminShipping />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/admin/reviews"
                        element={
                          <AdminRoute>
                            <AdminReviews />
                          </AdminRoute>
                        }
                      />

                      {/* ===== 404 Page ===== */}
                      <Route path="*" element={<NotFound />} />
                      <Route path="/robots" element={<NotFound />} />
                    </Routes>
                  )}
                </main>
                <AIChatbot />
                <ScrollToTop />
                <Footer />
              </div>
              <Toaster />
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
