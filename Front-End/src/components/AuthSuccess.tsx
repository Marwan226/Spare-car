import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Loader2, AlertTriangle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

type AuthStatus = "loading" | "success" | "error" | "warning";

interface UserData {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  provider: string;
}

export default function AuthSuccess() {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [message, setMessage] = useState("جاري معالجة البيانات...");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Get URL parameters
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const provider = params.get("provider");

        // Validate token
        if (!token) {
          setStatus("error");
          setMessage("لم يتم العثور على توكن المصادقة");
          redirectAfterDelay("/login");
          return;
        }

        // Validate token format (basic check)
        if (token.split(".").length !== 3) {
          setStatus("error");
          setMessage("توكن المصادقة غير صالح");
          redirectAfterDelay("/login");
          return;
        }

        setMessage("جاري التحقق من البيانات...");

        // Verify token with backend
        const response = await fetch(`${API_URL}/auth/verify`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`خطأ في الاتصال: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.user) {
          // Save authentication data
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(data.user));

          // Update state
          setUserData(data.user);
          setStatus("success");
          setMessage(
            `✅ مرحباً ${data.user.displayName}! تم تسجيل الدخول بنجاح`
          );

          // Start countdown
          startCountdown(() => {
            window.location.href = "/dashboard";
          });
        } else {
          throw new Error(data.message || "فشل التحقق من المستخدم");
        }
      } catch (error: any) {
        console.error("❌ Auth error:", error);

        // Clear any existing auth data
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setStatus("error");
        setMessage(
          error.message || "حدث خطأ أثناء المصادقة. يرجى المحاولة مرة أخرى."
        );
        redirectAfterDelay("/login");
      }
    };

    handleAuth();
  }, []);

  const redirectAfterDelay = (path: string) => {
    startCountdown(() => {
      window.location.href = path;
    });
  };

  const startCountdown = (callback: () => void) => {
    let count = 3;
    const interval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(interval);
        callback();
      }
    }, 1000);
  };

  const handleManualRedirect = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Loading State */}
        {status === "loading" && (
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              <Loader2 className="absolute inset-0 m-auto w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{message}</h2>
            <p className="text-gray-600">الرجاء الانتظار قليلاً...</p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}

        {/* Success State */}
        {status === "success" && (
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
              <CheckCircle2 className="absolute inset-0 m-auto w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              تم بنجاح! 🎉
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>

            {userData && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-3">
                  {userData.photoURL ? (
                    <img
                      src={userData.photoURL}
                      alt={userData.displayName}
                      className="w-12 h-12 rounded-full border-2 border-blue-500"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                      {userData.displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">
                      {userData.displayName}
                    </p>
                    <p className="text-sm text-gray-600">{userData.email}</p>
                    <p className="text-xs text-blue-600 capitalize">
                      via {userData.provider}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
              <span>سيتم التحويل خلال</span>
              <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold">
                {countdown}
              </span>
              <span>ثانية</span>
            </div>

            <button
              onClick={() => handleManualRedirect("/dashboard")}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              الانتقال الآن
            </button>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-red-100 rounded-full"></div>
              <XCircle className="absolute inset-0 m-auto w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              فشلت المصادقة
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-right">
                  <p className="text-red-800 font-medium mb-1">تأكد من:</p>
                  <ul className="text-red-700 space-y-1">
                    <li>• منح التطبيق الأذونات المطلوبة</li>
                    <li>• استخدام بريد إلكتروني صالح</li>
                    <li>• الاتصال بالإنترنت مستقر</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
              <span>إعادة التوجيه خلال</span>
              <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-full font-bold">
                {countdown}
              </span>
              <span>ثانية</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleManualRedirect("/login")}
                className="bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                تسجيل الدخول
              </button>
              <button
                onClick={() => handleManualRedirect("/register")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all">
                إنشاء حساب
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
