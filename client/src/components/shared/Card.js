// "use client";

// import React, { useEffect, useState } from "react";
// import { AiFillStar } from "react-icons/ai";
// import { MdFavorite } from "react-icons/md";
// import Discount from "../icons/Discount";
// import SoldOut from "../icons/SoldOut";
// import Arrival from "../icons/Arrival";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import {
//   useAddToFavoriteMutation,
//   useRemoveFromFavoriteMutation,
// } from "@/services/favorite/favoriteApi";
// import { toast } from "react-hot-toast";
// import { useSelector } from "react-redux";
// import Spinner from "./Spinner";

// const Card = ({ index, product, ...rest }) => {
//   const router = useRouter();
//   const user = useSelector((state) => state?.auth?.user);

//   // check if product._id match with favorites array of object's product._id
//   const favorite = user?.favorites?.find(
//     (fav) => fav?.product?._id === product?._id
//   );

//   return (
//     <div
//       {...rest}
//       className="flex-shrink-0 flex flex-col gap-y-6 group border hover:border-black transition-colors rounded-lg"
//     >
//       <div className="relative h-[200px] w-full rounded-lg">
//         <Image
//           src={product?.thumbnail?.url}
//           alt={product?.thumbnail?.public_id}
//           width={296}
//           height={200}
//           className="h-[200px] w-full rounded-t-lg object-cover"
//         />
//         <div className="flex flex-row gap-x-2.5 absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
//           <Logo
//             src={product?.brand?.logo?.url}
//             alt={product?.brand?.logo?.public_id}
//           />
//           <Logo
//             src={product?.store?.thumbnail?.url}
//             alt={product?.store?.thumbnail?.public_id}
//           />
//         </div>
//         {product?.campaign && (
//           <span className="text-xs bg-white/80 px-2.5 py-0.5 rounded-xl absolute bottom-4 right-4 cursor-not-allowed">
//             {product?.campaign?.state === "discount" && (
//               <span className="flex flex-row gap-x-0.5 items-center">
//                 <Discount /> {product?.campaign.title}
//               </span>
//             )}
//             {product?.campaign?.state === "sold-out" && (
//               <span className="flex flex-row gap-x-0.5 items-center">
//                 <SoldOut /> {product?.campaign.title}
//               </span>
//             )}
//             {product?.campaign?.state === "new-arrival" && (
//               <span className="flex flex-row gap-x-0.5 items-center">
//                 <Arrival /> {product?.campaign.title}
//               </span>
//             )}
//             {product?.campaign?.state === "on-sale" && (
//               <span className="flex flex-row gap-x-0.5 items-center">
//                 <Arrival /> {product?.campaign.title}
//               </span>
//             )}
//           </span>
//         )}
//         {favorite ? (
//           <RemoveFromFavorite favorite={favorite} />
//         ) : (
//           <AddToFavorite product={product} />
//         )}
//       </div>
//       <article className="flex flex-col gap-y-3.5 px-4 h-full">
//         <div className="flex flex-row items-center gap-x-1.5">
//           <Badge className="text-indigo-800 bg-indigo-100">
//             {product?.variations?.colors?.length + " " + "Colors"}
//           </Badge>
//           <div className="h-5 border-l w-[1px]"></div>
//           <Badge className="text-purple-800 bg-purple-100">
//             {product?.variations?.sizes?.length + " " + "Sizes"}
//           </Badge>
//         </div>
//         <div
//           className="flex flex-col gap-y-4 cursor-pointer h-full"
//           onClick={() =>
//             router.push(
//               `/product?product_id=${
//                 product?._id
//               }&product_title=${product?.title
//                 .replace(/ /g, "-")
//                 .toLowerCase()}}`
//             )
//           }
//         >
//           <h2 className="line-clamp-2 h-full">{product?.title}</h2>
//           <div className="flex flex-row items-end justify-between mt-auto">
//             <span className="flex items-center border-2 border-green-500 rounded py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
//               <span className="text-green-500 !leading-none">
//                 ${product?.price}.00
//               </span>
//             </span>
//             <span className="flex flex-row items-center gap-x-0.5">
//               <AiFillStar className="text-[#ffc242]" />
//               <span className="text-sm">{product?.reviews?.length}</span>
//             </span>
//           </div>
//         </div>
//       </article>
//       <div></div>
//     </div>
//   );
// };

