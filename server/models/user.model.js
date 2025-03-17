// /* external imports */
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const validator = require("validator");
// const { ObjectId } = mongoose.Schema.Types;

// /* create user schema */
// const userSchema = new mongoose.Schema(
//   {
//     // for full name
//     name: {
//       type: String,
//       required: [true, "Please, provide your full name"],
//       trim: true,
//       maxLength: [100, "Your name would be at most 100 characters"],
//     },

//     // for email
//     email: {
//       type: String,
//       required: [true, "Please, provide your email address"],
//       validate: [validator.isEmail, "Provide a valid email address"],
//       unique: [true, "Email already exist. Please, provide new"],
//     },

//     // for password
//     password: {
//       type: String,
//       required: [true, "Please, provide a strong password"],
//       validate: {
//         validator: (value) =>
//           validator.isStrongPassword(value, {
//             minUppercase: 1,
//             minLowercase: 1,
//             minNumbers: 1,
//             minSymbols: 1,
//           }),
//         message:
//           "Password {VALUE} should contain minimum 1 => uppercase, lowercase, number and symbol",
//       },
//       minLength: [8, "Password should be at least 8 characters"],
//       maxLength: [20, "Password should be at most 20 characters"],
//     },

//     // for avatar
//     avatar: {
//       url: {
//         type: String,
//         validate: [validator.isURL, "Please provide a valid avatar URL"],
//         default: "https://placehold.co/300x300.png",
//       },
//       public_id: {
//         type: String,
//         default: "N/A",
//       },
//     },

//     // for contact number
//     phone: {
//       type: String,
//       required: [
//         true,
//         "Please, provide your phone number, i.e.: +9203xxxxxxxx",
//       ],
//       validate: {
//         validator: (value) =>
//           validator.isMobilePhone(value, "en-PK", { strictMode: true }),
//         message:
//           "Phone number {VALUE} is not valid. Please, retry like +9203xxxxxxxxx",
//       },
//       unique: true,
//     },

//     // for role
//     role: {
//       type: String,
//       enum: ["admin", "buyer", "seller"],
//       default: "buyer",
//     },

//     // for account status
//     status: {
//       type: String,
//       enum: ["active", "inactive"],
//       default: "active",
//     },

//     // for cart
//     cart: [
//       {
//         type: ObjectId,
//         ref: "Cart",
//       },
//     ],

//     // for wishlist
//     favorites: [
//       {
//         type: ObjectId,
//         ref: "Favorite",
//       },
//     ],

//     // for reviews
//     reviews: [
//       {
//         type: ObjectId,
//         ref: "Review",
//       },
//     ],

//     // for purchases
//     purchases: [
//       {
//         type: ObjectId,
//         ref: "Purchase",
//       },
//     ],

//     // for store creation
//     store: {
//       type: ObjectId,
//       ref: "Store",
//     },

//     // for brand creation
//     brand: {
//       type: ObjectId,
//       ref: "Brand",
//     },

//     // for category creation
//     category: {
//       type: ObjectId,
//       ref: "Category",
//     },

//     // for buying products
//     products: [
//       {
//         type: ObjectId,
//         ref: "Product",
//       },
//     ],

//     // for address
//     address: {
//       type: String,
//       default: "N/A",
//       trim: true,
//       maxLength: [500, "Your address would be at most 500 characters"],
//     },

//     // for user account time stamps
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//     updatedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// /* encrypted user account password */
// userSchema.methods.encryptedPassword = function (password) {
//   const salt = bcrypt.genSaltSync(10);
//   const hashedPassword = bcrypt.hashSync(password, salt);

//   return hashedPassword;
// };

// /* middleware to encrypt password */
// userSchema.pre("save", async function (next) {
//   try {
//     // initialize encrypted password
//     if (!this.isModified("password")) {
//       return next();
//     }

//     // encrypt password
//     this.password = this.encryptedPassword(this.password);
//   } catch (error) {
//     next(error);
//   }
// });

// /* compare passwords as sign in proportion */
// userSchema.methods.comparePassword = function (password, hash) {
//   const isPasswordValid = bcrypt.compareSync(password, hash);
//   return isPasswordValid;
// };

// /* create user model schema */
// const User = mongoose.model("User", userSchema);

// /* export user schema */
// module.exports = User;

/* external imports */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

