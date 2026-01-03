
import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useAuth } from "../../context/AuthContext";

function LeaveApproval() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

  const updateStatus = async (id, status) => {
    setError("");
    try {
      const res = await fetch(`/api/leave/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update leave status");
      const updatedLeave = await res.json();
      setLeaves((prev) => prev.map((l) => (l._id === updatedLeave._id ? updatedLeave : l)));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AdminLayout>
      <h2 className="page-title">Leave Approvals</h2>
      <p className="page-subtitle">
        Review and manage employee leave requests
      </p>

      <div className="card">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : leaves.length === 0 ? (
          <p>No leave requests available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {leaves.map((l) => (
                <tr key={l._id}>
                  <td>{l.type}</td>
                  <td>{l.reason}</td>
                  <td>{l.status}</td>
                  <td>
                    {l.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => updateStatus(l._id, "Approved")}
                          style={{ marginRight: "8px" }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(l._id, "Rejected")}
                          style={{ background: "#ef4444" }}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span>{l.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}

export default LeaveApproval;
