
import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useAuth } from "../../context/AuthContext";

function Attendance() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = user && user.token ? user.token : null;

  useEffect(() => {
    async function fetchAttendance() {
      setError("");
      setLoading(true);
      try {
        const res = await fetch("/api/admin/attendance", {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) throw new Error("Failed to fetch attendance records");
        const data = await res.json();
        setRecords(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchAttendance();
  }, [token]);

  return (
    <AdminLayout>
      <h2 className="page-title">Attendance Records</h2>
      <p className="page-subtitle">View employee attendance</p>

      <div className="card">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : records.length === 0 ? (
          <p>No attendance records found.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: 8 }}>Employee</th>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: 8 }}>Role</th>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: 8 }}>Date</th>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: 8 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec._id}>
                  <td style={{ padding: 8 }}>{rec.userId?.email || rec.userId}</td>
                  <td style={{ padding: 8 }}>{rec.userId?.role || "-"}</td>
                  <td style={{ padding: 8 }}>{rec.date}</td>
                  <td style={{ padding: 8 }}>{rec.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}

export default Attendance;
