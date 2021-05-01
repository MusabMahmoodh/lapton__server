import express from "express";
const router = express.Router();
import {
  getCategory,
  createCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getCategory).post(protect, admin, createCategory);

// router.get("/top", getTopCategory);
router
  .route("/:id")
  .get(getCategoryById)
  .delete(protect, admin, deleteCategory)
  .put(protect, admin, updateCategory);

export default router;
