import Profile from "../models/Profile.js";

export const getProfile = async (req, res) => {
  const profile = await Profile.findOne({ userId: req.user.id });
  res.json(profile);
};

export const updateProfile = async (req, res) => {
  const profile = await Profile.findOneAndUpdate(
    { userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(profile);
};
