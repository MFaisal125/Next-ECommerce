// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import Container from "../shared/Container";
// import Brand from "../icons/Brand";
// import Category from "../icons/Category";
// import Store from "../icons/Store";
// import Image from "next/image";
// import { BsBoxSeam } from "react-icons/bs";
// import { RiShareBoxFill } from "react-icons/ri";
// import { useGetStoresQuery } from "@/services/store/storeApi";
// import { useGetBrandsQuery } from "@/services/brand/brandApi";
// import { useGetCategoriesQuery } from "@/services/category/categoryApi";
// import Niche from "../shared/skeletonLoading/Niche";
// import { toast } from "react-hot-toast";
// import Modal from "../shared/Modal";
// import { useDispatch, useSelector } from "react-redux";
// import { setBrand } from "@/features/brand/brandSlice";
// import { setCategory } from "@/features/category/categorySlice";
// import { setStore } from "@/features/store/storeSlice";

// const NicheExplorer = () => {
//   const niches = [
//     {
//       title: "Brand",
//       icon: <Brand />,
//     },
//     {
//       title: "Category",
//       icon: <Category />,
//     },
//     {
//       title: "Store",
//       icon: <Store />,
//     },
//   ];

//   const [selectedNiche, setSelectedNiche] = useState("Category");

//   return (
//     <Container>
//       <section className="flex flex-col gap-y-10">
//         <h1 className="text-4xl">
//           Top Exploring. <span className="">By Niche</span>
//         </h1>

//         <div className="bg-neutral-100/70 rounded-primary lg:p-24 md:p-12 p-6 flex flex-col gap-y-12">
//           <div className="flex flex-row justify-center gap-x-4 overflow-x-auto">
//             <div className="flex flex-row justify-center gap-x-4 border p-1 rounded-secondary bg-white overflow-x-auto scrollbar-hide">
//               {niches.map((niche, index) => (
//                 <button
//                   key={index}
//                   className={
//                     "text-sm text-black flex flex-row items-center gap-x-1 px-8 py-2 rounded-secondary border border-transparent" +
//                     " " +
//                     (selectedNiche === niche.title ? "bg-black text-white" : "")
//                   }
//                   onClick={() => setSelectedNiche(niche.title)}
//                 >
//                   {niche.icon}
//                   {niche.title}
//                 </button>
//               ))}
//             </div>
//           </div>
//           {selectedNiche === "Brand" && <DisplayBrands />}
//           {selectedNiche === "Category" && <DisplayCategories />}
//           {selectedNiche === "Store" && <DisplayStores />}
//         </div>
//       </section>
//     </Container>
//   );
// };

// function DisplayBrands() {
//   const {
//     data: brandsData,
//     error: brandsError,
//     isLoading: fetchingBrands,
//   } = useGetBrandsQuery();

//   const brands = useMemo(() => brandsData?.data || [], [brandsData]);
//   const [isOpen, setIsOpen] = useState();
//   const dispatch = useDispatch();
//   const brand = useSelector((state) => state.brand.brand);

//   useEffect(() => {
//     if (brandsError) {
//       toast.error(brandsError?.data?.description, {
//         id: "brands-data",
//       });
//     }
//   }, [brandsError]);

//   return (
//     <>
//       <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
//         {fetchingBrands ? (
//           <>
//             {[1, 2, 3].map((_, index) => (
//               <Niche key={index} />
//             ))}
//           </>
//         ) : (
//           <>
//             {brands?.slice(0, 6)?.map((brand, index) => (
//               <div
//                 key={index}
//                 className="group border p-4 rounded-lg flex flex-col gap-y-4 hover:border-black transition-colors bg-white relative cursor-pointer"
//                 onClick={() => {
//                   dispatch(setBrand(brand));
//                   setIsOpen(true);
//                 }}
//               >
//                 <Image
//                   src={brand?.logo?.url}
//                   alt={brand?.logo?.public_id}
//                   width={50}
//                   height={50}
//                   className="rounded h-[50px] w-[50px] object-cover"
//                 />

//                 <div className="flex flex-col gap-y-2">
//                   <h2 className="text-xl">{brand?.title}</h2>
//                   <p className="flex flex-row gap-x-1 items-center rounded-primary">
//                     <BsBoxSeam />{" "}
//                     <span className="group-hover:text-indigo-500 text-xs">
//                       {brand?.products?.length} Products
//                     </span>
//                   </p>
//                 </div>

