import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";
import { getAllUsers, createUser, getUserByClerkId, syncUser, setupFirstAdmin } from "../controllers/user.controller.js";
const router = express.Router();

// Setup endpoint: Make first user admin
router.post("/setup/admin", authMiddleware, setupFirstAdmin);

// Any signed-in user can sync themselves to DB
router.post("/sync", authMiddleware, syncUser);

// Any signed-in user can create themselves
router.post("/", authMiddleware, createUser);

// Admin-only routes
router.get("/:clerkUserId", authMiddleware, adminMiddleware, getUserByClerkId);
router.get("/", authMiddleware, adminMiddleware, getAllUsers);

export default router;
