
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample product data
const allProducts: Product[] = [
  {
    id: 1,
    name: "مرتبة طبية فاخرة",
    category: "مراتب طبية",
    price: 3500,
    imageUrl: "https://images.unsplash.com/photo-1631049552240-59c37f38802b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    sizes: ["90 × 190", "120 × 190", "150 × 190", "180 × 200"]
  },
  {
    id: 2,
    name: "مرتبة سوست مزدوجة",
    category: "مراتب سوست",
    price: 2800,
    imageUrl: "https://images.unsplash.com/photo-1600075110701-6ea93b9b5f70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    sizes: ["120 × 190", "150 × 190", "180 × 200"]
  },
  {
    id: 3,
    name: "مرتبة طبية مع وسادة داعمة",
    category: "مراتب طبية",
    price: 4200,
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    sizes: ["90 × 190", "120 × 190", "150 × 190", "180 × 200"]
  },
  {
    id: 4,
    name: "مرتبة سوست متعددة الطبقات",
    category: "مراتب سوست",
    price: 3100,
    imageUrl: "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    sizes: ["120 × 190", "150 × 190", "180 × 200"]
  },
  {
    id: 5,
    name: "مرتبة طبية مضادة للحساسية",
    category: "مراتب طبية",
    price: 3800,
    imageUrl: "https://images.unsplash.com/photo-1634643836960-c345b3c3e998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    sizes: ["90 × 190", "120 × 190", "150 × 190", "180 × 200"]
  },
  {
    id: 6,
    name: "مرتبة سوست بتصميم عصري",
    category: "مراتب سوست",
    price: 2600,
    imageUrl: "https://images.unsplash.com/photo-1629949008770-667e3a80e43f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    sizes: ["120 × 190", "150 × 190", "180 × 200"]
  },
  {
    id: 7,
    name: "مفرش سرير قطن 100%",
    category: "مفروشات",
    price: 950,
    imageUrl: "https://images.unsplash.com/photo-1584100936595-c0837d584505?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    sizes: ["120 × 190", "150 × 190", "180 × 200", "200 × 200"]
  },
  {
    id: 8,
    name: "مفرش سرير مطبوع",
    category: "مفروشات",
    price: 850,
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    sizes: ["120 × 190", "150 × 190", "180 × 200"]
  },
];

// Map category IDs to display names
const categoryMap: Record<string, string> = {
  "medical": "مراتب طبية",
  "spring": "مراتب سوست",
  "furniture": "مفروشات",
  "custom": "مقاسات خاصة",
};

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    setCurrentCategory(categoryParam);

    // Filter products based on category (if specified)
    if (categoryParam && categoryMap[categoryParam]) {
      setFilteredProducts(allProducts.filter(product => 
        product.category === categoryMap[categoryParam as keyof typeof categoryMap]
      ));
    } else {
      setFilteredProducts(allProducts);
    }
  }, [searchParams]);

  const categories = ["all", "medical", "spring", "furniture", "custom"];

  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter(product => 
        product.category === categoryMap[value as keyof typeof categoryMap]
      ));
    }
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
                defaultValue={currentCategory || "all"} 
                onValueChange={handleCategoryChange}
                className="w-full"
              >
                <TabsList className="mb-6 flex flex-wrap justify-center">
                  <TabsTrigger value="all">الكل</TabsTrigger>
                  <TabsTrigger value="medical">مراتب طبية</TabsTrigger>
                  <TabsTrigger value="spring">مراتب سوست</TabsTrigger>
                  <TabsTrigger value="furniture">مفروشات</TabsTrigger>
                  <TabsTrigger value="custom">مقاسات خاصة</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </TabsContent>
                
                {categories.slice(1).map((category) => (
                  <TabsContent key={category} value={category} className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            
            <div className="text-center mt-12">
              <div className="bg-badawi-beige p-6 rounded-lg max-w-3xl mx-auto">
                <h3 className="text-xl font-bold mb-4">هل تبحث عن مقاس خاص؟</h3>
                <p className="mb-4">
                  نوفر خدمة تصنيع المراتب بمقاسات خاصة حسب طلبك. اتصل بنا لمزيد من التفاصيل!
                </p>
                <Button className="bg-badawi-blue hover:bg-badawi-lightBlue">
                  اتصل بنا
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
