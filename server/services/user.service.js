// /* internal imports */
// const Brand = require("../models/brand.model");
// const Cart = require("../models/cart.model");
// const Category = require("../models/category.model");
// const Favorite = require("../models/favorite.model");
// const Product = require("../models/product.model");
// const Purchase = require("../models/purchase.model");
// const Review = require("../models/review.model");
// const Store = require("../models/store.model");
// const User = require("../models/user.model");
// const remove = require("../utils/remove.util");
// const token = require("../utils/token.util");

// /* sign up an user */
// exports.signUp = async (req, res) => {
//   const { body, file } = req;

//   // Create a new user instance
//   const user = new User({
//     name: body.name,
//     email: body.email,
//     password: body.password,
//     phone: body.phone,
//   });

//   if (file) {
//     user.avatar = {
//       url: file.path,
//       public_id: file.filename,
//     };
//   }

//   await user.save();

//   res.status(201).json({
//     acknowledgement: true,
//     message: "Created",
//     description: "User created successfully",
//   });

//   return user;
// };

// /* sign in an user */
// exports.signIn = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });

//   if (!user) {
//     res.status(404).json({
//       acknowledgement: false,
//       message: "Not Found",
//       description: "User not found",
//     });
//   } else {
//     const isPasswordValid = user.comparePassword(
//       req.body.password,
//       user.password
//     );

//     if (!isPasswordValid) {
//       res.status(401).json({
//         acknowledgement: false,
//         message: "Unauthorized",
//         description: "Invalid password",
//       });
//     } else {
//       if (user.status === "inactive") {
//         res.status(401).json({
//           acknowledgement: false,
//           message: "Unauthorized",
//           description: "Your seller account in a review state",
//         });
//       } else {
//         const accessToken = token({
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//           status: user.status,
//         });

//         res.status(200).json({
//           acknowledgement: true,
//           message: "OK",
//           description: "Login successful",
//           accessToken,
//         });
//       }
//     }
//   }
// };

// /* reset user password */
// exports.forgotPassword = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });

//   if (!user) {
//     res.status(404).json({
//       acknowledgement: false,
//       message: "Not Found",
//       description: "User not found",
//     });
//   } else {
//     const hashedPassword = user.encryptedPassword(req.body.password);

//     await User.findOneAndUpdate(
//       { email: req.body.email },
//       { password: hashedPassword },
//       { runValidators: false, returnOriginal: false }
//     );

//     res.status(200).json({
//       acknowledgement: true,
//       message: "OK",
//       description: "Password reset successful",
//     });
//   }
// };

// /* login persistance */
// exports.persistLogin = async (req, res) => {
//   const user = await User.findById(req.user._id).populate([
//     {
//       path: "cart",
//       populate: [
//         { path: "product", populate: ["brand", "category", "store"] },
//         "user",
//       ],
//     },
//     {
//       path: "reviews",
//       populate: ["product", "reviewer"],
//     },
//     {
//       path: "favorites",
//       populate: [
//         {
//           path: "product",
//           populate: ["brand", "category", "store"],
//         },
//         "user",
//       ],
//     },
//     {
//       path: "purchases",
//       populate: ["customer", "products.product"],
//     },
//     "store",
//     "brand",
//     "category",
//     "products",
//   ]);

//   if (!user) {
//     res.status(404).json({
//       acknowledgement: false,
//       message: "Not Found",
//       description: "User not found",
//     });
//   } else {
//     res.status(200).json({
//       acknowledgement: true,
//       message: "OK",
//       description: "Login successful",
//       data: user,
//     });
//   }
// };

// /* get all users */
// exports.getUsers = async (res) => {
//   const users = await User.find()
//     .populate("store")
//     .populate(["brand", "category", "store"]);

//   res.status(200).json({
//     acknowledgement: true,
//     message: "OK",
//     description: "Users retrieved successfully",
//     data: users,
//   });
// };

// /* get single user */
// exports.getUser = async (req, res) => {
//   const user = await User.findById(req.params.id).populate("store");

//   res.status(200).json({
//     acknowledgement: true,
//     message: "OK",
//     description: `${user.name}'s information retrieved successfully`,
//     data: user,
//   });
// };

// /* update user information */
// exports.updateUser = async (req, res) => {
//   const existingUser = await User.findById(req.user._id);
//   const user = req.body;

//   if (!req.body.avatar && req.file) {
//     await remove(existingUser.avatar?.public_id);

//     user.avatar = {
//       url: req.file.path,
//       public_id: req.file.filename,
//     };
//   }

//   const updatedUser = await User.findByIdAndUpdate(
//     existingUser._id,
//     { $set: user },
//     {
//       runValidators: true,
//     }
//   );

//   res.status(200).json({
//     acknowledgement: true,
//     message: "OK",
//     description: `${updatedUser.name}'s information updated successfully`,
//   });
// };

// /* update user information */
// exports.updateUserInfo = async (req, res) => {
//   const existingUser = await User.findById(req.params.id);
//   const user = req.body;

