import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { markAttendance, getAttendance } from "../controllers/attendance.controller.js";
const router = express.Router();
router.post("/", protect, markAttendance);
router.get("/", protect, getAttendance);
export default router;
