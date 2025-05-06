import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
const About = () => {
  const features = ["متخصصون منذ 2015 في المراتب الطبية والمفروشات", "نتعامل مع أكبر المصانع في مصر", "إمكانية تنفيذ المقاسات الخاصة حسب الطلب", "ضمان على جميع المنتجات", "خدمة توصيل للمنازل"];
  return <section className="section bg-badawi-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">من نحن</h2>
            <p className="text-lg text-gray-700 mb-6">
              معرض البدوي للمراتب متخصص في تقديم أفضل أنواع المراتب الطبية ومراتب السوست والمفروشات بأعلى جودة وأسعار تنافسية.
            </p>
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-badawi-blue flex-shrink-0 ml-2" />
                  <span className="text-gray-700">{feature}</span>
                </li>)}
            </ul>
            <Link to="/about">
              <Button className="bg-badawi-blue hover:bg-badawi-lightBlue px-6 py-2">
                اقرأ المزيد عنا
              </Button>
            </Link>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-7">
            <div className="relative">
              <div className="aspect-w-5 aspect-h-3 rounded-lg overflow-hidden">
                <img alt="معرض البدوي للمراتب" className="w-full h-full object-center object-cover" src="/lovable-uploads/4e575203-f9bf-4567-9d50-6fe668d05cc1.jpg" />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;