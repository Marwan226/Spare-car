import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Package,
  Mail,
  Calendar,
  Shield,
  ArrowLeft,
  Edit,
  X,
  Save,
  Phone,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface UserData {
  _id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  provider: string;
  phone?: string;
  createdAt: string;
  lastLogin?: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/register");
          return;
        }

        const response = await fetch(`${API_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
          // Initialize edit form with current user data
          setEditForm({
            displayName: data.user.displayName || "",
            phone: data.user.phone || "",
            address: data.user.address || {
              street: "",
              city: "",
              state: "",
              zipCode: "",
              country: "",
            },
          });
        } else {
          navigate("/register");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/register");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setEditForm({
        ...editForm,
        address: {
          ...editForm.address,
          [addressField]: value,
        },
      });
    } else {
      setEditForm({
        ...editForm,
        [name]: value,
      });
    }
  };

  // Open edit modal
  const openEditModal = () => {
    setIsEditModalOpen(true);
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setErrorMessage(null);
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setSuccessMessage("✅ Profile updated successfully!");

        // Close modal after 2 seconds
        setTimeout(() => {
          setIsEditModalOpen(false);
          setSuccessMessage(null);
        }, 2000);
      } else {
        setErrorMessage(data.message || "Failed to update profile");
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setErrorMessage("Failed to connect to server");
    } finally {
      setIsSaving(false);
    }
  };

  // Mock order history
  const orders = [
    {
      id: "ORD-001",
      date: "2024-11-10",
      total: 159.98,
      status: "delivered",
      items: 2,
    },
    {
      id: "ORD-002",
      date: "2024-11-08",
      total: 89.99,
      status: "shipped",
      items: 1,
    },
    {
      id: "ORD-003",
      date: "2024-11-05",
      total: 234.97,
      status: "processing",
      items: 3,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500 hover:bg-green-600";
      case "shipped":
        return "bg-blue-500 hover:bg-blue-600";
      case "processing":
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "google":
        return "🔵";
      case "facebook":
        return "🔷";
      case "microsoft":
        return "🟦";
      default:
        return "📧";
    }
  };

  const getProviderName = (provider: string) => {
    switch (provider) {
      case "google":
        return "Google";
      case "facebook":
        return "Facebook";
      case "microsoft":
        return "Microsoft";
      default:
        return "Email/Password";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-3 font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              My Account
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your profile and view your order history
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-2 border-gray-100">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Profile Image */}
                <div className="flex flex-col items-center">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-28 h-28 rounded-full border-4 border-blue-100 shadow-lg object-cover mb-4"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-4">
                      {user.displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-800 text-center">
                    {user.displayName}
                  </h3>
                  <p className="text-sm text-gray-600 text-center mt-1">
                    {user.email}
                  </p>
                  <Badge className="mt-3 bg-green-500 hover:bg-green-600">
                    ✓ Verified Account
                  </Badge>
                </div>

                <Separator />

                {/* User Details */}
                <div className="space-y-4">
                  <InfoItem
                    icon={<Mail className="w-5 h-5 text-blue-600" />}
                    label="Email"
                    value={user.email}
                  />
                  <InfoItem
                    icon={<Shield className="w-5 h-5 text-green-600" />}
                    label="Auth Method"
                    value={`${getProviderIcon(user.provider)} ${getProviderName(
                      user.provider
                    )}`}
                  />
                  <InfoItem
                    icon={<Calendar className="w-5 h-5 text-purple-600" />}
                    label="Member Since"
                    value={new Date(user.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  />
                  {user.phone && (
                    <InfoItem
                      icon={<span className="text-xl">📱</span>}
                      label="Phone"
                      value={user.phone}
                    />
                  )}
                </div>

                <Separator />

                {/* Edit Profile Button */}
                <button
                  onClick={openEditModal}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-medium">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </CardContent>
            </Card>
          </div>

          {/* Order History */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-2 border-gray-100">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border-2 border-gray-100 rounded-xl p-5 hover:shadow-lg transition-all bg-white hover:border-blue-200">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-bold text-lg text-gray-800">
                              {order.id}
                            </p>
                            <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(order.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                          <Badge
                            className={`${getStatusColor(
                              order.status
                            )} text-white px-3 py-1`}>
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </Badge>
                        </div>
                        <Separator className="my-3" />
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Package className="w-4 h-4" />
                            <p className="text-sm font-medium">
                              {order.items} item{order.items !== 1 ? "s" : ""}
                            </p>
                          </div>
                          <p className="font-bold text-xl text-blue-600">
                            ${order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-medium">
                      No orders yet
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Start shopping to see your orders here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <StatCard
                label="Total Orders"
                value={orders.length.toString()}
                color="from-blue-500 to-cyan-500"
                icon="📦"
              />
              <StatCard
                label="Total Spent"
                value={`$${orders
                  .reduce((sum, order) => sum + order.total, 0)
                  .toFixed(2)}`}
                color="from-green-500 to-emerald-500"
                icon="💰"
              />
              <StatCard
                label="Rewards Points"
                value="125"
                color="from-purple-500 to-pink-500"
                icon="⭐"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <Edit className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Edit Profile</h2>
              </div>
              <button
                onClick={closeEditModal}
                className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Success/Error Messages */}
              {successMessage && (
                <div className="bg-green-50 border-2 border-green-200 text-green-800 p-4 rounded-lg flex items-center gap-2">
                  <span className="text-xl">✅</span>
                  <span className="font-medium">{successMessage}</span>
                </div>
              )}

              {errorMessage && (
                <div className="bg-red-50 border-2 border-red-200 text-red-800 p-4 rounded-lg flex items-center gap-2">
                  <span className="text-xl">❌</span>
                  <span className="font-medium">{errorMessage}</span>
                </div>
              )}

              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Basic Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      value={editForm.displayName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address (Read-only)
                    </label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-xl">🏠</span>
                  Address Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address.street"
                      value={editForm.address.street}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="address.city"
                        value={editForm.address.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="New York"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="address.state"
                        value={editForm.address.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="NY"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="address.zipCode"
                        value={editForm.address.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="10001"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        name="address.country"
                        value={editForm.address.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="United States"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-6 rounded-b-2xl flex gap-3 sticky bottom-0">
              <button
                onClick={closeEditModal}
                disabled={isSaving}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-medium disabled:opacity-50">
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-medium disabled:opacity-50">
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm text-gray-800 font-semibold mt-1 break-words">
          {value}
        </p>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string;
  color: string;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-gray-100 hover:shadow-xl transition-shadow">
      <div
        className={`w-10 h-10 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center text-white text-xl mb-3`}>
        {icon}
      </div>
      <p className="text-xs text-gray-600 font-medium uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
