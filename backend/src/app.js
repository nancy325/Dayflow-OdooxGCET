import express from "express";
import cors from "cors";
import auth from "./routes/auth.routes.js";
import profile from "./routes/profile.routes.js";
import attendance from "./routes/attendance.routes.js";
import leave from "./routes/leave.routes.js";
import payroll from "./routes/payroll.routes.js";
import dashboard from "./routes/dashboard.routes.js";
import adminDashboard from "./routes/adminDashboard.routes.js";
import employee from "./routes/employee.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/attendance", attendance);
app.use("/api/leave", leave);
app.use("/api/payroll", payroll);
app.use("/api/dashboard", dashboard);
app.use("/api/admin", adminDashboard);
app.use("/api/employees", employee);

export default app;
