"use client";
import ProductCard from "@/components/ui/ProductCard";
import { dummyProducts } from "@/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useMemo } from "react";

const categories = [
  { id: "all", label: "All" },
  { id: "top", label: "Top" },
  { id: "bottom", label: "Bottom" },
  { id: "accesory", label: "Accessories" },
  { id: "shoe", label: "Shoes" },
];

const page = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useGSAP(() => {
    gsap.set(".product-container", { opacity: 0 });
    gsap.to(".product-container", {
      opacity: 1,
      duration: 0.5,
      delay: 0.2,
    });
  }, []);

  // Filter products based on active category
  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") {
      return dummyProducts;
    }
    return dummyProducts.filter(
      (product) =>
        product.category?.toLowerCase() === activeCategory.toLowerCase(),
    );
  }, [activeCategory]);

  return (
    <main className="bg-white product-container min-h-screen w-full py-20 px-4 md:px-8">
      <div className="max-w-7xl  mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-16">
          <img
            src="https://assets.bigcartel.com/theme_images/60399594/TOENAE_text_logo.png?auto=format&fit=max&h=400&w=2136"
            alt="logo image"
            className="h-50 w-auto"
          />

          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? "text-green-700 text-xl"
                    : "text-zinc-700"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-gray-600 text-sm">
            Showing {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                // description={product.description}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl mb-4">
              No products found in this category
            </p>
            <button
              onClick={() => setActiveCategory("all")}
              className="text-lime-500 hover:text-lime-600 font-semibold underline"
            >
              View all products
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default page;
