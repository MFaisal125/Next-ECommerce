// import Signup from "@/components/icons/Signup";
// import Link from "next/link";
// import React, { useState } from "react";
// import OutsideClick from "../OutsideClick";
// import User from "@/components/icons/User";
// import Signin from "@/components/icons/Signin";
// import ForgotPassword from "@/components/icons/ForgotPassword";
// import Logout from "@/components/icons/Logout";
// import { useSelector } from "react-redux";
// import Image from "next/image";

// const Auth = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { user } = useSelector((state) => state.auth);

//   return (
//     <>
//       <button
//         className="p-2 rounded-secondary hover:bg-slate-100 transition-colors"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <User className="h-6 w-6" />
//       </button>
//       {isOpen && (
//         <OutsideClick
//           onOutsideClick={() => setIsOpen(false)}
//           className="absolute top-full right-0 w-80 h-fit bg-white border rounded p-2 flex flex-col gap-y-2.5"
//         >
//           {Object.keys(user).length === 0 ? (
//             <>
//               <Link
//                 href="/auth/signup"
//                 className="w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded"
//               >
//                 <span className="bg-sky-500/5 p-1 rounded">
//                   <Signup />
//                 </span>
//                 <article className="whitespace-normal">
//                   <h2 className="text-sm">Sign Up</h2>
//                   <p className="text-xs">Register as a new user</p>
//                 </article>
//               </Link>
//               <Link
//                 href="/auth/signin"
//                 className="w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded"
//               >
//                 <span className="bg-sky-500/5 p-1 rounded">
//                   <Signin />
//                 </span>
//                 <article className="whitespace-normal">
//                   <h2 className="text-sm">Sign In</h2>
//                   <p className="text-xs">Login as an existing user</p>
//                 </article>
//               </Link>
//               <Link
//                 href="/auth/forgot-password"
//                 className="w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded"
//               >
//                 <span className="bg-sky-500/5 p-1 rounded">
//                   <ForgotPassword />
//                 </span>
//                 <article className="whitespace-normal">
//                   <h2 className="text-sm">Forgot Password</h2>
//                   <p className="text-xs">Reset your account credentials</p>
//                 </article>
//               </Link>
//             </>
//           ) : (
//             <div className="flex flex-col gap-y-2">
//               <div className="flex flex-row gap-x-2 p-4">
//                 <Image
//                   src={user?.avatar?.url}
//                   alt={user?.avatar?.public_id}
//                   height={50}
//                   width={50}
//                   className="rounded object-cover h-[50px] w-[50px]"
//                 />
//                 <article className="flex flex-col">
//                   <h2 className="line-clamp-1">{user?.name}</h2>
//                   <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
//                     {user?.email}
//                   </p>
//                   <p className="flex flex-row gap-x-2 mt-1.5">
//                     <span className="px-2 border border-purple-900 text-purple-900 bg-purple-50 rounded-primary text-xs w-fit">
//                       {user?.role}
//                     </span>
//                     {user?.status === "inactive" && (
//                       <span className="bg-red-50 border border-red-900 px-2 rounded-secondary text-red-900 text-xs lowercase w-fit">
//                         in review
//                       </span>
//                     )}
//                   </p>
//                 </article>
//               </div>
//               <hr />
//               <div className="w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded cursor-pointer">
//                 <span className="bg-sky-500/5 p-1 rounded">
//                   <Logout />
//                 </span>
//                 <article
//                   className="whitespace-nowrap"
//                   onClick={() => {
//                     localStorage.removeItem("accessToken");
//                     window.location.reload();
//                   }}
//                 >
//                   <h2 className="text-sm">Logout</h2>
//                   <p className="text-xs">Clear your current activities</p>
//                 </article>
//               </div>
//             </div>
//           )}
//         </OutsideClick>
//       )}
//     </>
//   );
// };

// export default Auth;

"use client";

import Signup from "@/components/icons/Signup";
import Link from "next/link";
import React, { useState, useCallback, useRef, useEffect } from "react";
import OutsideClick from "../OutsideClick";
import User from "@/components/icons/User";
import Signin from "@/components/icons/Signin";
import ForgotPassword from "@/components/icons/ForgotPassword";
import Logout from "@/components/icons/Logout";
import { useSelector } from "react-redux";
import Image from "next/image";

