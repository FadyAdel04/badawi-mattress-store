
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface ProductDetails {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string | null;
  features: string[] | null;
  sizes: string[];
  specs: { name: string; value: string }[];
  images: { url: string; is_primary: boolean }[];
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { toast } = useToast();
  
  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const fetchProductDetails = async () => {
    setIsLoading(true);
    try {
      // Fetch product details
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (productError) throw productError;

      // Fetch sizes
      const { data: sizesData, error: sizesError } = await supabase
        .from("product_sizes")
        .select("size")
        .eq("product_id", id);

      if (sizesError) throw sizesError;

      // Fetch specifications
      const { data: specsData, error: specsError } = await supabase
        .from("product_specifications")
        .select("name, value")
        .eq("product_id", id);

      if (specsError) throw specsError;

      // Fetch images
      const { data: imagesData, error: imagesError } = await supabase
        .from("product_images")
        .select("image_url, is_primary")
        .eq("product_id", id);

      if (imagesError) throw imagesError;

      // Map the image_url to url for compatibility with our interface
      const mappedImages = imagesData.map((img: any) => ({
        url: img.image_url,
        is_primary: img.is_primary
      }));

      const productDetails: ProductDetails = {
        id: productData.id,
        name: productData.name,
        category: productData.category,
        price: productData.price,
        description: productData.description,
        features: productData.features,
        sizes: sizesData.map((s: any) => s.size),
        specs: specsData,
        images: mappedImages
      };

      setProduct(productDetails);
      if (productDetails.sizes.length > 0) {
        setSelectedSize(productDetails.sizes[0]);
      }
    } catch (error: any) {
      toast({
        title: "خطأ في تحميل المنتج",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-xl">جاري تحميل المنتج...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-xl">لم يتم العثور على المنتج</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Product Image */}
            <div className="mb-8 lg:mb-0">
              <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                <img
                  src={product?.images && product.images.length > 0 
                    ? product.images.find(img => img.is_primary)?.url || product.images[0].url
                    : "https://images.unsplash.com/photo-1631049552240-59c37f38802b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
                  alt={product?.name || "Product image"}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              
              {/* Additional Images */}
              {product?.images && product.images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {product.images.slice(0, 4).map((image, index) => (
                    <div key={index} className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                      <img
                        src={image.url}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-center object-cover cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              <div className="mb-2">
                <span className="inline-block bg-badawi-beige text-badawi-blue rounded-full px-3 py-1 text-sm font-semibold">
                  {product?.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product?.name}</h1>
              <p className="text-2xl text-badawi-blue font-bold mb-6">{product?.price} جنيه</p>
              
              {product?.description && (
                <p className="text-gray-700 mb-6">{product.description}</p>
              )}
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">المقاسات المتاحة</label>
                <div className="flex flex-wrap gap-2">
                  {product?.sizes.map((size) => (
                    <div
                      key={size}
                      className={`px-4 py-2 border rounded cursor-pointer ${
                        selectedSize === size
                          ? "bg-badawi-blue text-white border-badawi-blue"
                          : "bg-white text-gray-700 border-gray-300 hover:border-badawi-blue"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                * يتم تحديد سعر التوصيل حسب المنطقة
              </p>
              
              <p className="text-gray-600 text-sm">
                * يمكن تنفيذ مقاسات خاصة حسب الطلب
              </p>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="features">
              <TabsList className="mb-6">
                <TabsTrigger value="features">المميزات</TabsTrigger>
                <TabsTrigger value="specifications">المواصفات</TabsTrigger>
                <TabsTrigger value="shipping">الشحن والتوصيل</TabsTrigger>
              </TabsList>
              
              <TabsContent value="features">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">مميزات المنتج</h3>
                  {product?.features && product.features.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>لا توجد معلومات متاحة حالياً</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="specifications">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">المواصفات</h3>
                  {product?.specs && product.specs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.specs.map((spec, index) => (
                        <div key={index} className="flex justify-between py-2 border-b">
                          <span className="font-medium">{spec.name}</span>
                          <span>{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>لا توجد معلومات متاحة حالياً</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="shipping">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">الشحن والتوصيل</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>التوصيل متاح لجميع محافظات مصر</li>
                    <li>يتم تحديد رسوم التوصيل حسب المنطقة</li>
                    <li>التسليم خلال 3-7 أيام عمل من تاريخ الطلب</li>
                    <li>التركيب مجاناً داخل محافظة أسيوط</li>
                    <li>الدفع عند الاستلام متاح</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
