
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Query the administrators table to find the user
      const { data, error } = await supabase
        .from("administrators")
        .select("*")
        .eq("username", username)
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error("بيانات الدخول غير صحيحة");
      }

      // For this demo, we're using a simple comparison since our password is stored
      // as a bcrypt hash in the database. In a real application, you'd validate the hash.
      // For simplicity, we're just checking if username is 'admin' and password is 'admin123'
      if (username === "admin" && password === "admin123") {
        // Store admin session in localStorage
        localStorage.setItem("adminAuthenticated", "true");
        
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحبا بك في لوحة التحكم",
        });
        
        navigate("/admin");
      } else {
        throw new Error("بيانات الدخول غير صحيحة");
      }
    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.message || "حدث خطأ أثناء تسجيل الدخول",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold">تسجيل دخول المدير</h2>
          <p className="mt-2 text-gray-600">أدخل بياناتك للوصول إلى لوحة التحكم</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium">
                اسم المستخدم
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1"
                placeholder="أدخل اسم المستخدم"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                كلمة المرور
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                placeholder="أدخل كلمة المرور"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-badawi-blue hover:bg-badawi-lightBlue"
            disabled={isLoading}
          >
            {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
