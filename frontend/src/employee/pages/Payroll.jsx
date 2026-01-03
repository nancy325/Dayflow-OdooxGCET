
import { useEffect, useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import { useAuth } from "../../context/AuthContext";
import "./Payroll.css";

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
        if (!res.ok) {
          if (res.status === 404) {
            setPayroll(null);
            return;
          }
          throw new Error("Failed to fetch payroll");
        }
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
      <h2 className="page-title">
        <i className="fas fa-money-bill-wave"></i> Payroll
      </h2>
      <p className="page-subtitle">Your salary and compensation details</p>

      {loading ? (
        <div className="card">
          <div className="loading-state">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading payroll information...</p>
          </div>
        </div>
      ) : error ? (
        <div className="card">
          <div className="alert alert-error">
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        </div>
      ) : payroll ? (
        <>
          <div className="card payroll-current-salary">
            <div className="salary-header">
              <div>
                <h3>
                  <i className="fas fa-wallet"></i> Current Salary
                </h3>
                <p className="salary-period">For {payroll.month || "Current Month"}</p>
              </div>
              <div className="salary-amount">
                <span className="currency">₹</span>
                <span className="amount">{payroll.baseSalary?.toLocaleString('en-IN') || "0"}</span>
              </div>
            </div>
          </div>

          <div className="card payroll-details">
            <h3>
              <i className="fas fa-receipt"></i> Salary Breakdown
            </h3>
            <div className="payroll-grid">
              <div className="payroll-item">
                <div className="payroll-label">
                  <i className="fas fa-coins"></i> Base Salary
                </div>
                <div className="payroll-value">₹{payroll.baseSalary?.toLocaleString('en-IN') || "0"}</div>
              </div>
              <div className="payroll-item payroll-item-bonus">
                <div className="payroll-label">
                  <i className="fas fa-gift"></i> Bonus
                </div>
                <div className="payroll-value">₹{payroll.bonus?.toLocaleString('en-IN') || "0"}</div>
              </div>
              <div className="payroll-item payroll-item-deduction">
                <div className="payroll-label">
                  <i className="fas fa-minus-circle"></i> Deductions
                </div>
                <div className="payroll-value">₹{payroll.deductions?.toLocaleString('en-IN') || "0"}</div>
              </div>
              <div className="payroll-item payroll-item-net">
                <div className="payroll-label">
                  <i className="fas fa-calculator"></i> Net Pay
                </div>
                <div className="payroll-value payroll-value-net">₹{payroll.netPay?.toLocaleString('en-IN') || "0"}</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="card">
          <div className="empty-state">
            <i className="fas fa-file-invoice-dollar"></i>
            <p>No payroll data found.</p>
            <p className="text-muted">Please contact HR for salary information.</p>
          </div>
        </div>
      )}
    </EmployeeLayout>
  );
}

export default Payroll;
