import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, CreditCard, Lock, Shield } from "lucide-react";

const VisaIcon = () => (
  <svg className="w-12 h-8" viewBox="0 0 48 32">
    <rect width="48" height="32" rx="4" fill="#1A1F71" />
    <text
      x="24"
      y="20"
      textAnchor="middle"
      fill="white"
      fontSize="14"
      fontWeight="bold">
      VISA
    </text>
  </svg>
);

const MastercardIcon = () => (
  <svg className="w-12 h-8" viewBox="0 0 48 32">
    <rect width="48" height="32" rx="4" fill="#EB001B" />
    <circle cx="18" cy="16" r="8" fill="#FF5F00" opacity="0.8" />
    <circle cx="30" cy="16" r="8" fill="#F79E1B" opacity="0.8" />
  </svg>
);

const PayPalIcon = () => (
  <svg className="w-12 h-8" viewBox="0 0 48 32">
    <rect width="48" height="32" rx="4" fill="#003087" />
    <text
      x="24"
      y="20"
      textAnchor="middle"
      fill="#009CDE"
      fontSize="10"
      fontWeight="bold">
      PayPal
    </text>
  </svg>
);

const CashIcon = () => (
  <svg className="w-12 h-8" viewBox="0 0 48 32">
    <rect width="48" height="32" rx="4" fill="#10B981" />
    <text
      x="24"
      y="20"
      textAnchor="middle"
      fill="white"
      fontSize="9"
      fontWeight="bold">
      CASH
    </text>
  </svg>
);

