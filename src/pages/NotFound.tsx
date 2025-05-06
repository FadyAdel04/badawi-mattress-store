import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full text-center bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              الصفحة غير موجودة
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              عذرًا، الصفحة التي تبحث عنها غير موجودة في معرض ال بدوى
            </p>

            <div className="mb-8 p-4 bg-gray-100 rounded-lg text-right">
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                عن معرض ال بدوى
              </h3>
              <p className="text-gray-700">
                في معرض البدوي للمراتب، نسعى جاهدين لتوفير منتجات عالية الجودة
                تلبي احتياجات عملائنا وتوفر لهم الراحة والدعم اللازم لنوم صحي
                ومريح.
              </p>
            </div>

            <a
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
            >
              العودة إلى الصفحة الرئيسية
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
