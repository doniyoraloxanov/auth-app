import jwt from "jsonwebtoken";
import catchAsync from "./catchAsync.js";
import User from "../models/userModel.js";

const protect = catchAsync(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user || req.user.status === "blocked") {
        res.status(401).json({ message: "User is deleted" });
      }
      next();
    } catch (error) {
      console.log(error);
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
