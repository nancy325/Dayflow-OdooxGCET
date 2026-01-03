
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// ---------- SCHEMAS (minimal for seeding) ----------
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
  isActive: Boolean,
  createdAt: Date,
});

const EmployeeSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  employeeCode: String,
  firstName: String,
  lastName: String,
  department: String,
  designation: String,
  joiningDate: Date,
  employmentType: String,
  reportingManagerId: mongoose.Schema.Types.ObjectId,
  phone: String,
  address: String,
  status: String,
});

const AttendanceSchema = new mongoose.Schema({
  employeeId: mongoose.Schema.Types.ObjectId,
  date: Date,
  checkIn: String,
  checkOut: String,
  totalHours: Number,
  status: String,
  createdAt: Date,
});

const LeaveSchema = new mongoose.Schema({
  employeeId: mongoose.Schema.Types.ObjectId,
  leaveType: String,
  startDate: Date,
  endDate: Date,
  reason: String,
  status: String,
  appliedAt: Date,
});

const ApprovalSchema = new mongoose.Schema({
  entityType: String,
  entityId: mongoose.Schema.Types.ObjectId,
  requestedBy: mongoose.Schema.Types.ObjectId,
  approverRole: String,
  status: String,
  actionedBy: mongoose.Schema.Types.ObjectId,
  actionedAt: Date,
  remarks: String,
  createdAt: Date,
});

// ---------- MODELS ----------
const User = mongoose.model("User", UserSchema);
const Employee = mongoose.model("Employee", EmployeeSchema);
const Attendance = mongoose.model("Attendance", AttendanceSchema);
const Leave = mongoose.model("Leave", LeaveSchema);
const Approval = mongoose.model("Approval", ApprovalSchema);

// ---------- SEED SCRIPT ----------
const seedHRMS = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Clearing existing data...");
    await Promise.all([
      User.deleteMany(),
      Employee.deleteMany(),
      Attendance.deleteMany(),
      Leave.deleteMany(),
      Approval.deleteMany(),
    ]);

    console.log("Seeding users...");
    const [admin, hr, employee] = await User.insertMany([
      {
        email: "admin@dayflow.com",
        password: "$2b$10$hashed_admin_password",
        role: "ADMIN",
        isActive: true,
        createdAt: new Date(),
      },
      {
        email: "hr@dayflow.com",
        password: "$2b$10$hashed_hr_password",
        role: "HR",
        isActive: true,
        createdAt: new Date(),
      },
      {
        email: "employee1@dayflow.com",
        password: "$2b$10$hashed_employee_password",
        role: "EMPLOYEE",
        isActive: true,
        createdAt: new Date(),
      },
    ]);

    console.log("Seeding employees...");
    const [empProfile] = await Employee.insertMany([
      {
        userId: employee._id,
        employeeCode: "DF-EMP-001",
        firstName: "Nancy",
        lastName: "Sharma",
        department: "Engineering",
        designation: "Software Engineer",
        joiningDate: new Date("2024-07-01"),
        employmentType: "Full-Time",
        reportingManagerId: admin._id,
        phone: "9XXXXXXXXX",
        address: "Pune, India",
        status: "ACTIVE",
      },
    ]);

    console.log("Seeding attendance...");
    await Attendance.insertMany([
      {
        employeeId: empProfile._id,
        date: new Date("2025-02-01"),
        checkIn: "09:12",
        checkOut: "18:05",
        totalHours: 8.88,
        status: "PRESENT",
        createdAt: new Date(),
      },
      {
        employeeId: empProfile._id,
        date: new Date("2025-02-02"),
        checkIn: "09:20",
        checkOut: "17:50",
        totalHours: 8.5,
        status: "PRESENT",
        createdAt: new Date(),
      },
    ]);

    console.log("Seeding leaves...");
    const [leave] = await Leave.insertMany([
      {
        employeeId: empProfile._id,
        leaveType: "CASUAL",
        startDate: new Date("2025-02-10"),
        endDate: new Date("2025-02-12"),
        reason: "Family function",
        status: "PENDING",
        appliedAt: new Date(),
      },
    ]);

    console.log("Seeding approvals...");
    await Approval.insertMany([
      {
        entityType: "LEAVE",
        entityId: leave._id,
        requestedBy: empProfile._id,
        approverRole: "HR",
        status: "PENDING",
        actionedBy: null,
        actionedAt: null,
        remarks: null,
        createdAt: new Date(),
      },
    ]);

    console.log("✅ Dayflow HRMS database seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seedHRMS();
