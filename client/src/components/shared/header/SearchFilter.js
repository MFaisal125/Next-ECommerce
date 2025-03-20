// import Search from "@/components/icons/Search";
// import React, { useEffect, useMemo, useState } from "react";
// import Modal from "../Modal";
// import { useGetProductsQuery } from "@/services/product/productApi";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import SearchCard from "../skeletonLoading/SearchCard";
// import { toast } from "react-hot-toast";
// import Inform from "@/components/icons/Inform";

// const SearchFilter = () => {
//   const [open, setOpen] = useState();
//   const [searchTerm, setSearchTerm] = useState("");
//   const {
//     data: productsData,
//     error: productsError,
//     isLoading: productsLoading,
//   } = useGetProductsQuery();
//   const products = useMemo(() => productsData?.data || [], [productsData]);
//   const router = useRouter();

//   useEffect(() => {
//     if (productsError) {
//       toast.error(productsError?.data?.description, { id: "search-filter" });
//     }
//   }, [productsError]);

//   const handleSearch = (event) => {
//     setSearchTerm(event?.target?.value?.toLowerCase());
//   };

//   const filteredProducts = searchTerm?.length
//     ? products.filter(({ title, summary }) => {
//         const lowerTitle = title?.toLowerCase();
//         const lowerSummary = summary?.toLowerCase();

//         return (
//           lowerTitle?.includes(searchTerm) || lowerSummary?.includes(searchTerm)
//         );
//       })
//     : products;

//   const highlightMatch = (text, keyword) => {
//     if (!keyword) {
//       return text;
//     }

//     const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/gi, "\\$&");
//     const regex = new RegExp(escapedKeyword, "gi");

//     let match;
//     let result = text;

//     while ((match = regex.exec(text)) !== null) {
//       const startPos = match.index;
//       const endPos = regex.lastIndex;
//       const highlighted = `<mark>${text.substring(startPos, endPos)}</mark>`;
//       result =
//         result.substring(0, startPos) + highlighted + result.substring(endPos);
//     }

//     return result;
//   };

//   return (
//     <>
//       <button
//         className="p-2 rounded-secondary hover:bg-slate-100 transition-colors"
//         onClick={() => setOpen(!open)}
//       >
//         <Search className="h-6 w-6" />
//       </button>

//       <Modal
//         isOpen={open}
//         onClose={() => setOpen(false)}
//         className="lg:w-1/3 md:w-3/4 w-full h-96 md:mx-0 mx-4 !z-[9999] bg-white p-8 drop-shadow-2xl"
//       >
//         <div className="flex flex-col gap-y-4 h-full">
//           <input
//             type="search"
//             name="search"
//             id="search"
//             placeholder="🔎 Type any product's title or keyword..."
//             className="!rounded w-full text-center"
//             onChange={handleSearch}
//           />
//           <div className="flex flex-row items-center gap-x-2 text-xs">
//             <hr className="flex-1" />
//             Your Search Results
//             <hr className="flex-1" />
//           </div>
//           <div className="overflow-y-auto scrollbar-hide flex flex-col gap-y-8 h-full">
//             {filteredProducts?.length === 0 ? (
//               <p className="text-sm flex flex-row gap-x-1 items-center justify-center">
//                 <Inform /> No Products Found!
//               </p>
//             ) : (
//               <>
//                 {productsLoading ? (
//                   <>
//                     {[1, 2, 3, 4].map((_, index) => (
//                       <SearchCard key={index} />
//                     ))}
//                   </>
//                 ) : (
//                   <>
//                     {filteredProducts?.map((product) => {
//                       const highlightedTitle = highlightMatch(
//                         product?.title,
//                         searchTerm
//                       );
//                       const highlightedSummary = highlightMatch(
//                         product?.summary,
//                         searchTerm
//                       );

