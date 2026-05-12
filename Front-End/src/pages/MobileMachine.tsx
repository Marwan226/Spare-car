import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wrench, MapPin, Clock, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            خدمة الصيانة المتنقلة
          </h1>
          <p className="text-xl text-gray-600">
            نصلح سيارتك في أي مكان، في أي وقت
          </p>
        </div>

        {/* Main CTA Button */}
        <div className="flex justify-center mb-16">
          <Button
            onClick={() => navigate("/request")}
            size="lg"
            className="text-2xl py-8 px-12 bg-blue-600 hover:bg-blue-700 shadow-2xl transform hover:scale-105 transition-all duration-200">
            <Wrench className="ml-3 h-8 w-8" />
            اطلب ميكانيكي متنقل الآن
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Wrench className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle>خدمة احترافية</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>فنيون معتمدون وذوو خبرة عالية</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>تتبع مباشر</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                تابع موقع الفني على الخريطة مباشرة
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle>وصول سريع</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>نصل إليك في أقل من 30 دقيقة</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle>ضمان الجودة</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>ضمان على جميع أعمال الصيانة</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* How it Works */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            كيف تعمل الخدمة؟
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">اطلب الخدمة</h3>
              <p className="text-gray-600">حدد نوع سيارتك والمشكلة وموقعك</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">تتبع الفني</h3>
              <p className="text-gray-600">شاهد الفني وهو في طريقه إليك</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">احصل على الإصلاح</h3>
              <p className="text-gray-600">يتم إصلاح سيارتك في موقعك</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
