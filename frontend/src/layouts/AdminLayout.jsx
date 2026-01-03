import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

function AdminLayout({ children }) {
  const { user } = useAuth();

  // Determine base path based on role
  const basePath = user?.role === "admin" ? "/admin" : "/hr";

  const menu = [
    { label: "Dashboard", path: `${basePath}/dashboard` },
    { label: "Employees", path: `${basePath}/employees` },
    { label: "Attendance", path: `${basePath}/attendance` },
    { label: "Leave Approval", path: `${basePath}/leave` },
    { label: "Payroll", path: `${basePath}/payroll` },
  ];

  return (
    <>
      <Navbar />
      <div className="app-container">
        <Sidebar items={menu} />
        <div className="main-content">{children}</div>
      </div>
    </>
  );
}

export default AdminLayout;
