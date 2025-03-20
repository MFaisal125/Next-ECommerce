// import Cart from "@/components/icons/Cart";
// import React, { useEffect, useState } from "react";
// import OutsideClick from "../OutsideClick";
// import Image from "next/image";
// import { useSelector } from "react-redux";
// import Trash from "@/components/icons/Trash";
// import { useDeleteFromCartMutation } from "@/services/cart/cartApi";
// import { toast } from "react-hot-toast";
// import Inform from "@/components/icons/Inform";
// import { useCreatePaymentMutation } from "@/services/payment/paymentApi";

// const MyCart = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { user } = useSelector((state) => state.auth);
//   const [removeFromCart, { isLoading, data, error }] =
//     useDeleteFromCartMutation();

//   useEffect(() => {
//     if (isLoading) {
//       toast.loading("Removing item from cart...", { id: "removeFromCart" });
//     }

//     if (data) {
//       toast.success(data?.description, { id: "removeFromCart" });
//     }

//     if (error?.data) {
//       toast.error(error?.data?.description, { id: "removeFromCart" });
//     }
//   }, [isLoading, data, error]);

//   return (
//     <>
//       <button
//         className="p-2 rounded-secondary hover:bg-slate-100 transition-colors relative"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <Cart className="h-6 w-6" />

//         {user?.cart?.length > 0 && (
//           <span className="h-2 w-2 bg-red-500 rounded-secondary absolute top-1 right-1"></span>
//         )}
//       </button>

//       {isOpen && (
//         <OutsideClick
//           onOutsideClick={() => setIsOpen(false)}
//           className="absolute top-full right-0 w-80 h-96 overflow-y-auto bg-white border rounded p-4 flex flex-col gap-y-2.5"
//         >
//           <div className="w-full h-full flex flex-col gap-y-8">
//             {Object.keys(user).length === 0 || user?.cart?.length === 0 ? (
//               <p className="text-sm flex flex-row gap-x-1 items-center justify-center h-full w-full">
//                 <Inform /> No Products in Cart!
//               </p>
//             ) : (
//               <div className="h-full w-full flex flex-col gap-y-4">
//                 <div className="h-full overflow-y-auto scrollbar-hide">
//                   {user?.cart?.map(({ product, quantity, _id }) => (
//                     <div
//                       key={product?._id}
//                       className="flex flex-row gap-x-2 transition-all border border-transparent p-2 rounded hover:border-black group relative"
//                     >
//                       <Image
//                         src={product?.thumbnail?.url}
//                         alt={product?.thumbnail?.public_id}
//                         width={50}
//                         height={50}
//                         className="rounded h-[50px] w-[50px] object-cover"
//                       />
//                       <article className="flex flex-col gap-y-2">
//                         <div className="flex flex-col gap-y-0.5">
//                           <h2 className="text-base line-clamp-1">
//                             {product?.title}
//                           </h2>
//                           <p className="text-xs line-clamp-2">
//                             {product?.summary}
//                           </p>
//                         </div>
//                         <div className="flex flex-col gap-y-1">
//                           <p className="flex flex-row justify-between">
//                             <span className="text-xs flex flex-row gap-x-0.5 items-baseline">
//                               $
//                               <span className="text-sm text-black">
//                                 {product?.price * quantity}.00
//                               </span>
//                             </span>
//                             <span className="text-xs flex flex-row gap-x-0.5 items-baseline">
//                               QTY
//                               <span className="text-sm text-black">
//                                 {quantity}
//                               </span>
//                             </span>
//                           </p>
//                           <div className="flex flex-row gap-x-1">
//                             <span className="whitespace-nowrap text-[10px] bg-purple-300/50 text-purple-500 border border-purple-500 px-1.5 rounded">
//                               {product?.store?.title}
//                             </span>
//                             <span className="whitespace-nowrap text-[10px] bg-indigo-300/50 text-indigo-500 border border-indigo-500 px-1.5 rounded">
//                               {product?.brand?.title}
//                             </span>
//                             <span className="whitespace-nowrap text-[10px] bg-blue-300/50 text-blue-500 border border-blue-500 px-1.5 rounded">
//                               {product?.category?.title}
//                             </span>
//                           </div>
//                         </div>
//                       </article>

//                       <button
//                         type="button"
//                         className="opacity-0 transition-opacity group-hover:opacity-100 absolute top-2 right-2 border p-1 rounded-secondary bg-red-100 text-red-900 border-red-900"
//                         onClick={() => removeFromCart(_id)}
//                       >
//                         <Trash />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <Purchase cart={user?.cart} />
//               </div>
//             )}
//           </div>
//         </OutsideClick>
//       )}
//     </>
//   );
// };

// function Purchase({ cart }) {
//   const [createPayment, { isLoading, data, error }] =
//     useCreatePaymentMutation();

