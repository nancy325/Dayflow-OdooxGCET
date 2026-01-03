
import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useAuth } from "../../context/AuthContext";

function PayrollRow({ payroll, token, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    baseSalary: payroll.baseSalary,
    bonus: payroll.bonus,
    deductions: payroll.deductions,
    netPay: payroll.netPay,
    month: payroll.month,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/payroll/${payroll._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          ...form,
          baseSalary: Number(form.baseSalary),
          bonus: Number(form.bonus),
          deductions: Number(form.deductions),
          netPay: Number(form.netPay),
        }),
      });
      if (!res.ok) throw new Error((await res.json()).message || "Update failed");
      const updated = await res.json();
      onUpdate(updated);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <tr>
      <td style={{ padding: 8 }}>{payroll.userId?.email || payroll.userId}</td>
      <td style={{ padding: 8 }}>
        {editMode ? (
          <input name="baseSalary" value={form.baseSalary} onChange={handleChange} style={{ width: 80 }} />
        ) : (
          <>₹{payroll.baseSalary}</>
        )}
      </td>
      <td style={{ padding: 8 }}>
        {editMode ? (
          <input name="bonus" value={form.bonus} onChange={handleChange} style={{ width: 80 }} />
        ) : (
          <>₹{payroll.bonus}</>
        )}
      </td>
      <td style={{ padding: 8 }}>
        {editMode ? (
          <input name="deductions" value={form.deductions} onChange={handleChange} style={{ width: 80 }} />
        ) : (
          <>₹{payroll.deductions}</>
        )}
      </td>
      <td style={{ padding: 8 }}>
        {editMode ? (
          <input name="netPay" value={form.netPay} onChange={handleChange} style={{ width: 80 }} />
        ) : (
          <>₹{payroll.netPay}</>
        )}
      </td>
      <td style={{ padding: 8 }}>
        {editMode ? (
          <input name="month" value={form.month} onChange={handleChange} style={{ width: 90 }} />
        ) : (
          <>{payroll.month}</>
        )}
      </td>
      <td style={{ padding: 8 }}>
        {editMode ? (
          <>
            <button onClick={handleSave} disabled={saving} style={{ marginRight: 8 }}>
              {saving ? "Saving..." : "Save"}
            </button>
            <button onClick={() => setEditMode(false)} disabled={saving}>Cancel</button>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit</button>
        )}
      </td>
    </tr>
  );
}

function Payroll() {
  const { user } = useAuth();
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = user && user.token ? user.token : null;

  useEffect(() => {
    async function fetchPayrolls() {
      setError("");
      setLoading(true);
      try {
        const res = await fetch("/api/payroll", {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) throw new Error("Failed to fetch payrolls");
        const data = await res.json();
        setPayrolls(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchPayrolls();
  }, [token]);

  return (
    <AdminLayout>
      <h2 className="page-title">Payroll Management</h2>
      <p className="page-subtitle">View employee salary details</p>

      <div className="card">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : payrolls.length === 0 ? (
          <p>No payroll records found.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: 8 }}>Employee ID</th>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: 8 }}>Base Salary</th>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: 8 }}>Bonus</th>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: 8 }}>Deductions</th>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: 8 }}>Net Pay</th>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: 8 }}>Month</th>
              </tr>
            </thead>
            <tbody>
              {payrolls.map((p, idx) => (
                <PayrollRow
                  key={p._id}
                  payroll={p}
                  token={token}
                  onUpdate={(updated) => {
                    setPayrolls((prev) => prev.map((row, i) => i === idx ? updated : row));
                  }}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}

export default Payroll;
