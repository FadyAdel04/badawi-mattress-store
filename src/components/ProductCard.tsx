
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  sizes: string[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="pt-4">
        <div className="mb-2">
          <span className="inline-block bg-badawi-beige text-badawi-blue rounded-full px-3 py-1 text-sm font-semibold">
            {product.category}
          </span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        </Link>
        <p className="text-badawi-blue font-bold text-xl">{product.price} جنيه</p>
        <div className="mt-2">
          <p className="text-gray-600 text-sm">المقاسات المتاحة: {product.sizes.join(', ')}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-badawi-blue hover:bg-badawi-lightBlue">
          <ShoppingCart className="ml-2 h-5 w-5" /> أضف إلى السلة
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
