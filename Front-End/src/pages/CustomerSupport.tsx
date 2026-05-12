import { useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Headphones,
  FileText,
  HelpCircle,
  CheckCircle,
  Send,
  MapPin,
  Calendar,
} from "lucide-react";

export default function CustomerSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Your message has been sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0a1929] via-[#0f2438] to-[#0a1929] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4">
            <Headphones size={64} className="text-[#ff6b35] mx-auto" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            How Can We <span className="text-[#ff6b35]">Help You?</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Our dedicated support team is here 24/7 to assist you with any
            questions or concerns about your car parts
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full px-6 py-4 pr-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#ff6b35] transition-all"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#ff6b35] hover:bg-[#e55a28] text-white p-3 rounded-full transition-colors">
              <HelpCircle size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Contact Cards */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#ff6b35] hover:shadow-2xl transition-shadow">
            <div className="bg-[#ff6b35]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Phone className="text-[#ff6b35]" size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#0a1929] mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Speak directly with our team</p>
            <a
              href="tel:+201550844370"
              className="text-[#ff6b35] font-bold text-lg hover:text-[#e55a28] transition-colors">
              +20 155 0844 370
            </a>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <Clock size={16} />
              <span>Available 24/7</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#ff6b35] hover:shadow-2xl transition-shadow">
            <div className="bg-[#ff6b35]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Mail className="text-[#ff6b35]" size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#0a1929] mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">Get a response within 24 hours</p>
            <a
              href="mailto:info@sparecar.com"
              className="text-[#ff6b35] font-bold hover:text-[#e55a28] transition-colors break-all">
              info@sparecar.com
            </a>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={16} />
              <span>Reply in 24 hours</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#ff6b35] hover:shadow-2xl transition-shadow">
            <div className="bg-[#ff6b35]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="text-[#ff6b35]" size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#0a1929] mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Chat with us in real-time</p>
            <button className="text-[#ff6b35] font-bold hover:text-[#e55a28] transition-colors">
              Start Chat Now →
            </button>
            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>Online Now</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1929] mb-4">
            Frequently Asked <span className="text-[#ff6b35]">Questions</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Quick answers to common questions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              q: "How long does shipping take?",
              a: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery.",
            },
            {
              q: "What is your return policy?",
              a: "We offer a 30-day return policy on all unused parts in original packaging. Free return shipping included.",
            },
            {
              q: "Do you ship internationally?",
              a: "Yes! We ship to over 50 countries worldwide. Shipping times and costs vary by location.",
            },
            {
              q: "How can I track my order?",
              a: "Once shipped, you'll receive a tracking number via email. You can also track orders in your account.",
            },
            {
              q: "Are all parts genuine?",
              a: "We guarantee 100% genuine OEM and high-quality aftermarket parts from certified suppliers.",
            },
            {
              q: "Do you offer installation services?",
              a: "We partner with certified mechanics nationwide. Contact us for installation service in your area.",
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-[#ff6b35] transition-all hover:shadow-lg">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#ff6b35]/10 flex items-center justify-center">
                    <HelpCircle className="text-[#ff6b35]" size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-[#0a1929] mb-2 text-lg">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Features */}
      <div className="bg-gradient-to-br from-[#0a1929] to-[#0f2438] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Our <span className="text-[#ff6b35]">Support?</span>
            </h2>
            <p className="text-gray-300 text-lg">
              We're committed to your satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: "24/7 Available",
                desc: "Round-the-clock support",
              },
              {
                icon: Headphones,
                title: "Expert Team",
                desc: "Certified professionals",
              },
              {
                icon: CheckCircle,
                title: "Quick Response",
                desc: "Average 2-hour reply",
              },
              {
                icon: FileText,
                title: "Detailed Guides",
                desc: "Comprehensive resources",
              },
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-[#ff6b35]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#ff6b35]/20">
                  <feature.icon className="text-[#ff6b35]" size={36} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1929] mb-6">
              Send Us a <span className="text-[#ff6b35]">Message</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Can't find what you're looking for? Fill out the form and our team
              will get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#ff6b35]/10 p-3 rounded-lg">
                  <MapPin className="text-[#ff6b35]" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0a1929] mb-1">
                    Our Location
                  </h4>
                  <p className="text-gray-600">
                    Al Maḩallah al Kubrá, Gharbia, Egypt
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#ff6b35]/10 p-3 rounded-lg">
                  <Clock className="text-[#ff6b35]" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0a1929] mb-1">
                    Business Hours
                  </h4>
                  <p className="text-gray-600">Open 24/7 - Online Everyday</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#ff6b35]/10 p-3 rounded-lg">
                  <CheckCircle className="text-[#ff6b35]" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0a1929] mb-1">
                    Response Time
                  </h4>
                  <p className="text-gray-600">
                    Average reply within 2-4 hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#0a1929] mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#ff6b35] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0a1929] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#ff6b35] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0a1929] mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#ff6b35] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0a1929] mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#ff6b35] transition-colors resize-none"
                  required></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-[#ff6b35] hover:bg-[#e55a28] text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                <Send size={20} />
                Send Message
              </button>

              <p className="text-sm text-gray-500 text-center">
                We'll respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-[#ff6b35] to-[#ff8555] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Our support team is ready to help you find the perfect parts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#ff6b35] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
              Start Live Chat
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors">
              Call Us Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
