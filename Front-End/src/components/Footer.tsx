import { useState } from "react";
import { Clock, Mail, Phone, Facebook, Youtube, Instagram } from "lucide-react";
import logo from "../../public/Logo.png";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  //* Navigator to change path direct
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0a1929] pt-16 pb-6 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Payment Methods */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-12 pb-8 border-b border-gray-700">
          <div className="text-white text-xl md:text-2xl font-bold">VISA</div>
          <div className="text-white text-lg md:text-xl font-bold">
            mastercard
          </div>
          <div className="text-white text-lg md:text-xl font-bold">PayPal</div>
          <div className="text-white text-xs md:text-sm font-semibold">
            Bank Transfer
          </div>
          <div className="text-white text-lg md:text-xl font-bold">AMEX</div>
          <div className="text-white text-xl md:text-2xl font-bold tracking-wider">
            EVRi
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Column 1 */}
          <div>
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ behavior: "smooth", top: 0 });
              }}
              className="flex items-center mb-4">
              <img className="w-20 h-w-20" src={logo} alt="logo" />
              <h3
                style={{ fontFamily: "Orbitron, sans-serif" }}
                className="text-xl md:text-2xl font-bold text-white tracking-widest">
                SPARECAR
              </h3>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Your trusted source for quality car spare parts and accessories.
              Excellence in every component.
            </p>

            <p className="text-gray-500 text-sm leading-relaxed">
              The data displayed here, especially the entire database, may not
              be copied. Reproducing and distributing the data and the database
              without prior consent from TecAlliance and/or engaging third
              parties in such activities is strictly prohibited. Any
              unauthorised use of content constitutes copyright infringement and
              will be subject to legal action.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 tracking-wide">
              Shop
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <button
                  onClick={() => navigate("/products")}
                  className="hover:text-white transition-colors">
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/products?category=Engine Parts")}
                  className="hover:text-white transition-colors">
                  Engine Parts
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/products?category=Brakes")}
                  className="hover:text-white transition-colors">
                  Brakes
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/products?category=Electronics")}
                  className="hover:text-white transition-colors">
                  Electronics
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/products?category=Suspension")}
                  className="hover:text-white transition-colors">
                  Suspension
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 tracking-wide">
              Customer Service
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm mb-8">
              <li>
                <button
                  onClick={() => navigate("/contactUs")}
                  className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/shippingInfo")}
                  className="hover:text-white transition-colors">
                  Shipping Info
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/returns")}
                  className="hover:text-white transition-colors">
                  Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/faq")}
                  className="hover:text-white transition-colors">
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/profile")}
                  className="hover:text-white transition-colors">
                  Track Order
                </button>
              </li>
            </ul>

            <div className="bg-[#0f2438] p-4 rounded">
              <h5 className="text-white font-semibold text-sm mb-3">
                Customer service hours for the UK
              </h5>
              <p className="text-gray-400 text-xs mb-1">
                Monday–Friday 7:00am–8:00pm
              </p>
              <p className="text-gray-400 text-xs mb-1">
                Saturday 7:00am - 4:00pm
              </p>
              <p className="text-gray-400 text-xs mb-3">Sunday: closed</p>

              <div className="flex gap-3 mt-4">
                <Facebook
                  size={20}
                  className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                />
                <Youtube
                  size={20}
                  className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                />
                <Instagram
                  size={20}
                  className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 tracking-wide">
              Contact
            </h4>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={16} className="text-[#ff6b35]" />
                <span>info@sparecar.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={16} className="text-[#ff6b35]" />
                <span>+20 155 0844 370</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Clock size={16} className="text-[#ff6b35]" />
                <span>Online Everyday</span>
              </div>
            </div>

            <div className="bg-[#0f2438] p-4 rounded">
              <h5 className="text-white font-semibold text-sm mb-3">
                International customer service
              </h5>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🇬🇧</span>
                <span className="text-white text-sm">United Kingdom</span>
              </div>
              <p className="text-gray-500 text-xs mb-2">
                © 2025 trucks.autodoc.co.uk: AUTODOC Online Shop
              </p>
              <p className="text-gray-500 text-xs">
                The website owner is Autodoc SE, Josef-Orlopp-Straße 55, 10365
                Berlin, Germany
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700 py-6 sm:py-8 mb-6 px-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
            <div className="w-full lg:w-auto">
              <h4 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">
                Stay Updated
              </h4>
              <p className="text-gray-400 text-xs sm:text-sm">
                Subscribe for exclusive deals and new arrivals
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#0f2438] border border-gray-600 px-4 sm:px-6 py-2.5 sm:py-3 w-full sm:flex-1 lg:w-64 xl:w-80 focus:outline-none focus:border-[#ff6b35] transition-colors text-white text-sm sm:text-base rounded"
              />
              <button
                onClick={handleSubscribe}
                className="bg-[#ff6b35] text-black px-6 sm:px-8 py-2.5 sm:py-3 hover:bg-[#c4491f] transition-colors font-bold text-sm sm:text-base rounded whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-gray-500">
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
            <span>
              © {new Date().getFullYear()} SpareCar. All rights reserved.
            </span>
            <Link
              to="/privacy"
              onClick={() => {
                navigate("/privacy");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              onClick={() => {
                navigate("/terms");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
