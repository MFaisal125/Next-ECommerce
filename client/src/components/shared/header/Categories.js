// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import OutsideClick from "../OutsideClick";
// import { BiCategory, BiChevronDown } from "react-icons/bi";
// import { useGetCategoriesQuery } from "@/services/category/categoryApi";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import CategoryCard from "../skeletonLoading/CategoryCard";
// import { toast } from "react-hot-toast";
// import { useGetBrandsQuery } from "@/services/brand/brandApi";
// import { useGetStoresQuery } from "@/services/store/storeApi";

// const Categories = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [tab, setTab] = useState("categories");
//   const {
//     data: categoriesData,
//     error: categoriesError,
//     isLoading: categoriesLoading,
//   } = useGetCategoriesQuery();
//   const categories = useMemo(
//     () => categoriesData?.data || [],
//     [categoriesData]
//   );
//   const {
//     isLoading: brandsLoading,
//     error: brandsError,
//     data: brandsData,
//   } = useGetBrandsQuery();
//   const brands = useMemo(() => brandsData?.data || [], [brandsData]);
//   const {
//     isLoading: storesLoading,
//     data: storesData,
//     error: storesError,
//   } = useGetStoresQuery();
//   const stores = useMemo(() => storesData?.data || [], [storesData]);

//   const router = useRouter();

//   useEffect(() => {
//     if (categoriesError) {
//       toast.error(categoriesError?.data?.description, {
//         id: "categoriesData",
//       });
//     }

//     if (brandsError) {
//       toast.error(brandsError?.data?.description, {
//         id: "brandsData",
//       });
//     }

//     if (storesError) {
//       toast.error(storesError?.data?.description, {
//         id: "storesData",
//       });
//     }
//   }, [categoriesError, brandsError, storesError]);

//   return (
//     <>
//       <button
//         className="border px-2.5 py-1.5 rounded flex flex-row items-center gap-x-0.5 hover:border-black transition-colors"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <BiCategory className="h-6 w-6" />
//         <BiChevronDown className="h-6 w-6" />
//       </button>

//       {isOpen && (
//         <OutsideClick
//           onOutsideClick={() => setIsOpen(false)}
//           className="absolute top-full left-0 w-80 h-96 overflow-y-auto bg-white border rounded p-4 flex flex-col gap-y-4"
//         >
//           <section className="flex flex-col gap-y-4 h-full">
//             <div className="flex flex-row gap-x-2">
//               <button
//                 type="button"
//                 className={`text-xs px-2 py-1 border rounded ${
//                   tab === "categories" ? "!bg-black !text-white" : ""
//                 }`}
//                 onClick={() => setTab("categories")}
//               >
//                 Categories
//               </button>
//               <button
//                 type="button"
//                 className={`text-xs px-2 py-1 border rounded ${
//                   tab === "brands" ? "!bg-black !text-white" : ""
//                 }`}
//                 onClick={() => setTab("brands")}
//               >
//                 Brands
//               </button>
//               <button
//                 type="button"
//                 className={`text-xs px-2 py-1 border rounded ${
//                   tab === "stores" ? "!bg-black !text-white" : ""
//                 }`}
//                 onClick={() => setTab("stores")}
//               >
//                 Stores
//               </button>
//             </div>

//             <div className="h-full overflow-y-auto scrollbar-hide">
//               {tab === "categories" && (
//                 <>
//                   {categoriesLoading ? (
//                     <div className="flex flex-col gap-y-4">
//                       {[1, 2, 3, 4, 5, 6].map((_, index) => (
//                         <CategoryCard key={index} />
//                       ))}
//                     </div>
//                   ) : (
//                     <>
//                       {categories.map((category) => (
//                         <div
//                           key={category?._id}
//                           className="w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded cursor-pointer"
//                           onClick={() => {
//                             router.push("/products?category=" + category?._id);
//                             setIsOpen(false);
//                           }}
//                         >
//                           <Image
//                             src={category?.thumbnail?.url}
//                             alt={category?.thumbnail?.public_id}
//                             width={40}
//                             height={40}
//                             className="h-[40px] w-[40px] object-cover rounded"
//                           />
//                           <article className="whitespace-normal">
//                             <h2 className="text-sm">{category?.title}</h2>
//                             <p className="text-xs line-clamp-2">
//                               {category?.description}
//                             </p>
//                             <span className="text-[10px] bg-purple-300/50 text-purple-500 border border-purple-500 px-1.5 rounded">
//                               Products: {category?.products?.length}
//                             </span>
//                           </article>
//                         </div>
//                       ))}
//                     </>
//                   )}

