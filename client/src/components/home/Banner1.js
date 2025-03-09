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

import { useRef, useEffect, useState, memo, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Trophy,
  Bike,
  Sparkles,
  Flame,
  Cpu,
  Scan,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import gsap from "gsap";

// Inline Container component for single file solution
const Container = memo(({ children }) => (
  <div className="container mx-auto px-4">{children}</div>
));
Container.displayName = "Container";

// Ultra-optimized Banner1 component for 2099 design
const Banner1 = memo(() => {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Refs for enhanced animations and performance
  const imageRefs = useRef([]);
  const contentRefs = useRef([]);
  const carouselRef = useRef(null);
  const observerRef = useRef(null);
  const rafRef = useRef(null);
  const timeoutRef = useRef(null);

  // Banner items data with 2099 futuristic themes
  const bannerItems = useMemo(
    () => [
      {
        id: 1,
        title: "Neuro-Enhanced Sports Gear",
        description: "Brain-computer interface equipment for peak performance",
        image: "/assets/home/banner/model1.png", // Keep original image
        buttonText: "Neural Sync",
        color: "bg-[#4dffff]",
        gradientOverlay:
          "bg-gradient-to-br from-[#4dffff]/80 via-[#4dffff]/60 to-transparent",
        icon: <Cpu className="w-5 h-5 text-black" />,
        textColor: "text-black",
        accent: "border-l-4 border-black",
      },
      {
        id: 2,
        title: "Quantum Fitness Tech",
        description: "Multi-dimensional training with spacetime optimization",
        image: "/assets/home/banner/model1.png",
        buttonText: "Quantum Link",
        color: "bg-[#ff6b6b]",
        gradientOverlay:
          "bg-gradient-to-br from-[#ff6b6b]/80 via-[#ff6b6b]/60 to-transparent",
        icon: <Sparkles className="w-5 h-5 text-white" />,
        textColor: "text-white",
        accent: "border-l-4 border-white",
      },
      {
        id: 3,
        title: "Nano-Fiber Adventure Gear",
        description: "Self-healing materials with environmental adaptation",
        image: "/assets/home/banner/model1.png",
        buttonText: "Molecular Scan",
        color: "bg-[#38b000]",
        gradientOverlay:
          "bg-gradient-to-br from-[#38b000]/80 via-[#38b000]/60 to-transparent",
        icon: <Scan className="w-5 h-5 text-white" />,
        textColor: "text-white",
        accent: "border-l-4 border-white",
      },
      {
        id: 4,
        title: "Exo-Strength Systems",
        description:
          "Powered exoskeleton integration for superhuman capability",
        image: "/assets/home/banner/model1.png",
        buttonText: "Power Link",
        color: "bg-[#3a86ff]",
        gradientOverlay:
          "bg-gradient-to-br from-[#3a86ff]/80 via-[#3a86ff]/60 to-transparent",
        icon: <Dumbbell className="w-5 h-5 text-white" />,
        textColor: "text-white",
        accent: "border-l-4 border-white",
      },
      {
        id: 5,
        title: "Holographic Training AI",
        description: "Compete against your digital twin in any environment",
        image: "/assets/home/banner/model1.png",
        buttonText: "Holo-Start",
        color: "bg-[#8338ec]",
        gradientOverlay:
          "bg-gradient-to-br from-[#8338ec]/80 via-[#8338ec]/60 to-transparent",
        icon: <Trophy className="w-5 h-5 text-white" />,
        textColor: "text-white",
        accent: "border-l-4 border-white",
      },
      {
        id: 6,
        title: "Thermo-Adaptive Apparel",
        description: "Climate-controlled clothing with biometric feedback",
        image: "/assets/home/banner/model1.png",
        buttonText: "Bio-Sync",
        color: "bg-[#fb5607]",
        gradientOverlay:
          "bg-gradient-to-br from-[#fb5607]/80 via-[#fb5607]/60 to-transparent",
        icon: <Flame className="w-5 h-5 text-white" />,
        textColor: "text-white",
        accent: "border-l-4 border-white",
      },
      {
        id: 7,
        title: "Anti-Gravity Cycling Tech",
        description: "Vertical and zero-g terrain navigation systems",
        image: "/assets/home/banner/model1.png",
        buttonText: "Gravity Shift",
        color: "bg-[#06d6a0]",
        gradientOverlay:
          "bg-gradient-to-br from-[#06d6a0]/80 via-[#06d6a0]/60 to-transparent",
        icon: <Bike className="w-5 h-5 text-white" />,
        textColor: "text-white",
        accent: "border-l-4 border-white",
      },
    ],
    []
  );

  // Intersection Observer for performance optimization
  useEffect(() => {
    if (typeof IntersectionObserver !== "undefined" && carouselRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          setIsVisible(entry.isIntersecting);
          setAutoPlay(entry.isIntersecting && !isHovering);
        },
        { threshold: 0.1 }
      );

      observerRef.current.observe(carouselRef.current);

      return () => {
        if (observerRef.current && carouselRef.current) {
          observerRef.current.unobserve(carouselRef.current);
        }
      };
    }
  }, [isHovering]);

  // Memoized navigation functions with debounce protection
  const goToSlide = useCallback(
    (index) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      setAutoPlay(false);

      // Resume autoplay after 5 seconds
      timeoutRef.current = setTimeout(() => setAutoPlay(true), 5000);
    },
    [currentIndex]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % bannerItems.length);
  }, [currentIndex, bannerItems.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + bannerItems.length) % bannerItems.length);
  }, [currentIndex, bannerItems.length, goToSlide]);

  // GSAP animations for current slide - optimized for 2099 look
  useEffect(() => {
    if (!prefersReducedMotion && imageRefs.current[currentIndex] && isVisible) {
      // Create floating animation for the current image
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
      });

      // Reset position
      gsap.set(imageRefs.current[currentIndex], {
        y: 0,
        scale: 1,
        rotation: 0,
        filter: "blur(0px)",
      });

      // Create more complex animation
      tl.to(imageRefs.current[currentIndex], {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
        .to(
          imageRefs.current[currentIndex],
          {
            scale: 1.02,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          },
          0
        )
        .to(
          imageRefs.current[currentIndex],
          {
            filter: "drop-shadow(0 0 8px rgba(77, 255, 255, 0.5))",
            duration: 2,
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
  }, [currentIndex, isVisible, prefersReducedMotion]);

  // Auto-advance slides with requestAnimationFrame for better performance
  useEffect(() => {
    if (autoPlay && !isHovering && isVisible) {
      let startTime = Date.now();

      const animate = () => {
        const currentTime = Date.now();
        if (currentTime - startTime >= 5000) {
          startTime = currentTime;
          setDirection(1);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerItems.length);
        }
        rafRef.current = requestAnimationFrame(animate);
      };

      rafRef.current = requestAnimationFrame(animate);

      return () => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }
  }, [autoPlay, bannerItems.length, isHovering, isVisible]);

  // Clean up all timeouts and animations on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (observerRef.current && carouselRef.current) {
        observerRef.current.unobserve(carouselRef.current);
      }

      // Clean up all GSAP animations
      gsap.killTweensOf(imageRefs.current);
    };
  }, []);

  // Animation variants with hardware-accelerated properties
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

  // Quantum particle effect - ultra-optimized with Canvas
  const QuantumParticles = memo(() => {
    const canvasRef = useRef(null);

    useEffect(() => {
      if (!canvasRef.current || prefersReducedMotion || !isVisible) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const particles = [];

      // Set canvas size
      const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      // Create particles
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2,
          color: bannerItems[currentIndex].color.includes("4dffff")
            ? "rgba(77, 255, 255, "
            : bannerItems[currentIndex].color.includes("ff6b6b")
            ? "rgba(255, 107, 107, "
            : bannerItems[currentIndex].color.includes("38b000")
            ? "rgba(56, 176, 0, "
            : bannerItems[currentIndex].color.includes("3a86ff")
            ? "rgba(58, 134, 255, "
            : bannerItems[currentIndex].color.includes("8338ec")
            ? "rgba(131, 56, 236, "
            : bannerItems[currentIndex].color.includes("fb5607")
            ? "rgba(251, 86, 7, "
            : "rgba(6, 214, 160, ",
        });
      }

      // Animation loop
      let animationId;
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          // Update position
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Wrap around edges
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.y > canvas.height) particle.y = 0;
          if (particle.y < 0) particle.y = canvas.height;

          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `${particle.color}${particle.opacity})`;
          ctx.fill();

          // Connect nearby particles
          particles.forEach((otherParticle) => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 70) {
              ctx.beginPath();
              ctx.strokeStyle = `${particle.color}${
                0.1 * (1 - distance / 70)
              })`;
              ctx.lineWidth = 0.3;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          });
        });

        animationId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", resizeCanvas);
      };
    }, [isVisible, prefersReducedMotion, currentIndex]);

    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{ opacity: 0.6 }}
      />
    );
  });

  QuantumParticles.displayName = "QuantumParticles";

  // Memoized content renderer for better performance
  const renderContent = useCallback(
    (item, index) => (
      <motion.div
        ref={(el) => (contentRefs.current[index] = el)}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.1,
        }}
        className={`max-w-lg ${item.accent} pl-4`}
      >
        {/* Futuristic badge */}
        <div className="backdrop-blur-sm bg-black/5 p-1 rounded-full inline-flex items-center mb-2 border border-black/10">
          <div
            className={`${
              item.color.includes("4dffff") ? "bg-white" : "bg-white/20"
            } rounded-full p-1 mr-2`}
          >
            {item.icon}
          </div>
          <span className={`text-xs font-medium pr-3 ${item.textColor}`}>
            COLLECTION 2099
          </span>
        </div>

        {/* Title with animated underline */}
        <div className="relative mb-3">
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${item.textColor}`}
          >
            {item.title}
          </h1>
          <motion.div
            className={`h-0.5 ${
              item.color.includes("4dffff") ? "bg-black" : "bg-white"
            } mt-1 w-0`}
            animate={{ width: "40%" }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          />
        </div>

        {/* Description with glass effect */}
        <p
          className={`text-sm sm:text-base md:text-lg mb-4 ${item.textColor} backdrop-blur-sm bg-black/5 p-2 rounded-lg border border-white/10`}
        >
          {item.description}
        </p>

        {/* Futuristic button */}
        <motion.button
          whileHover={{
            scale: 1.03,
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
          }}
          whileTap={{ scale: 0.97 }}
          className="px-5 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl bg-black hover:bg-black/90 text-white transition-all drop-shadow-lg w-fit border border-white/20 flex items-center gap-2 group text-sm sm:text-base"
          onClick={() =>
            router.push("https://portfolio-muhammadfaisal.vercel.app/")
          }
        >
          <span>{item.buttonText}</span>
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
        </motion.button>
      </motion.div>
    ),
    [router]
  );

  // Holographic scan effect - 2099 style
  const HolographicScan = memo(() => {
    const scanRef = useRef(null);

    useEffect(() => {
      if (!scanRef.current || prefersReducedMotion || !isVisible) return;

      const scanAnimation = gsap.to(scanRef.current, {
        y: "200%",
        duration: 3,
        repeat: -1,
        ease: "power1.inOut",
        repeatDelay: 0.5,
      });

      return () => {
        scanAnimation.kill();
      };
    }, [isVisible, prefersReducedMotion]);

    return (
      <div
        ref={scanRef}
        className="absolute inset-0 h-[1px] w-full opacity-70 z-20 pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent, ${
            bannerItems[currentIndex].color.includes("4dffff")
              ? "rgba(77, 255, 255, 0.8)"
              : bannerItems[currentIndex].color.includes("ff6b6b")
              ? "rgba(255, 107, 107, 0.8)"
              : bannerItems[currentIndex].color.includes("38b000")
              ? "rgba(56, 176, 0, 0.8)"
              : bannerItems[currentIndex].color.includes("3a86ff")
              ? "rgba(58, 134, 255, 0.8)"
              : bannerItems[currentIndex].color.includes("8338ec")
              ? "rgba(131, 56, 236, 0.8)"
              : bannerItems[currentIndex].color.includes("fb5607")
              ? "rgba(251, 86, 7, 0.8)"
              : "rgba(6, 214, 160, 0.8)"
          }, transparent)`,
          boxShadow: `0 0 10px ${
            bannerItems[currentIndex].color.includes("4dffff")
              ? "rgba(77, 255, 255, 0.8)"
              : bannerItems[currentIndex].color.includes("ff6b6b")
              ? "rgba(255, 107, 107, 0.8)"
              : bannerItems[currentIndex].color.includes("38b000")
              ? "rgba(56, 176, 0, 0.8)"
              : bannerItems[currentIndex].color.includes("3a86ff")
              ? "rgba(58, 134, 255, 0.8)"
              : bannerItems[currentIndex].color.includes("8338ec")
              ? "rgba(131, 56, 236, 0.8)"
              : bannerItems[currentIndex].color.includes("fb5607")
              ? "rgba(251, 86, 7, 0.8)"
              : "rgba(6, 214, 160, 0.8)"
          }`,
        }}
      />
    );
  });

  HolographicScan.displayName = "HolographicScan";

  // Digital circuit pattern - 2099 style
  const CircuitPattern = memo(() => (
    <div
      className="absolute inset-0 opacity-5 pointer-events-none z-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M10 10h10v10H10zM30 10h10v10H30zM50 10h10v10H50zM70 10h10v10H70zM90 10h10v10H90zM10 30h10v10H10zM30 30h10v10H30zM50 30h10v10H50zM70 30h10v10H70zM90 30h10v10H90zM10 50h10v10H10zM30 50h10v10H30zM50 50h10v10H50zM70 50h10v10H70zM90 50h10v10H90zM10 70h10v10H10zM30 70h10v10H30zM50 70h10v10H50zM70 70h10v10H70zM90 70h10v10H90zM10 90h10v10H10zM30 90h10v10H30zM50 90h10v10H50zM70 90h10v10H70zM90 90h10v10H90z' fill='%23000' fillOpacity='1'/%3E%3Cpath d='M20 10v10M20 30v10M20 50v10M20 70v10M20 90v10M40 10v10M40 30v10M40 50v10M40 70v10M40 90v10M60 10v10M60 30v10M60 50v10M60 70v10M60 90v10M80 10v10M80 30v10M80 50v10M80 70v10M80 90v10M10 20h10M30 20h10M50 20h10M70 20h10M90 20h10M10 40h10M30 40h10M50 40h10M70 40h10M90 40h10M10 60h10M30 60h10M50 60h10M70 60h10M90 60h10M10 80h10M30 80h10M50 80h10M70 80h10M90 80h10' stroke='%23000' strokeWidth='1' strokeOpacity='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: "30px 30px",
      }}
    />
  ));

  CircuitPattern.displayName = "CircuitPattern";

  return (
    <Container>
      <div
        className="relative h-[450px] sm:h-[400px] md:h-[450px] lg:h-[450px] w-full rounded-xl overflow-hidden shadow-lg border border-white/10"
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
              opacity: { duration: 0.3 },
            }}
            className="absolute inset-0 flex flex-col md:flex-row items-center overflow-hidden"
          >
            {/* Background with dots pattern */}
            <div
              className={`absolute inset-0 ${bannerItems[currentIndex].color}`}
              style={{
                backgroundImage: "url(/assets/home/banner/dots.svg)",
                backgroundSize: "cover",
                backgroundBlendMode: "soft-light",
              }}
            />

            {/* Gradient overlay */}
            <div
              className={`absolute inset-0 ${bannerItems[currentIndex].gradientOverlay}`}
            />

            {/* Circuit pattern */}
            <CircuitPattern />

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-4 z-10 order-2 md:order-1">
              {renderContent(bannerItems[currentIndex], currentIndex)}
            </div>

            {/* Image */}
            <div className="flex-1 flex justify-center items-end h-full order-1 md:order-2 relative">
              <div
                ref={(el) => (imageRefs.current[currentIndex] = el)}
                className="md:absolute bottom-0 right-0 z-10"
              >
                <div className="relative">
                  <Image
                    src={bannerItems[currentIndex].image || "/placeholder.svg"}
                    alt={bannerItems[currentIndex].title}
                    width={400}
                    height={500}
                    className="object-contain h-[150px] sm:h-[180px] md:h-[250px] lg:h-[400px] w-auto"
                    priority
                    loading="eager"
                  />

                  {/* Holographic effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 mix-blend-overlay"></div>
                </div>
              </div>

              {/* Circular glow behind image */}
              <div
                className="absolute bottom-0 right-0 w-32 h-32 rounded-full filter blur-xl"
                style={{
                  background: bannerItems[currentIndex].color.includes("4dffff")
                    ? "rgba(77, 255, 255, 0.2)"
                    : bannerItems[currentIndex].color.includes("ff6b6b")
                    ? "rgba(255, 107, 107, 0.2)"
                    : bannerItems[currentIndex].color.includes("38b000")
                    ? "rgba(56, 176, 0, 0.2)"
                    : bannerItems[currentIndex].color.includes("3a86ff")
                    ? "rgba(58, 134, 255, 0.2)"
                    : bannerItems[currentIndex].color.includes("8338ec")
                    ? "rgba(131, 56, 236, 0.2)"
                    : bannerItems[currentIndex].color.includes("fb5607")
                    ? "rgba(251, 86, 7, 0.2)"
                    : "rgba(6, 214, 160, 0.2)",
                }}
              ></div>
            </div>

            {/* Quantum particle effect */}
            {!prefersReducedMotion && <QuantumParticles />}

            {/* Holographic scan effect */}
            {!prefersReducedMotion && <HolographicScan />}

            {/* Futuristic data display */}
            <div className="absolute bottom-2 left-2 z-20 hidden md:block">
              <div
                className="text-[8px] font-mono bg-white/30 backdrop-blur-sm p-1 rounded border border-white/10 w-24"
                style={{ color: bannerItems[currentIndex].textColor }}
              >
                <div>SYS: ACTIVE</div>
                <div>
                  QBT: {Math.floor(Math.random() * 1000)}.
                  {Math.floor(Math.random() * 100)}
                </div>
                <div>USR: VERIFIED</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows - 2099 style */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 p-2 rounded-full backdrop-blur-md z-20 transition-all hover:scale-110 border border-white/10 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 group-hover:text-white transition-colors" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 p-2 rounded-full backdrop-blur-md z-20 transition-all hover:scale-110 border border-white/10 group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 group-hover:text-white transition-colors" />
        </button>

        {/* Progress indicator - 2099 style */}
        <div className="absolute bottom-2 right-2 z-20">
          <div className="flex items-center gap-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1 border border-white/10">
            {bannerItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`size-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white"
                    : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
});

Banner1.displayName = "Banner1";

export default Banner1;
