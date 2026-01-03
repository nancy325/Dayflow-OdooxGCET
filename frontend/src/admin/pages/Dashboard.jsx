
import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useAuth } from "../../context/AuthContext";

function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalEmployees: 0, pendingLeaves: 0, attendancePercent: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = user && user.token ? user.token : null;

  useEffect(() => {
    async function fetchStats() {
      setError("");
      setLoading(true);
      try {
        const res = await fetch("/api/admin/dashboard", {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) throw new Error("Failed to fetch dashboard stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchStats();
  }, [token]);

  return (
    <AdminLayout>
      <h2 className="page-title">HR Dashboard</h2>
      <p className="page-subtitle">Organization overview</p>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="dashboard-grid">
          <div className="stat-card">
            <h3>Total Employees</h3>
            <p>{stats.totalEmployees}</p>
          </div>
          <div className="stat-card">
            <h3>Pending Leaves</h3>
            <p>{stats.pendingLeaves}</p>
          </div>
          <div className="stat-card">
            <h3>Attendance</h3>
            <p>{stats.attendancePercent}%</p>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminDashboard;
