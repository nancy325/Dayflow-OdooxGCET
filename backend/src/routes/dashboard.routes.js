import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { getEmployeeDashboard, getEmployeeList } from "../controllers/dashboard.controller.js";
const router = express.Router();

// Employee: get own dashboard
router.get("/employee", protect, getEmployeeDashboard);

// Admin/HR: get employee list
router.get("/employees", protect, authorizeRoles("hr", "admin"), getEmployeeList);

export default router;