//   if (!req.body.avatar && req.file) {
//     await remove(existingUser.avatar?.public_id);

//     user.avatar = {
//       url: req.file.path,
//       public_id: req.file.filename,
//     };
//   }

//   const updatedUser = await User.findByIdAndUpdate(
//     existingUser._id,
//     { $set: user },
//     {
//       runValidators: true,
//     }
//   );

//   res.status(200).json({
//     acknowledgement: true,
//     message: "OK",
//     description: `${updatedUser.name}'s information updated successfully`,
//   });
// };

// /* delete user information */
// exports.deleteUser = async (req, res) => {
//   const user = await User.findByIdAndDelete(req.params.id);

//   // remove user avatar
//   await remove(user.avatar?.public_id);

//   // remove user cart
//   if (user.cart.length > 0) {
//     user.cart.forEach(async (cart) => {
//       await Cart.findByIdAndDelete(cart._id);
//     });
//   }

//   // remove user favorites
//   if (user.favorites.length > 0) {
//     user.favorites.forEach(async (favorite) => {
//       await Favorite.findByIdAndDelete(favorite._id);
//     });
//   }

//   // remove user reviews
//   if (user.reviews.length > 0) {
//     user.reviews.forEach(async (review) => {
//       await Review.findByIdAndDelete(review._id);
//     });
//   }

//   // remove user purchases
//   if (user.purchases.length > 0) {
//     user.purchases.forEach(async (purchase) => {
//       await Purchase.findByIdAndDelete(purchase._id);
//     });
//   }

//   // remove store
//   if (user.store) {
//     const store = await Store.findByIdAndDelete(user.store);

//     // remove store thumbnail
//     await remove(store?.thumbnail?.public_id);

//     // remove store products
//     store.products.forEach(async (prod) => {
//       const product = await Product.findByIdAndDelete(prod);

//       // remove product thumbnail
//       await remove(product?.thumbnail?.public_id);

//       // remove product gallery
//       product.gallery.forEach(async (gallery) => {
//         await remove(gallery?.public_id);
//       });

//       // remove product reviews
//       product.reviews.forEach(async (review) => {
//         await Review.findByIdAndDelete(review._id);
//       });
//     });
//   }

//   // remove category
//   if (user.category) {
//     const category = await Category.findByIdAndDelete(user.category);

//     // remove category thumbnail
//     await remove(category?.thumbnail?.public_id);

//     // remove category products
//     category.products.forEach(async (prod) => {
//       const product = await Product.findByIdAndDelete(prod);

//       // remove product thumbnail
//       await remove(product?.thumbnail?.public_id);

//       // remove product gallery
//       product.gallery.forEach(async (gallery) => {
//         await remove(gallery?.public_id);
//       });

//       // remove product reviews
//       product.reviews.forEach(async (review) => {
//         await Review.findByIdAndDelete(review._id);
//       });
//     });
//   }

//   // remove brand
//   if (user.brand) {
//     const brand = await Brand.findByIdAndDelete(user.brand);

//     // remove brand logo
//     await remove(brand?.logo?.public_id);

//     // remove brand products
//     brand.products.forEach(async (prod) => {
//       const product = await Product.findByIdAndDelete(prod);

//       // remove product thumbnail
//       await remove(product?.thumbnail?.public_id);

//       // remove product gallery
//       product.gallery.forEach(async (gallery) => {
//         await remove(gallery?.public_id);
//       });

//       // remove product reviews
//       product.reviews.forEach(async (review) => {
//         await Review.findByIdAndDelete(review._id);
//       });
//     });
//   }

//   // remove user from product's buyers array
//   if (user.products.length > 0) {
//     await Product.updateMany(
//       {},
//       {
//         $pull: {
//           buyers: user._id,
//         },
//       }
//     );
//   }

//   res.status(200).json({
//     acknowledgement: true,
//     message: "OK",
//     description: `${user.name}'s information deleted successfully`,
//   });
// };

// // seller request & approve
// exports.getSellers = async (res) => {
//   const users = await User.find({
//     role: "seller",
//     status: "inactive",
//   }).populate(["brand", "category", "store"]);

//   res.status(200).json({
//     acknowledgement: true,
//     message: "OK",
//     description: "Sellers retrieved successfully",
//     data: users,
//   });
// };

// exports.reviewSeller = async (req, res) => {
//   await User.findByIdAndUpdate(req.query.id, {
//     $set: req.body,
//   });

//   res.status(200).json({
//     acknowledgement: true,
//     message: "OK",
//     description: "Seller reviewed successfully",
//   });
// };
/* internal imports */
const Brand = require("../models/brand.model");
const Cart = require("../models/cart.model");
const Category = require("../models/category.model");
const Favorite = require("../models/favorite.model");
const Product = require("../models/product.model");
const Purchase = require("../models/purchase.model");
const Review = require("../models/review.model");
const Store = require("../models/store.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");
const token = require("../utils/token.util");