/* create user schema */
const userSchema = new mongoose.Schema(
  {
    // for full name
    name: {
      type: String,
      required: [true, "Please, provide your full name"],
      trim: true,
      maxLength: [100, "Your name would be at most 100 characters"],
    },

    // for email
    email: {
      type: String,
      required: [true, "Please, provide your email address"],
      validate: [validator.isEmail, "Provide a valid email address"],
      unique: [true, "Email already exist. Please, provide new"],
    },

    // for password
    password: {
      type: String,
      required: [true, "Please, provide a strong password"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minUppercase: 1,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          }),
        message:
          "Password {VALUE} should contain minimum 1 => uppercase, lowercase, number and symbol",
      },
      minLength: [8, "Password should be at least 8 characters"],
      maxLength: [20, "Password should be at most 20 characters"],
    },

    // for avatar
    avatar: {
      url: {
        type: String,
        validate: [validator.isURL, "Please provide a valid avatar URL"],
        default: "https://placehold.co/300x300.png",
      },
      public_id: {
        type: String,
        default: "N/A",
      },
    },

    // for contact number - dynamically supporting all countries
    phone: {
      type: String,
      required: [
        true,
        "Please provide your phone number with country code, i.e.: +1234567890",
      ],
      validate: {
        validator: (value) => {
          // Basic check: must start with + and have at least 8 digits
          if (!value.startsWith("+") || !/^\+\d{8,15}$/.test(value)) {
            return false;
          }

          // Get the country code from the phone number
          const countryCode = extractCountryCode(value);

          // If we can identify the country, validate using specific rules
          if (countryCode) {
            // Get expected length for this country code (excluding the + and country code)
            const expectedLength = getExpectedLength(countryCode);
            const numberWithoutCode = value.substring(countryCode.length + 1); // +1 for the + sign

            if (expectedLength && numberWithoutCode.length !== expectedLength) {
              return false;
            }

            // If we have a locale mapping for this country, use validator's isMobilePhone
            if (countryToLocale[countryCode]) {
              return validator.isMobilePhone(
                value,
                countryToLocale[countryCode],
                { strictMode: true }
              );
            }
          }

          // Fallback to general validation if country not identified or no specific rules
          return validator.isMobilePhone(value, "any", { strictMode: true });
        },
        message:
          "Phone number {VALUE} is not valid. Please provide a valid international format with country code (e.g., +1234567890)",
      },
      unique: true,
    },

    // for role
    role: {
      type: String,
      enum: ["admin", "buyer", "seller"],
      default: "buyer",
    },

    // for account status
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // for cart
    cart: [
      {
        type: ObjectId,
        ref: "Cart",
      },
    ],

    // for wishlist
    favorites: [
      {
        type: ObjectId,
        ref: "Favorite",
      },
    ],

    // for reviews
    reviews: [
      {
        type: ObjectId,
        ref: "Review",
      },
    ],

    // for purchases
    purchases: [
      {
        type: ObjectId,
        ref: "Purchase",
      },
    ],

    // for store creation
    store: {
      type: ObjectId,
      ref: "Store",
    },

    // for brand creation
    brand: {
      type: ObjectId,
      ref: "Brand",
    },

    // for category creation
    category: {
      type: ObjectId,
      ref: "Category",
    },

    // for buying products
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],

    // for address
    address: {
      type: String,
      default: "N/A",
      trim: true,
      maxLength: [500, "Your address would be at most 500 characters"],
    },

    // for user account time stamps
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Helper function to extract country code from phone number
function extractCountryCode(phoneNumber) {
  // Remove the + sign
  const number = phoneNumber.substring(1);

  // Common country codes (add more as needed)
  const commonCodes = [
    "1",
    "7",
    "20",
    "27",
    "30",
    "31",
    "32",
    "33",
    "34",
    "36",
    "39",
    "40",
    "41",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "81",
    "82",
    "84",
    "86",
    "90",
    "91",
    "92",
    "93",
    "94",
    "95",
    "98",
    "212",
    "213",
    "216",
    "218",
    "220",
    "221",
    "222",
    "223",
    "224",
    "225",
    "226",
    "227",
    "228",
    "229",
    "230",
    "231",
    "232",
    "233",
    "234",
    "235",
    "236",
    "237",
    "238",
    "239",
    "240",
    "241",
    "242",
    "243",
    "244",
    "245",
    "246",
    "247",
    "248",
    "249",
    "250",
    "251",
    "252",
    "253",
    "254",
    "255",
    "256",
    "257",
    "258",
    "260",
    "261",
    "262",
    "263",
    "264",
    "265",
    "266",
    "267",
    "268",
    "269",
    "290",
    "291",
    "297",
    "298",
    "299",
    "350",
    "351",
    "352",
    "353",
    "354",
    "355",
    "356",
    "357",
    "358",
    "359",
    "370",
    "371",
    "372",
    "373",
    "374",
    "375",
    "376",
    "377",
    "378",
    "380",
    "381",
    "382",
    "383",
    "385",
    "386",
    "387",
    "389",
    "420",
    "421",
    "423",
    "500",
    "501",
    "502",
    "503",
    "504",
    "505",
    "506",
    "507",
    "508",
    "509",
    "590",
    "591",
    "592",
    "593",
    "594",
    "595",
    "596",
    "597",
    "598",
    "599",
    "670",
    "672",
    "673",
    "674",
    "675",
    "676",
    "677",
    "678",
    "679",
    "680",
    "681",
    "682",
    "683",
    "685",
    "686",
    "687",
    "688",
    "689",
    "690",
    "691",
    "692",
    "850",
    "852",
    "853",
    "855",
    "856",
    "880",
    "886",
    "960",
    "961",
    "962",
    "963",
    "964",
    "965",
    "966",
    "967",
    "968",
    "970",
    "971",
    "972",
    "973",
    "974",
    "975",
    "976",
    "977",
    "992",
    "993",
    "994",
    "995",
    "996",
    "998",
  ];

  // Try to match the country code
  for (const code of commonCodes) {
    if (number.startsWith(code)) {
      return code;
    }
  }

  return null;
}

