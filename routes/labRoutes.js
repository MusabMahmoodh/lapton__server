import express from "express";
const router = express.Router();
import {
  getLab,
  createLab,
  getLabById,
  deleteLab,
  updateLab,
} from "../controllers/labController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getLab).post(protect, admin, createLab);

// router.get("/top", getTopLab);
router
  .route("/:id")
  .get(getLabById)
  .delete(protect, admin, deleteLab)
  .put(protect, admin, updateLab);

export default router;
