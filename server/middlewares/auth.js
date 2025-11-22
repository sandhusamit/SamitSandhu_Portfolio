import jwt from "jsonwebtoken";
import { isTokenValid } from "../controllers/tokenController.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 1. Check DB if token is blacklisted/invalid
    const tokenCheck = await isTokenValid(token);
    if (!tokenCheck.valid) {
      return res.status(401).json({ message: tokenCheck.reason });
    }

    // 2. Verify JWT signature
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // contains id + role

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const requireAdmin = (req, res, next) => {
  console.log("User role:", req.user.role);
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
