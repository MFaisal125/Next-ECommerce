// import Auth from "./auth";
// import Providers from "./providers";
// import "./globals.css";
// import { Toaster } from "react-hot-toast";

// export const metadata = {
//   metadataBase: new URL("https://next-e-commerce1.vercel.app"),
//   title: "E-Commerce",
//   description:
//     "Explore the latest in fashion trends, from chic clothing and accessories to statement footwear. Stay ahead in style with exclusive collections and amazing discounts.",
//   openGraph: {
//     title: "E-Commerce Application",
//     description:
//       "Explore the latest in fashion trends, from chic clothing and accessories to statement footwear. Stay ahead in style with exclusive collections and amazing discounts.",
//     url: "https://next-e-commerce1.vercel.app",
//     siteName: "My E-Commerce Application",
//     images: "",
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     site: "",
//     title: "E-Commerce Application",
//     description:
//       "Explore the latest in fashion trends, from chic clothing and accessories to statement footwear. Stay ahead in style with exclusive collections and amazing discounts.",
//     image: "",
//   },
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <Providers>
//           <Auth>{children}</Auth>
//           <Toaster />
//         </Providers>
//       </body>
//     </html>
//   );
// }

// import Auth from "./auth";
// import Providers from "./providers";
// import "./globals.css";
// import { Toaster } from "react-hot-toast";

// export const metadata = {
//   metadataBase: new URL("https://next-e-commerce1.vercel.app"),
//   title: "E-Commerce",
//   description:
//     "Explore the latest in fashion trends, from chic clothing and accessories to statement footwear. Stay ahead in style with exclusive collections and amazing discounts.",
//   openGraph: {
//     title: "E-Commerce Application",
//     description:
//       "Explore the latest in fashion trends, from chic clothing and accessories to statement footwear. Stay ahead in style with exclusive collections and amazing discounts.",
//     url: "https://next-e-commerce1.vercel.app",
//     siteName: "My E-Commerce Application",
//     images: "",
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     site: "",
//     title: "E-Commerce Application",
//     description:
//       "Explore the latest in fashion trends, from chic clothing and accessories to statement footwear. Stay ahead in style with exclusive collections and amazing discounts.",
//     image: "",
//   },
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <Providers>
//           <Auth>{children}</Auth>
//           <Toaster
//             position="top-center"
//             reverseOrder={false}
//             gutter={12}
//             containerStyle={{
//               top: 20,
//             }}
//             toastOptions={{
//               // Default options for all toasts
//               duration: 4000,
//               style: {
//                 background: "#ffffff",
//                 color: "#333333",
//                 padding: "16px",
//                 borderRadius: "10px",
//                 boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
//                 fontSize: "14px",
//                 maxWidth: "400px",
//                 fontWeight: "500",
//               },
//               // Customize different types of toasts
//               success: {
//                 duration: 4000,
//                 iconTheme: {
//                   primary: "#10b981",
//                   secondary: "#ffffff",
//                 },
//                 style: {
//                   background: "#f0fdf4",
//                   border: "1px solid #dcfce7",
//                   color: "#166534",
//                 },
//               },
//               error: {
//                 duration: 4000,
//                 iconTheme: {
//                   primary: "#ef4444",
//                   secondary: "#ffffff",
//                 },
//                 style: {
//                   background: "#fef2f2",
//                   border: "1px solid #fee2e2",
//                   color: "#b91c1c",
//                 },
//               },
//               loading: {
//                 duration: 4000,
//                 style: {
//                   background: "#f3f4f6",
//                   border: "1px solid #e5e7eb",
//                   color: "#374151",
//                 },
//               },
//             }}
//           />
//         </Providers>
//       </body>
//     </html>
//   );
// }

"use client";

import Auth from "./auth";
import Providers from "./providers";
import "./globals.css";
import { Toaster, toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, memo } from "react";

// Ultra-optimized Toast component (memoized to prevent re-renders)
const CustomToast = memo(({ visible, children }) => {
  return (
    <AnimatePresence mode="popLayout">
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 800, // Ultra-stiff spring for instant response
              damping: 30,
              mass: 0.5, // Lower mass for faster movement
              duration: 0.15, // Ultra-short duration
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.96,
            transition: {
              duration: 0.1, // Ultra-fast exit
            },
          }}
          layout // Enable layout animations for smooth stacking
          layoutId={`toast-${Date.now()}`} // Unique ID for each toast
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

CustomToast.displayName = "CustomToast";

// Ultra-optimized SVG components
const SuccessIcon = memo(() => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 1.33334C4.32 1.33334 1.33334 4.32 1.33334 8C1.33334 11.68 4.32 14.6667 8 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8C14.6667 4.32 11.68 1.33334 8 1.33334ZM6.66667 11.3333L3.33334 8.00001L4.27334 7.06001L6.66667 9.44668L11.7267 4.38668L12.6667 5.33334L6.66667 11.3333Z"
      fill="#10b981"
    />
  </svg>
));

SuccessIcon.displayName = "SuccessIcon";