//                 <p className="flex flex-row gap-1 overflow-x-auto scrollbar-hide">
//                   {brand.tags.map((tag, index) => (
//                     <span
//                       key={index}
//                       className="border text-xs px-1 py-0.5 rounded whitespace-nowrap"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </p>
//               </div>
//             ))}
//           </>
//         )}
//       </div>

//       {!fetchingBrands && brands?.length === 0 && (
//         <p className="text-sm">Oops! No brands found!</p>
//       )}

//       {isOpen && (
//         <Modal
//           isOpen={isOpen}
//           onClose={() => setIsOpen(false)}
//           className="p-6 lg:w-1/3 md:w-3/4 w-full h-96 overflow-y-auto scrollbar-hide"
//         >
//           <div className="h-full w-full flex flex-col gap-y-4">
//             <div className="flex flex-col gap-y-1 items-center">
//               <Image
//                 src={brand?.creator?.avatar?.url}
//                 alt={brand?.creator?.avatar?.public_id}
//                 width={50}
//                 height={50}
//                 className="rounded-full h-[50px] w-[50px] object-cover"
//               />
//               <h1 className="text-lg">{brand?.creator?.name}</h1>
//               <p className="text-sm">{brand?.creator?.email}</p>
//               <p className="text-xs">{brand?.creator?.phone}</p>
//             </div>

//             <hr />

//             <div className="flex flex-col gap-y-2 w-full">
//               {brand?.products?.map((product) => (
//                 <div
//                   key={product?._id}
//                   className="flex flex-row justify-between items-center bg-slate-50 rounded p-2 w-full"
//                 >
//                   <div
//                     className="flex flex-row gap-x-2 items-start cursor-pointer"
//                     onClick={() =>
//                       window.open(
//                         `/product?product_id=${
//                           product?._id
//                         }&product_title=${product?.title
//                           .replace(/ /g, "-")
//                           .toLowerCase()}}`,
//                         "_self"
//                       )
//                     }
//                   >
//                     <Image
//                       src={product?.thumbnail?.url}
//                       alt={product?.thumbnail?.public_id}
//                       width={30}
//                       height={30}
//                       className="rounded-full h-[30px] w-[30px] object-cover"
//                     />
//                     <article className="flex flex-col gap-y-1">
//                       <h2 className="text-base line-clamp-2">
//                         {product?.title}
//                       </h2>
//                       <p className="text-xs line-clamp-3">
//                         By {product?.summary}
//                       </p>
//                       <span className="text-sm mt-2 bg-teal-100 border-teal-900 text-teal-950 rounded-secondary w-fit px-2">
//                         ${product?.price}
//                       </span>
//                     </article>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Modal>
//       )}
//     </>
//   );
// }

// function DisplayCategories() {
//   const {
//     data: categoriesData,
//     error: categoriesError,
//     isLoading: fetchingCategories,
//   } = useGetCategoriesQuery();

//   const categories = useMemo(
//     () => categoriesData?.data || [],
//     [categoriesData]
//   );
//   const [isOpen, setIsOpen] = useState();
//   const dispatch = useDispatch();
//   const category = useSelector((state) => state.category.category);

//   useEffect(() => {
//     if (categoriesError) {
//       toast.error(categoriesError?.data?.description, {
//         id: "categories-data",
//       });
//     }
//   }, [categoriesError]);

//   return (
//     <>
//       <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
//         {fetchingCategories ? (
//           <>
//             {[1, 2, 3].map((_, index) => (
//               <Niche key={index} />
//             ))}
//           </>
//         ) : (
//           <>
//             {categories?.slice(0, 6)?.map((category, index) => (
//               <div
//                 key={index}
//                 className="group border p-4 rounded-lg flex flex-col gap-y-4 hover:border-black transition-colors bg-white relative cursor-pointer"
//                 onClick={() => {
//                   dispatch(setCategory(category));
//                   setIsOpen(true);
//                 }}
//               >
//                 <Image
//                   src={category?.thumbnail?.url}
//                   alt={category?.thumbnail?.public_id}
//                   width={50}
//                   height={50}
//                   className="rounded h-[50px] w-[50px] object-cover"
//                 />

//                 <div className="flex flex-col gap-y-2">
//                   <h2 className="text-xl">{category?.title}</h2>
//                   <p className="flex flex-row gap-x-1 items-center rounded-primary">
//                     <BsBoxSeam />{" "}
//                     <span className="group-hover:text-indigo-500 text-xs transition-colors">
//                       {category?.products?.length} Products
//                     </span>
//                   </p>
//                 </div>

