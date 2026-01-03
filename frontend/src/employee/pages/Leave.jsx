
import { useEffect, useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import { useAuth } from "../../context/AuthContext";

function Leave() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [type, setType] = useState("Paid");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const token = user && user.token ? user.token : null;

  useEffect(() => {
    async function fetchLeaves() {
      setError("");
      setLoading(true);
      try {
        const res = await fetch("/api/leave", {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) throw new Error("Failed to fetch leaves");
        const data = await res.json();
        setLeaves(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchLeaves();
  }, [token]);

  const applyLeave = async () => {
    setError("");
    try {
      const res = await fetch("/api/leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ type, reason }),
      });
      if (!res.ok) throw new Error("Failed to apply for leave");
      const newLeave = await res.json();
      setLeaves((prev) => [...prev, newLeave]);
      setReason("");
    } catch (err) {
      setError(err.message);
    }
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
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      </div>

      <div className="card">
        <h3>Your Requests</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          leaves.map((l) => (
            <p key={l._id || l.id}>
              {l.type} - {l.status}
            </p>
          ))
        )}
      </div>
    </EmployeeLayout>
  );
}

export default Leave;