const ErrorIcon = memo(() => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 1.33334C4.32 1.33334 1.33334 4.32 1.33334 8C1.33334 11.68 4.32 14.6667 8 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8C14.6667 4.32 11.68 1.33334 8 1.33334ZM10.6667 10.6667L8 8.00001L5.33334 10.6667L5.33334 10.6667L4.66667 10L7.33334 7.33334L4.66667 4.66668L5.33334 4.00001L8 6.66668L10.6667 4.00001L11.3333 4.66668L8.66667 7.33334L11.3333 10L10.6667 10.6667Z"
      fill="#ef4444"
    />
  </svg>
));

ErrorIcon.displayName = "ErrorIcon";

const LoadingIcon = memo(() => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="spin-fast"
  >
    <path
      d="M8 1.33334C4.32 1.33334 1.33334 4.32 1.33334 8C1.33334 11.68 4.32 14.6667 8 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8C14.6667 4.32 11.68 1.33334 8 1.33334ZM8 13.3333C5.06 13.3333 2.66667 10.94 2.66667 8C2.66667 5.06001 5.06 2.66668 8 2.66668C10.94 2.66668 13.3333 5.06001 13.3333 8C13.3333 10.94 10.94 13.3333 8 13.3333Z"
      fill="#6b7280"
    />
    <path
      d="M8 4.00001C6.52724 4.00001 5.33334 5.19391 5.33334 6.66668C5.33334 6.66668 6.66667 6.66668 6.66667 6.66668C6.66667 5.93334 7.26667 5.33334 8 5.33334C8.73334 5.33334 9.33334 5.93334 9.33334 6.66668C9.33334 7.40001 8.73334 8.00001 8 8.00001"
      stroke="#6b7280"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
));

LoadingIcon.displayName = "LoadingIcon";

// Ultra-optimized toast enhancement
const enhanceToast = () => {
  // Create enhanced versions of each toast type
  const enhancedSuccess = (message, options = {}) => {
    return toast.custom(
      (t) => (
        <CustomToast visible={t.visible}>
          <div
            style={{
              background: "#ffffff",
              borderLeft: "3px solid #10b981",
              color: "#166534",
              padding: "10px 12px",
              borderRadius: "4px",
              fontSize: "13px",
              maxWidth: "320px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              ...options.style,
            }}
          >
            <div style={{ marginRight: "8px", display: "flex" }}>
              <SuccessIcon />
            </div>
            <span style={{ lineHeight: "1.3" }}>{message}</span>
          </div>
        </CustomToast>
      ),
      { duration: 3000, ...options } // Reduced duration for faster UX
    );
  };

  const enhancedError = (message, options = {}) => {
    return toast.custom(
      (t) => (
        <CustomToast visible={t.visible}>
          <div
            style={{
              background: "#ffffff",
              borderLeft: "3px solid #ef4444",
              color: "#b91c1c",
              padding: "10px 12px",
              borderRadius: "4px",
              fontSize: "13px",
              maxWidth: "320px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              ...options.style,
            }}
          >
            <div style={{ marginRight: "8px", display: "flex" }}>
              <ErrorIcon />
            </div>
            <span style={{ lineHeight: "1.3" }}>{message}</span>
          </div>
        </CustomToast>
      ),
      { duration: 3000, ...options }
    );
  };

  const enhancedLoading = (message, options = {}) => {
    return toast.custom(
      (t) => (
        <CustomToast visible={t.visible}>
          <div
            style={{
              background: "#ffffff",
              borderLeft: "3px solid #6b7280",
              color: "#374151",
              padding: "10px 12px",
              borderRadius: "4px",
              fontSize: "13px",
              maxWidth: "320px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              ...options.style,
            }}
          >
            <div style={{ marginRight: "8px", display: "flex" }}>
              <LoadingIcon />
            </div>
            <span style={{ lineHeight: "1.3" }}>{message}</span>
          </div>
        </CustomToast>
      ),
      { duration: 3000, ...options }
    );
  };

  // Replace the original toast methods with enhanced ones
  toast.success = enhancedSuccess;
  toast.error = enhancedError;
  toast.loading = enhancedLoading;
};

// Ultra-fast spinning animation
const ultraFastSpinAnimation = `
  .spin-fast {
    animation: ultraFastSpin 0.5s linear infinite;
    transform-origin: center;
  }
  
  @keyframes ultraFastSpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Optimized RootLayout component
export default function RootLayout({ children }) {
  // Initialize enhanced toasts on component mount
  useEffect(() => {
    // Apply optimizations
    enhanceToast();

    // Add the spin animation to the document
    const style = document.createElement("style");
    style.innerHTML = ultraFastSpinAnimation;
    document.head.appendChild(style);

    return () => {
      // Clean up
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Explore the latest in fashion trends, from chic clothing and accessories to statement footwear. Stay ahead in style with exclusive collections and amazing discounts."
        />
        <title>E-Commerce</title>
      </head>
      <body>
        <Providers>
          <Auth>{children}</Auth>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={6} // Reduced gutter for faster visual processing
            containerStyle={{
              top: 16,
            }}
            toastOptions={{
              duration: 3000, // Reduced default duration
              style: {
                background: "#ffffff",
                color: "#333333",
                padding: 0,
                border: "none",
                boxShadow: "none",
                overflow: "hidden",
                position: "relative",
                willChange: "transform, opacity", // Performance hint for browsers
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
