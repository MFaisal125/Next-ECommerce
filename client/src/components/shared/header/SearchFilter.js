// /**
//  * Title: Write a program using JavaScript on SearchFilter
//  * Author: Hasibul Islam
//  * Portfolio: https://devhasibulislam.vercel.app
//  * Linkedin: https://linkedin.com/in/devhasibulislam
//  * GitHub: https://github.com/devhasibulislam
//  * Facebook: https://facebook.com/devhasibulislam
//  * Instagram: https://instagram.com/devhasibulislam
//  * Twitter: https://twitter.com/devhasibulislam
//  * Pinterest: https://pinterest.com/devhasibulislam
//  * WhatsApp: https://wa.me/8801906315901
//  * Telegram: devhasibulislam
//  * Date: 13, November 2023
//  */

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

/**
 * Title: Modern Search Filter Component
 * Description: Fast, optimized and dynamic search experience
 */

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useGetProductsQuery } from "@/services/product/productApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchCard from "../skeletonLoading/SearchCard";
import { toast } from "react-hot-toast";

// Custom debounce function to avoid lodash dependency
function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);

  const debouncedFn = useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFn;
}

// Icons as inline SVGs for better performance
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

// Simple animation components to replace framer-motion
const Backdrop = ({ children, onClick }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setOpacity(1), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
      style={{ opacity }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const AnimatedModal = ({ children, onClose }) => {
  const [opacity, setOpacity] = useState(0);
  const [transform, setTransform] = useState(
    "translateY(-20px) translateX(-50%)"
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1);
      setTransform("translateY(0) translateX(-50%)");
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed top-20 left-1/2 z-[60] w-full max-w-2xl max-h-[80vh] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 transition-all duration-300"
      style={{
        opacity,
        transform,
        transitionProperty: "opacity, transform",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

const AnimatedItem = ({ children, index, isVisible }) => {
  const [opacity, setOpacity] = useState(0);
  const [transform, setTransform] = useState("translateY(20px)");

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setOpacity(1);
        setTransform("translateY(0)");
      }, 50 + index * 50);
      return () => clearTimeout(timer);
    }
  }, [isVisible, index]);

  return (
    <div
      className="transition-all duration-300"
      style={{
        opacity,
        transform,
        transitionProperty: "opacity, transform",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {children}
    </div>
  );
};

const SearchFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [animateItems, setAnimateItems] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("recentSearches") || "[]");
    }
    return [];
  });

  const searchInputRef = useRef(null);
  const modalRef = useRef(null);

  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery();

  const products = useMemo(() => productsData?.data || [], [productsData]);
  const router = useRouter();

  // Handle errors
  useEffect(() => {
    if (productsError) {
      toast.error(productsError?.data?.description, { id: "search-filter" });
    }
  }, [productsError]);

  // Save recent searches to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    }
  }, [recentSearches]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  // Animate items when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setAnimateItems(true);
      }, 300);
    } else {
      setAnimateItems(false);
    }
  }, [isOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Debounced search handler for performance
  const handleDebouncedSearch = useCallback(
    (value) => {
      setSearchTerm(value.toLowerCase());

      // Add to recent searches if not empty and not already in list
      if (value.trim() && !recentSearches.includes(value.trim())) {
        setRecentSearches((prev) => [value.trim(), ...prev.slice(0, 4)]);
      }
    },
    [recentSearches]
  );

  const debouncedSearch = useDebounce(handleDebouncedSearch, 300);

  const handleSearch = (event) => {
    debouncedSearch(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      searchInputRef.current.focus();
    }
  };

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm?.trim()) return [];

    return products.filter(({ title, summary }) => {
      const lowerTitle = title?.toLowerCase() || "";
      const lowerSummary = summary?.toLowerCase() || "";

      return (
        lowerTitle?.includes(searchTerm) || lowerSummary?.includes(searchTerm)
      );
    });
  }, [searchTerm, products]);

  // Highlight matched text
  const highlightMatch = (text, keyword) => {
    if (!keyword || !text) return text;

    const parts = text.split(new RegExp(`(${keyword})`, "gi"));

    return parts.map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 px-0.5 rounded-sm">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Navigate to product page
  const navigateToProduct = (product) => {
    setIsOpen(false);
    router.push(
      `/product?product_id=${product?._id}&product_title=${product?.title
        .replace(/ /g, "-")
        .toLowerCase()}`
    );
  };

  // Use recent search
  const handleRecentSearch = (term) => {
    if (searchInputRef.current) {
      searchInputRef.current.value = term;
    }
    setSearchTerm(term.toLowerCase());
  };

  // Clear recent searches
  const clearRecentSearches = (e) => {
    e.stopPropagation();
    setRecentSearches([]);
  };

  return (
    <>
      {/* Search Button */}
      <button
        className="relative p-2 rounded-full bg-white hover:bg-gray-50 border border-gray-200 shadow-sm transition-all duration-200 hover:shadow group"
        onClick={() => setIsOpen(true)}
        aria-label="Search products"
      >
        <SearchIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
        <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <Backdrop onClick={() => setIsOpen(false)}>
          <AnimatedModal>
            <div ref={modalRef} className="flex flex-col h-full">
              {/* Search Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search for products..."
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    onChange={handleSearch}
                    defaultValue={searchTerm}
                  />
                  {searchInputRef?.current?.value && (
                    <button
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={clearSearch}
                    >
                      <CloseIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>

                {/* Recent Searches */}
                {recentSearches.length > 0 && !searchTerm && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-500">
                        Recent Searches
                      </span>
                      <button
                        className="text-xs text-purple-600 hover:text-purple-800"
                        onClick={clearRecentSearches}
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term, index) => (
                        <button
                          key={index}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors flex items-center gap-1.5"
                          onClick={() => handleRecentSearch(term)}
                        >
                          <SearchIcon className="h-3 w-3 text-gray-500" />
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Search Results */}
              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {/* Loading State */}
                {productsLoading && searchTerm && (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((_, index) => (
                      <SearchCard key={index} />
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {!productsLoading &&
                  searchTerm &&
                  filteredProducts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <InformIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-1">
                        No results found
                      </h3>
                      <p className="text-sm text-gray-500 max-w-md">
                        We couldn't find any products matching "{searchTerm}".
                        Try using different keywords or check for typos.
                      </p>
                    </div>
                  )}

                {/* Results */}
                {!productsLoading && filteredProducts.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {filteredProducts.length} results for "{searchTerm}"
                      </span>
                    </div>

                    {filteredProducts.map((product, index) => (
                      <AnimatedItem
                        key={product?._id}
                        index={index}
                        isVisible={animateItems}
                      >
                        <div
                          className="group flex gap-4 p-3 rounded-lg border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 cursor-pointer transition-all"
                          onClick={() => navigateToProduct(product)}
                        >
                          {/* Product Image */}
                          <div className="relative overflow-hidden rounded-lg h-16 w-16 bg-gray-100 flex-shrink-0">
                            <Image
                              src={
                                product?.thumbnail?.url || "/placeholder.svg"
                              }
                              alt={
                                product?.thumbnail?.public_id || product?.title
                              }
                              width={64}
                              height={64}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-1">
                              {highlightMatch(product?.title, searchTerm)}
                            </h3>
                            <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                              {highlightMatch(product?.summary, searchTerm)}
                            </p>

                            {/* Product Meta */}
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-medium text-purple-700">
                                ${product?.price}.00
                              </span>

                              <div className="flex flex-wrap gap-1.5">
                                {product?.store?.title && (
                                  <span className="px-2 py-0.5 text-[10px] font-medium bg-purple-100 text-purple-700 rounded-full">
                                    {product.store.title}
                                  </span>
                                )}

                                {product?.brand?.title && (
                                  <span className="px-2 py-0.5 text-[10px] font-medium bg-indigo-100 text-indigo-700 rounded-full">
                                    {product.brand.title}
                                  </span>
                                )}

                                {product?.category?.title && (
                                  <span className="px-2 py-0.5 text-[10px] font-medium bg-blue-100 text-blue-700 rounded-full">
                                    {product.category.title}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Arrow indicator */}
                          <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRightIcon className="h-4 w-4 text-purple-500" />
                          </div>
                        </div>
                      </AnimatedItem>
                    ))}
                  </div>
                )}

                {/* Initial State - No Search Yet */}
                {!searchTerm && !recentSearches.length && (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <SearchIcon className="h-8 w-8 text-purple-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">
                      Search for products
                    </h3>
                    <p className="text-sm text-gray-500 max-w-md">
                      Type in the search box above to find products by name,
                      description, or keywords.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {filteredProducts.length > 0 && (
                <div className="p-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 text-center">
                  Press ESC to close or click outside
                </div>
              )}
            </div>
          </AnimatedModal>
        </Backdrop>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
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

        @media (max-width: 640px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 3px;
          }
        }

        /* Highlight animation */
        @keyframes highlightPulse {
          0% {
            background-color: rgba(253, 224, 71, 0.7);
          }
          50% {
            background-color: rgba(253, 224, 71, 0.3);
          }
          100% {
            background-color: rgba(253, 224, 71, 0.7);
          }
        }

        mark {
          animation: highlightPulse 2s ease-in-out infinite;
          background-color: rgba(253, 224, 71, 0.7);
        }
      `}</style>
    </>
  );
};

export default SearchFilter;
