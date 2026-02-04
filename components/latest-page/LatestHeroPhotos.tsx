"use client";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const LatestHeroPhotos = () => {
  useGSAP(() => {
    gsap.from(".images", {
      opacity: 0,

      stagger: 0.1,
      y: 100,
    });
  }, []);
  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen bg-linear-to-b from-white via-lime-300 to-white pt-20 overflow-hidden">
      {/* Gradient overlay around edges */}
      {/* <div className="absolute inset-0 pointer-events-none z-5 gradient-overlay" /> */}
      {/* Background images */}
      <div className="absolute inset-0 flex items-center gap-8 justify-center">
        <div className="images relative w-96 h-150">
          <Image
            src="https://assets.bigcartel.com/assets/2417118/BENNY+B+ROLL.jpg?w=2400&h=2400&fit=clip"
            alt="Collection 2"
            fill
            className="object-cover w-full h-full"
            // sizes="(max-width: 768px) 200px, 400px"
          />
        </div>
        <div className="images relative w-96 h-150">
          <Image
            src="https://assets.bigcartel.com/assets/2417109/BENNY+FRONT+BOARD.jpg?w=2400&h=2400&fit=clip"
            alt="Collection 1"
            fill
            className="object-cover w-full h-full"
            // sizes="(max-width: 768px) 200px, 400px"
          />
        </div>
        <div className="images relative w-96 h-150">
          <Image
            src="https://assets.bigcartel.com/assets/2417133/BENNY+B+ROLL+9.jpg?w=2400&h=2400&fit=clip"
            alt="Collection 3"
            fill
            className="object-cover w-full h-full"
            // sizes="(max-width: 768px) 200px, 400px"
          />
        </div>
      </div>
      {/* Text content */}
      <h1 className="relative z-10 text-[8rem] text-center font-pixel uppercase text-white text-shadow-lime-400 text-shadow-md font-bold drop-shadow-lg">
        Latest Collection
      </h1>
    </div>
  );
};

export default LatestHeroPhotos;
