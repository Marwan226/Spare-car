import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#eee] text-[#111]">
      <div className="max-w-4xl relative top-10 mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#ff6b35" }}>
            Privacy Policy
          </h1>
          <p className="text-gray-900">Last Updated: December 2, 2025</p>
        </div>

        {/* Introduction */}
        <section className="mb-10">
          <p className="text-gray-700 leading-relaxed">
            At SpearCar, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you visit our website and purchase car parts from
            our e-commerce platform.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Information We Collect
          </h2>
          <div className="space-y-4 text-gray-900">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Personal Information
              </h3>
              <p className="leading-relaxed">
                When you create an account or make a purchase, we collect
                personal information including your name, email address, phone
                number, shipping address, billing address, and payment
                information.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Vehicle Information
              </h3>
              <p className="leading-relaxed">
                To help you find compatible car parts, we may collect
                information about your vehicle including make, model, year, and
                VIN number.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Technical Data
              </h3>
              <p className="leading-relaxed">
                We automatically collect information about your device,
                including IP address, browser type, operating system, and
                browsing behavior on our website.
              </p>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            How We Use Your Information
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your purchases and account</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>
                Improve our website and personalize your shopping experience
              </li>
              <li>
                Send promotional emails about new products and special offers
                (with your consent)
              </li>
              <li>Detect and prevent fraud or unauthorized activities</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
        </section>

        {/* Information Sharing */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Information Sharing and Disclosure
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>We may share your information with:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Service providers who assist with payment processing, shipping,
                and website hosting
              </li>
              <li>Business partners for analytics and advertising purposes</li>
              <li>
                Law enforcement or regulatory authorities when required by law
              </li>
            </ul>
            <p className="mt-4">
              We do not sell your personal information to third parties.
            </p>
          </div>
        </section>

        {/* Data Security */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We implement industry-standard security measures to protect your
            personal information from unauthorized access, disclosure,
            alteration, or destruction. However, no method of transmission over
            the internet is 100% secure, and we cannot guarantee absolute
            security.
          </p>
        </section>

        {/* Cookies */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We use cookies and similar tracking technologies to enhance your
            browsing experience, analyze website traffic, and understand user
            preferences. You can control cookie settings through your browser,
            but disabling cookies may affect website functionality.
          </p>
        </section>

        {/* Your Rights */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Your Rights
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate data</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to certain data processing activities</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at
              privacy@spearcar.com.
            </p>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Children's Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our services are not intended for individuals under the age of 18.
            We do not knowingly collect personal information from children.
          </p>
        </section>

        {/* Changes to Policy */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify
            you of any significant changes by posting the new policy on this
            page and updating the "Last Updated" date.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Contact Us
          </h2>
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-3">
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>
            <div className="space-y-2">
              <p>Email: privacy@spearcar.com</p>
              <p>Phone: +20 (155) 084-4370</p>
              <p>Address: 123 Auto Parts Avenue, Detroit, MI 48201</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
