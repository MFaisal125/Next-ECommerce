// "use client";

// import { useGetBrandsQuery } from "@/services/brand/brandApi";
// import { useGetCategoriesQuery } from "@/services/category/categoryApi";
// import { useGetStoresQuery } from "@/services/store/storeApi";
// import React, { useEffect } from "react";
// import { AiOutlineReload } from "react-icons/ai";
// import SelectCard from "../shared/skeletonLoading/SelectCard";
// import { toast } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   clearFilter,
//   setBrand,
//   setCategory,
//   setStore,
// } from "@/features/filter/filterSlice";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";

// const FilterSidebar = () => {
//   const {
//     data: brandsData,
//     error: brandsError,
//     isLoading: brandsLoading,
//   } = useGetBrandsQuery();
//   const {
//     data: categoriesData,
//     error: categoriesError,
//     isLoading: categoriesLoading,
//   } = useGetCategoriesQuery();
//   const {
//     data: storesData,
//     error: storesError,
//     isLoading: storesLoading,
//   } = useGetStoresQuery();

//   const dispatch = useDispatch();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const filter = useSelector((state) => state.filter);

//   const brand = searchParams.get("brand");
//   const category = searchParams.get("category");
//   const store = searchParams.get("store");

//   const brands = brandsData?.data || [];
//   const categories = categoriesData?.data || [];
//   const stores = storesData?.data || [];

//   useEffect(() => {
//     if (brandsError?.data) {
//       toast.error(brandsError?.data?.description, { id: "brands-data" });
//     }

//     if (categoriesError?.data) {
//       toast.error(categoriesError?.data?.description, {
//         id: "categories-data",
//       });
//     }

//     if (storesError?.data) {
//       toast.error(storesError?.data?.description, { id: "stores-data" });
//     }
//   }, [brandsError, categoriesError, storesError]);

//   return (
//     <aside className="lg:col-span-3 md:col-span-4 col-span-12">
//       <section className="flex flex-col gap-y-4 md:sticky md:top-4">
//         {/* reset */}
//         <div className="flex flex-row items-center justify-between border py-2 px-4 rounded">
//           <h2 className="text-lg">Reset Filter</h2>
//           <button
//             className="p-1 border rounded-secondary"
//             onClick={() => {
//               dispatch(clearFilter());

//               // Uncheck all checkboxes for categories
//               categories.forEach((category) => {
//                 document.getElementById(category._id).checked = false;
//               });

//               // Uncheck all checkboxes for brands
//               brands.forEach((brand) => {
//                 document.getElementById(brand._id).checked = false;
//               });

//               // Uncheck all checkboxes for stores
//               stores.forEach((store) => {
//                 document.getElementById(store._id).checked = false;
//               });

//               // Use setTimeout to delay the navigation
//               router.push("/products");
//             }}
//           >
//             <AiOutlineReload className="h-5 w-5" />
//           </button>
//         </div>

//         {/* Choose Category */}
//         <div className="flex flex-col gap-y-4 border py-2 px-4 rounded-xl max-h-96 overflow-y-auto scrollbar-hide">
//           <h2 className="text-lg">Choose Category</h2>
//           <div className="flex flex-col gap-y-2.5">
//             {categoriesLoading || categories?.length === 0 ? (
//               <>
//                 {[1, 2, 3].map((_, index) => (
//                   <SelectCard key={index} />
//                 ))}
//               </>
//             ) : (
//               <>
//                 {categories.map((category) => (
//                   <Link
//                     key={category._id}
//                     href={`/products?category=${category._id}&brand=${brand}&store=${store}`}
//                   >
//                     <label
//                       htmlFor={category._id}
//                       className="text-sm flex flex-row items-center gap-x-1.5"
//                       onChange={() => dispatch(setCategory(category._id))}
//                     >
//                       <input
//                         type="radio"
//                         name="category"
//                         id={category._id}
//                         value={category._id}
//                         checked={
//                           category._id === filter.category ||
//                           category._id === category
//                         }
//                         className="rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1 focus:text-black"
//                       />
//                       {category.title}
//                     </label>
//                   </Link>
//                 ))}
//               </>
//             )}
//           </div>
//         </div>