//                 <p className="flex flex-row gap-1 overflow-x-auto scrollbar-hide">
//                   {category.tags.map((tag, index) => (
//                     <span
//                       key={index}
//                       className="border text-xs px-1 py-0.5 rounded whitespace-nowrap"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </p>
//               </div>
//             ))}
//           </>
//         )}
//       </div>

//       {!fetchingCategories && categories?.length === 0 && (
//         <p className="text-sm">Oops! No categories found!</p>
//       )}

//       {isOpen && (
//         <Modal
//           isOpen={isOpen}
//           onClose={() => setIsOpen(false)}
//           className="p-6 lg:w-1/3 md:w-3/4 w-full h-96 overflow-y-auto scrollbar-hide"
//         >
//           <div className="h-full w-full flex flex-col gap-y-4">
//             <div className="flex flex-col gap-y-1 items-center">
//               <Image
//                 src={category?.creator?.avatar?.url}
//                 alt={category?.creator?.avatar?.public_id}
//                 width={50}
//                 height={50}
//                 className="rounded-full h-[50px] w-[50px] object-cover"
//               />
//               <h1 className="text-lg">{category?.creator?.name}</h1>
//               <p className="text-sm">{category?.creator?.email}</p>
//               <p className="text-xs">{category?.creator?.phone}</p>
//             </div>

//             <hr />

//             <div className="flex flex-col gap-y-2 w-full">
//               {category?.products?.map((product) => (
//                 <div
//                   key={product?._id}
//                   className="flex flex-row justify-between items-center bg-slate-50 rounded p-2 w-full"
//                 >
//                   <div
//                     className="flex flex-row gap-x-2 items-start cursor-pointer"
//                     onClick={() =>
//                       window.open(
//                         `/product?product_id=${
//                           product?._id
//                         }&product_title=${product?.title
//                           .replace(/ /g, "-")
//                           .toLowerCase()}}`,
//                         "_self"
//                       )
//                     }
//                   >
//                     <Image
//                       src={product?.thumbnail?.url}
//                       alt={product?.thumbnail?.public_id}
//                       width={30}
//                       height={30}
//                       className="rounded-full h-[30px] w-[30px] object-cover"
//                     />
//                     <article className="flex flex-col gap-y-1">
//                       <h2 className="text-base line-clamp-2">
//                         {product?.title}
//                       </h2>
//                       <p className="text-xs line-clamp-3">
//                         By {product?.summary}
//                       </p>
//                       <span className="text-sm mt-2 bg-teal-100 border-teal-900 text-teal-950 rounded-secondary w-fit px-2">
//                         ${product?.price}
//                       </span>
//                     </article>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Modal>
//       )}
//     </>
//   );
// }

// function DisplayStores() {
//   const {
//     data: storesData,
//     error: storesError,
//     isLoading: fetchingStores,
//   } = useGetStoresQuery();

//   const stores = useMemo(() => storesData?.data || [], [storesData]);
//   const [isOpen, setIsOpen] = useState();
//   const dispatch = useDispatch();
//   const store = useSelector((state) => state.store.store);

//   useEffect(() => {
//     if (storesError) {
//       toast.error(storesError?.data?.description, {
//         id: "stores-data",
//       });
//     }
//   }, [storesError]);

//   return (
//     <>
//       <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
//         {fetchingStores ? (
//           <>
//             {[1, 2, 3].map((_, index) => (
//               <Niche key={index} />
//             ))}
//           </>
//         ) : (
//           <>
//             {stores?.slice(0, 6)?.map((store, index) => (
//               <div
//                 key={index}
//                 className="group border p-4 rounded-lg flex flex-col gap-y-4 hover:border-black transition-colors bg-white relative cursor-pointer"
//                 onClick={() => {
//                   dispatch(setStore(store));
//                   setIsOpen(true);
//                 }}
//               >
//                 <Image
//                   src={store?.thumbnail?.url}
//                   alt={store?.thumbnail?.public_id}
//                   width={50}
//                   height={50}
//                   className="rounded h-[50px] w-[50px] object-cover"
//                 />

//                 <div className="flex flex-col gap-y-2">
//                   <h2 className="text-xl">{store?.title}</h2>
//                   <p className="flex flex-row gap-x-1 items-center rounded-primary">
//                     <BsBoxSeam />{" "}
//                     <span className="group-hover:text-indigo-500 text-xs transition-colors">
//                       {store?.products?.length} Products
//                     </span>
//                   </p>
//                 </div>

