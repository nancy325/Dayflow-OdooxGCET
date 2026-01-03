import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h2>Dayflow</h2>

      <div className="navbar-content">
        {user && (
          <span className="navbar-role-badge">
            {user.role.toUpperCase()}
          </span>
        )}

        <button
          className="navbar-button"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