//         {/* Choose Brand */}
//         <div className="flex flex-col gap-y-4 border py-2 px-4 rounded-xl max-h-96 overflow-y-auto scrollbar-hide">
//           <h2 className="text-lg">Choose Brand</h2>
//           <div className="flex flex-col gap-y-2.5">
//             {brandsLoading || brands?.length === 0 ? (
//               <>
//                 {[1, 2, 3].map((_, index) => (
//                   <SelectCard key={index} />
//                 ))}
//               </>
//             ) : (
//               <>
//                 {brands.map((brand) => (
//                   <Link
//                     key={brand._id}
//                     href={`/products?category=${category}&brand=${brand._id}&store=${store}`}
//                   >
//                     <label
//                       htmlFor={brand._id}
//                       className="text-sm flex flex-row items-center gap-x-1.5"
//                       onChange={() => dispatch(setBrand(brand._id))}
//                     >
//                       <input
//                         type="radio"
//                         name="brand"
//                         id={brand._id}
//                         value={brand._id}
//                         checked={brand._id == filter.brand}
//                         className="rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1 focus:text-black"
//                       />
//                       {brand.title}
//                     </label>
//                   </Link>
//                 ))}
//               </>
//             )}
//           </div>
//         </div>

//         {/* Choose Store */}
//         <div className="flex flex-col gap-y-4 border py-2 px-4 rounded-xl max-h-96 overflow-y-auto scrollbar-hide">
//           <h2 className="text-lg">Choose Store</h2>
//           <div className="flex flex-col gap-y-2.5">
//             {storesLoading || stores?.length === 0 ? (
//               <>
//                 {[1, 2, 3].map((_, index) => (
//                   <SelectCard key={index} />
//                 ))}
//               </>
//             ) : (
//               <>
//                 {stores.map((store) => (
//                   <Link
//                     key={store._id}
//                     href={`/products?category=${category}&brand=${brand}&store=${store._id}`}
//                   >
//                     <label
//                       htmlFor={store._id}
//                       className="text-sm flex flex-row items-center gap-x-1.5"
//                       onChange={() => dispatch(setStore(store._id))}
//                     >
//                       <input
//                         type="radio"
//                         name="store"
//                         id={store._id}
//                         value={store._id}
//                         checked={store._id == filter.store}
//                         className="rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1 focus:text-black"
//                       />
//                       {store.title}
//                     </label>
//                   </Link>
//                 ))}
//               </>
//             )}
//           </div>
//         </div>
//       </section>
//     </aside>
//   );
// };

// export default FilterSidebar;

"use client";

import {
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useState,
  useTransition,
} from "react";
import { useGetBrandsQuery } from "@/services/brand/brandApi";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import { useGetStoresQuery } from "@/services/store/storeApi";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilter,
  setBrand,
  setCategory,
  setStore,
} from "@/features/filter/filterSlice";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { RotateCcw, Search, Filter, ChevronDown, X, Check } from "lucide-react";

// Custom intersection observer hook - optimized for minimal re-renders
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);
  const optionsRef = useRef(options);

  useEffect(() => {
    const currentOptions = optionsRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, currentOptions);

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, []);

  return [targetRef, isIntersecting];
};

// Optimized virtualized list with windowing for ultra-fast rendering
const VirtualizedList = ({
  items,
  renderItem,
  itemHeight = 40,
  maxHeight = 300,
  className = "",
}) => {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(() => {
      setScrollTop(e.target.scrollTop);
    });
  }, []);

  // Calculate visible items for virtualization
  const visibleItemCount = Math.ceil(maxHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleItemCount + 1, items.length);

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex);
  }, [items, startIndex, endIndex]);

  const paddingTop = startIndex * itemHeight;
  const totalHeight = items.length * itemHeight;

  return (
    <div
      ref={containerRef}
      className={`overflow-y-auto ${className}`}
      style={{ maxHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            paddingTop,
          }}
        >
          {visibleItems.map((item, index) =>
            renderItem(item, startIndex + index)
          )}
        </div>
      </div>
    </div>
  );
};

