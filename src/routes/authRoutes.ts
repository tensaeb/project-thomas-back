import express from "express";
import { registerUser, signInUser } from "../controllers/authController";

const router = express.Router();

// Define routes
router.post("/register", registerUser);
router.post("/signin", signInUser);

export default router;
