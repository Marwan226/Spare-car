import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Wrench, Smartphone, Headphones, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const servicesRef = useRef<HTMLDivElement>(null);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in-section").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      title: "LiteRoad Service",
      description:
        "Comprehensive roadside assistance service - We provide immediate help on the road anytime, anywhere. Our specialized team is ready to handle all emergency situations.",
      image: "/assets/literoad-service-icon.jpg",
      link: "/services/liteRoad",
      icon: Wrench,
    },
    {
      title: "Mobile Machine",
      description:
        "Mobile diagnostic machine - The latest diagnostic and inspection technologies for your vehicle wherever you are. We use advanced equipment to ensure accurate inspection and fast service.",
      image: "/assets/mobile-machine-icon.jpg",
      link: "/services/mobilMachine",
      icon: Smartphone,
    },
    {
      title: "Customer Support",
      description:
        "Exceptional customer support - Our support team is available 24/7 to answer your inquiries and provide the necessary assistance with professionalism and speed.",
      image: "/assets/customer-support-icon.jpg",
      link: "/customerSupport",
      icon: Headphones,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/hero-services-automotive.jpg"
            alt="Automotive Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/20" />

          <div className="absolute inset-0 bg-[url('/assets/services-background-pattern.jpg')] opacity-10" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className=" text-white text-5xl md:text-7xl font-bold text-foreground animate-fade-in-up">
              Our <span className="gradient-text">Professional</span>{" "}
              <span className="text-[#ff6b35]">Services</span>
            </h1>

            <p
              className="text-xl text-gray-100 md:text-2xl text-muted-foreground leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}>
              We provide a comprehensive range of specialized automotive
              services
              <br />
              with the latest technologies and highest quality standards
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg btn-glow"
                onClick={scrollToServices}>
                Explore Our Services
                <ArrowDown className="ml-2 w-5 h-5 animate-bounce" />
              </Button>

              <Link
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                to="/contactUs"
                className="
                text-white
    px-8 py-2 text-lg rounded-lg
    border border-white text-primary 
    transition-all duration-300
    hover:bg-[#ff6b35] hover:text-[#fff] 
    font-semibold
  ">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-8 h-8 text-primary" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 fade-in-section">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Wrench className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Extensive Experience
              </h3>
              <p className="text-muted-foreground">
                Over 15 years of experience in automotive services
              </p>
            </div>

            <div
              className="text-center space-y-4 fade-in-section"
              style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Advanced Technology
              </h3>
              <p className="text-muted-foreground">
                We use the latest equipment and technologies in diagnostics and
                maintenance
              </p>
            </div>

            <div
              className="text-center space-y-4 fade-in-section"
              style={{ animationDelay: "0.4s" }}>
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Headphones className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Continuous Support
              </h3>
              <p className="text-muted-foreground">
                Support team available 24/7 to serve you anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section ref={servicesRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-section">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Discover <span className="gradient-text">Our Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide you with a comprehensive range of specialized services
              to meet all your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="fade-in-section"
                style={{ animationDelay: `${index * 0.2}s` }}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Showcase Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-in-section">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Professional <span className="gradient-text">Equipment</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We use the latest equipment and specialized tools in automotive
                maintenance and repair. Our highly trained team ensures you
                receive the best possible service.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Advanced diagnostic devices
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Comprehensive inspection equipment
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Professional maintenance tools
                </li>
              </ul>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground btn-glow">
                Learn More
              </Button>
            </div>

            <div className="fade-in-section" style={{ animationDelay: "0.2s" }}>
              <img
                src="/assets/automotive-tools-collage.jpg"
                alt="Professional Tools"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