/* Helper function to validate international phone numbers */
const validatePhoneNumber = (phoneNumber) => {
  // Basic validation: must start with + and have at least 8 digits
  if (!phoneNumber.startsWith("+") || !/^\+\d{8,15}$/.test(phoneNumber)) {
    return {
      isValid: false,
      message: "Phone number must start with + and have between 8-15 digits",
    };
  }

  // Extract country code
  const countryCode = extractCountryCode(phoneNumber);

  // If we can identify the country, validate using specific rules
  if (countryCode) {
    // Get expected length for this country code (excluding the + and country code)
    const expectedLength = getExpectedLength(countryCode);
    const numberWithoutCode = phoneNumber.substring(countryCode.length + 1); // +1 for the + sign

    if (expectedLength && numberWithoutCode.length !== expectedLength) {
      return {
        isValid: false,
        message: `Phone number for country code ${countryCode} should have exactly ${expectedLength} digits after the country code`,
      };
    }
  }

  return { isValid: true };
};

/* Helper function to extract country code from phone number */
const extractCountryCode = (phoneNumber) => {
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
};

/* Helper function to get expected length for a country code */
const getExpectedLength = (countryCode) => {
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
};

/* sign up an user */
exports.signUp = async (req, res) => {
  try {
    const { body, file } = req;

    // Check if email already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return res.status(409).json({
        acknowledgement: false,
        message: "Conflict",
        description:
          "This email is already registered. Please use a different email or sign in.",
      });
    }

    // Validate phone number
    const phoneValidation = validatePhoneNumber(body.phone);
    if (!phoneValidation.isValid) {
      return res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: phoneValidation.message,
      });
    }

    // Create a new user instance
    const user = new User({
      name: body.name,
      email: body.email,
      password: body.password,
      phone: body.phone,
    });

    if (file) {
      user.avatar = {
        url: file.path,
        public_id: file.filename,
      };
    }

    await user.save();

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "User created successfully",
    });

    return user;
  } catch (error) {
    // Check for specific MongoDB error codes
    if (error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        acknowledgement: false,
        message: "Conflict",
        description: `This ${field} is already in use. Please use a different ${field}.`,
      });
    }

    // Check if it's a validation error from Mongoose
    if (error.name === "ValidationError") {
      // Extract specific field errors
      const errorMessages = {};

      for (const field in error.errors) {
        errorMessages[field] = error.errors[field].message;
      }

      // If the error is specifically about the phone field
      if (error.errors && error.errors.phone) {
        return res.status(400).json({
          acknowledgement: false,
          message: "Bad Request",
          description: error.errors.phone.message,
        });
      }

      // If the error is about the email field
      if (error.errors && error.errors.email) {
        return res.status(400).json({
          acknowledgement: false,
          message: "Bad Request",
          description: error.errors.email.message,
        });
      }

      // If the error is about the password field
      if (error.errors && error.errors.password) {
        return res.status(400).json({
          acknowledgement: false,
          message: "Bad Request",
          description: error.errors.password.message,
        });
      }

      // For other validation errors
      return res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: Object.values(error.errors)
          .map((err) => err.message)
          .join(", "),
      });
    }

    // For network or connection errors
    if (
      error.name === "MongoNetworkError" ||
      error.name === "MongooseServerSelectionError"
    ) {
      return res.status(503).json({
        acknowledgement: false,
        message: "Service Unavailable",
        description: "Database connection error. Please try again later.",
      });
    }

    // Log the error for debugging
    console.error("Signup error:", error);

    // For other types of errors
    return res.status(500).json({
      acknowledgement: false,
      message: "Internal Server Error",
      description: "Something went wrong. Please try again later.",
    });
  }
};

/* sign in an user */
exports.signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description:
          "No account found with this email. Please check your email or sign up.",
      });
    }

    const isPasswordValid = user.comparePassword(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        acknowledgement: false,
        message: "Unauthorized",
        description: "Incorrect password. Please try again.",
      });
    }

    if (user.status === "inactive") {
      return res.status(401).json({
        acknowledgement: false,
        message: "Unauthorized",
        description: "Your seller account is in a review state.",
      });
    }

    const accessToken = token({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Login successful",
      accessToken,
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Sign in error:", error);

    // For network or connection errors
    if (
      error.name === "MongoNetworkError" ||
      error.name === "MongooseServerSelectionError"
    ) {
      return res.status(503).json({
        acknowledgement: false,
        message: "Service Unavailable",
        description: "Database connection error. Please try again later.",
      });
    }

    // For other types of errors
    return res.status(500).json({
      acknowledgement: false,
      message: "Internal Server Error",
      description: "Something went wrong. Please try again later.",
    });
  }
};

/* reset user password */
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description:
          "No account found with this email. Please check your email.",
      });
    }

    const hashedPassword = user.encryptedPassword(req.body.password);

    await User.findOneAndUpdate(
      { email: req.body.email },
      { password: hashedPassword },
      { runValidators: false, returnOriginal: false }
    );

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Password reset successful",
    });
  } catch (error) {
    console.error("Password reset error:", error);

    return res.status(500).json({
      acknowledgement: false,
      message: "Internal Server Error",
      description: "Something went wrong. Please try again later.",
    });
  }
};

