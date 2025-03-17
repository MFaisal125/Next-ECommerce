// "use client";

// import Trash from "@/components/icons/Trash";
// import Upload from "@/components/icons/Upload";
// import Spinner from "@/components/shared/Spinner";
// import { useSignUpMutation } from "@/services/auth/authApi";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";

// const Signup = () => {
//   const router = useRouter();
//   const [avatarPreview, setAvatarPreview] = useState(null);
//   const [avatar, setAvatar] = useState(null);
//   const [signup, { isLoading, data, error }] = useSignUpMutation();

//   useEffect(() => {
//     if (isLoading) {
//       toast.loading("Signing up...", { id: "signup" });
//     }

//     if (data) {
//       toast.success(data?.description, { id: "signup" });

//       // open new tab
//       setTimeout(() => {
//         window.open("/auth/signin", "_self");
//       }, 1000);
//     }
//     if (error?.data) {
//       toast.error(error?.data?.description, { id: "signup" });
//     }
//   }, [isLoading, data, error, router]);

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     setAvatar(file);

//     if (!avatarPreview) {
//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setAvatarPreview(reader.result);
//         };

//         reader.readAsDataURL(file);
//       }
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("avatar", avatar);

//     formData.append("name", e.target.name.value);
//     formData.append("email", e.target.email.value);

//     // Password validation regex
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;

//     if (!e.target.password.value.match(passwordRegex)) {
//       alert(
//         "Password must have at least 1 uppercase, 1 lowercase, 1 symbol, and 1 number. Password length should be between 8 and 20 characters."
//       );
//       return;
//     }

//     // Phone number validation regex
//     const phoneRegex = /^\+88\d{11}$/;

//     if (!e.target.phone.value.match(phoneRegex)) {
//       alert(
//         "Phone number must start with +88 and have a total length of 14 digits."
//       );
//       return;
//     }

//     formData.append("phone", e.target.phone.value);
//     formData.append("password", e.target.password.value);

//     signup(formData);

//     e.target.reset();
//     setAvatarPreview(null);
//   };

//   return (
//     <section className="min-w-full min-h-screen flex justify-center items-center p-4">
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
//           onSubmit={handleSignup}
//         >
//           <label
//             htmlFor="avatar"
//             className="flex flex-col gap-y-1 w-fit mx-auto items-center"
//           >
//             <div
//               className={
//                 "h-[100px] w-[100px] rounded transition-colors flex flex-row justify-center items-center relative" +
//                 " " +
//                 (avatarPreview
//                   ? ""
//                   : "border-2 border-dashed hover:border-black")
//               }
//             >
//               {avatarPreview ? (
//                 <div className="relative">
//                   <Image
//                     src={avatarPreview}
//                     alt="avatar"
//                     height={100}
//                     width={100}
//                     className="rounded h-[100px] w-[100px] object-cover"
//                   />
//                   <button
//                     className="absolute bottom-0 -right-10 p-1 rounded bg-red-500 text-white shadow-2xl"
//                     onClick={() => setAvatarPreview(null)}
//                   >
//                     <Trash />
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <span className="text-xs flex flex-col justify-center items-center gap-y-2 text-center">
//                     <Upload />
//                     Add Avatar <br /> 300x300
//                   </span>

//                   <input
//                     type="file"
//                     name="avatar"
//                     id="avatar"
//                     title="Dimension: 300x300"
//                     accept=".jpg, .jpeg, .png"
//                     className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
//                     onChange={handleAvatarChange}
//                     required
//                   />
//                 </>
//               )}
//             </div>
//           </label>
//           <label htmlFor="name" className="flex flex-col gap-y-1">
//             <span className="text-sm">Enter Your Name*</span>
//             <input
//               type="text"
//               name="name"
//               id="name"
//               placeholder="i.e. John Doe"
//               className=""
//               required
//             />
//           </label>
//           <label htmlFor="email" className="flex flex-col gap-y-1">
//             <span className="text-sm">Enter Your Email*</span>
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
//             <span className="text-sm">Enter Your Password*</span>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               placeholder="i.e. Admin@123"
//               className=""
//               required
//             />
//           </label>
//           <label htmlFor="phone" className="flex flex-col gap-y-1">
//             <span className="text-sm">Enter Your Phone Number*</span>
//             <input
//               type="tel"
//               name="phone"
//               id="phone"
//               placeholder="i.e. +8801906315901"
//               className=""
//               required
//             />
//           </label>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow disabled:bg-gray-200 disabled:border-gray-200 disabled:text-black/50 disabled:cursor-not-allowed flex flex-row justify-center items-center text-sm"
//           >
//             {isLoading ? <Spinner /> : "Sign Up"}
//           </button>
//         </form>
//         <div className="flex flex-row justify-center items-center gap-x-2 text-xs">
//           <Link href="/auth/signin" className="">
//             Sign In
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

// export default Signup;

// "use client";

// import Trash from "@/components/icons/Trash";
// import Upload from "@/components/icons/Upload";
// import Spinner from "@/components/shared/Spinner";
// import { useSignUpMutation } from "@/services/auth/authApi";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";

// const Signup = () => {
//   const router = useRouter();
//   const [avatarPreview, setAvatarPreview] = useState(null);
//   const [avatar, setAvatar] = useState(null);
//   const [signup, { isLoading, data, error }] = useSignUpMutation();

//   useEffect(() => {
//     if (isLoading) {
//       toast.loading("Signing up...", { id: "signup" });
//     }

//     if (data) {
//       toast.success(data?.description, { id: "signup" });

//       // open new tab
//       setTimeout(() => {
//         window.open("/auth/signin", "_self");
//       }, 1000);
//     }
//     if (error?.data) {
//       toast.error(error?.data?.description, { id: "signup" });
//     }
//   }, [isLoading, data, error, router]);

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     setAvatar(file);

