
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import About from "@/components/About";
import ContactInfo from "@/components/ContactInfo";
import ProductCategories from "@/components/ProductCategories";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ProductCategories />
        <FeaturedProducts />
        <About />
        <ContactInfo />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
