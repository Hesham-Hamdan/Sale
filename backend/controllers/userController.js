// import bcrypt from "bcryptjs";
// import User from "../models/userModel.js";
// import generateToken from "../utils/generateToken.js";

// // Note: The asyncHandler wrapper has been removed from all functions.

// export const createUser = async (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     throw new Error("Please fill all the inputs");
//   }

//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     res.status(400).send("User already exists");
//     return;
//   }

//   const newUser = new User({ email, username, password });

//   try {
//     await newUser.save();
//     generateToken(res, newUser._id);
//     res.status(201).json({
//       success: true,
//       data: {
//         id: newUser._id,
//         username: newUser.username,
//         email: newUser.email,
//         isAdmin: newUser.isAdmin,
//       },
//     });
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message || "Invalid user data");
//   }
// };

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   const existingUser = await User.findOne({ email }).select("+password");

//   if (!existingUser) {
//     throw new Error("Invalid Credentials");
//   }

//   const isPasswordValid = await bcrypt.compare(password, existingUser.password);

//   if (!isPasswordValid) {
//     throw new Error("Invalid Credentials");
//   }

//   generateToken(res, existingUser._id);
//   res.status(201).json({
//     success: true,
//     data: {
//       id: existingUser._id,
//       username: existingUser.username,
//       email: existingUser.email,
//       isAdmin: existingUser.isAdmin,
//     },
//   });
// };

// export const logoutCurrentUser = async (req, res) => {
//   res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
//   res.status(200).json({ message: "Logged out successfully" });
// };

// export const getAllUsers = async (req, res) => {
//   const users = await User.find({});

//   res.status(200).json({
//     success: true,
//     results: users.length,
//     data: {
//       users,
//     },
//   });
// };

// export const getCurrentUserProfile = (req, res) => {
//   const user = req.user; // Use the user object from the middleware

//   res.status(200).json({
//     id: user._id,
//     username: user.username,
//     email: user.email,
//     isAdmin: user.isAdmin,
//   });
// };

// export const updateCurrentUserProfile = async (req, res) => {
//   const user = req.user;

//   user.username = req.body.username || user.username;
//   user.email = req.body.email || user.email;

//   // Securely update the password ONLY if a new one is provided
//   if (req.body.password) {
//     user.password = req.body.password;
//   }

//   const updatedUser = await user.save();

//   res.status(200).json({
//     _id: updatedUser._id,
//     username: updatedUser.username,
//     email: updatedUser.email,
//     isAdmin: updatedUser.isAdmin,
//   });
// };

// export const deleteUserById = async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     res.status(404);
//     throw new Error("User not found");
//   }
//   await user.deleteOne();
//   res.status(204).json({ success: true });
// };

// export const getUserById = async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     res.status(404);
//     throw new Error("User not found");
//   }

//   res.status(200).json({ success: true, data: user });
// };

// export const updateUserById = async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     res.status(404);
//     throw new Error("User not found");
//   }

//   user.username = req.body.username || user.username;
//   user.email = req.body.email || user.email;
//   user.isAdmin = req.body.isAdmin || user.isAdmin;

//   await user.save();
//   res.status(200).json({ success: true, data: user });
// };

const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");
const generateToken = require("../utils/generateToken.js");

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).send("User already exists");
    return;
  }

  const newUser = new User({ email, username, password });

  try {
    await newUser.save();
    generateToken(res, newUser._id);
    res.status(201).json({
      success: true,
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message || "Invalid user data");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email }).select("+password");

  if (!existingUser) {
    throw new Error("Invalid Credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid) {
    throw new Error("Invalid Credentials");
  }

  generateToken(res, existingUser._id);
  res.status(201).json({
    success: true,
    data: {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
    },
  });
};

const logoutCurrentUser = async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    results: users.length,
    data: {
      users,
    },
  });
};

const getCurrentUserProfile = (req, res) => {
  const user = req.user; // Use the user object from the middleware

  res.status(200).json({
    id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
  });
};

const updateCurrentUserProfile = async (req, res) => {
  const user = req.user;

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;

  // Securely update the password ONLY if a new one is provided
  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
};

const deleteUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  await user.deleteOne();
  res.status(204).json({ success: true });
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({ success: true, data: user });
};

const updateUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin || user.isAdmin;

  await user.save();
  res.status(200).json({ success: true, data: user });
};

module.exports = {
  createUser,
  loginUser,
  updateUserById,
  getUserById,
  deleteUserById,
  updateCurrentUserProfile,
  getCurrentUserProfile,
  getAllUsers,
  logoutCurrentUser,
};
