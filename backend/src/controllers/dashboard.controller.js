import Attendance from "../models/Attendance.js";
import Leave from "../models/Leave.js";
import Payroll from "../models/Payroll.js";
import User from "../models/User.js";

// Employee: get own dashboard
export const getEmployeeDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    // Attendance summary (e.g., present days count)
    const attendanceCount = await Attendance.countDocuments({ userId });
    // Leave count
    const leaveCount = await Leave.countDocuments({ userId });
    // Pending leave count
    const pendingLeaveCount = await Leave.countDocuments({ userId, status: "Pending" });
    // Payroll summary (latest payroll)
    const payroll = await Payroll.findOne({ userId }).sort({ month: -1 });
    res.json({ attendanceCount, leaveCount, pendingLeaveCount, payroll });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin/HR: get employee list
export const getEmployeeList = async (req, res) => {
  try {
    // List all employees (exclude password)
    const employees = await User.find({}, "email role").select("-password");
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
