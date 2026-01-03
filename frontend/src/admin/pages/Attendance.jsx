import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

function Attendance() {
  const [status, setStatus] = useState("No data");

  useEffect(() => {
    const stored = localStorage.getItem("attendance_status");
    if (stored) setStatus(stored);
  }, []);

  return (
    <AdminLayout>
      <h2 className="page-title">Attendance Records</h2>
      <p className="page-subtitle">View employee attendance</p>

      <div className="card">
        <p><strong>Employee:</strong> John Doe</p>
        <p><strong>Status:</strong> {status}</p>
      </div>
    </AdminLayout>
  );
}

export default Attendance;
