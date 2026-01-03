import Payroll from "../models/Payroll.js";

// Employee: get own payroll
export const getPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findOne({ userId: req.user.id }).sort({ month: -1 });
    if (!payroll) {
      return res.status(404).json({ message: "Payroll not found" });
    }
    res.json(payroll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin/HR: get all payrolls

export const getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate("userId", "email role").sort({ month: -1 });
    res.json(payrolls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin/HR: update payroll
export const updatePayroll = async (req, res) => {
  try {
    const { baseSalary, bonus, deductions, netPay, month } = req.body;
    // Validation for accuracy
    if (baseSalary < 0 || bonus < 0 || deductions < 0 || netPay < 0) {
      return res.status(400).json({ message: "Values cannot be negative" });
    }
    const payroll = await Payroll.findByIdAndUpdate(
      req.params.id,
      { baseSalary, bonus, deductions, netPay, month },
      { new: true }
    );
    if (!payroll) {
      return res.status(404).json({ message: "Payroll not found" });
    }
    res.json(payroll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
