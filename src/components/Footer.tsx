import { MapPin, Phone, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-badawi-blue text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">معرض البدوي للمراتب</h3>
            <p className="mb-4">
              متخصصون في المراتب الطبية والمفروشات منذ عام 2015
            </p>
            <div className="flex items-center space-x-4 space-x-reverse mb-2">
              <MapPin className="h-5 w-5" />
              <span>
                {" "}
                اسيوط المعلمين القديمة ش العطيفى بجوار مستشفى العطيفى التخصصى
              </span>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse mb-2">
              <Phone className="h-5 w-5" />
              <span>01015386379</span>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Clock className="h-5 w-5" />
              <span>
                {" "}
                يومياً من 9 ص حتى 11 م <br></br>ماعدا الجمعه من 5 م حتى 12 م
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="hover:text-badawi-gold transition-colors"
                >
                  الرئيسية
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-badawi-gold transition-colors"
                >
                  من نحن
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="hover:text-badawi-gold transition-colors"
                >
                  منتجاتنا
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-badawi-gold transition-colors"
                >
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">فئات المنتجات</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/products?category=medical"
                  className="hover:text-badawi-gold transition-colors"
                >
                  مراتب طبية
                </a>
              </li>
              <li>
                <a
                  href="/products?category=spring"
                  className="hover:text-badawi-gold transition-colors"
                >
                  مراتب سوست
                </a>
              </li>
              <li>
                <a
                  href="/products?category=furniture"
                  className="hover:text-badawi-gold transition-colors"
                >
                  مفروشات
                </a>
              </li>
              <li>
                <a
                  href="/products?category=custom"
                  className="hover:text-badawi-gold transition-colors"
                >
                  مقاسات خاصة
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-badawi-lightBlue">
          <p className="text-center">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} - معرض البدوي
            للمراتب
          </p>
          <p className="text-center text-sm mt-2">
            تصميم وبرمجة:{" "}
            <a
              href="https://crafted-web-solutions.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 hover:underline"
            >
              Crafted Web Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
