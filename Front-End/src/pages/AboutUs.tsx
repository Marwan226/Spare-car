import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Award,
  Users,
  TrendingUp,
  CheckCircle,
  Shield,
} from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="About Us"
        breadcrumbs={[{ label: "About Us", href: "/about" }]}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Company Story */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Our Story</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-600 mb-4">
                    Founded in 2010, Spare Car Shop began with a simple mission:
                    to make quality auto parts accessible and affordable for
                    everyone. What started as a small warehouse operation has
                    grown into one of the most trusted online retailers of
                    automotive parts and accessories.
                  </p>
                  <p className="text-lg text-gray-600 mb-4">
                    Over the past decade, we've served hundreds of thousands of
                    customers, from DIY enthusiasts working on their first brake
                    job to professional mechanics running busy repair shops. Our
                    commitment to quality, customer service, and competitive
                    pricing has remained unwavering throughout our growth.
                  </p>
                  <p className="text-lg text-gray-600">
                    Today, we stock over 100,000 parts from leading
                    manufacturers, operate multiple distribution centers across
                    the country, and continue to invest in technology and
                    expertise to serve you better. But despite our growth, we've
                    never forgotten our roots or the values that got us here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Mission & Vision */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-t-4 border-blue-600">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Target className="w-10 h-10 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold">Our Mission</h3>
                  </div>
                  <p className="text-gray-600">
                    To provide high-quality auto parts at competitive prices,
                    backed by exceptional customer service and expert guidance.
                    We strive to be the first choice for automotive parts,
                    whether you're a professional mechanic or a weekend DIYer.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-green-600">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="w-10 h-10 text-green-600 mr-3" />
                    <h3 className="text-2xl font-bold">Our Vision</h3>
                  </div>
                  <p className="text-gray-600">
                    To revolutionize the auto parts industry by combining
                    cutting-edge technology with old-fashioned customer service.
                    We envision a future where finding and purchasing the right
                    part is simple, fast, and reliable for everyone.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Core Values */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Quality First</h3>
                  <p className="text-gray-600">
                    We only stock parts that meet or exceed OEM specifications.
                    Every product is carefully vetted to ensure it meets our
                    high standards.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Customer Focus</h3>
                  <p className="text-gray-600">
                    Your satisfaction is our priority. Our knowledgeable team is
                    always ready to help you find the right part and answer your
                    questions.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Integrity</h3>
                  <p className="text-gray-600">
                    We believe in honest pricing, transparent policies, and
                    standing behind our products. No hidden fees, no surprises.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">
                        Extensive Inventory
                      </h3>
                      <p className="text-gray-600">
                        Over 100,000 parts in stock for most makes and models,
                        from classic cars to the latest vehicles.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Expert Support</h3>
                      <p className="text-gray-600">
                        Our team of automotive specialists is here to help you
                        find the right part and answer technical questions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Fast Shipping</h3>
                      <p className="text-gray-600">
                        Multiple distribution centers ensure quick delivery.
                        Most orders ship the same day if placed before 2 PM EST.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">
                        Competitive Pricing
                      </h3>
                      <p className="text-gray-600">
                        We work directly with manufacturers to bring you the
                        best prices without compromising on quality.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
                      <p className="text-gray-600">
                        30-day hassle-free returns on most items. We stand
                        behind every part we sell.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">
                        Warranty Protection
                      </h3>
                      <p className="text-gray-600">
                        Most parts come with manufacturer warranties ranging
                        from 1 to 3 years for your peace of mind.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Stats */}
          <section className="mb-16">
            <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-bold mb-2">14+</div>
                    <div className="text-blue-100">Years in Business</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">100K+</div>
                    <div className="text-blue-100">Parts in Stock</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">500K+</div>
                    <div className="text-blue-100">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">98%</div>
                    <div className="text-blue-100">Satisfaction Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA */}
          <section>
            <Card className="bg-gray-100">
              <CardContent className="pt-6 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Join thousands of satisfied customers who trust us for their
                  auto parts needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/"
                    className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Shop Now
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                    Contact Us
                  </a>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
