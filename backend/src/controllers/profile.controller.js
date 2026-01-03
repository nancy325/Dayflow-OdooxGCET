import Profile from "../models/Profile.js";
import User from "../models/User.js";

// Employee: get own profile
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Employee: update own profile
export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin/HR: get all profiles
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("userId", "email role");
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin/HR: get profile by ID
export const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.id }).populate("userId", "email role");
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin/HR: update profile by ID
export const updateProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.params.id },
      req.body,
      { new: true, upsert: true }
    ).populate("userId", "email role");
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
