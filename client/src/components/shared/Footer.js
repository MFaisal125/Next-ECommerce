// "use client";

// import React from "react";
// import Container from "./Container";
// import { IoAccessibilityOutline } from "react-icons/io5";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";

// const Footer = () => {
//   const router = useRouter();
//   const year = new Date().getFullYear();

//   const sitemaps = [
//     {
//       name: "Features",
//       paths: [
//         {
//           name: "Cool stuff",
//           path: "/",
//         },
//         {
//           name: "Random feature",
//           path: "/",
//         },
//         {
//           name: "Team feature",
//           path: "/",
//         },
//         {
//           name: "Stuff for developers",
//           path: "/",
//         },
//         {
//           name: "Another one",
//           path: "/",
//         },
//         {
//           name: "Last time",
//           path: "/",
//         },
//       ],
//     },
//     {
//       name: "Resources",
//       paths: [
//         {
//           name: "Resource",
//           path: "/",
//         },
//         {
//           name: "Resource name",
//           path: "/",
//         },
//         {
//           name: "Another resource",
//           path: "/",
//         },
//         {
//           name: "Final resource",
//           path: "/",
//         },
//       ],
//     },
//     {
//       name: "About",
//       paths: [
//         {
//           name: "Team",
//           path: "/",
//         },
//         {
//           name: "Locations",
//           path: "/",
//         },
//         {
//           name: "Privacy",
//           path: "/",
//         },
//         {
//           name: "Terms",
//           path: "/",
//         },
//       ],
//     },
//     {
//       name: "Contact",
//       paths: [
//         {
//           name: "Help",
//           path: "/",
//         },
//         {
//           name: "Sales",
//           path: "/",
//         },
//         {
//           name: "Advertise",
//           path: "/",
//         },
//       ],
//     },
//     {
//       name: "Legal",
//       paths: [
//         {
//           name: "Claim",
//           path: "/",
//         },
//         {
//           name: "Terms of Services",
//           path: "/",
//         },
//         {
//           name: "Privacy & Policy",
//           path: "/",
//         },
//       ],
//     },
//     {},
//     {
//       name: "Stay Connected",
//       paths: [
//         {
//           name: "Facebook",
//           path: "https://www.facebook.com/devhasibulislam/",
//         },
//         {
//           name: "LinkedIn",
//           path: "https://www.linkedin.com/in/devhasibulislam/",
//         },
//         {
//           name: "GitHub",
//           path: "https://github.com/devhasibulislam/",
//         },
//       ],
//     },
//   ];

//   return (
//     <footer className="footer-1 bg-gray-100 py-8 sm:py-12 m-6 p-6 rounded-xl">
//       <div className="container mx-auto px-4 flex flex-col gap-y-10">
//         <div className="flex md:flex-row md:flex-wrap md:justify-between flex-col gap-x-4 gap-y-8">
//           {sitemaps?.map((sitemap, index) => (
//             <div key={index} className="flex flex-col gap-y-3">
//               <h2 className="text-2xl">{sitemap.name}</h2>
//               <div className="flex flex-col gap-y-1.5">
//                 {sitemap?.paths?.map((path, index) => (
//                   <Link key={index} href={path?.path} className="text-base">
//                     {path?.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//         <hr />
//         <p className="text-center">&copy; {year} Canim. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

"use client";

import { useState, useEffect, memo, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  IoAccessibilityOutline,
  IoChevronDown,
  IoChevronUp,
  IoLogoFacebook,
  IoLogoLinkedin,
  IoLogoGithub,
  IoRocketSharp,
  IoGlobeOutline,
  IoFlashSharp,
  IoLeafOutline,
  IoShieldOutline,
  IoHeartOutline,
  IoPlanetOutline,
  IoSparklesOutline,
  IoScanOutline,
  IoLayersOutline,
} from "react-icons/io5";

