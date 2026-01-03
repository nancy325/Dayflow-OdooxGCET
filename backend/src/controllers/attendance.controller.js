import Attendance from "../models/Attendance.js";

export const markAttendance = async (req, res) => {
  const record = await Attendance.create({
    userId: req.user.id,
    date: new Date().toDateString(),
    status: req.body.status
  });
  res.json(record);
};

export const getAttendance = async (req, res) => {
  const records = await Attendance.find({ userId: req.user.id });
  res.json(records);
};
