
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  sizes: string[];
}

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      // Get 4 most recent products as featured products
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("id, name, category, price")
        .order("created_at", { ascending: false })
        .limit(4);

      if (productsError) throw productsError;

      // For each product, get its sizes and primary image
      const productsWithDetails = await Promise.all(
        productsData.map(async (product) => {
          // Get sizes
          const { data: sizesData, error: sizesError } = await supabase
            .from("product_sizes")
            .select("size")
            .eq("product_id", product.id);
            
          if (sizesError) throw sizesError;

          // Get primary image
          const { data: imagesData, error: imagesError } = await supabase
            .from("product_images")
            .select("image_url")
            .eq("product_id", product.id)
            .order("is_primary", { ascending: false })
            .limit(1);
            
          if (imagesError) throw imagesError;

          return {
            ...product,
            sizes: sizesData.map((s: any) => s.size),
            imageUrl: imagesData && imagesData.length > 0 
              ? imagesData[0].image_url 
              : "https://images.unsplash.com/photo-1631049552240-59c37f38802b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          };
        })
      );

      setFeaturedProducts(productsWithDetails);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">منتجاتنا المميزة</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اختيار من أفضل المراتب الطبية ومراتب السوست بأعلى جودة وبأسعار تنافسية
          </p>
        </div>
        
        {isLoading ? (
          <div className="text-center py-10">
            <p>جاري تحميل المنتجات المميزة...</p>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-10">
            <p>لا توجد منتجات مميزة حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link to="/products">
            <Button className="bg-badawi-blue hover:bg-badawi-lightBlue px-8 py-3 text-lg">
              عرض جميع المنتجات
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