// Ultra-optimized footer section component
const FooterSection = memo(
  ({ sitemap, index, activeDropdown, toggleDropdown, isMobile }) => {
    if (!sitemap.name) return null;

    // Determine color based on index - memoized for performance
    const colors = useMemo(
      () => ["blue", "purple", "cyan", "indigo", "violet", "blue", "teal"],
      []
    );
    const color = useMemo(() => {
      return colors[index % colors.length];
    }, [index, colors]);

    return (
      <div
        className={`
          flex flex-col relative overflow-hidden
          ${
            isMobile
              ? "bg-white rounded-lg shadow-sm border border-gray-100"
              : ""
          }
        `}
        style={{
          animation: isMobile ? `fadeIn 0.3s ${index * 0.05}s both` : "none",
        }}
      >
        {/* Desktop section header */}
        <div className="hidden md:flex items-center gap-1.5 mb-2">
          <span className={`text-${color}-500`}>
            {sitemap.icon || <IoAccessibilityOutline />}
          </span>
          <h2 className="text-xs font-medium text-gray-800">{sitemap.name}</h2>
        </div>

        {/* Mobile section header with dropdown */}
        <button
          className={`
            md:hidden flex items-center justify-between w-full py-2 px-3
            bg-white active:bg-gray-50 transition-colors
            ${activeDropdown === index ? `border-b border-${color}-100` : ""}
          `}
          onClick={() => toggleDropdown(index)}
        >
          <div className="flex items-center gap-2">
            <span className={`text-${color}-500`}>
              {sitemap.icon || <IoAccessibilityOutline />}
            </span>
            <h2 className="text-xs font-medium text-gray-800">
              {sitemap.name}
            </h2>
          </div>
          <div
            className={`w-5 h-5 flex items-center justify-center rounded-full bg-${color}-50`}
          >
            {activeDropdown === index ? (
              <IoChevronUp className={`text-${color}-500 text-xs`} />
            ) : (
              <IoChevronDown className={`text-${color}-500 text-xs`} />
            )}
          </div>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex flex-col space-y-1.5 mt-1">
          {sitemap?.paths?.slice(0, 4).map((path, pathIndex) => (
            <Link
              key={pathIndex}
              href={path?.path}
              className={`text-xs text-gray-600 hover:text-${color}-600 transition-colors`}
            >
              <div className="flex items-center gap-1.5">
                {path.icon && (
                  <span className={`text-${color}-500 text-xs`}>
                    {path.icon}
                  </span>
                )}
                <span>{path?.name}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile links with dropdown - optimized with height transition */}
        <div
          className="md:hidden overflow-hidden transition-all duration-200 ease-in-out"
          style={{
            maxHeight:
              activeDropdown === index
                ? `${sitemap?.paths?.length * 32 + 16}px`
                : "0px",
          }}
        >
          <div className="flex flex-col py-1 px-3 bg-gray-50">
            {sitemap?.paths?.slice(0, 4).map((path, pathIndex) => (
              <Link
                key={pathIndex}
                href={path?.path}
                className={`
                  text-xs text-gray-600 hover:text-${color}-600
                  transition-colors flex items-center gap-2
                  py-1.5 px-2 my-0.5 rounded-md hover:bg-white
                `}
              >
                <div
                  className={`w-4 h-4 flex items-center justify-center rounded-full bg-${color}-50`}
                >
                  {path.icon ? (
                    <span className={`text-${color}-500 text-[10px]`}>
                      {path.icon}
                    </span>
                  ) : (
                    <IoScanOutline
                      className={`text-${color}-500 text-[10px]`}
                    />
                  )}
                </div>
                <span>{path?.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for maximum performance
    return (
      prevProps.index === nextProps.index &&
      prevProps.activeDropdown === nextProps.activeDropdown &&
      prevProps.isMobile === nextProps.isMobile &&
      prevProps.sitemap.name === nextProps.sitemap.name
    );
  }
);
FooterSection.displayName = "FooterSection";

// Optimized Footer Component
const Footer = () => {
  const router = useRouter();
  const year = new Date().getFullYear();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Memoized sitemap data to prevent recreation on each render
  const sitemaps = useMemo(
    () => [
      {
        name: "Smart Features",
        icon: <IoFlashSharp />,
        paths: [
          {
            name: "AI Interfaces",
            path: "/",
            icon: <IoScanOutline />,
          },
          {
            name: "3D Displays",
            path: "/",
            icon: <IoLayersOutline />,
          },
          {
            name: "Cloud Computing",
            path: "/",
            icon: <IoSparklesOutline />,
          },
          {
            name: "Voice Control",
            path: "/",
            icon: <IoSparklesOutline />,
          },
        ],
      },
      {
        name: "Resources",
        icon: <IoLeafOutline />,
        paths: [
          {
            name: "Knowledge Base",
            path: "/",
            icon: <IoGlobeOutline />,
          },
          {
            name: "User Guides",
            path: "/",
            icon: <IoLayersOutline />,
          },
          {
            name: "Digital Archives",
            path: "/",
            icon: <IoLayersOutline />,
          },
          {
            name: "Learning Center",
            path: "/",
            icon: <IoSparklesOutline />,
          },
        ],
      },
      {
        name: "About Us",
        icon: <IoHeartOutline />,
        paths: [
          {
            name: "Our Team",
            path: "/",
            icon: <IoAccessibilityOutline />,
          },
          {
            name: "Global Locations",
            path: "/",
            icon: <IoPlanetOutline />,
          },
          {
            name: "Privacy Policy",
            path: "/",
            icon: <IoShieldOutline />,
          },
          {
            name: "Terms of Service",
            path: "/",
            icon: <IoScanOutline />,
          },
        ],
      },
      {
        name: "Contact",
        icon: <IoGlobeOutline />,
        paths: [
          {
            name: "Customer Support",
            path: "/",
            icon: <IoHeartOutline />,
          },
          {
            name: "Business Inquiries",
            path: "/",
            icon: <IoRocketSharp />,
          },
          {
            name: "Partnerships",
            path: "/",
            icon: <IoPlanetOutline />,
          },
        ],
      },
      {
        name: "Legal",
        icon: <IoShieldOutline />,
        paths: [
          {
            name: "Terms & Conditions",
            path: "/",
            icon: <IoSparklesOutline />,
          },
          {
            name: "Privacy Policy",
            path: "/",
            icon: <IoShieldOutline />,
          },
          {
            name: "Cookie Policy",
            path: "/",
            icon: <IoLayersOutline />,
          },
        ],
      },
      {},
      {
        name: "Connect With Us",
        icon: <IoRocketSharp />,
        paths: [
          {
            name: "Facebook",
            path: "https://www.linkedin.com/in/m-faisal125/",
            icon: <IoLogoFacebook />,
          },
          {
            name: "LinkedIn",
            path: "https://www.linkedin.com/in/m-faisal125/",
            icon: <IoLogoLinkedin />,
          },
          {
            name: "GitHub",
            path: "https://github.com/MFaisal125/",
            icon: <IoLogoGithub />,
          },
        ],
      },
    ],
    []
  );

  // Optimized mobile detection with debounce
  useEffect(() => {
    let timeoutId;

    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  // Toggle dropdown for mobile - optimized to close others
  const toggleDropdown = useCallback(
    (index) => {
      setActiveDropdown(activeDropdown === index ? null : index);
    },
    [activeDropdown]
  );

  return (
    <footer
      className={`
      relative w-full border-t border-gray-100
      ${
        isMobile
          ? "bg-gray-50 py-4"
          : "bg-gradient-to-b from-white to-blue-50 py-5 sm:py-6"
      }
    `}
    >
      <div className="w-full max-w-screen-xl mx-auto px-3 flex flex-col gap-y-4">
        {/* Logo section */}
        <div className="flex justify-center mb-2">
          <div
            className={`
            ${isMobile ? "bg-white p-2 rounded-full shadow-sm" : ""}
          `}
          >
            <IoRocketSharp className="text-lg text-blue-500" />
          </div>
        </div>

        {/* Main footer content - optimized grid for mobile */}
        <div
          className={`
          grid gap-2
          ${
            isMobile
              ? "grid-cols-1"
              : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6 md:gap-2"
          }
        `}
        >
          {sitemaps?.map((sitemap, index) => (
            <FooterSection
              key={index}
              sitemap={sitemap}
              index={index}
              activeDropdown={activeDropdown}
              toggleDropdown={toggleDropdown}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100 my-3" />

        {/* Copyright section */}
        <div className="text-center text-xs text-gray-500">
          &copy; {year} E-Commerce • All rights reserved
        </div>
      </div>

      {/* Minimal animations for mobile - only what's necessary */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </footer>
  );
};

export default memo(Footer);
