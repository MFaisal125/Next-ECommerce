// "use client";

// import React, { useEffect, useMemo } from "react";
// import Container from "../shared/Container";
// import Image from "next/image";
// import { AiFillStar } from "react-icons/ai";
// import { useRouter } from "next/navigation";
// import { useGetProductsQuery } from "@/services/product/productApi";
// import ExpertCard from "../shared/skeletonLoading/ExpertCard";
// import { toast } from "react-hot-toast";

// const ExpertChoice = ({ className }) => {
//   const router = useRouter();

//   const {
//     data: productsData,
//     error: productsError,
//     isLoading: productsLoading,
//   } = useGetProductsQuery();
//   const products = useMemo(() => productsData?.data || [], [productsData]);

//   useEffect(() => {
//     if (productsError) {
//       toast.error(productsError?.data?.description, { id: "expert-choice" });
//     }
//   }, [productsError]);

//   return (
//     <Container className={className ? className : ""}>
//       <section className="flex flex-col gap-y-10">
//         <h1 className="text-4xl">
//           Experts Choice. <span className="">Most Favorites</span>
//         </h1>

//         <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8">
//           {productsLoading ? (
//             <>
//               {[1, 2, 3, 4].map((_, index) => (
//                 <ExpertCard key={index} />
//               ))}
//             </>
//           ) : (
//             <>
//               {products?.slice(-8)?.map((product, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-col gap-y-4 border p-4 rounded-lg hover:border-black transition-colors cursor-pointer"
//                   onClick={() =>
//                     router.push(
//                       `/product?product_id=${
//                         product?._id
//                       }&product_title=${product.title
//                         .replace(/ /g, "-")
//                         .toLowerCase()}}`
//                     )
//                   }
//                 >
//                   <div className="grid grid-cols-12 grid-rows-6 gap-2 h-[200px]">
//                     {product.gallery.map((thumbnail, idx) => (
//                       <Image
//                         key={idx}
//                         src={thumbnail?.url}
//                         alt={thumbnail?.public_id}
//                         width={296}
//                         height={200}
//                         className={`${
//                           product.gallery.length === 1
//                             ? "col-span-12 row-span-6"
//                             : product.gallery.length === 2
//                             ? "col-span-12 row-span-3"
//                             : product.gallery.length === 3
//                             ? idx === 0
//                               ? "col-span-12 row-span-3"
//                               : "col-span-6 row-span-3"
//                             : product.gallery.length === 4
//                             ? "col-span-6 row-span-3"
//                             : idx <= 1
//                             ? "col-span-6 row-span-3"
//                             : "col-span-4 row-span-3"
//                         } h-full w-full object-cover rounded`}
//                       />
//                     ))}
//                   </div>

//                   <article className="flex flex-col gap-y-3.5">
//                     <div className="flex flex-row items-center gap-x-1.5">
//                       <Badge className="text-indigo-800 bg-indigo-100">
//                         {product?.variations?.colors?.length + " " + "Colors"}
//                       </Badge>
//                       <div className="h-5 border-l w-[1px]"></div>
//                       <Badge className="text-purple-800 bg-purple-100">
//                         {product?.variations?.sizes?.length + " " + "Sizes"}
//                       </Badge>
//                     </div>
//                     <div className="flex flex-col gap-y-4">
//                       <h2 className="line-clamp-1">{product?.title}</h2>
//                       <div className="flex flex-row items-end justify-between">
//                         <span className="flex items-center border-2 border-green-500 rounded py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
//                           <span className="text-green-500 !leading-none">
//                             ${product?.price}.00
//                           </span>
//                         </span>
//                         <span className="flex flex-row items-center gap-x-0.5">
//                           <AiFillStar className="text-[#ffc242]" />
//                           <span className="text-sm">
//                             {product?.reviews?.length}
//                           </span>
//                         </span>
//                       </div>
//                     </div>
//                   </article>
//                 </div>
//               ))}
//             </>
//           )}
//         </div>
//         {!productsLoading && products?.length === 0 && (
//           <p className="text-sm">Oops! No products found!</p>
//         )}
//       </section>
//     </Container>
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

// export default ExpertChoice;

"use client";

import { useEffect, useMemo, memo, useCallback } from "react";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useGetProductsQuery } from "@/services/product/productApi";
import ExpertCard from "../shared/skeletonLoading/ExpertCard";
import { toast } from "react-hot-toast";

// Memoized Badge component for better performance
const Badge = memo(function Badge({ children, className, ...props }) {
  return (
    <span
      className={`px-3 py-1 rounded text-xs w-fit ${className || ""}`}
      {...props}
    >
      {children}
    </span>
  );
});

