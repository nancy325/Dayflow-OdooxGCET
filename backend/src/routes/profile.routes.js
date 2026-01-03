import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { getProfile, updateProfile, getAllProfiles, getProfileById, updateProfileById } from "../controllers/profile.controller.js";
const router = express.Router();

// Employee: get own profile
router.get("/me", protect, getProfile);

// Employee: update own profile
router.put("/me", protect, updateProfile);

// Admin/HR: get all profiles
router.get("/all", protect, authorizeRoles("hr", "admin"), getAllProfiles);

// Admin/HR: get profile by ID
router.get("/:id", protect, authorizeRoles("hr", "admin"), getProfileById);

// Admin/HR: update profile by ID
router.put("/:id", protect, authorizeRoles("hr", "admin"), updateProfileById);

export default router;
