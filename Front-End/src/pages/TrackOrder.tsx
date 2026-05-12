import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle2,
  Navigation,
  Wrench,
  User,
  ArrowRight,
  Star,
} from "lucide-react";

const TrackOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData;

  const [orderStatus, setOrderStatus] = useState("searching");
  const [mechanicInfo, setMechanicInfo] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(15);

  // محاكاة تحديث حالة الطلب
  useEffect(() => {
    const statusFlow = [
      { status: "searching", time: 3000 },
      { status: "found", time: 2000 },
      { status: "on_way", time: 5000 },
      { status: "arrived", time: 0 },
    ];

    let currentStep = 0;

    const updateStatus = () => {
      if (currentStep < statusFlow.length) {
        const { status, time } = statusFlow[currentStep];
        setOrderStatus(status);

        if (status === "found") {
          // إضافة بيانات الميكانيكي
          setMechanicInfo({
            name: "أحمد محمد العتيبي",
            phone: "0501234567",
            rating: 4.8,
            completedJobs: 342,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad",
            location: { lat: 24.7136, lng: 46.6753 },
          });
        }

        if (time > 0) {
          currentStep++;
          setTimeout(updateStatus, time);
        }
      }
    };

    updateStatus();

    // تحديث الوقت المتوقع
    const timer = setInterval(() => {
      setEstimatedTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getStatusInfo = () => {
    switch (orderStatus) {
      case "searching":
        return {
          title: "جاري البحث عن ميكانيكي...",
          description: "نبحث عن أقرب ميكانيكي متاح في منطقتك",
          color: "bg-yellow-500",
          icon: <Navigation className="h-6 w-6 animate-spin" />,
        };
      case "found":
        return {
          title: "تم العثور على ميكانيكي!",
          description: "الميكانيكي قبل طلبك وسيصل إليك قريباً",
          color: "bg-blue-500",
          icon: <CheckCircle2 className="h-6 w-6" />,
        };
      case "on_way":
        return {
          title: "الميكانيكي في الطريق",
          description: `الوقت المتوقع للوصول: ${estimatedTime} دقيقة`,
          color: "bg-orange-500",
          icon: <Navigation className="h-6 w-6" />,
        };
      case "arrived":
        return {
          title: "وصل الميكانيكي!",
          description: "الميكانيكي وصل إلى موقعك",
          color: "bg-green-500",
          icon: <CheckCircle2 className="h-6 w-6" />,
        };
      default:
        return {
          title: "جاري المعالجة",
          description: "الرجاء الانتظار...",
          color: "bg-gray-500",
          icon: <Clock className="h-6 w-6" />,
        };
    }
  };

  const statusInfo = getStatusInfo();

  const handleCall = () => {
    if (mechanicInfo?.phone) {
      window.location.href = `tel:${mechanicInfo.phone}`;
    }
  };

  const handleMessage = () => {
    if (mechanicInfo?.phone) {
      window.open(
        `https://wa.me/966${mechanicInfo.phone.substring(1)}`,
        "_blank"
      );
    }
  };

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowRight className="ml-2 h-4 w-4" />
          العودة للرئيسية
        </Button>

        {/* حالة الطلب */}
        <Card className="shadow-xl mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">تتبع الطلب</CardTitle>
                <CardDescription>رقم الطلب: #{orderId}</CardDescription>
              </div>
              <Badge
                className={`${statusInfo.color} text-white text-lg px-4 py-2`}>
                {statusInfo.icon}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <h3 className="text-2xl font-bold mb-2">{statusInfo.title}</h3>
              <p className="text-gray-600 text-lg">{statusInfo.description}</p>
            </div>

            {/* مراحل الطلب */}
            <div className="flex justify-between items-center mt-8 relative">
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                <div
                  className={`h-full ${statusInfo.color} transition-all duration-500`}
                  style={{
                    width:
                      orderStatus === "searching"
                        ? "25%"
                        : orderStatus === "found"
                        ? "50%"
                        : orderStatus === "on_way"
                        ? "75%"
                        : "100%",
                  }}
                />
              </div>

              {[
                { status: "searching", label: "البحث", icon: Navigation },
                { status: "found", label: "تم العثور", icon: CheckCircle2 },
                { status: "on_way", label: "في الطريق", icon: Navigation },
                { status: "arrived", label: "وصل", icon: CheckCircle2 },
              ].map(({ status, label, icon: Icon }, index) => (
                <div
                  key={status}
                  className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      orderStatus === status ||
                      (orderStatus === "on_way" && index <= 2) ||
                      (orderStatus === "arrived" && index <= 3)
                        ? statusInfo.color
                        : "bg-gray-300"
                    } text-white transition-all duration-300`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs mt-2 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* معلومات الميكانيكي */}
        {mechanicInfo && (
          <Card className="shadow-xl mb-6">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Wrench className="ml-2 h-6 w-6" />
                معلومات الميكانيكي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={mechanicInfo.avatar}
                    alt={mechanicInfo.name}
                  />
                  <AvatarFallback>
                    <User className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">
                    {mechanicInfo.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="mr-1 font-semibold">
                        {mechanicInfo.rating}
                      </span>
                    </div>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-600">
                      {mechanicInfo.completedJobs} عملية مكتملة
                    </span>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <Button
                      onClick={handleCall}
                      className="flex-1 bg-green-600 hover:bg-green-700">
                      <Phone className="ml-2 h-4 w-4" />
                      اتصال هاتفي
                    </Button>
                    <Button
                      onClick={handleMessage}
                      className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <MessageSquare className="ml-2 h-4 w-4" />
                      واتساب
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* معلومات الطلب */}
        {orderData && (
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl">تفاصيل الطلب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">نوع السيارة</p>
                  <p className="font-semibold">{orderData.vehicleType}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">ماركة السيارة</p>
                  <p className="font-semibold">{orderData.vehicleBrand}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">سنة الصنع</p>
                  <p className="font-semibold">{orderData.year}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">نوع المشكلة</p>
                  <p className="font-semibold">{orderData.problemType}</p>
                </div>
              </div>

              {orderData.problemDescription && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">وصف المشكلة</p>
                  <p className="font-semibold">
                    {orderData.problemDescription}
                  </p>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <MapPin className="ml-2 h-5 w-5 text-blue-600" />
                  <p className="text-sm text-gray-600">الموقع</p>
                </div>
                <p className="font-semibold text-sm">
                  خط العرض: {orderData.location.lat.toFixed(6)}
                </p>
                <p className="font-semibold text-sm">
                  خط الطول: {orderData.location.lng.toFixed(6)}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
