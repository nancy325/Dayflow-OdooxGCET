
import { useEffect, useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import { useAuth } from "../../context/AuthContext";

function Payroll() {
  const { user } = useAuth();
  const [payroll, setPayroll] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const token = user && user.token ? user.token : null;

  useEffect(() => {
    async function fetchPayroll() {
      setError("");
      setLoading(true);
      try {
        const res = await fetch("/api/payroll/me", {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) throw new Error("Failed to fetch payroll");
        const data = await res.json();
        setPayroll(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchPayroll();
  }, [token]);

  return (
    <EmployeeLayout>
      <h2 className="page-title">Payroll</h2>
      <p className="page-subtitle">Salary details</p>

      <div className="card">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : payroll ? (
          <>
            <p><strong>Base Salary:</strong> ₹{payroll.baseSalary}</p>
            <p><strong>Bonus:</strong> ₹{payroll.bonus}</p>
            <p><strong>Deductions:</strong> ₹{payroll.deductions}</p>
            <hr style={{ margin: "10px 0" }} />
            <p><strong>Net Pay:</strong> ₹{payroll.netPay}</p>
            <p><strong>Month:</strong> {payroll.month}</p>
          </>
        ) : (
          <p>No payroll data found.</p>
        )}
      </div>
    </EmployeeLayout>
  );
}

export default Payroll;