//   useEffect(() => {
//     if (isLoading) {
//       toast.loading("Creating payment...", { id: "createPayment" });
//     }

//     if (data) {
//       toast.success(data?.description, { id: "createPayment" });
//       window.open(data?.url, "_blank");
//     }

//     if (error?.data) {
//       toast.error(error?.data?.description, { id: "createPayment" });
//     }
//   }, [isLoading, data, error]);

//   const result = cart.map(
//     ({
//       product: { title, thumbnail, price, summary, _id: pid },
//       quantity,
//       _id: cid,
//     }) => ({
//       name: title,
//       quantity,
//       price,
//       thumbnail: thumbnail?.url,
//       description: summary,
//       pid,
//       cid,
//     })
//   );

//   return (
//     <>
//       <button
//         type="button"
//         className="px-8 py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow flex flex-row gap-x-2 items-center justify-center"
//         onClick={() => createPayment(result)}
//       >
//         Purchase
//       </button>
//     </>
//   );
// }

// export default MyCart;

"use client";
import { useState, useCallback, useRef, useEffect, memo, useMemo } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";

const Cart = dynamic(() => import("@/components/icons/Cart"), {
  ssr: false,
  loading: () => <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />,
});
const Trash = dynamic(() => import("@/components/icons/Trash"), { ssr: false });
const Inform = dynamic(() => import("@/components/icons/Inform"), {
  ssr: false,
});
const OutsideClick = dynamic(() => import("../OutsideClick"), { ssr: false });

// Import API hooks
import { useDeleteFromCartMutation } from "@/services/cart/cartApi";
import { useCreatePaymentMutation } from "@/services/payment/paymentApi";

// Fixed image preloading to avoid the constructor error
const imageCache = new Map();
const preloadImage = (url) => {
  // Skip if URL is invalid, is a placeholder, or already cached
  if (!url || url.includes("placeholder") || imageCache.has(url)) return;

  // Use browser's Image constructor safely with window check
  if (typeof window !== "undefined") {
    const img = new window.Image(); // Use window.Image instead of Image
    img.src = url;
    imageCache.set(url, true);
  }
};