//                       return (
//                         <div
//                           key={product?._id}
//                           className="flex flex-row gap-x-2 cursor-pointer"
//                           onClick={() =>
//                             router.push(
//                               `/product?product_id=${
//                                 product?._id
//                               }&product_title=${product?.title
//                                 .replace(/ /g, "-")
//                                 .toLowerCase()}}`
//                             )
//                           }
//                         >
//                           <Image
//                             src={product?.thumbnail?.url}
//                             alt={product?.thumbnail?.public_id}
//                             width={50}
//                             height={50}
//                             className="rounded h-[50px] w-[50px] object-cover"
//                           />
//                           <article className="flex flex-col gap-y-2">
//                             <div className="flex flex-col gap-y-0.5">
//                               <h2
//                                 className="text-base"
//                                 dangerouslySetInnerHTML={{
//                                   __html: highlightedTitle,
//                                 }}
//                               />
//                               <p
//                                 className="text-xs line-clamp-2"
//                                 dangerouslySetInnerHTML={{
//                                   __html: highlightedSummary,
//                                 }}
//                               />
//                             </div>
//                             <div className="flex flex-row justify-between gap-x-4 items-center">
//                               <span className="text-xs flex flex-row items-baseline">
//                                 $
//                                 <span className="text-sm text-black">
//                                   {product?.price}.00
//                                 </span>
//                               </span>
//                               <div className="flex flex-row gap-x-1">
//                                 <span className="whitespace-nowrap text-[10px] bg-purple-300/50 text-purple-500 border border-purple-500 px-1.5 rounded">
//                                   {product?.store?.title}
//                                 </span>
//                                 <span className="whitespace-nowrap text-[10px] bg-indigo-300/50 text-indigo-500 border border-indigo-500 px-1.5 rounded">
//                                   {product?.brand?.title}
//                                 </span>
//                                 <span className="whitespace-nowrap text-[10px] bg-blue-300/50 text-blue-500 border border-blue-500 px-1.5 rounded">
//                                   {product?.category?.title}
//                                 </span>
//                               </div>
//                             </div>
//                           </article>
//                         </div>
//                       );
//                     })}
//                   </>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default SearchFilter;

"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";

import { useGetProductsQuery } from "@/services/product/productApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchCard from "../skeletonLoading/SearchCard";
import { toast } from "react-hot-toast";

// Optimized debounce hook with proper cleanup
const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  const debouncedFn = useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  return debouncedFn;
};

