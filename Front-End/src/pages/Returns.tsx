import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Returns() {
  const [returnForm, setReturnForm] = useState({
    orderNumber: "",
    email: "",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      "Return request submitted successfully! We will contact you within 24 hours."
    );
    setReturnForm({ orderNumber: "", email: "", reason: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      <PageHeader
        title="Returns & Refunds"
        breadcrumbs={[{ label: "Returns", href: "/returns" }]}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Return Policy</h2>
            <p className="text-gray-600 text-lg">
              We want you to be completely satisfied with your purchase. If
              you're not happy with your order, we're here to help with our
              hassle-free return process.
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RotateCcw className="w-6 h-6 mr-3 text-blue-600" />
                  Return Window
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  You have <strong className="text-blue-600">30 days</strong>{" "}
                  from the date of delivery to return most items for a full
                  refund or exchange. Items must be in their original condition
                  with all packaging and documentation.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Some items like electrical components
                    and special-order parts may have different return policies.
                    Please check the product page for specific details.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Step-by-Step Return Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Submit Return Request
                      </h3>
                      <p className="text-gray-600">
                        Fill out the return form below or contact our customer
                        service team with your order number.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Receive Return Authorization
                      </h3>
                      <p className="text-gray-600">
                        We'll email you a Return Authorization (RA) number and
                        return shipping label within 24 hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Pack and Ship
                      </h3>
                      <p className="text-gray-600">
                        Securely pack the item with all original materials.
                        Attach the return label and drop off at the carrier
                        location.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Receive Refund
                      </h3>
                      <p className="text-gray-600">
                        Once we receive and inspect your return, we'll process
                        your refund within 5-7 business days.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-blue-600" />
                  Refund Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Processing Time</h3>
                    <p className="text-gray-600">
                      5-7 business days after we receive your return
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Credit Card Refunds</h3>
                    <p className="text-gray-600">
                      3-5 business days after processing (may vary by bank)
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">PayPal Refunds</h3>
                    <p className="text-gray-600">
                      1-2 business days after processing
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Return Eligibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Returnable Items
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Unused items in original packaging</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Defective or damaged items</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Wrong items shipped</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Items with all accessories and manuals</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center text-red-600">
                      <XCircle className="w-5 h-5 mr-2" />
                      Non-Returnable Items
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Installed or used parts</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Custom or special-order items</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Items without original packaging</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Clearance or final sale items</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-6 h-6 mr-3 text-blue-600" />
                  Submit a Return Request
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="orderNumber">Order Number *</Label>
                    <Input
                      id="orderNumber"
                      value={returnForm.orderNumber}
                      onChange={(e) =>
                        setReturnForm({
                          ...returnForm,
                          orderNumber: e.target.value,
                        })
                      }
                      placeholder="e.g., ORD-12345"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={returnForm.email}
                      onChange={(e) =>
                        setReturnForm({ ...returnForm, email: e.target.value })
                      }
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Return *</Label>
                    <Textarea
                      id="reason"
                      value={returnForm.reason}
                      onChange={(e) =>
                        setReturnForm({ ...returnForm, reason: e.target.value })
                      }
                      placeholder="Please describe why you're returning this item..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto">
                    Submit Return Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  If you have questions about our return policy or need
                  assistance with a return, please contact our customer service
                  team:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Email:</strong> returns@sparecarshop.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                  <p>
                    <strong>Hours:</strong> Monday - Friday, 8:00 AM - 6:00 PM
                    EST
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
