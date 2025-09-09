// src/routes/authRoute.js
import express from "express";
import { Signup, Login } from "../controllers/authController.js";
import { userVerification } from "../middleware/authMiddleware.js";

const router = express.Router();

// Signup and Login
router.post("/signup", Signup);
router.post("/login", Login);

// Check if user is logged in
router.post("/", userVerification);

export default router;
