import Attendance from "../models/Attendance.js";
import Profile from "../models/Profile.js";

// Employee: mark own attendance
export const markAttendance = async (req, res) => {
  try {
    const now = new Date();
    const record = await Attendance.create({
      userId: req.user.id,
      date: now.toDateString(),
      status: req.body.status,
      checkInTime: req.body.status === "Checked In" || req.body.status === "PRESENT" || req.body.status === "Present" ? now : undefined,
      checkOutTime: req.body.status === "Checked Out" || req.body.status === "ABSENT" || req.body.status === "Absent" ? now : undefined
    });
    res.json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Helper function to format date and time
const formatDateTime = (dateString, timestamp) => {
  try {
    // Use timestamp if available, otherwise parse dateString
    const date = timestamp ? new Date(timestamp) : new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return { date: dateString || "-", time: "-" };
    }
    
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    
    return { date: formattedDate, time: formattedTime };
  } catch (error) {
    return { date: dateString || "-", time: "-" };
  }
};

// Helper function to enrich attendance records with profile data
const enrichAttendanceRecords = async (records) => {
  const enrichedRecords = await Promise.all(
    records.map(async (record) => {
      const user = record.userId;
      const recordObj = record.toObject();
      
      // Use checkInTime, checkOutTime, createdAt, or _id timestamp for date/time
      let timestamp = recordObj.checkInTime || recordObj.checkOutTime || recordObj.createdAt;
      if (!timestamp && recordObj._id) {
        // Extract timestamp from MongoDB ObjectId
        timestamp = new Date(parseInt(recordObj._id.toString().substring(0, 8), 16) * 1000);
      }
      
      // Format date and time
      const dateTime = formatDateTime(recordObj.date, timestamp);
      recordObj.formattedDate = dateTime.date;
      recordObj.formattedTime = dateTime.time;
      
      // Add employee ID
      recordObj.employeeId = user?._id?.toString() || recordObj.userId?.toString() || "-";
      
      if (user && user._id) {
        const profile = await Profile.findOne({ userId: user._id });
        recordObj.userId = {
          ...user.toObject(),
          profile: profile || null
        };
      }
      
      return recordObj;
    })
  );
  return enrichedRecords;
};

// Employee: get own attendance | Admin/HR: get all attendance
export const getAttendance = async (req, res) => {
  try {
    // If user is admin or hr, return all attendance
    if (req.user.role === "admin" || req.user.role === "hr") {
      const records = await Attendance.find().populate("userId", "email role");
      const enrichedRecords = await enrichAttendanceRecords(records);
      return res.json(enrichedRecords);
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
    const enrichedRecords = await enrichAttendanceRecords(records);
    res.json(enrichedRecords);
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
