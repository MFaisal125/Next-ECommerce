// import React from "react";
// import Image from "next/image";
// import { AiTwotoneFire } from "react-icons/ai";
// import Container from "../shared/Container";
// import { useRouter } from "next/navigation";

// const Banner1 = () => {
//   const router = useRouter();

//   return (
//     <Container>
//       <div
//         className="bg-[#4dffff] h-full w-full rounded-primary relative flex flex-col gap-y-8 lg:p-24 pt-8 pb-0"
//         style={{ backgroundImage: "url(/assets/home/banner/dots.svg)" }}
//       >
//         <Image
//           src="/assets/home/banner/model1.png"
//           alt="model"
//           height={872}
//           width={500}
//           className="lg:absolute bottom-0 right-0 order-2 lg:w-[500px] lg:ml-0 md:ml-auto"
//         />
//         <article className="flex flex-col justify-start items-end order-1 px-8">
//           <div className="flex flex-col gap-y-4 max-w-lg z-20 mr-auto">
//             <h1 className="md:text-6xl text-4xl">
//               Sports Equipment Collection.
//             </h1>
//             <p className="flex flex-row gap-x-0.5 items-center text-lg text-black">
//               In this season, find your desire
//               <AiTwotoneFire className="text-[#ffa384] w-6 h-6 drop-shadow" />
//             </p>
//             <button
//               className="px-8 py-4 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit mt-4"
//               onClick={() =>
//                 router.push("https://portfolio-muhammadfaisal.vercel.app/")
//               }
//             >
//               Start Your Queries
//             </button>
//           </div>
//         </article>
//       </div>
//     </Container>
//   );
// };

// export default Banner1;

"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Award,
  Compass,
  Dumbbell,
  Trophy,
  Zap,
  Bike,
} from "lucide-react";
import Container from "../shared/Container";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const Banner1 = () => {
  const router = useRouter();
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Refs for enhanced animations
  const imageRefs = useRef([]);
  const contentRefs = useRef([]);

  // Banner items data with more carousel items (7 total)
  const bannerItems = [
    {
      id: 1,
      title: "Sports Equipment Collection",
      description: "Premium quality for champions",
      image: "/assets/home/banner/model1.png", // Keep original image
      buttonText: "Shop Collection",
      color: "bg-[#4dffff]",
      icon: <ShoppingBag className="w-6 h-6 text-[#ffa384]" />,
      textColor: "text-black",
    },
    {
      id: 2,
      title: "Fitness Gear Essentials",
      description: "Elevate your workout routine",
      image: "/assets/home/banner/model1.png", // Using placeholder for demo
      buttonText: "Explore Now",
      color: "bg-[#ff6b6b]",
      icon: <Award className="w-6 h-6 text-white" />,
      textColor: "text-white",
    },
    {
      id: 3,
      title: "Outdoor Adventure Gear",
      description: "Conquer the wilderness in style",
      image: "/assets/home/banner/model1.png", // Using placeholder for demo
      buttonText: "Discover More",
      color: "bg-[#38b000]",
      icon: <Compass className="w-6 h-6 text-white" />,
      textColor: "text-white",
    },
    {
      id: 4,
      title: "Strength Training Equipment",
      description: "Build your perfect physique",
      image: "/assets/home/banner/model1.png",
      buttonText: "Get Strong",
      color: "bg-[#3a86ff]",
      icon: <Dumbbell className="w-6 h-6 text-white" />,
      textColor: "text-white",
    },
    {
      id: 5,
      title: "Professional Sports Gear",
      description: "Used by champions worldwide",
      image: "/assets/home/banner/model1.png",
      buttonText: "Pro Selection",
      color: "bg-[#8338ec]",
      icon: <Trophy className="w-6 h-6 text-white" />,
      textColor: "text-white",
    },
    {
      id: 6,
      title: "High Performance Apparel",
      description: "Engineered for peak performance",
      image: "/assets/home/banner/model1.png",
      buttonText: "Upgrade Now",
      color: "bg-[#fb5607]",
      icon: <Zap className="w-6 h-6 text-white" />,
      textColor: "text-white",
    },
    {
      id: 7,
      title: "Cycling & Outdoor Sports",
      description: "Adventure awaits around every corner",
      image: "/assets/home/banner/model1.png",
      buttonText: "Ride On",
      color: "bg-[#06d6a0]",
      icon: <Bike className="w-6 h-6 text-white" />,
      textColor: "text-white",
    },
  ];

  // Add GSAP floating animations to current slide
  useEffect(() => {
    if (imageRefs.current[currentIndex]) {
      // Create floating animation for the current image
      gsap.to(imageRefs.current[currentIndex], {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return () => {
      // Clean up animation when slide changes
      if (imageRefs.current[currentIndex]) {
        gsap.killTweensOf(imageRefs.current[currentIndex]);
      }
    };
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

    if (autoPlay) {
      interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerItems.length);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay, bannerItems.length]);

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <Container>
      <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-2xl">
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
              opacity: { duration: 0.4 },
            }}
            className={`absolute inset-0 ${bannerItems[currentIndex].color} flex flex-col lg:flex-row items-center overflow-hidden`}
            style={{
              backgroundImage: "url(/assets/home/banner/dots.svg)",
              backgroundSize: "cover",
              backgroundBlendMode: "soft-light",
            }}
          >
            {/* Content */}
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-8 z-10">
              <motion.div
                ref={(el) => (contentRefs.current[currentIndex] = el)}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="max-w-lg"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm font-medium mb-3">
                  Featured Collection {currentIndex + 1}
                </span>
                <h1
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${bannerItems[currentIndex].textColor}`}
                >
                  {bannerItems[currentIndex].title}
                </h1>
                <p
                  className={`flex items-center text-lg mb-6 ${bannerItems[currentIndex].textColor}`}
                >
                  {bannerItems[currentIndex].description}
                  <span className="ml-2">{bannerItems[currentIndex].icon}</span>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-black hover:bg-black/90 text-white font-medium transition-colors shadow-lg"
                  onClick={() =>
                    router.push("https://portfolio-muhammadfaisal.vercel.app/")
                  }
                >
                  {bannerItems[currentIndex].buttonText}
                </motion.button>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div
              className="flex-1 flex justify-center items-center h-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div ref={(el) => (imageRefs.current[currentIndex] = el)}>
                <Image
                  src={bannerItems[currentIndex].image || "/placeholder.svg"}
                  alt={bannerItems[currentIndex].title}
                  width={400}
                  height={500}
                  className="object-contain h-[500px]"
                  priority
                />
              </div>
            </motion.div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={`particle-${i}`}
                  className="absolute rounded-full bg-white/30 w-2 h-2"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float ${
                      5 + Math.random() * 10
                    }s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg z-20 transition-transform hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg z-20 transition-transform hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicator dots - scrollable for many items */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20 overflow-x-auto max-w-[80%] px-2 py-1 bg-black/10 backdrop-blur-sm rounded-full">
          {bannerItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all flex-shrink-0 ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/80 w-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Add floating animation keyframes */}
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
      `}</style>
    </Container>
  );
};

export default Banner1;
