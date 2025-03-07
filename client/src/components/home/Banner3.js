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

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../shared/Container";
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  CreditCard,
  Gift,
  Wallet,
  Coins,
  PiggyBank,
} from "lucide-react";

const Banner3 = ({ className }) => {
  const router = useRouter();
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovering, setIsHovering] = useState(false);

  // Refs for enhanced animations
  const imageRefs = useRef([]);
  const contentRefs = useRef([]);
  const containerRef = useRef(null);

  // Banner items data with money/earnings theme - 6 slides
  const bannerItems = [
    {
      id: 1,
      title: "Earn free money with Canim",
      description: "With Ciseco you will get free-shipping & savings combo.",
      image: "/assets/home/banner/earn.png",
      buttonText: "Discover More",
      color: "bg-[#4dffff]",
      icon: <DollarSign className="w-6 h-6 text-[#ffa384]" />,
      textColor: "text-black",
      position: "right",
    },
    {
      id: 2,
      title: "Cashback on Every Purchase",
      description: "Shop more and earn more with our generous rewards program.",
      image: "/assets/home/banner/earn.png",
      buttonText: "Start Earning",
      color: "bg-[#a78bfa]",
      icon: <CreditCard className="w-6 h-6 text-white" />,
      textColor: "text-white",
      position: "right",
    },
    {
      id: 3,
      title: "Exclusive Member Rewards",
      description:
        "Join our loyalty program for special discounts and bonuses.",
      image: "/assets/home/banner/earn.png",
      buttonText: "Join Now",
      color: "bg-[#f472b6]",
      icon: <Gift className="w-6 h-6 text-white" />,
      textColor: "text-white",
      position: "right",
    },
    {
      id: 4,
      title: "Smart Savings Plan",
      description: "Set aside funds automatically with every transaction.",
      image: "/assets/home/banner/earn.png",
      buttonText: "Start Saving",
      color: "bg-[#34d399]",
      icon: <Wallet className="w-6 h-6 text-white" />,
      textColor: "text-white",
      position: "right",
    },
    {
      id: 5,
      title: "Referral Bonuses",
      description: "Invite friends and earn rewards when they make purchases.",
      image: "/assets/home/banner/earn.png",
      buttonText: "Refer & Earn",
      color: "bg-[#fb923c]",
      icon: <Coins className="w-6 h-6 text-white" />,
      textColor: "text-white",
      position: "right",
    },
    {
      id: 6,
      title: "Investment Opportunities",
      description: "Grow your money with our secure investment options.",
      image: "/assets/home/banner/earn.png",
      buttonText: "Invest Now",
      color: "bg-[#60a5fa]",
      icon: <PiggyBank className="w-6 h-6 text-white" />,
      textColor: "text-white",
      position: "right",
    },
  ];

  // Add 3D tilt effect on hover
  useEffect(() => {
    if (containerRef.current && typeof window !== "undefined") {
      const container = containerRef.current;

      const handleMouseMove = (e) => {
        if (!isHovering) return;

        const { left, top, width, height } = container.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        // Apply subtle rotation based on mouse position
        container.style.transform = `perspective(1000px) rotateY(${
          x * 5
        }deg) rotateX(${-y * 5}deg)`;
      };

      const handleMouseLeave = () => {
        container.style.transform =
          "perspective(1000px) rotateY(0deg) rotateX(0deg)";
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [isHovering]);

  // Add GSAP floating animations to current slide
  useEffect(() => {
    if (imageRefs.current[currentIndex] && typeof window !== "undefined") {
      // Only import and use GSAP on the client side
      import("gsap").then(({ gsap }) => {
        // Create a timeline for more complex animations
        const tl = gsap.timeline();

        // Floating animation for the image
        tl.to(imageRefs.current[currentIndex], {
          y: -20,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Subtle rotation
        tl.to(
          imageRefs.current[currentIndex],
          {
            rotation: 3,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          },
          "<"
        );

        return () => {
          if (imageRefs.current[currentIndex]) {
            gsap.killTweensOf(imageRefs.current[currentIndex]);
          }
        };
      });
    }
  }, [currentIndex]);

  // Handle manual navigation
  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 5000); // Resume autoplay after 5 seconds
  };

  const nextSlide = () => {
    setDirection(1);
    const newIndex = (currentIndex + 1) % bannerItems.length;
    goToSlide(newIndex);
  };

  const prevSlide = () => {
    setDirection(-1);
    const newIndex =
      (currentIndex - 1 + bannerItems.length) % bannerItems.length;
    goToSlide(newIndex);
  };

  // Auto-advance slides
  useEffect(() => {
    let interval;

    if (autoPlay && !isHovering) {
      interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerItems.length);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay, bannerItems.length, isHovering]);

  // Animation variants with more advanced effects
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 10 : -10,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 10 : -10,
    }),
  };

  // Content animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + custom * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <Container className={className ? className : ""}>
      <div
        ref={containerRef}
        className="relative h-[500px] w-full rounded-primary overflow-hidden shadow-2xl transition-all duration-300"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50 z-0">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
              animation: "pulse 8s infinite alternate",
            }}
          ></div>
        </div>

        {/* Main carousel */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
              rotateY: { duration: 0.5 },
            }}
            className={`absolute inset-0 ${bannerItems[currentIndex].color} flex flex-col lg:flex-row items-center overflow-hidden`}
            style={{
              backgroundImage: "url(/assets/home/banner/dots.svg)",
              backgroundSize: "cover",
              backgroundBlendMode: "soft-light",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Content - Left side */}
            <article className="flex flex-col justify-start items-start order-1 flex-1 lg:p-24 p-8 z-10">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={contentVariants}
                custom={0}
                className="flex flex-col gap-y-4 max-w-lg z-50 lg:mr-auto lg:ml-0 ml-auto"
              >
                <motion.span
                  variants={contentVariants}
                  custom={1}
                  className="inline-block px-3 py-1 rounded-full bg-white/30 text-sm font-medium mb-1 backdrop-blur-sm w-fit"
                >
                  Featured Offer {currentIndex + 1}
                </motion.span>
                <motion.h1
                  variants={contentVariants}
                  custom={2}
                  className={`md:text-6xl text-4xl font-bold ${bannerItems[currentIndex].textColor}`}
                >
                  {bannerItems[currentIndex].title}
                </motion.h1>
                <motion.p
                  variants={contentVariants}
                  custom={3}
                  className={`flex flex-row gap-x-0.5 items-center text-lg ${
                    bannerItems[currentIndex].textColor === "text-white"
                      ? "text-white/80"
                      : "text-slate-500"
                  }`}
                >
                  {bannerItems[currentIndex].description}
                  <span className="ml-2">{bannerItems[currentIndex].icon}</span>
                </motion.p>
                <motion.button
                  variants={contentVariants}
                  custom={4}
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-all drop-shadow w-fit mt-4"
                  onClick={() =>
                    router.push("https://portfolio-muhammadfaisal.vercel.app/")
                  }
                >
                  {bannerItems[currentIndex].buttonText}
                </motion.button>
              </motion.div>
            </article>

            {/* Image - Right side on desktop, bottom on mobile */}
            <motion.div
              className={`lg:absolute bottom-0 ${
                bannerItems[currentIndex].position === "right"
                  ? "right-0"
                  : "left-0"
              } order-2 z-10`}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
              style={{
                transformStyle: "preserve-3d",
                transform: "translateZ(50px)",
              }}
            >
              <div ref={(el) => (imageRefs.current[currentIndex] = el)}>
                <Image
                  src={bannerItems[currentIndex].image || "/placeholder.svg"}
                  alt="Money earnings illustration"
                  height={872}
                  width={600}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Decorative elements around the image */}
              <motion.div
                className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm z-0"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-1/2 -right-5 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm z-0"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
            </motion.div>

            {/* Floating particles effect - enhanced with different sizes and colors */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className={`absolute rounded-full ${
                    i % 3 === 0
                      ? "bg-white/40"
                      : i % 3 === 1
                      ? "bg-primary/30"
                      : "bg-secondary/20"
                  }`}
                  style={{
                    width: `${Math.random() * 8 + 2}px`,
                    height: `${Math.random() * 8 + 2}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float ${
                      5 + Math.random() * 15
                    }s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                  animate={{
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 5,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>

            {/* Animated gradient overlay */}
            <div
              className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
              style={{
                background:
                  "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                backgroundSize: "200% 200%",
                animation: "gradientMove 8s ease infinite",
              }}
            ></div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows - enhanced with hover effects */}
        <motion.button
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black p-3 rounded-full shadow-lg z-20 transition-all backdrop-blur-sm"
          aria-label="Previous slide"
          style={{ transform: "translateZ(50px)" }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black p-3 rounded-full shadow-lg z-20 transition-all backdrop-blur-sm"
          aria-label="Next slide"
          style={{ transform: "translateZ(50px)" }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Indicator dots - enhanced with active animations */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20 overflow-x-auto max-w-[80%] px-3 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg"
          style={{ transform: "translateZ(40px)" }}
        >
          {bannerItems.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all flex-shrink-0 ${
                index === currentIndex
                  ? "bg-white w-10"
                  : "bg-white/40 hover:bg-white/60 w-3"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={
                index === currentIndex
                  ? {
                      width: [null, 40],
                      backgroundColor: [null, "#ffffff"],
                    }
                  : {}
              }
              transition={{ duration: 0.3 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Add animations keyframes */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.5);
            opacity: 0.1;
          }
        }

        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </Container>
  );
};

export default Banner3;
