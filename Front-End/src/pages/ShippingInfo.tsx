import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, MapPin, Clock, DollarSign, Globe } from "lucide-react";

export default function ShippingInfo() {
  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      <PageHeader
        title="Shipping Information"
        breadcrumbs={[{ label: "Shipping Info", href: "/shipping" }]}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Shipping Policy</h2>
            <p className="text-gray-600 text-lg">
              We are committed to delivering your auto parts quickly and safely.
              Learn more about our shipping options, delivery times, and costs.
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-6 h-6 mr-3 text-blue-600" />
                  Delivery Timeframes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h3 className="font-semibold text-lg mb-2">
                      Standard Shipping (Domestic)
                    </h3>
                    <p className="text-gray-600">5-7 business days</p>
                  </div>
                  <div className="border-l-4 border-green-600 pl-4">
                    <h3 className="font-semibold text-lg mb-2">
                      Express Shipping (Domestic)
                    </h3>
                    <p className="text-gray-600">2-3 business days</p>
                  </div>
                  <div className="border-l-4 border-purple-600 pl-4">
                    <h3 className="font-semibold text-lg mb-2">
                      Overnight Shipping
                    </h3>
                    <p className="text-gray-600">1 business day</p>
                  </div>
                  <div className="border-l-4 border-orange-600 pl-4">
                    <h3 className="font-semibold text-lg mb-2">
                      International Shipping
                    </h3>
                    <p className="text-gray-600">
                      10-21 business days (varies by destination)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-6 h-6 mr-3 text-blue-600" />
                  Shipping Costs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Shipping Method</th>
                        <th className="text-left py-3 px-4">Order Value</th>
                        <th className="text-left py-3 px-4">Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-3 px-4">Standard Shipping</td>
                        <td className="py-3 px-4">Under $50</td>
                        <td className="py-3 px-4 font-semibold">$9.99</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Standard Shipping</td>
                        <td className="py-3 px-4">$50 - $100</td>
                        <td className="py-3 px-4 font-semibold">$5.99</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Standard Shipping</td>
                        <td className="py-3 px-4">Over $100</td>
                        <td className="py-3 px-4 font-semibold text-green-600">
                          FREE
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Express Shipping</td>
                        <td className="py-3 px-4">Any amount</td>
                        <td className="py-3 px-4 font-semibold">$19.99</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Overnight Shipping</td>
                        <td className="py-3 px-4">Any amount</td>
                        <td className="py-3 px-4 font-semibold">$34.99</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-6 h-6 mr-3 text-blue-600" />
                  Order Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Once your order ships, you'll receive a tracking number via
                  email. You can track your package using:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Your account dashboard on our website</li>
                  <li>
                    The tracking link provided in your shipping confirmation
                    email
                  </li>
                  <li>Directly on the carrier's website (UPS, FedEx, USPS)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-blue-600" />
                  Processing Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Orders are typically processed within 1-2 business days.
                  Orders placed after 2:00 PM EST will be processed the next
                  business day. Please note that processing times may be longer
                  during peak seasons or promotional periods.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-blue-600" />
                  International Shipping
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We ship to most countries worldwide. International shipping
                  costs are calculated at checkout based on destination and
                  package weight.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Important:</strong> International orders may be
                    subject to customs duties and taxes, which are the
                    responsibility of the recipient. Delivery times may vary
                    based on customs clearance.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-blue-600" />
                  Shipping Restrictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Due to shipping regulations, some items cannot be shipped to
                  certain locations:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>
                    Hazardous materials (batteries, fluids) have shipping
                    restrictions
                  </li>
                  <li>Some items cannot be shipped via air freight</li>
                  <li>
                    P.O. Boxes may not be available for large or heavy items
                  </li>
                  <li>APO/FPO addresses are supported for most items</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
