const { canimApi } = require("../canim");

const authApi = canimApi.injectEndpoints({
  endpoints: (builder) => ({
    // signUp
    signUp: builder.mutation({
      query: (body) => ({
        url: "/user/sign-up",
        method: "POST",
        body,
      }),

      invalidatesTags: ["User"],
    }),

    // signIn
    signIn: builder.mutation({
      query: (body) => ({
        url: "/user/sign-in",
        method: "POST",
        body,
      }),
    }),

    // forgot password
    forgotPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/user/forgot-password",
        method: "PATCH",
        body: userInfo,
      }),
    }),

    // persist login
    persistLogin: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["User"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useForgotPasswordMutation,
  usePersistLoginQuery,
} = authApi;

// const { canimApi } = require("../canim");

// const authApi = canimApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // signUp - now handles initial signup, OTP verification, and OTP resending
//     signUp: builder.mutation({
//       query: (body) => {
//         // Check if this is an OTP verification request
//         if (body.get && body.get("verifyOtp")) {
//           return {
//             url: "/user/verify-otp",
//             method: "POST",
//             body,
//           };
//         }

//         // Check if this is an OTP resend request
//         if (body.get && body.get("resendOtp")) {
//           return {
//             url: "/user/resend-otp",
//             method: "POST",
//             body,
//           };
//         }

//         // Regular signup (with sendOtp flag if needed)
//         return {
//           url: "/user/sign-up",
//           method: "POST",
//           body,
//         };
//       },
//       invalidatesTags: ["User"],
//     }),

//     // signIn
//     signIn: builder.mutation({
//       query: (body) => ({
//         url: "/user/sign-in",
//         method: "POST",
//         body,
//       }),
//     }),

//     // forgot password
//     forgotPassword: builder.mutation({
//       query: (userInfo) => ({
//         url: "/user/forgot-password",
//         method: "PATCH",
//         body: userInfo,
//       }),
//     }),

//     // persist login
//     persistLogin: builder.query({
//       query: () => ({
//         url: "/user/me",
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       }),
//       providesTags: ["User"],
//     }),
//   }),
// });

// export const {
//   useSignUpMutation,
//   useSignInMutation,
//   useForgotPasswordMutation,
//   usePersistLoginQuery,
// } = authApi;

// const { canimApi } = require("../canim");

// const authApi = canimApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // signUp - now handles initial signup, OTP verification, and OTP resending
//     signUp: builder.mutation({
//       query: (body) => {
//         // Check if this is an OTP verification request
//         if (
//           body.get &&
//           typeof body.get === "function" &&
//           body.get("verifyOtp")
//         ) {
//           return {
//             url: "/user/verify-otp",
//             method: "POST",
//             body,
//           };
//         }

//         // Check if this is an OTP resend request
//         if (
//           body.get &&
//           typeof body.get === "function" &&
//           body.get("resendOtp")
//         ) {
//           return {
//             url: "/user/resend-otp",
//             method: "POST",
//             body: {
//               email: body.get("email"),
//             },
//           };
//         }

//         // Regular signup with sendOtp flag
//         // For FormData objects
//         if (body.get && typeof body.get === "function") {
//           // Clone the FormData to avoid modifying the original
//           const formData = new FormData();

//           // Copy all fields from the original FormData
//           for (const pair of body.entries()) {
//             formData.append(pair[0], pair[1]);
//           }

//           // Add sendOtp flag if not already present
//           if (!body.get("sendOtp")) {
//             formData.append("sendOtp", "true");
//           }

//           return {
//             url: "/user/sign-up",
//             method: "POST",
//             body: formData,
//           };
//         }

//         // For regular JSON objects
//         return {
//           url: "/user/sign-up",
//           method: "POST",
//           body: {
//             ...body,
//             sendOtp: true,
//           },
//         };
//       },
//       invalidatesTags: ["User"],
//     }),

//     // verifyOtp - separate endpoint for OTP verification
//     verifyOtp: builder.mutation({
//       query: (body) => ({
//         url: "/user/verify-otp",
//         method: "POST",
//         body,
//       }),
//     }),

//     // resendOtp - separate endpoint for resending OTP
//     resendOtp: builder.mutation({
//       query: (body) => ({
//         url: "/user/resend-otp",
//         method: "POST",
//         body,
//       }),
//     }),

//     // signIn
//     signIn: builder.mutation({
//       query: (body) => ({
//         url: "/user/sign-in",
//         method: "POST",
//         body,
//       }),
//     }),

//     // forgot password
//     forgotPassword: builder.mutation({
//       query: (userInfo) => ({
//         url: "/user/forgot-password",
//         method: "PATCH",
//         body: userInfo,
//       }),
//     }),

//     // persist login
//     persistLogin: builder.query({
//       query: () => ({
//         url: "/user/me",
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       }),
//       providesTags: ["User"],
//     }),
//   }),
// });

// export const {
//   useSignUpMutation,
//   useVerifyOtpMutation,
//   useResendOtpMutation,
//   useSignInMutation,
//   useForgotPasswordMutation,
//   usePersistLoginQuery,
// } = authApi;
