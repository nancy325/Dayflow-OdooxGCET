import Attendance from "../models/Attendance.js";
import Leave from "../models/Leave.js";
import User from "../models/User.js";
import Profile from "../models/Profile.js";

export const getAdminDashboard = async (req, res) => {
  try {
    // Total employees
    const totalEmployees = await User.countDocuments();
    // Pending leaves
    const pendingLeaves = await Leave.countDocuments({ status: "Pending" });
    // Attendance percentage (for today)
    const today = new Date().toDateString();
    const presentCount = await Attendance.countDocuments({ date: today, status: "Checked In" });
    const attendancePercent = totalEmployees > 0 ? Math.round((presentCount / totalEmployees) * 100) : 0;
    res.json({ totalEmployees, pendingLeaves, attendancePercent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to format date and time
const formatDateTime = (dateString, timestamp) => {
  try {
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

export const getAllAttendance = async (req, res) => {
  try {
    // All attendance records with profile data
    const records = await Attendance.find().populate("userId", "email role").sort({ createdAt: -1 });
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
    res.json(enrichedRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
