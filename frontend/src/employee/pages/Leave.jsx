import { useEffect, useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";

function Leave() {
  const [leaves, setLeaves] = useState([]);
  const [type, setType] = useState("Paid");
  const [reason, setReason] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("leave_requests")) || [];
    setLeaves(stored);
  }, []);

  const applyLeave = () => {
    const newLeave = {
      id: Date.now(),
      type,
      reason,
      status: "Pending",
    };

    const updated = [...leaves, newLeave];
    setLeaves(updated);
    localStorage.setItem("leave_requests", JSON.stringify(updated));
    setReason("");
  };

  return (
    <EmployeeLayout>
      <h2 className="page-title">Leave Requests</h2>
      <p className="page-subtitle">Apply and track your leave</p>

      <div className="card">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>Paid</option>
          <option>Sick</option>
          <option>Unpaid</option>
        </select>

        <br /><br />

        <textarea
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />

        <br /><br />

        <button onClick={applyLeave}>Apply Leave</button>
      </div>

      <div className="card">
        <h3>Your Requests</h3>
        {leaves.map((l) => (
          <p key={l.id}>
            {l.type} - {l.status}
          </p>
        ))}
      </div>
    </EmployeeLayout>
  );
}

export default Leave;
