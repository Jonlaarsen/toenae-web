"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Latest = () => {
  useGSAP(() => {
    const heroSplit = new SplitText("#title", { type: "chars, words" });

    heroSplit.chars.forEach((char) => {
      char.classList.add("text-gradient");
      char.classList.add("font-pixel"); // Ensure font applies to split characters
    });
    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      scale: 0.5,
      stagger: 0.05,
      scrollTrigger: {
        trigger: ".latest-container",
        start: "top 20%",
        end: "top 50%",
        toggleActions: "play none none reverse",
        markers: false,
      },
    });
    gsap.fromTo(
      ".button",
      { y: -30, opacity: 0, scale: 0.45 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        delay: 0.5,
        ease: "power3.out",
        stagger: 0.5,
        scrollTrigger: {
          trigger: ".latest-landing-container",
          start: "top 20%",
          end: "top 50%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      },
    );

    // Endless horizontal scroll background
    gsap.to(".scroll-bg", {
      x: "-50%",
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  });

  return (
    <div className="latest-landing-container relative h-screen w-full border-t-4 border-white/70 text-white flex flex-col justify-center items-center overflow-hidden bg-linear-to-bl from-lime-200 via-lime-300 to-lime-200 ">
      {/* Endless scrolling background */}
      <div className="scroll-bg absolute inset-0 flex whitespace-nowrap pointer-events-none">
        <div className="flex">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8 px-8">
              {[...Array(10)].map((_, j) => (
                <div
                  key={j}
                  className="shrink-0 w-64 h-full flex items-center justify-center"
                >
                  <div className="w-full h-169 bg-white/40 rounded-3xl backdrop-blur-sm border border-white/20"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Content layer */}
      <div className="relative z-10 flex flex-col justify-center items-center">
        <h1
          id="title"
          className="text-7xl text-center md:text-8xl font-bold font-pixel"
        >
          LATEST DROP
        </h1>
        <a
          href="/latest"
          className="button border-white border-4 rounded-3xl p-4 mt-10 text-2xl hover:bg-white hover:text-lime-300 duration-300 transition-all uppercase font-bold"
        >
          Go to latest
        </a>
        <a
          href="/latest"
          className="button underline rounded-3xl p-4 text-lg md:text-xl text-lime-600 hover:text-white duration-300 transition-all"
        >
          View All Products
        </a>
      </div>
    </div>
  );
};

export default Latest;
