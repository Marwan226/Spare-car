import React from "react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#eee] text-[#111]">
      <div className="max-w-4xl relative top-10 mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#ff6b35" }}>
            Terms of Service
          </h1>
          <p className="text-gray-400">Last Updated: December 2, 2025</p>
        </div>

        {/* Introduction */}
        <section className="mb-10">
          <p className="text-gray-700 leading-relaxed">
            Welcome to SpearCar. These Terms of Service govern your use of our
            website and the purchase of automotive parts through our e-commerce
            platform. By accessing or using our services, you agree to be bound
            by these terms.
          </p>
        </section>

        {/* Acceptance of Terms */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Acceptance of Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            By creating an account, placing an order, or using any part of our
            website, you acknowledge that you have read, understood, and agree
            to be bound by these Terms of Service and our Privacy Policy. If you
            do not agree, please do not use our services.
          </p>
        </section>

        {/* Eligibility */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Eligibility
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You must be at least 18 years old to use our services and make
            purchases. By using SpearCar, you represent and warrant that you
            meet this age requirement and have the legal capacity to enter into
            binding contracts.
          </p>
        </section>

        {/* Account Registration */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Account Registration
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>When creating an account, you agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Keep your password secure and confidential</li>
              <li>
                Accept responsibility for all activities under your account
              </li>
              <li>
                Notify us immediately of any unauthorized access or security
                breach
              </li>
            </ul>
            <p className="mt-4">
              We reserve the right to suspend or terminate accounts that violate
              these terms or engage in fraudulent activity.
            </p>
          </div>
        </section>

        {/* Product Information */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Product Information and Availability
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>
              We strive to provide accurate product descriptions,
              specifications, and images. However, we do not warrant that
              product information is complete, reliable, current, or error-free.
              Product availability is subject to change without notice.
            </p>
            <p>
              It is your responsibility to verify that the parts you order are
              compatible with your vehicle. We recommend consulting with a
              qualified mechanic if you are unsure about compatibility.
            </p>
          </div>
        </section>

        {/* Pricing and Payment */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Pricing and Payment
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>
              All prices are displayed in USD and are subject to change without
              notice. We reserve the right to correct pricing errors and cancel
              orders affected by such errors. Payment must be made in full at
              the time of purchase using accepted payment methods.
            </p>
            <p>
              You authorize us to charge the payment method provided for all
              fees and charges incurred, including applicable taxes and shipping
              costs.
            </p>
          </div>
        </section>

        {/* Orders and Fulfillment */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Orders and Fulfillment
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>
              Receipt of an order confirmation does not constitute acceptance of
              your order. We reserve the right to accept or decline any order
              for any reason, including product availability, errors in pricing
              or product information, or suspected fraudulent activity.
            </p>
            <p>
              Shipping times are estimates and not guaranteed. We are not
              responsible for delays caused by shipping carriers, customs, or
              events beyond our control.
            </p>
          </div>
        </section>

        {/* Returns and Refunds */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Returns and Refunds
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>
              Most unused and unopened products can be returned within 30 days
              of purchase for a refund or exchange. Electrical components,
              custom orders, and special order items may not be returnable. All
              returns must include original packaging and documentation.
            </p>
            <p>
              Refunds will be processed to the original payment method within
              7-10 business days after we receive and inspect the returned item.
              Shipping costs are non-refundable unless the return is due to our
              error.
            </p>
          </div>
        </section>

        {/* Warranties */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Warranties and Disclaimers
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>
              Products sold by SpearCar may be covered by manufacturer
              warranties. We are not responsible for warranty claims, which must
              be directed to the manufacturer.
            </p>
            <p className="uppercase font-semibold">
              Our services and products are provided "as is" without warranties
              of any kind, either express or implied. We disclaim all
              warranties, including merchantability, fitness for a particular
              purpose, and non-infringement.
            </p>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To the fullest extent permitted by law, SpearCar shall not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages arising from your use of our services or purchase of
            products. Our total liability shall not exceed the amount you paid
            for the specific product or service giving rise to the claim.
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Intellectual Property
          </h2>
          <p className="text-gray-700 leading-relaxed">
            All content on the SpearCar website, including text, graphics,
            logos, images, and software, is the property of SpearCar or its
            licensors and is protected by copyright and trademark laws. You may
            not reproduce, distribute, or create derivative works without our
            express written permission.
          </p>
        </section>

        {/* User Conduct */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            User Conduct
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use our services for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt our services</li>
              <li>Transmit viruses, malware, or harmful code</li>
              <li>Impersonate any person or entity</li>
              <li>Collect user information without consent</li>
              <li>
                Use automated systems to access our website without permission
              </li>
            </ul>
          </div>
        </section>

        {/* Dispute Resolution */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Dispute Resolution
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Any disputes arising from these terms or your use of our services
            shall be resolved through binding arbitration in accordance with the
            rules of the American Arbitration Association. You waive your right
            to participate in class action lawsuits or class-wide arbitration.
          </p>
        </section>

        {/* Modifications */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Modifications to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these Terms of Service at any time.
            Changes will be effective immediately upon posting to the website.
            Your continued use of our services after changes constitutes
            acceptance of the modified terms.
          </p>
        </section>

        {/* Termination */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Termination
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may terminate or suspend your account and access to our services
            immediately, without prior notice, for any reason, including breach
            of these terms. Upon termination, your right to use our services
            will cease immediately.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Governing Law
          </h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms of Service shall be governed by and construed in
            accordance with the laws of the State of Michigan, United States,
            without regard to its conflict of law provisions.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ff6b35" }}>
            Contact Information
          </h2>
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-3">
              If you have questions about these Terms of Service, please contact
              us:
            </p>
            <div className="space-y-2">
              <p>Email: support@spearcar.com</p>
              <p>Phone: +20 (155) 084-4370</p>
              <p>Address: 123 Auto Parts Avenue, Detroit, MI 48201</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
