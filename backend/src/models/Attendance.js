import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: String },
  status: String,
  checkInTime: { type: Date },
  checkOutTime: { type: Date }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

export default mongoose.model("Attendance", attendanceSchema);
