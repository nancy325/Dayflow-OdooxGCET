import AdminLayout from "../../layouts/AdminLayout";

function Employees() {
  // Mock employee list (can be replaced by backend)
  const employees = [
    { id: 1, name: "John Doe", role: "Software Engineer" },
    { id: 2, name: "Jane Smith", role: "UI Designer" },
  ];

  return (
    <AdminLayout>
      <h2 className="page-title">Employees</h2>
      <p className="page-subtitle">Manage company employees</p>

      <div className="card">
        {employees.map((emp) => (
          <p key={emp.id}>
            <strong>{emp.name}</strong> — {emp.role}
          </p>
        ))}
      </div>
    </AdminLayout>
  );
}

export default Employees;
