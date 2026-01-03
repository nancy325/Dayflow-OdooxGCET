import EmployeeLayout from "../../layouts/EmployeeLayout";

function Payroll() {
  return (
    <EmployeeLayout>
      <h2 className="page-title">Payroll</h2>
      <p className="page-subtitle">Salary details</p>

      <div className="card">
        <p><strong>Base Salary:</strong> ₹50,000</p>
        <p><strong>Bonus:</strong> ₹5,000</p>
        <p><strong>Deductions:</strong> ₹2,000</p>
        <hr style={{ margin: "10px 0" }} />
        <p><strong>Net Pay:</strong> ₹53,000</p>
      </div>
    </EmployeeLayout>
  );
}

export default Payroll;
