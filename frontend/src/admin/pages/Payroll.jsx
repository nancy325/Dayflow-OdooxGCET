import AdminLayout from "../../layouts/AdminLayout";

function Payroll() {
  return (
    <AdminLayout>
      <h2 className="page-title">Payroll Management</h2>
      <p className="page-subtitle">View employee salary details</p>

      <div className="card">
        <p><strong>Employee:</strong> John Doe</p>
        <p><strong>Base Salary:</strong> ₹50,000</p>
        <p><strong>Net Pay:</strong> ₹53,000</p>
      </div>
    </AdminLayout>
  );
}

export default Payroll;
