
import { useEffect, useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";

function EmployeeDashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState({ attendanceCount: 0, leaveCount: 0, payroll: null });
  const [profile, setProfile] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = user && user.token ? user.token : null;

  useEffect(() => {
    async function fetchDashboard() {
      setError("");
      setLoading(true);
      try {
        const [summaryRes, profileRes, employeesRes] = await Promise.all([
          fetch("/api/dashboard/employee", {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }),
          fetch("/api/profile/me", {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }),
          fetch("/api/dashboard/employees", {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          })
        ]);
        if (!summaryRes.ok) throw new Error("Failed to fetch dashboard summary");
        const summaryData = await summaryRes.json();
        setSummary(summaryData);
        
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData);
        }
        
        if (employeesRes.ok) {
          const employeesData = await employeesRes.json();
          setEmployees(employeesData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchDashboard();
  }, [token]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const employeeName = profile?.name || user?.email || "Employee";

  return (
    <EmployeeLayout>
      <div className="dashboard-welcome">
        <h2 className="page-title">
          <i className="fas fa-hand-sparkles"></i> {getGreeting()}, {employeeName}!
        </h2>
        <p className="page-subtitle">Here's your daily work overview</p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          <div className="dashboard-grid">
            <div className="stat-card">
              <h3>Attendance</h3>
              <p>{summary.attendanceCount} Days Present</p>
            </div>
            <div className="stat-card">
              <h3>Leaves</h3>
              <p>{summary.leaveCount} Leaves</p>
            </div>
            <div className="stat-card">
              <h3>Payroll</h3>
              {summary.payroll ? (
                <>
                  <p>₹{summary.payroll.netPay}</p>
                  <p style={{ fontSize: "12px" }}>({summary.payroll.month})</p>
                </>
              ) : (
                <p>No payroll data</p>
              )}
            </div>
          </div>

        </>
      )}
    </EmployeeLayout>
  );
}

export default EmployeeDashboard;
