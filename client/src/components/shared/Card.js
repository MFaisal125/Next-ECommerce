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

import { useEffect, useState, useRef, useCallback, memo, useMemo } from "react";
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

// Optimize Badge component with pure function and better memoization
const Badge = memo(
  ({ children, className, ...props }) => (
    <span
      className={
        "px-2 py-0.5 rounded-full text-xs font-medium w-fit transition-colors duration-300" +
        (className ? " " + className : "")
      }
      {...props}
    >
      {children}
    </span>
  ),
  (prevProps, nextProps) => {
    return (
      prevProps.children === nextProps.children &&
      prevProps.className === nextProps.className
    );
  }
);
Badge.displayName = "Badge";

// Optimize Logo component with better memoization
const Logo = memo(
  ({ src, alt, className, onClick, isActive }) => (
    <div
      className={`relative overflow-hidden rounded-lg cursor-pointer ${
        isActive ? "ring-2 ring-blue-500 ring-offset-1" : ""
      }`}
      onClick={onClick}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt || "Logo"}
        width={28}
        height={28}
        className={
          "w-[28px] h-[28px] object-cover shadow-sm border border-gray-100 rounded-lg transition-transform hover:scale-110 active:scale-95" +
          (className ? " " + className : "")
        }
        loading="lazy"
      />
      <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></div>
    </div>
  ),
  (prevProps, nextProps) => {
    return (
      prevProps.src === nextProps.src &&
      prevProps.isActive === nextProps.isActive
    );
  }
);
Logo.displayName = "Logo";

// Optimize AddToFavorite component with better error handling
const AddToFavorite = memo(({ product }) => {
  const [addToFavorite, { isLoading, data, error }] =
    useAddToFavoriteMutation();
  const toastIdRef = useRef("addToFavorite");

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (isLoading) return; // Prevent multiple clicks
      addToFavorite({ product: product?._id });
    },
    [addToFavorite, product?._id, isLoading]
  );

  useEffect(() => {
    if (isLoading) {
      toast.loading("Adding to favorite...", { id: toastIdRef.current });
    } else if (data) {
      toast.success(data?.description, { id: toastIdRef.current });
    } else if (error?.data) {
      toast.error(error?.data?.description, { id: toastIdRef.current });
    }

    // Cleanup function
    return () => {
      toast.dismiss(toastIdRef.current);
    };
  }, [isLoading, data, error]);

  return (
    <button
      className="bg-white/90 backdrop-blur-xl p-2 rounded-full shadow-sm border border-gray-100 transition-transform hover:scale-110 active:scale-95"
      onClick={handleClick}
      aria-label="Add to favorites"
      disabled={isLoading}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <MdFavorite className="w-3.5 h-3.5 text-gray-700 hover:text-blue-500 transition-colors" />
      )}
    </button>
  );
});
AddToFavorite.displayName = "AddToFavorite";

// Optimize RemoveFromFavorite component with better error handling
const RemoveFromFavorite = memo(({ favorite }) => {
  const [removeFromFavorite, { isLoading, data, error }] =
    useRemoveFromFavoriteMutation();
  const toastIdRef = useRef("addToFavorite");

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (isLoading) return; // Prevent multiple clicks
      removeFromFavorite({ id: favorite?._id });
    },
    [removeFromFavorite, favorite?._id, isLoading]
  );

  useEffect(() => {
    if (isLoading) {
      toast.loading("Removing from favorites...", { id: toastIdRef.current });
    } else if (data) {
      toast.success(data?.description, { id: toastIdRef.current });
    } else if (error?.data) {
      toast.error(error?.data?.description, { id: toastIdRef.current });
    }

    // Cleanup function
    return () => {
      toast.dismiss(toastIdRef.current);
    };
  }, [isLoading, data, error]);

  return (
    <button
      className="bg-white/90 backdrop-blur-xl p-2 rounded-full shadow-sm border border-gray-100 transition-transform hover:scale-110 active:scale-95"
      onClick={handleClick}
      aria-label="Remove from favorites"
      disabled={isLoading}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <MdFavorite className="w-3.5 h-3.5 text-red-500 hover:text-red-600 transition-colors" />
      )}
    </button>
  );
});
RemoveFromFavorite.displayName = "RemoveFromFavorite";

