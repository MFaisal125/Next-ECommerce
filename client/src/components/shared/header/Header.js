// "use client";

// import React from "react";
// import Container from "../Container";
// import Image from "next/image";
// import Categories from "./Categories";
// import Auth from "./Auth";
// import Dashboard from "@/components/icons/Dashboard";
// import SearchFilter from "./SearchFilter";
// import MyCart from "./MyCart";
// import { useSelector } from "react-redux";

// const Header = () => {
//   const user = useSelector((state) => state?.auth?.user);

//   return (
//     <Container className="">
//       <nav className="rounded-xl py-4 md:p-4 xl:p-4 flex flex-row justify-between ">
//         <div className="flex flex-row gap-x-4 items-center relative">
//           <Image
//             src="/logo.png"
//             alt="logo"
//             width={60}
//             height={50}
//             className="h-[50px] object-contain inline-block cursor-pointer"
//             onClick={() => window.open("/", "_self")}
//           />

//           <Categories />
//         </div>
//         <div className="flex flex-row gap-x-2 relative">
//           {user && Object?.keys(user)?.length > 0 && (
//             <button
//               className="p-2 rounded-secondary hover:bg-slate-100 transition-colors"
//               onClick={() => window.open("/dashboard", "_self")}
//             >
//               <Dashboard className="h-6 w-6" />
//             </button>
//           )}
//           <SearchFilter />
//           <Auth />
//           <MyCart />
//         </div>
//       </nav>
//     </Container>
//   );
// };

// export default Header;

// "use client";

// import { useState, useEffect } from "react";
// import Container from "../Container";
// import Image from "next/image";
// import Categories from "./Categories";
// import Auth from "./Auth";
// import Dashboard from "@/components/icons/Dashboard";
// import SearchFilter from "./SearchFilter";
// import MyCart from "./MyCart";
// import { useSelector } from "react-redux";

// const Header = () => {
//   const user = useSelector((state) => state?.auth?.user);
//   const [isScrolled, setIsScrolled] = useState(false);

//   // Add scroll event listener to detect when to apply sticky effect
//   useEffect(() => {
//     const handleScroll = () => {
//       // Apply sticky effect after scrolling down 50px
//       if (window.scrollY > 50) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     // Add event listener
//     window.addEventListener("scroll", handleScroll);

//     // Clean up event listener on component unmount
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div
//       className={`sticky top-0 z-50 transition-all duration-300 ${
//         isScrolled ? "bg-white/30 backdrop-blur-md shadow-sm" : "bg-transparent"
//       }`}
//     >
//       <Container className="">
//         <nav className="rounded-xl py-4 md:p-4 xl:p-4 flex flex-row justify-between">
//           <div className="flex flex-row gap-x-4 items-center relative">
//             <Image
//               src="/logo.png"
//               alt="logo"
//               width={60}
//               height={50}
//               className="h-[50px] object-contain inline-block cursor-pointer"
//               onClick={() => window.open("/", "_self")}
//             />

//             <Categories />
//           </div>
//           <div className="flex flex-row gap-x-2 relative">
//             {user && Object?.keys(user)?.length > 0 && (
//               <button
//                 className="p-2 rounded-secondary hover:bg-slate-100 transition-colors"
//                 onClick={() => window.open("/dashboard", "_self")}
//               >
//                 <Dashboard className="h-6 w-6" />
//               </button>
//             )}
//             <SearchFilter />
//             <Auth />
//             <MyCart />
//           </div>
//         </nav>
//       </Container>
//     </div>
//   );
// };

// export default Header;

"use client";

import { useState, useEffect } from "react";
import Container from "../Container";
import Image from "next/image";
import Categories from "./Categories";
import Auth from "./Auth";
import Dashboard from "@/components/icons/Dashboard";
import SearchFilter from "./SearchFilter";
import MyCart from "./MyCart";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener to detect when to apply sticky effect
  useEffect(() => {
    const handleScroll = () => {
      // Apply sticky effect after scrolling down 50px
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-white/70 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <Container className="">
        <nav
          className={`rounded-xl flex flex-row justify-between transition-all duration-300 ${
            isScrolled ? "py-2 md:py-2" : "py-4 md:p-4 xl:p-4"
          }`}
        >
          <div className="flex flex-row gap-x-4 items-center relative">
            <Image
              src="/logo.png"
              alt="logo"
              width={60}
              height={50}
              className={`object-contain inline-block cursor-pointer transition-all duration-300 ${
                isScrolled ? "h-[40px]" : "h-[50px]"
              }`}
              onClick={() => window.open("/", "_self")}
            />

            <Categories />
          </div>
          <div className="flex flex-row gap-x-2 relative">
            {user && Object?.keys(user)?.length > 0 && (
              <button
                className="p-2 rounded-secondary hover:bg-slate-100 transition-colors"
                onClick={() => window.open("/dashboard", "_self")}
              >
                <Dashboard className="h-6 w-6" />
              </button>
            )}
            <SearchFilter />
            <Auth />
            <MyCart />
          </div>
        </nav>
      </Container>

      {/* Add CSS to ensure dropdowns appear correctly */}
      <style jsx global>{`
        /* Ensure dropdowns appear above other content but below header */
        .dropdown-content {
          z-index: 30;
        }

        /* Fix for Categories dropdown */
        [data-categories-dropdown] {
          z-index: 50;
        }
      `}</style>
    </div>
  );
};

export default Header;