//     if (!avatarPreview) {
//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setAvatarPreview(reader.result);
//         };

//         reader.readAsDataURL(file);
//       }
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("avatar", avatar);

//     formData.append("name", e.target.name.value);
//     formData.append("email", e.target.email.value);

//     // Password validation regex
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;

//     if (!e.target.password.value.match(passwordRegex)) {
//       alert(
//         "Password must have at least 1 uppercase, 1 lowercase, 1 symbol, and 1 number. Password length should be between 8 and 20 characters."
//       );
//       return;
//     }

//     // Phone number validation regex - Changed to Pakistan's format (+92)
//     const phoneRegex = /^\+92\d{10}$/;

//     if (!e.target.phone.value.match(phoneRegex)) {
//       alert(
//         "Phone number must start with +92 and have a total length of 13 digits."
//       );
//       return;
//     }

//     formData.append("phone", e.target.phone.value);
//     formData.append("password", e.target.password.value);

//     signup(formData);

//     e.target.reset();
//     setAvatarPreview(null);
//   };

//   return (
//     <section className="min-w-full min-h-screen flex justify-center items-center p-4">
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
//           onSubmit={handleSignup}
//         >
//           <label
//             htmlFor="avatar"
//             className="flex flex-col gap-y-1 w-fit mx-auto items-center"
//           >
//             <div
//               className={
//                 "h-[100px] w-[100px] rounded transition-colors flex flex-row justify-center items-center relative" +
//                 " " +
//                 (avatarPreview
//                   ? ""
//                   : "border-2 border-dashed hover:border-black")
//               }
//             >
//               {avatarPreview ? (
//                 <div className="relative">
//                   <Image
//                     src={avatarPreview || "/placeholder.svg"}
//                     alt="avatar"
//                     height={100}
//                     width={100}
//                     className="rounded h-[100px] w-[100px] object-cover"
//                   />
//                   <button
//                     className="absolute bottom-0 -right-10 p-1 rounded bg-red-500 text-white shadow-2xl"
//                     onClick={() => setAvatarPreview(null)}
//                   >
//                     <Trash />
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <span className="text-xs flex flex-col justify-center items-center gap-y-2 text-center">
//                     <Upload />
//                     Add Avatar <br /> 300x300
//                   </span>

//                   <input
//                     type="file"
//                     name="avatar"
//                     id="avatar"
//                     title="Dimension: 300x300"
//                     accept=".jpg, .jpeg, .png"
//                     className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
//                     onChange={handleAvatarChange}
//                     required
//                   />
//                 </>
//               )}
//             </div>
//           </label>
//           <label htmlFor="name" className="flex flex-col gap-y-1">
//             <span className="text-sm">Enter Your Name*</span>
//             <input
//               type="text"
//               name="name"
//               id="name"
//               placeholder="i.e. John Doe"
//               className=""
//               required
//             />
//           </label>
//           <label htmlFor="email" className="flex flex-col gap-y-1">
//             <span className="text-sm">Enter Your Email*</span>
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
//             <span className="text-sm">Enter Your Password*</span>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               placeholder="i.e. Admin@123"
//               className=""
//               required
//             />
//           </label>
//           <label htmlFor="phone" className="flex flex-col gap-y-1">
//             <span className="text-sm">Enter Your Phone Number*</span>
//             <input
//               type="tel"
//               name="phone"
//               id="phone"
//               placeholder="i.e. +923001234567"
//               className=""
//               required
//             />
//           </label>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow disabled:bg-gray-200 disabled:border-gray-200 disabled:text-black/50 disabled:cursor-not-allowed flex flex-row justify-center items-center text-sm"
//           >
//             {isLoading ? <Spinner /> : "Sign Up"}
//           </button>
//         </form>
//         <div className="flex flex-row justify-center items-center gap-x-2 text-xs">
//           <Link href="/auth/signin" className="">
//             Sign In
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

// export default Signup;

"use client";

import Trash from "@/components/icons/Trash";
import Upload from "@/components/icons/Upload";
import Spinner from "@/components/shared/Spinner";
import { useSignUpMutation } from "@/services/auth/authApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";

// Country codes with expected digit lengths - aligned with backend validation
const countryData = [
  { code: "+1", country: "United States/Canada", digits: 10 },
  { code: "+44", country: "United Kingdom", digits: 10 },
  { code: "+91", country: "India", digits: 10 },
  { code: "+92", country: "Pakistan", digits: 10 },
  { code: "+86", country: "China", digits: 11 },
  { code: "+33", country: "France", digits: 9 },
  { code: "+49", country: "Germany", digits: 10 },
  { code: "+81", country: "Japan", digits: 10 },
  { code: "+7", country: "Russia", digits: 10 },
  { code: "+55", country: "Brazil", digits: 11 },
  { code: "+52", country: "Mexico", digits: 10 },
  { code: "+61", country: "Australia", digits: 9 },
  { code: "+39", country: "Italy", digits: 10 },
  { code: "+34", country: "Spain", digits: 9 },
  { code: "+82", country: "South Korea", digits: 10 },
  { code: "+31", country: "Netherlands", digits: 9 },
  { code: "+90", country: "Turkey", digits: 10 },
  { code: "+966", country: "Saudi Arabia", digits: 9 },
  { code: "+971", country: "UAE", digits: 9 },
  { code: "+20", country: "Egypt", digits: 10 },
  { code: "+27", country: "South Africa", digits: 9 },
  { code: "+234", country: "Nigeria", digits: 10 },
  { code: "+254", country: "Kenya", digits: 9 },
  { code: "+880", country: "Bangladesh", digits: 10 },
  { code: "+84", country: "Vietnam", digits: 9 },
  { code: "+62", country: "Indonesia", digits: 10 },
  { code: "+63", country: "Philippines", digits: 10 },
  { code: "+60", country: "Malaysia", digits: 9 },
  { code: "+65", country: "Singapore", digits: 8 },
  { code: "+66", country: "Thailand", digits: 9 },
];

