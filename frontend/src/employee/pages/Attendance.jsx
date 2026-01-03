import { useEffect, useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";

function Attendance() {
  const [status, setStatus] = useState("Not Checked In");

  useEffect(() => {
    const stored = localStorage.getItem("attendance_status");
    if (stored) setStatus(stored);
  }, []);

  const checkIn = () => {
    localStorage.setItem("attendance_status", "Checked In");
    setStatus("Checked In");
  };

  const checkOut = () => {
    localStorage.setItem("attendance_status", "Checked Out");
    setStatus("Checked Out");
  };

  return (
    <EmployeeLayout>
      <h2 className="page-title">Attendance</h2>
      <p className="page-subtitle">Mark your daily attendance</p>

      <div className="card">
        <p><strong>Status:</strong> {status}</p>
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
