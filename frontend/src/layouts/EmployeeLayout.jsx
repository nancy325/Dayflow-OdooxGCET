import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function EmployeeLayout({ children }) {
  const menu = [
    { label: "Dashboard", path: "/employee/dashboard" },
    { label: "Attendance", path: "/employee/attendance" },
    { label: "Leave", path: "/employee/leave" },
    { label: "Profile", path: "/employee/profile" },
    { label: "Payroll", path: "/employee/payroll" },
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

export default EmployeeLayout;