const ApplePayIcon = () => (
  <svg className="w-12 h-8" viewBox="0 0 48 32">
    <rect width="48" height="32" rx="4" fill="black" />
    <text
      x="24"
      y="20"
      textAnchor="middle"
      fill="white"
      fontSize="10"
      fontWeight="bold">
      Apple Pay
    </text>
  </svg>
);

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  const [step, setStep] = useState("form");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [errors, setErrors] = useState({});

  const [shippingData, setShippingData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [paypalData, setPaypalData] = useState({ email: "", password: "" });
  const [applePayData, setApplePayData] = useState({
    appleId: "",
    password: "",
  });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) =>
    phone.length >= 10 && /^[\d\s\-+()]+$/.test(phone);
  const validateCardNumber = (number) => {
    const sanitized = number.replace(/\s/g, "");
    return /^\d{13,19}$/.test(sanitized);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const match = v.match(/\d{4,16}/g)?.[0] || "";
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    return v.length >= 2 ? v.slice(0, 2) + "/" + v.slice(2, 4) : v;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!shippingData.fullName.trim())
      newErrors.fullName = "Full name is required";
    if (!validateEmail(shippingData.email))
      newErrors.email = "Valid email is required";
    if (!validatePhone(shippingData.phone))
      newErrors.phone = "Valid phone number is required";
    if (!shippingData.address.trim()) newErrors.address = "Address is required";
    if (!shippingData.city.trim()) newErrors.city = "City is required";
    if (!shippingData.zipCode.trim())
      newErrors.zipCode = "ZIP code is required";

    if (paymentMethod === "card") {
      if (!validateCardNumber(cardData.cardNumber.replace(/\s/g, "")))
        newErrors.cardNumber = "Invalid card number";
      if (!cardData.cardName.trim())
        newErrors.cardName = "Cardholder name is required";
      if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate))
        newErrors.expiryDate = "Format: MM/YY";
      if (!/^\d{3,4}$/.test(cardData.cvv)) newErrors.cvv = "Invalid CVV";
    }

    if (paymentMethod === "paypal") {
      if (!validateEmail(paypalData.email))
        newErrors.paypalEmail = "Valid PayPal email is required";
      if (!paypalData.password.trim())
        newErrors.paypalPassword = "PayPal password is required";
    }

    if (paymentMethod === "applepay") {
      if (!validateEmail(applePayData.appleId))
        newErrors.appleId = "Valid Apple ID is required";
      if (!applePayData.password.trim())
        newErrors.applePassword = "Apple ID password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setStep("processing");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    clearCart();
    setStep("success");
  };

  if (step === "processing") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="py-12">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              <Shield className="absolute inset-0 m-auto w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Processing Payment</h2>
            <p className="text-gray-600 mb-4">
              Please wait while we securely process your payment via{" "}
              {paymentMethod === "card"
                ? "Credit Card"
                : paymentMethod === "paypal"
                ? "PayPal"
                : paymentMethod === "applepay"
                ? "Apple Pay"
                : "Cash on Delivery"}
              ...
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-green-600">
              <Lock className="w-4 h-4" />
              <span>256-bit SSL Encryption Active</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="py-12">
            <div className="text-center mb-8">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-green-100 rounded-full"></div>
                <CheckCircle2 className="absolute inset-0 m-auto w-16 h-16 text-green-600 animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold text-green-600 mb-2">
                Payment Successful!
              </h2>
              <p className="text-gray-600">
                Your order has been confirmed and is being processed
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6 border-2 border-green-200">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order Number</p>
                  <p className="font-mono font-bold">
                    #ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="font-mono font-bold">
                    TXN-{Math.random().toString(36).substr(2, 12).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-semibold capitalize">
                    {paymentMethod === "card"
                      ? "Credit Card"
                      : paymentMethod === "paypal"
                      ? "PayPal"
                      : paymentMethod === "applepay"
                      ? "Apple Pay"
                      : "Cash on Delivery"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount Paid</p>
                  <p className="font-bold text-green-600 text-lg">
                    ${total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">Order Details</p>
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between text-sm mb-1">
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Alert className="mb-6 bg-blue-50 border-blue-200">
              <AlertDescription className="text-blue-800">
                A confirmation email has been sent to{" "}
                <strong>{shippingData.email}</strong> with your order details
                and tracking information.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                View Order Details
              </Button>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => (window.location.href = "/products")}>
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br mt-14 from-gray-50 to-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Enter your shipping address</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={shippingData.fullName}
                    onChange={(e) =>
                      setShippingData({
                        ...shippingData,
                        fullName: e.target.value,
                      })
                    }
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={shippingData.email}
                    onChange={(e) =>
                      setShippingData({
                        ...shippingData,
                        email: e.target.value,
                      })
                    }
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="+1 234 567 8900"
                    value={shippingData.phone}
                    onChange={(e) =>
                      setShippingData({
                        ...shippingData,
                        phone: e.target.value,
                      })
                    }
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    value={shippingData.address}
                    onChange={(e) =>
                      setShippingData({
                        ...shippingData,
                        address: e.target.value,
                      })
                    }
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      value={shippingData.city}
                      onChange={(e) =>
                        setShippingData({
                          ...shippingData,
                          city: e.target.value,
                        })
                      }
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && (
                      <p className="text-sm text-red-500 mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      placeholder="12345"
                      value={shippingData.zipCode}
                      onChange={(e) =>
                        setShippingData({
                          ...shippingData,
                          zipCode: e.target.value,
                        })
                      }
                      className={errors.zipCode ? "border-red-500" : ""}
                    />
                    {errors.zipCode && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.zipCode}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  Payment Method
                </CardTitle>
                <CardDescription>
                  Choose your preferred payment method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  {[
                    {
                      id: "card",
                      label: "Credit / Debit Card",
                      icons: [
                        <VisaIcon key="visa" />,
                        <MastercardIcon key="mc" />,
                      ],
                    },
                    {
                      id: "paypal",
                      label: "PayPal",
                      icons: [<PayPalIcon key="pp" />],
                    },
                    {
                      id: "applepay",
                      label: "Apple Pay",
                      icons: [<ApplePayIcon key="ap" />],
                    },
                    {
                      id: "cash",
                      label: "Cash on Delivery",
                      icons: [<CashIcon key="cash" />],
                    },
                  ].map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        paymentMethod === method.id
                          ? "border-blue-500 bg-blue-50"
                          : "hover:border-blue-300"
                      }`}>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === method.id
                            ? "border-blue-500"
                            : "border-gray-300"
                        }`}>
                        {paymentMethod === method.id && (
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex gap-2">{method.icons}</div>
                        <span className="font-medium">{method.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.cardNumber}
                        onChange={(e) =>
                          setCardData({
                            ...cardData,
                            cardNumber: formatCardNumber(e.target.value),
                          })
                        }
                        maxLength={19}
                        className={errors.cardNumber ? "border-red-500" : ""}
                      />
                      {errors.cardNumber && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="cardName">Cardholder Name *</Label>
                      <Input
                        id="cardName"
                        placeholder="JOHN DOE"
                        value={cardData.cardName}
                        onChange={(e) =>
                          setCardData({
                            ...cardData,
                            cardName: e.target.value.toUpperCase(),
                          })
                        }
                        className={errors.cardName ? "border-red-500" : ""}
                      />
                      {errors.cardName && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.cardName}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={cardData.expiryDate}
                          onChange={(e) =>
                            setCardData({
                              ...cardData,
                              expiryDate: formatExpiryDate(e.target.value),
                            })
                          }
                          maxLength={5}
                          className={errors.expiryDate ? "border-red-500" : ""}
                        />
                        {errors.expiryDate && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.expiryDate}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          type="password"
                          placeholder="123"
                          value={cardData.cvv}
                          onChange={(e) =>
                            setCardData({
                              ...cardData,
                              cvv: e.target.value.replace(/\D/g, ""),
                            })
                          }
                          maxLength={4}
                          className={errors.cvv ? "border-red-500" : ""}
                        />
                        {errors.cvv && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.cvv}
                          </p>
                        )}
                      </div>
                    </div>

                    <Alert className="bg-blue-50 border-blue-200">
                      <Lock className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800 text-xs">
                        Your card information is encrypted and not stored on our
                        servers
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label htmlFor="paypalEmail">PayPal Email *</Label>
                      <Input
                        id="paypalEmail"
                        type="email"
                        placeholder="your-email@example.com"
                        value={paypalData.email}
                        onChange={(e) =>
                          setPaypalData({
                            ...paypalData,
                            email: e.target.value,
                          })
                        }
                        className={errors.paypalEmail ? "border-red-500" : ""}
                      />
                      {errors.paypalEmail && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.paypalEmail}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="paypalPassword">PayPal Password *</Label>
                      <Input
                        id="paypalPassword"
                        type="password"
                        placeholder="••••••••"
                        value={paypalData.password}
                        onChange={(e) =>
                          setPaypalData({
                            ...paypalData,
                            password: e.target.value,
                          })
                        }
                        className={
                          errors.paypalPassword ? "border-red-500" : ""
                        }
                      />
                      {errors.paypalPassword && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.paypalPassword}
                        </p>
                      )}
                    </div>
                    <Alert className="bg-blue-50 border-blue-200">
                      <Lock className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800 text-xs">
                        You will be redirected to PayPal to complete your
                        payment securely
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {paymentMethod === "applepay" && (
                  <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label htmlFor="appleId">Apple ID *</Label>
                      <Input
                        id="appleId"
                        type="email"
                        placeholder="your-apple-id@icloud.com"
                        value={applePayData.appleId}
                        onChange={(e) =>
                          setApplePayData({
                            ...applePayData,
                            appleId: e.target.value,
                          })
                        }
                        className={errors.appleId ? "border-red-500" : ""}
                      />
                      {errors.appleId && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.appleId}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="applePassword">Apple ID Password *</Label>
                      <Input
                        id="applePassword"
                        type="password"
                        placeholder="••••••••"
                        value={applePayData.password}
                        onChange={(e) =>
                          setApplePayData({
                            ...applePayData,
                            password: e.target.value,
                          })
                        }
                        className={errors.applePassword ? "border-red-500" : ""}
                      />
                      {errors.applePassword && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.applePassword}
                        </p>
                      )}
                    </div>
                    <Alert className="bg-blue-50 border-blue-200">
                      <Lock className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800 text-xs">
                        Apple Pay will be used to complete your payment securely
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {paymentMethod === "cash" && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <Alert className="bg-green-50 border-green-300">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <AlertDescription className="text-green-800">
                        <p className="font-semibold mb-2">Cash on Delivery</p>
                        <ul className="text-sm space-y-1 list-disc list-inside">
                          <li>Pay cash when you receive your order</li>
                          <li>
                            Please have the exact amount ready:{" "}
                            <strong>${total.toFixed(2)}</strong>
                          </li>
                          <li>You can inspect products before payment</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-blue-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full h-12 text-lg font-semibold"
                  size="lg">
                  <Lock className="w-5 h-5 mr-2" />
                  Complete Secure Payment
                </Button>

                <div className="text-center space-y-2 pt-4">
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>PCI DSS Compliant</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span>256-bit SSL Encryption</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
