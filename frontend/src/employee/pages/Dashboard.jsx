
import { useEffect, useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import { useAuth } from "../../context/AuthContext";

function EmployeeDashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState({ attendanceCount: 0, leaveCount: 0, payroll: null });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = user && user.token ? user.token : null;

  useEffect(() => {
    async function fetchDashboard() {
      setError("");
      setLoading(true);
      try {
        const [summaryRes, employeesRes] = await Promise.all([
          fetch("/api/dashboard/employee", {
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
        if (!employeesRes.ok) throw new Error("Failed to fetch employee list");
        const summaryData = await summaryRes.json();
        const employeesData = await employeesRes.json();
        setSummary(summaryData);
        setEmployees(employeesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchDashboard();
  }, [token]);

  return (
    <EmployeeLayout>
      <h2 className="page-title">Employee Dashboard</h2>
      <p className="page-subtitle">Your daily work overview</p>

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

          <div className="card" style={{ marginTop: 24 }}>
            <h3>Employee List</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: 8 }}>Email</th>
                    <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: 8 }}>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp._id}>
                      <td style={{ padding: 8 }}>{emp.email}</td>
                      <td style={{ padding: 8 }}>{emp.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </EmployeeLayout>
  );
}

export default EmployeeDashboard;
