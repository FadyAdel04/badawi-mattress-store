
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-badawi-blue text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">معرض البدوي للمراتب</h3>
            <p className="mb-4">متخصصون في المراتب الطبية والمفروشات منذ عام 2015</p>
            <div className="flex items-center space-x-4 space-x-reverse mb-2">
              <MapPin className="h-5 w-5" />
              <span>أبو حماد – السوق العربي – بجوار الشناوي للملابس</span>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse mb-2">
              <Phone className="h-5 w-5" />
              <span>01063352583</span>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Clock className="h-5 w-5" />
              <span>يومياً من 9 ص حتى 11 م</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-badawi-gold transition-colors">الرئيسية</Link></li>
              <li><Link to="/about" className="hover:text-badawi-gold transition-colors">من نحن</Link></li>
              <li><Link to="/products" className="hover:text-badawi-gold transition-colors">منتجاتنا</Link></li>
              <li><Link to="/contact" className="hover:text-badawi-gold transition-colors">تواصل معنا</Link></li>
              <li><Link to="/admin" className="hover:text-badawi-gold transition-colors">لوحة الإدارة</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">فئات المنتجات</h3>
            <ul className="space-y-2">
              <li><Link to="/products?category=مراتب طبية" className="hover:text-badawi-gold transition-colors">مراتب طبية</Link></li>
              <li><Link to="/products?category=مراتب سوست" className="hover:text-badawi-gold transition-colors">مراتب سوست</Link></li>
              <li><Link to="/products?category=مفروشات" className="hover:text-badawi-gold transition-colors">مفروشات</Link></li>
              <li><Link to="/products?category=مقاسات خاصة" className="hover:text-badawi-gold transition-colors">مقاسات خاصة</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-badawi-lightBlue">
          <p className="text-center">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} - معرض البدوي للمراتب
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
