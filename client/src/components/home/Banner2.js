// import React from "react";
// import Container from "../shared/Container";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// const Banner2 = ({ className }) => {
//   const router = useRouter();

//   return (
//     <section className="mt-20">
//       <Container className={className ? className : ""}>
//         <div
//           className="bg-[#4dffff] h-full w-full rounded-primary relative flex flex-col gap-y-8 lg:p-24 p-8"
//           style={{ backgroundImage: "url(/assets/home/banner/dots.svg)" }}
//         >
//           <Image
//             src="/assets/home/banner/kid.png"
//             alt="model"
//             height={872}
//             width={600}
//             className="lg:absolute bottom-0 left-0 order-2"
//           />
//           <article className="flex flex-col justify-start items-end order-1">
//             <div className="flex flex-col gap-y-4 max-w-lg z-50 lg:ml-auto lg:mr-0 mr-auto">
//               <h1 className="md:text-6xl text-4xl">
//                 Special offer in kids products
//               </h1>
//               <p className="flex flex-row gap-x-0.5 items-center text-lg text-slate-500">
//                 Fashion is a form of self-expression and autonomy at a
//                 particular period and place.
//               </p>
//               <button
//                 className="px-8 py-4 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit mt-4"
//                 onClick={() =>
//                   router.push("https://portfolio-muhammadfaisal.vercel.app/")
//                 }
//               >
//                 Discover More
//               </button>
//             </div>
//           </article>
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default Banner2;

"use client";

import { useRef, useEffect, useState, memo, useCallback, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles, Zap, Cpu } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Optimized Container component
const Container = memo(({ children, className }) => (
  <div className={`container mx-auto px-4 ${className || ""}`}>{children}</div>
));
Container.displayName = "Container";