const Signup = () => {
  const router = useRouter();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+92"); // Default to Pakistan
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signup, { isLoading, data, error }] = useSignUpMutation();

  // Get the selected country data
  const selectedCountry = useMemo(() => {
    return (
      countryData.find((country) => country.code === selectedCountryCode) ||
      countryData[3]
    ); // Default to Pakistan
  }, [selectedCountryCode]);

  // Format phone number with spaces for better readability
  const formatPhoneNumber = (value, countryDigits) => {
    // Remove all non-digits
    const digitsOnly = value.replace(/\D/g, "");

    // Limit to the expected number of digits
    const limitedDigits = digitsOnly.slice(0, countryDigits);

    // Format with spaces based on country
    let formattedNumber = "";

    // Different formatting patterns based on digit count
    if (countryDigits === 10) {
      // Format like XXX XXX XXXX (common for 10 digit numbers)
      for (let i = 0; i < limitedDigits.length; i++) {
        if (i === 3 || i === 6) {
          formattedNumber += " ";
        }
        formattedNumber += limitedDigits[i];
      }
    } else if (countryDigits === 9) {
      // Format like XX XXX XXXX (common for 9 digit numbers)
      for (let i = 0; i < limitedDigits.length; i++) {
        if (i === 2 || i === 5) {
          formattedNumber += " ";
        }
        formattedNumber += limitedDigits[i];
      }
    } else {
      // Generic spacing every 3 digits for other lengths
      for (let i = 0; i < limitedDigits.length; i++) {
        if (i > 0 && i % 3 === 0) {
          formattedNumber += " ";
        }
        formattedNumber += limitedDigits[i];
      }
    }

    return formattedNumber;
  };

  // Replace the validatePhoneNumber function with this improved version
  const validatePhoneNumber = (countryCode, phoneDigits) => {
    // Basic validation - check if the number has the correct length for the country
    const country = countryData.find((c) => c.code === countryCode);

    if (!country) {
      return {
        isValid: false,
        message: "Invalid country code",
      };
    }

    // Remove any spaces before checking length
    const digitsOnly = phoneDigits.replace(/\s/g, "");

    if (digitsOnly.length === 0) {
      return { isValid: false, message: "Phone number is required" };
    }

    if (digitsOnly.length !== country.digits) {
      return {
        isValid: false,
        message: `Phone number must be exactly ${country.digits} digits for ${country.country}`,
      };
    }

    return { isValid: true };
  };

  // Replace the handleSignup function with this improved version
  const handleSignup = async (e) => {
    e.preventDefault();

    // Remove spaces from phone number
    const cleanPhoneNumber = phoneNumber.replace(/\s/g, "");

    // Validate phone number before submission
    const phoneValidation = validatePhoneNumber(
      selectedCountryCode,
      cleanPhoneNumber
    );
    if (!phoneValidation.isValid) {
      alert(phoneValidation.message);
      return; // Return early without resetting form
    }

    // Password validation regex
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;

    if (!e.target.password.value.match(passwordRegex)) {
      alert(
        "Password must have at least 1 uppercase, 1 lowercase, 1 symbol, and 1 number. Password length should be between 8 and 20 characters."
      );
      return; // Return early without resetting form
    }

    // Combine country code and phone number (without spaces)
    const fullPhoneNumber = selectedCountryCode + cleanPhoneNumber;

    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);
    formData.append("phone", fullPhoneNumber);
    formData.append("password", e.target.password.value);

    // Don't reset the form - just call the API
    await signup(formData);
    // Form will only be reset after successful redirect in the useEffect
  };

  // Replace the useEffect for API response handling with this improved version
  useEffect(() => {
    if (isLoading) {
      toast.loading("Signing up...", { id: "signup" });
    }

    if (data) {
      toast.success(data?.description, { id: "signup" });

      // Only reset and redirect on successful signup
      setTimeout(() => {
        window.open("/auth/signin", "_self");
      }, 1000);
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "signup" });
      // Do not reset form on error
    }
  }, [isLoading, data, error, router]);

  useEffect(() => {
    if (phoneNumber.length > 0) {
      const cleanNumber = phoneNumber.replace(/\s/g, "");
      const validation = validatePhoneNumber(selectedCountryCode, cleanNumber);

      if (!validation.isValid) {
        setPhoneError(validation.message);
      } else {
        setPhoneError("");
      }
    } else {
      setPhoneError("");
    }
  }, [phoneNumber, selectedCountryCode]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    if (!avatarPreview) {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };

        reader.readAsDataURL(file);
      }
    }
  };

  // Update the handlePhoneChange function to better handle input
  const handlePhoneChange = (e) => {
    // Get the raw input value
    const inputValue = e.target.value;

    // Remove any non-digit characters
    const digitsOnly = inputValue.replace(/\D/g, "");

    // Format the phone number
    const formattedValue = formatPhoneNumber(
      digitsOnly,
      selectedCountry.digits
    );

    // Update state with formatted value
    setPhoneNumber(formattedValue);
  };

  const handleCountryCodeChange = (e) => {
    setSelectedCountryCode(e.target.value);
    // Clear phone number when country changes to avoid validation issues
    setPhoneNumber("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="min-w-full min-h-screen flex justify-center items-center p-2 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-lg w-full flex flex-col gap-y-2 border border-gray-200 p-3 rounded-xl shadow-lg bg-white">
        <div className="flex flex-row items-center gap-x-3">
          <hr className="w-full border-gray-300" />
          <Image
            src="/logo.png"
            alt="logo"
            width={141}
            height={40}
            className="max-w-full cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => router.push("/")}
          />
          <hr className="w-full border-gray-300" />
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Create Account
        </h2>

        <form
          action=""
          className="w-full flex flex-col gap-y-2"
          onSubmit={handleSignup}
        >
          <label
            htmlFor="avatar"
            className="flex flex-col gap-y-2 w-fit mx-auto items-center"
          >
            <div
              className={
                "h-[120px] w-[120px] rounded-full transition-all flex flex-row justify-center items-center relative" +
                " " +
                (avatarPreview
                  ? "ring-4 ring-indigo-100"
                  : "border-2 border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50")
              }
            >
              {avatarPreview ? (
                <div className="relative">
                  <Image
                    src={avatarPreview || "/placeholder.svg"}
                    alt="avatar"
                    height={120}
                    width={120}
                    className="rounded-full h-[120px] w-[120px] object-cover"
                  />
                  <button
                    type="button"
                    className="absolute -bottom-2 -right-2 p-2 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-colors"
                    onClick={() => setAvatarPreview(null)}
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-sm flex flex-col justify-center items-center gap-y-2 text-center text-indigo-600">
                    <Upload className="h-6 w-6" />
                    Add Avatar <br /> 300x300
                  </span>

                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    title="Dimension: 300x300"
                    accept=".jpg, .jpeg, .png"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleAvatarChange}
                    required
                  />
                </>
              )}
            </div>
          </label>

          <div className="space-y-4">
            <label htmlFor="name" className="flex flex-col gap-y-1">
              <span className="text-sm font-medium text-gray-700">
                Full Name*
              </span>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="John Doe"
                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                required
              />
            </label>

            <label htmlFor="email" className="flex flex-col gap-y-1">
              <span className="text-sm font-medium text-gray-700">
                Email Address*
              </span>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@gmail.com"
                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                required
              />
            </label>

            <label htmlFor="password" className="flex flex-col gap-y-1">
              <span className="text-sm font-medium text-gray-700">
                Password*
              </span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Min. 8 characters with uppercase, lowercase, number & symbol"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-indigo-600"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
            </label>

            <div>
              <span className="text-sm font-medium text-gray-700">
                Phone Number*
              </span>
              <div className="flex gap-2 mt-1">
                <select
                  value={selectedCountryCode}
                  onChange={handleCountryCodeChange}
                  className="w-2/5 px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                >
                  {countryData.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} ({country.country})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder={`${selectedCountry.digits} digits required`}
                  className={`w-3/5 px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${
                    phoneError
                      ? "border-red-500 focus:ring-red-200 focus:border-red-500"
                      : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  }`}
                  required
                />
              </div>
              {phoneError ? (
                <p className="text-xs text-red-500 mt-1.5">{phoneError}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1.5">
                  Enter {selectedCountry.digits} digits for{" "}
                  {selectedCountry.country} without the country code
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || phoneError}
            className="mt-2 py-3 border border-indigo-600 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors drop-shadow-md disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed flex flex-row justify-center items-center text-base font-medium"
          >
            {isLoading ? <Spinner className="mr-2" /> : null}
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="flex flex-row justify-center items-center gap-x-4 text-sm mt-2">
          <Link
            href="/auth/signin"
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Sign In
          </Link>
          <span className="h-5 border-l border-gray-300" />
          <Link
            href="/auth/forgot-password"
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Forgot Password
          </Link>
        </div>

        <p className="text-xs text-center text-gray-500 mt-2">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </section>
  );
};

