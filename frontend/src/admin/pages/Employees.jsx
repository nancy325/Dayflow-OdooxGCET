import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useAuth } from "../../context/AuthContext";
import "./Employees.css";

function Employees() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    department: "",
    phone: "",
    designation: "Employee",
    role: "employee"
  });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const token = user && user.token ? user.token : null;

  useEffect(() => {
    fetchEmployees();
  }, [token]);

  const fetchEmployees = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/employees", {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) throw new Error("Failed to fetch employees");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError("");
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      name: "",
      department: "",
      phone: "",
      designation: "Employee",
      role: "employee"
    });
    setEditingEmployee(null);
    setShowForm(false);
    setFormError("");
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      email: employee.email || "",
      password: "",
      name: employee.profile?.name || "",
      department: employee.profile?.department || "",
      phone: employee.profile?.phone || "",
      designation: employee.profile?.designation || "Employee",
      role: employee.role || "employee"
    });
    setShowForm(true);
  };

  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormLoading(true);

    if (!formData.email || (!formData.password && !editingEmployee) || !formData.name) {
      setFormError("Email, password, and name are required");
      setFormLoading(false);
      return;
    }

    try {
      const url = editingEmployee 
        ? `/api/employees/${editingEmployee._id}`
        : "/api/employees";
      const method = editingEmployee ? "PUT" : "POST";
      
      const body = { ...formData };
      if (editingEmployee && !body.password) {
        delete body.password;
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || `Failed to ${editingEmployee ? 'update' : 'create'} employee`);
      }

      resetForm();
      fetchEmployees();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      const res = await fetch(`/api/employees/${employeeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete employee");
      }

      setShowDeleteModal(null);
      fetchEmployees();
    } catch (err) {
      setError(err.message);
      setShowDeleteModal(null);
    }
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "admin":
        return "role-badge role-badge-admin";
      case "hr":
        return "role-badge role-badge-hr";
      default:
        return "role-badge role-badge-employee";
    }
  };

  return (
    <AdminLayout>
      <div className="employees-header">
        <div>
          <h2 className="page-title">
            <i className="fas fa-users"></i> Employee Management
          </h2>
          <p className="page-subtitle">Manage and organize your workforce</p>
        </div>
        <button 
          className="btn-add-employee"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          disabled={loading}
        >
          <i className="fas fa-user-plus"></i>
          <span>Add New Employee</span>
        </button>
      </div>

      {showForm && (
        <div className="card employee-form-card">
          <div className="form-header">
            <h3>
              <i className="fas fa-user-plus"></i> {editingEmployee ? "Edit Employee" : "Create New Employee"}
            </h3>
            <button className="btn-icon-only" onClick={resetForm}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <form onSubmit={handleCreateEmployee} className="employee-form">
            <div className="form-grid">
              <div className="form-group">
                <label>
                  <i className="fas fa-user"></i> Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-envelope"></i> Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john.doe@company.com"
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-lock"></i> Password {editingEmployee ? "(leave blank to keep current)" : "*"}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={!editingEmployee}
                  placeholder="••••••••"
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-building"></i> Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="Engineering"
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-phone"></i> Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-briefcase"></i> Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="Software Engineer"
                />
              </div>

              {user?.role === "admin" && (
                <div className="form-group">
                  <label>
                    <i className="fas fa-user-tag"></i> Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="employee">Employee</option>
                    <option value="hr">HR Officer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              )}
            </div>

            {formError && (
              <div className="alert alert-error">
                <i className="fas fa-exclamation-circle"></i> {formError}
              </div>
            )}

            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={resetForm}
                disabled={formLoading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={formLoading}
              >
                {formLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> {editingEmployee ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <i className="fas fa-check"></i> {editingEmployee ? "Update Employee" : "Create Employee"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        {loading ? (
          <div className="loading-state">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading employees...</p>
          </div>
        ) : error ? (
          <div className="alert alert-error">
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        ) : employees.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-users-slash"></i>
            <p>No employees found.</p>
            <button 
              className="btn-add-employee"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              <i className="fas fa-user-plus"></i>
              <span>Add First Employee</span>
            </button>
          </div>
        ) : (
          <>
            <div className="table-header">
              <div className="table-info">
                <i className="fas fa-list"></i>
                <span>Total Employees: <strong>{employees.length}</strong></span>
              </div>
            </div>
            <div className="table-container">
              <table className="employees-table">
                <thead>
                  <tr>
                    <th><i className="fas fa-user"></i> Name</th>
                    <th><i className="fas fa-envelope"></i> Email</th>
                    <th><i className="fas fa-building"></i> Department</th>
                    <th><i className="fas fa-briefcase"></i> Designation</th>
                    <th><i className="fas fa-user-tag"></i> Role</th>
                    <th className="actions-column"><i className="fas fa-cog"></i> Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp._id}>
                      <td>
                        <div className="employee-name">
                          <div className="avatar">
                            {emp.profile?.name?.[0]?.toUpperCase() || emp.email[0].toUpperCase()}
                          </div>
                          <span>{emp.profile?.name || emp.email || "-"}</span>
                        </div>
                      </td>
                      <td>{emp.email}</td>
                      <td>{emp.profile?.department || <span className="text-muted">-</span>}</td>
                      <td>{emp.profile?.designation || <span className="text-muted">-</span>}</td>
                      <td>
                        <span className={getRoleBadgeClass(emp.role)}>
                          {emp.role.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn-icon btn-icon-edit"
                            onClick={() => handleEdit(emp)}
                            title="Edit Employee"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn-icon btn-icon-delete"
                            onClick={() => setShowDeleteModal(emp)}
                            title="Delete Employee"
                            disabled={emp.role === "admin"}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <i className="fas fa-exclamation-triangle"></i> Confirm Delete
              </h3>
              <button className="btn-icon-only" onClick={() => setShowDeleteModal(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete <strong>{showDeleteModal.profile?.name || showDeleteModal.email}</strong>?
              </p>
              <p className="text-muted">This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(null)}
              >
                <i className="fas fa-times"></i> Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => handleDelete(showDeleteModal._id)}
              >
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default Employees;
