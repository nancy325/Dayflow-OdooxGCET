import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { markAttendance, getAttendance, getAllAttendance, updateAttendance } from "../controllers/attendance.controller.js";
const router = express.Router();

// Employee: mark own attendance
router.post("/", protect, markAttendance);

// Employee: get own attendance
// Admin/HR: get all attendance
router.get("/", protect, getAttendance);

// Admin/HR: get all attendance records
router.get("/all", protect, authorizeRoles("hr", "admin"), getAllAttendance);

// Admin/HR: update attendance (approve/reject)
router.put("/:id", protect, authorizeRoles("hr", "admin"), updateAttendance);

export default router;