export default Signup;

// "use client";

// import React from "react";

// import Trash from "@/components/icons/Trash";
// import Upload from "@/components/icons/Upload";
// import Spinner from "@/components/shared/Spinner";
// import { useSignUpMutation } from "@/services/auth/authApi";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState, useMemo, useRef } from "react";
// import { toast } from "react-hot-toast";
// // Replace the import line for emailjs
// // import emailjs from '@emailjs/browser';

// // Replace with:
// // We'll use a direct fetch approach instead of the EmailJS package
// // No import needed for emailjs

// // Country codes with expected digit lengths - aligned with backend validation
// const countryData = [
//   { code: "+1", country: "United States/Canada", digits: 10 },
//   { code: "+44", country: "United Kingdom", digits: 10 },
//   { code: "+91", country: "India", digits: 10 },
//   { code: "+92", country: "Pakistan", digits: 10 },
//   { code: "+86", country: "China", digits: 11 },
//   { code: "+33", country: "France", digits: 9 },
//   { code: "+49", country: "Germany", digits: 10 },
//   { code: "+81", country: "Japan", digits: 10 },
//   { code: "+7", country: "Russia", digits: 10 },
//   { code: "+55", country: "Brazil", digits: 11 },
//   { code: "+52", country: "Mexico", digits: 10 },
//   { code: "+61", country: "Australia", digits: 9 },
//   { code: "+39", country: "Italy", digits: 10 },
//   { code: "+34", country: "Spain", digits: 9 },
//   { code: "+82", country: "South Korea", digits: 10 },
//   { code: "+31", country: "Netherlands", digits: 9 },
//   { code: "+90", country: "Turkey", digits: 10 },
//   { code: "+966", country: "Saudi Arabia", digits: 9 },
//   { code: "+971", country: "UAE", digits: 9 },
//   { code: "+20", country: "Egypt", digits: 10 },
//   { code: "+27", country: "South Africa", digits: 9 },
//   { code: "+234", country: "Nigeria", digits: 10 },
//   { code: "+254", country: "Kenya", digits: 9 },
//   { code: "+880", country: "Bangladesh", digits: 10 },
//   { code: "+84", country: "Vietnam", digits: 9 },
//   { code: "+62", country: "Indonesia", digits: 10 },
//   { code: "+63", country: "Philippines", digits: 10 },
//   { code: "+60", country: "Malaysia", digits: 9 },
//   { code: "+65", country: "Singapore", digits: 8 },
//   { code: "+66", country: "Thailand", digits: 9 },
// ];

