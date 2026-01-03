import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { getPayroll, getAllPayrolls, updatePayroll } from "../controllers/payroll.controller.js";
const router = express.Router();

// Employee: get own payroll
router.get("/me", protect, getPayroll);

// Admin/HR: get all payrolls

// Admin/HR: update payroll
router.put("/:id", protect, authorizeRoles("hr", "admin"), updatePayroll);

router.get("/", protect, authorizeRoles("hr", "admin"), getAllPayrolls);

export default router;