/* login persistance */
exports.persistLogin = async (req, res) => {
  const user = await User.findById(req.user._id).populate([
    {
      path: "cart",
      populate: [
        { path: "product", populate: ["brand", "category", "store"] },
        "user",
      ],
    },
    {
      path: "reviews",
      populate: ["product", "reviewer"],
    },
    {
      path: "favorites",
      populate: [
        {
          path: "product",
          populate: ["brand", "category", "store"],
        },
        "user",
      ],
    },
    {
      path: "purchases",
      populate: ["customer", "products.product"],
    },
    "store",
    "brand",
    "category",
    "products",
  ]);

  if (!user) {
    res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "User not found",
    });
  } else {
    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Login successful",
      data: user,
    });
  }
};

/* get all users */
exports.getUsers = async (res) => {
  const users = await User.find()
    .populate("store")
    .populate(["brand", "category", "store"]);

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: "Users retrieved successfully",
    data: users,
  });
};

/* get single user */
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id).populate("store");

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: `${user.name}'s information retrieved successfully`,
    data: user,
  });
};

/* update user information */
exports.updateUser = async (req, res) => {
  try {
    const existingUser = await User.findById(req.user._id);
    const user = req.body;

    // Validate phone number if it's being updated
    if (user.phone) {
      const phoneValidation = validatePhoneNumber(user.phone);
      if (!phoneValidation.isValid) {
        return res.status(400).json({
          acknowledgement: false,
          message: "Bad Request",
          description: phoneValidation.message,
        });
      }
    }

    if (!req.body.avatar && req.file) {
      await remove(existingUser.avatar?.public_id);

      user.avatar = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      existingUser._id,
      { $set: user },
      {
        runValidators: true,
      }
    );

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: `${updatedUser.name}'s information updated successfully`,
    });
  } catch (error) {
    // Check for duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        acknowledgement: false,
        message: "Conflict",
        description: `This ${field} is already in use. Please use a different ${field}.`,
      });
    }

    // Check for validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: Object.values(error.errors)
          .map((err) => err.message)
          .join(", "),
      });
    }

    console.error("Update user error:", error);
    return res.status(500).json({
      acknowledgement: false,
      message: "Internal Server Error",
      description: "Something went wrong. Please try again later.",
    });
  }
};

/* update user information */
exports.updateUserInfo = async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.id);
    const user = req.body;

    // Validate phone number if it's being updated
    if (user.phone) {
      const phoneValidation = validatePhoneNumber(user.phone);
      if (!phoneValidation.isValid) {
        return res.status(400).json({
          acknowledgement: false,
          message: "Bad Request",
          description: phoneValidation.message,
        });
      }
    }

    if (!req.body.avatar && req.file) {
      await remove(existingUser.avatar?.public_id);

      user.avatar = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      existingUser._id,
      { $set: user },
      {
        runValidators: true,
      }
    );

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: `${updatedUser.name}'s information updated successfully`,
    });
  } catch (error) {
    // Check for duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        acknowledgement: false,
        message: "Conflict",
        description: `This ${field} is already in use. Please use a different ${field}.`,
      });
    }

    // Check for validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: Object.values(error.errors)
          .map((err) => err.message)
          .join(", "),
      });
    }

    console.error("Update user info error:", error);
    return res.status(500).json({
      acknowledgement: false,
      message: "Internal Server Error",
      description: "Something went wrong. Please try again later.",
    });
  }
};

