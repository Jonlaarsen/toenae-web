"use client";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface ImageScrollerProps {
  images?: string[];
}

const LatestImageScroller = ({ images }: ImageScrollerProps) => {
  // Default images - clothes on hangers
  const defaultImages = [
    "https://img.freepik.com/premium-photo/blank-white-tshirt-hanger-isolated-white-background_373676-1575.jpg",
    "https://img.freepik.com/premium-photo/blank-white-tshirt-hanger-isolated-white-background_373676-1575.jpg",
    "https://img.freepik.com/premium-photo/blank-white-tshirt-hanger-isolated-white-background_373676-1575.jpg",
    "https://img.freepik.com/premium-photo/blank-white-tshirt-hanger-isolated-white-background_373676-1575.jpg",
    "https://img.freepik.com/premium-photo/blank-white-tshirt-hanger-isolated-white-background_373676-1575.jpg",
    "https://img.freepik.com/premium-photo/blank-white-tshirt-hanger-isolated-white-background_373676-1575.jpg",
  ];

  const imageList = images || defaultImages;

  useGSAP(() => {
    const container = document.querySelector(".image-scroller-container");
    const items = gsap.utils.toArray(".image-scroller-item");

    if (container && items.length > 0) {
      // Function to calculate and setup scroll
      const setupScroll = () => {
        // Kill existing ScrollTriggers
        ScrollTrigger.getAll().forEach((st) => {
          const trigger = st.vars.trigger;
          if (
            trigger === document.querySelector(".image-scroller-wrapper") ||
            (typeof trigger === "object" &&
              trigger &&
              (trigger as Element).classList?.contains(
                "image-scroller-wrapper",
              ))
          ) {
            st.kill();
          }
        });

        const startSpacer = container?.querySelector(
          ".start-spacer",
        ) as HTMLElement;
        const endSpacer = container?.querySelector(
          ".end-spacer",
        ) as HTMLElement;

        // Force layout recalculation
        void (container as HTMLElement).offsetHeight;
        void (container as HTMLElement).scrollWidth;

        // Calculate total width using actual measurements
        let totalWidth = 0;

        if (startSpacer) {
          totalWidth += startSpacer.offsetWidth;
        }

        // Get the actual computed gap from the container
        const computedStyle = window.getComputedStyle(container as Element);
        const gap = parseFloat(computedStyle.gap) || 24; // fallback to 24px if gap not found

        items.forEach((item: any, index: number) => {
          totalWidth += item.offsetWidth;
          if (index < items.length - 1) {
            totalWidth += gap;
          }
        });

        if (endSpacer) {
          totalWidth += endSpacer.offsetWidth;
        }

        const viewportWidth = window.innerWidth;

        // Calculate how much we need to scroll horizontally
        // We want the last image to be 50px from the right edge
        // So the right edge of the container should be at: viewportWidth - 50
        // Starting position: container right edge is at totalWidth
        // Final position: container right edge should be at viewportWidth - 50
        // Distance to move: totalWidth - (viewportWidth - 50) = totalWidth - viewportWidth + 50
        const horizontalScrollDistance = totalWidth - viewportWidth + 50;

        // Debug logging
        console.log("Scroll Debug:", {
          totalWidth,
          viewportWidth,
          horizontalScrollDistance,
          itemsCount: items.length,
          itemWidths: items.map((item: any) => item.offsetWidth),
        });

        if (horizontalScrollDistance <= 0) {
          console.warn(
            "Scroll distance is 0 or negative, skipping scroll setup",
          );
          return;
        }

        // Set container width explicitly
        (container as HTMLElement).style.width = `${totalWidth}px`;

        // Calculate the final x position
        // We want: totalWidth + x = viewportWidth - 50
        // So: x = viewportWidth - 50 - totalWidth = -(totalWidth - viewportWidth + 50)
        const finalX = -(totalWidth - viewportWidth + 50);

        // The vertical scroll distance should match the horizontal scroll distance
        // This ensures smooth 1:1 scrolling
        const verticalScrollDistance = horizontalScrollDistance;

        // Create horizontal scroll animation
        const horizontalScroll = gsap.timeline({
          scrollTrigger: {
            trigger: ".image-scroller-wrapper",
            start: "top top",
            end: `+=${verticalScrollDistance}`,
            pin: true,
            scrub: 1,
            markers: true, // Enable for debugging
            invalidateOnRefresh: true,
          },
        });

        horizontalScroll.to(container, {
          x: finalX,
          ease: "none",
        });

        // Refresh ScrollTrigger after setup
        ScrollTrigger.refresh();

        return horizontalScroll;
      };

      // Wait for images to load and layout to settle
      const images = document.querySelectorAll(".image-scroller-item img");
      let loadedCount = 0;
      const totalImages = images.length;

      const checkAndSetup = () => {
        if (loadedCount >= totalImages) {
          // Wait for layout to settle using requestAnimationFrame
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setupScroll();
            });
          });
        }
      };

      if (totalImages === 0) {
        setTimeout(() => {
          setupScroll();
        }, 200);
      } else {
        images.forEach((img) => {
          if ((img as HTMLImageElement).complete) {
            loadedCount++;
            checkAndSetup();
          } else {
            img.addEventListener("load", () => {
              loadedCount++;
              checkAndSetup();
            });
            img.addEventListener("error", () => {
              loadedCount++;
              checkAndSetup();
            });
          }
        });
      }

      // Handle resize
      const handleResize = () => {
        setTimeout(() => {
          setupScroll();
        }, 100);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        ScrollTrigger.getAll().forEach((st) => {
          const trigger = st.vars.trigger;
          if (
            trigger === document.querySelector(".image-scroller-wrapper") ||
            (typeof trigger === "object" &&
              trigger &&
              (trigger as Element).classList?.contains(
                "image-scroller-wrapper",
              ))
          ) {
            st.kill();
          }
        });
      };
    }
  }, [imageList]);

  return (
    <section
      className="image-scroller-wrapper size-full min-h-screen overflow-hidden bg-gradient-to-b from-white via-pink-50 to-white relative"
      aria-label="Image Scroller Section"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-30"></div>
      </div>

      <div className="image-scroller-container flex h-screen items-center gap-6">
        {/* Spacer at the start */}
        <div className="start-spacer shrink-0 w-[10vw] sm:w-[20vw]" />

        {imageList.map((image, index) => (
          <div
            key={index}
            className="image-scroller-item shrink-0 rounded-3xl overflow-hidden"
            style={{ height: "60vh", width: "60vh", minWidth: "60vh" }}
          >
            <Image
              src={image}
              alt={`Clothes on hanger ${index + 1}`}
              width={600}
              height={600}
              className="w-full h-full object-contain bg-white/50"
              unoptimized
            />
          </div>
        ))}

        {/* Spacer at the end */}
        <div className="end-spacer shrink-0 w-[10vw] sm:w-[20vw]" />
      </div>
    </section>
  );
};

export default LatestImageScroller;