//                   {!categoriesLoading && categories?.length === 0 && (
//                     <p className="text-xs">Oops! No categories found!</p>
//                   )}
//                 </>
//               )}
//               {tab === "brands" && (
//                 <>
//                   {brandsLoading || brands?.length === 0 ? (
//                     <div className="flex flex-col gap-y-4">
//                       {[1, 2, 3, 4, 5, 6].map((_, index) => (
//                         <CategoryCard key={index} />
//                       ))}
//                     </div>
//                   ) : (
//                     <>
//                       {brands.map((brand) => (
//                         <div
//                           key={brand?._id}
//                           className="w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded cursor-pointer"
//                           onClick={() => {
//                             router.push("/products?brand=" + brand?._id);
//                             setIsOpen(false);
//                           }}
//                         >
//                           <Image
//                             src={brand?.logo?.url}
//                             alt={brand?.logo?.public_id}
//                             width={40}
//                             height={40}
//                             className="h-[40px] w-[40px] object-cover rounded"
//                           />
//                           <article className="whitespace-normal">
//                             <h2 className="text-sm">{brand?.title}</h2>
//                             <p className="text-xs line-clamp-2">
//                               {brand?.description}
//                             </p>
//                             <span className="text-[10px] bg-purple-300/50 text-purple-500 border border-purple-500 px-1.5 rounded">
//                               Products: {brand?.products?.length}
//                             </span>
//                           </article>
//                         </div>
//                       ))}
//                     </>
//                   )}

//                   {!brandsLoading && brands?.length === 0 && (
//                     <p className="text-xs">Oops! No brands found!</p>
//                   )}
//                 </>
//               )}
//               {tab === "stores" && (
//                 <>
//                   {storesLoading || stores?.length === 0 ? (
//                     <div className="flex flex-col gap-y-4">
//                       {[1, 2, 3, 4, 5, 6].map((_, index) => (
//                         <CategoryCard key={index} />
//                       ))}
//                     </div>
//                   ) : (
//                     <>
//                       {stores.map((store) => (
//                         <div
//                           key={store?._id}
//                           className="w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded cursor-pointer"
//                           onClick={() => {
//                             router.push("/products?store=" + store?._id);
//                             setIsOpen(false);
//                           }}
//                         >
//                           <Image
//                             src={store?.thumbnail?.url}
//                             alt={store?.thumbnail?.public_id}
//                             width={40}
//                             height={40}
//                             className="h-[40px] w-[40px] object-cover rounded"
//                           />
//                           <article className="whitespace-normal">
//                             <h2 className="text-sm">{store?.title}</h2>
//                             <p className="text-xs line-clamp-2">
//                               {store?.description}
//                             </p>
//                             <span className="text-[10px] bg-purple-300/50 text-purple-500 border border-purple-500 px-1.5 rounded">
//                               Products: {store?.products?.length}
//                             </span>
//                           </article>
//                         </div>
//                       ))}
//                     </>
//                   )}

//                   {!storesLoading && stores?.length === 0 && (
//                     <p className="text-xs">Oops! No stores found!</p>
//                   )}
//                 </>
//               )}
//             </div>
//           </section>
//         </OutsideClick>
//       )}
//     </>
//   );
// };

// export default Categories;

"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CategoryCard from "../skeletonLoading/CategoryCard";
import { toast } from "react-hot-toast";
import { useGetBrandsQuery } from "@/services/brand/brandApi";
import { useGetStoresQuery } from "@/services/store/storeApi";

