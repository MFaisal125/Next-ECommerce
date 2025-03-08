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
import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import gsap from "gsap";
import Container from "../shared/Container";

const Steps = () => {
  const steps = [
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
  ];

  // Create multiple copies for smooth scrolling
  const allSteps = [...steps, ...steps, ...steps, ...steps];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const controls = useAnimation();

  // Calculate the width of the scroller
  useEffect(() => {
    if (scrollerRef.current) {
      // Get the width of a single step item
      const stepItems = scrollerRef.current.querySelectorAll(".step-item");
      if (stepItems.length > 0) {
        const stepWidth = stepItems[0].offsetWidth;
        const stepMargin =
          Number.parseInt(window.getComputedStyle(stepItems[0]).marginLeft) +
          Number.parseInt(window.getComputedStyle(stepItems[0]).marginRight);

        // Calculate total width of one set of steps
        const totalWidth = (stepWidth + stepMargin) * steps.length;
        setWidth(totalWidth);
      }
    }
  }, [steps.length]);

  // Set up the GSAP animation
  useEffect(() => {
    if (!scrollerRef.current || width === 0) return;

    // Kill any existing animations
    gsap.killTweensOf(scrollerRef.current);

    // Create a timeline for smooth infinite scrolling
    const tl = gsap.timeline({ repeat: -1 });

    // Animate from start to -width (one full set of items)
    tl.to(scrollerRef.current, {
      x: -width,
      duration: 15, // Lower number = faster speed
      ease: "none",
      onComplete: () => {
        gsap.set(scrollerRef.current, { x: 0 });
      },
    });

    // Pause/resume animation based on visibility
    if (isInView) {
      tl.play();
    } else {
      tl.pause();
    }

    return () => {
      tl.kill();
    };
  }, [width, isInView]);

  // Responsive design adjustments
  const getItemWidth = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 140; // Mobile
      if (window.innerWidth < 1024) return 160; // Tablet
      return 180; // Desktop
    }
    return 180; // Default
  };

  return (
    <Container>
      <div ref={containerRef} className="py-8 bg-white overflow-hidden">
        {/* Modern subtle gradient background */}
        <div className="relative mb-8">
          <div className="absolute -top-10 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -top-10 right-1/4 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/3 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

          <div className="relative text-center mb-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
              How It Works
            </h2>
            <div className="w-16 h-1 mx-auto mt-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-300"></div>
          </div>
        </div>

        {/* Carousel container with modern design */}
        <div className="relative overflow-hidden rounded-xl">
          <div
            ref={scrollerRef}
            className="flex"
            style={{
              willChange: "transform",
            }}
          >
            {allSteps.map((step, index) => (
              <motion.div
                key={index}
                className="step-item flex-shrink-0 flex flex-col items-center mx-3 sm:mx-4"
                style={{ width: getItemWidth() }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{
                  y: -5,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <motion.div
                  className="relative w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] mb-3 rounded-xl flex items-center justify-center overflow-hidden"
                  style={{
                    backgroundColor: step.color,
                    boxShadow:
                      hoveredIndex === index
                        ? `0 10px 25px -5px ${step.accent}30`
                        : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.7)",
                  }}
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
                      repeat:
                        hoveredIndex === index ? Number.POSITIVE_INFINITY : 0,
                    },
                    scale: { duration: 0.2 },
                  }}
                >
                  {/* Modern glass effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/30 to-white/10"></div>

                  <Image
                    src={step.thumbnail || "/placeholder.svg"}
                    alt={step.title}
                    height={40}
                    width={40}
                    className="w-[40px] h-[40px] object-contain relative z-10"
                  />

                  {/* Interactive highlight on hover */}
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

                {/* Subtle highlight effect on hover */}
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
            ))}
          </div>
        </div>

        {/* Subtle scroll indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-gray-300"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add animations for the blobs */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </Container>
  );
};

export default Steps;
