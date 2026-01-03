import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ items }) {
  return (
    <div className="sidebar">
      {items.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;