// Optimize CampaignBadge component with better memoization
const CampaignBadge = memo(
  ({ campaign }) => {
    if (!campaign) return null;

    let content;
    switch (campaign?.state) {
      case "discount":
        content = (
          <>
            <Discount /> {campaign.title}
          </>
        );
        break;
      case "sold-out":
        content = (
          <>
            <SoldOut /> {campaign.title}
          </>
        );
        break;
      case "new-arrival":
      case "on-sale":
        content = (
          <>
            <Arrival /> {campaign.title}
          </>
        );
        break;
      default:
        return null;
    }

    return (
      <div className="absolute bottom-3 right-3 z-20">
        <span className="text-xs bg-white/90 backdrop-blur-xl px-3 py-1.5 rounded-full shadow-sm border border-gray-100 cursor-help inline-flex items-center transition-transform hover:scale-105">
          <span className="flex flex-row gap-x-1.5 items-center font-medium">
            {content}
          </span>
        </span>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.campaign?.state === nextProps.campaign?.state &&
      prevProps.campaign?.title === nextProps.campaign?.title
    );
  }
);
CampaignBadge.displayName = "CampaignBadge";

// Create a separate component for corner accents to reduce main component complexity
const CornerAccent = memo(
  ({ corner, isHovering }) => {
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

    const pos = positions[corner];

    return (
      <div className={pos.container}>
        <div
          className={pos.horizontal}
          style={{
            transform: `scaleX(${isHovering ? 1 : 0.3})`,
            opacity: isHovering ? 1 : 0.3,
            transition: "transform 0.4s ease, opacity 0.4s ease",
            transformOrigin: pos.hOrigin,
          }}
        ></div>
        <div
          className={pos.vertical}
          style={{
            transform: `scaleY(${isHovering ? 1 : 0.3})`,
            opacity: isHovering ? 1 : 0.3,
            transition: "transform 0.4s ease, opacity 0.4s ease",
            transformOrigin: pos.vOrigin,
          }}
        ></div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isHovering === nextProps.isHovering &&
      prevProps.corner === nextProps.corner
    );
  }
);
CornerAccent.displayName = "CornerAccent";

// Create a separate component for product details to reduce main component complexity
const ProductDetails = memo(
  ({ product, isHovering, handleProductClick }) => {
    return (
      <div
        className="flex flex-col gap-y-3 px-4 py-3 h-full relative cursor-pointer"
        onClick={handleProductClick}
      >
        {/* Variations */}
        <div
          className="flex flex-row items-center gap-x-2 transition-transform duration-300"
          style={{ transform: isHovering ? "scale(1.03)" : "scale(1)" }}
        >
          <Badge className="text-indigo-800 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition-colors">
            {product?.variations?.colors?.length + " " + "Colors"}
          </Badge>
          <div className="h-4 border-l w-[1px] border-gray-200"></div>
          <Badge className="text-purple-800 bg-purple-50 border border-purple-100 hover:bg-purple-100 transition-colors">
            {product?.variations?.sizes?.length + " " + "Sizes"}
          </Badge>
        </div>

        {/* Title */}
        <h2
          className="line-clamp-1 text-sm sm:text-base font-medium transition-all duration-300"
          style={{
            color: isHovering ? "#0070f3" : "inherit",
            fontWeight: isHovering ? "600" : "500",
          }}
        >
          {product?.title}
        </h2>

        {/* Price and Rating */}
        <div className="flex flex-row items-center justify-between">
          {/* Price */}
          <div className="transition-transform duration-300 hover:scale-105 active:scale-98">
            <span className="flex items-center border-2 border-green-500 rounded-full py-1 px-2.5 text-xs sm:text-sm font-medium bg-green-50/80 backdrop-blur-sm">
              <span className="text-green-600 !leading-none">
                ${product?.price}.00
              </span>
            </span>
          </div>

          {/* Rating */}
          <div className="flex flex-row items-center gap-x-1 bg-amber-50/80 px-2 py-1 rounded-full transition-transform duration-300 hover:scale-105 active:scale-98">
            <AiFillStar className="text-amber-400 w-3.5 h-3.5" />
            <span className="text-xs font-medium text-amber-700">
              {product?.reviews?.length}
            </span>
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isHovering === nextProps.isHovering &&
      prevProps.product?._id === nextProps.product?._id
    );
  }
);
ProductDetails.displayName = "ProductDetails";