// // Also remove the emailjs.init line (around line 32)
// // Initialize EmailJS
// // emailjs.init(process.env.NEXT_PUBLIC_USER_ID)

// // Replace with:
// // No initialization needed for our approach

// const Signup = () => {
//   const router = useRouter();
//   const [avatarPreview, setAvatarPreview] = useState(null);
//   const [avatar, setAvatar] = useState(null);
//   const [selectedCountryCode, setSelectedCountryCode] = useState("+92"); // Default to Pakistan
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [phoneError, setPhoneError] = useState("");

//   // Create separate mutations for different steps
//   const [
//     signup,
//     { isLoading: isSignupLoading, data: signupData, error: signupError },
//   ] = useSignUpMutation();

//   // Form data state
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//   });

//   // OTP related states
//   const [step, setStep] = useState(1); // 1: Signup form, 2: OTP verification, 3: Success
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit OTP
//   const [otpError, setOtpError] = useState("");
//   const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const [countdown, setCountdown] = useState(0);
//   const [userEmail, setUserEmail] = useState("");
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   // Refs for OTP inputs
//   const otpRefs = useRef([]);

//   // Initialize refs for OTP inputs
//   useEffect(() => {
//     otpRefs.current = Array(6)
//       .fill()
//       .map((_, i) => otpRefs.current[i] || React.createRef());
//   }, []);

//   // Get the selected country data
//   const selectedCountry = useMemo(() => {
//     return (
//       countryData.find((country) => country.code === selectedCountryCode) ||
//       countryData[3]
//     ); // Default to Pakistan
//   }, [selectedCountryCode]);

//   // Format phone number with spaces for better readability
//   const formatPhoneNumber = (value, countryDigits) => {
//     // Remove all non-digits
//     const digitsOnly = value.replace(/\D/g, "");

//     // Limit to the expected number of digits
//     const limitedDigits = digitsOnly.slice(0, countryDigits);

//     // Format with spaces based on country
//     let formattedNumber = "";

//     // Different formatting patterns based on digit count
//     if (countryDigits === 10) {
//       // Format like XXX XXX XXXX (common for 10 digit numbers)
//       for (let i = 0; i < limitedDigits.length; i++) {
//         if (i === 3 || i === 6) {
//           formattedNumber += " ";
//         }
//         formattedNumber += limitedDigits[i];
//       }
//     } else if (countryDigits === 9) {
//       // Format like XX XXX XXXX (common for 9 digit numbers)
//       for (let i = 0; i < limitedDigits.length; i++) {
//         if (i === 2 || i === 5) {
//           formattedNumber += " ";
//         }
//         formattedNumber += limitedDigits[i];
//       }
//     } else {
//       // Generic spacing every 3 digits for other lengths
//       for (let i = 0; i < limitedDigits.length; i++) {
//         if (i > 0 && i % 3 === 0) {
//           formattedNumber += " ";
//         }
//         formattedNumber += limitedDigits[i];
//       }
//     }

//     return formattedNumber;
//   };

//   // Validate phone number
//   const validatePhoneNumber = (countryCode, phoneDigits) => {
//     // Basic validation - check if the number has the correct length for the country
//     const country = countryData.find((c) => c.code === countryCode);

//     if (!country) {
//       return {
//         isValid: false,
//         message: "Invalid country code",
//       };
//     }

//     // Remove any spaces before checking length
//     const digitsOnly = phoneDigits.replace(/\s/g, "");

//     if (digitsOnly.length === 0) {
//       return { isValid: false, message: "Phone number is required" };
//     }

//     if (digitsOnly.length !== country.digits) {
//       return {
//         isValid: false,
//         message: `Phone number must be exactly ${country.digits} digits for ${country.country}`,
//       };
//     }

//     return { isValid: true };
//   };

//   // Handle signup response
//   useEffect(() => {
//     if (isSignupLoading && step === 1 && formSubmitted) {
//       toast.loading("Processing signup...", { id: "signup" });
//     }

//     if (signupData && step === 1 && formSubmitted) {
//       toast.success("Verification code sent to your email", { id: "signup" });
//       // Move to OTP verification step
//       setStep(2);
//       setUserEmail(formData.email);

//       // Start countdown for resend button
//       setResendDisabled(true);
//       setCountdown(60);

//       // Reset form submitted flag
//       setFormSubmitted(false);
//     }

//     if (signupError?.data && step === 1 && formSubmitted) {
//       toast.error(signupError?.data?.description || "Signup failed", {
//         id: "signup",
//       });
//       setFormSubmitted(false);
//     }
//   }, [
//     isSignupLoading,
//     signupData,
//     signupError,
//     step,
//     formData.email,
//     formSubmitted,
//   ]);

//   // Countdown timer for OTP resend
//   useEffect(() => {
//     let timer;
//     if (countdown > 0 && resendDisabled) {
//       timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//     } else if (countdown === 0 && resendDisabled) {
//       setResendDisabled(false);
//     }

//     return () => clearTimeout(timer);
//   }, [countdown, resendDisabled]);

