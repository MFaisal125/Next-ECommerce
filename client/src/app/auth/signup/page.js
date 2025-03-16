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

  useEffect(() => {
    if (isLoading) {
      toast.loading("Signing up...", { id: "signup" });
    }

    if (data) {
      toast.success(data?.description, { id: "signup" });

      // open new tab
      setTimeout(() => {
        window.open("/auth/signin", "_self");
      }, 1000);
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "signup" });
    }
  }, [isLoading, data, error, router]);

  // Update the useEffect for phone validation to handle spaces properly
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
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);

    // Password validation regex
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;

    if (!e.target.password.value.match(passwordRegex)) {
      alert(
        "Password must have at least 1 uppercase, 1 lowercase, 1 symbol, and 1 number. Password length should be between 8 and 20 characters."
      );
      return;
    }

    // Combine country code and phone number (without spaces)
    const fullPhoneNumber = selectedCountryCode + cleanPhoneNumber;

    formData.append("phone", fullPhoneNumber);
    formData.append("password", e.target.password.value);

    try {
      await signup(formData);
      e.target.reset();
      setAvatarPreview(null);
      setPhoneNumber("");
    } catch (err) {
      // Error handling is done in the useEffect
    }
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
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Min. 8 characters with uppercase, lowercase, number & symbol"
                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                required
              />
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
