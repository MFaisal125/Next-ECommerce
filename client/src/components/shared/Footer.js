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

import { useState, useEffect, memo } from "react";
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
} from "react-icons/io5";

// Ultra-optimized footer section component
const FooterSection = memo(
  ({ sitemap, index, activeDropdown, toggleDropdown }) => {
    if (!sitemap.name) return null;

    return (
      <div className="flex flex-col">
        {/* Section header - desktop */}
        <div className="hidden md:flex items-center gap-1 mb-1.5">
          <span className="text-sm">
            {sitemap.icon || (
              <IoAccessibilityOutline className="text-blue-500" />
            )}
          </span>
          <h2 className="text-xs font-medium text-gray-800">{sitemap.name}</h2>
        </div>

        {/* Section header with dropdown - mobile */}
        <button
          className="md:hidden flex items-center justify-between w-full py-1 px-2 bg-white/80 active:bg-blue-50 transition-colors"
          onClick={() => toggleDropdown(index)}
        >
          <div className="flex items-center gap-1">
            <span className="text-xs">
              {sitemap.icon || (
                <IoAccessibilityOutline className="text-blue-500" />
              )}
            </span>
            <h2 className="text-xs font-medium text-gray-800">
              {sitemap.name}
            </h2>
          </div>
          {activeDropdown === index ? (
            <IoChevronUp className="text-blue-500 text-xs" />
          ) : (
            <IoChevronDown className="text-blue-500 text-xs" />
          )}
        </button>

        {/* Links - desktop */}
        <div className="hidden md:flex flex-col space-y-1 mt-1">
          {sitemap?.paths?.slice(0, 4).map((path, pathIndex) => (
            <Link
              key={pathIndex}
              href={path?.path}
              className="text-xs text-gray-600 hover:text-blue-600 transition-colors"
            >
              <div className="flex items-center gap-1">
                {path.icon && <span className="text-xs">{path.icon}</span>}
                <span>{path?.name}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Links with dropdown - mobile */}
        {activeDropdown === index && (
          <div className="md:hidden overflow-hidden">
            <div className="flex flex-col space-y-1 mt-1 pl-2 border-l border-blue-100">
              {sitemap?.paths?.slice(0, 4).map((path, pathIndex) => (
                <Link
                  key={pathIndex}
                  href={path?.path}
                  className="text-xs text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    {path.icon && <span className="text-xs">{path.icon}</span>}
                    <span>{path?.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

FooterSection.displayName = "FooterSection";

// Elegant Footer Component with Light Theme
const Footer = memo(() => {
  const router = useRouter();
  const year = new Date().getFullYear();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Toggle dropdown for mobile
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Sitemap data
  const sitemaps = [
    {
      name: "Innovative Features",
      icon: <IoFlashSharp className="text-blue-500" />,
      paths: [
        {
          name: "Smart Interfaces",
          path: "/",
        },
        {
          name: "Elegant Displays",
          path: "/",
        },
        {
          name: "Cloud Computing",
          path: "/",
        },
        {
          name: "AI Assistance",
          path: "/",
        },
        {
          name: "Advanced Technology",
          path: "/",
        },
        {
          name: "Seamless Integration",
          path: "/",
        },
      ],
    },
    {
      name: "Resources",
      icon: <IoLeafOutline className="text-green-500" />,
      paths: [
        {
          name: "Knowledge Base",
          path: "/",
        },
        {
          name: "Interactive Guides",
          path: "/",
        },
        {
          name: "Digital Archives",
          path: "/",
        },
        {
          name: "Learning Center",
          path: "/",
        },
      ],
    },
    {
      name: "About Us",
      icon: <IoHeartOutline className="text-red-400" />,
      paths: [
        {
          name: "Our Team",
          path: "/",
        },
        {
          name: "Global Locations",
          path: "/",
        },
        {
          name: "Privacy Commitment",
          path: "/",
        },
        {
          name: "Terms of Service",
          path: "/",
        },
      ],
    },
    {
      name: "Contact",
      icon: <IoGlobeOutline className="text-purple-500" />,
      paths: [
        {
          name: "Customer Support",
          path: "/",
        },
        {
          name: "Business Inquiries",
          path: "/",
        },
        {
          name: "Partnership",
          path: "/",
        },
      ],
    },
    {
      name: "Legal",
      icon: <IoShieldOutline className="text-amber-500" />,
      paths: [
        {
          name: "Terms & Conditions",
          path: "/",
        },
        {
          name: "Privacy Policy",
          path: "/",
        },
        {
          name: "Cookie Policy",
          path: "/",
        },
      ],
    },
    {},
    {
      name: "Connect With Us",
      icon: <IoRocketSharp className="text-blue-600" />,
      paths: [
        {
          name: "Facebook",
          path: "https://www.linkedin.com/in/m-faisal125/",
          icon: <IoLogoFacebook className="text-blue-600" />,
        },
        {
          name: "LinkedIn",
          path: "https://www.linkedin.com/in/m-faisal125/",
          icon: <IoLogoLinkedin className="text-blue-700" />,
        },
        {
          name: "GitHub",
          path: "https://github.com/MFaisal125/",
          icon: <IoLogoGithub className="text-gray-700" />,
        },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 py-5 sm:py-6 w-full border-t border-blue-100">
      {/* Minimal background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-white to-blue-50/30 pointer-events-none" />

      <div className="w-full max-w-screen-xl mx-auto px-3 flex flex-col gap-y-4 relative z-10">
        {/* Logo section */}
        <div className="flex justify-center mb-3">
          <IoRocketSharp className="text-xl text-blue-500" />
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-2">
          {sitemaps?.map((sitemap, index) => (
            <FooterSection
              key={index}
              sitemap={sitemap}
              index={index}
              activeDropdown={activeDropdown}
              toggleDropdown={toggleDropdown}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-blue-100/50 my-3" />

        {/* Copyright section */}
        <div className="text-center text-xs text-gray-500">
          &copy; {year} E-Commerce• All rights reserved
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
