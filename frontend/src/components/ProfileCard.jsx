import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function ProfileCard({ role }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
    designation: role === "employee" ? "Employee" : "HR/Admin",
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Replace with actual token logic if available
  const token = user && user.token ? user.token : null;

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/profile/me", {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile((prev) => ({ ...prev, ...data }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    setError("");
    try {
      const res = await fetch("/api/profile/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const data = await res.json();
      setProfile((prev) => ({ ...prev, ...data }));
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Profile Information</h3>
        <button onClick={() => (editMode ? saveProfile() : setEditMode(true))}>
          {editMode ? "Save" : "Edit"}
        </button>
      </div>

      <div style={{ marginTop: "16px" }}>
        <ProfileField
          label="Name"
          name="name"
          value={profile.name}
          editMode={editMode}
          onChange={handleChange}
        />

        <ProfileField
          label="Email"
          name="email"
          value={profile.email}
          editMode={editMode}
          onChange={handleChange}
        />

        <ProfileField
          label="Department"
          name="department"
          value={profile.department}
          editMode={editMode}
          onChange={handleChange}
        />

        <ProfileField
          label="Phone"
          name="phone"
          value={profile.phone}
          editMode={editMode}
          onChange={handleChange}
        />

        <ProfileField
          label="Designation"
          name="designation"
          value={profile.designation}
          editMode={false}
        />
      </div>
    </div>
  );
}

function ProfileField({ label, name, value, editMode, onChange }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label style={{ fontSize: "13px", color: "#6b7280" }}>
        {label}
      </label>

      {editMode ? (
        <input
          name={name}
          value={value}
          onChange={onChange}
          style={{ marginTop: "4px" }}
        />
      ) : (
        <p style={{ marginTop: "4px", fontWeight: "500" }}>
          {value || "—"}
        </p>
      )}
    </div>
  );
}

export default ProfileCard;
