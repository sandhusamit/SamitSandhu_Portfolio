import express from "express";


// middleware/checkRole.js
export function requireAdmin() {
    return (req, res, next) => {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    };
  }
  