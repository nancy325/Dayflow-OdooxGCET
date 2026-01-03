import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./ProfileCard.css";

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

  if (loading) return <div className="profile-card-loading">Loading profile...</div>;
  if (error) return <div className="profile-card-error">{error}</div>;

  return (
    <div className="profile-card">
      <div className="profile-card-header">
        <h3 className="profile-card-title">Profile Information</h3>
        <button 
          className="profile-card-button"
          onClick={() => (editMode ? saveProfile() : setEditMode(true))}
        >
          {editMode ? "Save" : "Edit"}
        </button>
      </div>

      <div className="profile-card-fields">
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
    <div className="profile-field">
      <label className="profile-field-label">
        {label}
      </label>

      {editMode ? (
        <input
          className="profile-field-input"
          name={name}
          value={value}
          onChange={onChange}
        />
      ) : (
        <p className={`profile-field-value ${!value ? 'profile-field-value-empty' : ''}`}>
          {value || "—"}
        </p>
      )}
    </div>
  );
}

export default ProfileCard;