/* delete user information */
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  // remove user avatar
  await remove(user.avatar?.public_id);

  // remove user cart
  if (user.cart.length > 0) {
    user.cart.forEach(async (cart) => {
      await Cart.findByIdAndDelete(cart._id);
    });
  }

  // remove user favorites
  if (user.favorites.length > 0) {
    user.favorites.forEach(async (favorite) => {
      await Favorite.findByIdAndDelete(favorite._id);
    });
  }

  // remove user reviews
  if (user.reviews.length > 0) {
    user.reviews.forEach(async (review) => {
      await Review.findByIdAndDelete(review._id);
    });
  }

  // remove user purchases
  if (user.purchases.length > 0) {
    user.purchases.forEach(async (purchase) => {
      await Purchase.findByIdAndDelete(purchase._id);
    });
  }

  // remove store
  if (user.store) {
    const store = await Store.findByIdAndDelete(user.store);

    // remove store thumbnail
    await remove(store?.thumbnail?.public_id);

    // remove store products
    store.products.forEach(async (prod) => {
      const product = await Product.findByIdAndDelete(prod);

      // remove product thumbnail
      await remove(product?.thumbnail?.public_id);

      // remove product gallery
      product.gallery.forEach(async (gallery) => {
        await remove(gallery?.public_id);
      });

      // remove product reviews
      product.reviews.forEach(async (review) => {
        await Review.findByIdAndDelete(review._id);
      });
    });
  }

  // remove category
  if (user.category) {
    const category = await Category.findByIdAndDelete(user.category);

    // remove category thumbnail
    await remove(category?.thumbnail?.public_id);

    // remove category products
    category.products.forEach(async (prod) => {
      const product = await Product.findByIdAndDelete(prod);

      // remove product thumbnail
      await remove(product?.thumbnail?.public_id);

      // remove product gallery
      product.gallery.forEach(async (gallery) => {
        await remove(gallery?.public_id);
      });

      // remove product reviews
      product.reviews.forEach(async (review) => {
        await Review.findByIdAndDelete(review._id);
      });
    });
  }

  // remove brand
  if (user.brand) {
    const brand = await Brand.findByIdAndDelete(user.brand);

    // remove brand logo
    await remove(brand?.logo?.public_id);

    // remove brand products
    brand.products.forEach(async (prod) => {
      const product = await Product.findByIdAndDelete(prod);

      // remove product thumbnail
      await remove(product?.thumbnail?.public_id);

      // remove product gallery
      product.gallery.forEach(async (gallery) => {
        await remove(gallery?.public_id);
      });

      // remove product reviews
      product.reviews.forEach(async (review) => {
        await Review.findByIdAndDelete(review._id);
      });
    });
  }

  // remove user from product's buyers array
  if (user.products.length > 0) {
    await Product.updateMany(
      {},
      {
        $pull: {
          buyers: user._id,
        },
      }
    );
  }

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: `${user.name}'s information deleted successfully`,
  });
};

// seller request & approve
exports.getSellers = async (res) => {
  const users = await User.find({
    role: "seller",
    status: "inactive",
  }).populate(["brand", "category", "store"]);

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: "Sellers retrieved successfully",
    data: users,
  });
};

exports.reviewSeller = async (req, res) => {
  await User.findByIdAndUpdate(req.query.id, {
    $set: req.body,
  });

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: "Seller reviewed successfully",
  });
};

// /* internal imports */
// const Brand = require("../models/brand.model");
// const Cart = require("../models/cart.model");
// const Category = require("../models/category.model");
// const Favorite = require("../models/favorite.model");
// const Product = require("../models/product.model");
// const Purchase = require("../models/purchase.model");
// const Review = require("../models/review.model");
// const Store = require("../models/store.model");
// const User = require("../models/user.model");
// const remove = require("../utils/remove.util");
// const token = require("../utils/token.util");
// const axios = require("axios");

// /* EmailJS configuration */
// const emailjsServiceId = process.env.NEXT_PUBLIC_SERVICE_ID;
// const emailjsTemplateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
// const emailjsUserId = process.env.NEXT_PUBLIC_USER_ID;

// /* Helper function to send email using EmailJS */
// const sendEmail = async (to, subject, templateParams) => {
//   try {
//     const url = "https://api.emailjs.com/api/v1.0/email/send";
//     const data = {
//       service_id: emailjsServiceId,
//       template_id: emailjsTemplateId,
//       user_id: emailjsUserId,
//       template_params: {
//         to_email: to,
//         subject: subject,
//         ...templateParams,
//       },
//     };

//     const response = await axios.post(url, data, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.status === 200) {
//       return { success: true };
//     } else {
//       return {
//         success: false,
//         error: `Failed with status: ${response.status}`,
//       };
//     }
//   } catch (error) {
//     console.error("Email sending error:", error);
//     return { success: false, error: error.message };
//   }
// };

// /* Helper function to send OTP email */
// const sendOtpEmail = async (email, otp, name) => {
//   const subject = "Email Verification Code";

//   // Template parameters for EmailJS
//   const templateParams = {
//     to_name: name || "there",
//     otp: otp,
//     message:
//       "Thank you for signing up! To complete your registration, please use the verification code above. This code will expire in 15 minutes. If you didn't request this code, you can safely ignore this email.",
//   };

//   return await sendEmail(email, subject, templateParams);
// };

// /* Helper function to validate international phone numbers */
// const validatePhoneNumber = (phoneNumber) => {
//   // Basic validation: must start with + and have at least 8 digits
//   if (!phoneNumber.startsWith("+") || !/^\+\d{8,15}$/.test(phoneNumber)) {
//     return {
//       isValid: false,
//       message: "Phone number must start with + and have between 8-15 digits",
//     };
//   }

//   // Extract country code
//   const countryCode = extractCountryCode(phoneNumber);

//   // If we can identify the country, validate using specific rules
//   if (countryCode) {
//     // Get expected length for this country code (excluding the + and country code)
//     const expectedLength = getExpectedLength(countryCode);
//     const numberWithoutCode = phoneNumber.substring(countryCode.length + 1); // +1 for the + sign

//     if (expectedLength && numberWithoutCode.length !== expectedLength) {
//       return {
//         isValid: false,
//         message: `Phone number for country code ${countryCode} should have exactly ${expectedLength} digits after the country code`,
//       };
//     }
//   }

//   return { isValid: true };
// };

