import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  Shield,
  LogOut,
  UserCircle,
  Package,
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

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("❌ No token found, redirecting to register");
          navigate("/register");
          return;
        }

        console.log(
          "🔍 Fetching user data with token:",
          token.substring(0, 20) + "..."
        );

        const response = await fetch(`${API_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("📥 Response:", data);

        if (data.success) {
          setUser(data.user);
          // Save user to localStorage for Profile page
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log("✅ User data loaded:", data.user.email);
        } else {
          throw new Error(data.message || "Failed to load user data");
        }
      } catch (error: any) {
        console.error("❌ Error fetching user:", error);
        setError(error.message);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setTimeout(() => navigate("/register"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/register");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
            <div
              className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin mx-auto"
              style={{ animationDirection: "reverse", animationDuration: "1s" }}
            />
          </div>
          <p className="text-gray-700 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Occurred
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/register")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
            Back to Register
          </button>
        </div>
      </div>
    );
  }

  if (!user) return null;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Bar */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SC</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SpareCar Dashboard
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-all shadow-md hover:shadow-lg">
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="flex items-center gap-6">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-24 h-24 rounded-full border-4 border-blue-100 shadow-lg object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {user.displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome back, {user.displayName}! 👋
                </h2>
                <p className="text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
                    ✓ Account Active
                  </span>
                </div>
              </div>
            </div>
            <Link
              to="/profile"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl">
              <UserCircle className="w-5 h-5" />
              <span className="font-medium">View Full Profile</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <StatsCard
            icon={<User className="w-6 h-6" />}
            label="Account Status"
            value="Verified"
            color="from-green-500 to-emerald-500"
          />
          <StatsCard
            icon={<Shield className="w-6 h-6" />}
            label="Security Level"
            value="High"
            color="from-blue-500 to-cyan-500"
          />
          <StatsCard
            icon={<Package className="w-6 h-6" />}
            label="Total Orders"
            value="0"
            color="from-purple-500 to-pink-500"
          />
        </div>

        {/* Info Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Account Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Account Information
              </h3>
            </div>
            <div className="space-y-4">
              <InfoRow
                icon={<User className="w-5 h-5 text-gray-500" />}
                label="Full Name"
                value={user.displayName}
              />
              <InfoRow
                icon={<Mail className="w-5 h-5 text-gray-500" />}
                label="Email Address"
                value={user.email}
              />
              <InfoRow
                icon={<Shield className="w-5 h-5 text-gray-500" />}
                label="Authentication Method"
                value={`${getProviderIcon(user.provider)} ${getProviderName(
                  user.provider
                )}`}
              />
              {user.phone && (
                <InfoRow
                  icon={<span className="text-gray-500">📱</span>}
                  label="Phone Number"
                  value={user.phone}
                />
              )}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Activity Timeline
              </h3>
            </div>
            <div className="space-y-4">
              <InfoRow
                icon={<Calendar className="w-5 h-5 text-gray-500" />}
                label="Account Created"
                value={new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              />
              {user.lastLogin && (
                <InfoRow
                  icon={<Calendar className="w-5 h-5 text-gray-500" />}
                  label="Last Login"
                  value={new Date(user.lastLogin).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
              )}
              <InfoRow
                icon={<span className="text-gray-500">🆔</span>}
                label="User ID"
                value={user._id.substring(0, 12) + "..."}
              />
            </div>
          </div>
        </div>

        {/* Success Banner */}
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-800 mb-1">
                ✅ Account Successfully Created!
              </h3>
              <p className="text-green-700">
                Your account has been securely created and all your data is
                safely stored in our database. You can now access all features
                of SpareCar platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stats Card Component
function StatsCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
      <div
        className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <p className="text-gray-600 text-sm font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}

// Info Row Component
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-gray-600 font-medium">{label}</span>
      </div>
      <span className="text-gray-800 font-semibold text-right max-w-[60%] break-words">
        {value}
      </span>
    </div>
  );
}
