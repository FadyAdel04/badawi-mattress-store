import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";

import about1 from "../../src/image/about1.jpeg";
import about2 from "../../src/image/about2.jpeg";
import about3 from "../../src/image/about3.jpeg";

const AboutPage = () => {
  const features = [
    "متخصصون منذ 2015 في المراتب الطبية والمفروشات",
    "نتعامل مع أكبر المصانع في مصر",
    "إمكانية تنفيذ المقاسات الخاصة حسب الطلب",
    "ضمان على جميع المنتجات",
    "خدمة توصيل للمنازل",
    "أسعار تنافسية",
    "جودة عالية",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-badawi-beige py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">من نحن</h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                نبذة عن معرض البدوي للمراتب والمفروشات
              </p>
            </div>
          </div>
        </div>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-5">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">قصتنا</h2>
                <p className="text-lg text-gray-700 mb-4">
                  تأسس معرض البدوي للمراتب عام 2015 على يد فريق متخصص في مجال
                  المراتب والمفروشات، بهدف تقديم منتجات عالية الجودة بأسعار
                  مناسبة.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  عبر السنوات، تمكنّا من بناء سمعة طيبة في السوق المصري، وأصبحنا
                  من المعارض الرائدة في مدينة أسيوط في مجال المراتب الطبية
                  ومراتب السوست والمفروشات.
                </p>
                <ul className="space-y-4 mb-8">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-badawi-blue flex-shrink-0 ml-2" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 lg:mt-0 lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={about2}
                      alt="معرض البدوي للمراتب"
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={about3}
                      alt="معرض البدوي للمراتب"
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden sm:col-span-2">
                    <img
                      src={about1}
                      alt="معرض البدوي للمراتب"
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">مهمتنا</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                في معرض البدوي للمراتب، نسعى جاهدين لتوفير منتجات عالية الجودة
                تلبي احتياجات عملائنا وتوفر لهم الراحة والدعم اللازم لنوم صحي
                ومريح.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-badawi-blue mb-3">
                  الجودة العالية
                </h3>
                <p className="text-gray-700">
                  نحرص على اختيار أفضل المواد والتصاميم لضمان جودة عالية
                  لمنتجاتنا
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-badawi-blue mb-3">
                  التنوع
                </h3>
                <p className="text-gray-700">
                  نوفر تشكيلة واسعة من المراتب والمفروشات لتناسب مختلف الأذواق
                  والاحتياجات
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-badawi-blue mb-3">
                  خدمة العملاء
                </h3>
                <p className="text-gray-700">
                  نقدم استشارات مجانية لمساعدة العملاء في اختيار المنتج المناسب
                  لهم
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