//   // Phone validation effect
//   useEffect(() => {
//     if (phoneNumber.length > 0) {
//       const cleanNumber = phoneNumber.replace(/\s/g, "");
//       const validation = validatePhoneNumber(selectedCountryCode, cleanNumber);

//       if (!validation.isValid) {
//         setPhoneError(validation.message);
//       } else {
//         setPhoneError("");
//       }
//     } else {
//       setPhoneError("");
//     }
//   }, [phoneNumber, selectedCountryCode]);

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     setAvatar(file);

//     if (!avatarPreview) {
//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setAvatarPreview(reader.result);
//         };

//         reader.readAsDataURL(file);
//       }
//     }
//   };

//   // Handle phone number input change
//   const handlePhoneChange = (e) => {
//     // Get the raw input value
//     const inputValue = e.target.value;

//     // Remove any non-digit characters
//     const digitsOnly = inputValue.replace(/\D/g, "");

//     // Format the phone number
//     const formattedValue = formatPhoneNumber(
//       digitsOnly,
//       selectedCountry.digits
//     );

//     // Update state with formatted value
//     setPhoneNumber(formattedValue);
//   };

//   // Handle country code change
//   const handleCountryCodeChange = (e) => {
//     setSelectedCountryCode(e.target.value);
//     // Clear phone number when country changes to avoid validation issues
//     setPhoneNumber("");
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle OTP input
//   const handleOtpChange = (index, value) => {
//     // Only allow digits
//     if (!/^\d*$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Auto-focus next input
//     if (value && index < 5) {
//       const nextInput = document.getElementById(`otp-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   // Handle OTP input keydown
//   const handleOtpKeyDown = (index, e) => {
//     // Handle backspace
//     if (e.key === "Backspace") {
//       if (!otp[index] && index > 0) {
//         const prevInput = document.getElementById(`otp-${index - 1}`);
//         if (prevInput) prevInput.focus();
//       }
//     }
//   };

//   // Handle OTP paste
//   const handleOtpPaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData("text");

//     // Check if pasted content is numeric and has correct length
//     if (/^\d+$/.test(pastedData)) {
//       const digits = pastedData.split("").slice(0, 6);
//       const newOtp = [...otp];

//       digits.forEach((digit, index) => {
//         if (index < 6) newOtp[index] = digit;
//       });

//       setOtp(newOtp);

//       // Focus the last filled input or the next empty one
//       const lastIndex = Math.min(digits.length, 5);
//       const nextInput = document.getElementById(`otp-${lastIndex}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   // Send OTP directly using EmailJS
//   const sendOtpEmail = async (email, otpCode, name) => {
//     try {
//       const url = "https://api.emailjs.com/api/v1.0/email/send";
//       const data = {
//         service_id: process.env.NEXT_PUBLIC_SERVICE_ID,
//         template_id: process.env.NEXT_PUBLIC_TEMPLATE_ID,
//         user_id: process.env.NEXT_PUBLIC_USER_ID,
//         template_params: {
//           to_email: email,
//           to_name: name || "there",
//           subject: "Email Verification Code",
//           otp: otpCode,
//           message:
//             "Thank you for signing up! To complete your registration, please use the verification code above.",
//         },
//       };

//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         return { success: true };
//       } else {
//         return {
//           success: false,
//           error: `Failed with status: ${response.status}`,
//         };
//       }
//     } catch (error) {
//       console.error("Error sending email:", error);
//       return { success: false, error: error.message };
//     }
//   };

//   // Initial signup form submission
//   const handleSignup = async (e) => {
//     e.preventDefault();

//     // Remove spaces from phone number
//     const cleanPhoneNumber = phoneNumber.replace(/\s/g, "");

//     // Validate phone number before submission
//     const phoneValidation = validatePhoneNumber(
//       selectedCountryCode,
//       cleanPhoneNumber
//     );
//     if (!phoneValidation.isValid) {
//       alert(phoneValidation.message);
//       return;
//     }

//     // Password validation regex
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;

//     if (!formData.password.match(passwordRegex)) {
//       alert(
//         "Password must have at least 1 uppercase, 1 lowercase, 1 symbol, and 1 number. Password length should be between 8 and 20 characters."
//       );
//       return;
//     }

//     // Combine country code and phone number (without spaces)
//     const fullPhoneNumber = selectedCountryCode + cleanPhoneNumber;

//     // Save form data for OTP verification step
//     setFormData({
//       ...formData,
//       phone: fullPhoneNumber,
//     });

//     // Generate OTP
//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

//     // Send OTP email directly using EmailJS
//     const emailResult = await sendOtpEmail(
//       formData.email,
//       otpCode,
//       formData.name
//     );

//     if (!emailResult.success) {
//       toast.error("Failed to send verification email. Please try again.", {
//         id: "signup",
//       });
//       return;
//     }

//     // Create FormData for API call
//     const apiFormData = new FormData();
//     apiFormData.append("avatar", avatar);
//     apiFormData.append("name", formData.name);
//     apiFormData.append("email", formData.email);
//     apiFormData.append("phone", fullPhoneNumber);
//     apiFormData.append("password", formData.password);
//     apiFormData.append("sendOtp", "true"); // Tell backend to send OTP instead of completing registration
//     apiFormData.append("otp", otpCode); // Include the OTP we generated

//     try {
//       setFormSubmitted(true);
//       await signup(apiFormData);

//       // Move to OTP verification step immediately since we already sent the email
//       setStep(2);
//       setUserEmail(formData.email);

//       // Start countdown for resend button
//       setResendDisabled(true);
//       setCountdown(60);

//       toast.success("Verification code sent to your email", { id: "signup" });
//     } catch (err) {
//       toast.error("Signup failed. Please try again.", { id: "signup" });
//       setFormSubmitted(false);
//     }
//   };