// /* Helper function to extract country code from phone number */
// const extractCountryCode = (phoneNumber) => {
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
// };

// /* Helper function to get expected length for a country code */
// const getExpectedLength = (countryCode) => {
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
// };

// /* sign up an user */
// exports.signUp = async (req, res) => {
//   try {
//     const { body, file } = req;
//     const sendOtp = body.sendOtp === "true" || body.sendOtp === true;

//     // Check if email already exists
//     const existingUser = await User.findOne({ email: body.email });
//     if (existingUser) {
//       // If user exists but is not verified, we can allow them to continue with verification
//       if (existingUser.isVerified) {
//         return res.status(409).json({
//           acknowledgement: false,
//           message: "Conflict",
//           description:
//             "Email already exists. Please use a different email or sign in.",
//         });
//       }
//     }

//     // Validate phone number
//     const phoneValidation = validatePhoneNumber(body.phone);
//     if (!phoneValidation.isValid) {
//       return res.status(400).json({
//         acknowledgement: false,
//         message: "Bad Request",
//         description: phoneValidation.message,
//       });
//     }

//     // Create or update user
//     let user;
//     if (existingUser && !existingUser.isVerified) {
//       // Update existing unverified user
//       user = existingUser;
//       user.name = body.name;
//       user.password = body.password;
//       user.phone = body.phone;

//       if (file) {
//         // Remove old avatar if exists
//         if (user.avatar && user.avatar.public_id) {
//           await remove(user.avatar.public_id);
//         }

//         user.avatar = {
//           url: file.path,
//           public_id: file.filename,
//         };
//       }
//     } else {
//       // Create a new user instance
//       user = new User({
//         name: body.name,
//         email: body.email,
//         password: body.password,
//         phone: body.phone,
//         isVerified: false, // Set as unverified initially
//       });

//       if (file) {
//         user.avatar = {
//           url: file.path,
//           public_id: file.filename,
//         };
//       }
//     }

//     // Generate OTP if sendOtp flag is true
//     if (sendOtp) {
//       const otp = user.generateOTP();

//       // Send OTP email
//       const emailResult = await sendOtpEmail(user.email, otp, user.name);

//       if (!emailResult.success) {
//         return res.status(500).json({
//           acknowledgement: false,
//           message: "Internal Server Error",
//           description: "Failed to send verification email. Please try again.",
//         });
//       }
//     }

//     // Save user
//     await user.save();

//     return res.status(201).json({
//       acknowledgement: true,
//       message: "Created",
//       description: sendOtp
//         ? "Verification code sent to your email. Please verify to complete registration."
//         : "User created successfully",
//     });
//   } catch (error) {
//     console.error("Signup error:", error);

//     // Check if it's a validation error from Mongoose
//     if (error.name === "ValidationError") {
//       // If the error is specifically about the phone field
//       if (error.errors && error.errors.phone) {
//         return res.status(400).json({
//           acknowledgement: false,
//           message: "Bad Request",
//           description: error.errors.phone.message,
//         });
//       }

//       // For other validation errors
//       return res.status(400).json({
//         acknowledgement: false,
//         message: "Bad Request",
//         description: Object.values(error.errors)
//           .map((err) => err.message)
//           .join(", "),
//       });
//     }

//     // For other types of errors
//     return res.status(500).json({
//       acknowledgement: false,
//       message: "Internal Server Error",
//       description: "An error occurred during signup",
//     });
//   }
// };

// /* Verify OTP */
// exports.verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         acknowledgement: false,
//         message: "Not Found",
//         description: "User not found",
//       });
//     }

//     // Verify OTP
//     const verification = user.verifyOTP(otp);

//     if (!verification.isValid) {
//       return res.status(400).json({
//         acknowledgement: false,
//         message: "Bad Request",
//         description: verification.message,
//       });
//     }

//     // Clear OTP and mark user as verified
//     user.clearOTP();
//     await user.save();

//     return res.status(200).json({
//       acknowledgement: true,
//       message: "OK",
//       description: "Email verified successfully",
//     });
//   } catch (error) {
//     console.error("OTP verification error:", error);
//     return res.status(500).json({
//       acknowledgement: false,
//       message: "Internal Server Error",
//       description: "An error occurred during verification",
//     });
//   }
// };

// /* Resend OTP */
// exports.resendOtp = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         acknowledgement: false,
//         message: "Not Found",
//         description: "User not found",
//       });
//     }

//     // Generate new OTP
//     const otp = user.generateOTP();

//     // Send OTP email
//     const emailResult = await sendOtpEmail(user.email, otp, user.name);

//     if (!emailResult.success) {
//       return res.status(500).json({
//         acknowledgement: false,
//         message: "Internal Server Error",
//         description: "Failed to send verification email. Please try again.",
//       });
//     }

//     // Save user with new OTP
//     await user.save();

//     return res.status(200).json({
//       acknowledgement: true,
//       message: "OK",
//       description: "New verification code sent successfully",
//     });
//   } catch (error) {
//     console.error("Resend OTP error:", error);
//     return res.status(500).json({
//       acknowledgement: false,
//       message: "Internal Server Error",
//       description: "An error occurred while sending verification code",
//     });
//   }
// };

