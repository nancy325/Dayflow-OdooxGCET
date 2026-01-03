import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h2>Dayflow</h2>

      {user && (
        <span className="role-badge">
          {user.role.toUpperCase()}
        </span>
      )}

      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
