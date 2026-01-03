import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { applyLeave, getLeaves, updateLeave } from "../controllers/leave.controller.js";
const router = express.Router();
router.post("/", protect, applyLeave);
router.get("/", protect, getLeaves);
router.put("/:id", protect, updateLeave);
export default router;
