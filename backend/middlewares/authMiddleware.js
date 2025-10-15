const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

const authenticate = async (req, res, next) => {
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

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not Authorized as an admin");
  }
};

module.exports = { authenticate, authorizeAdmin };
