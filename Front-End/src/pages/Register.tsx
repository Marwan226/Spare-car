import { useState } from "react";
// ❌ REMOVED: Firebase imports - we're using Node.js Backend now
// import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider, db } from "../config/firebase";

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
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaMicrosoft } from "react-icons/fa";

// ✅ ADDED: Backend API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setError(null);
  };

  // ✅ UPDATED: Now sends data to Backend instead of just showing message
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    setIsLoading(true);

    try {
      console.log("📤 Sending registration to:", `${API_URL}/auth/register`);

      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          displayName: formData.fullName,
        }),
      });

      const data = await response.json();
      console.log("📥 Response:", data);

      if (data.success) {
        // Save token to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setSuccessMessage(
          `✅ Account created successfully!\nName: ${formData.fullName}\nEmail: ${formData.email}`
        );

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error: any) {
      console.error("❌ Registration error:", error);
      setError("Failed to connect to server. Make sure Backend is running!");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ UPDATED: Now redirects to Backend OAuth instead of Firebase
  const handleSocialRegister = async (provider: string) => {
    setSocialLoading(provider);
    setSuccessMessage(null);
    setError(null);

    try {
      console.log(`🔵 Redirecting to ${provider} OAuth...`);
      console.log(`URL: ${API_URL}/auth/${provider}`);

      // ✅ NEW: Redirect to Backend OAuth endpoint
      // Backend will handle Google/Facebook/Microsoft OAuth
      // and redirect back with token
      window.location.href = `${API_URL}/auth/${provider}`;

      // ❌ OLD Firebase code (removed):
      // const result = await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error("❌ OAuth error:", error);
      setError(`Failed to authenticate with ${provider}`);
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-300">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">
            Create Account
          </CardTitle>
          <CardDescription className="text-center">
            Join SpareCar today and start your journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 whitespace-pre-line">
                {successMessage}
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="mb-6 bg-red-50 border-red-200">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-200 h-11 border-2"
              onClick={() => handleSocialRegister("google")}
              disabled={socialLoading !== null || isLoading}>
              {socialLoading === "google" ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              ) : (
                <FaGoogle />
              )}
              <span className="font-medium">Sign up with Google</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-3 hover:bg-blue-50 transition-all duration-200 h-11 border-2"
              onClick={() => handleSocialRegister("microsoft")}
              disabled={socialLoading !== null || isLoading}>
              {socialLoading === "microsoft" ? (
                <div className="w-5 h-5 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
              ) : (
                <FaMicrosoft style={{ width: "18px", height: "18px" }} />
              )}
              <span className="font-medium">Sign up with Microsoft</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-3 hover:bg-blue-50 transition-all duration-200 h-11 border-2"
              onClick={() => handleSocialRegister("facebook")}
              disabled={socialLoading !== null || isLoading}>
              {socialLoading === "facebook" ? (
                <div className="w-5 h-5 border-2 border-blue-300 border-t-blue-700 rounded-full animate-spin" />
              ) : (
                <FaFacebook className="text-xl" />
              )}
              <span className="font-medium">Sign up with Facebook</span>
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Or sign up with email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1.5"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 font-medium"
              disabled={isLoading || socialLoading !== null}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              By signing up, you agree to our{" "}
              <button className="text-blue-600 hover:underline">
                Terms of Service
              </button>{" "}
              and{" "}
              <button className="text-blue-600 hover:underline">
                Privacy Policy
              </button>
            </p>
          </div>

          <div className="mt-4 text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Debug Info */}
      {/* <div className="fixed bottom-4 right-4 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg max-w-xs">
        <div className="font-bold mb-1">🔧 Debug Info:</div>
        <div>Backend: {API_URL}</div>
        <div>Google: {API_URL}/auth/google</div>
      </div> */}
    </div>
  );
}