// Helper function to get expected length for a country code
function getExpectedLength(countryCode) {
  // Map of country codes to expected number of digits (excluding country code)
  const countryDigits = {
    1: 10, // US/Canada
    44: 10, // UK
    91: 10, // India
    92: 10, // Pakistan
    86: 11, // China
    33: 9, // France
    49: 10, // Germany
    81: 10, // Japan
    7: 10, // Russia
    55: 11, // Brazil
    52: 10, // Mexico
    61: 9, // Australia
    39: 10, // Italy
    34: 9, // Spain
    82: 10, // South Korea
    31: 9, // Netherlands
    90: 10, // Turkey
    966: 9, // Saudi Arabia
    971: 9, // UAE
    20: 10, // Egypt
    27: 9, // South Africa
    234: 10, // Nigeria
    254: 9, // Kenya
    880: 10, // Bangladesh
    84: 9, // Vietnam
    62: 10, // Indonesia
    63: 10, // Philippines
    60: 9, // Malaysia
    65: 8, // Singapore
    66: 9, // Thailand
  };

  return countryDigits[countryCode] || null;
}

// Map of country codes to validator locales
const countryToLocale = {
  1: "en-US", // United States
  44: "en-GB", // United Kingdom
  91: "en-IN", // India
  92: "en-PK", // Pakistan
  86: "zh-CN", // China
  33: "fr-FR", // France
  49: "de-DE", // Germany
  81: "ja-JP", // Japan
  7: "ru-RU", // Russia
  55: "pt-BR", // Brazil
  52: "es-MX", // Mexico
  61: "en-AU", // Australia
  39: "it-IT", // Italy
  34: "es-ES", // Spain
  82: "ko-KR", // South Korea
  31: "nl-NL", // Netherlands
  90: "tr-TR", // Turkey
  966: "ar-SA", // Saudi Arabia
  971: "ar-AE", // UAE
  20: "ar-EG", // Egypt
  27: "en-ZA", // South Africa
  234: "en-NG", // Nigeria
  254: "en-KE", // Kenya
  880: "bn-BD", // Bangladesh
  84: "vi-VN", // Vietnam
  62: "id-ID", // Indonesia
  63: "fil-PH", // Philippines
  60: "ms-MY", // Malaysia
  65: "en-SG", // Singapore
  66: "th-TH", // Thailand
  // Add more mappings as needed
};

/* encrypted user account password */
userSchema.methods.encryptedPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

/* middleware to encrypt password */
userSchema.pre("save", async function (next) {
  try {
    // initialize encrypted password
    if (!this.isModified("password")) {
      return next();
    }

    // encrypt password
    this.password = this.encryptedPassword(this.password);
  } catch (error) {
    next(error);
  }
});

