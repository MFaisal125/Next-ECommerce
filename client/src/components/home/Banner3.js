// import React from "react";
// import Container from "../shared/Container";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// const Banner3 = ({ className }) => {
//   const router = useRouter();

//   return (
//     <Container className={className ? className : ""}>
//       <div
//         className="bg-[#4dffff] h-full w-full rounded-primary relative flex flex-col gap-y-8 lg:p-24 p-8"
//         style={{ backgroundImage: "url(/assets/home/banner/dots.svg)" }}
//       >
//         <Image
//           src="/assets/home/banner/earn.png"
//           alt="model"
//           height={872}
//           width={600}
//           className="lg:absolute bottom-0 right-0 order-2"
//         />
//         <article className="flex flex-col justify-start items-end order-1">
//           <div className="flex flex-col gap-y-4 max-w-lg z-50 lg:mr-auto lg:mr-0 mr-auto">
//             <h1 className="md:text-6xl text-4xl">Earn free money with Canim</h1>
//             <p className="flex flex-row gap-x-0.5 items-center text-lg text-slate-500">
//               With Ciseco you will get free-shipping & savings combo.
//             </p>
//             <button
//               className="px-8 py-4 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit mt-4"
//               onClick={() =>
//                 router.push("https://portfolio-muhammadfaisal.vercel.app/")
//               }
//             >
//               Discover More
//             </button>
//           </div>
//         </article>
//       </div>
//     </Container>
//   );
// };

// export default Banner3;

"use client";

