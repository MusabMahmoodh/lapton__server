import express from "express";
const router = express.Router();
import {
  getSubjects,
  createSubject,
  getSubjectById,
  deleteSubject,
  updateSubject,
  getHeadings,
  createHeading,
  getHeadingById,
  deleteHeading,
  updateHeading,
  getUnits,
  createUnit,
  getUnitById,
  deleteUnit,
  updateUnit,
} from "../controllers/variationsControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getSubjects).post(protect, admin, createSubject);
router.route("/units").get(getUnits).post(protect, admin, createUnit);
router.route("/headings").get(getHeadings).post(protect, admin, createHeading);
router
  .route("/:id")
  .get(getSubjectById)
  .delete(protect, admin, deleteSubject)
  .put(protect, admin, updateSubject);
router
  .route("/unit/:id")
  .get(getUnitById)
  .delete(protect, admin, deleteUnit)
  .put(protect, admin, updateUnit);
router
  .route("/heading/:id")
  .get(getHeadingById)
  .delete(protect, admin, deleteHeading)
  .put(protect, admin, updateHeading);

export default router;
