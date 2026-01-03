import EmployeeLayout from "../../layouts/EmployeeLayout";

function EmployeeDashboard() {
  return (
    <EmployeeLayout>
      <h2 className="page-title">Employee Dashboard</h2>
      <p className="page-subtitle">Your daily work overview</p>

      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>Attendance</h3>
          <p>Present</p>
        </div>
        <div className="stat-card">
          <h3>Leaves</h3>
          <p>2 Pending</p>
        </div>
        <div className="stat-card">
          <h3>Payroll</h3>
          <p>₹53,000</p>
        </div>
      </div>
    </EmployeeLayout>
  );
}

export default EmployeeDashboard;
