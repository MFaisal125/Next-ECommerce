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

// Ultra-optimized intersection observer hook
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const callbackRef = useCallback(
    (node) => {
      if (!node) return;
      const observer = new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) setHasIntersected(true);
      }, options);

      observer.observe(node);
      return () => observer.disconnect();
    },
    [hasIntersected, options]
  );

  return [callbackRef, isIntersecting, hasIntersected];
};

// Optimized NicheCard component
const NicheCard = memo(({ item, onClick, index }) => {
  const [ref, isVisible] = useIntersectionObserver({
    rootMargin: "100px",
    threshold: 0.1,
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const imageUrl = item?.logo?.url || item?.thumbnail?.url;
  const imageAlt = item?.logo?.public_id || item?.thumbnail?.public_id;
  const productCount = item?.products?.length || 0;

  // Load animation when visible
  useEffect(() => {
    if (isVisible && !isLoaded) {
      const timer = setTimeout(() => setIsLoaded(true), index * 30);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isLoaded, index]);

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col gap-3 p-3 rounded-lg bg-white border border-gray-100/50 transition-all duration-200 cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${isLoaded ? "shadow-sm" : ""}`}
      style={{
        transition: `all 0.2s ease ${Math.min(index * 0.03, 0.1)}s`,
      }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative flex-shrink-0">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={imageAlt || "Thumbnail"}
          width={50}
          height={50}
          className="rounded h-[50px] w-[50px] object-cover"
          loading={index < 3 ? "eager" : "lazy"}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 min-w-0">
        <h2 className="text-base font-medium line-clamp-1">{item?.title}</h2>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
            <BsBoxSeam className="w-3 h-3" />
            <span>{productCount} Products</span>
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
        {item.tags.slice(0, 3).map((tag, idx) => (
          <span
            key={idx}
            className="flex-none text-xs px-2 py-0.5 rounded-full border border-gray-100 bg-gray-50 text-gray-600 whitespace-nowrap"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
});
NicheCard.displayName = "NicheCard";

// Optimized tab navigation
const TabNavigation = memo(({ niches, selectedNiche, onSelect }) => {
  return (
    <div className="flex justify-center w-full overflow-hidden">
      <div className="flex gap-1 p-1 bg-gray-100 rounded-full overflow-x-auto scrollbar-hide max-w-full mx-auto">
        {niches.map((niche, index) => (
          <button
            key={index}
            onClick={() => onSelect(niche.title)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap
              transition-all duration-200
              ${
                selectedNiche === niche.title
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-white/70"
              }
            `}
          >
            <span className="w-3.5 h-3.5">{niche.icon}</span>
            <span>{niche.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
});
TabNavigation.displayName = "TabNavigation";

// Optimized modal component
const DetailModal = memo(({ isOpen, onClose, data, type }) => {
  const creator = data?.creator || data?.owner;
  const products = data?.products || [];
  const modalContentRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const handleProductClick = useCallback((product) => {
    window.open(
      `/product?product_id=${product?._id}&product_title=${product?.title
        .replace(/ /g, "-")
        .toLowerCase()}}`,
      "_self"
    );
  }, []);

  // Reset scroll position
  useEffect(() => {
    if (isOpen && modalContentRef.current) {
      modalContentRef.current.scrollTop = 0;
    }
  }, [isOpen, data]);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full lg:w-1/3 md:w-3/4 overflow-hidden rounded-lg bg-white shadow-xl border border-gray-200"
          style={{
            maxWidth: "500px",
            maxHeight: isMobile ? "85vh" : "80vh",
          }}
        >
          <div className="h-full w-full flex flex-col">
            {/* Header */}
            <div className="relative p-4 bg-blue-600 text-white">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors z-10"
                aria-label="Close modal"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Creator info */}
              <div className="flex flex-col items-center">
                <Image
                  src={creator?.avatar?.url || "/placeholder.svg"}
                  alt={creator?.avatar?.public_id || "Creator avatar"}
                  width={50}
                  height={50}
                  className="rounded-full h-[50px] w-[50px] object-cover border-2 border-white/80"
                />
                <h1 className="text-base font-medium mt-2">{creator?.name}</h1>
                <p className="text-xs text-white/80">{creator?.email}</p>
                <p className="text-xs text-white/70">{creator?.phone}</p>
              </div>
            </div>

            {/* Products list */}
            <div
              ref={modalContentRef}
              className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50"
              style={{
                maxHeight: isMobile
                  ? "calc(85vh - 130px)"
                  : "calc(80vh - 150px)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xs font-medium text-gray-600 px-2 py-1.5 sticky top-0 bg-white/90 backdrop-blur-sm rounded shadow-sm z-10">
                {products.length} Products
              </h2>

              <div className="space-y-2">
                {products.map((product) => (
                  <div
                    key={product?._id}
                    onClick={() => handleProductClick(product)}
                    className="flex items-start gap-2 p-2 rounded-lg bg-white hover:bg-blue-50/80 transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-100"
                  >
                    {/* Product image */}
                    <Image
                      src={product?.thumbnail?.url || "/placeholder.svg"}
                      alt={product?.thumbnail?.public_id || "Product thumbnail"}
                      width={36}
                      height={36}
                      className="rounded h-[36px] w-[36px] object-cover"
                    />

                    {/* Product details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-medium line-clamp-1">
                        {product?.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                        {product?.summary}
                      </p>
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700 mt-1">
                        ${product?.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {products.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                  <p className="text-xs">No products found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
DetailModal.displayName = "DetailModal";

// Optimized loading grid
const LoadingGrid = memo(() => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    {[1, 2, 3].map((_, index) => (
      <div
        key={index}
        className="animate-pulse relative overflow-hidden rounded-lg"
      >
        <Niche />
      </div>
    ))}
  </div>
));
LoadingGrid.displayName = "LoadingGrid";

// Empty state component
const EmptyState = memo(({ message }) => (
  <div className="flex flex-col items-center justify-center py-8 text-gray-400">
    <svg
      className="w-10 h-10"
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
    <p className="text-sm mt-2">{message}</p>
  </div>
));
EmptyState.displayName = "EmptyState";

// Display components
const DisplayBrands = memo(({ onItemClick }) => {
  const {
    data: brandsData,
    error: brandsError,
    isLoading,
  } = useGetBrandsQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const brands = useMemo(() => brandsData?.data || [], [brandsData]);

  // Error handling
  useEffect(() => {
    if (brandsError) {
      toast.error(brandsError?.data?.description, { id: "brands-error" });
    }
  }, [brandsError]);

  if (isLoading) return <LoadingGrid />;
  if (brands.length === 0) return <EmptyState message="No brands found" />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {brands.slice(0, 6).map((brand, index) => (
        <NicheCard
          key={brand._id}
          item={brand}
          onClick={() => onItemClick(brand)}
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
  if (categories.length === 0)
    return <EmptyState message="No categories found" />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {categories.slice(0, 6).map((category, index) => (
        <NicheCard
          key={category._id}
          item={category}
          onClick={() => onItemClick(category)}
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
  if (stores.length === 0) return <EmptyState message="No stores found" />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {stores.slice(0, 6).map((store, index) => (
        <NicheCard
          key={store._id}
          item={store}
          onClick={() => onItemClick(store)}
          index={index}
        />
      ))}
    </div>
  );
});
DisplayStores.displayName = "DisplayStores";

// Main component
const NicheExplorer = () => {
  const [selectedNiche, setSelectedNiche] = useState("Category");
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  // Memoize niches
  const niches = useMemo(
    () => [
      { title: "Brand", icon: <Brand /> },
      { title: "Category", icon: <Category /> },
      { title: "Store", icon: <Store /> },
    ],
    []
  );

  // Tab click handler
  const handleTabClick = useCallback(
    (nicheTitle) => {
      if (selectedNiche !== nicheTitle) {
        setSelectedNiche(nicheTitle);
      }
    },
    [selectedNiche]
  );

  // Modal handlers
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

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      if (!isModalOpen) setModalData(null);
    }, 200);
  }, [isModalOpen]);

  return (
    <Container>
      <section className="flex flex-col gap-y-4">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl px-2">
          Top Exploring. <span>By Niche</span>
        </h1>

        {/* Main content */}
        <div className="bg-gray-50 rounded-lg border border-gray-100 p-3 sm:p-4 relative">
          {/* Tab navigation */}
          <div className="mb-4 relative z-10">
            <TabNavigation
              niches={niches}
              selectedNiche={selectedNiche}
              onSelect={handleTabClick}
            />
          </div>

          {/* Content area */}
          <Suspense fallback={<LoadingGrid />}>
            <div className="relative z-10">
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

      {/* Modal */}
      {isModalOpen && modalData && (
        <DetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          data={modalData}
          type={selectedNiche}
        />
      )}

      {/* Minimal CSS */}
      <style jsx global>{`
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

export default memo(NicheExplorer);
