import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">FleetFlow</h2>

      <nav className="sidebar-links">
        <NavLink to="/dashboard">📊 Dashboard</NavLink>
        <NavLink to="/users">👥 Users</NavLink>
        <NavLink to="/vehicles">🚗 Vehicles</NavLink>
        <NavLink to="/drivers">🧑‍✈️ Drivers</NavLink>
        <NavLink to="/trips">🛣 Trips</NavLink>
        <NavLink to="/reports">📈 Reports</NavLink>
        <NavLink to="/settings">⚙ Settings</NavLink>
        <NavLink to="/support">💬 Support</NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;