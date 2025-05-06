
import { MapPin, Phone, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ContactInfo = () => {
  return (
    <section className="section bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">تواصل معنا</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            نحن هنا لمساعدتك في اختيار المرتبة المناسبة لك. لا تتردد في التواصل معنا
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="mx-auto w-12 h-12 bg-badawi-beige rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-badawi-blue" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">العنوان</h3>
              <p className="text-gray-600">
                اسيوط المعلمين القديمة ش العطيفى بجوار مستشفى العطيفى التخصصى
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="mx-auto w-12 h-12 bg-badawi-beige rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-badawi-blue" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">رقم الهاتف</h3>
              <p className="text-gray-600">
                01015386379
              </p>
              <p className="text-gray-600 mt-2">
                اتصل بنا لأي استفسار أو لحجز طلبك
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="mx-auto w-12 h-12 bg-badawi-beige rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-badawi-blue" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">مواعيد العمل</h3>
              <p className="text-gray-600">
                يومياً من 9 ص حتى 11 م   <br ></br>ماعدا 
                الجمعه من 5 م حتى 12 م
              </p>
              <p className="text-gray-600 mt-2">
                نعمل طوال أيام الأسبوع لخدمتكم
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
