// import Image from "next/image";
// import React from "react";
// import Container from "../shared/Container";

// const Steps = () => {
//   const steps = [
//     {
//       badge: (
//         <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-red-800 bg-red-100 relative">
//           Step 1
//         </span>
//       ),
//       title: "Filter & Discover",
//       description: "Smart filtering and suggestions make it easy to find",
//       thumbnail: "/assets/home/steps/step-1.png",
//     },
//     {
//       badge: (
//         <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-indigo-800 bg-indigo-100 relative">
//           Step 2
//         </span>
//       ),
//       title: "Add to bag",
//       description: "Easily select the correct items and add them to the cart",
//       thumbnail: "/assets/home/steps/step-2.png",
//     },
//     {
//       badge: (
//         <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-yellow-800 bg-yellow-100 relative">
//           Step 3
//         </span>
//       ),
//       title: "Fast Shipping",
//       description: "The carrier will confirm and ship quickly to you",
//       thumbnail: "/assets/home/steps/step-3.png",
//     },
//     {
//       badge: (
//         <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-purple-800 bg-purple-100 relative">
//           Step 4
//         </span>
//       ),
//       title: "Enjoy the product",
//       description: "Have fun and enjoy your 5-star quality products",
//       thumbnail: "/assets/home/steps/step-4.png",
//     },
//   ];

//   return (
//     <Container>
//       <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 xl:gap-20">
//         <picture className="hidden md:block absolute inset-x-0 top-5">
//           <source srcSet="/assets/home/steps/step-bg.svg" type="image/svg" />
//           <img src="/assets/home/steps/step-bg.svg" alt="vector" />
//         </picture>
//         {steps.map((step, index) => (
//           <div
//             key={index}
//             className="relative flex flex-col gap-y-8 items-center max-w-xs mx-auto"
//           >
//             <div className="max-w-[100px] mx-auto">
//               <Image
//                 src={step.thumbnail}
//                 alt={step.title}
//                 height={100}
//                 width={100}
//                 className="w-[100px] h-[100px] object-contain"
//               />
//             </div>
//             <div className="flex flex-col gap-y-4 items-center justify-center">
//               {step.badge}
//               <h2 className="text-base">{step.title}</h2>
//               <span className="block text-slate-600 dark:text-slate-400 text-sm leading-6 text-center">
//                 {step.description}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default Steps;

"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import Container from "../shared/Container";

const Steps = () => {
  const steps = [
    {
      badge: (
        <span className="inline-flex px-2 py-0.5 rounded-secondary text-xs text-red-800 bg-red-100 relative">
          Step 1
        </span>
      ),
      title: "Filter & Discover",
      description: "Smart filtering and suggestions make it easy to find",
      thumbnail: "/assets/home/steps/step-1.png",
    },
    {
      badge: (
        <span className="inline-flex px-2 py-0.5 rounded-secondary text-xs text-indigo-800 bg-indigo-100 relative">
          Step 2
        </span>
      ),
      title: "Add to bag",
      description: "Easily select the correct items and add them to the cart",
      thumbnail: "/assets/home/steps/step-2.png",
    },
    {
      badge: (
        <span className="inline-flex px-2 py-0.5 rounded-secondary text-xs text-yellow-800 bg-yellow-100 relative">
          Step 3
        </span>
      ),
      title: "Fast Shipping",
      description: "The carrier will confirm and ship quickly to you",
      thumbnail: "/assets/home/steps/step-3.png",
    },
    {
      badge: (
        <span className="inline-flex px-2 py-0.5 rounded-secondary text-xs text-purple-800 bg-purple-100 relative">
          Step 4
        </span>
      ),
      title: "Enjoy the product",
      description: "Have fun and enjoy your 5-star quality products",
      thumbnail: "/assets/home/steps/step-4.png",
    },
  ];

  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) return;

    // Clone the track for seamless looping
    const clone = track.cloneNode(true);
    container.appendChild(clone);

    // Get the width of the original track
    const trackWidth = track.offsetWidth;

    // Create the animation
    const tl = gsap.timeline({ repeat: -1 });

    // Animate the container
    tl.to(container, {
      x: -trackWidth,
      duration: 15,
      ease: "none",
      onComplete: () => {
        // Reset position when animation completes
        gsap.set(container, { x: 0 });
      },
    });

    // Pause animation on hover
    container.addEventListener("mouseenter", () => {
      tl.pause();
    });

    // Resume animation on mouse leave
    container.addEventListener("mouseleave", () => {
      tl.play();
    });

    return () => {
      tl.kill();
      container.removeEventListener("mouseenter", () => {});
      container.removeEventListener("mouseleave", () => {});
    };
  }, []);

  return (
    <Container>
      <div className="relative overflow-hidden py-4">
        <div ref={containerRef} className="flex">
          <div ref={trackRef} className="flex">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex flex-col items-center mx-2 w-[150px]"
              >
                <div className="w-[50px] h-[50px] mb-2">
                  <Image
                    src={step.thumbnail || "/placeholder.svg"}
                    alt={step.title}
                    height={50}
                    width={50}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col items-center gap-y-1 text-center">
                  {step.badge}
                  <h2 className="text-sm font-medium">{step.title}</h2>
                  <span className="block text-slate-600 dark:text-slate-400 text-xs leading-tight">
                    {step.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Steps;
