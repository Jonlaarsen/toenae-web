"use client";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  category?: string;
  description?: string;

  onAddToCart?: () => void;
}

const ProductCard = ({
  id,
  title,
  price,
  image,
  // category,
  description,
  onAddToCart,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative w-full aspect-square min-h-100  overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image - fills entire card */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition-transform duration-500 ${
            isHovered
              ? "scale-110 brightness-75"
              : "scale-100 brightness-100 h-100 w-auto"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Details Overlay - appears on hover */}
      <div
        className={`absolute inset-0 bg-linear-to-t from-black/90 via-black/70 to-transparent transition-opacity duration-300 flex flex-col justify-center p-6 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Title */}
        <h3 className="text-2xl font-bold text-white text-center mb-2 transform transition-all duration-300 delay-75">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-white/90 text-sm mb-4 line-clamp-2 transform transition-all duration-300 delay-100">
            {description}
          </p>
        )}

        {/* Price and Action */}
        <div className="flex flex-col space-y-2 items-center justify-between mt-4 transform transition-all duration-300 delay-150">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">${price}</span>
            {/* {price > 50 && (
              <span className="text-sm text-white/70 line-through">
                ${(price * 1.2).toFixed(0)}
              </span>
            )} */}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={onAddToCart}
            className="border-2 border-lime-300 hover:bg-lime-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