/* compare passwords as sign in proportion */
userSchema.methods.comparePassword = (password, hash) => {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

/* create user model schema */
const User = mongoose.model("User", userSchema);

/* export user schema */
module.exports = User;

// /* external imports */
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const validator = require("validator");
// const crypto = require("crypto");
// const { ObjectId } = mongoose.Schema.Types;

// /* create user schema */
// const userSchema = new mongoose.Schema(
//   {
//     // for full name
//     name: {
//       type: String,
//       required: [true, "Please, provide your full name"],
//       trim: true,
//       maxLength: [100, "Your name would be at most 100 characters"],
//     },

//     // for email
//     email: {
//       type: String,
//       required: [true, "Please, provide your email address"],
//       validate: [validator.isEmail, "Provide a valid email address"],
//       unique: [true, "Email already exist. Please, provide new"],
//     },

//     // for email verification
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },

//     // for OTP verification
//     otp: {
//       code: {
//         type: String,
//         default: null,
//       },
//       expiresAt: {
//         type: Date,
//         default: null,
//       },
//     },

//     // for password
//     password: {
//       type: String,
//       required: [true, "Please, provide a strong password"],
//       validate: {
//         validator: (value) =>
//           validator.isStrongPassword(value, {
//             minUppercase: 1,
//             minLowercase: 1,
//             minNumbers: 1,
//             minSymbols: 1,
//           }),
//         message:
//           "Password {VALUE} should contain minimum 1 => uppercase, lowercase, number and symbol",
//       },
//       minLength: [8, "Password should be at least 8 characters"],
//       maxLength: [20, "Password should be at most 20 characters"],
//     },

//     // for avatar
//     avatar: {
//       url: {
//         type: String,
//         validate: [validator.isURL, "Please provide a valid avatar URL"],
//         default: "https://placehold.co/300x300.png",
//       },
//       public_id: {
//         type: String,
//         default: "N/A",
//       },
//     },

//     // for contact number - dynamically supporting all countries
//     phone: {
//       type: String,
//       required: [
//         true,
//         "Please provide your phone number with country code, i.e.: +1234567890",
//       ],
//       validate: {
//         validator: (value) => {
//           // Basic check: must start with + and have at least 8 digits
//           if (!value.startsWith("+") || !/^\+\d{8,15}$/.test(value)) {
//             return false;
//           }

//           // Get the country code from the phone number
//           const countryCode = extractCountryCode(value);

//           // If we can identify the country, validate using specific rules
//           if (countryCode) {
//             // Get expected length for this country code (excluding the + and country code)
//             const expectedLength = getExpectedLength(countryCode);
//             const numberWithoutCode = value.substring(countryCode.length + 1); // +1 for the + sign

//             if (expectedLength && numberWithoutCode.length !== expectedLength) {
//               return false;
//             }

//             // If we have a locale mapping for this country, use validator's isMobilePhone
//             if (countryToLocale[countryCode]) {
//               return validator.isMobilePhone(
//                 value,
//                 countryToLocale[countryCode],
//                 { strictMode: true }
//               );
//             }
//           }

//           // Fallback to general validation if country not identified or no specific rules
//           return validator.isMobilePhone(value, "any", { strictMode: true });
//         },
//         message:
//           "Phone number {VALUE} is not valid. Please provide a valid international format with country code (e.g., +1234567890)",
//       },
//       unique: true,
//     },

//     // for role
//     role: {
//       type: String,
//       enum: ["admin", "buyer", "seller"],
//       default: "buyer",
//     },

//     // for account status
//     status: {
//       type: String,
//       enum: ["active", "inactive"],
//       default: "active",
//     },

//     // for cart
//     cart: [
//       {
//         type: ObjectId,
//         ref: "Cart",
//       },
//     ],

//     // for wishlist
//     favorites: [
//       {
//         type: ObjectId,
//         ref: "Favorite",
//       },
//     ],

//     // for reviews
//     reviews: [
//       {
//         type: ObjectId,
//         ref: "Review",
//       },
//     ],

//     // for purchases
//     purchases: [
//       {
//         type: ObjectId,
//         ref: "Purchase",
//       },
//     ],

//     // for store creation
//     store: {
//       type: ObjectId,
//       ref: "Store",
//     },

//     // for brand creation
//     brand: {
//       type: ObjectId,
//       ref: "Brand",
//     },

//     // for category creation
//     category: {
//       type: ObjectId,
//       ref: "Category",
//     },

