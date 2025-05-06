
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Plus, ArrowLeft, Upload } from "lucide-react";

interface ProductFormData {
  name: string;
  category: string;
  price: number;
  description: string;
  features: string[];
  sizes: string[];
  specifications: { name: string; value: string }[];
  images: { file?: File; url?: string; isUploaded?: boolean; isNew?: boolean; isDeleted?: boolean }[];
}

const ProductForm = () => {
  const { id } = useParams();
  const isEditMode = id !== 'new';
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newFeature, setNewFeature] = useState("");
  const [newSizeName, setNewSizeName] = useState("");
  const [newSpecName, setNewSpecName] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    price: 0,
    description: "",
    features: [],
    sizes: [],
    specifications: [],
    images: []
  });

  const categories = ["مراتب طبية", "مراتب سوست", "مفروشات", "مقاسات خاصة"];

  useEffect(() => {
    if (isEditMode) {
      fetchProductData();
    }
  }, [id]);

  const fetchProductData = async () => {
    setIsLoading(true);
    try {
      // Fetch product data
      const { data: product, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      // Fetch sizes
      const { data: sizes, error: sizesError } = await supabase
        .from("product_sizes")
        .select("size")
        .eq("product_id", id);

      if (sizesError) throw sizesError;

      // Fetch specifications
      const { data: specs, error: specsError } = await supabase
        .from("product_specifications")
        .select("name, value")
        .eq("product_id", id);

      if (specsError) throw specsError;

      // Fetch images
      const { data: images, error: imagesError } = await supabase
        .from("product_images")
        .select("id, image_url, is_primary")
        .eq("product_id", id);

      if (imagesError) throw imagesError;

      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price || 0,
        description: product.description || "",
        features: product.features || [],
        sizes: sizes.map((s: any) => s.size) || [],
        specifications: specs || [],
        images: images.map((img: any) => ({ 
          url: img.image_url,
          isUploaded: true
        })) || []
      });
    } catch (error: any) {
      toast({
        title: "خطأ في تحميل بيانات المنتج",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseFloat(e.target.value) || 0;
    setFormData({ ...formData, price });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value });
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()]
      });
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures.splice(index, 1);
    setFormData({ ...formData, features: updatedFeatures });
  };

  const addSize = () => {
    if (newSizeName.trim()) {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, newSizeName.trim()]
      });
      setNewSizeName("");
    }
  };

  const removeSize = (index: number) => {
    const updatedSizes = [...formData.sizes];
    updatedSizes.splice(index, 1);
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const addSpecification = () => {
    if (newSpecName.trim() && newSpecValue.trim()) {
      setFormData({
        ...formData,
        specifications: [
          ...formData.specifications,
          { name: newSpecName.trim(), value: newSpecValue.trim() }
        ]
      });
      setNewSpecName("");
      setNewSpecValue("");
    }
  };

  const removeSpecification = (index: number) => {
    const updatedSpecs = [...formData.specifications];
    updatedSpecs.splice(index, 1);
    setFormData({ ...formData, specifications: updatedSpecs });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = [...formData.images];
      
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        newImages.push({
          file,
          url: URL.createObjectURL(file),
          isNew: true
        });
      }
      
      setFormData({ ...formData, images: newImages });
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...formData.images];
    
    // If image is already uploaded, mark it for deletion
    if (updatedImages[index].isUploaded) {
      updatedImages[index] = { 
        ...updatedImages[index],
        isDeleted: true 
      };
    } else {
      updatedImages.splice(index, 1);
    }
    
    setFormData({ ...formData, images: updatedImages });
  };

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let productId = id;
      
      // 1. Save product data
      if (isEditMode) {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update({
            name: formData.name,
            category: formData.category,
            price: formData.price,
            description: formData.description,
            features: formData.features,
            updated_at: new Date().toISOString()
          })
          .eq("id", id);
          
        if (error) throw error;
      } else {
        // Create new product
        const { data, error } = await supabase
          .from("products")
          .insert({
            name: formData.name,
            category: formData.category,
            price: formData.price,
            description: formData.description,
            features: formData.features
          })
          .select();
          
        if (error) throw error;
        productId = data[0].id;
      }
      
      // 2. Handle sizes - first delete all existing sizes if in edit mode
      if (isEditMode) {
        const { error: deleteError } = await supabase
          .from("product_sizes")
          .delete()
          .eq("product_id", productId);
          
        if (deleteError) throw deleteError;
      }
      
      // Insert new sizes
      if (formData.sizes.length > 0) {
        const sizesData = formData.sizes.map(size => ({
          product_id: productId,
          size
        }));
        
        const { error } = await supabase
          .from("product_sizes")
          .insert(sizesData);
          
        if (error) throw error;
      }
      
      // 3. Handle specifications - first delete all existing specs if in edit mode
      if (isEditMode) {
        const { error: deleteError } = await supabase
          .from("product_specifications")
          .delete()
          .eq("product_id", productId);
          
        if (deleteError) throw deleteError;
      }
      
      // Insert new specifications
      if (formData.specifications.length > 0) {
        const specsData = formData.specifications.map(spec => ({
          product_id: productId,
          name: spec.name,
          value: spec.value
        }));
        
        const { error } = await supabase
          .from("product_specifications")
          .insert(specsData);
          
        if (error) throw error;
      }
      
      // 4. Handle images
      // Upload new images
      for (const image of formData.images) {
        if (image.file && image.isNew && !image.isDeleted) {
          // Upload to storage
          const file = image.file;
          const fileExt = file.name.split('.').pop();
          const fileName = `${productId}/${Date.now()}.${fileExt}`;
          const filePath = `${fileName}`;
          
          const { error: uploadError } = await supabase.storage
            .from("product-images")
            .upload(filePath, file);
            
          if (uploadError) throw uploadError;
          
          // Get public URL
          const { data } = supabase.storage
            .from("product-images")
            .getPublicUrl(filePath);
            
          // Save reference in the database
          const { error } = await supabase
            .from("product_images")
            .insert({
              product_id: productId,
              image_url: data.publicUrl,
              is_primary: formData.images.length === 1
            });
            
          if (error) throw error;
        }
      }
      
      // Success
      toast({
        title: isEditMode ? "تم تعديل المنتج" : "تم إضافة المنتج",
        description: isEditMode ? "تم تعديل المنتج بنجاح" : "تم إضافة المنتج بنجاح",
      });
      
      navigate("/admin");
    } catch (error: any) {
      toast({
        title: "خطأ في حفظ المنتج",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>جاري تحميل بيانات المنتج...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/admin")} 
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 ml-2" /> 
                العودة
              </Button>
              <h1 className="text-2xl font-bold">
                {isEditMode ? "تعديل المنتج" : "إضافة منتج جديد"}
              </h1>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={saveProduct}>
            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">المعلومات الأساسية</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    اسم المنتج
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="أدخل اسم المنتج"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-1">
                    الفئة
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium mb-1">
                    السعر (جنيه)
                  </label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handlePriceChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    الوصف
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description || ''}
                    onChange={handleInputChange}
                    placeholder="أدخل وصف المنتج"
                    rows={4}
                  />
                </div>
              </div>
            </div>
            
            {/* Features */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">المميزات</h2>
              
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="أضف ميزة جديدة"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={addFeature}
                    className="bg-badawi-blue hover:bg-badawi-lightBlue"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <ul className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <li 
                      key={index}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded"
                    >
                      <span>{feature}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFeature(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Sizes */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">المقاسات المتاحة</h2>
              
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newSizeName}
                    onChange={(e) => setNewSizeName(e.target.value)}
                    placeholder="أضف مقاس جديد (مثال: 90 × 190)"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={addSize}
                    className="bg-badawi-blue hover:bg-badawi-lightBlue"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <ul className="space-y-2">
                  {formData.sizes.map((size, index) => (
                    <li 
                      key={index}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded"
                    >
                      <span>{size}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSize(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Specifications */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">المواصفات</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    value={newSpecName}
                    onChange={(e) => setNewSpecName(e.target.value)}
                    placeholder="اسم المواصفة (مثال: الارتفاع)"
                  />
                  <div className="flex space-x-2">
                    <Input
                      value={newSpecValue}
                      onChange={(e) => setNewSpecValue(e.target.value)}
                      placeholder="القيمة (مثال: 25 سم)"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={addSpecification}
                      className="bg-badawi-blue hover:bg-badawi-lightBlue"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {formData.specifications.map((spec, index) => (
                    <li 
                      key={index}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded"
                    >
                      <span>
                        <strong>{spec.name}:</strong> {spec.value}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSpecification(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Images */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">صور المنتج</h2>
              
              <div className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-8 border-dashed border-2"
                >
                  <Upload className="h-6 w-6 mr-2" />
                  اختر صور المنتج
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      !image.isDeleted && (
                        <div key={index} className="relative group">
                          <img
                            src={image.url}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-40 object-cover rounded"
                          />
                          <div className="absolute top-2 right-2">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeImage(index)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin")}
                disabled={isSaving}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                className="bg-badawi-blue hover:bg-badawi-lightBlue"
                disabled={isSaving}
              >
                {isSaving ? "جاري الحفظ..." : (isEditMode ? "حفظ التعديلات" : "إضافة المنتج")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
