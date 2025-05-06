
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/components/ProductCard";

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
];

interface ProductDetails extends Product {
  description: string;
  features: string[];
  specs: { name: string; value: string }[];
}

const productDetails: Record<number, Partial<ProductDetails>> = {
  1: {
    description: "مرتبة طبية فاخرة مصممة خصيصاً لتوفير الدعم الأمثل للجسم وتخفيف آلام الظهر. مصنوعة من أجود المواد التي توفر الراحة والمتانة.",
    features: [
      "مصنوعة من مواد عالية الجودة",
      "توفر دعماً مثالياً للعمود الفقري",
      "مضادة للحساسية",
      "مقاومة للبكتيريا",
      "سهلة التنظيف",
    ],
    specs: [
      { name: "الارتفاع", value: "25 سم" },
      { name: "المواد", value: "إسفنج عالي الكثافة" },
      { name: "الضمان", value: "5 سنوات" },
    ],
  },
  2: {
    description: "مرتبة سوست مزدوجة توفر راحة فائقة مع دعم متوازن. تتميز بتصميم السوست المزدوجة التي تمنح المرتبة عمراً أطول وأداءً أفضل.",
    features: [
      "سوست مزدوجة عالية القوة",
      "طبقة عازلة للحركة",
      "غطاء قابل للإزالة والغسل",
      "تصميم يسمح بتهوية جيدة",
    ],
    specs: [
      { name: "الارتفاع", value: "28 سم" },
      { name: "عدد السوست", value: "800 سوستة" },
      { name: "الضمان", value: "7 سنوات" },
    ],
  },
  3: {
    description: "مرتبة طبية مبتكرة مع وسادة داعمة مدمجة لتوفير أقصى درجات الراحة. مثالية لمن يعانون من آلام الظهر والرقبة.",
    features: [
      "وسادة داعمة مدمجة",
      "تقنية الذاكرة التي تتكيف مع شكل الجسم",
      "مضادة للحساسية",
      "تصميم مقاوم للتآكل",
    ],
    specs: [
      { name: "الارتفاع", value: "30 سم" },
      { name: "المواد", value: "إسفنج طبي مع وسادة داعمة" },
      { name: "الضمان", value: "8 سنوات" },
    ],
  },
  4: {
    description: "مرتبة سوست متعددة الطبقات توفر دعماً فائقاً وراحة استثنائية. تتميز بتقنية السوست المتعددة التي تدعم الجسم في جميع وضعيات النوم.",
    features: [
      "سوست متعددة الطبقات",
      "تصميم يمنع الشعور بحركة الشريك",
      "مواد فاخرة عالية الجودة",
      "مقاومة للرطوبة",
    ],
    specs: [
      { name: "الارتفاع", value: "27 سم" },
      { name: "عدد الطبقات", value: "5 طبقات" },
      { name: "الضمان", value: "6 سنوات" },
    ],
  },
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [details, setDetails] = useState<Partial<ProductDetails> | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    if (id) {
      const productId = parseInt(id);
      const foundProduct = allProducts.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedSize(foundProduct.sizes[0]);
        setDetails(productDetails[productId] || null);
      }
    }
  }, [id]);

  if (!product) {
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
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-center object-cover"
                />
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <div className="mb-2">
                <span className="inline-block bg-badawi-beige text-badawi-blue rounded-full px-3 py-1 text-sm font-semibold">
                  {product.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-2xl text-badawi-blue font-bold mb-6">{product.price} جنيه</p>
              
              {details?.description && (
                <p className="text-gray-700 mb-6">{details.description}</p>
              )}
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">المقاس</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className={selectedSize === size ? "bg-badawi-blue hover:bg-badawi-lightBlue" : ""}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">الكمية</label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-r-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="px-4 py-2 w-12 text-center border border-gray-300">
                    {quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-l-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mb-6">
                <Button className="w-full bg-badawi-blue hover:bg-badawi-lightBlue py-6 text-lg">
                  <ShoppingCart className="ml-2 h-5 w-5" /> أضف إلى السلة
                </Button>
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
                  {details?.features && details.features.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2">
                      {details.features.map((feature, index) => (
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
                  {details?.specs && details.specs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {details.specs.map((spec, index) => (
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
