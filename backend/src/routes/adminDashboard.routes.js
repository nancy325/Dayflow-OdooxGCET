import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { getAdminDashboard, getAllAttendance } from "../controllers/adminDashboard.controller.js";
const router = express.Router();

// Admin/HR dashboard routes
router.get("/dashboard", protect, authorizeRoles("hr", "admin"), getAdminDashboard);
router.get("/attendance", protect, authorizeRoles("hr", "admin"), getAllAttendance);

export default router;