// function Badge({ props, children, className }) {
//   return (
//     <span
//       className={
//         "px-3 py-1 rounded text-xs w-fit" + (className ? " " + className : "")
//       }
//       {...props}
//     >
//       {children}
//     </span>
//   );
// }

// function Logo({ src, alt, props, className }) {
//   return (
//     <Image
//       {...props}
//       src={src}
//       alt={alt}
//       width={30}
//       height={30}
//       className={
//         "w-[30px] h-[30px] object-cover rounded-[5px] shadow border border-transparent hover:border-black transition-colors cursor-help" +
//         (className ? " " + className : "")
//       }
//     />
//   );
// }

// function AddToFavorite({ product }) {
//   const user = useSelector((state) => state?.auth?.user);
//   const [addToFavorite, { isLoading, data, error }] =
//     useAddToFavoriteMutation();

//   useEffect(() => {
//     if (isLoading) {
//       toast.loading("Adding to favorite...", { id: "addToFavorite" });
//     }

//     if (data) {
//       toast.success(data?.description, { id: "addToFavorite" });
//     }

//     if (error?.data) {
//       toast.error(error?.data?.description, { id: "addToFavorite" });
//     }
//   }, [isLoading, data, error]);

//   return (
//     <button
//       className="border border-transparent bg-white hover:border-black shadow p-1 absolute bottom-4 left-4 rounded-secondary opacity-0 group-hover:opacity-100 transition-all"
//       onClick={() => addToFavorite({ product: product?._id })}
//     >
//       {isLoading ? (
//         <Spinner />
//       ) : (
//         <MdFavorite className={`w-5 h-5 text-black`} />
//       )}
//     </button>
//   );
// }

// function RemoveFromFavorite({ favorite }) {
//   const user = useSelector((state) => state?.auth?.user);
//   const [removeFromFavorite, { isLoading, data, error }] =
//     useRemoveFromFavoriteMutation();

//   useEffect(() => {
//     if (isLoading) {
//       toast.loading("Adding to favorite...", { id: "addToFavorite" });
//     }

//     if (data) {
//       toast.success(data?.description, { id: "addToFavorite" });
//     }

//     if (error?.data) {
//       toast.error(error?.data?.description, { id: "addToFavorite" });
//     }
//   }, [isLoading, data, error]);

//   return (
//     <button
//       className="border border-transparent bg-white hover:border-black shadow p-1 absolute bottom-4 left-4 rounded-secondary opacity-0 group-hover:opacity-100 transition-all"
//       onClick={() => removeFromFavorite({ id: favorite?._id })}
//     >
//       {isLoading ? (
//         <Spinner />
//       ) : (
//         <MdFavorite className={`w-5 h-5 text-red-500`} />
//       )}
//     </button>
//   );
// }

// export default Card;

"use client";

import { useEffect, useState, useRef, useCallback, memo } from "react";
import { AiFillStar } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import { IoReturnUpBack } from "react-icons/io5";
import Discount from "../icons/Discount";
import SoldOut from "../icons/SoldOut";
import Arrival from "../icons/Arrival";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useAddToFavoriteMutation,
  useRemoveFromFavoriteMutation,
} from "@/services/favorite/favoriteApi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { gsap } from "gsap";

// Memoized Badge component for better performance
const Badge = memo(({ children, className, ...props }) => {
  return (
    <motion.span
      className={
        "px-2 py-0.5 rounded-full font-medium w-fit transition-all duration-300" +
        (className ? " " + className : "")
      }
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.span>
  );
});
Badge.displayName = "Badge";

