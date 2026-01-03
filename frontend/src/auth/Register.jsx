import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");

  const handleRegister = () => {
    if (!email || !password) {
      alert("All fields required");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("dayflow_users")) || [];

    if (users.find((u) => u.email === email)) {
      alert("User already exists");
      return;
    }

    users.push({ email, password, role });
    localStorage.setItem("dayflow_users", JSON.stringify(users));

    alert("Registration successful");
    navigate("/");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Register</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={inputStyle}
        >
          <option value="employee">Employee</option>
          <option value="hr">HR</option>
          <option value="admin">Admin</option>
        </select>

        <button style={{ width: "100%" }} onClick={handleRegister}>
          Register
        </button>

        <p
          style={{ marginTop: "12px", cursor: "pointer", color: "#4f46e5" }}
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

export default Register;
