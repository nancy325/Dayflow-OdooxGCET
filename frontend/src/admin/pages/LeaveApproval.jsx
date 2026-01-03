import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

function LeaveApproval() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("leave_requests")) || [];
    setLeaves(stored);
  }, []);

  const updateStatus = (id, status) => {
    const updated = leaves.map((l) =>
      l.id === id ? { ...l, status } : l
    );

    setLeaves(updated);
    localStorage.setItem("leave_requests", JSON.stringify(updated));
  };

  return (
    <AdminLayout>
      <h2 className="page-title">Leave Approvals</h2>
      <p className="page-subtitle">
        Review and manage employee leave requests
      </p>

      <div className="card">
        {leaves.length === 0 ? (
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
                <tr key={l.id}>
                  <td>{l.type}</td>
                  <td>{l.reason}</td>
                  <td>{l.status}</td>
                  <td>
                    {l.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => updateStatus(l.id, "Approved")}
                          style={{ marginRight: "8px" }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(l.id, "Rejected")}
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