// Filter section component - optimized for white backgrounds and minimal animations
const FilterSection = ({
  title,
  isLoading,
  items,
  selectedId,
  onChange,
  type,
  isOpen,
  onToggle,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Memoize filtered items to prevent unnecessary filtering on each render
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return items.filter((item) =>
      item.title.toLowerCase().includes(lowerSearchTerm)
    );
  }, [items, searchTerm]);

  // Memoize item renderer to prevent recreation on each render
  const renderItem = useCallback(
    (item, index) => (
      <div key={item._id || index} className="relative">
        <Link href={`/products?${type}=${item._id}`} className="block">
          <label
            htmlFor={item._id}
            className="flex items-center gap-x-3 py-2 px-3 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="relative">
              <input
                type="radio"
                name={type}
                id={item._id}
                value={item._id}
                checked={item._id === selectedId}
                onChange={() => onChange(item._id)}
                className="peer sr-only"
              />
              <div className="h-5 w-5 rounded-md border-2 border-gray-300 peer-checked:border-indigo-500 peer-checked:bg-indigo-500 transition-colors"></div>
              <Check
                className={`absolute top-0.5 left-0.5 h-4 w-4 text-white ${
                  item._id === selectedId ? "opacity-100" : "opacity-0"
                } transition-opacity`}
              />
            </div>
            <div className="flex-1 text-sm font-medium text-gray-700">
              {item.title}
            </div>
            {item.count && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {item.count}
              </span>
            )}
          </label>
        </Link>
      </div>
    ),
    [onChange, selectedId, type]
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <button
        className="w-full flex items-center justify-between py-3 px-4 text-left hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-x-2">
          <Filter className="h-4 w-4 text-indigo-500" />
          <h2 className="text-base font-medium text-gray-800">{title}</h2>
        </div>
        <div
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </button>

      {isOpen && (
        <div className="px-2 pb-3">
          <div className="relative mb-3 mx-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>

          {isLoading ? (
            <div className="space-y-2 px-2">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="h-10 bg-gray-100 rounded-md animate-pulse"
                ></div>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-4 text-sm text-gray-500">
              No {title.toLowerCase()} found
            </div>
          ) : (
            <VirtualizedList
              items={filteredItems}
              renderItem={renderItem}
              maxHeight={300}
              className="px-2"
            />
          )}
        </div>
      )}
    </div>
  );
};