// Memoized Logo component for better performance
const Logo = memo(({ src, alt, className, onClick, isActive }) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg cursor-pointer ${
        isActive ? "ring-2 ring-blue-500 ring-offset-1" : ""
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={28}
        height={28}
        className={
          "w-[28px] h-[28px] object-cover shadow-sm border border-gray-100 rounded-lg" +
          (className ? " " + className : "")
        }
      />
      <motion.div
        className="absolute inset-0 bg-white/10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      ></motion.div>
    </motion.div>
  );
});
Logo.displayName = "Logo";

// Optimized AddToFavorite component
const AddToFavorite = memo(({ product }) => {
  const [addToFavorite, { isLoading, data, error }] =
    useAddToFavoriteMutation();

  // Use callback to prevent recreation on each render
  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      addToFavorite({ product: product?._id });
    },
    [addToFavorite, product?._id]
  );

  useEffect(() => {
    if (isLoading) {
      toast.loading("Adding to favorite...", { id: "addToFavorite" });
    }

    if (data) {
      toast.success(data?.description, { id: "addToFavorite" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "addToFavorite" });
    }
  }, [isLoading, data, error]);

  return (
    <motion.button
      className="bg-white/90 backdrop-blur-xl p-2 rounded-full shadow-sm border border-gray-100"
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Add to favorites"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <MdFavorite className="w-3.5 h-3.5 text-gray-700 hover:text-blue-500 transition-colors" />
      )}
    </motion.button>
  );
});
AddToFavorite.displayName = "AddToFavorite";

// Optimized RemoveFromFavorite component
const RemoveFromFavorite = memo(({ favorite }) => {
  const [removeFromFavorite, { isLoading, data, error }] =
    useRemoveFromFavoriteMutation();

  // Use callback to prevent recreation on each render
  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      removeFromFavorite({ id: favorite?._id });
    },
    [removeFromFavorite, favorite?._id]
  );

  useEffect(() => {
    if (isLoading) {
      toast.loading("Removing from favorites...", { id: "addToFavorite" });
    }

    if (data) {
      toast.success(data?.description, { id: "addToFavorite" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "addToFavorite" });
    }
  }, [isLoading, data, error]);

  return (
    <motion.button
      className="bg-white/90 backdrop-blur-xl p-2 rounded-full shadow-sm border border-gray-100"
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Remove from favorites"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <MdFavorite className="w-3.5 h-3.5 text-red-500 hover:text-red-600 transition-colors" />
      )}
    </motion.button>
  );
});
RemoveFromFavorite.displayName = "RemoveFromFavorite";

// Optimized CampaignBadge component
const CampaignBadge = memo(({ campaign }) => {
  if (!campaign) return null;

  return (
    <motion.div
      className="absolute bottom-3 right-3 z-20"
      initial={{ opacity: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.span className="text-xs bg-white/90 backdrop-blur-xl px-3 py-1.5 rounded-full shadow-sm border border-gray-100 cursor-help inline-flex items-center">
        {campaign?.state === "discount" && (
          <span className="flex flex-row gap-x-1.5 items-center font-medium">
            <Discount /> {campaign.title}
          </span>
        )}
        {campaign?.state === "sold-out" && (
          <span className="flex flex-row gap-x-1.5 items-center font-medium">
            <SoldOut /> {campaign.title}
          </span>
        )}
        {campaign?.state === "new-arrival" && (
          <span className="flex flex-row gap-x-1.5 items-center font-medium">
            <Arrival /> {campaign.title}
          </span>
        )}
        {campaign?.state === "on-sale" && (
          <span className="flex flex-row gap-x-1.5 items-center font-medium">
            <Arrival /> {campaign.title}
          </span>
        )}
      </motion.span>
    </motion.div>
  );
});
CampaignBadge.displayName = "CampaignBadge";

// Optimized QuantumParticles component
const QuantumParticles = memo(({ isHovering }) => {
  // Pre-generate random positions for better performance
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    targetX: Math.random() * 100,
    targetY: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
  }));

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovering ? 0.5 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-blue-400"
          initial={{
            x: `${particle.initialX}%`,
            y: `${particle.initialY}%`,
            opacity: 0,
          }}
          animate={{
            x: `${particle.targetX}%`,
            y: `${particle.targetY}%`,
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
          }}
        />
      ))}
    </motion.div>
  );
});
QuantumParticles.displayName = "QuantumParticles";