//   // Verify OTP submission
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();

//     // Check if OTP is complete
//     const otpValue = otp.join("");
//     if (otpValue.length !== 6) {
//       setOtpError("Please enter all 6 digits");
//       return;
//     }

//     setIsVerifyingOtp(true);
//     setOtpError("");

//     try {
//       // Create verification data
//       const verificationData = new FormData();
//       verificationData.append("email", userEmail);
//       verificationData.append("otp", otpValue);
//       verificationData.append("verifyOtp", "true");

//       // Call the API to verify OTP
//       const response = await signup(verificationData);

//       if (response.data && response.data.acknowledgement) {
//         toast.success("Email verified successfully!", { id: "verify-otp" });
//         setStep(3); // Move to success step

//         // Redirect to signin after 2 seconds
//         setTimeout(() => {
//           window.open("/auth/signin", "_self");
//         }, 2000);
//       } else {
//         const errorMessage =
//           response.error?.data?.description || "Invalid verification code";
//         setOtpError(errorMessage);
//         toast.error(errorMessage, { id: "verify-otp" });
//       }
//     } catch (error) {
//       setOtpError("Verification failed. Please try again.");
//       toast.error("Verification failed", { id: "verify-otp" });
//     } finally {
//       setIsVerifyingOtp(false);
//     }
//   };

//   // Resend OTP
//   const handleResendOtp = async () => {
//     if (resendDisabled) return;

//     setResendDisabled(true);
//     setCountdown(60);

//     try {
//       toast.loading("Sending new verification code...", { id: "resend-otp" });

//       // Generate new OTP
//       const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

//       // Send OTP email directly using EmailJS
//       const emailResult = await sendOtpEmail(userEmail, otpCode, formData.name);

//       if (!emailResult.success) {
//         toast.error("Failed to send verification email. Please try again.", {
//           id: "resend-otp",
//         });
//         return;
//       }

//       // Create resend data
//       const resendData = new FormData();
//       resendData.append("email", userEmail);
//       resendData.append("resendOtp", "true");
//       resendData.append("otp", otpCode);

//       // Call the API to resend OTP
//       const response = await signup(resendData);

//       if (response.data && response.data.acknowledgement) {
//         toast.success("New verification code sent!", { id: "resend-otp" });
//         // Clear OTP fields
//         setOtp(["", "", "", "", "", ""]);
//       } else {
//         const errorMessage =
//           response.error?.data?.description || "Failed to send new code";
//         toast.error(errorMessage, { id: "resend-otp" });
//       }
//     } catch (error) {
//       toast.error("Failed to send new code", { id: "resend-otp" });
//     }
//   };

//   // Render different steps
//   const renderStep = () => {
//     switch (step) {
//       case 1: // Signup form
//         return (
//           <form
//             className="w-full flex flex-col gap-y-2"
//             onSubmit={handleSignup}
//           >
//             <label
//               htmlFor="avatar"
//               className="flex flex-col gap-y-2 w-fit mx-auto items-center"
//             >
//               <div
//                 className={
//                   "h-[120px] w-[120px] rounded-full transition-all flex flex-row justify-center items-center relative" +
//                   " " +
//                   (avatarPreview
//                     ? "ring-4 ring-indigo-100"
//                     : "border-2 border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50")
//                 }
//               >
//                 {avatarPreview ? (
//                   <div className="relative">
//                     <Image
//                       src={avatarPreview || "/placeholder.svg"}
//                       alt="avatar"
//                       height={120}
//                       width={120}
//                       className="rounded-full h-[120px] w-[120px] object-cover"
//                     />
//                     <button
//                       type="button"
//                       className="absolute -bottom-2 -right-2 p-2 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-colors"
//                       onClick={() => setAvatarPreview(null)}
//                     >
//                       <Trash className="h-4 w-4" />
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     <span className="text-sm flex flex-col justify-center items-center gap-y-2 text-center text-indigo-600">
//                       <Upload className="h-6 w-6" />
//                       Add Avatar <br /> 300x300
//                     </span>

//                     <input
//                       type="file"
//                       name="avatar"
//                       id="avatar"
//                       title="Dimension: 300x300"
//                       accept=".jpg, .jpeg, .png"
//                       className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
//                       onChange={handleAvatarChange}
//                       required
//                     />
//                   </>
//                 )}
//               </div>
//             </label>

//             <div className="space-y-4">
//               <label htmlFor="name" className="flex flex-col gap-y-1">
//                 <span className="text-sm font-medium text-gray-700">
//                   Full Name*
//                 </span>
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="John Doe"
//                   className="px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                   required
//                 />
//               </label>

//               <label htmlFor="email" className="flex flex-col gap-y-1">
//                 <span className="text-sm font-medium text-gray-700">
//                   Email Address*
//                 </span>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   placeholder="example@gmail.com"
//                   className="px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                   required
//                 />
//               </label>

//               <label htmlFor="password" className="flex flex-col gap-y-1">
//                 <span className="text-sm font-medium text-gray-700">
//                   Password*
//                 </span>
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   placeholder="Min. 8 characters with uppercase, lowercase, number & symbol"
//                   className="px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                   required
//                 />
//               </label>

