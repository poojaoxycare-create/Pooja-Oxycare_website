import express from "express";
import {
  createOrder,
  getMyOrders,
  adminAcceptOrder,
  adminRejectOrder,
  getAllOrders,
  getRentedOrders,
} from "../controllers/order.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";

const router = express.Router();

// User routes (auth required) - put /my-orders BEFORE / to avoid route conflict
router.get("/my-orders", authMiddleware, getMyOrders);
router.post("/", authMiddleware, createOrder);

// Admin routes (auth + admin required)
router.get("/rented", authMiddleware, adminMiddleware, getRentedOrders);
router.get("/", authMiddleware, adminMiddleware, getAllOrders);
router.post("/:orderId/accept", authMiddleware, adminMiddleware, adminAcceptOrder);
router.post("/:orderId/reject", authMiddleware, adminMiddleware, adminRejectOrder);

export default router;
