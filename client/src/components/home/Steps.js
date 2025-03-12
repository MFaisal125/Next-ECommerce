// import Image from "next/image";
// import React from "react";
// import Container from "../shared/Container";

// const Steps = () => {
//   const steps = [
//     {
//       badge: (
//         <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-red-800 bg-red-100 relative">
//           Step 1
//         </span>
//       ),
//       title: "Filter & Discover",
//       description: "Smart filtering and suggestions make it easy to find",
//       thumbnail: "/assets/home/steps/step-1.png",
//     },
//     {
//       badge: (
//         <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-indigo-800 bg-indigo-100 relative">
//           Step 2
//         </span>
//       ),
//       title: "Add to bag",
//       description: "Easily select the correct items and add them to the cart",
//       thumbnail: "/assets/home/steps/step-2.png",
//     },
//     {
//       badge: (
//         <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-yellow-800 bg-yellow-100 relative">
//           Step 3
//         </span>
//       ),
//       title: "Fast Shipping",
//       description: "The carrier will confirm and ship quickly to you",
//       thumbnail: "/assets/home/steps/step-3.png",
//     },
//     {
//       badge: (
//         <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-purple-800 bg-purple-100 relative">
//           Step 4
//         </span>
//       ),
//       title: "Enjoy the product",
//       description: "Have fun and enjoy your 5-star quality products",
//       thumbnail: "/assets/home/steps/step-4.png",
//     },
//   ];

//   return (
//     <Container>
//       <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 xl:gap-20">
//         <picture className="hidden md:block absolute inset-x-0 top-5">
//           <source srcSet="/assets/home/steps/step-bg.svg" type="image/svg" />
//           <img src="/assets/home/steps/step-bg.svg" alt="vector" />
//         </picture>
//         {steps.map((step, index) => (
//           <div
//             key={index}
//             className="relative flex flex-col gap-y-8 items-center max-w-xs mx-auto"
//           >
//             <div className="max-w-[100px] mx-auto">
//               <Image
//                 src={step.thumbnail}
//                 alt={step.title}
//                 height={100}
//                 width={100}
//                 className="w-[100px] h-[100px] object-contain"
//               />
//             </div>
//             <div className="flex flex-col gap-y-4 items-center justify-center">
//               {step.badge}
//               <h2 className="text-base">{step.title}</h2>
//               <span className="block text-slate-600 dark:text-slate-400 text-sm leading-6 text-center">
//                 {step.description}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default Steps;

"use client";