// Optimized QuantumCorner component
const QuantumCorner = memo(({ position, isHovering }) => {
  const positions = {
    topLeft: {
      container: "absolute top-0 left-0 w-4 h-4 pointer-events-none",
      horizontal: "absolute top-0 left-0 w-full h-0.5 bg-blue-400",
      vertical: "absolute top-0 left-0 w-0.5 h-full bg-blue-400",
      hOrigin: "left",
      vOrigin: "top",
    },
    topRight: {
      container: "absolute top-0 right-0 w-4 h-4 pointer-events-none",
      horizontal: "absolute top-0 right-0 w-full h-0.5 bg-purple-400",
      vertical: "absolute top-0 right-0 w-0.5 h-full bg-purple-400",
      hOrigin: "right",
      vOrigin: "top",
    },
    bottomLeft: {
      container: "absolute bottom-0 left-0 w-4 h-4 pointer-events-none",
      horizontal: "absolute bottom-0 left-0 w-full h-0.5 bg-pink-400",
      vertical: "absolute bottom-0 left-0 w-0.5 h-full bg-pink-400",
      hOrigin: "left",
      vOrigin: "bottom",
    },
    bottomRight: {
      container: "absolute bottom-0 right-0 w-4 h-4 pointer-events-none",
      horizontal: "absolute bottom-0 right-0 w-full h-0.5 bg-blue-400",
      vertical: "absolute bottom-0 right-0 w-0.5 h-full bg-blue-400",
      hOrigin: "right",
      vOrigin: "bottom",
    },
  };

  const pos = positions[position];

  return (
    <div className={pos.container}>
      <motion.div
        className={pos.horizontal}
        initial={{ scaleX: 0.3, opacity: 0.3 }}
        animate={{
          scaleX: isHovering ? 1 : 0.3,
          opacity: isHovering ? 1 : 0.3,
        }}
        transition={{ duration: 0.4 }}
        style={{ transformOrigin: pos.hOrigin }}
      ></motion.div>
      <motion.div
        className={pos.vertical}
        initial={{ scaleY: 0.3, opacity: 0.3 }}
        animate={{
          scaleY: isHovering ? 1 : 0.3,
          opacity: isHovering ? 1 : 0.3,
        }}
        transition={{ duration: 0.4 }}
        style={{ transformOrigin: pos.vOrigin }}
      ></motion.div>
    </div>
  );
});
QuantumCorner.displayName = "QuantumCorner";

