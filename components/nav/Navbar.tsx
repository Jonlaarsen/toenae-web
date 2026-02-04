"use client";
import { useGSAP } from "@gsap/react";
import { NavLinks } from "../../constants/index";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ShoppingCart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Navbar = () => {
  const pathname = usePathname();
  const hasAnimated = useRef(false);

  useGSAP(() => {
    // Only animate on the home page and if we haven't animated yet
    if (pathname === "/" && !hasAnimated.current) {
      gsap.set(".links", { opacity: 0, x: 100 });
      gsap.set(".logo", { opacity: 0, x: -100 });
      gsap.to(".links", {
        opacity: 1,
        stagger: { amount: 0.3, axis: "x" },
        delay: 0.5,
        duration: 1,
        ease: "power1.in",
        x: 0,
      });
      gsap.to(".logo", {
        opacity: 1,
        duration: 1,
        ease: "power1.in",
        x: 0,
      });
      hasAnimated.current = true;
    } else {
      // On other pages, just show the navbar without animation
      gsap.set([".links", ".logo"], { opacity: 1, x: 0 });
    }
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between h-15  text-zinc-950 px-20">
      <div className="logo">
        <a
          href="/"
          className="text-3xl font-pixel flex gap-1 text-shadow-sm text-shadow-black font-bold"
        >
          <span className="text-pink-400">T</span>
          <span className="text-green-400">O</span>
          <span className="text-red-400">E</span>
          <span className="text-cyan-400">N</span>
          <span className="text-yellow-400">A</span>
          <span className="text-blue-400">E</span>
        </a>
      </div>
      <div className="hidden md:flex space-x-4 items-center">
        {NavLinks.map((link) => (
          <div key={link.id} className="links">
            <a
              className=" hover:text-lime-500 transition-all duration-200"
              href={link.url}
            >
              {link.text}
            </a>
          </div>
        ))}
        <div className="links">
          <ShoppingCart className="w-8 h-8" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