const AuthOption = ({ href, icon: Icon, title, description, onClick }) => (
  <Link
    href={href || "#"}
    className="w-full flex flex-row items-start gap-x-2 p-2.5 border border-transparent hover:border-purple-500 hover:bg-purple-50/30 rounded-lg transition-all duration-200"
    onClick={onClick}
  >
    <span className="bg-purple-100 p-1.5 rounded-md flex items-center justify-center">
      <Icon />
    </span>
    <article className="whitespace-normal">
      <h2 className="text-sm font-medium text-gray-800">{title}</h2>
      <p className="text-xs text-gray-500">{description}</p>
    </article>
  </Link>
);

const Auth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = Object.keys(user || {}).length > 0;

  const toggleDropdown = useCallback(() => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimating(false);
      }, 200);
    } else {
      setIsOpen(true);
    }
  }, [isOpen]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        toggleDropdown();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, toggleDropdown]);

  // Handle click outside
  const handleOutsideClick = useCallback(() => {
    if (isOpen) toggleDropdown();
  }, [isOpen, toggleDropdown]);

  return (
    <div className="relative">
      <button
        className=" mt-[13px] rounded-full transition-all duration-200"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={isOpen ? "Close user menu" : "Open user menu"}
      >
        {isLoggedIn && user?.avatar?.url ? (
          <div className="h-7 w-7 rounded-full overflow-hidden border-2 border-purple-200">
            <Image
              src={user.avatar.url || "/placeholder.svg"}
              alt="Profile"
              height={24}
              width={24}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=24&width=24";
              }}
            />
          </div>
        ) : (
          <User className="h-5 w-5 text-gray-700" />
        )}
      </button>

      {isOpen && (
        <OutsideClick
          onOutsideClick={handleOutsideClick}
          className={`absolute top-full right-0 mt-2 w-[280px] xs:w-[300px] sm:w-80 max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-xl shadow-lg p-3 flex flex-col gap-y-2.5 z-50 transform origin-top-center transition-all duration-200 ${
            isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
          ref={dropdownRef}
        >
          {!isLoggedIn ? (
            <>
              <div className="mb-1 px-2">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account
                </h3>
              </div>

              <AuthOption
                href="/auth/signup"
                icon={Signup}
                title="Sign Up"
                description="Register as a new user"
              />

              <AuthOption
                href="/auth/signin"
                icon={Signin}
                title="Sign In"
                description="Login as an existing user"
              />

              <AuthOption
                href="/auth/forgot-password"
                icon={ForgotPassword}
                title="Forgot Password"
                description="Reset your account credentials"
              />
            </>
          ) : (
            <div className="flex flex-col gap-y-3">
              <div className="flex flex-row gap-x-3 p-3 bg-purple-50/50 rounded-lg">
                <div className="relative flex-shrink-0">
                  <Image
                    src={
                      user?.avatar?.url || "/placeholder.svg?height=60&width=60"
                    }
                    alt={user?.name || "User"}
                    height={60}
                    width={60}
                    className="rounded-lg object-cover h-[60px] w-[60px] border border-purple-200"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/placeholder.svg?height=60&width=60";
                    }}
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white ${
                      user?.status === "active" ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></div>
                </div>

                <article className="flex flex-col overflow-hidden min-w-0">
                  <h2 className="font-medium text-gray-900 line-clamp-1">
                    {user?.name || "User"}
                  </h2>
                  <p className="text-sm text-gray-600 truncate max-w-full">
                    {user?.email || "user@example.com"}
                  </p>
                  <div className="flex flex-row gap-x-2 mt-1.5 flex-wrap">
                    <span className="px-2 py-0.5 border border-purple-500 text-purple-700 bg-purple-50 rounded-full text-xs capitalize">
                      {user?.role || "user"}
                    </span>
                    {user?.status === "inactive" && (
                      <span className="bg-red-50 border border-red-500 px-2 py-0.5 rounded-full text-red-700 text-xs">
                        In Review
                      </span>
                    )}
                  </div>
                </article>
              </div>

              <div className="h-px bg-gray-200 my-1"></div>

              <AuthOption
                icon={Logout}
                title="Logout"
                description="Clear your current activities"
                onClick={handleLogout}
              />
            </div>
          )}

          <div className="mt-1 pt-1 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 text-center">
              Press ESC to close
            </p>
          </div>
        </OutsideClick>
      )}

      {/* Add responsive styles */}
      <style jsx global>{`
        @media (max-width: 360px) {
          .max-w-\\[calc\$$100vw-2rem\$$] {
            max-width: calc(100vw - 1rem);
          }
        }
      `}</style>
    </div>
  );
};

export default React.memo(Auth);
