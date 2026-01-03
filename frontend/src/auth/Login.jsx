import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users =
      JSON.parse(localStorage.getItem("dayflow_users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    login(user.role);
    navigate(`/${user.role}/dashboard`);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Dayflow HRMS</h2>

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

        <button style={{ width: "100%" }} onClick={handleLogin}>
          Login
        </button>

        <p
          style={{ marginTop: "12px", cursor: "pointer", color: "#4f46e5" }}
          onClick={() => navigate("/register")}
        >
          New user? Register
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

export default Login;