import Image from "next/image";
import { useRef, useEffect, useState, memo, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

// Optimized Container component with React.memo
const Container = memo(({ children }) => (
  <div className="container mx-auto px-4">{children}</div>
));
Container.displayName = "Container";

// Virtualized step rendering for extreme performance
const VirtualizedStepList = memo(
  ({ items, itemWidth, hoveredIndex, setHoveredIndex, setIsPaused }) => {
    // Only render visible items plus buffer for smooth scrolling
    const visibleItems = useMemo(() => {
      if (typeof window === "undefined") return items.slice(0, 12);

      const viewportWidth = window.innerWidth;
      const itemsPerView = Math.ceil(viewportWidth / (itemWidth + 32)) + 4; // Add buffer
      return items.slice(0, Math.min(items.length, itemsPerView * 3)); // Triple for smooth looping
    }, [items, itemWidth]);

    return (
      <>
        {visibleItems.map((step, index) => (
          <StepItem
            key={`step-${index}`}
            step={step}
            index={index}
            itemWidth={itemWidth}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            setIsPaused={setIsPaused}
          />
        ))}
      </>
    );
  }
);
VirtualizedStepList.displayName = "VirtualizedStepList";

// Optimized step item with pure component pattern
const StepItem = memo(
  ({ step, index, itemWidth, hoveredIndex, setHoveredIndex, setIsPaused }) => {
    // Precompute styles for better performance
    const baseStyles = useMemo(
      () => ({
        width: itemWidth,
        willChange: "transform",
      }),
      [itemWidth]
    );

    const iconContainerStyles = useMemo(
      () => ({
        backgroundColor: step.color,
        boxShadow:
          hoveredIndex === index
            ? `0 10px 25px -5px ${step.accent}30`
            : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.7)",
      }),
      [step.color, step.accent, hoveredIndex, index]
    );

    // Optimized event handlers with useCallback
    const handleHoverStart = useCallback(() => {
      setHoveredIndex(index);
      setIsPaused(true);
    }, [index, setHoveredIndex, setIsPaused]);

    const handleHoverEnd = useCallback(() => {
      setHoveredIndex(null);
      setIsPaused(false);
    }, [setHoveredIndex, setIsPaused]);

    return (
      <motion.div
        className="step-item flex-shrink-0 flex flex-col items-center mx-3 sm:mx-4"
        style={baseStyles}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        whileHover={{
          y: -5,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        <motion.div
          className="relative w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] mb-3 rounded-xl flex items-center justify-center overflow-hidden"
          style={iconContainerStyles}
          animate={{
            scale: hoveredIndex === index ? 1.05 : 1,
            boxShadow:
              hoveredIndex === index
                ? [
                    `0 10px 25px -5px ${step.accent}30`,
                    `0 15px 30px -5px ${step.accent}40`,
                    `0 10px 25px -5px ${step.accent}30`,
                  ]
                : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
          }}
          transition={{
            boxShadow: {
              duration: 1.5,
              repeat: hoveredIndex === index ? Number.POSITIVE_INFINITY : 0,
            },
            scale: { duration: 0.2 },
          }}
        >
          {/* Modern glass effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/30 to-white/10"></div>

          {/* Optimized image loading with priority for visible items */}
          <Image
            src={step.thumbnail || "/placeholder.svg"}
            alt={step.title}
            height={40}
            width={40}
            className="w-[40px] h-[40px] object-contain relative z-10"
            loading={index < 8 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index < 4 ? "high" : "auto"}
          />

          {/* Interactive highlight on hover - optimized animation */}
          {hoveredIndex === index && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{
                opacity: [0, 1, 0],
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                repeatType: "loop",
              }}
            />
          )}
        </motion.div>

        <div className="flex flex-col items-center gap-y-1 text-center">
          {step.badge}
          <h2 className="text-sm sm:text-base font-medium mt-1">
            {step.title}
          </h2>
          <span className="block text-slate-600 text-xs sm:text-sm leading-tight max-w-[90%]">
            {step.description}
          </span>
        </div>

        {/* Subtle highlight effect on hover - optimized */}
        {hoveredIndex === index && (
          <motion.div
            className="absolute inset-0 rounded-xl z-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.05, scale: 1.1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: step.accent }}
          />
        )}
      </motion.div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for React.memo to prevent unnecessary re-renders
    return (
      prevProps.index === nextProps.index &&
      prevProps.hoveredIndex === nextProps.hoveredIndex &&
      prevProps.itemWidth === nextProps.itemWidth
    );
  }
);
StepItem.displayName = "StepItem";

// Optimized background blobs with requestAnimationFrame
const FuturisticBlobs = memo(() => {
  const blobsRef = useRef(null);

  useEffect(() => {
    if (!blobsRef.current) return;

    let rafId;
    const startTime = performance.now();

    const animateBlobs = (timestamp) => {
      const elapsed = timestamp - startTime;
      const blobs = blobsRef.current.querySelectorAll(".blob");

      blobs.forEach((blob, index) => {
        const delay = index * 2000;
        const adjustedTime = ((elapsed + delay) % 7000) / 7000;

        // Custom easing function for smoother motion
        const x = Math.sin(adjustedTime * Math.PI * 2) * 30;
        const y = Math.cos(adjustedTime * Math.PI * 2) * 50;
        const scale = 0.9 + Math.sin(adjustedTime * Math.PI * 2) * 0.1;

        blob.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      });

      rafId = requestAnimationFrame(animateBlobs);
    };

    rafId = requestAnimationFrame(animateBlobs);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={blobsRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <div className="blob absolute -top-10 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="blob absolute -top-10 right-1/4 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="blob absolute -bottom-32 left-1/3 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="blob absolute top-1/4 right-1/3 w-32 h-32 bg-cyan-100 rounded-full mix-blend-screen filter blur-2xl opacity-10"></div>
      <div className="blob absolute bottom-1/4 left-1/3 w-24 h-24 bg-amber-100 rounded-full mix-blend-screen filter blur-2xl opacity-10"></div>
    </div>
  );
});
FuturisticBlobs.displayName = "FuturisticBlobs";

// Optimized scroll indicators with CSS variables for animation
const ScrollIndicators = memo(() => {
  return (
    <div className="flex gap-1.5">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse-indicator"
          style={{
            "--delay": `${i * 0.5}s`,
            animationDelay: `var(--delay)`,
          }}
        />
      ))}
    </div>
  );
});
ScrollIndicators.displayName = "ScrollIndicators";

