import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, MapPin, Loader2, Navigation } from "lucide-react";

// مكون MapPicker مع تحديد الموقع الحالي
const MapPicker = ({ location, onLocationChange }) => {
  const [markerPosition, setMarkerPosition] = useState(location);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);

    if (!navigator.geolocation) {
      alert("المتصفح لا يدعم تحديد الموقع الجغرافي");
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMarkerPosition(newLocation);
        onLocationChange(newLocation);
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error("خطأ في تحديد الموقع:", error);
        alert(
          "لم نتمكن من تحديد موقعك. الرجاء التأكد من السماح بالوصول للموقع"
        );
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="space-y-3">
      <div className="relative mt-20 w-full h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg border-2 border-gray-300 overflow-hidden shadow-md">
        <div className="absolute inset-0 opacity-20">
          {[...Array(10)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full border-t border-gray-400"
              style={{ top: `${i * 10}%` }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full border-l border-gray-400"
              style={{ left: `${i * 10}%` }}
            />
          ))}
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <MapPin
            className="h-12 w-12 text-red-600 drop-shadow-lg animate-bounce"
            fill="currentColor"
          />
        </div>

        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <Button
            type="button"
            onClick={getCurrentLocation}
            disabled={isLoadingLocation}
            className="bg-white/95 text-gray-800 hover:bg-white shadow-lg">
            {isLoadingLocation ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري تحديد الموقع...
              </>
            ) : (
              <>
                <Navigation className="ml-2 h-4 w-4" />
                استخدم موقعي الحالي
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex gap-4 text-sm text-gray-600">
        <div className="flex-1 bg-gray-50 p-3 rounded-lg">
          <span className="font-semibold">خط العرض:</span>{" "}
          {markerPosition.lat.toFixed(6)}
        </div>
        <div className="flex-1 bg-gray-50 p-3 rounded-lg">
          <span className="font-semibold">خط الطول:</span>{" "}
          {markerPosition.lng.toFixed(6)}
        </div>
      </div>
    </div>
  );
};

const RequestMechanic = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleBrand: "",
    year: "",
    problemType: "",
    problemDescription: "",
    location: { lat: 24.7136, lng: 46.6753 },
    customerName: "",
    customerPhone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // التحقق من الحقول المطلوبة
    if (
      !formData.vehicleType ||
      !formData.vehicleBrand ||
      !formData.year ||
      !formData.problemType ||
      !formData.customerName ||
      !formData.customerPhone
    ) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // محاكاة إرسال البيانات
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockOrderId = Math.random().toString(36).substring(7);

      toast({
        title: "تم إرسال الطلب بنجاح! ✓",
        description: "جاري البحث عن أقرب ميكانيكي لك...",
      });

      // الانتقال لصفحة التتبع
      setTimeout(() => {
        navigate(`/track/${mockOrderId}`, {
          state: { orderData: formData },
        });
      }, 1500);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إرسال الطلب. الرجاء المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowRight className="ml-2 h-4 w-4" />
          العودة للرئيسية
        </Button>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              طلب ميكانيكي متنقل
            </CardTitle>
            <CardDescription className="text-center text-lg">
              املأ البيانات التالية وسنرسل لك أقرب فني
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* معلومات العميل */}
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-lg text-blue-900">
                  معلومات العميل
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="customerName" className="text-base">
                    الاسم *
                  </Label>
                  <Input
                    id="customerName"
                    type="text"
                    placeholder="أدخل اسمك الكامل"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerPhone" className="text-base">
                    رقم الجوال *
                  </Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    placeholder="05xxxxxxxx"
                    value={formData.customerPhone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customerPhone: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              {/* معلومات السيارة */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-900">
                  معلومات السيارة
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="vehicleType" className="text-base">
                    نوع السيارة *
                  </Label>
                  <Select
                    value={formData.vehicleType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, vehicleType: value })
                    }
                    required>
                    <SelectTrigger id="vehicleType">
                      <SelectValue placeholder="اختر نوع السيارة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">سيدان</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="truck">شاحنة</SelectItem>
                      <SelectItem value="van">فان</SelectItem>
                      <SelectItem value="sports">رياضية</SelectItem>
                      <SelectItem value="hatchback">هاتشباك</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleBrand" className="text-base">
                    ماركة السيارة *
                  </Label>
                  <Input
                    id="vehicleBrand"
                    type="text"
                    placeholder="مثال: تويوتا، هوندا، مرسيدس..."
                    value={formData.vehicleBrand}
                    onChange={(e) =>
                      setFormData({ ...formData, vehicleBrand: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year" className="text-base">
                    سنة الصنع *
                  </Label>
                  <Input
                    id="year"
                    type="number"
                    placeholder="مثال: 2020"
                    min="1990"
                    max={new Date().getFullYear()}
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* معلومات المشكلة */}
              <div className="space-y-4 p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-lg text-orange-900">
                  وصف المشكلة
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="problemType" className="text-base">
                    نوع المشكلة *
                  </Label>
                  <Select
                    value={formData.problemType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, problemType: value })
                    }
                    required>
                    <SelectTrigger id="problemType">
                      <SelectValue placeholder="اختر نوع المشكلة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="battery">بطارية فارغة</SelectItem>
                      <SelectItem value="tire">إطار مثقوب</SelectItem>
                      <SelectItem value="engine">مشكلة في المحرك</SelectItem>
                      <SelectItem value="brakes">مشكلة في الفرامل</SelectItem>
                      <SelectItem value="electrical">مشكلة كهربائية</SelectItem>
                      <SelectItem value="oil">تغيير زيت</SelectItem>
                      <SelectItem value="coolant">نقص ماء الرديتر</SelectItem>
                      <SelectItem value="fuel">مشكلة في الوقود</SelectItem>
                      <SelectItem value="other">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="problemDescription" className="text-base">
                    وصف تفصيلي للمشكلة (اختياري)
                  </Label>
                  <Textarea
                    id="problemDescription"
                    placeholder="اكتب تفاصيل إضافية عن المشكلة لمساعدة الميكانيكي..."
                    rows={4}
                    value={formData.problemDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        problemDescription: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* الموقع */}
              <div className="space-y-2">
                <Label className="text-lg flex items-center">
                  <MapPin className="ml-2 h-5 w-5" />
                  حدد موقعك الحالي *
                </Label>
                <MapPicker
                  location={formData.location}
                  onLocationChange={(location) =>
                    setFormData({ ...formData, location })
                  }
                />
              </div>

              {/* زر الإرسال */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full text-xl py-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
                {isSubmitting ? (
                  <>
                    <Loader2 className="ml-2 h-6 w-6 animate-spin" />
                    جاري إرسال الطلب...
                  </>
                ) : (
                  "إرسال الطلب"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RequestMechanic;
