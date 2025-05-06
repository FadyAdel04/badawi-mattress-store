import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  sizes: string[];
}

// Map category IDs to display names
const categoryMap: Record<string, string> = {
  "medical": "مراتب طبية",
  "spring": "مراتب سوست",
  "furniture": "مفروشات",
  "custom": "مقاسات خاصة",
};

// Map display names back to IDs
const reverseCategoryMap: Record<string, string> = {
  "مراتب طبية": "medical",
  "مراتب سوست": "spring",
  "مفروشات": "furniture",
  "مقاسات خاصة": "custom",
};

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [currentCategory, setCurrentCategory] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && categoryMap[categoryParam]) {
      setCurrentCategory(categoryParam);
    }
    
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // Fetch products from Supabase
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("id, name, category, price");
        
      if (productsError) throw productsError;

      const categoryParam = searchParams.get("category");
      let filteredProducts = productsData || [];
      
      // Filter by category if specified
      if (categoryParam && categoryMap[categoryParam]) {
        filteredProducts = filteredProducts.filter(
          (p) => p.category === categoryMap[categoryParam]
        );
      }

      // Fetch product sizes and images for each product
      const productsWithSizes = await Promise.all(
        filteredProducts.map(async (product) => {
          const { data: sizesData, error: sizesError } = await supabase
            .from("product_sizes")
            .select("size")
            .eq("product_id", product.id);
            
          if (sizesError) throw sizesError;

          // Fetch primary image for the product
          const { data: imagesData, error: imagesError } = await supabase
            .from("product_images")
            .select("image_url")
            .eq("product_id", product.id)
            .order("is_primary", { ascending: false })
            .limit(1);
            
          if (imagesError) throw imagesError;

          return {
            ...product,
            sizes: sizesData?.map((s: any) => s.size) || [],
            imageUrl: imagesData && imagesData.length > 0 
              ? imagesData[0].image_url 
              : "https://images.unsplash.com/photo-1631049552240-59c37f38802b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          };
        })
      );

      setProducts(productsWithSizes);
    } catch (error: any) {
      toast({
        title: "خطأ في تحميل المنتجات",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (value: string) => {
    setCurrentCategory(value);
  };

  const displayedProducts = currentCategory === "all" 
    ? products 
    : products.filter(product => product.category === categoryMap[currentCategory]);

  const categories = ["all", "medical", "spring", "furniture", "custom"];

  const handleWhatsAppClick = () => {
    const phoneNumber = "+201015386379";
    const message = "مرحباً، أنا مهتم بالاستفسار عن المراتب والمقاسات الخاصة لديكم";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-badawi-beige py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">منتجاتنا</h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                تشكيلة واسعة من المراتب الطبية ومراتب السوست والمفروشات بأعلى جودة
              </p>
            </div>
          </div>
        </div>
        
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Tabs 
                value={currentCategory}
                onValueChange={handleCategoryChange}
                className="w-full"
              >
                <TabsList className="mb-6 flex flex-wrap justify-center gap-2">
                  <TabsTrigger value="all">الكل</TabsTrigger>
                  <TabsTrigger value="medical">مراتب طبية</TabsTrigger>
                  <TabsTrigger value="spring">مراتب سوست</TabsTrigger>
                  <TabsTrigger value="furniture">مفروشات</TabsTrigger>
                  <TabsTrigger value="custom">مقاسات خاصة</TabsTrigger>
                </TabsList>
                
                {isLoading ? (
                  <div className="text-center py-20">
                    <p className="text-xl">جاري تحميل المنتجات...</p>
                  </div>
                ) : (
                  <>
                    <TabsContent value="all" className="mt-0">
                      {products.length === 0 ? (
                        <div className="text-center py-20">
                          <p className="text-xl">لا توجد منتجات حالياً</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                          ))}
                        </div>
                      )}
                    </TabsContent>
                    
                    {categories.slice(1).map((category) => (
                      <TabsContent key={category} value={category} className="mt-0">
                        {displayedProducts.filter(p => p.category === categoryMap[category]).length === 0 ? (
                          <div className="text-center py-20">
                            <p className="text-xl">لا توجد منتجات في هذه الفئة</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {displayedProducts
                              .filter(p => p.category === categoryMap[category])
                              .map((product) => (
                                <ProductCard key={product.id} product={product} />
                              ))}
                          </div>
                        )}
                      </TabsContent>
                    ))}
                  </>
                )}
              </Tabs>
            </div>
            
            <div className="text-center mt-12">
              <div className="bg-badawi-beige p-6 rounded-lg max-w-3xl mx-auto">
                <h3 className="text-xl font-bold mb-4">هل تبحث عن مقاس خاص؟</h3>
                <p className="mb-4">
                  نوفر خدمة تصنيع المراتب بمقاسات خاصة حسب طلبك. اتصل بنا لمزيد من التفاصيل!
                </p>
                <Button 
                  onClick={handleWhatsAppClick}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  تواصل معنا عبر واتساب
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
