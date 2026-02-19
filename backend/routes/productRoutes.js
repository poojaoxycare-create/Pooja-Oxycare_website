import express from "express";
import multer from "multer";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";

const router = express.Router();

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  // Only allow image files
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
});

// Public
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Protected - Admin only
router.post("/", authMiddleware, adminMiddleware, upload.single("image"), createProduct);
router.put("/:id", authMiddleware, adminMiddleware, upload.single("image"), updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

export default router;
