
import { useEffect, useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import { useAuth } from "../../context/AuthContext";

function Attendance() {
  const { user } = useAuth();
  const [status, setStatus] = useState("Loading...");
  const [error, setError] = useState("");

  const token = user && user.token ? user.token : null;

  useEffect(() => {
    async function fetchStatus() {
      setError("");
      try {
        const today = new Date().toDateString();
        const res = await fetch("/api/attendance", {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) throw new Error("Failed to fetch attendance status");
        const data = await res.json();
        // Find today's attendance record
        const todayRecord = data.find(record => record.date === today);
        setStatus(todayRecord ? todayRecord.status : "Not Checked In");
      } catch (err) {
        setError(err.message);
        setStatus("Not Checked In");
      }
    }
    if (token) fetchStatus();
  }, [token]);

  const checkIn = async () => {
    setError("");
    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: "Checked In" }),
      });
      if (!res.ok) throw new Error("Check-in failed");
      const data = await res.json();
      setStatus(data.status || "Checked In");
    } catch (err) {
      setError(err.message);
    }
  };

  const checkOut = async () => {
    setError("");
    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: "Checked Out" }),
      });
      if (!res.ok) throw new Error("Check-out failed");
      const data = await res.json();
      setStatus(data.status || "Checked Out");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <EmployeeLayout>
      <h2 className="page-title">Attendance</h2>
      <p className="page-subtitle">Mark your daily attendance</p>

      <div className="card">
        <p><strong>Status:</strong> {status}</p>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <br />

        <button onClick={checkIn} style={{ marginRight: "10px" }}>
          Check In
        </button>

        <button onClick={checkOut}>Check Out</button>
      </div>
    </EmployeeLayout>
  );
}

export default Attendance;