// /* sign in an user */
// exports.signIn = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });

//     if (!user) {
//       return res.status(404).json({
//         acknowledgement: false,
//         message: "Not Found",
//         description: "User not found",
//       });
//     }

//     // Check if user is verified
//     if (!user.isVerified) {
//       // Generate new OTP for unverified user
//       const otp = user.generateOTP();
//       await sendOtpEmail(user.email, otp, user.name);
//       await user.save();

//       return res.status(403).json({
//         acknowledgement: false,
//         message: "Forbidden",
//         description:
//           "Email not verified. A new verification code has been sent to your email.",
//         needsVerification: true,
//         email: user.email,
//       });
//     }

//     const isPasswordValid = user.comparePassword(
//       req.body.password,
//       user.password
//     );

//     if (!isPasswordValid) {
//       return res.status(401).json({
//         acknowledgement: false,
//         message: "Unauthorized",
//         description: "Invalid password",
//       });
//     }

//     if (user.status === "inactive") {
//       return res.status(401).json({
//         acknowledgement: false,
//         message: "Unauthorized",
//         description: "Your seller account in a review state",
//       });
//     }

//     const accessToken = token({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       status: user.status,
//     });

//     return res.status(200).json({
//       acknowledgement: true,
//       message: "OK",
//       description: "Login successful",
//       accessToken,
//     });
//   } catch (error) {
//     console.error("Sign in error:", error);
//     return res.status(500).json({
//       acknowledgement: false,
//       message: "Internal Server Error",
//       description: "An error occurred during sign in",
//     });
//   }
// };

// /* reset user password */
// exports.forgotPassword = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });

//   if (!user) {
//     res.status(404).json({
//       acknowledgement: false,
//       message: "Not Found",
//       description: "User not found",
//     });
//   } else {
//     const hashedPassword = user.encryptedPassword(req.body.password);

//     await User.findOneAndUpdate(
//       { email: req.body.email },
//       { password: hashedPassword },
//       { runValidators: false, returnOriginal: false }
//     );

//     res.status(200).json({
//       acknowledgement: true,
//       message: "OK",
//       description: "Password reset successful",
//     });
//   }
// };

// /* login persistance */
// exports.persistLogin = async (req, res) => {
//   const user = await User.findById(req.user._id).populate([
//     {
//       path: "cart",
//       populate: [
//         { path: "product", populate: ["brand", "category", "store"] },
//         "user",
//       ],
//     },
//     {
//       path: "reviews",
//       populate: ["product", "reviewer"],
//     },
//     {
//       path: "favorites",
//       populate: [
//         {
//           path: "product",
//           populate: ["brand", "category", "store"],
//         },
//         "user",
//       ],
//     },
//     {
//       path: "purchases",
//       populate: ["customer", "products.product"],
//     },
//     "store",
//     "brand",
//     "category",
//     "products",
//   ]);

//   if (!user) {
//     res.status(404).json({
//       acknowledgement: false,
//       message: "Not Found",
//       description: "User not found",
//     });
//   } else {
//     res.status(200).json({
//       acknowledgement: true,
//       message: "OK",
//       description: "Login successful",
//       data: user,
//     });
//   }
// };

// /* get all users */
// exports.getUsers = async (res) => {
//   const users = await User.find()
//     .populate("store")
//     .populate(["brand", "category", "store"]);

//   res.status(200).json({
//     acknowledgement: true,
//     message: "OK",
//     description: "Users retrieved successfully",
//     data: users,
//   });
// };

// /* get single user */
// exports.getUser = async (req, res) => {
//   const user = await User.findById(req.params.id).populate("store");

//   res.status(200).json({
//     acknowledgement: true,
//     message: "OK",
//     description: `${user.name}'s information retrieved successfully`,
//     data: user,
//   });
// };

// /* update user information */
// exports.updateUser = async (req, res) => {
//   const existingUser = await User.findById(req.user._id);
//   const user = req.body;

//   // Validate phone number if it's being updated
//   if (user.phone) {
//     const phoneValidation = validatePhoneNumber(user.phone);
//     if (!phoneValidation.isValid) {
//       return res.status(400).json({
//         acknowledgement: false,
//         message: "Bad Request",
//         description: phoneValidation.message,
//       });
//     }
//   }

//   if (!req.body.avatar && req.file) {
//     await remove(existingUser.avatar?.public_id);

//     user.avatar = {
//       url: req.file.path,
//       public_id: req.file.filename,
//     };
//   }

//   const updatedUser = await User.findByIdAndUpdate(
//     existingUser._id,
//     { $set: user },
//     {
//       runValidators: true,
//     }
//   );

//   res.status(200).json({
//     acknowledgement: true,
//     message: "OK",
//     description: `${updatedUser.name}'s information updated successfully`,
//   });
// };

