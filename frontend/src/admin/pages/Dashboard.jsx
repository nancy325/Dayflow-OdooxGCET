import AdminLayout from "../../layouts/AdminLayout";

function AdminDashboard() {
  return (
    <AdminLayout>
      <h2 className="page-title">HR Dashboard</h2>
      <p className="page-subtitle">Organization overview</p>

      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>Total Employees</h3>
          <p>25</p>
        </div>
        <div className="stat-card">
          <h3>Pending Leaves</h3>
          <p>4</p>
        </div>
        <div className="stat-card">
          <h3>Attendance</h3>
          <p>92%</p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
