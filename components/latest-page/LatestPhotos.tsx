"use client";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const LatestPhotos = () => {
  const photos = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop",
      alt: "Photo 1",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=800&fit=crop",
      alt: "Photo 2",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=800&fit=crop",
      alt: "Photo 3",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
      alt: "Photo 4",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop",
      alt: "Photo 5",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
      alt: "Photo 6",
    },
  ];

  //   useGSAP(() => {
  //     gsap.fromTo(
  //       ".photo-item",
  //       { y: -30, opacity: 0, scale: 0.45 },
  //       {
  //         y: 0,
  //         opacity: 1,
  //         scale: 1,
  //         duration: 0.4,
  //         delay: 0.5,
  //         ease: "power3.out",
  //         stagger: 0.5,
  //         scrollTrigger: {
  //           trigger: ".photos-container",
  //           start: "top 40%",
  //           end: "top 50%",
  //           toggleActions: "play none none reverse",
  //           markers: false,
  //         },
  //       },
  //     );
  //   }, []);

  return (
    <div className="photos-container min-h-[200vh] w-full py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center flex-wrap ">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="photo-item w-200 h-screen group bg-white text-zinc-900 text-3xl relative aspect-square overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" /> */}
              photos
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestPhotos;
