import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { applyLeave, getLeaves, getAllLeaves, updateLeave } from "../controllers/leave.controller.js";
const router = express.Router();

// Employee: apply for leave
router.post("/", protect, applyLeave);

// Employee: get own leaves
// Admin/HR: get all leaves
router.get("/", protect, getLeaves);

// Admin/HR: get all leaves (explicit endpoint)
router.get("/all", protect, authorizeRoles("hr", "admin"), getAllLeaves);

// Admin/HR: approve/reject leave
router.put("/:id", protect, authorizeRoles("hr", "admin"), updateLeave);

export default router;
