import Attendance from "../models/Attendance.js";
import Leave from "../models/Leave.js";
import User from "../models/User.js";

export const getAdminDashboard = async (req, res) => {
  // Total employees
  const totalEmployees = await User.countDocuments();
  // Pending leaves
  const pendingLeaves = await Leave.countDocuments({ status: "Pending" });
  // Attendance percentage (for today)
  const today = new Date().toDateString();
  const presentCount = await Attendance.countDocuments({ date: today, status: "Checked In" });
  const attendancePercent = totalEmployees > 0 ? Math.round((presentCount / totalEmployees) * 100) : 0;
  res.json({ totalEmployees, pendingLeaves, attendancePercent });
};

export const getAllAttendance = async (req, res) => {
  // All attendance records
  const records = await Attendance.find().populate("userId", "email role");
  res.json(records);
};