//                 <p className="flex flex-row gap-1 overflow-x-auto scrollbar-hide">
//                   {store.tags.map((tag, index) => (
//                     <span
//                       key={index}
//                       className="border text-xs px-1 py-0.5 rounded whitespace-nowrap"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </p>
//               </div>
//             ))}
//           </>
//         )}
//       </div>

//       {!fetchingStores && stores?.length === 0 && (
//         <p className="text-sm">Oops! No stores found!</p>
//       )}

//       {isOpen && (
//         <Modal
//           isOpen={isOpen}
//           onClose={() => setIsOpen(false)}
//           className="p-6 lg:w-1/3 md:w-3/4 w-full h-96 overflow-y-auto scrollbar-hide"
//         >
//           <div className="h-full w-full flex flex-col gap-y-4">
//             <div className="flex flex-col gap-y-1 items-center">
//               <Image
//                 src={store?.owner?.avatar?.url}
//                 alt={store?.owner?.avatar?.public_id}
//                 width={50}
//                 height={50}
//                 className="rounded-full h-[50px] w-[50px] object-cover"
//               />
//               <h1 className="text-lg">{store?.owner?.name}</h1>
//               <p className="text-sm">{store?.owner?.email}</p>
//               <p className="text-xs">{store?.owner?.phone}</p>
//             </div>

//             <hr />

//             <div className="flex flex-col gap-y-2 w-full">
//               {store?.products?.map((product) => (
//                 <div
//                   key={product?._id}
//                   className="flex flex-row justify-between items-center bg-slate-50 rounded p-2 w-full"
//                 >
//                   <div
//                     className="flex flex-row gap-x-2 items-start cursor-pointer"
//                     onClick={() =>
//                       window.open(
//                         `/product?product_id=${
//                           product?._id
//                         }&product_title=${product?.title
//                           .replace(/ /g, "-")
//                           .toLowerCase()}}`,
//                         "_self"
//                       )
//                     }
//                   >
//                     <Image
//                       src={product?.thumbnail?.url}
//                       alt={product?.thumbnail?.public_id}
//                       width={30}
//                       height={30}
//                       className="rounded-full h-[30px] w-[30px] object-cover"
//                     />
//                     <article className="flex flex-col gap-y-1">
//                       <h2 className="text-base line-clamp-2">
//                         {product?.title}
//                       </h2>
//                       <p className="text-xs line-clamp-3">
//                         By {product?.summary}
//                       </p>
//                       <span className="text-sm mt-2 bg-teal-100 border-teal-900 text-teal-950 rounded-secondary w-fit px-2">
//                         ${product?.price}
//                       </span>
//                     </article>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Modal>
//       )}
//     </>
//   );
// }

// export default NicheExplorer;

"use client";

import {
  useEffect,
  useMemo,
  useState,
  useCallback,
  memo,
  Suspense,
  useRef,
} from "react";
import Container from "../shared/Container";
import Brand from "../icons/Brand";
import Category from "../icons/Category";
import Store from "../icons/Store";
import Image from "next/image";
import { BsBoxSeam } from "react-icons/bs";
import { useGetStoresQuery } from "@/services/store/storeApi";
import { useGetBrandsQuery } from "@/services/brand/brandApi";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import Niche from "../shared/skeletonLoading/Niche";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setBrand } from "@/features/brand/brandSlice";
import { setCategory } from "@/features/category/categorySlice";
import { setStore } from "@/features/store/storeSlice";
import Modal from "../shared/Modal";

// Performance optimization: Intersection Observer for lazy loading
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  const callbackRef = useCallback(
    (node) => {
      if (node !== null) {
        const observer = new IntersectionObserver(([entry]) => {
          setIsIntersecting(entry.isIntersecting);
          if (entry.isIntersecting && !hasIntersected) {
            setHasIntersected(true);
          }
        }, options);

        observer.observe(node);

        return () => {
          observer.disconnect();
        };
      }
    },
    [hasIntersected, options]
  );

  return [callbackRef, isIntersecting, hasIntersected];
};

