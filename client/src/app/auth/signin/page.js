// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useEffect } from "react";
// import Spinner from "@/components/shared/Spinner";
// import Link from "next/link";
// import { useSignInMutation } from "@/services/auth/authApi";
// import { toast } from "react-hot-toast";

// const Signin = () => {
//   const router = useRouter();
//   const [signin, { isLoading, data, error }] = useSignInMutation();

//   useEffect(() => {
//     if (isLoading) {
//       toast.loading("Signing in...", { id: "signin" });
//     }

//     if (data) {
//       toast.success(data?.description, { id: "signin" });
//       localStorage.setItem("accessToken", data?.accessToken);

//       // open new tab
//       setTimeout(() => {
//         window.open("/", "_self");
//       }, 1000);
//     }
//     if (error?.data) {
//       toast.error(error?.data?.description, { id: "signin" });
//     }
//   }, [isLoading, data, error]);

//   const handleSignin = async (e) => {
//     e.preventDefault();

//     signin({ email: e.target.email.value, password: e.target.password.value });
//     e.target.reset();
//   };

//   return (
//     <section className="w-screen h-screen flex justify-center items-center px-4">
//       <div className="max-w-md w-full flex flex-col gap-y-4 border p-8 rounded-primary">
//         <div className="flex flex-row items-center gap-x-2">
//           <hr className="w-full" />
//           <Image
//             src="/logo.png"
//             alt="logo"
//             width={141}
//             height={40}
//             className="max-w-full cursor-pointer"
//             onClick={() => router.push("/")}
//           />
//           <hr className="w-full" />
//         </div>
//         <form
//           action=""
//           className="w-full flex flex-col gap-y-4"
//           onSubmit={handleSignin}
//         >
//           <label htmlFor="email" className="flex flex-col gap-y-1">
//             <span className="text-sm">Enter Your Email</span>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               placeholder="i.e. example@gmail.com"
//               className=""
//               required
//             />
//           </label>
//           <label htmlFor="password" className="flex flex-col gap-y-1">
//             <span className="text-sm">Enter Your Password</span>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               placeholder="i.e. Admin@123"
//               className=""
//               required
//             />
//           </label>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow disabled:bg-gray-200 disabled:border-gray-200 disabled:text-black/50 disabled:cursor-not-allowed flex flex-row justify-center items-center text-sm"
//           >
//             {isLoading ? <Spinner /> : "Sign In"}
//           </button>
//         </form>
//         <div className="flex flex-row justify-center items-center gap-x-2 text-xs">
//           <Link href="/auth/signup" className="">
//             Sign Up
//           </Link>
//           <span className="h-4 border-l" />
//           <Link href="/auth/forgot-password" className="">
//             Forgot Password
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Signin;

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/components/shared/Spinner";
import Link from "next/link";
import { useSignInMutation } from "@/services/auth/authApi";
import { toast } from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const Signin = () => {
  const router = useRouter();
  const [signin, { isLoading, data, error }] = useSignInMutation();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Signing in...", { id: "signin" });
    }

    if (data) {
      toast.success(data?.description, { id: "signin" });
      localStorage.setItem("accessToken", data?.accessToken);

      // open new tab
      setTimeout(() => {
        window.open("/", "_self");
      }, 1000);
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "signin" });
    }
  }, [isLoading, data, error]);

  const handleSignin = async (e) => {
    e.preventDefault();

    signin({ email: e.target.email.value, password: e.target.password.value });
    e.target.reset();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center p-2 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-sm sm:max-w-md flex flex-col gap-y-2 border border-gray-200 p-3 sm:p-4 rounded-xl shadow-lg bg-white">
        <div className="flex flex-row items-center gap-x-3">
          <hr className="w-full border-gray-300" />
          <Image
            src="/logo.png"
            alt="logo"
            width={120}
            height={34}
            className="max-w-full cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => router.push("/")}
          />
          <hr className="w-full border-gray-300" />
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm -mt-3">
          Sign in to your account
        </p>

        <form className="w-full flex flex-col gap-y-4" onSubmit={handleSignin}>
          <div className="space-y-4">
            <div className="flex flex-col gap-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                {/* <Mail className="absolute left-3 top-1/2  -translate-y-1/2 h-4 w-4 text-gray-400" /> */}
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@gmail.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-y-1">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                {/* <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /> */}
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 py-2.5 border border-indigo-600 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors drop-shadow-md disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed flex flex-row justify-center items-center text-sm sm:text-base font-medium"
          >
            {isLoading ? <Spinner className="mr-2 h-4 w-4" /> : null}
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <div className="flex flex-row justify-center items-center gap-x-4 text-xs sm:text-sm mt-1">
            <Link
              href="/auth/signup"
              className="text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Create Account
            </Link>
            <span className="h-4 border-l border-gray-300" />
            <Link
              href="/auth/forgot-password"
              className="text-indigo-600 hover:text-indigo-800 transition-colors hidden sm:block"
            >
              Forgot Password
            </Link>
          </div>

          <p className="text-xs text-center text-gray-500 mt-1">
            By signing in, you agree to our Terms of Service
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signin;
