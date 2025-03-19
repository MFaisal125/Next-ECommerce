// import React from "react";

// const Dashboard = ({ className, ...props }) => {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={1.5}
//       stroke="currentColor"
//       className={"w-6 h-6" + (className ? " " + className : "")}
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
//       />
//     </svg>
//   );
// };

// export default Dashboard;

"use client";

import React from "react";

const Dashboard = ({ className, ...props }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  // Animation for the icon path
  const pathRef = React.useRef(null);

  React.useEffect(() => {
    if (isActive && pathRef.current) {
      // Reset the animation
      pathRef.current.style.animation = "none";
      // Trigger reflow
      void pathRef.current.offsetWidth;
      // Start the animation again
      pathRef.current.style.animation = "dashboardPulse 1.5s ease-in-out";
    }
  }, [isActive]);

  const handleClick = () => {
    setIsActive(true);
    // Reset active state after animation completes
    setTimeout(() => setIsActive(false), 1500);
  };

  return (
    <>
      <style jsx>{`
        @keyframes dashboardPulse {
          0% {
            stroke-width: 1.5;
            stroke-dasharray: 0;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-width: 2.5;
            stroke-dasharray: 100;
            stroke-dashoffset: 50;
          }
          100% {
            stroke-width: 1.5;
            stroke-dasharray: 0;
            stroke-dashoffset: 0;
          }
        }

        @keyframes iconGlow {
          0% {
            filter: drop-shadow(0 0 0 currentColor);
          }
          50% {
            filter: drop-shadow(0 0 3px currentColor);
          }
          100% {
            filter: drop-shadow(0 0 0 currentColor);
          }
        }

        .dashboard-icon {
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .dashboard-icon:hover {
          transform: scale(1.1);
        }

        .dashboard-icon.active {
          animation: iconGlow 1.5s ease-in-out;
        }

        .dashboard-path {
          transition: all 0.3s ease;
        }
      `}</style>

      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={isHovered ? 2 : 1.5}
        stroke="currentColor"
        className={`dashboard-icon w-6 h-6${className ? " " + className : ""}${
          isActive ? " active" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <path
          ref={pathRef}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="dashboard-path"
          d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
        />
      </svg>
    </>
  );
};

export default Dashboard;