//               <div>
//                 <span className="text-sm font-medium text-gray-700">
//                   Phone Number*
//                 </span>
//                 <div className="flex gap-2 mt-1">
//                   <select
//                     value={selectedCountryCode}
//                     onChange={handleCountryCodeChange}
//                     className="w-2/5 px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
//                   >
//                     {countryData.map((country) => (
//                       <option key={country.code} value={country.code}>
//                         {country.code} ({country.country})
//                       </option>
//                     ))}
//                   </select>
//                   <input
//                     type="tel"
//                     name="phoneNumber"
//                     id="phoneNumber"
//                     value={phoneNumber}
//                     onChange={handlePhoneChange}
//                     placeholder={`${selectedCountry.digits} digits required`}
//                     className={`w-3/5 px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${
//                       phoneError
//                         ? "border-red-500 focus:ring-red-200 focus:border-red-500"
//                         : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
//                     }`}
//                     required
//                   />
//                 </div>
//                 {phoneError ? (
//                   <p className="text-xs text-red-500 mt-1.5">{phoneError}</p>
//                 ) : (
//                   <p className="text-xs text-gray-500 mt-1.5">
//                     Enter {selectedCountry.digits} digits for{" "}
//                     {selectedCountry.country} without the country code
//                   </p>
//                 )}
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={isSignupLoading || phoneError}
//               className="mt-4 py-3 border border-indigo-600 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors drop-shadow-md disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed flex flex-row justify-center items-center text-base font-medium"
//             >
//               {isSignupLoading ? <Spinner className="mr-2" /> : null}
//               {isSignupLoading ? "Creating Account..." : "Sign Up"}
//             </button>
//           </form>
//         );

//       case 2: // OTP verification
//         return (
//           <form
//             className="w-full flex flex-col gap-y-4"
//             onSubmit={handleVerifyOtp}
//           >
//             <div className="text-center">
//               <h3 className="text-lg font-medium text-gray-800">
//                 Verify Your Email
//               </h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 We've sent a verification code to{" "}
//                 <span className="font-medium">{userEmail}</span>
//               </p>
//             </div>

//             <div className="flex flex-col items-center gap-y-4">
//               <div className="flex justify-center gap-2 w-full max-w-xs mx-auto mt-2">
//                 {otp.map((digit, index) => (
//                   <input
//                     key={index}
//                     id={`otp-${index}`}
//                     type="text"
//                     maxLength={1}
//                     value={digit}
//                     onChange={(e) => handleOtpChange(index, e.target.value)}
//                     onKeyDown={(e) => handleOtpKeyDown(index, e)}
//                     onPaste={index === 0 ? handleOtpPaste : undefined}
//                     className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                     required
//                   />
//                 ))}
//               </div>

//               {otpError && (
//                 <p className="text-sm text-red-500 mt-1">{otpError}</p>
//               )}

//               <button
//                 type="submit"
//                 disabled={isVerifyingOtp || otp.join("").length !== 6}
//                 className="w-full max-w-xs py-3 border border-indigo-600 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors drop-shadow-md disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed flex flex-row justify-center items-center text-base font-medium"
//               >
//                 {isVerifyingOtp ? <Spinner className="mr-2" /> : null}
//                 {isVerifyingOtp ? "Verifying..." : "Verify Email"}
//               </button>

//               <div className="text-center mt-2">
//                 <p className="text-sm text-gray-600">
//                   Didn't receive the code?{" "}
//                   <button
//                     type="button"
//                     onClick={handleResendOtp}
//                     disabled={resendDisabled}
//                     className={`font-medium ${
//                       resendDisabled
//                         ? "text-gray-400 cursor-not-allowed"
//                         : "text-indigo-600 hover:text-indigo-800"
//                     }`}
//                   >
//                     {resendDisabled ? `Resend in ${countdown}s` : "Resend Code"}
//                   </button>
//                 </p>
//               </div>
//             </div>
//           </form>
//         );

//       case 3: // Success
//         return (
//           <div className="w-full flex flex-col items-center gap-y-4 py-4">
//             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-8 w-8 text-green-600"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             </div>

//             <h3 className="text-xl font-semibold text-gray-800">
//               Registration Successful!
//             </h3>
//             <p className="text-center text-gray-600">
//               Your account has been created successfully. You will be redirected
//               to the login page.
//             </p>

//             <Link
//               href="/auth/signin"
//               className="mt-2 px-6 py-2.5 border border-indigo-600 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors drop-shadow-md text-sm font-medium"
//             >
//               Sign In Now
//             </Link>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <section className="min-w-full min-h-screen flex justify-center items-center p-2 bg-gradient-to-br from-blue-50 to-indigo-50">
//       <div className="max-w-lg w-full flex flex-col gap-y-2 border border-gray-200 p-3 sm:p-6 rounded-xl shadow-lg bg-white">
//         <div className="flex flex-row items-center gap-x-3">
//           <hr className="w-full border-gray-300" />
//           <Image
//             src="/logo.png"
//             alt="logo"
//             width={141}
//             height={40}
//             className="max-w-full cursor-pointer hover:opacity-80 transition-opacity"
//             onClick={() => router.push("/")}
//           />
//           <hr className="w-full border-gray-300" />
//         </div>

//         <h2 className="text-2xl font-semibold text-center text-gray-800">
//           {step === 1
//             ? "Create Account"
//             : step === 2
//             ? "Verify Email"
//             : "Welcome!"}
//         </h2>

//         {renderStep()}

//         {step === 1 && (
//           <>
//             <div className="flex flex-row justify-center items-center gap-x-4 text-sm mt-2">
//               <Link
//                 href="/auth/signin"
//                 className="text-indigo-600 hover:text-indigo-800 transition-colors"
//               >
//                 Sign In
//               </Link>
//               <span className="h-5 border-l border-gray-300" />
//               <Link
//                 href="/auth/forgot-password"
//                 className="text-indigo-600 hover:text-indigo-800 transition-colors"
//               >
//                 Forgot Password
//               </Link>
//             </div>

//             <p className="text-xs text-center text-gray-500 mt-2">
//               By signing up, you agree to our Terms of Service and Privacy
//               Policy
//             </p>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Signup;
