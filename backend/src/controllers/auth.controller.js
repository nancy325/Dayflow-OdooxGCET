import User from "../models/User.js";
import Profile from "../models/Profile.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash, role });

  await Profile.create({
    userId: user._id,
    email,
    designation: role
  });

  res.json({ msg: "Registered" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(401).json({ msg: "Invalid" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({ token, role: user.role });
};
