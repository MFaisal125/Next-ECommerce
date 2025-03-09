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

import { useRef, useEffect, useState, memo, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  Brain,
  Atom,
  Scan,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import gsap from "gsap";

// Ultra-optimized Banner3 component for 2099 design with reduced height
const Banner3 = memo(({ className }) => {
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

  // Banner items with existing images
  const bannerItems = useMemo(
    () => [
      {
        id: 1,
        title: "Neural Interface Shopping",
        description:
          "Thought-powered commerce with quantum biometric verification.",
        image: "/assets/home/banner/earn.png", // Keeping original image
        buttonText: "Neural Link",
        color: "bg-[#4dffff]",
        gradientOverlay:
          "bg-gradient-to-br from-[#4dffff]/80 via-[#4dffff]/60 to-transparent",
        textColor: "text-black",
        icon: <Brain className="w-5 h-5 text-black" />,
        accent: "border-l-4 border-black",
      },
      {
        id: 2,
        title: "Quantum Reward Synthesis",
        description:
          "Multi-dimensional value generation through spacetime arbitrage.",
        image: "/assets/home/banner/earn.png", // Keeping original image
        buttonText: "Entangle Now",
        color: "bg-[#4dffff]",
        gradientOverlay:
          "bg-gradient-to-br from-[#4dffff]/80 via-[#4dffff]/60 to-transparent",
        textColor: "text-black",
        icon: <Atom className="w-5 h-5 text-black" />,
        accent: "border-l-4 border-black",
      },
      {
        id: 3,
        title: "Nano-Biometric Loyalty",
        description:
          "DNA-linked rewards that evolve with your biological preferences.",
        image: "/assets/home/banner/earn.png", // Keeping original image
        buttonText: "Bio-Sync",
        color: "bg-[#4dffff]",
        gradientOverlay:
          "bg-gradient-to-br from-[#4dffff]/80 via-[#4dffff]/60 to-transparent",
        textColor: "text-black",
        icon: <Scan className="w-5 h-5 text-black" />,
        accent: "border-l-4 border-black",
      },
      {
        id: 4,
        title: "Sentient AI Concierge",
        description:
          "Hyper-personalized shopping with your digital consciousness twin.",
        image: "/assets/home/banner/earn.png", // Keeping original image
        buttonText: "Consciousness Link",
        color: "bg-[#4dffff]",
        gradientOverlay:
          "bg-gradient-to-br from-[#4dffff]/80 via-[#4dffff]/60 to-transparent",
        textColor: "text-black",
        icon: <Cpu className="w-5 h-5 text-black" />,
        accent: "border-l-4 border-black",
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
        y: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
        .to(
          imageRefs.current[currentIndex],
          {
            scale: 1.02,
            duration: 3,
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
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2,
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
          ctx.fillStyle = `rgba(77, 255, 255, ${particle.opacity})`;
          ctx.fill();

          // Connect nearby particles
          particles.forEach((otherParticle) => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 70) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(77, 255, 255, ${
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
    }, [isVisible, prefersReducedMotion]);

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
        className="max-w-lg"
      >
        {/* Futuristic badge */}
        <div className="backdrop-blur-sm bg-black/5 p-1 rounded-full inline-flex items-center mb-2 border border-black/10">
          <div className="bg-white rounded-full p-1 mr-2">{item.icon}</div>
          <span className="text-xs font-medium pr-3 text-black">
            CANIM 2099
          </span>
        </div>

        {/* Title with animated underline */}
        <div className="relative mb-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
            {item.title}
          </h1>
          <motion.div
            className="h-0.5 bg-black mt-1 w-0"
            animate={{ width: "40%" }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          />
        </div>

        {/* Description with glass effect */}
        <p
          className={`text-sm sm:text-base mb-4 ${item.textColor} backdrop-blur-sm bg-black/5 p-2 rounded-lg border border-black/10`}
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
          className="px-5 py-2 rounded-xl bg-black hover:bg-black/90 text-white transition-all drop-shadow-lg w-fit border border-black/20 flex items-center gap-2 group text-sm"
          onClick={() =>
            router.push("https://portfolio-muhammadfaisal.vercel.app/")
          }
        >
          <span>{item.buttonText}</span>
          <Sparkles className="w-3 h-3 group-hover:scale-110 transition-transform" />
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
        className="absolute inset-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#4dffff] to-transparent opacity-70 z-20 pointer-events-none"
        style={{ boxShadow: "0 0 10px rgba(77, 255, 255, 0.8)" }}
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
    <div className={`container mx-auto px-4 ${className || ""}`}>
      <div
        className="relative h-[450px] sm:h-[400px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-black/10"
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
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-4 z-10 order-2 md:order-1">
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
                    alt="model"
                    width={300}
                    height={436}
                    className="object-contain h-[150px] sm:h-[180px] md:h-[250px] w-auto"
                    priority
                    loading="eager"
                  />

                  {/* Holographic effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 mix-blend-overlay"></div>
                </div>
              </div>

              {/* Circular glow behind image */}
              <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-[#4dffff]/20 filter blur-xl"></div>
            </div>

            {/* Quantum particle effect */}
            {!prefersReducedMotion && <QuantumParticles />}

            {/* Holographic scan effect */}
            {!prefersReducedMotion && <HolographicScan />}

            {/* Futuristic data display */}
            <div className="absolute bottom-2 left-2 z-20 hidden md:block">
              <div className="text-[8px] font-mono text-black/60 bg-white/30 backdrop-blur-sm p-1 rounded border border-black/10 w-24">
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
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 text-black p-2 rounded-full backdrop-blur-md z-20 transition-all hover:scale-110 border border-black/10 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 group-hover:text-black transition-colors" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 text-black p-2 rounded-full backdrop-blur-md z-20 transition-all hover:scale-110 border border-black/10 group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 group-hover:text-black transition-colors" />
        </button>

        {/* Progress indicator - 2099 style */}
        <div className="absolute bottom-2 right-2 z-20">
          <div className="flex items-center gap-1 bg-white/30 backdrop-blur-sm rounded-full px-2 py-1 border border-black/10">
            {bannerItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`size-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-black"
                    : "bg-black/20 hover:bg-black/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

Banner3.displayName = "Banner3";

export default Banner3;
