import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Auth */
import Login from "../auth/Login";
import Register from "../auth/Register";

/* Protection */
import ProtectedRoute from "./ProtectedRoute";

/* Employee Pages */
import EmployeeDashboard from "../employee/pages/Dashboard";
import Attendance from "../employee/pages/Attendance";
import Leave from "../employee/pages/Leave";
import Profile from "../employee/pages/Profile";
import Payroll from "../employee/pages/Payroll";

/* HR / Admin Pages (shared UI) */
import AdminDashboard from "../admin/pages/Dashboard";
import Employees from "../admin/pages/Employees";
import AdminAttendance from "../admin/pages/Attendance";
import LeaveApproval from "../admin/pages/LeaveApproval";
import AdminPayroll from "../admin/pages/Payroll";
import AdminProfile from "../admin/pages/Profile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= EMPLOYEE ROUTES ================= */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/attendance"
          element={
            <ProtectedRoute role="employee">
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/leave"
          element={
            <ProtectedRoute role="employee">
              <Leave />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/profile"
          element={
            <ProtectedRoute role="employee">
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/payroll"
          element={
            <ProtectedRoute role="employee">
              <Payroll />
            </ProtectedRoute>
          }
        />

        {/* ================= HR ROUTES ================= */}
        <Route
          path="/hr/dashboard"
          element={
            <ProtectedRoute role={["hr", "admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hr/employees"
          element={
            <ProtectedRoute role={["hr", "admin"]}>
              <Employees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hr/attendance"
          element={
            <ProtectedRoute role={["hr", "admin"]}>
              <AdminAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hr/leave"
          element={
            <ProtectedRoute role={["hr", "admin"]}>
              <LeaveApproval />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hr/payroll"
          element={
            <ProtectedRoute role={["hr", "admin"]}>
              <AdminPayroll />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hr/profile"
          element={
            <ProtectedRoute role={["hr", "admin"]}>
              <AdminProfile />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute role="admin">
              <AdminProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