import { useRef, useEffect, useState, memo, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Sparkles,
  Rocket,
  Award,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

// Inline Container component
const Container = memo(({ children, className }) => (
  <div className={`container mx-auto px-4 ${className || ""}`}>{children}</div>
));
Container.displayName = "Container";

// Optimized Banner3 component
const Banner3 = memo(({ className }) => {
  const router = useRouter();
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovering, setIsHovering] = useState(false);

  // Refs for enhanced animations
  const imageRefs = useRef([]);
  const contentRefs = useRef([]);
  const carouselRef = useRef(null);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  // Banner items data with futuristic themes
  const bannerItems = [
    {
      id: 1,
      title: "Earn Crypto Rewards",
      description:
        "AI-powered rewards system with instant crypto payouts and personalized offers.",
      image: "/assets/home/banner/earn.png",
      buttonText: "Claim Rewards",
      color: "bg-gradient-to-br from-[#4dffff] to-[#00b8ff]",
      textColor: "text-white",
      icon: <Zap className="w-6 h-6 text-yellow-300" />,
      accent: "border-l-4 border-[#00eeff]",
    },
    {
      id: 2,
      title: "Neural Shopping Experience",
      description:
        "Personalized shopping powered by your biometric preferences.",
      image: "/assets/home/banner/earn.png",
      buttonText: "Connect Now",
      color: "bg-gradient-to-br from-[#ff6b6b] to-[#ff3366]",
      textColor: "text-white",
      icon: <Sparkles className="w-6 h-6 text-yellow-200" />,
      accent: "border-l-4 border-[#ff3366]",
    },
    {
      id: 3,
      title: "Quantum Loyalty Program",
      description:
        "Multi-dimensional rewards that grow exponentially with your engagement.",
      image: "/assets/home/banner/earn.png",
      buttonText: "Explore Dimensions",
      color: "bg-gradient-to-br from-[#7000ff] to-[#c400ff]",
      textColor: "text-white",
      icon: <Rocket className="w-6 h-6 text-blue-200" />,
      accent: "border-l-4 border-[#a200ff]",
    },
    {
      id: 4,
      title: "Holographic Membership",
      description:
        "Exclusive AR/VR shopping experiences with real-time holographic assistance.",
      image: "/assets/home/banner/earn.png",
      buttonText: "Activate Holo-ID",
      color: "bg-gradient-to-br from-[#00ff88] to-[#00cc99]",
      textColor: "text-white",
      icon: <Award className="w-6 h-6 text-emerald-100" />,
      accent: "border-l-4 border-[#00ff88]",
    },
  ];

  // Memoized navigation functions
  const goToSlide = useCallback(
    (index) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      setAutoPlay(false);

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Resume autoplay after 5 seconds
      timeoutRef.current = setTimeout(() => setAutoPlay(true), 5000);
    },
    [currentIndex]
  );

  const nextSlide = useCallback(() => {
    setDirection(1);
    const newIndex = (currentIndex + 1) % bannerItems.length;
    goToSlide(newIndex);
  }, [currentIndex, bannerItems.length, goToSlide]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    const newIndex =
      (currentIndex - 1 + bannerItems.length) % bannerItems.length;
    goToSlide(newIndex);
  }, [currentIndex, bannerItems.length, goToSlide]);

  // GSAP animations for current slide
  useEffect(() => {
    if (imageRefs.current[currentIndex]) {
      // Create floating animation for the current image
      const tl = gsap.timeline();

      // Reset position
      gsap.set(imageRefs.current[currentIndex], {
        y: 0,
        scale: 1,
        rotation: 0,
      });

      // Create more complex animation
      tl.to(imageRefs.current[currentIndex], {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
        .to(
          imageRefs.current[currentIndex],
          {
            scale: 1.03,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          imageRefs.current[currentIndex],
          {
            rotation: 1,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          },
          0
        );
    }

    return () => {
      // Clean up animation when slide changes
      if (imageRefs.current[currentIndex]) {
        gsap.killTweensOf(imageRefs.current[currentIndex]);
      }
    };
  }, [currentIndex]);

  // Auto-advance slides with requestAnimationFrame for better performance
  useEffect(() => {
    if (autoPlay && !isHovering) {
      let startTime = Date.now();
      let animationFrameId;

      const animate = () => {
        const currentTime = Date.now();
        if (currentTime - startTime >= 5000) {
          startTime = currentTime;
          setDirection(1);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerItems.length);
        }
        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [autoPlay, bannerItems.length, isHovering]);

  // Clean up all timeouts and intervals on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Animation variants with improved performance
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  // Memoized content renderer for better performance
  const renderContent = useCallback(
    (item, index) => (
      <motion.div
        ref={(el) => (contentRefs.current[index] = el)}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className={`max-w-lg ${item.accent} pl-4`}
      >
        <div className="backdrop-blur-sm bg-black/10 p-1 rounded-full inline-flex items-center mb-3">
          <div className="bg-white/90 rounded-full p-1 mr-2">{item.icon}</div>
          <span className="text-xs font-medium pr-3 text-white">
            NEXT-GEN REWARDS
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
          {item.title}
        </h1>

        <p
          className={`text-lg mb-6 ${item.textColor} backdrop-blur-sm bg-black/5 p-3 rounded-lg border border-white/10`}
        >
          {item.description}
        </p>

        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 15px rgba(77, 255, 255, 0.7)",
          }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-xl bg-black hover:bg-black/90 text-white transition-all drop-shadow-lg w-fit mt-4 border border-white/20 backdrop-blur-sm flex items-center gap-2 group"
          onClick={() =>
            router.push("https://portfolio-muhammadfaisal.vercel.app/")
          }
        >
          <span>{item.buttonText}</span>
          <Star className="w-4 h-4 group-hover:rotate-45 transition-transform" />
        </motion.button>
      </motion.div>
    ),
    [router]
  );

  return (
    <div className={`container mx-auto px-4 ${className || ""}`}>
      <div
        className="relative h-[500px] md:h-[550px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(77,255,255,0.3)] border border-white/10"
        ref={carouselRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Main carousel */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
            }}
            className={`absolute inset-0 ${bannerItems[currentIndex].color} flex flex-col lg:flex-row items-center overflow-hidden`}
            style={{
              backgroundImage: "url(/assets/home/banner/dots.svg)",
              backgroundSize: "cover",
              backgroundBlendMode: "soft-light",
            }}
          >
            {/* Futuristic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

            {/* Animated grid lines */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')]"></div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 py-8 z-10 order-2 lg:order-1">
              {renderContent(bannerItems[currentIndex], currentIndex)}
            </div>

            {/* Image */}
            <div className="flex-1 flex justify-center items-end h-full order-1 lg:order-2 relative">
              {/* Glow effect behind image */}
              <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white/20 filter blur-3xl"></div>

              <div
                ref={(el) => (imageRefs.current[currentIndex] = el)}
                className="lg:absolute bottom-0 right-0 z-10"
              >
                <div className="relative">
                  <Image
                    src={bannerItems[currentIndex].image || "/placeholder.svg"}
                    alt="model"
                    width={600}
                    height={872}
                    className="object-contain h-[300px] md:h-[400px] lg:h-[600px] w-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    priority
                  />

                  {/* Holographic effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 mix-blend-overlay"></div>
                </div>
              </div>
            </div>

            {/* Floating particles effect - optimized with transform instead of animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <div
                  key={`particle-${i}`}
                  className="absolute rounded-full bg-white/30 w-2 h-2"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transform: `translateY(${
                      Math.sin(Date.now() / 1000 + i) * 20
                    }px)`,
                    opacity: 0.3 + Math.sin(Date.now() / 1000 + i) * 0.7,
                    width: `${2 + Math.random() * 4}px`,
                    height: `${2 + Math.random() * 4}px`,
                  }}
                />
              ))}
            </div>

            {/* Futuristic scan line effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="h-full w-full opacity-10 bg-gradient-to-b from-transparent via-white to-transparent"
                style={{
                  transform: `translateY(${
                    -50 + Math.sin(Date.now() / 1000) * 100
                  }%)`,
                  height: "200%",
                }}
              ></div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows - more futuristic */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-md z-20 transition-all hover:scale-110 border border-white/20 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 group-hover:text-[#4dffff] transition-colors" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-md z-20 transition-all hover:scale-110 border border-white/20 group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 group-hover:text-[#4dffff] transition-colors" />
        </button>

        {/* Progress bar instead of dots - more futuristic */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[80%] max-w-md">
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/80 font-medium bg-black/30 px-2 py-1 rounded-full backdrop-blur-md">
              {currentIndex + 1}/{bannerItems.length}
            </span>
            <div className="h-1 bg-white/20 rounded-full flex-1 overflow-hidden">
              {bannerItems.map((_, index) => (
                <div
                  key={index}
                  className={`h-full transition-all duration-300 cursor-pointer ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-[#4dffff] to-white"
                      : "bg-transparent"
                  }`}
                  style={{
                    width: `${100 / bannerItems.length}%`,
                    transform: `translateX(${currentIndex * 100}%)`,
                  }}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Banner3.displayName = "Banner3";

export default Banner3;
