"use client";
import { dummyProducts } from "@/constants";
import ProductCard from "../ui/ProductCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowBigRightDash } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const LatestProducts = () => {
  const checkoutTextRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // Set initial state
    gsap.set(".product-item", { opacity: 0, y: 100 });

    // Animate in with scroll trigger
    const animation = gsap.to(".product-item", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.4,
      delay: 0.5,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".latest-product-container",
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse",
        markers: false,
      },
    });

    // Fallback: if scroll trigger doesn't fire within 1 second, show items anyway
    const timeout = setTimeout(() => {
      const items = document.querySelectorAll(".product-item");
      items.forEach((item) => {
        const computedStyle = window.getComputedStyle(item as Element);
        if (computedStyle.opacity === "0") {
          gsap.to(item, { opacity: 1, y: 0, duration: 0.4 });
        }
      });
    }, 1000);

    return () => {
      clearTimeout(timeout);
      animation?.kill();
    };
  }, []);

  // Wave color animation for checkout link
  useEffect(() => {
    if (!checkoutTextRef.current) return;

    const text = checkoutTextRef.current.textContent || "";
    const chars = text.split("");
    
    // Create spans for each character
    checkoutTextRef.current.innerHTML = chars
      .map((char, i) => 
        char === " " 
          ? '<span class="char-space"> </span>'
          : `<span class="checkout-char" style="--char-index: ${i}">${char}</span>`
      )
      .join("");

    // Set initial color to black
    const charElements = checkoutTextRef.current.querySelectorAll(".checkout-char");
    charElements.forEach((char) => {
      gsap.set(char, { color: "#3f3f46" }); // zinc-700 (black)
    });
    gsap.set(".checkout-arrow", { color: "#3f3f46" });

    // Animate each character's color in a wave from black to pink-400
    charElements.forEach((char, index) => {
      gsap.to(char, {
        color: "#f472b6", // pink-400
        duration: 0.4,
        delay: index * 0.08,
        ease: "power2.out",
        repeat: -1,
        yoyo: true,
        repeatDelay: (chars.length * 0.08) + 0.8,
      });
    });

    // Animate arrow icon after text
    gsap.to(".checkout-arrow", {
      color: "#f472b6", // pink-400
      duration: 0.4,
      delay: chars.length * 0.08,
      ease: "power2.out",
      repeat: -1,
      yoyo: true,
      repeatDelay: (chars.length * 0.08) + 0.8,
    });
  }, []);
  return (
    <div className="latest-product-container relative flex flex-col items-center justify-center h-full my-10 w-full">
      {/* Black grid background
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, black 1px, transparent 1px),
            linear-gradient(to bottom, black 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          opacity: 0.3,
        }}
      />{" "} */}
      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {dummyProducts.slice(0, 3).map((products, index) => (
          <div className="product-item " key={index}>
            <ProductCard
              key={products.id}
              id={products.id}
              title={products.title}
              price={products.price}
              image={products.image}
              // description={products.description}
            />
          </div>
        ))}
      </div>
      <a
        href="/products"
        className="checkout-link flex gap-2 items-center mt-10 relative font-pixel z-10 hover:scale-x-110 transition-all duration-300 text-3xl text-zinc-700"
      >
        <span ref={checkoutTextRef} className="checkout-text">
          Check it out!
        </span>
        <ArrowBigRightDash className="w-15 h-15 checkout-arrow" />
      </a>
    </div>
  );
};

export default LatestProducts;
