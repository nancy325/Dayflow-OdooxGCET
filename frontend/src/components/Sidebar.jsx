import { NavLink } from "react-router-dom";

function Sidebar({ items }) {
  return (
    <div className="sidebar">
      {items.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className="sidebar-item"
          style={({ isActive }) => ({
            background: isActive ? "#eef2ff" : "transparent",
            color: isActive ? "#4338ca" : "#1f2937",
            display: "block",
          })}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;
