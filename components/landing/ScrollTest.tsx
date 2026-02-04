"use client";

import { useEffect, useRef, useState } from "react";

const ScrollTest = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Generate particles configuration
  const generateParticles = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Percentage of viewport width
      y: Math.random() * 100, // Percentage of viewport height
      size: Math.random() * 4 + 1, // Size between 1-5px
      duration: Math.random() * 20 + 10, // Animation duration 10-30s
      delay: Math.random() * 5, // Animation delay 0-5s
      opacity: Math.random() * 0.5 + 0.2, // Opacity between 0.2-0.7
      color: `hsl(${Math.random() * 60 + 180}, 70%, ${Math.random() * 30 + 60}%)`, // Pastel colors
    }));
  };

  // Only generate particles on client side to avoid hydration mismatch
  const [particles, setParticles] = useState<ReturnType<typeof generateParticles> | null>(null);

  useEffect(() => {
    // Generate particles only on client side
    setParticles(generateParticles(150));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress based on how much of the container has scrolled through viewport
      // Progress goes from 0 (container just entered) to 1 (container fully scrolled past)
      const containerTop = rect.top;
      const containerHeight = rect.height;

      // When container top is at window bottom, progress = 0
      // When container bottom is at window top, progress = 1
      const scrollableDistance = containerHeight + windowHeight;
      const scrolled = windowHeight - containerTop;
      const rawProgress = Math.max(
        0,
        Math.min(1, scrolled / scrollableDistance),
      );

      // Add initial delay: don't start animation until 5% of scroll progress
      const delayAmount = 0.05;
      const progress =
        rawProgress < delayAmount
          ? 0
          : (rawProgress - delayAmount) / (1 - delayAmount);

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate transform for each div based on scroll progress
  const getTransform = (index: number, total: number) => {
    // Each div starts further back and moves forward at different speeds
    const baseZ = -3000 - index * 400; // Starting z position (further back)
    const finalZ = 0; // End z position (at screen)

    // Stagger the animation so each div starts moving at different scroll points
    // Add delay so first div doesn't start immediately
    const initialDelay = 0.1;
    // Give more time to later divs - use a non-linear distribution
    // Earlier divs move faster, later divs get more time
    const totalAnimationRange = 0.75; // Total range for all animations
    const staggerStart =
      initialDelay + (index / total) * totalAnimationRange * 0.7;
    // Each div gets enough time, with later divs getting slightly more
    const baseDuration = 0.14;
    const extraDuration = (index / total) * 0.08; // Later divs get extra time
    const staggerEnd = staggerStart + baseDuration + extraDuration;

    let adjustedProgress = 0;
    if (scrollProgress < staggerStart) {
      adjustedProgress = 0;
    } else if (scrollProgress > staggerEnd) {
      adjustedProgress = 1;
    } else {
      adjustedProgress =
        (scrollProgress - staggerStart) / (staggerEnd - staggerStart);
    }

    const z = baseZ + (finalZ - baseZ) * adjustedProgress;

    // Define different end directions for each div (in pixels)
    // Each div starts at center (0,0) and moves outward in different directions
    const directions = [
      { endX: -0, endY: -0 }, // Top-left
      { endX: 600, endY: -500 }, // Top-right
      { endX: -500, endY: 500 }, // Bottom-left
      { endX: 500, endY: 500 }, // Bottom-right
      { endX: -700, endY: 0 }, // Far left
      { endX: 700, endY: 0 }, // Far right
      { endX: 0, endY: -600 }, // Top center
      { endX: 0, endY: 600 }, // Bottom center
    ];

    const direction = directions[index % directions.length];
    const startX = 0;
    const startY = 0;

    // Interpolate X and Y positions (start at center, move outward as they approach)
    const x = startX + (direction.endX - startX) * adjustedProgress;
    const y = startY + (direction.endY - startY) * adjustedProgress;

    // Scale increases as it gets closer (perspective effect)
    const minScale = 1.5;
    const maxScale = 7;
    const scale = minScale + (maxScale - minScale) * adjustedProgress;

    // Opacity calculation
    let opacity: number;
    if (index !== -1) {
      // Div 1: Start at full opacity when container is reached, fade out as it animates
      if (scrollProgress < staggerStart) {
        opacity = 1; // Full opacity before animation starts
      } else {
        opacity = 1 - adjustedProgress; // Fade out during animation
      }
    } else {
      // Other divs: Fade in, peak in the middle, then fade out to 0 at the end
      // Creates a bell curve: 0 -> 1 -> 0
      opacity = 4 * adjustedProgress * (1 - adjustedProgress);
    }

    return {
      transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
      opacity: opacity,
    };
  };

  const Icons = [
    {
      id: 1,
      src: "Icons/FIRST ICON - TITLE.gif",
      size: "w-auto h-140",
      text: "TOENAE",
      z: 50,
    },
    { id: 2, src: "Icons/GALLARY ICON.png", size: "w-60 h-auto", z: 49 },
    { id: 3, src: "Icons/ARCHIVE ICON.png", size: "w-60 h-auto", z: 48 },
    { id: 4, src: "Icons/SHOP ICON.png", size: "w-60 h-auto", z: 47 },
    { id: 5, src: "Icons/MEMBERS ICON.png", size: "w-60 h-auto", z: 46 },
    { id: 6, src: "Icons/CONNECT ICON.png", size: "w-60 h-auto", z: 45 },
    { id: 7, src: "Icons/WISH ICON.png", size: "w-60 h-auto", z: 44 },
  ];

  return (
    <div ref={containerRef} className="h-[600vh] bg-white relative">
      {/* Background Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles?.map((particle) => {
          // Make particles move based on scroll progress
          const scrollOffsetX = (scrollProgress - 0.5) * particle.size * 20;
          const scrollOffsetY = (scrollProgress - 0.5) * particle.size * 15;
          const scrollOpacity = Math.max(0.1, particle.opacity * (1 - scrollProgress * 0.5));
          
          return (
            <div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: `calc(${particle.x}% + ${scrollOffsetX}px)`,
                top: `calc(${particle.y}% + ${scrollOffsetY}px)`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                opacity: scrollOpacity,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                animation: `particleFloat ${particle.duration}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
                willChange: "transform, opacity",
                transform: `scale(${1 + scrollProgress * 0.3})`,
              }}
            />
          );
        })}
      </div>

      <div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden relative z-10"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "center center",
          transformStyle: "preserve-3d",
        }}
      >
        {Icons.map((icon, index) => {
          const transform = getTransform(index, Icons.length);
          return (
            <div
              key={index}
              // className={`z-[${100 - index}]`}
              style={{
                transform: transform.transform,
                opacity: transform.opacity,
                zIndex: icon.z,
                position: "absolute",
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
              }}
            >
              <div
                className={` ${icon.size}  rounded-full flex items-center justify-center  float  `}
              >
                <img
                  src={icon.src}
                  className=" object-cover"
                  alt="toenae logos"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollTest;