// /* update user information */
// exports.updateUserInfo = async (req, res) => {
//   const existingUser = await User.findById(req.params.id);
//   const user = req.body;

//   // Validate phone number if it's being updated
//   if (user.phone) {
//     const phoneValidation = validatePhoneNumber(user.phone);
//     if (!phoneValidation.isValid) {
//       return res.status(400).json({
//         acknowledgement: false,
//         message: "Bad Request",
//         description: phoneValidation.message,
//       });
//     }
//   }

//   if (!req.body.avatar && req.file) {
//     await remove(existingUser.avatar?.public_id);

//     user.avatar = {
//       url: req.file.path,
//       public_id: req.file.filename,
//     };
//   }

//   const updatedUser = await User.findByIdAndUpdate(
//     existingUser._id,
//     { $set: user },
//     {
//       runValidators: true,
//     }
//   );

//   res.status(200).json({
//     acknowledgement: true,
//     message: "OK",
//     description: `${updatedUser.name}'s information updated successfully`,
//   });
// };

// /* delete user information */
// exports.deleteUser = async (req, res) => {
//   const user = await User.findByIdAndDelete(req.params.id);

//   // remove user avatar
//   await remove(user.avatar?.public_id);

//   // remove user cart
//   if (user.cart.length > 0) {
//     user.cart.forEach(async (cart) => {
//       await Cart.findByIdAndDelete(cart._id);
//     });
//   }

//   // remove user favorites
//   if (user.favorites.length > 0) {
//     user.favorites.forEach(async (favorite) => {
//       await Favorite.findByIdAndDelete(favorite._id);
//     });
//   }

//   // remove user reviews
//   if (user.reviews.length > 0) {
//     user.reviews.forEach(async (review) => {
//       await Review.findByIdAndDelete(review._id);
//     });
//   }

//   // remove user purchases
//   if (user.purchases.length > 0) {
//     user.purchases.forEach(async (purchase) => {
//       await Purchase.findByIdAndDelete(purchase._id);
//     });
//   }

//   // remove store
//   if (user.store) {
//     const store = await Store.findByIdAndDelete(user.store);

//     // remove store thumbnail
//     await remove(store?.thumbnail?.public_id);

//     // remove store products
//     store.products.forEach(async (prod) => {
//       const product = await Product.findByIdAndDelete(prod);

//       // remove product thumbnail
//       await remove(product?.thumbnail?.public_id);

//       // remove product gallery
//       product.gallery.forEach(async (gallery) => {
//         await remove(gallery?.public_id);
//       });

//       // remove product reviews
//       product.reviews.forEach(async (review) => {
//         await Review.findByIdAndDelete(review._id);
//       });
//     });
//   }

//   // remove category
//   if (user.category) {
//     const category = await Category.findByIdAndDelete(user.category);

//     // remove category thumbnail
//     await remove(category?.thumbnail?.public_id);

//     // remove category products
//     category.products.forEach(async (prod) => {
//       const product = await Product.findByIdAndDelete(prod);

//       // remove product thumbnail
//       await remove(product?.thumbnail?.public_id);

//       // remove product gallery
//       product.gallery.forEach(async (gallery) => {
//         await remove(gallery?.public_id);
//       });

//       // remove product reviews
//       product.reviews.forEach(async (review) => {
//         await Review.findByIdAndDelete(review._id);
//       });
//     });
//   }

//   // remove brand
//   if (user.brand) {
//     const brand = await Brand.findByIdAndDelete(user.brand);

//     // remove brand logo
//     await remove(brand?.logo?.public_id);

//     // remove brand products
//     brand.products.forEach(async (prod) => {
//       const product = await Product.findByIdAndDelete(prod);

//       // remove product thumbnail
//       await remove(product?.thumbnail?.public_id);

//       // remove product gallery
//       product.gallery.forEach(async (gallery) => {
//         await remove(gallery?.public_id);
//       });

//       // remove product reviews
//       product.reviews.forEach(async (review) => {
//         await Review.findByIdAndDelete(review._id);
//       });
//     });
//   }

//   // remove user from product's buyers array
//   if (user.products.length > 0) {
//     await Product.updateMany(
//       {},
//       {
//         $pull: {
//           buyers: user._id,
//         },
//       }
//     );
//   }

//   res.status(200).json({
//     acknowledgement: true,
//     message: "OK",
//     description: `${user.name}'s information deleted successfully`,
//   });
// };

// // seller request & approve
// exports.getSellers = async (res) => {
//   const users = await User.find({
//     role: "seller",
//     status: "inactive",
//   }).populate(["brand", "category", "store"]);

//   res.status(200).json({
//     acknowledgement: true,
//     message: "OK",
//     description: "Sellers retrieved successfully",
//     data: users,
//   });
// };

// exports.reviewSeller = async (req, res) => {
//   await User.findByIdAndUpdate(req.query.id, {
//     $set: req.body,
//   });

//   res.status(200).json({
//     acknowledgement: true,
//     message: "OK",
//     description: "Seller reviewed successfully",
//   });
// };
