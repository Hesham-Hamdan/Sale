import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Both functions are exported as NAMED exports.
export const authenticate = async (req, res, next) => {
  let token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized. Invalid Token");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized. No Token");
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not Authorized as an admin");
  }
};
