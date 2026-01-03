import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: String,
  reason: String,
  status: { type: String, default: "Pending" }
});

export default mongoose.model("Leave", leaveSchema);