//     // for buying products
//     products: [
//       {
//         type: ObjectId,
//         ref: "Product",
//       },
//     ],

//     // for address
//     address: {
//       type: String,
//       default: "N/A",
//       trim: true,
//       maxLength: [500, "Your address would be at most 500 characters"],
//     },

//     // for user account time stamps
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//     updatedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// // Helper function to extract country code from phone number
// function extractCountryCode(phoneNumber) {
//   // Remove the + sign
//   const number = phoneNumber.substring(1);

//   // Common country codes (add more as needed)
//   const commonCodes = [
//     "1",
//     "7",
//     "20",
//     "27",
//     "30",
//     "31",
//     "32",
//     "33",
//     "34",
//     "36",
//     "39",
//     "40",
//     "41",
//     "43",
//     "44",
//     "45",
//     "46",
//     "47",
//     "48",
//     "49",
//     "51",
//     "52",
//     "53",
//     "54",
//     "55",
//     "56",
//     "57",
//     "58",
//     "60",
//     "61",
//     "62",
//     "63",
//     "64",
//     "65",
//     "66",
//     "81",
//     "82",
//     "84",
//     "86",
//     "90",
//     "91",
//     "92",
//     "93",
//     "94",
//     "95",
//     "98",
//     "212",
//     "213",
//     "216",
//     "218",
//     "220",
//     "221",
//     "222",
//     "223",
//     "224",
//     "225",
//     "226",
//     "227",
//     "228",
//     "229",
//     "230",
//     "231",
//     "232",
//     "233",
//     "234",
//     "235",
//     "236",
//     "237",
//     "238",
//     "239",
//     "240",
//     "241",
//     "242",
//     "243",
//     "244",
//     "245",
//     "246",
//     "247",
//     "248",
//     "249",
//     "250",
//     "251",
//     "252",
//     "253",
//     "254",
//     "255",
//     "256",
//     "257",
//     "258",
//     "260",
//     "261",
//     "262",
//     "263",
//     "264",
//     "265",
//     "266",
//     "267",
//     "268",
//     "269",
//     "290",
//     "291",
//     "297",
//     "298",
//     "299",
//     "350",
//     "351",
//     "352",
//     "353",
//     "354",
//     "355",
//     "356",
//     "357",
//     "358",
//     "359",
//     "370",
//     "371",
//     "372",
//     "373",
//     "374",
//     "375",
//     "376",
//     "377",
//     "378",
//     "380",
//     "381",
//     "382",
//     "383",
//     "385",
//     "386",
//     "387",
//     "389",
//     "420",
//     "421",
//     "423",
//     "500",
//     "501",
//     "502",
//     "503",
//     "504",
//     "505",
//     "506",
//     "507",
//     "508",
//     "509",
//     "590",
//     "591",
//     "592",
//     "593",
//     "594",
//     "595",
//     "596",
//     "597",
//     "598",
//     "599",
//     "670",
//     "672",
//     "673",
//     "674",
//     "675",
//     "676",
//     "677",
//     "678",
//     "679",
//     "680",
//     "681",
//     "682",
//     "683",
//     "685",
//     "686",
//     "687",
//     "688",
//     "689",
//     "690",
//     "691",
//     "692",
//     "850",
//     "852",
//     "853",
//     "855",
//     "856",
//     "880",
//     "886",
//     "960",
//     "961",
//     "962",
//     "963",
//     "964",
//     "965",
//     "966",
//     "967",
//     "968",
//     "970",
//     "971",
//     "972",
//     "973",
//     "974",
//     "975",
//     "976",
//     "977",
//     "992",
//     "993",
//     "994",
//     "995",
//     "996",
//     "998",
//   ];

//   // Try to match the country code
//   for (const code of commonCodes) {
//     if (number.startsWith(code)) {
//       return code;
//     }
//   }

//   return null;
// }

