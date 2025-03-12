// "use client";

// import React, { useEffect, useMemo } from "react";
// import Container from "../shared/Container";
// import Card from "../shared/Card";
// import { useGetProductsQuery } from "@/services/product/productApi";
// import ProductCard from "../shared/skeletonLoading/ProductCard";
// import { toast } from "react-hot-toast";

// const NewArrivals = () => {
//   const {
//     data: productsData,
//     error: productsError,
//     isLoading: productsLoading,
//   } = useGetProductsQuery();
//   const products = useMemo(() => productsData?.data || [], [productsData]);

//   useEffect(() => {
//     if (productsError) {
//       toast.error(productsError?.data?.description, {
//         id: "new-arrivals",
//       });
//     }
//   }, [productsError]);

//   return (
//     <Container>
//       <section className="flex flex-col gap-y-10">
//         <h1 className="text-4xl">New Arrivals</h1>

//         <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-x-6 gap-y-8">
//           {productsLoading ? (
//             <>
//               {[1, 2, 3, 4].map((_, index) => (
//                 <ProductCard key={index} />
//               ))}
//             </>
//           ) : (
//             <>
//               {products?.slice(0, 3)?.map((product, index) => (
//                 <Card key={index} index={index} product={product} />
//               ))}
//             </>
//           )}
//         </div>
//         {!productsLoading && products?.length === 0 && (
//           <p className="text-sm">No products found</p>
//         )}
//       </section>
//     </Container>
//   );
// };

// export default NewArrivals;

"use client";

import {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
  useTransition,
  memo,
} from "react";
import Container from "../shared/Container";
import Card from "../shared/Card";
import { useGetProductsQuery } from "@/services/product/productApi";
import ProductCard from "../shared/skeletonLoading/ProductCard";
import { toast } from "react-hot-toast";

// Create a memoized product cache to prevent unnecessary re-renders
const productCache = new Map();

// Main component with performance optimizations
const NewArrivals = () => {
  // State with optimized initial values
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [isPending, startTransition] = useTransition();
  const loadingTimeoutRef = useRef(null);
  const isMountedRef = useRef(true);

  // Optimized query with error handling
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
    isFetching,
  } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: false,
  });

  // Memoized products to prevent unnecessary re-renders
  const products = useMemo(() => {
    return productsData?.data || [];
  }, [productsData]);

  // Cache products for better performance
  useEffect(() => {
    if (!products) return;

    products.forEach((product) => {
      if (product?._id && !productCache.has(product._id)) {
        productCache.set(product._id, product);
      }
    });
  }, [products]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;

      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  // Optimized error handling with cleanup
  useEffect(() => {
    const toastId = "new-arrivals";

    if (productsError) {
      toast.error(
        productsError?.data?.description || "Failed to load products",
        {
          id: toastId,
        }
      );
    }

    return () => {
      toast.dismiss(toastId);
    };
  }, [productsError]);

  // Optimized show more handler with React 18 transitions
  const handleShowMore = useCallback(() => {
    if (isPending) return; // Prevent multiple clicks

    // Use React 18 transitions for non-blocking UI
    startTransition(() => {
      setVisibleProducts((prev) => prev + 8);
    });
  }, [isPending]);

  // Compute if there are more products to show
  const hasMoreProducts = useMemo(() => {
    return !productsLoading && products.length > visibleProducts;
  }, [productsLoading, products.length, visibleProducts]);

  // Render optimized skeleton loading
  const renderSkeletons = useCallback(() => {
    return Array.from({ length: 4 }).map((_, index) => (
      <ProductCard key={index} />
    ));
  }, []);

  // Render optimized product grid
  const renderProducts = useCallback(() => {
    if (!products?.length) {
      return (
        <p className="text-sm col-span-full text-center py-8">
          No products found
        </p>
      );
    }

    return products
      .slice(0, visibleProducts)
      .map((product, index) => (
        <Card key={product?._id || index} index={index} product={product} />
      ));
  }, [products, visibleProducts]);

  return (
    <Container>
      <section className="flex flex-col gap-y-5">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            New Arrivals
          </h1>

          {!productsLoading && products.length > 0 && (
            <p className="text-sm text-gray-500">
              Showing {Math.min(visibleProducts, products.length)} of{" "}
              {products.length} products
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-x-4 gap-y-4 relative">
          {productsLoading ? renderSkeletons() : renderProducts()}
        </div>

        {hasMoreProducts && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleShowMore}
              disabled={isPending || isFetching}
              className="px-8 py-2.5 rounded-full bg-blue-500 text-white font-medium shadow-md hover:bg-blue-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending || isFetching ? "Loading..." : "Show More"}
            </button>
          </div>
        )}
      </section>
    </Container>
  );
};

export default memo(NewArrivals);