// Optimized CartItem component with instant rendering
const CartItem = memo(({ item, onRemove, isRemoving, animationDelay = 0 }) => {
  const { product, quantity, _id } = item;
  const [isVisible, setIsVisible] = useState(false);

  // Memoize calculated values
  const totalPrice = useMemo(
    () => product?.price * quantity,
    [product?.price, quantity]
  );

  // Animate in on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [animationDelay]);

  // Preload image when component mounts - safely
  useEffect(() => {
    if (product?.thumbnail?.url) {
      preloadImage(product.thumbnail.url);
    }
  }, [product?.thumbnail?.url]);

  return (
    <div
      className={`flex flex-row gap-x-2 transition-all relative ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "200ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="relative h-[50px] w-[50px] flex-shrink-0 overflow-hidden rounded">
        <Image
          src={product?.thumbnail?.url || "/placeholder.svg?height=50&width=50"}
          alt={product?.title || "Product image"}
          width={50}
          height={50}
          className="rounded h-full w-full object-cover transition-transform group-hover:scale-110"
          loading="eager"
          priority={true}
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=50&width=50";
          }}
        />
      </div>

      <article className="flex flex-col gap-y-1.5 flex-1 min-w-0">
        <div className="flex flex-col gap-y-0.5">
          <h2 className="text-sm font-medium text-gray-900 line-clamp-1">
            {product?.title}
          </h2>
          <p className="text-xs text-gray-500 line-clamp-2">
            {product?.summary}
          </p>
        </div>

        <div className="flex flex-col gap-y-1">
          <p className="flex flex-row justify-between items-center">
            <span className="text-xs flex flex-row gap-x-0.5 items-baseline text-gray-500">
              $
              <span className="text-sm font-medium text-gray-900">
                {totalPrice}.00
              </span>
            </span>
            <span className="text-xs flex flex-row gap-x-0.5 items-baseline text-gray-500">
              QTY
              <span className="text-sm font-medium text-gray-900">
                {quantity}
              </span>
            </span>
          </p>

          <div className="flex flex-row gap-x-1 flex-wrap">
            {product?.store?.title && (
              <span className="whitespace-nowrap text-[10px] bg-purple-100 text-purple-700 border border-purple-300 px-1.5 py-0.5 rounded-full truncate max-w-[80px]">
                {product.store.title}
              </span>
            )}

            {product?.brand?.title && (
              <span className="whitespace-nowrap text-[10px] bg-indigo-100 text-indigo-700 border border-indigo-300 px-1.5 py-0.5 rounded-full truncate max-w-[80px]">
                {product.brand.title}
              </span>
            )}

            {product?.category?.title && (
              <span className="whitespace-nowrap text-[10px] bg-blue-100 text-blue-700 border border-blue-300 px-1.5 py-0.5 rounded-full truncate max-w-[80px]">
                {product.category.title}
              </span>
            )}
          </div>
        </div>
      </article>

      <button
        type="button"
        className="opacity-0 transition-opacity group-hover:opacity-100 absolute top-2 right-2 border p-1 rounded-full bg-red-100 text-red-700 border-red-300 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
        onClick={() => onRemove(_id)}
        disabled={isRemoving}
        aria-label="Remove item"
      >
        <Trash className="h-3 w-3" />
      </button>
    </div>
  );
});
CartItem.displayName = "CartItem";

// Main Cart component with optimistic updates
const MyCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [optimisticCart, setOptimisticCart] = useState(null);
  const [removingItems, setRemovingItems] = useState(new Set());
  const dropdownRef = useRef(null);
  const cartButtonRef = useRef(null);
  const timeoutRef = useRef(null);
  const dispatch = useDispatch();

  // Optimized selector with equality function
  const { user } = useSelector(
    (state) => state.auth,
    (prev, next) =>
      prev?.cart?.length === next?.cart?.length &&
      JSON.stringify(prev?.cart?.map((i) => i._id)) ===
        JSON.stringify(next?.cart?.map((i) => i._id))
  );

  // Cart mutation with optimized handling
  const [
    removeFromCart,
    { isLoading: isRemoving, data: removeData, error: removeError },
  ] = useDeleteFromCartMutation();

  // Use optimistic cart if available, otherwise use user cart
  const displayCart = useMemo(() => {
    return optimisticCart || user?.cart || [];
  }, [optimisticCart, user?.cart]);

  // Memoize cart items count
  const cartItemsCount = useMemo(
    () => displayCart?.length || 0,
    [displayCart?.length]
  );

  // Preload all product images in cart - safely
  useEffect(() => {
    if (typeof window === "undefined") return; // Skip on server

    if (user?.cart?.length) {
      user.cart.forEach((item) => {
        if (item.product?.thumbnail?.url) {
          preloadImage(item.product.thumbnail.url);
        }
      });
    }
  }, [user?.cart]);

  // Toggle dropdown with animation
  const toggleDropdown = useCallback(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
        setIsAnimating(false);
        timeoutRef.current = null;
      }, 200);
    } else {
      setIsOpen(true);
      // Reset optimistic cart when opening
      setOptimisticCart(null);
    }
  }, [isOpen]);

  // Handle outside click
  const handleOutsideClick = useCallback(() => {
    if (isOpen) toggleDropdown();
  }, [isOpen, toggleDropdown]);

  // Handle item removal with optimistic update
  const handleRemoveItem = useCallback(
    (itemId) => {
      // Add to removing set
      setRemovingItems((prev) => new Set(prev).add(itemId));

      // Optimistic update - remove from local state immediately
      setOptimisticCart((prev) => {
        const currentCart = prev || user?.cart || [];
        return currentCart.filter((item) => item._id !== itemId);
      });

      // Call API to actually remove
      removeFromCart(itemId).finally(() => {
        // Remove from removing set when done
        setRemovingItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });
      });
    },
    [removeFromCart, user?.cart]
  );

  // Handle toast notifications for cart removal
  useEffect(() => {
    let toastId;

    if (isRemoving) {
      toastId = toast.loading("Removing item from cart...", {
        id: "removeFromCart",
      });
    }

    if (removeData) {
      toast.success(removeData?.description, { id: "removeFromCart" });
      // Reset optimistic cart after successful removal
      setOptimisticCart(null);
    }

    if (removeError?.data) {
      toast.error(removeError?.data?.description, { id: "removeFromCart" });
      // Reset optimistic cart on error to show original state
      setOptimisticCart(null);
    }

    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [isRemoving, removeData, removeError]);

  // Close dropdown on escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        toggleDropdown();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      // Clear any pending timeouts on unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, toggleDropdown]);

  // Preload cart icon for instant display - safely
  useEffect(() => {
    if (typeof window === "undefined") return; // Skip on server

    const preloadCartIcon = async () => {
      try {
        await import("@/components/icons/Cart");
      } catch (error) {
        console.error("Failed to preload cart icon:", error);
      }
    };

    preloadCartIcon();
  }, []);

  // Function to handle adding to cart with optimistic updates
  const handleAddToCart = useCallback(
    (product, quantity = 1) => {
      // Create a temporary ID for the new item
      const tempId = `temp_${Date.now()}`;

      // Create optimistic cart item
      const newItem = {
        _id: tempId,
        product,
        quantity,
        isOptimistic: true, // Flag to identify optimistic items
      };

      // Update optimistic cart immediately
      setOptimisticCart((prev) => {
        const currentCart = prev || user?.cart || [];
        return [...currentCart, newItem];
      });

      // Show toast notification
      toast.success(`Added ${product.title} to cart!`);
    },
    [user?.cart]
  );

  return (
    <div className="relative">
      <button
        ref={cartButtonRef}
        className="p-1 mt-[10px] rounded-full transition-all duration-200 relative"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Shopping cart with ${cartItemsCount} items`}
      >
        <Cart className="h-5 w-5 text-gray-700" />

        {cartItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-medium text-white">
            {cartItemsCount > 9 ? "9+" : cartItemsCount}
          </span>
        )}
      </button>

      {isOpen && (
        <OutsideClick
          onOutsideClick={handleOutsideClick}
          className={`absolute top-full right-0 mt-2 w-[280px] xs:w-[320px] sm:w-[350px] max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-xl shadow-lg p-3 flex flex-col z-50 transform origin-top-right transition-all duration-200 ${
            isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
          ref={dropdownRef}
        >
          <div className="w-full flex flex-col">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-900">
                Shopping Carts
              </h3>
              <span className="text-xs text-gray-500">
                {cartItemsCount} items
              </span>
            </div>

            <div className="w-full flex flex-col gap-y-2">
              {!user ||
              Object.keys(user).length === 0 ||
              !displayCart?.length ? (
                <div className="py-8 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <Inform className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-500">Your cart is empty</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Add items to your cart to see them here
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-y-2">
                  <div className="max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
                    {displayCart?.map((item, index) => (
                      <CartItem
                        key={item._id}
                        item={item}
                        onRemove={handleRemoveItem}
                        isRemoving={removingItems.has(item._id)}
                        animationDelay={item.isOptimistic ? 0 : index * 50} // No delay for optimistic items
                      />
                    ))}
                  </div>

                  <Purchase cart={displayCart} />
                </div>
              )}
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 text-center">
              Press ESC to close
            </p>
          </div>
        </OutsideClick>
      )}

      {/* Optimized CSS with hardware acceleration */}
      <style jsx global>{`
        /* Instant appear animation for new cart items */
        @keyframes instantAppear {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .instant-appear {
          animation: instantAppear 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

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

        /* Hardware acceleration for animations */
        .transform {
          will-change: transform, opacity;
        }

        /* Optimize transitions */
        @media (prefers-reduced-motion: reduce) {
          .transition-all {
            transition-duration: 0.05s !important;
          }

          .animate-fadeIn {
            animation: none !important;
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        }

        @media (max-width: 360px) {
          .max-w-\\[calc\$$100vw-2rem\$$] {
            max-width: calc(100vw - 1rem);
          }
        }
      `}</style>
    </div>
  );
};

// Purchase component implementation
const Purchase = memo(({ cart }) => {
  const [createPayment, { isLoading, data, error }] =
    useCreatePaymentMutation();
  const buttonRef = useRef(null);

  // Memoize cart data transformation
  const cartItems = useMemo(() => {
    if (!cart || !cart.length) return [];

    return cart.map(
      ({
        product: { title, thumbnail, price, summary, _id: pid },
        quantity,
        _id: cid,
      }) => ({
        name: title,
        quantity,
        price,
        thumbnail: thumbnail?.url,
        description: summary,
        pid,
        cid,
      })
    );
  }, [cart]);

  // Calculate total price
  const totalAmount = useMemo(() => {
    if (!cart || !cart.length) return 0;
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  // Handle payment creation
  const handlePurchase = useCallback(() => {
    if (cartItems.length > 0) {
      createPayment(cartItems);
    }
  }, [cartItems, createPayment]);

  // Handle toast notifications
  useEffect(() => {
    let toastId;

    if (isLoading) {
      toastId = toast.loading("Creating payment...", { id: "createPayment" });
    }

    if (data) {
      toast.success(data?.description, { id: "createPayment" });
      // Open in new tab with proper security
      if (typeof window !== "undefined") {
        const newWindow = window.open();
        if (newWindow) {
          newWindow.opener = null;
          newWindow.location.href = data?.url;
        }
      }
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "createPayment" });
    }

    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [isLoading, data, error]);

  return (
    <div className="border-t border-gray-200 pt-3 mt-1">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-500">Total:</span>
        <span className="text-lg font-medium">${totalAmount}.00</span>
      </div>
      <button
        ref={buttonRef}
        type="button"
        className="w-full px-4 py-2.5 border border-purple-600 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors drop-shadow flex flex-row gap-x-2 items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        onClick={handlePurchase}
        disabled={isLoading || cartItems.length === 0}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          <>Checkout (${totalAmount}.00)</>
        )}
      </button>
    </div>
  );
});
Purchase.displayName = "Purchase";

// Export memoized component to prevent unnecessary re-renders
export default memo(MyCart);
