import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../controllers/employee.controller.js";

const router = express.Router();

// All employee management routes require Admin/HR role
router.get("/", protect, authorizeRoles("hr", "admin"), getAllEmployees);
router.get("/:id", protect, authorizeRoles("hr", "admin"), getEmployeeById);
router.post("/", protect, authorizeRoles("hr", "admin"), createEmployee);
router.put("/:id", protect, authorizeRoles("hr", "admin"), updateEmployee);
router.delete("/:id", protect, authorizeRoles("hr", "admin"), deleteEmployee);

export default router;