// Optimized SVG components with memoization
const SearchIcon = ({ className = "h-5 w-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const CloseIcon = ({ className = "h-5 w-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const InformIcon = ({ className = "h-5 w-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const ArrowRightIcon = ({ className = "h-5 w-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

// Optimized animation components with CSS variables for better performance
const Backdrop = ({ children, onClick }) => {
  const backdropRef = useRef(null);

  useEffect(() => {
    const element = backdropRef.current;
    if (element) {
      requestAnimationFrame(() => {
        element.style.opacity = "1";
      });
    }
    return () => {
      if (element) {
        element.style.opacity = "0";
      }
    };
  }, []);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
      style={{ opacity: 0 }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const AnimatedModal = ({ children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const element = modalRef.current;
    if (element) {
      requestAnimationFrame(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0) translateX(-50%)";
      });
    }
  }, []);

  return (
    <div
      ref={modalRef}
      className="fixed top-20 left-1/2 z-[60] w-[95%] sm:w-[90%] md:w-full max-w-2xl max-h-[80vh] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 transition-all duration-300"
      style={{
        opacity: 0,
        transform: "translateY(-20px) translateX(-50%)",
        transitionProperty: "opacity, transform",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

// Optimized animated item with IntersectionObserver for better performance
const AnimatedItem = ({ children, index, isVisible }) => {
  const itemRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const element = itemRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsInView(true);
            observer.disconnect();
          }, 50 + index * 30); // Reduced delay for faster appearance
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible, index]);

  return (
    <div
      ref={itemRef}
      className="transition-all duration-300"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transitionProperty: "opacity, transform",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {children}
    </div>
  );
};

// Main component with performance optimizations
const SearchFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [animateItems, setAnimateItems] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return JSON.parse(localStorage.getItem("recentSearches") || "[]");
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const searchInputRef = useRef(null);
  const modalRef = useRef(null);
  const inputValueRef = useRef(""); // Track input value without re-renders

  // Optimized query with skip option to prevent unnecessary fetches
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery(undefined, {
    skip: !isOpen, // Only fetch when modal is open
  });

  // Memoized products to prevent unnecessary re-renders
  const products = useMemo(() => productsData?.data || [], [productsData]);
  const router = useRouter();

  // Handle errors with useEffect cleanup
  useEffect(() => {
    let toastId;
    if (productsError) {
      toastId = toast.error(productsError?.data?.description, {
        id: "search-filter",
      });
    }
    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [productsError]);

  // Save recent searches to localStorage with throttling
  useEffect(() => {
    if (typeof window === "undefined" || !recentSearches.length) return;

    const saveToStorage = () => {
      try {
        localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
      } catch (e) {
        console.error("Failed to save recent searches:", e);
      }
    };

    const timeoutId = setTimeout(saveToStorage, 500);
    return () => clearTimeout(timeoutId);
  }, [recentSearches]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      const timeoutId = setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  // Animate items when modal opens with cleanup
  useEffect(() => {
    let timeoutId;
    if (isOpen) {
      timeoutId = setTimeout(() => {
        setAnimateItems(true);
      }, 300);
    } else {
      setAnimateItems(false);
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  // Close modal on escape key with proper cleanup
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen]);

  // Close modal when clicking outside with proper cleanup
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Optimized debounced search handler
  const handleDebouncedSearch = useCallback(
    (value) => {
      const trimmedValue = value.trim().toLowerCase();
      setSearchTerm(trimmedValue);

      // Add to recent searches if not empty and not already in list
      if (trimmedValue && !recentSearches.includes(trimmedValue)) {
        setRecentSearches((prev) => [trimmedValue, ...prev.slice(0, 4)]);
      }
    },
    [recentSearches]
  );

  const debouncedSearch = useDebounce(handleDebouncedSearch, 250); // Reduced debounce time for faster response

  const handleSearch = (event) => {
    const value = event.target.value;
    inputValueRef.current = value; // Update ref without re-render
    debouncedSearch(value);
  };

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    inputValueRef.current = "";
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      searchInputRef.current.focus();
    }
  }, []);

  // Optimized product filtering with memoization and early returns
  const filteredProducts = useMemo(() => {
    if (!searchTerm?.trim()) return [];
    if (!products.length) return [];

    // Use faster array methods and early returns
    return products.filter((product) => {
      const title = product?.title?.toLowerCase() || "";
      if (title.includes(searchTerm)) return true;

      const summary = product?.summary?.toLowerCase() || "";
      return summary.includes(searchTerm);
    });
  }, [searchTerm, products]);

  // Optimized text highlighting function
  const highlightMatch = useCallback((text, keyword) => {
    if (!keyword || !text) return text;

    try {
      const regex = new RegExp(
        `(${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
        "gi"
      );
      const parts = text.split(regex);

      return parts.map((part, i) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <mark key={i} className="bg-yellow-200 px-0.5 rounded-sm">
            {part}
          </mark>
        ) : (
          part
        )
      );
    } catch (e) {
      return text; // Fallback if regex fails
    }
  }, []);

  // Optimized navigation function
  const navigateToProduct = useCallback(
    (product) => {
      setIsOpen(false);
      const slug = product?.title
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
        .toLowerCase();
      router.push(`/product?product_id=${product?._id}&product_title=${slug}`);
    },
    [router]
  );

  // Optimized recent search handler
  const handleRecentSearch = useCallback((term) => {
    if (searchInputRef.current) {
      searchInputRef.current.value = term;
      inputValueRef.current = term;
    }
    setSearchTerm(term.toLowerCase());
  }, []);

  // Optimized clear recent searches function
  const clearRecentSearches = useCallback((e) => {
    e.stopPropagation();
    setRecentSearches([]);
    try {
      localStorage.removeItem("recentSearches");
    } catch (e) {
      console.error("Failed to clear recent searches:", e);
    }
  }, []);

  // Optimized body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Search Button with improved accessibility */}
      <button
        className="relative p-2 "
        onClick={() => setIsOpen(true)}
        aria-label="Search products"
        title="Search products"
      >
        <SearchIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
        <span className="absolute -bottom-1 -right-1 w-2 h-2 transition-opacity"></span>
      </button>

      {/* Search Modal with improved mobile responsiveness */}
      {isOpen && (
        <Backdrop onClick={() => setIsOpen(false)}>
          <AnimatedModal>
            <div ref={modalRef} className="flex flex-col h-full">
              {/* Search Header with improved mobile styling */}
              <div className="p-3 sm:p-4 border-b border-gray-100">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search for products..."
                    className="w-full pl-10 pr-10 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    onChange={handleSearch}
                    defaultValue={searchTerm}
                    aria-label="Search input"
                  />
                  {inputValueRef.current && (
                    <button
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={clearSearch}
                      aria-label="Clear search"
                    >
                      <CloseIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>

                {/* Recent Searches with improved mobile layout */}
                {recentSearches.length > 0 && !searchTerm && (
                  <div className="mt-2 sm:mt-3">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <span className="text-xs font-medium text-gray-500">
                        Recent Searches
                      </span>
                      <button
                        className="text-xs text-purple-600 hover:text-purple-800"
                        onClick={clearRecentSearches}
                        aria-label="Clear all recent searches"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {recentSearches.map((term, index) => (
                        <button
                          key={index}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors flex items-center gap-1 sm:gap-1.5"
                          onClick={() => handleRecentSearch(term)}
                          aria-label={`Search for ${term}`}
                        >
                          <SearchIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-500" />
                          <span className="truncate max-w-[100px] sm:max-w-[150px]">
                            {term}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Search Results with improved scrolling performance */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 custom-scrollbar overscroll-contain">
                {/* Loading State */}
                {productsLoading && searchTerm && (
                  <div className="space-y-3 sm:space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <SearchCard key={index} />
                    ))}
                  </div>
                )}

                {/* Empty State with improved mobile layout */}
                {!productsLoading &&
                  searchTerm &&
                  filteredProducts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-6 sm:py-10 text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                        <InformIcon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                      </div>
                      <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-1">
                        No results found
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 max-w-md px-4">
                        We couldn't find any products matching "{searchTerm}".
                        Try using different keywords or check for typos.
                      </p>
                    </div>
                  )}

                {/* Results with improved mobile layout and virtualization */}
                {!productsLoading && filteredProducts.length > 0 && (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <span className="text-xs sm:text-sm font-medium text-gray-700">
                        {filteredProducts.length} results for "{searchTerm}"
                      </span>
                    </div>

                    {/* Only render visible items for better performance */}
                    {filteredProducts.slice(0, 20).map((product, index) => (
                      <AnimatedItem
                        key={product?._id}
                        index={index}
                        isVisible={animateItems}
                      >
                        <div
                          className="group flex gap-2 sm:gap-4 p-2 sm:p-3 rounded-lg border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 cursor-pointer transition-all"
                          onClick={() => navigateToProduct(product)}
                          role="button"
                          tabIndex={0}
                          aria-label={`View product: ${product?.title}`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              navigateToProduct(product);
                            }
                          }}
                        >
                          {/* Product Image with optimized loading */}
                          <div className="relative overflow-hidden rounded-lg h-14 w-14 sm:h-16 sm:w-16 bg-gray-100 flex-shrink-0">
                            <Image
                              src={
                                product?.thumbnail?.url || "/placeholder.svg"
                              }
                              alt={
                                product?.thumbnail?.public_id ||
                                product?.title ||
                                "Product image"
                              }
                              width={64}
                              height={64}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg";
                              }}
                            />
                          </div>

                          {/* Product Info with improved text truncation */}
                          <div className="flex-1 min-w-0 overflow-hidden">
                            <h3 className="text-xs sm:text-sm font-medium text-gray-800 mb-0.5 sm:mb-1 line-clamp-1">
                              {highlightMatch(product?.title, searchTerm)}
                            </h3>
                            <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2 mb-1 sm:mb-2">
                              {highlightMatch(product?.summary, searchTerm)}
                            </p>

                            {/* Product Meta with improved mobile layout */}
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                              <span className="text-xs sm:text-sm font-medium text-purple-700">
                                ${product?.price}.00
                              </span>

                              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                                {product?.store?.title && (
                                  <span className="px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-medium bg-purple-100 text-purple-700 rounded-full truncate max-w-[80px] sm:max-w-[100px]">
                                    {product.store.title}
                                  </span>
                                )}

                                {product?.brand?.title && (
                                  <span className="px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-medium bg-indigo-100 text-indigo-700 rounded-full truncate max-w-[80px] sm:max-w-[100px]">
                                    {product.brand.title}
                                  </span>
                                )}

                                {product?.category?.title && (
                                  <span className="px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-medium bg-blue-100 text-blue-700 rounded-full truncate max-w-[80px] sm:max-w-[100px]">
                                    {product.category.title}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Arrow indicator */}
                          <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                          </div>
                        </div>
                      </AnimatedItem>
                    ))}
                  </div>
                )}

                {/* Initial State - No Search Yet */}
                {!searchTerm && !recentSearches.length && (
                  <div className="flex flex-col items-center justify-center py-6 sm:py-10 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                      <SearchIcon className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-1">
                      Search for products
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 max-w-md px-4">
                      Type in the search box above to find products by name,
                      description, or keywords.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer with improved mobile layout */}
              {filteredProducts.length > 0 && (
                <div className="p-2 sm:p-3 border-t border-gray-100 bg-gray-50 text-[10px] sm:text-xs text-gray-500 text-center">
                  Press ESC to close or click outside
                </div>
              )}
            </div>
          </AnimatedModal>
        </Backdrop>
      )}

      {/* Optimized CSS with better mobile support */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db #f1f1f1;
        }

        /* Optimized highlight animation */
        @keyframes highlightPulse {
          0%,
          100% {
            background-color: rgba(253, 224, 71, 0.7);
          }
          50% {
            background-color: rgba(253, 224, 71, 0.3);
          }
        }

        mark {
          animation: highlightPulse 2s ease-in-out infinite;
          background-color: rgba(253, 224, 71, 0.7);
          border-radius: 2px;
        }

        /* Prevent body scroll when modal is open */
        body.modal-open {
          overflow: hidden;
        }

        /* Improved mobile responsiveness */
        @media (max-width: 640px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 2px;
          }

          mark {
            animation-duration: 1.5s;
          }
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          mark {
            animation: none;
          }

          .transition-all,
          .transition-opacity,
          .transition-colors {
            transition-duration: 0.1s !important;
          }
        }
      `}</style>
    </>
  );
};

export default SearchFilter;
