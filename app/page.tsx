"use client";
import Latest from "@/components/landing/Latest";
import ScrollTest from "@/components/landing/ScrollTest";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Home() {
  useGSAP(() => {
    gsap.set(".landing-container", { opacity: 0 });
    gsap.to(".landing-container", {
      opacity: 1,
      duration: 0.5,
      delay: 0.2,
    });
  }, []);
  return (
    <div className="landing-container">
      <main>
        <ScrollTest />
        <Latest />
      </main>
    </div>
  );
}