// Main Card component - optimized for performance
const Card = ({ index = 0, product, ...rest }) => {
  const router = useRouter();
  const user = useSelector((state) => state?.auth?.user);
  const [activeImage, setActiveImage] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const borderRef = useRef(null);
  const ambientLightRef = useRef(null);
  const animationFrameRef = useRef(null);
  const intersectionObserverRef = useRef(null);

  // Find favorite once using useMemo
  const favorite = useMemo(
    () => user?.favorites?.find((fav) => fav?.product?._id === product?._id),
    [user?.favorites, product?._id]
  );

  // Set active image only once when product changes
  useEffect(() => {
    setActiveImage(product?.thumbnail?.url || "/placeholder.svg");
  }, [product?.thumbnail?.url]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(cardRef.current);
    intersectionObserverRef.current = observer;

    return () => {
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
    };
  }, []);

  // Animate border on mount with cleanup
  useEffect(() => {
    if (!borderRef.current || !isVisible) return;

    let start = null;
    const duration = 2000; // 2 seconds per cycle
    let animationId;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = ((timestamp - start) % duration) / duration;

      // Create gradient with moving position
      if (borderRef.current) {
        const gradientPos = (progress * 400) % 100;
        borderRef.current.style.background = `linear-gradient(90deg, 
          rgba(59, 130, 246, 0.7) ${gradientPos - 20}%, 
          rgba(168, 85, 247, 0.7) ${gradientPos}%, 
          rgba(236, 72, 153, 0.7) ${gradientPos + 20}%, 
          rgba(59, 130, 246, 0.3) ${gradientPos + 40}%)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isVisible]);

  // Optimized mouse move handler using RAF with cleanup
  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current || !ambientLightRef.current || !isHovering) return;

      // Cancel any pending animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        if (!cardRef.current || !ambientLightRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top; // y position within the element

        ambientLightRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(120, 120, 255, 0.15), transparent 60%)`;
      });
    },
    [isHovering]
  );

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Memoized logo click handler
  const handleLogoClick = useCallback((e, logoUrl) => {
    e.stopPropagation(); // Prevent card click

    // Simple fade transition
    if (imageRef.current) {
      imageRef.current.style.opacity = "0";
      setTimeout(() => {
        setActiveImage(logoUrl);
        imageRef.current.style.opacity = "1";
      }, 200);
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

  // Optimized hover handlers with debounce
  const handleHoverStart = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setIsHovering(false);
  }, []);

  // Precompute values for better performance
  const hasLogo = useMemo(
    () => Boolean(product?.brand?.logo?.url || product?.store?.thumbnail?.url),
    [product?.brand?.logo?.url, product?.store?.thumbnail?.url]
  );

  const showResetButton = useMemo(
    () => activeImage !== product?.thumbnail?.url && activeImage !== null,
    [activeImage, product?.thumbnail?.url]
  );

  const hasCampaign = useMemo(
    () => Boolean(product?.campaign),
    [product?.campaign]
  );

  // If not visible yet, render a minimal placeholder
  if (!isVisible) {
    return (
      <div
        ref={cardRef}
        className="flex-shrink-0 flex flex-col bg-white rounded-2xl overflow-hidden relative w-full shadow-sm"
        style={{
          height: "400px", // Approximate height
          maxWidth: "100%",
        }}
        {...rest}
      />
    );
  }

  return (
    <div
      {...rest}
      ref={cardRef}
      className={`
        flex-shrink-0 flex flex-col bg-white rounded-2xl overflow-hidden relative w-full
        shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)]
        transition-all duration-300 ease-out
        ${
          isHovering
            ? "shadow-[0_20px_30px_-10px_rgba(0,0,0,0.1)] translate-y-[-5px]"
            : ""
        }
      `}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onMouseMove={handleMouseMove}
      style={{
        height: "fit-content",
        maxWidth: "100%",
        opacity: 0,
        transform: "translateY(20px)",
        animation: `fadeIn 0.5s ${Math.min(index * 0.05, 0.3)}s forwards`,
      }}
    >
      {/* Ambient light effect */}
      <div
        ref={ambientLightRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-0"
        style={{
          opacity: isHovering ? 0.8 : 0,
          transition: "opacity 0.5s ease",
        }}
      ></div>

      {/* Animated border */}
      <div
        ref={borderRef}
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        style={{
          background: "linear-gradient(90deg, transparent, transparent)",
          padding: "1.5px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          opacity: isHovering ? 1 : 0.6,
          transition: "opacity 0.4s ease",
        }}
      ></div>

      {/* Product Image Container */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4/3" }}
      >
        <div
          ref={imageRef}
          className="w-full h-full relative transition-all duration-300"
          style={{
            transform: isHovering ? "scale(1.05)" : "scale(1)",
          }}
        >
          <Image
            src={activeImage || "/placeholder.svg"}
            alt={product?.thumbnail?.public_id || "Product image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-opacity duration-200"
            priority={index < 4} // Prioritize loading for first 4 items
            loading={index < 8 ? "eager" : "lazy"} // Eager load first 8 items
            onLoad={(e) => {
              // Add fade-in effect when image loads
              if (e.target) {
                e.target.style.opacity = "0";
                requestAnimationFrame(() => {
                  e.target.style.opacity = "1";
                });
              }
            }}
          />
        </div>

        {/* Brand and Store Logos - conditionally rendered */}
        {hasLogo && (
          <div className="flex flex-row gap-x-2 absolute top-3 left-3 z-20">
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
          </div>
        )}

        {/* Reset button - conditionally rendered */}
        {showResetButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLogoClick(e, product?.thumbnail?.url);
            }}
            className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-sm border border-gray-100 transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="View main product image"
          >
            <IoReturnUpBack className="w-3.5 h-3.5 text-gray-700" />
          </button>
        )}

        {/* Campaign Badge - conditionally rendered */}
        {hasCampaign && <CampaignBadge campaign={product.campaign} />}

        {/* Favorite Button */}
        <div className="absolute bottom-3 left-3 z-20">
          {favorite ? (
            <RemoveFromFavorite favorite={favorite} />
          ) : (
            <AddToFavorite product={product} />
          )}
        </div>

        {/* Overlay effect */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent mix-blend-overlay"
          style={{
            opacity: isHovering ? 0.7 : 0,
            transition: "opacity 0.5s ease",
          }}
        ></div>

        {/* Scan line effect */}
        {isHovering && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
              style={{
                animation: "scanLine 1.5s linear infinite",
                opacity: 1,
              }}
            ></div>
          </div>
        )}
      </div>

      {/* Product Details - extracted to separate component */}
      <ProductDetails
        product={product}
        isHovering={isHovering}
        handleProductClick={handleProductClick}
      />

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        style={{
          transform: `scaleX(${isHovering ? 1 : 0.3})`,
          opacity: isHovering ? 1 : 0.3,
          transition:
            "transform 0.6s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.6s ease",
          transformOrigin: "left",
        }}
      ></div>

      {/* Corner accents - extracted to separate component */}
      {["topLeft", "topRight", "bottomLeft", "bottomRight"].map((corner) => (
        <CornerAccent key={corner} corner={corner} isHovering={isHovering} />
      ))}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scanLine {
          from {
            top: 0%;
          }
          to {
            top: 100%;
          }
        }

        @keyframes rotate-border {
          0% {
            background: linear-gradient(
              0deg,
              #3b82f6,
              #a855f7,
              #ec4899,
              #3b82f6
            );
            background-size: 400% 400%;
            background-position: 0% 0%;
          }
          25% {
            background: linear-gradient(
              90deg,
              #3b82f6,
              #a855f7,
              #ec4899,
              #3b82f6
            );
            background-size: 400% 400%;
            background-position: 100% 0%;
          }
          50% {
            background: linear-gradient(
              180deg,
              #3b82f6,
              #a855f7,
              #ec4899,
              #3b82f6
            );
            background-size: 400% 400%;
            background-position: 100% 100%;
          }
          75% {
            background: linear-gradient(
              270deg,
              #3b82f6,
              #a855f7,
              #ec4899,
              #3b82f6
            );
            background-size: 400% 400%;
            background-position: 0% 100%;
          }
          100% {
            background: linear-gradient(
              360deg,
              #3b82f6,
              #a855f7,
              #ec4899,
              #3b82f6
            );
            background-size: 400% 400%;
            background-position: 0% 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default memo(Card);