// Custom hook for detecting clicks outside an element
function useOutsideClick(callback) {
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [callback]);

  return ref;
}

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("categories");
  const [searchTerm, setSearchTerm] = useState("");
  const [animateItems, setAnimateItems] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const buttonRef = useRef(null);

  // Ref for the dropdown
  const dropdownRef = useOutsideClick(() => {
    if (isOpen) setIsOpen(false);
  });

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate dropdown position when button is clicked
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;

      if (isMobile) {
        // On mobile, center the dropdown
        setDropdownPosition({
          top: buttonRect.bottom + scrollY,
          left: buttonRect.left + buttonRect.width / 2,
          width: Math.min(window.innerWidth - 32, 400), // 16px padding on each side
        });
      } else {
        // On desktop, align with the button
        setDropdownPosition({
          top: buttonRect.bottom + scrollY,
          left: buttonRect.left,
          width: Math.max(buttonRect.width * 1.5, 320), // At least 320px wide
        });
      }
    }
  }, [isOpen, isMobile]);

  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();
  const categories = useMemo(
    () => categoriesData?.data || [],
    [categoriesData]
  );

  const {
    isLoading: brandsLoading,
    error: brandsError,
    data: brandsData,
  } = useGetBrandsQuery();
  const brands = useMemo(() => brandsData?.data || [], [brandsData]);

  const {
    isLoading: storesLoading,
    data: storesData,
    error: storesError,
  } = useGetStoresQuery();
  const stores = useMemo(() => storesData?.data || [], [storesData]);

  const router = useRouter();

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return tab === "categories"
        ? categories
        : tab === "brands"
        ? brands
        : stores;
    }

    const term = searchTerm.toLowerCase();

    if (tab === "categories") {
      return categories.filter(
        (category) =>
          category.title.toLowerCase().includes(term) ||
          category.description.toLowerCase().includes(term)
      );
    } else if (tab === "brands") {
      return brands.filter(
        (brand) =>
          brand.title.toLowerCase().includes(term) ||
          brand.description.toLowerCase().includes(term)
      );
    } else {
      return stores.filter(
        (store) =>
          store.title.toLowerCase().includes(term) ||
          store.description.toLowerCase().includes(term)
      );
    }
  }, [tab, searchTerm, categories, brands, stores]);

  // Animate items when tab changes
  useEffect(() => {
    setAnimateItems(false);
    const timer = setTimeout(() => setAnimateItems(true), 50);
    return () => clearTimeout(timer);
  }, [tab]);

  useEffect(() => {
    if (categoriesError) {
      toast.error(categoriesError?.data?.description, {
        id: "categoriesData",
      });
    }

    if (brandsError) {
      toast.error(brandsError?.data?.description, {
        id: "brandsData",
      });
    }

    if (storesError) {
      toast.error(storesError?.data?.description, {
        id: "storesData",
      });
    }
  }, [categoriesError, brandsError, storesError]);

  // Handle item click
  const handleItemClick = (id) => {
    const path = `/products?${tab.slice(0, -1)}=${id}`;
    router.push(path);
    setIsOpen(false);
  };

  // Toggle dropdown
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);

    // Reset search and animate when opening
    if (!isOpen) {
      setSearchTerm("");
      setAnimateItems(false);
      setTimeout(() => setAnimateItems(true), 150);
    }
  };

  // Render item card
  const renderItem = (item, index) => {
    const delay = `${index * 50}ms`;
    const imageUrl =
      tab === "categories"
        ? item?.thumbnail?.url
        : tab === "brands"
        ? item?.logo?.url
        : item?.thumbnail?.url;

    const imageAlt =
      tab === "categories"
        ? item?.thumbnail?.public_id
        : tab === "brands"
        ? item?.logo?.public_id
        : item?.thumbnail?.public_id;

    return (
      <div
        key={item?._id}
        className={`w-full flex flex-row items-start gap-x-2 sm:gap-x-3 p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-50 border-b border-gray-100 ${
          animateItems ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{
          transitionDelay: delay,
          animationDelay: delay,
        }}
        onClick={() => handleItemClick(item?._id)}
      >
        <div className="relative overflow-hidden rounded-lg group h-[40px] w-[40px] sm:h-[50px] sm:w-[50px] flex-shrink-0">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={imageAlt}
            width={50}
            height={50}
            className="h-full w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>

        <article className="whitespace-normal flex-1 min-w-0">
          <h2 className="text-xs sm:text-sm font-medium text-gray-800 truncate">
            {item?.title}
          </h2>
          <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-1 sm:line-clamp-2 mt-0.5 mb-1">
            {item?.description}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[8px] sm:text-[10px] bg-purple-100 text-purple-700 px-1.5 sm:px-2 py-0.5 rounded-full font-medium  sm:text-[10px] bg-purple-100 text-purple-700 px-1.5 sm:px-2 py-0.5 rounded-full font-medium">
              {item?.products?.length} Products
            </span>

            {/* Add a subtle "View" button - only show on larger screens */}
            <span className="text-[8px] sm:text-[10px] text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:inline-block">
              View all →
            </span>
          </div>
        </article>
      </div>
    );
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className={`relative overflow-hidden group px-2 sm:px-3 py-1.5 sm:py-2 rounded-full flex flex-row items-center gap-x-1 sm:gap-x-2 border ${
          isOpen
            ? "border-purple-300 shadow-sm"
            : "border-gray-200 hover:border-gray-300"
        } transition-all duration-200 hover:shadow`}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-4 w-4 sm:h-5 sm:w-5 ${
              isOpen ? "text-purple-600" : "text-gray-700"
            } transition-colors`}
          >
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
        </span>
        <span
          className={`text-xs sm:text-sm font-medium ${
            isOpen ? "text-purple-600" : "text-gray-700"
          } transition-colors`}
        ></span>
        <span
          className={`flex items-center justify-center transition-all duration-200 ${
            isOpen
              ? "rotate-180 text-purple-600"
              : "text-gray-500 group-hover:translate-y-0.5"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3 sm:h-4 sm:w-4"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>

        {/* Subtle indicator dot when dropdown is open */}
        {isOpen && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-500 rounded-full"></span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`fixed z-50 bg-white border border-gray-200 rounded-xl p-3 sm:p-4 flex flex-col gap-y-3 sm:gap-y-4 shadow-lg overflow-hidden transition-all duration-300 ${
            animateItems
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2"
          }`}
          style={{
            top: `${dropdownPosition.top}px`,
            left: isMobile ? "50%" : `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
            maxHeight: isMobile ? "80vh" : "500px",
            transform: isMobile ? "translateX(-50%)" : "none",
          }}
        >
          <section className="flex flex-col gap-y-3 sm:gap-y-4 h-full">
            {/* Search input */}
            {/* <div className="relative">
              <input
                type="text"
                placeholder={`Search ${tab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-8 sm:pl-10 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                autoFocus={!isMobile} // Autofocus on desktop only
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>

              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3 sm:h-4 sm:w-4"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              )}
            </div> */}

            {/* Tabs */}
            <div className="flex flex-row gap-x-1 p-1 bg-gray-50 rounded-lg">
              {["categories", "brands", "stores"].map((tabName) => (
                <button
                  key={tabName}
                  type="button"
                  className={`text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-md flex-1 font-medium transition-all duration-200 ${
                    tab === tabName
                      ? "bg-white text-purple-700 shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setTab(tabName);
                    setSearchTerm("");
                    setAnimateItems(false);
                    setTimeout(() => setAnimateItems(true), 50);
                  }}
                >
                  {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                </button>
              ))}
            </div>

            {/* Content area */}
            <div
              className="h-full overflow-y-auto custom-scrollbar"
              style={{ maxHeight: isMobile ? "50vh" : "350px" }}
            >
              {/* Loading state */}
              {((tab === "categories" && categoriesLoading) ||
                (tab === "brands" && brandsLoading) ||
                (tab === "stores" && storesLoading)) && (
                <div className="flex flex-col gap-y-3 sm:gap-y-4 px-1">
                  {[1, 2, 3, 4].map((_, index) => (
                    <CategoryCard key={index} />
                  ))}
                </div>
              )}

              {/* Empty state */}
              {!(
                (tab === "categories" && categoriesLoading) ||
                (tab === "brands" && brandsLoading) ||
                (tab === "stores" && storesLoading)
              ) &&
                filteredItems.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-6 sm:py-8 px-4 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                        <line x1="9" x2="9.01" y1="9" y2="9" />
                        <line x1="15" x2="15.01" y1="9" y2="9" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {searchTerm
                        ? `No ${tab} found matching "${searchTerm}"`
                        : `No ${tab} available at the moment`}
                    </p>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-purple-600 font-medium hover:text-purple-700"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                )}

              {/* Content */}
              {!(
                (tab === "categories" && categoriesLoading) ||
                (tab === "brands" && brandsLoading) ||
                (tab === "stores" && storesLoading)
              ) &&
                filteredItems.length > 0 && (
                  <div className="flex flex-col">
                    {filteredItems.map((item, index) =>
                      renderItem(item, index)
                    )}
                  </div>
                )}
            </div>

            {/* Footer with count */}
            {filteredItems.length > 0 && (
              <div className="pt-1.5 sm:pt-2 border-t border-gray-100 flex justify-between items-center">
                <span className="text-[10px] sm:text-xs text-gray-500">
                  Showing {filteredItems.length} {tab}
                </span>

                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-[10px] sm:text-xs text-purple-600 font-medium hover:text-purple-700"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

// Add this CSS to your global styles or as a style tag
const CustomScrollbarStyles = () => (
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
  `}</style>
);

export default function CategoriesWithStyles() {
  return (
    <>
      <CustomScrollbarStyles />
      <Categories />
    </>
  );
}
