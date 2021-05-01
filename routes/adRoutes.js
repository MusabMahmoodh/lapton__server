import express from "express";
const router = express.Router();
import {
  getAdvertisement,
  createAdvertisement,
  getAdvertisementById,
  deleteAdvertisement,
  updateAdvertisement,
} from "../controllers/adController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAdvertisement)
  .post(protect, admin, createAdvertisement);

router
  .route("/:id")
  .get(getAdvertisementById)
  .delete(protect, admin, deleteAdvertisement)
  .put(protect, admin, updateAdvertisement);

export default router;
