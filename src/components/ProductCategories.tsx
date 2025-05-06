
import { Link } from "react-router-dom";

import category1 from "../image/category1.jpeg";
import category2 from "../image/category2.jpeg";
import category3 from "../image/category3.jpeg";
import category4 from "../image/category4.jpeg";

interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const categories: Category[] = [
  {
    id: "medical",
    name: "مراتب طبية",
    description: "مراتب طبية عالية الجودة لراحة أفضل وصحة أفضل",
    imageUrl: category1
  },
  {
    id: "spring",
    name: "مراتب سوست",
    description: "مراتب سوست متينة بأنواع مختلفة وأحجام متعددة",
    imageUrl: category2
  },
  {
    id: "furniture",
    name: "مفروشات",
    description: "تشكيلة متنوعة من المفروشات عالية الجودة",
    imageUrl: category3
  },
  {
    id: "custom",
    name: "مقاسات خاصة",
    description: "إمكانية تنفيذ مقاسات خاصة حسب الطلب",
    imageUrl: category4
  },
];

const ProductCategories = () => {
  return (
    <section className="section bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">فئات المنتجات</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اكتشف مجموعتنا المتنوعة من المراتب والمفروشات لتناسب جميع احتياجاتك
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={'/products'}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="aspect-h-3 aspect-w-4 h-48">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 w-full p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm text-white/90">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
