import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  email: String,
  department: String,
  phone: String,
  designation: String
});

export default mongoose.model("Profile", profileSchema);
