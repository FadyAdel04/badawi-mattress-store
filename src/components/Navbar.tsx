import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Check if user is admin
    const adminAuth = localStorage.getItem("adminAuthenticated");
    setIsAdmin(adminAuth === "true");
  }, []);
  return <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-badawi-blue">معرض ال 
بدوي للمراتب</span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-6 space-x-reverse">
            <Link to="/" className="text-gray-700 hover:text-badawi-blue px-3 py-2 text-lg font-medium transition-colors">الرئيسية</Link>
            <Link to="/about" className="text-gray-700 hover:text-badawi-blue px-3 py-2 text-lg font-medium transition-colors">من نحن</Link>
            <Link to="/products" className="text-gray-700 hover:text-badawi-blue px-3 py-2 text-lg font-medium transition-colors">منتجاتنا</Link>
            <Link to="/contact" className="text-gray-700 hover:text-badawi-blue px-3 py-2 text-lg font-medium transition-colors">تواصل معنا</Link>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700 hover:text-badawi-blue">
                  <User className="h-6 w-6" />
                  <span className="sr-only">لوحة الإدارة</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isAdmin ? <>
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      لوحة الإدارة
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                  localStorage.removeItem("adminAuthenticated");
                  setIsAdmin(false);
                  navigate("/");
                }}>
                      تسجيل الخروج
                    </DropdownMenuItem>
                  </> : <DropdownMenuItem onClick={() => navigate("/admin/login")}>
                    تسجيل الدخول كمدير
                  </DropdownMenuItem>}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="القائمة الرئيسية">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-700 hover:text-badawi-blue block px-3 py-2 text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              الرئيسية
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-badawi-blue block px-3 py-2 text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              من نحن
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-badawi-blue block px-3 py-2 text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              منتجاتنا
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-badawi-blue block px-3 py-2 text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              تواصل معنا
            </Link>
          </div>
        </div>}
    </nav>;
};
export default Navbar;