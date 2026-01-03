import mongoose from "mongoose";

const PayrollSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  baseSalary: { type: Number, required: true },
  bonus: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  netPay: { type: Number, required: true },
  month: { type: String, required: true }, // e.g., "2026-01"
});

export default mongoose.model("Payroll", PayrollSchema);
