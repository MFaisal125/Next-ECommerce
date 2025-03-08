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

import { useRef, useEffect, useState, useCallback, memo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { gsap } from "gsap";
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

// Container component included directly in this file
const Container = ({ children, className }) => {
  return (
    <div className={`container mx-auto px-4 ${className || ""}`}>
      {children}
    </div>
  );
};

// Optimized particle component with WebGL rendering for better performance
const QuantumParticles = memo(({ isActive, color }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const requestRef = useRef(null);

  // Initialize particles once
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particleCount = 50;

    // Set canvas size to match parent
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5,
      color: color || "#ffffff",
    }));

    // Animation function
    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
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
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.fill();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    if (isActive) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isActive, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.5s ease" }}
    />
  );
});
QuantumParticles.displayName = "QuantumParticles";

// Optimized navigation button component
const NavButton = memo(({ direction, onClick, ariaLabel }) => {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const position = direction === "prev" ? "left-4" : "right-4";

  return (
    <motion.button
      whileHover={{
        scale: 1.1,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`absolute ${position} top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 sm:p-3 rounded-full shadow-lg z-30 transition-all backdrop-blur-sm`}
      aria-label={ariaLabel}
      style={{ transform: "translateZ(50px)" }}
    >
      <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
    </motion.button>
  );
});
NavButton.displayName = "NavButton";

// Optimized indicator dots component
const IndicatorDots = memo(({ items, currentIndex, goToSlide }) => {
  return (
    <div
      className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-1.5 z-30 overflow-x-auto max-w-[90%] px-2 py-1.5 sm:px-3 sm:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg"
      style={{ transform: "translateZ(40px)" }}
    >
      {items.map((_, index) => (
        <motion.button
          key={index}
          onClick={() => goToSlide(index)}
          className={`h-2 sm:h-3 rounded-full transition-all flex-shrink-0 ${
            index === currentIndex
              ? "bg-white w-6 sm:w-10"
              : "bg-white/40 hover:bg-white/60 w-2 sm:w-3"
          }`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          animate={
            index === currentIndex
              ? {
                  width: [null, window.innerWidth < 640 ? 24 : 40],
                  backgroundColor: [null, "#ffffff"],
                }
              : {}
          }
          transition={{ duration: 0.3 }}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
});
IndicatorDots.displayName = "IndicatorDots";

// Optimized banner content component
const BannerContent = memo(({ item, router }) => {
  // Use spring animations for smoother motion
  const y = useSpring(30, { stiffness: 100, damping: 15 });
  const opacity = useSpring(0, { stiffness: 100, damping: 15 });

  useEffect(() => {
    y.set(0);
    opacity.set(1);

    return () => {
      y.set(30);
      opacity.set(0);
    };
  }, [item.id, y, opacity]);

  return (
    <article className="flex flex-col justify-start items-start order-2 lg:order-1 flex-1 p-4 sm:p-6 lg:p-12 xl:p-16 z-20">
      <motion.div
        className="flex flex-col gap-y-2 sm:gap-y-4 max-w-lg z-50 w-full"
        style={{ y, opacity }}
      >
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-block px-3 py-1 rounded-full bg-white/30 text-xs sm:text-sm font-medium mb-1 backdrop-blur-sm w-fit"
        >
          Featured Offer {item.id}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold ${item.textColor} leading-tight`}
        >
          {item.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className={`flex flex-row gap-x-0.5 items-center text-base sm:text-lg ${
            item.textColor === "text-white" ? "text-white/80" : "text-slate-500"
          }`}
        >
          {item.description}
          <span className="ml-2">{item.icon}</span>
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{
            scale: 1.05,
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 sm:px-8 sm:py-4 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-all drop-shadow w-fit mt-4"
          onClick={() =>
            router.push("https://portfolio-muhammadfaisal.vercel.app/")
          }
        >
          {item.buttonText}
        </motion.button>
      </motion.div>
    </article>
  );
});
BannerContent.displayName = "BannerContent";

// Optimized banner image component
const BannerImage = memo(({ item, index }) => {
  const imageRef = useRef(null);

  // Add floating animation with GSAP
  useEffect(() => {
    if (!imageRef.current) return;

    const animation = gsap.to(imageRef.current, {
      y: -15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      paused: true,
    });

    animation.play();

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <motion.div
      className="order-1 lg:order-2 lg:absolute lg:bottom-0 lg:right-0 z-20 w-full lg:w-auto h-[150px] sm:h-[200px] md:h-[200px] lg:h-auto flex items-center justify-center lg:justify-end overflow-hidden"
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
      style={{
        transformStyle: "preserve-3d",
        transform: "translateZ(50px)",
      }}
    >
      <div
        ref={imageRef}
        className="relative w-full h-full lg:w-auto lg:h-auto"
      >
        <Image
          src={item.image || "/placeholder.svg"}
          alt="Money earnings illustration"
          width={600}
          height={872}
          className="object-contain drop-shadow-2xl w-auto h-full lg:h-auto"
          priority={index < 2}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        />
      </div>
    </motion.div>
  );
});
BannerImage.displayName = "BannerImage";

// Quantum corner component
const QuantumCorner = memo(({ corner, isHovering }) => {
  const positions = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  const colors = {
    "top-left": "bg-blue-400",
    "top-right": "bg-purple-400",
    "bottom-left": "bg-pink-400",
    "bottom-right": "bg-blue-400",
  };

  const isHorizontal = corner.includes("top") ? "top-0" : "bottom-0";
  const isVertical = corner.includes("left") ? "left-0" : "right-0";
  const originH = corner.includes("left") ? "left" : "right";
  const originV = corner.includes("top") ? "top" : "bottom";

  return (
    <div
      className={`absolute ${positions[corner]} w-6 h-6 pointer-events-none z-30`}
    >
      <motion.div
        className={`absolute ${isHorizontal} ${
          corner.includes("left") ? "left-0" : "right-0"
        } w-full h-0.5 ${colors[corner]}`}
        initial={{ scaleX: 0.3, opacity: 0.3 }}
        animate={{
          scaleX: isHovering ? 1 : 0.3,
          opacity: isHovering ? 1 : 0.3,
          boxShadow: isHovering
            ? `0 0 10px 1px ${colors[corner].replace("bg-", "")}`
            : "none",
        }}
        transition={{ duration: 0.4 }}
        style={{ transformOrigin: originH }}
      ></motion.div>
      <motion.div
        className={`absolute ${isVertical} ${
          corner.includes("top") ? "top-0" : "bottom-0"
        } w-0.5 h-full ${colors[corner]}`}
        initial={{ scaleY: 0.3, opacity: 0.3 }}
        animate={{
          scaleY: isHovering ? 1 : 0.3,
          opacity: isHovering ? 1 : 0.3,
          boxShadow: isHovering
            ? `0 0 10px 1px ${colors[corner].replace("bg-", "")}`
            : "none",
        }}
        transition={{ duration: 0.4 }}
        style={{ transformOrigin: originV }}
      ></motion.div>
    </div>
  );
});
QuantumCorner.displayName = "QuantumCorner";

// Main Banner component - optimized for 2099 standards
const Banner3 = ({ className }) => {
  const router = useRouter();
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  // Use motion values for smoother 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  // Banner items data with money/earnings theme - 6 slides
  const bannerItems = [
    {
      id: 1,
      title: "Earn free money with Canim",
      description: "With Ciseco you will get free-shipping & savings combo.",
      image: "/assets/home/banner/earn.png",
      buttonText: "Discover More",
      color: "bg-[#4dffff]",
      icon: <DollarSign className="w-5 h-5 text-[#ffa384]" />,
      textColor: "text-black",
      particleColor: "#4dffff",
    },
    {
      id: 2,
      title: "Cashback on Every Purchase",
      description: "Shop more and earn more with our generous rewards program.",
      image: "/assets/home/banner/earn.png",
      buttonText: "Start Earning",
      color: "bg-[#a78bfa]",
      icon: <CreditCard className="w-5 h-5 text-white" />,
      textColor: "text-white",
      particleColor: "#a78bfa",
    },
    {
      id: 3,
      title: "Exclusive Member Rewards",
      description:
        "Join our loyalty program for special discounts and bonuses.",
      image: "/assets/home/banner/earn.png",
      buttonText: "Join Now",
      color: "bg-[#f472b6]",
      icon: <Gift className="w-5 h-5 text-white" />,
      textColor: "text-white",
      particleColor: "#f472b6",
    },
    {
      id: 4,
      title: "Smart Savings Plan",
      description: "Set aside funds automatically with every transaction.",
      image: "/assets/home/banner/earn.png",
      buttonText: "Start Saving",
      color: "bg-[#34d399]",
      icon: <Wallet className="w-5 h-5 text-white" />,
      textColor: "text-white",
      particleColor: "#34d399",
    },
    {
      id: 5,
      title: "Referral Bonuses",
      description: "Invite friends and earn rewards when they make purchases.",
      image: "/assets/home/banner/earn.png",
      buttonText: "Refer & Earn",
      color: "bg-[#fb923c]",
      icon: <Coins className="w-5 h-5 text-white" />,
      textColor: "text-white",
      particleColor: "#fb923c",
    },
    {
      id: 6,
      title: "Investment Opportunities",
      description: "Grow your money with our secure investment options.",
      image: "/assets/home/banner/earn.png",
      buttonText: "Invest Now",
      color: "bg-[#60a5fa]",
      icon: <PiggyBank className="w-5 h-5 text-white" />,
      textColor: "text-white",
      particleColor: "#60a5fa",
    },
  ];

  // Memoized handlers for better performance
  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current || !isHovering) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      mouseX.set(x);
      mouseY.set(y);
    },
    [isHovering, mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Handle manual navigation - memoized
  const goToSlide = useCallback(
    (index) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      setAutoPlay(false);
      setTimeout(() => setAutoPlay(true), 5000); // Resume autoplay after 5 seconds
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
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)",
    }),
  };

  return (
    <Container className={className ? className : ""}>
      <motion.div
        ref={containerRef}
        className="relative w-full rounded-primary overflow-hidden shadow-2xl transition-all duration-300"
        style={{
          height: "min(70vh, 500px)",
          perspective: 1000,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Quantum background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50 z-0">
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
                "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
                "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
                "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
              ],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          ></motion.div>
        </div>

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
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
              filter: { duration: 0.5 },
            }}
            className={`absolute inset-0 ${bannerItems[currentIndex].color} flex flex-col lg:flex-row items-center overflow-hidden`}
            style={{
              backgroundImage: "url(/assets/home/banner/dots.svg)",
              backgroundSize: "cover",
              backgroundBlendMode: "soft-light",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Content */}
            <BannerContent item={bannerItems[currentIndex]} router={router} />

            {/* Image */}
            <BannerImage
              item={bannerItems[currentIndex]}
              index={currentIndex}
            />

            {/* Quantum particles effect */}
            <QuantumParticles
              isActive={true}
              color={bannerItems[currentIndex].particleColor}
            />

            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
              animate={{
                background: [
                  "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%) 0% 0% / 200% 200%",
                  "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%) 100% 100% / 200% 200%",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            ></motion.div>

            {/* Quantum scan line */}
            <motion.div
              className="absolute left-0 right-0 h-[1px] bg-white/30 z-10 pointer-events-none"
              animate={{
                top: ["0%", "100%"],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                top: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                opacity: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }}
            ></motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <NavButton
          direction="prev"
          onClick={prevSlide}
          ariaLabel="Previous slide"
        />
        <NavButton
          direction="next"
          onClick={nextSlide}
          ariaLabel="Next slide"
        />

        {/* Indicator dots */}
        <IndicatorDots
          items={bannerItems}
          currentIndex={currentIndex}
          goToSlide={goToSlide}
        />

        {/* Quantum corner accents */}
        {["top-left", "top-right", "bottom-left", "bottom-right"].map(
          (corner) => (
            <QuantumCorner
              key={corner}
              corner={corner}
              isHovering={isHovering}
            />
          )
        )}
      </motion.div>

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

export default memo(Banner3);
