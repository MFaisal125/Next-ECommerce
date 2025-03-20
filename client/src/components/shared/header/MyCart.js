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

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Cart from "@/components/icons/Cart";
import Trash from "@/components/icons/Trash";
import Inform from "@/components/icons/Inform";
import OutsideClick from "../OutsideClick";
import { useDeleteFromCartMutation } from "@/services/cart/cartApi";
import { useCreatePaymentMutation } from "@/services/payment/paymentApi";

const MyCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [removeFromCart, { isLoading, data, error }] =
    useDeleteFromCartMutation();
  const dropdownRef = useRef(null);

  // Handle toast notifications for cart removal
  useEffect(() => {
    if (isLoading) {
      toast.loading("Removing item from cart...", { id: "removeFromCart" });
    }

    if (data) {
      toast.success(data?.description, { id: "removeFromCart" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "removeFromCart" });
    }
  }, [isLoading, data, error]);

  // Close dropdown on ESC key press
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  // Handle outside click
  const handleOutsideClick = () => {
    if (isOpen) setIsOpen(false);
  };

  // Calculate dropdown position based on screen size
  const getDropdownPosition = () => {
    // On mobile, position from right edge of screen
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      return { right: "10px" };
    }
    // Default position
    return {};
  };

  return (
    <div className="relative">
      <button
        className="p-1 rounded-full mt-[7px] hover:bg-slate-100 transition-all duration-200 relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Shopping cart with ${user?.cart?.length || 0} items`}
      >
        <Cart className="h-6 w-6 text-gray-700" />

        {user?.cart?.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
            {user.cart.length > 9 ? "9+" : user.cart.length}
          </span>
        )}
      </button>

      {isOpen && (
        <OutsideClick
          onOutsideClick={handleOutsideClick}
          className="absolute top-full right-0 mt-2 w-[280px] xs:w-[320px] sm:w-[350px] max-w-[calc(100vw-20px)] max-h-[80vh] bg-white border border-gray-200 rounded-xl shadow-lg z-50 flex flex-col"
          ref={dropdownRef}
          style={getDropdownPosition()}
        >
          <div className="flex items-center justify-between p-3 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-900">Shopping Cart</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {user?.cart?.length || 0} items
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
                aria-label="Close cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <div className="w-full flex-1 overflow-hidden flex flex-col">
            {Object.keys(user || {}).length === 0 || !user?.cart?.length ? (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <Inform className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-sm text-gray-700">Your cart is empty</p>
                <p className="text-xs text-gray-400 mt-1 max-w-[200px]">
                  Add items to your cart to see them here
                </p>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="max-h-[300px] overflow-y-auto p-3 custom-scrollbar">
                  {user?.cart?.map(({ product, quantity, _id }) => (
                    <div
                      key={product?._id}
                      className="flex flex-row gap-x-2 transition-all border border-transparent p-2 rounded-lg hover:bg-gray-50 group relative mb-2"
                    >
                      <div className="relative h-[50px] w-[50px] flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={
                            product?.thumbnail?.url ||
                            "/placeholder.svg?height=50&width=50" ||
                            "/placeholder.svg"
                          }
                          alt={product?.thumbnail?.public_id || "Product image"}
                          width={50}
                          height={50}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src =
                              "/placeholder.svg?height=50&width=50";
                          }}
                        />
                      </div>

                      <article className="flex flex-col gap-y-1 flex-1 min-w-0">
                        <div className="flex flex-col">
                          <h2 className="text-xs font-medium text-gray-900 line-clamp-1">
                            {product?.title}
                          </h2>
                          <p className="text-[10px] text-gray-500 line-clamp-1 xs:line-clamp-2">
                            {product?.summary}
                          </p>
                        </div>

                        <div className="flex flex-col gap-y-1">
                          <p className="flex flex-row justify-between items-center">
                            <span className="text-[10px] flex flex-row gap-x-0.5 items-baseline text-gray-500">
                              $
                              <span className="text-xs font-medium text-gray-900">
                                {product?.price * quantity}.00
                              </span>
                            </span>
                            <span className="text-[10px] flex flex-row gap-x-0.5 items-baseline text-gray-500">
                              QTY
                              <span className="text-xs font-medium text-gray-900">
                                {quantity}
                              </span>
                            </span>
                          </p>

                          <div className="flex flex-row gap-x-1 flex-wrap">
                            {product?.store?.title && (
                              <span className="whitespace-nowrap text-[8px] xs:text-[10px] bg-purple-100 text-purple-700 border border-purple-300 px-1 py-0.5 rounded-full truncate max-w-[60px] xs:max-w-[80px]">
                                {product.store.title}
                              </span>
                            )}

                            {product?.brand?.title && (
                              <span className="whitespace-nowrap text-[8px] xs:text-[10px] bg-indigo-100 text-indigo-700 border border-indigo-300 px-1 py-0.5 rounded-full truncate max-w-[60px] xs:max-w-[80px]">
                                {product.brand.title}
                              </span>
                            )}

                            {product?.category?.title && (
                              <span className="whitespace-nowrap text-[8px] xs:text-[10px] bg-blue-100 text-blue-700 border border-blue-300 px-1 py-0.5 rounded-full truncate max-w-[60px] xs:max-w-[80px]">
                                {product.category.title}
                              </span>
                            )}
                          </div>
                        </div>
                      </article>

                      <button
                        type="button"
                        className="opacity-0 transition-opacity group-hover:opacity-100 absolute top-2 right-2 border p-1 rounded-full bg-red-100 text-red-700 border-red-300 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        onClick={() => removeFromCart(_id)}
                        aria-label="Remove item"
                      >
                        <Trash className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 p-3 bg-gray-50 rounded-b-xl">
                  <Purchase cart={user?.cart} />
                </div>
              </div>
            )}
          </div>

          <div className="mt-auto p-1.5 border-t border-gray-100 text-center">
            <p className="text-[8px] text-gray-400">Press ESC to close</p>
          </div>
        </OutsideClick>
      )}

      {/* Custom scrollbar styles */}
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

        /* Extra small screens */
        @media (max-width: 475px) {
          .xs\\:line-clamp-2 {
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .xs\\:text-\\[10px\\] {
            font-size: 10px;
          }

          .xs\\:max-w-\\[80px\\] {
            max-width: 80px;
          }

          .xs\\:w-\\[320px\\] {
            width: 320px;
          }
        }
      `}</style>
    </div>
  );
};

function Purchase({ cart }) {
  const [createPayment, { isLoading, data, error }] =
    useCreatePaymentMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Creating payment...", { id: "createPayment" });
    }

    if (data) {
      toast.success(data?.description, { id: "createPayment" });
      window.open(data?.url, "_blank");
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "createPayment" });
    }
  }, [isLoading, data, error]);

  const result = cart.map(
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

  // Calculate total price
  const totalAmount = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-600">Total:</span>
        <span className="text-sm font-semibold">${totalAmount}.00</span>
      </div>
      <button
        type="button"
        className="w-full px-3 py-2 border border-black rounded-lg bg-black hover:bg-black/90 text-white transition-colors drop-shadow flex flex-row gap-x-2 items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-xs"
        onClick={() => createPayment(result)}
        disabled={isLoading || cart.length === 0}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-3 w-3 text-white"
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
          <>Checkout Now</>
        )}
      </button>
    </div>
  );
}

export default MyCart;
