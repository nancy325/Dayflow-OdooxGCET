import Leave from "../models/Leave.js";

// Employee: apply for leave
export const applyLeave = async (req, res) => {
  try {
    const leave = await Leave.create({
      userId: req.user.id,
      ...req.body,
      status: "Pending"
    });
    res.json(leave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Employee: get own leaves | Admin/HR: get all leaves
export const getLeaves = async (req, res) => {
  try {
    // If user is admin or hr, return all leaves
    if (req.user.role === "admin" || req.user.role === "hr") {
      const leaves = await Leave.find().populate("userId", "email role");
      return res.json(leaves);
    }
    // Otherwise, return only user's leaves
    const leaves = await Leave.find({ userId: req.user.id });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin/HR: get all leaves (explicit endpoint)
export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("userId", "email role");
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin/HR: approve/reject leave
export const updateLeave = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!["Approved", "Rejected", "Pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Must be Approved, Rejected, or Pending" });
    }
    
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("userId", "email role");
    
    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }
    
    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