// Main FilterSidebar component - optimized for performance and white backgrounds
const FilterSidebar = () => {
  const [isPending, startTransition] = useTransition();
  const [openSections, setOpenSections] = useState({
    category: true,
    brand: false,
    store: false,
  });

  const [ref, isInView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Optimized data fetching with selective polling and caching
  const {
    data: brandsData,
    error: brandsError,
    isLoading: brandsLoading,
  } = useGetBrandsQuery(undefined, {
    pollingInterval: 600000, // Poll every 10 minutes (reduced frequency)
    refetchOnMountOrArgChange: true,
    staleTime: 300000, // Consider data fresh for 5 minutes
  });

  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery(undefined, {
    pollingInterval: 600000,
    refetchOnMountOrArgChange: true,
    staleTime: 300000,
  });

  const {
    data: storesData,
    error: storesError,
    isLoading: storesLoading,
  } = useGetStoresQuery(undefined, {
    pollingInterval: 600000,
    refetchOnMountOrArgChange: true,
    staleTime: 300000,
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = useSelector((state) => state.filter);

  // Memoize query params to prevent unnecessary re-renders
  const queryParams = useMemo(
    () => ({
      brand: searchParams.get("brand"),
      category: searchParams.get("category"),
      store: searchParams.get("store"),
    }),
    [searchParams]
  );

  // Memoize data arrays to prevent unnecessary re-renders
  const brands = useMemo(() => brandsData?.data || [], [brandsData?.data]);
  const categories = useMemo(
    () => categoriesData?.data || [],
    [categoriesData?.data]
  );
  const stores = useMemo(() => storesData?.data || [], [storesData?.data]);

  // Batch error handling with optimized toast notifications
  useEffect(() => {
    const errors = [
      { error: brandsError?.data, id: "brands-data" },
      { error: categoriesError?.data, id: "categories-data" },
      { error: storesError?.data, id: "stores-data" },
    ];

    // Only show one error at a time to avoid toast spam
    const firstError = errors.find(({ error }) => error);
    if (firstError) {
      toast.error(firstError.error.description, { id: firstError.id });
    }
  }, [brandsError, categoriesError, storesError]);

  // Memoize handler functions to prevent recreating on each render
  const handleClearFilter = useCallback(() => {
    startTransition(() => {
      dispatch(clearFilter());
      router.push("/products");
    });
  }, [dispatch, router]);

  const toggleSection = useCallback((section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }, []);

  const handleCategoryChange = useCallback(
    (id) => {
      startTransition(() => {
        dispatch(setCategory(id));
      });
    },
    [dispatch]
  );

  const handleBrandChange = useCallback(
    (id) => {
      startTransition(() => {
        dispatch(setBrand(id));
      });
    },
    [dispatch]
  );

  const handleStoreChange = useCallback(
    (id) => {
      startTransition(() => {
        dispatch(setStore(id));
      });
    },
    [dispatch]
  );

  // Memoize active filter components to prevent unnecessary re-renders
  const ActiveFilters = useMemo(() => {
    if (!filter.category && !filter.brand && !filter.store) {
      return <p className="text-sm text-gray-500">No active filters</p>;
    }

    return (
      <>
        {filter.category && (
          <div className="flex items-center gap-x-1 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs">
            <span>
              {categories.find((c) => c._id === filter.category)?.title ||
                "Category"}
            </span>
            <button
              onClick={() => dispatch(setCategory(null))}
              className="p-0.5 hover:bg-indigo-100 rounded-full"
              aria-label="Remove category filter"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        {filter.brand && (
          <div className="flex items-center gap-x-1 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs">
            <span>
              {brands.find((b) => b._id === filter.brand)?.title || "Brand"}
            </span>
            <button
              onClick={() => dispatch(setBrand(null))}
              className="p-0.5 hover:bg-purple-100 rounded-full"
              aria-label="Remove brand filter"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        {filter.store && (
          <div className="flex items-center gap-x-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs">
            <span>
              {stores.find((s) => s._id === filter.store)?.title || "Store"}
            </span>
            <button
              onClick={() => dispatch(setStore(null))}
              className="p-0.5 hover:bg-blue-100 rounded-full"
              aria-label="Remove store filter"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
      </>
    );
  }, [
    filter.category,
    filter.brand,
    filter.store,
    categories,
    brands,
    stores,
    dispatch,
  ]);

  return (
    <aside className="lg:col-span-3 md:col-span-4 col-span-12">
      <section ref={ref} className="flex flex-col gap-y-4 md:sticky md:top-4">
        {/* Reset Filter Button */}
        <button
          onClick={handleClearFilter}
          disabled={isPending}
          className="py-3 px-4 rounded-lg w-full flex items-center justify-between bg-indigo-500 text-white hover:bg-indigo-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="font-medium">Reset All Filters</span>
          <RotateCcw className="h-4 w-4" />
        </button>

        {/* Filter Sections */}
        {isInView && (
          <>
            <FilterSection
              title="Choose Category"
              isLoading={categoriesLoading}
              items={categories}
              selectedId={filter.category || queryParams.category}
              onChange={handleCategoryChange}
              type="category"
              isOpen={openSections.category}
              onToggle={() => toggleSection("category")}
            />

            <FilterSection
              title="Choose Brand"
              isLoading={brandsLoading}
              items={brands}
              selectedId={filter.brand || queryParams.brand}
              onChange={handleBrandChange}
              type="brand"
              isOpen={openSections.brand}
              onToggle={() => toggleSection("brand")}
            />

            <FilterSection
              title="Choose Store"
              isLoading={storesLoading}
              items={stores}
              selectedId={filter.store || queryParams.store}
              onChange={handleStoreChange}
              type="store"
              isOpen={openSections.store}
              onToggle={() => toggleSection("store")}
            />
          </>
        )}

        {/* Active Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h2 className="text-base font-medium text-gray-800 mb-3">
            Active Filters
          </h2>

          <div className="flex flex-wrap gap-2">{ActiveFilters}</div>
        </div>
      </section>
    </aside>
  );
};

export default FilterSidebar;