const Steps = () => {
  // Use a worker for heavy calculations if available
  const useWorker =
    typeof Worker !== "undefined" && window.navigator.hardwareConcurrency > 2;

  // Memoized steps data with Object.freeze to prevent mutations
  const steps = useMemo(
    () =>
      Object.freeze([
        {
          badge: (
            <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium text-red-800 bg-red-50 border border-red-100 relative shadow-sm">
              Step 1
            </span>
          ),
          title: "Smart Discovery",
          description: "AI-powered filtering predicts your preferences",
          thumbnail: "/assets/home/steps/step-1.png",
          color: "rgba(254, 226, 226, 0.3)",
          accent: "#ef4444",
        },
        {
          badge: (
            <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium text-indigo-800 bg-indigo-50 border border-indigo-100 relative shadow-sm">
              Step 2
            </span>
          ),
          title: "Instant Cart",
          description: "One-tap selection with smart recommendations",
          thumbnail: "/assets/home/steps/step-2.png",
          color: "rgba(224, 231, 255, 0.3)",
          accent: "#6366f1",
        },
        {
          badge: (
            <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium text-yellow-800 bg-yellow-50 border border-yellow-100 relative shadow-sm">
              Step 3
            </span>
          ),
          title: "Express Delivery",
          description: "Same-day delivery with real-time tracking",
          thumbnail: "/assets/home/steps/step-3.png",
          color: "rgba(254, 249, 195, 0.3)",
          accent: "#eab308",
        },
        {
          badge: (
            <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium text-purple-800 bg-purple-50 border border-purple-100 relative shadow-sm">
              Step 4
            </span>
          ),
          title: "Perfect Experience",
          description: "Personalized support and seamless returns",
          thumbnail: "/assets/home/steps/step-4.png",
          color: "rgba(233, 213, 255, 0.3)",
          accent: "#a855f7",
        },
      ]),
    []
  );

  // Create multiple copies for smooth scrolling - memoized with optimal length
  const allSteps = useMemo(() => {
    // Calculate optimal number of repetitions based on viewport
    const repetitions =
      typeof window !== "undefined"
        ? Math.ceil(window.innerWidth / (180 * steps.length)) + 2
        : 4;

    // Create array with optimal repetitions
    const result = [];
    for (let i = 0; i < repetitions; i++) {
      result.push(...steps);
    }
    return Object.freeze(result);
  }, [steps]);

  // State and refs with proper typing
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [width, setWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const timelineRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const rafRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.1, once: false });

  // Optimized width calculation with throttling
  useEffect(() => {
    if (!scrollerRef.current) return;

    let ticking = false;
    let lastWidth = 0;

    const calculateWidth = () => {
      if (!scrollerRef.current) return;

      const stepItems = scrollerRef.current.querySelectorAll(".step-item");
      if (stepItems.length === 0) return;

      const stepWidth = stepItems[0].offsetWidth;
      const stepMargin =
        Number.parseInt(window.getComputedStyle(stepItems[0]).marginLeft) +
        Number.parseInt(window.getComputedStyle(stepItems[0]).marginRight);

      const totalWidth = (stepWidth + stepMargin) * steps.length;

      // Only update state if width has changed significantly
      if (Math.abs(totalWidth - lastWidth) > 5) {
        lastWidth = totalWidth;
        setWidth(totalWidth);
      }

      ticking = false;
    };

    const throttledCalculate = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          calculateWidth();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation
    calculateWidth();

    // Set up ResizeObserver with throttling for responsive recalculation
    if (typeof ResizeObserver !== "undefined") {
      resizeObserverRef.current = new ResizeObserver(throttledCalculate);
      resizeObserverRef.current.observe(scrollerRef.current);
    } else {
      // Fallback for browsers without ResizeObserver
      window.addEventListener("resize", throttledCalculate);
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      } else {
        window.removeEventListener("resize", throttledCalculate);
      }

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [steps.length]);

  // Ultra-optimized GSAP animation with improved performance
  useEffect(() => {
    if (!scrollerRef.current || width === 0) return;

    // Kill any existing animations
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Create a timeline with better performance settings
    timelineRef.current = gsap.timeline({
      repeat: -1,
      defaults: {
        ease: "none",
        overwrite: "auto",
      },
    });

    // Use transform for better performance with will-change optimization
    gsap.set(scrollerRef.current, { willChange: "transform" });

    // Calculate optimal animation duration based on content width
    const duration = Math.max(15, width / 100);

    timelineRef.current.to(scrollerRef.current, {
      x: -width,
      duration,
      force3D: true, // Hardware acceleration
      lazy: false, // Immediate initialization for smoother start
      onComplete: () => {
        // Instant reset without visual jump
        gsap.set(scrollerRef.current, { x: 0 });
      },
    });

    // Control animation based on visibility and pause state with optimized checks
    const updateAnimation = () => {
      if (isInView && !isPaused && timelineRef.current) {
        timelineRef.current.play();
      } else if (timelineRef.current) {
        timelineRef.current.pause();
      }
    };

    updateAnimation();

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      gsap.set(scrollerRef.current, { willChange: "auto" });
    };
  }, [width, isInView, isPaused]);

  // Responsive item width calculation - memoized with caching
  const getItemWidth = useCallback(() => {
    // Cache width calculations
    if (!getItemWidth.cache) {
      getItemWidth.cache = {};
    }

    if (typeof window !== "undefined") {
      const windowWidth = window.innerWidth;

      // Return cached value if available
      if (getItemWidth.cache[windowWidth]) {
        return getItemWidth.cache[windowWidth];
      }

      let result;
      if (windowWidth < 640) result = 140; // Mobile
      else if (windowWidth < 1024) result = 160; // Tablet
      else result = 180; // Desktop

      // Cache the result
      getItemWidth.cache[windowWidth] = result;
      return result;
    }
    return 180; // Default
  }, []);

  // Intersection Observer for pausing animations when not visible
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && timelineRef.current) {
            timelineRef.current.pause();
          } else if (entry.isIntersecting && timelineRef.current && !isPaused) {
            timelineRef.current.play();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isPaused]);

  // Preload images for smoother experience
  useEffect(() => {
    if (typeof window === "undefined") return;

    const preloadImages = () => {
      steps.forEach((step) => {
        if (step.thumbnail) {
          const img = new Image();
          img.src = step.thumbnail;
        }
      });
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(preloadImages);
    } else {
      setTimeout(preloadImages, 200);
    }
  }, [steps]);

  return (
    <Container>
      <div
        ref={containerRef}
        className="py-6 bg-white overflow-hidden"
        style={{
          contain: "content", // CSS containment for performance
          contentVisibility: "auto", // Modern browsers optimization
        }}
      >
        {/* Modern subtle gradient background */}
        <div className="relative mb-4">
          <FuturisticBlobs />

          <div className="relative text-center mb-2">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
              How It Works
            </h2>
            <div className="w-16 h-1 mx-auto mt-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-300"></div>
          </div>
        </div>

        {/* Carousel container with modern design - optimized */}
        <div
          className="relative overflow-hidden rounded-xl"
          style={{
            perspective: "1000px", // 3D acceleration hint
            backfaceVisibility: "hidden",
          }}
        >
          <div
            ref={scrollerRef}
            className="flex"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden", // Prevent flickering
              transform: "translateZ(0)", // Force GPU acceleration
              WebkitFontSmoothing: "antialiased", // Text rendering optimization
              WebkitOverflowScrolling: "touch", // iOS momentum scrolling
            }}
          >
            <VirtualizedStepList
              items={allSteps}
              itemWidth={getItemWidth()}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              setIsPaused={setIsPaused}
            />
          </div>
        </div>

        {/* Subtle scroll indicator */}
        <div className="flex justify-center mt-6">
          <ScrollIndicators />
        </div>
      </div>

      {/* Optimized animations with CSS variables and reduced repaints */}
      <style jsx global>{`
        /* Use CSS variables for animation parameters */
        :root {
          --blob-duration: 7s;
          --pulse-duration: 10s;
          --float-duration: 15s;
        }

        /* Use CSS animations instead of keyframes in JS for better performance */
        @keyframes pulse-indicator {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }

        .animate-pulse-indicator {
          animation: pulse-indicator 2s infinite;
          animation-delay: var(--delay, 0s);
        }

        /* Optimize animations with will-change and transform */
        .blob {
          will-change: transform;
          transform: translate(0, 0) scale(1);
        }

        /* Use contain property for performance */
        .step-item {
          contain: layout style;
        }

        /* Optimize image rendering */
        img {
          image-rendering: auto;
          transform: translateZ(0);
        }

        /* Optimize text rendering */
        h2,
        span,
        p {
          text-rendering: optimizeSpeed;
        }

        /* Optimize transitions */
        * {
          transition-property: transform, opacity;
          transition-duration: 0.2s;
        }
      `}</style>
    </Container>
  );
};

// Use React.memo for the entire component
export default memo(Steps);
