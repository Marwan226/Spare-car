import PageHeader from "@/components/PageHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function FAQ() {
  const faqSections = [
    {
      title: "General Questions",
      icon: "🏢",
      questions: [
        {
          q: "What types of auto parts do you sell?",
          a: "We offer a comprehensive range of auto parts including engine components, brake systems, suspension parts, electrical components, filters, belts, hoses, and much more. We stock parts for most makes and models of vehicles.",
        },
        {
          q: "Are your parts genuine or aftermarket?",
          a: "We carry both OEM (Original Equipment Manufacturer) and high-quality aftermarket parts. Each product listing clearly indicates whether the part is OEM or aftermarket. All our aftermarket parts meet or exceed OEM specifications.",
        },
        {
          q: "How do I know if a part will fit my vehicle?",
          a: "Each product page includes a compatibility checker where you can enter your vehicle's year, make, and model. You can also use our advanced search filters to find parts specifically for your vehicle. If you're unsure, our customer service team is happy to help verify compatibility.",
        },
        {
          q: "Do you offer warranties on your parts?",
          a: "Yes! Most of our parts come with a manufacturer's warranty ranging from 1 to 3 years depending on the part and brand. Warranty information is clearly displayed on each product page.",
        },
      ],
    },
    {
      title: "Orders & Payment",
      icon: "💳",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. For business accounts, we also offer net-30 terms after credit approval.",
        },
        {
          q: "Can I modify or cancel my order?",
          a: "You can modify or cancel your order within 1 hour of placing it by contacting our customer service team. Once an order enters processing, we cannot guarantee modifications or cancellations.",
        },
        {
          q: "Do you offer bulk or wholesale pricing?",
          a: "Yes! We offer competitive pricing for bulk orders and have a dedicated wholesale program for repair shops and dealerships. Contact our sales team at wholesale@sparecarshop.com for more information.",
        },
        {
          q: "Is my payment information secure?",
          a: "Absolutely. We use industry-standard SSL encryption to protect your payment information. We are PCI DSS compliant and never store your complete credit card information on our servers.",
        },
      ],
    },
    {
      title: "Shipping & Delivery",
      icon: "🚚",
      questions: [
        {
          q: "How long does shipping take?",
          a: "Standard shipping takes 5-7 business days, express shipping takes 2-3 business days, and overnight shipping delivers the next business day. International shipping typically takes 10-21 business days depending on the destination.",
        },
        {
          q: "Do you offer free shipping?",
          a: "Yes! We offer free standard shipping on all orders over $100 within the continental United States. Express and overnight shipping options are available for an additional fee.",
        },
        {
          q: "Can I track my order?",
          a: "Yes, once your order ships, you'll receive a tracking number via email. You can track your package through your account dashboard or directly on the carrier's website.",
        },
        {
          q: "Do you ship internationally?",
          a: "Yes, we ship to most countries worldwide. International shipping costs are calculated at checkout based on destination and package weight. Please note that international orders may be subject to customs duties and taxes.",
        },
        {
          q: "What if my package is damaged during shipping?",
          a: "If your package arrives damaged, please contact us immediately with photos of the damage. We'll work with the carrier to file a claim and send you a replacement part at no additional cost.",
        },
      ],
    },
    {
      title: "Returns & Refunds",
      icon: "↩️",
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a 30-day return policy on most items. Items must be unused, in original packaging, and in resalable condition. Some items like electrical components and special-order parts may have different return policies.",
        },
        {
          q: "How do I start a return?",
          a: "To start a return, visit our Returns page and fill out the return request form, or contact our customer service team. We'll provide you with a Return Authorization (RA) number and return shipping label.",
        },
        {
          q: "Who pays for return shipping?",
          a: "For defective or incorrect items, we cover return shipping costs. For returns due to buyer preference or ordering the wrong part, the customer is responsible for return shipping costs.",
        },
        {
          q: "How long does it take to receive my refund?",
          a: "Once we receive and inspect your return, refunds are processed within 5-7 business days. The refund will be credited to your original payment method. Depending on your bank, it may take an additional 3-5 business days to appear in your account.",
        },
        {
          q: "Can I exchange an item instead of returning it?",
          a: "Yes! If you need a different part, we can process an exchange. Contact our customer service team to arrange an exchange, and we'll help you get the correct part as quickly as possible.",
        },
      ],
    },
    {
      title: "Technical Support",
      icon: "🔧",
      questions: [
        {
          q: "Do you provide installation instructions?",
          a: "Many of our parts come with installation instructions from the manufacturer. We also provide links to installation guides and videos where available. For complex installations, we recommend consulting a professional mechanic.",
        },
        {
          q: "Can you help me diagnose my vehicle problem?",
          a: "While we can provide general guidance on common issues and recommend parts, we cannot provide detailed diagnostic services. We recommend having your vehicle diagnosed by a qualified mechanic to ensure you order the correct parts.",
        },
        {
          q: "Do you offer installation services?",
          a: "We are an online parts retailer and do not offer installation services. However, we can recommend trusted local mechanics and repair shops in your area who can install the parts you purchase from us.",
        },
        {
          q: "What if I need help choosing the right part?",
          a: "Our customer service team is here to help! Contact us via phone, email, or live chat with your vehicle information and the issue you're experiencing. We'll help you identify the correct part for your needs.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      <PageHeader
        title="Frequently Asked Questions"
        breadcrumbs={[{ label: "FAQ", href: "/faq" }]}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">How Can We Help You?</h2>
            <p className="text-gray-600 text-lg">
              Find answers to the most common questions about our products,
              services, and policies.
            </p>
          </div>

          <div className="space-y-8">
            {faqSections.map((section, sectionIndex) => (
              <Card key={sectionIndex}>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <span className="text-3xl mr-3">{section.icon}</span>
                    {section.title}
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    {section.questions.map((item, itemIndex) => (
                      <AccordionItem
                        key={itemIndex}
                        value={`item-${sectionIndex}-${itemIndex}`}>
                        <AccordionTrigger className="text-left">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="pt-6 text-center">
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              <p className="text-gray-600 mb-6">
                Can't find the answer you're looking for? Our customer service
                team is here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Contact Support
                </a>
                <a
                  href="tel:+15551234567"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                  Call Us: +1 (555) 123-4567
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