const Banner2 = memo(({ className }) => {
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
  const gsapRef = useRef(null);

  // Memoized banner items data with 2098 futuristic themes
  const bannerItems = useMemo(
    () => [
      {
        id: 1,
        title: "Neuro-Adaptive Kids Apparel",
        description:
          "Self-adjusting fabrics that grow with your child's neural patterns",
        image: "/assets/home/banner/kid.png",
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
        title: "Quantum Learning Toys",
        description:
          "Educational tools that adapt to your child's cognitive development",
        image: "/assets/home/banner/kid.png",
        buttonText: "Quantum Link",
        color: "bg-[#ff9e7d]",
        gradientOverlay:
          "bg-gradient-to-br from-[#ff9e7d]/80 via-[#ff9e7d]/60 to-transparent",
        icon: <Sparkles className="w-5 h-5 text-white" />,
        textColor: "text-white",
        accent: "border-l-4 border-white",
      },
      {
        id: 3,
        title: "Biometric School Gear",
        description:
          "Supplies that monitor health and optimize learning environments",
        image: "/assets/home/banner/kid.png",
        buttonText: "Bio-Sync",
        color: "bg-[#7dd3fc]",
        gradientOverlay:
          "bg-gradient-to-br from-[#7dd3fc]/80 via-[#7dd3fc]/60 to-transparent",
        icon: <Zap className="w-5 h-5 text-black" />,
        textColor: "text-black",
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

  // Dynamically import GSAP for better code splitting
  useEffect(() => {
    let isMounted = true;

    const loadGsap = async () => {
      if (typeof window !== "undefined") {
        const gsapModule = await import("gsap");
        if (isMounted) {
          gsapRef.current = gsapModule.gsap;
          animateCurrentSlide();
        }
      }
    };

    loadGsap();

    return () => {
      isMounted = false;
    };
  }, []);

  // GSAP animations for current slide - optimized for 2098 look
  const animateCurrentSlide = useCallback(() => {
    if (
      !gsapRef.current ||
      !imageRefs.current[currentIndex] ||
      !isVisible ||
      prefersReducedMotion
    )
      return;

    // Reset position
    gsapRef.current.set(imageRefs.current[currentIndex], {
      y: 0,
      scale: 1,
      rotation: 0,
      filter: "blur(0px)",
    });

    // Create more complex animation
    const tl = gsapRef.current.timeline({
      defaults: { ease: "power2.inOut" },
    });

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

    return () => {
      if (gsapRef.current && imageRefs.current[currentIndex]) {
        gsapRef.current.killTweensOf(imageRefs.current[currentIndex]);
      }
    };
  }, [currentIndex, isVisible, prefersReducedMotion]);

  // Run animation when current slide changes
  useEffect(() => {
    const cleanup = animateCurrentSlide();
    return cleanup;
  }, [animateCurrentSlide, currentIndex]);

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
      if (gsapRef.current) {
        gsapRef.current.killTweensOf(imageRefs.current);
      }
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
          color: bannerItems[currentIndex].color.includes("4dffff")
            ? "rgba(77, 255, 255, "
            : bannerItems[currentIndex].color.includes("ff9e7d")
            ? "rgba(255, 158, 125, "
            : "rgba(125, 211, 252, ",
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

  // Holographic scan effect - 2098 style
  const HolographicScan = memo(() => {
    const scanRef = useRef(null);

    useEffect(() => {
      if (
        !scanRef.current ||
        prefersReducedMotion ||
        !isVisible ||
        !gsapRef.current
      )
        return;

      const scanAnimation = gsapRef.current.to(scanRef.current, {
        y: "200%",
        duration: 2,
        repeat: -1,
        ease: "power1.inOut",
        repeatDelay: 0.5,
      });

      return () => {
        if (scanAnimation) {
          scanAnimation.kill();
        }
      };
    }, [isVisible, prefersReducedMotion]);

    // Extract color values from the color string
    let scanColor = "rgba(77, 255, 255, 0.8)"; // Default cyan

    if (bannerItems[currentIndex].color.includes("ff9e7d")) {
      scanColor = "rgba(255, 158, 125, 0.8)"; // Orange
    } else if (bannerItems[currentIndex].color.includes("7dd3fc")) {
      scanColor = "rgba(125, 211, 252, 0.8)"; // Blue
    }

    return (
      <div
        ref={scanRef}
        className="absolute inset-0 h-[1px] w-full opacity-70 z-20 pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent, ${scanColor}, transparent)`,
          boxShadow: `0 0 5px ${scanColor}`,
        }}
      />
    );
  });

  HolographicScan.displayName = "HolographicScan";

  // Digital circuit pattern - 2098 style
  const CircuitPattern = memo(() => (
    <div
      className="absolute inset-0 opacity-5 pointer-events-none z-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M6 6h6v6H6zM18 6h6v6h-6zM30 6h6v6h-6zM42 6h6v6h-6zM54 6h6v6h-6zM6 18h6v6H6zM18 18h6v6h-6zM30 18h6v6h-6zM42 18h6v6h-6zM54 18h6v6h-6zM6 30h6v6H6zM18 30h6v6h-6zM30 30h6v6h-6zM42 30h6v6h-6zM54 30h6v6h-6zM6 42h6v6H6zM18 42h6v6h-6zM30 42h6v6h-6zM42 42h6v6h-6zM54 42h6v6h-6zM6 54h6v6H6zM18 54h6v6h-6zM30 54h6v6h-6zM42 54h6v6h-6zM54 54h6v6h-6z' fill='%23000' fillOpacity='1'/%3E%3Cpath d='M12 6v6M12 18v6M12 30v6M12 42v6M12 54v6M24 6v6M24 18v6M24 30v6M24 42v6M24 54v6M36 6v6M36 18v6M36 30v6M36 42v6M36 54v6M48 6v6M48 18v6M48 30v6M48 42v6M48 54v6M6 12h6M18 12h6M30 12h6M42 12h6M54 12h6M6 24h6M18 24h6M30 24h6M42 24h6M54 24h6M6 36h6M18 36h6M30 36h6M42 36h6M54 36h6M6 48h6M18 48h6M30 48h6M42 48h6M54 48h6' stroke='%23000' strokeWidth='0.5' strokeOpacity='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: "20px 20px",
      }}
    />
  ));

  CircuitPattern.displayName = "CircuitPattern";

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
        className={`flex flex-col gap-y-4 max-w-lg z-50 lg:ml-auto lg:mr-0 mr-auto ${item.accent} pl-4`}
      >
        {/* Futuristic badge */}
        <div className="backdrop-blur-sm bg-black/5 p-1 rounded-full inline-flex items-center mb-2 border border-black/10 w-fit">
          <div
            className={`${
              item.color.includes("4dffff") || item.color.includes("7dd3fc")
                ? "bg-white"
                : "bg-white/20"
            } rounded-full p-1 mr-2`}
          >
            {item.icon}
          </div>
          <span className={`text-xs font-medium pr-3 ${item.textColor}`}>
            CANIM 2098
          </span>
        </div>

        {/* Title with animated underline */}
        <div className="relative mb-3">
          <h1 className={`md:text-5xl text-3xl font-bold ${item.textColor}`}>
            {item.title}
          </h1>
          <motion.div
            className={`h-0.5 ${
              item.color.includes("ff9e7d") ? "bg-white" : "bg-black"
            } mt-1 w-0`}
            animate={{ width: "40%" }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          />
        </div>

        {/* Description with glass effect */}
        <p
          className={`flex flex-row gap-x-0.5 items-center text-lg ${
            item.color.includes("ff9e7d") ? "text-white/80" : "text-slate-700"
          } backdrop-blur-sm bg-black/5 p-2 rounded-lg border border-white/10`}
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
          className="px-8 py-4 rounded-xl bg-black hover:bg-black/90 text-white transition-all drop-shadow w-fit border border-white/20 flex items-center gap-2 group"
          onClick={() =>
            router.push("https://portfolio-muhammadfaisal.vercel.app/")
          }
        >
          <span>{item.buttonText}</span>
          <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </motion.button>
      </motion.div>
    ),
    [router]
  );

  return (
    <section className="mt-20">
      <Container className={className || ""}>
        <div
          className="relative h-[500px] w-full rounded-primary overflow-hidden shadow-lg border border-white/10"
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
              className="absolute inset-0 flex flex-col lg:flex-row items-center overflow-hidden"
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

              {/* Content - Right side */}
              <article className="flex flex-col justify-start items-end order-1 flex-1 lg:p-24 p-8 z-10">
                {renderContent(bannerItems[currentIndex], currentIndex)}
              </article>

              {/* Image - Left side on desktop */}
              <div className="lg:absolute bottom-0 left-0 order-2 z-10">
                <div
                  ref={(el) => (imageRefs.current[currentIndex] = el)}
                  className="relative"
                >
                  <Image
                    src={bannerItems[currentIndex].image || "/placeholder.svg"}
                    alt="Kid model"
                    height={872}
                    width={600}
                    className="object-contain"
                    priority
                    loading="eager"
                  />

                  {/* Holographic effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 mix-blend-overlay"></div>
                </div>

                {/* Circular glow behind image */}
                <div
                  className="absolute bottom-0 left-0 w-32 h-32 rounded-full filter blur-xl"
                  style={{
                    background: bannerItems[currentIndex].color.includes(
                      "4dffff"
                    )
                      ? "rgba(77, 255, 255, 0.2)"
                      : bannerItems[currentIndex].color.includes("ff9e7d")
                      ? "rgba(255, 158, 125, 0.2)"
                      : "rgba(125, 211, 252, 0.2)",
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

          {/* Navigation arrows - 2098 style */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 p-2 rounded-full backdrop-blur-md z-20 transition-all hover:scale-110 border border-white/10 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 group-hover:text-white transition-colors" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 p-2 rounded-full backdrop-blur-md z-20 transition-all hover:scale-110 border border-white/10 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 group-hover:text-white transition-colors" />
          </button>

          {/* Progress indicator - 2098 style */}
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
      </Container>
    </section>
  );
});

Banner2.displayName = "Banner2";

export default Banner2;
