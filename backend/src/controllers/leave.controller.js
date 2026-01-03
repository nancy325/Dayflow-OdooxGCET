import Leave from "../models/Leave.js";

export const applyLeave = async (req, res) => {
  const leave = await Leave.create({
    userId: req.user.id,
    ...req.body
  });
  res.json(leave);
};

export const getLeaves = async (req, res) => {
  const leaves = await Leave.find();
  res.json(leaves);
};

export const updateLeave = async (req, res) => {
  const leave = await Leave.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(leave);
};