// // Helper function to get expected length for a country code
// function getExpectedLength(countryCode) {
//   // Map of country codes to expected number of digits (excluding country code)
//   const countryDigits = {
//     1: 10, // US/Canada
//     44: 10, // UK
//     91: 10, // India
//     92: 10, // Pakistan
//     86: 11, // China
//     33: 9, // France
//     49: 10, // Germany
//     81: 10, // Japan
//     7: 10, // Russia
//     55: 11, // Brazil
//     52: 10, // Mexico
//     61: 9, // Australia
//     39: 10, // Italy
//     34: 9, // Spain
//     82: 10, // South Korea
//     31: 9, // Netherlands
//     90: 10, // Turkey
//     966: 9, // Saudi Arabia
//     971: 9, // UAE
//     20: 10, // Egypt
//     27: 9, // South Africa
//     234: 10, // Nigeria
//     254: 9, // Kenya
//     880: 10, // Bangladesh
//     84: 9, // Vietnam
//     62: 10, // Indonesia
//     63: 10, // Philippines
//     60: 9, // Malaysia
//     65: 8, // Singapore
//     66: 9, // Thailand
//   };

//   return countryDigits[countryCode] || null;
// }

// // Map of country codes to validator locales
// const countryToLocale = {
//   1: "en-US", // United States
//   44: "en-GB", // United Kingdom
//   91: "en-IN", // India
//   92: "en-PK", // Pakistan
//   86: "zh-CN", // China
//   33: "fr-FR", // France
//   49: "de-DE", // Germany
//   81: "ja-JP", // Japan
//   7: "ru-RU", // Russia
//   55: "pt-BR", // Brazil
//   52: "es-MX", // Mexico
//   61: "en-AU", // Australia
//   39: "it-IT", // Italy
//   34: "es-ES", // Spain
//   82: "ko-KR", // South Korea
//   31: "nl-NL", // Netherlands
//   90: "tr-TR", // Turkey
//   966: "ar-SA", // Saudi Arabia
//   971: "ar-AE", // UAE
//   20: "ar-EG", // Egypt
//   27: "en-ZA", // South Africa
//   234: "en-NG", // Nigeria
//   254: "en-KE", // Kenya
//   880: "bn-BD", // Bangladesh
//   84: "vi-VN", // Vietnam
//   62: "id-ID", // Indonesia
//   63: "fil-PH", // Philippines
//   60: "ms-MY", // Malaysia
//   65: "en-SG", // Singapore
//   66: "th-TH", // Thailand
//   // Add more mappings as needed
// };

// /* encrypted user account password */
// userSchema.methods.encryptedPassword = (password) => {
//   const salt = bcrypt.genSaltSync(10);
//   const hashedPassword = bcrypt.hashSync(password, salt);

//   return hashedPassword;
// };

// /* middleware to encrypt password */
// userSchema.pre("save", async function (next) {
//   try {
//     // initialize encrypted password
//     if (!this.isModified("password")) {
//       return next();
//     }

//     // encrypt password
//     this.password = this.encryptedPassword(this.password);
//   } catch (error) {
//     next(error);
//   }
// });

// /* compare passwords as sign in proportion */
// userSchema.methods.comparePassword = (password, hash) => {
//   const isPasswordValid = bcrypt.compareSync(password, hash);
//   return isPasswordValid;
// };

// /* OTP generation method */
// userSchema.methods.generateOTP = function () {
//   // Generate a 6-digit OTP
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();

//   // Set OTP expiration (15 minutes from now)
//   const expiresAt = new Date();
//   expiresAt.setMinutes(expiresAt.getMinutes() + 15);

//   // Store OTP and expiration in user document
//   this.otp = {
//     code: otp,
//     expiresAt: expiresAt,
//   };

//   return otp;
// };

// /* Verify OTP method */
// userSchema.methods.verifyOTP = function (otpToVerify) {
//   // Check if OTP exists and hasn't expired
//   if (!this.otp.code || !this.otp.expiresAt) {
//     return {
//       isValid: false,
//       message: "No OTP found. Please request a new verification code.",
//     };
//   }

//   // Check if OTP has expired
//   if (new Date() > this.otp.expiresAt) {
//     return {
//       isValid: false,
//       message: "OTP has expired. Please request a new verification code.",
//     };
//   }

//   // Check if OTP matches
//   if (this.otp.code !== otpToVerify) {
//     return {
//       isValid: false,
//       message: "Invalid verification code. Please try again.",
//     };
//   }

//   // OTP is valid
//   return {
//     isValid: true,
//     message: "OTP verified successfully.",
//   };
// };

// /* Clear OTP after successful verification */
// userSchema.methods.clearOTP = function () {
//   this.otp = {
//     code: null,
//     expiresAt: null,
//   };
//   this.isVerified = true;
// };

// /* create user model schema */
// const User = mongoose.model("User", userSchema);

// /* export user schema */
// module.exports = User;
