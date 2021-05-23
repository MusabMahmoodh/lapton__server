import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getTopProducts,
  getLessons,
  getLabs,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/search").get(getProducts).post(protect, admin, createProduct);
// router.route("/:id/reviews").post(protect, createProductReview);
// router.get("/top", getTopProducts);
router.get("/lessons/:id", getLessons);
router.get("/labs", getLabs);
// router.get("/labs/:id", getTopProducts);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