// Performance optimization: Debounce function
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Futuristic 3030 NicheCard with enhanced hover effects
const NicheCard = memo(({ item, onClick, type, index }) => {
  const [ref, isVisible] = useIntersectionObserver({
    rootMargin: "100px",
    threshold: 0.1,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const imageUrl = item?.logo?.url || item?.thumbnail?.url;
  const imageAlt = item?.logo?.public_id || item?.thumbnail?.public_id;
  const productCount = item?.products?.length || 0;

  // Handle mouse move for 3D effect
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });
  }, []);

  // Reset position on mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePosition({ x: 0.5, y: 0.5 });
  }, []);

  // Animation style based on mouse position
  const animationStyle = useMemo(() => {
    if (!isHovered) return {};

    const maxRotate = 8; // max rotation in degrees
    const rotateX = (mousePosition.y - 0.5) * -maxRotate;
    const rotateY = (mousePosition.x - 0.5) * maxRotate;

    return {
      transform: `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        translateZ(10px)
        scale(1.02)
      `,
    };
  }, [isHovered, mousePosition]);

  // Optimized rendering with animation frame
  useEffect(() => {
    if (!cardRef.current) return;

    let animationFrameId;

    if (isHovered) {
      const animate = () => {
        if (cardRef.current) {
          const { x, y } = mousePosition;
          const rotateX = (y - 0.5) * -8;
          const rotateY = (x - 0.5) * 8;

          cardRef.current.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
            translateZ(10px)
            scale(1.02)
          `;

          // Glow effect position
          const glowElement = cardRef.current.querySelector(".card-glow");
          if (glowElement) {
            glowElement.style.background = `
              radial-gradient(
                circle at ${x * 100}% ${y * 100}%, 
                rgba(120, 190, 255, 0.4) 0%, 
                rgba(65, 120, 255, 0.1) 30%, 
                rgba(0, 0, 0, 0) 70%
              )
            `;
          }
        }

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();
    } else {
      // Reset to default state
      if (cardRef.current) {
        cardRef.current.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0) scale(1)";

        const glowElement = cardRef.current.querySelector(".card-glow");
        if (glowElement) {
          glowElement.style.background = "none";
        }
      }
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovered, mousePosition]);

  // Fade in animation when card becomes visible
  const fadeInStyle = useMemo(
    () => ({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.5s ease, transform 0.5s ease ${Math.min(
        index * 0.1,
        0.3
      )}s`,
    }),
    [isVisible, index]
  );

  return (
    <div
      ref={(el) => {
        // Combine refs safely using callback ref pattern
        if (typeof ref === "function") ref(el);
        cardRef.current = el;
      }}
      className="group relative flex flex-col sm:flex-row md:flex-col gap-4 p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-100/50 hover:border-transparent transition-all duration-300 cursor-pointer overflow-hidden"
      style={{
        ...fadeInStyle,
        boxShadow: isHovered
          ? "0 25px 50px -12px rgba(0, 120, 255, 0.25), 0 0 15px rgba(0, 120, 255, 0.1)"
          : "0 10px 30px -15px rgba(0,0,0,0.1)",
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        transformStyle: "preserve-3d",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* 3030 Futuristic Glow Effect */}
      <div className="card-glow absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Animated border */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(45deg, #00f2fe, #4facfe, #0070f3, #00f2fe)",
          backgroundSize: "300% 300%",
          animation: "shimmer 3s linear infinite",
          padding: "1.5px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
      />

      {/* Holographic effect */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          backgroundSize: "200% 200%",
          animation: "holographic 5s linear infinite",
        }}
      />

      {/* Image container with 3030 hover effects */}
      <div
        className="relative flex-shrink-0 z-10"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/30 via-blue-500/30 to-purple-500/30 rounded-lg opacity-0 group-hover:opacity-100 animate-pulse-slow" />
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={imageAlt || "Thumbnail"}
          width={60}
          height={60}
          className="relative rounded-lg h-[60px] w-[60px] object-cover transition-transform duration-300 group-hover:scale-110"
          loading={index < 3 ? "eager" : "lazy"}
        />

        {/* Futuristic scan line */}
        <div className="absolute inset-0 overflow-hidden rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute left-0 right-0 h-[2px] bg-blue-400/70 -translate-y-full group-hover:animate-scan-line" />
        </div>
      </div>

      {/* Content container with 3030 styling */}
      <div
        className="flex flex-col flex-grow gap-3 min-w-0 z-10"
        style={{ transform: "translateZ(15px)" }}
      >
        <div className="space-y-2">
          <h2 className="text-lg font-semibold leading-tight line-clamp-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 group-hover:from-blue-600 group-hover:to-indigo-600 transition-colors duration-300">
            {item?.title}
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:shadow-inner transition-all duration-300">
              <BsBoxSeam className="w-3.5 h-3.5" />
              <span className="relative overflow-hidden">
                <span className="block group-hover:translate-y-full transition-transform duration-300">
                  {productCount} Products
                </span>
                <span className="absolute inset-0 -translate-y-full group-hover:translate-y-0 text-blue-700 transition-transform duration-300">
                  {productCount} Products
                </span>
              </span>
            </span>
          </div>
        </div>

        {/* Tags with horizontal scroll and 3030 hover effects */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
          {item.tags.map((tag, idx) => (
            <span
              key={idx}
              className="flex-none text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 border border-gray-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-all duration-300 transform group-hover:scale-105"
              style={{
                transitionDelay: `${idx * 0.05}s`,
                transform: isHovered
                  ? `translateZ(${20 + idx * 2}px)`
                  : "translateZ(0)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Particle effects on hover */}
      {isHovered && <Particles />}
    </div>
  );
});
NicheCard.displayName = "NicheCard";

// Futuristic particle effect component
const Particles = memo(() => {
  const particles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 2 + 1,
        delay: Math.random(),
      })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: 0,
            animation: `particle ${particle.duration}s ease-out ${particle.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
});
Particles.displayName = "Particles";

// Optimized tab navigation for mobile with 3030 styling
const TabNavigation = memo(({ niches, selectedNiche, onSelect }) => {
  return (
    <div className="flex justify-center w-full overflow-hidden">
      <div className="flex gap-2 p-1.5 bg-gray-100/80 backdrop-blur-sm rounded-full overflow-x-auto scrollbar-hide max-w-full mx-auto shadow-inner">
        {niches.map((niche, index) => (
          <button
            key={index}
            onClick={() => onSelect(niche.title)}
            className={`
              relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
              transition-all duration-500 transform overflow-hidden
              ${
                selectedNiche === niche.title
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 scale-105"
                  : "text-gray-600 hover:bg-white/70"
              }
            `}
          >
            {/* Animated background for selected tab */}
            {selectedNiche === niche.title && (
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-100"
                style={{
                  backgroundSize: "200% 200%",
                  animation: "shimmer 2s linear infinite",
                }}
              />
            )}

            {/* Icon with glow effect */}
            <span
              className={`relative w-4 h-4 z-10 transition-transform duration-300 ${
                selectedNiche === niche.title ? "scale-110" : ""
              }`}
            >
              {niche.icon}
              {selectedNiche === niche.title && (
                <span className="absolute inset-0 bg-white/20 rounded-full blur-sm animate-pulse-slow" />
              )}
            </span>

            {/* Text with reveal animation */}
            <span className="relative z-10">{niche.title}</span>

            {/* Scan line for selected tab */}
            {selectedNiche === niche.title && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-0 right-0 h-[1px] bg-white/50 top-0 animate-scan-line-horizontal" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
});
TabNavigation.displayName = "TabNavigation";

// Optimized DetailModal with 3030 styling
const DetailModal = memo(({ isOpen, onClose, data, type }) => {
  const creator = data?.creator || data?.owner;
  const products = data?.products || [];
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleProductClick = useCallback((product) => {
    window.open(
      `/product?product_id=${product?._id}&product_title=${product?.title
        .replace(/ /g, "-")
        .toLowerCase()}}`,
      "_self"
    );
  }, []);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="p-0 lg:w-1/3 md:w-3/4 w-full max-h-[80vh] overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl border border-blue-100"
    >
      <div className="h-full w-full flex flex-col">
        {/* Header with 3030 styling */}
        <div className="relative p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white rounded-t-xl overflow-hidden">
          {/* Animated background */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600"
            style={{
              backgroundSize: "200% 200%",
              animation: "shimmer 8s linear infinite",
            }}
          />

          {/* Geometric patterns */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          {/* Close button with hover effect */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors z-10 overflow-hidden group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="relative z-10"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity overflow-hidden">
              <div className="absolute left-0 right-0 h-[1px] bg-white/50 top-0 group-hover:animate-scan-line-horizontal" />
            </div>
          </button>

          {/* Creator info with 3030 styling */}
          <div className="flex flex-col items-center relative z-10">
            <div className="relative mb-3 group">
              <div className="absolute -inset-1 bg-white rounded-full opacity-30 blur-md group-hover:opacity-50 transition-opacity" />
              <div className="absolute -inset-3 bg-blue-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              <Image
                src={creator?.avatar?.url || "/placeholder.svg"}
                alt={creator?.avatar?.public_id || "Creator avatar"}
                width={70}
                height={70}
                className="rounded-full h-[70px] w-[70px] object-cover relative z-10 border-2 border-white/80 group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute left-0 right-0 h-[2px] bg-white/50 -translate-y-full group-hover:animate-scan-line" />
              </div>
            </div>
            <h1 className="text-xl font-semibold">{creator?.name}</h1>
            <p className="text-sm text-white/80">{creator?.email}</p>
            <p className="text-xs text-white/70 mt-1">{creator?.phone}</p>
          </div>
        </div>

        {/* Products list with 3030 hover effects */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-blue-50/50 to-white/50">
          <h2 className="text-sm font-medium text-blue-600 px-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            {products.length} Products
          </h2>

          <div className="space-y-3">
            {products.map((product, index) => (
              <div
                key={product?._id}
                onClick={() => handleProductClick(product)}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(-1)}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/80 hover:bg-blue-50/80 transition-all duration-300 cursor-pointer border border-transparent hover:border-blue-100 relative overflow-hidden group"
                style={{
                  transform: activeIndex === index ? "scale(1.02)" : "scale(1)",
                  boxShadow:
                    activeIndex === index
                      ? "0 10px 25px -5px rgba(59, 130, 246, 0.1)"
                      : "none",
                }}
              >
                {/* Hover border effect */}
                {activeIndex === index && (
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(45deg, #00f2fe, #4facfe, #00f2fe)",
                      backgroundSize: "200% 200%",
                      animation: "shimmer 2s linear infinite",
                      padding: "1px",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                    }}
                  />
                )}

                {/* Product image with hover effect */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-blue-400/0 group-hover:bg-blue-400/20 rounded-lg transition-colors blur-sm" />
                  <Image
                    src={product?.thumbnail?.url || "/placeholder.svg"}
                    alt={product?.thumbnail?.public_id || "Product thumbnail"}
                    width={40}
                    height={40}
                    className="rounded-lg h-[40px] w-[40px] object-cover relative z-10 group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Product details with hover animations */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium line-clamp-1 group-hover:text-blue-700 transition-colors">
                    {product?.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-0.5 group-hover:text-gray-700 transition-colors">
                    {product?.summary}
                  </p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 mt-2 group-hover:bg-blue-100 transition-colors">
                    ${product?.price}
                  </span>
                </div>

                {/* Scan line effect on hover */}
                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute left-0 right-0 h-[1px] bg-blue-400/30 -translate-y-full group-hover:animate-scan-line" />
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 7H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1z" />
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
              </svg>
              <p className="mt-2 text-sm">No products found</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
});
DetailModal.displayName = "DetailModal";

// Main component with performance optimizations
const NicheExplorer = () => {
  const [selectedNiche, setSelectedNiche] = useState("Category");
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  // Memoize niches to prevent unnecessary re-renders
  const niches = useMemo(
    () => [
      { title: "Brand", icon: <Brand /> },
      { title: "Category", icon: <Category /> },
      { title: "Store", icon: <Store /> },
    ],
    []
  );

  // Optimized tab click handler
  const handleTabClick = useCallback(
    (nicheTitle) => {
      if (selectedNiche !== nicheTitle) {
        setSelectedNiche(nicheTitle);
      }
    },
    [selectedNiche]
  );

  // Optimized modal handlers
  const handleOpenModal = useCallback(
    (data, type) => {
      if (type === "Brand") dispatch(setBrand(data));
      else if (type === "Category") dispatch(setCategory(data));
      else if (type === "Store") dispatch(setStore(data));

      setModalData(data);
      setIsModalOpen(true);
    },
    [dispatch]
  );

  // Close modal with cleanup
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    // Clean up modal data after animation completes
    setTimeout(() => {
      if (!isModalOpen) setModalData(null);
    }, 300);
  }, [isModalOpen]);

  return (
    <Container>
      <section className="flex flex-col gap-y-6 sm:gap-y-10">
        {/* Title */}
        <h1 className="text-2xl sm:text-4xl px-4">
          Top Exploring. <span className="">By Niche</span>
        </h1>

        {/* Main content with 3030 styling */}
        <div className="bg-gradient-to-b from-gray-50/80 to-white/60 backdrop-blur-sm rounded-2xl border border-gray-100/50 shadow-xl shadow-blue-500/5 p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 left-0 w-full h-full opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(59, 130, 246, 0.4) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-10 blur-3xl" />
          </div>

          {/* Tab navigation */}
          <div className="mb-6 sm:mb-8 relative z-10">
            <TabNavigation
              niches={niches}
              selectedNiche={selectedNiche}
              onSelect={handleTabClick}
            />
          </div>

          {/* Content area with optimized loading */}
          <Suspense fallback={<LoadingGrid />}>
            <div className="space-y-4 relative z-10">
              {selectedNiche === "Brand" && (
                <DisplayBrands
                  onItemClick={(data) => handleOpenModal(data, "Brand")}
                />
              )}
              {selectedNiche === "Category" && (
                <DisplayCategories
                  onItemClick={(data) => handleOpenModal(data, "Category")}
                />
              )}
              {selectedNiche === "Store" && (
                <DisplayStores
                  onItemClick={(data) => handleOpenModal(data, "Store")}
                />
              )}
            </div>
          </Suspense>
        </div>
      </section>

      {/* Modal with optimized rendering */}
      {isModalOpen && modalData && (
        <DetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          data={modalData}
          type={selectedNiche}
        />
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes shimmer {
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

        @keyframes holographic {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 0.3;
          }
        }

        @keyframes scan-line {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes scan-line-horizontal {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes pulse-slow {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes particle {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-20px);
            opacity: 0;
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </Container>
  );
};

// Optimized loading grid with 3030 styling
const LoadingGrid = memo(() => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    {[1, 2, 3].map((_, index) => (
      <div
        key={index}
        className="animate-pulse relative overflow-hidden rounded-xl"
      >
        <Niche />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 right-0 h-[2px] bg-blue-200/50 -translate-y-full animate-scan-line" />
        </div>
      </div>
    ))}
  </div>
));
LoadingGrid.displayName = "LoadingGrid";

// Empty state with 3030 styling
const EmptyState = memo(({ message }) => (
  <div className="flex flex-col items-center justify-center py-12 text-gray-400 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-transparent rounded-xl opacity-50" />
    <div className="relative z-10 flex flex-col items-center">
      <div className="relative mb-4">
        <div className="absolute -inset-4 bg-blue-100/20 rounded-full blur-xl animate-pulse-slow" />
        <svg
          className="w-16 h-16 relative"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <p className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-400">
        {message}
      </p>
    </div>
  </div>
));
EmptyState.displayName = "EmptyState";

// Display components with optimized rendering
const DisplayBrands = memo(({ onItemClick }) => {
  const {
    data: brandsData,
    error: brandsError,
    isLoading,
  } = useGetBrandsQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const brands = useMemo(() => brandsData?.data || [], [brandsData]);

  // Optimized error handling
  useEffect(() => {
    if (brandsError) {
      toast.error(brandsError?.data?.description, { id: "brands-error" });
    }
  }, [brandsError]);

  if (isLoading) return <LoadingGrid />;
  if (brands.length === 0) {
    return <EmptyState message="No brands found" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {brands.slice(0, 6).map((brand, index) => (
        <NicheCard
          key={brand._id}
          item={brand}
          onClick={() => onItemClick(brand)}
          type="brand"
          index={index}
        />
      ))}
    </div>
  );
});
DisplayBrands.displayName = "DisplayBrands";

const DisplayCategories = memo(({ onItemClick }) => {
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading,
  } = useGetCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const categories = useMemo(
    () => categoriesData?.data || [],
    [categoriesData]
  );

  useEffect(() => {
    if (categoriesError) {
      toast.error(categoriesError?.data?.description, {
        id: "categories-error",
      });
    }
  }, [categoriesError]);

  if (isLoading) return <LoadingGrid />;
  if (categories.length === 0) {
    return <EmptyState message="No categories found" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {categories.slice(0, 6).map((category, index) => (
        <NicheCard
          key={category._id}
          item={category}
          onClick={() => onItemClick(category)}
          type="category"
          index={index}
        />
      ))}
    </div>
  );
});
DisplayCategories.displayName = "DisplayCategories";

const DisplayStores = memo(({ onItemClick }) => {
  const {
    data: storesData,
    error: storesError,
    isLoading,
  } = useGetStoresQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const stores = useMemo(() => storesData?.data || [], [storesData]);

  useEffect(() => {
    if (storesError) {
      toast.error(storesError?.data?.description, { id: "stores-error" });
    }
  }, [storesError]);

  if (isLoading) return <LoadingGrid />;
  if (stores.length === 0) {
    return <EmptyState message="No stores found" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {stores.slice(0, 6).map((store, index) => (
        <NicheCard
          key={store._id}
          item={store}
          onClick={() => onItemClick(store)}
          type="store"
          index={index}
        />
      ))}
    </div>
  );
});
DisplayStores.displayName = "DisplayStores";

export default NicheExplorer;