// Main Card component - optimized for performance
const Card = ({ index, product, ...rest }) => {
  const router = useRouter();
  const user = useSelector((state) => state?.auth?.user);
  const [activeImage, setActiveImage] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const detailsRef = useRef(null);
  const ambientLightRef = useRef(null);
  const timelineRef = useRef(null);

  // Mouse position values for ambient light effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Find favorite once
  const favorite = user?.favorites?.find(
    (fav) => fav?.product?._id === product?._id
  );

  // Set active image only once when product changes
  useEffect(() => {
    setActiveImage(product?.thumbnail?.url || "/placeholder.svg");
  }, [product?.thumbnail?.url]);

  // Create GSAP timeline once
  useEffect(() => {
    if (!cardRef.current || !imageRef.current || !detailsRef.current) return;

    // Create a timeline for hover animations
    timelineRef.current = gsap.timeline({ paused: true });

    // Animate image
    timelineRef.current.to(
      imageRef.current,
      {
        scale: 1.05,
        duration: 0.8,
        ease: "power2.out",
      },
      0
    );

    // Animate details to become more prominent
    timelineRef.current.to(
      detailsRef.current.querySelectorAll(".hover-scale"),
      {
        scale: 1.03,
        duration: 0.4,
        ease: "back.out(1.7)",
      },
      0.1
    );

    timelineRef.current.to(
      detailsRef.current.querySelectorAll(".hover-highlight"),
      {
        color: "#0070f3",
        fontWeight: "600",
        duration: 0.3,
      },
      0.1
    );

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  // Play or reverse timeline based on hover state
  useEffect(() => {
    if (!timelineRef.current) return;

    if (isHovering) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  }, [isHovering]);

  // Memoized logo click handler
  const handleLogoClick = useCallback((e, logoUrl) => {
    e.stopPropagation(); // Prevent card click

    // Animate image change with GSAP
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        onComplete: () => {
          setActiveImage(logoUrl);
          gsap.to(imageRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.75)",
          });
        },
      });
    }
  }, []);

  // Memoized product click handler
  const handleProductClick = useCallback(() => {
    router.push(
      `/product?product_id=${product?._id}&product_title=${product?.title
        .replace(/ /g, "-")
        .toLowerCase()}}`
    );
  }, [router, product?._id, product?.title]);

  // Optimized mouse move handler using RAF
  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current || !ambientLightRef.current || !isHovering) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element

      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        mouseX.set(x);
        mouseY.set(y);

        ambientLightRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(120, 120, 255, 0.15), transparent 60%)`;
      });
    },
    [isHovering, mouseX, mouseY]
  );

  // Optimized hover handlers
  const handleHoverStart = useCallback(() => setIsHovering(true), []);
  const handleHoverEnd = useCallback(() => setIsHovering(false), []);

  // Precompute values for better performance
  const hasLogo = Boolean(
    product?.brand?.logo?.url || product?.store?.thumbnail?.url
  );
  const showResetButton =
    activeImage !== product?.thumbnail?.url && activeImage !== null;
  const hasCampaign = Boolean(product?.campaign);

  return (
    <motion.div
      {...rest}
      ref={cardRef}
      className="flex-shrink-0 flex flex-col bg-white rounded-2xl overflow-hidden relative w-full will-change-transform"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }} // Cap delay for better performance
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onMouseMove={handleMouseMove}
      style={{
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
        height: "fit-content",
        maxWidth: "100%",
        contain: "layout paint style", // Optimize rendering
      }}
      whileHover={{
        boxShadow: "0 20px 30px -10px rgba(0,0,0,0.1)",
        y: -5,
      }}
    >
      {/* Ambient light effect - optimized */}
      <div
        ref={ambientLightRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-0 will-change-transform"
        style={{
          opacity: isHovering ? 0.8 : 0,
          transition: "opacity 0.5s ease",
        }}
      ></div>

      {/* Quantum border effect - optimized */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        animate={{
          boxShadow: isHovering
            ? "inset 0 0 0 1.5px rgba(120, 120, 255, 0.5), 0 0 20px 1px rgba(120, 120, 255, 0.2)"
            : "inset 0 0 0 0.5px rgba(120, 120, 255, 0.2)",
        }}
        transition={{ duration: 0.4 }}
      ></motion.div>

      {/* Product Image Container - optimized */}
      <div
        className="relative w-full overflow-hidden will-change-transform"
        style={{ aspectRatio: "4/3" }}
      >
        <div ref={imageRef} className="w-full h-full relative">
          <Image
            src={activeImage || "/placeholder.svg"}
            alt={product?.thumbnail?.public_id || "Product image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
            priority={index < 4} // Prioritize loading for first 4 items
            loading={index < 8 ? "eager" : "lazy"} // Eager load first 8 items
          />
        </div>

        {/* Brand and Store Logos - conditionally rendered */}
        {hasLogo && (
          <motion.div
            className="flex flex-row gap-x-2 absolute top-3 left-3 z-20"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            {product?.brand?.logo?.url && (
              <Logo
                src={product?.brand?.logo?.url}
                alt={product?.brand?.logo?.public_id}
                onClick={(e) => handleLogoClick(e, product?.brand?.logo?.url)}
                isActive={activeImage === product?.brand?.logo?.url}
              />
            )}
            {product?.store?.thumbnail?.url && (
              <Logo
                src={product?.store?.thumbnail?.url}
                alt={product?.store?.thumbnail?.public_id}
                onClick={(e) =>
                  handleLogoClick(e, product?.store?.thumbnail?.url)
                }
                isActive={activeImage === product?.store?.thumbnail?.url}
              />
            )}
          </motion.div>
        )}

        {/* Reset button - conditionally rendered */}
        <AnimatePresence>
          {showResetButton && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                handleLogoClick(e, product?.thumbnail?.url);
              }}
              className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-sm border border-gray-100"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View main product image"
            >
              <IoReturnUpBack className="w-3.5 h-3.5 text-gray-700" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Campaign Badge - conditionally rendered */}
        {hasCampaign && <CampaignBadge campaign={product.campaign} />}

        {/* Favorite Button */}
        <motion.div
          className="absolute bottom-3 left-3 z-20"
          initial={{ opacity: 1 }}
        >
          {favorite ? (
            <RemoveFromFavorite favorite={favorite} />
          ) : (
            <AddToFavorite product={product} />
          )}
        </motion.div>

        {/* Quantum overlay effect - optimized */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent mix-blend-overlay will-change-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 0.7 : 0 }}
          transition={{ duration: 0.5 }}
        ></motion.div>

        {/* Quantum scan line effect - optimized */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 will-change-transform"
            animate={{
              top: ["0%", "100%"],
              opacity: isHovering ? 1 : 0.3,
            }}
            transition={{
              top: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                ease: "linear",
                repeatType: "loop",
              },
              opacity: { duration: 0.3 },
            }}
          ></motion.div>
        </div>
      </div>

      {/* Product Details - optimized */}
      <div
        ref={detailsRef}
        className="flex flex-col gap-y-3 px-4 py-3 h-full relative"
        onClick={handleProductClick}
      >
        {/* Variations */}
        <div className="flex flex-row items-center gap-x-2 hover-scale">
          <Badge className="text-xs text-indigo-800 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition-colors">
            {product?.variations?.colors?.length + " " + "Colors"}
          </Badge>
          <div className="h-4 border-l w-[1px] border-gray-200"></div>
          <Badge className="text-xs text-purple-800 bg-purple-50 border border-purple-100 hover:bg-purple-100 transition-colors">
            {product?.variations?.sizes?.length + " " + "Sizes"}
          </Badge>
        </div>

        {/* Title */}
        <h2 className="line-clamp-1 text-sm sm:text-base font-medium cursor-pointer hover-highlight">
          {product?.title}
        </h2>

        {/* Price and Rating */}
        <div className="flex flex-row items-center justify-between">
          {/* Price */}
          <motion.div
            className="hover-scale"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center border-2 border-green-500 rounded-full py-1 px-2.5 text-xs sm:text-sm font-medium bg-green-50/80 backdrop-blur-sm">
              <span className="text-green-600 !leading-none">
                ${product?.price}.00
              </span>
            </span>
          </motion.div>

          {/* Rating */}
          <motion.div
            className="flex flex-row items-center gap-x-1 bg-amber-50/80 px-2 py-1 rounded-full hover-scale"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <AiFillStar className="text-amber-400 w-3.5 h-3.5" />
            <span className="text-xs font-medium text-amber-700">
              {product?.reviews?.length}
            </span>
          </motion.div>
        </div>

        {/* Quantum particles - optimized */}
        <QuantumParticles isHovering={isHovering} />
      </div>

      {/* Quantum energy field - optimized */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 will-change-transform"
        initial={{ scaleX: 0.3, opacity: 0.3 }}
        animate={{
          scaleX: isHovering ? 1 : 0.3,
          opacity: isHovering ? 1 : 0.3,
        }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        style={{ transformOrigin: "left" }}
      ></motion.div>

      {/* Quantum corners - optimized */}
      <QuantumCorner position="topLeft" isHovering={isHovering} />
      <QuantumCorner position="topRight" isHovering={isHovering} />
      <QuantumCorner position="bottomLeft" isHovering={isHovering} />
      <QuantumCorner position="bottomRight" isHovering={isHovering} />
    </motion.div>
  );
};

export default memo(Card);
