
import { Button } from "@/components/ui/button";
import ProductCard, { Product } from "@/components/ProductCard";
import { Link } from "react-router-dom";

const featuredProducts: Product[] = [
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
  }
];

const FeaturedProducts = () => {
  return (
    <section className="section bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">منتجاتنا المميزة</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اختيار من أفضل المراتب الطبية ومراتب السوست بأعلى جودة وبأسعار تنافسية
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
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
