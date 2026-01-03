import Attendance from "../models/Attendance.js";

// Employee: mark own attendance
export const markAttendance = async (req, res) => {
  try {
    const record = await Attendance.create({
      userId: req.user.id,
      date: new Date().toDateString(),
      status: req.body.status
    });
    res.json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Employee: get own attendance | Admin/HR: get all attendance
export const getAttendance = async (req, res) => {
  try {
    // If user is admin or hr, return all attendance
    if (req.user.role === "admin" || req.user.role === "hr") {
      const records = await Attendance.find().populate("userId", "email role");
      return res.json(records);
    }
    // Otherwise, return only user's attendance
    const records = await Attendance.find({ userId: req.user.id });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin/HR: get all attendance records
export const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().populate("userId", "email role");
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin/HR: update attendance (approve/reject)
export const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate("userId", "email role");
    
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