// Memoized ProductImage component to optimize image rendering
const ProductImage = memo(function ProductImage({
  thumbnail,
  idx,
  totalImages,
}) {
  const getImageClass = useCallback(() => {
    if (totalImages === 1) return "col-span-12 row-span-6";
    if (totalImages === 2) return "col-span-12 row-span-3";
    if (totalImages === 3) {
      return idx === 0 ? "col-span-12 row-span-3" : "col-span-6 row-span-3";
    }
    if (totalImages === 4) return "col-span-6 row-span-3";
    return idx <= 1 ? "col-span-6 row-span-3" : "col-span-4 row-span-3";
  }, [totalImages, idx]);

  return (
    <Image
      key={idx}
      src={thumbnail?.url || "/placeholder.svg"}
      alt={thumbnail?.public_id || `Product image ${idx + 1}`}
      width={296}
      height={200}
      className={`${getImageClass()} h-full w-full object-cover rounded`}
      loading={idx === 0 ? "eager" : "lazy"}
    />
  );
});

// Memoized ProductCard component
const ProductCard = memo(function ProductCard({ product, onClick }) {
  return (
    <div
      className="flex flex-col gap-y-4 border p-4 rounded-lg hover:border-black hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="grid grid-cols-12 grid-rows-6 gap-2 h-[200px]">
        {product.gallery.map((thumbnail, idx) => (
          <ProductImage
            key={idx}
            thumbnail={thumbnail}
            idx={idx}
            totalImages={product.gallery.length}
          />
        ))}
      </div>

      <article className="flex flex-col gap-y-3.5">
        <div className="flex flex-row items-center gap-x-1.5 flex-wrap">
          {product?.variations?.colors?.length > 0 && (
            <Badge className="text-indigo-800 bg-indigo-100">
              {product.variations.colors.length} Colors
            </Badge>
          )}
          {product?.variations?.colors?.length > 0 &&
            product?.variations?.sizes?.length > 0 && (
              <div className="h-5 border-l w-[1px]"></div>
            )}
          {product?.variations?.sizes?.length > 0 && (
            <Badge className="text-purple-800 bg-purple-100">
              {product.variations.sizes.length} Sizes
            </Badge>
          )}
        </div>
        <div className="flex flex-col gap-y-4">
          <h2 className="line-clamp-1 font-medium">{product?.title}</h2>
          <div className="flex flex-row items-end justify-between">
            <span className="flex items-center border-2 border-green-500 rounded py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
              <span className="text-green-500 !leading-none">
                ${product?.price}.00
              </span>
            </span>
            <span className="flex flex-row items-center gap-x-0.5">
              <AiFillStar className="text-[#ffc242]" />
              <span className="text-sm">{product?.reviews?.length || 0}</span>
            </span>
          </div>
        </div>
      </article>
    </div>
  );
});

// Container component
const Container = memo(function Container({ children, className }) {
  return (
    <div
      className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className || ""}`}
    >
      {children}
    </div>
  );
});

// Main ExpertChoice component
const ExpertChoice = function ExpertChoice({ className }) {
  const router = useRouter();

  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery();

  // Memoize products to prevent unnecessary re-renders
  const products = useMemo(() => productsData?.data || [], [productsData]);

  // Memoize the slice operation
  const displayProducts = useMemo(() => products.slice(-8), [products]);

  // Handle product click with useCallback
  const handleProductClick = useCallback(
    (product) => {
      router.push(
        `/product?product_id=${product?._id}&product_title=${product.title
          .replace(/ /g, "-")
          .toLowerCase()}`
      );
    },
    [router]
  );

  useEffect(() => {
    if (productsError) {
      toast.error(
        productsError?.data?.description || "Error loading products",
        {
          id: "expert-choice",
          duration: 4000,
        }
      );
    }
  }, [productsError]);

  return (
    <Container className={className || ""}>
      <section className="flex flex-col gap-y-6 sm:gap-y-8 md:gap-y-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Experts Choice. <span className="font-normal">Most Favorites</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {productsLoading ? (
            <>
              {Array.from({ length: 4 }).map((_, index) => (
                <ExpertCard key={index} />
              ))}
            </>
          ) : (
            <>
              {displayProducts.map((product, index) => (
                <ProductCard
                  key={product._id || index}
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </>
          )}
        </div>

        {!productsLoading && products.length === 0 && (
          <p className="text-sm text-center py-8">Oops! No products found!</p>
        )}
      </section>
    </Container>
  );
};

export default memo(ExpertChoice);
