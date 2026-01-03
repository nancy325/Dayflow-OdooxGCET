import { useState } from "react";

function ProfileCard({ role }) {
  const storageKey = `profile_${role}`;

  const defaultProfile = {
    name: "",
    email: "",
    department: "",
    phone: "",
    designation: role === "employee" ? "Employee" : "HR/Admin",
  };

  const [profile, setProfile] = useState(() => {
    return (
      JSON.parse(localStorage.getItem(storageKey)) || defaultProfile
    );
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    localStorage.setItem(storageKey, JSON.stringify(profile));
    setEditMode(false);
  };

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
