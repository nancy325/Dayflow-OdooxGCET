import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { register, login } from "../controllers/auth.controller.js";
const router = express.Router();

// Registration restricted to Admin/HR only
router.post("/register", protect, authorizeRoles("hr", "admin"), register);
router.post("/login", login);
export default router;
