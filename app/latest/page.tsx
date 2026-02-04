"use client";
import LatestHeroPhotos from "@/components/latest-page/LatestHeroPhotos";
import LatestPhotos from "@/components/latest-page/LatestPhotos";
import LatestProducts from "@/components/latest-page/LatestProducts";
import LatestImageScroller from "@/components/latest-page/LatestImageScroller";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const page = () => {
  useGSAP(() => {
    gsap.set(".latest-container", { opacity: 0 });
    gsap.to(".latest-container", {
      opacity: 1,
      duration: 0.5,
      delay: 0.2,
    });
  }, []);
  return (
    <div className="size-full latest-container relative flex flex-col justify-center items-center bg-white ">
      {/* Black grid background */}
      {/* <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, black 1px, transparent 1px),
            linear-gradient(to bottom, black 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          opacity: 0.1,
        }}
      />{" "} */}
      <LatestHeroPhotos />
      <div className="w-full h-full bg- py-10">
        <LatestProducts />
      </div>
      <div className="min-h-screen">
        <LatestImageScroller />
      </div>
      {/* Spacer to ensure scroll works */}
      <div className="w-full bg-lime-100">
        {" "}
        <LatestPhotos />
      </div>
    </div>
  );
};

export default page;
