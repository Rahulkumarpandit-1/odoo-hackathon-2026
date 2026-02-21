import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="menu-icon" onClick={toggleSidebar}>
          ☰
        </div>
        <div className="nav-logo">FleetFlow Admin</div>
      </div>

      <div className="nav-right">
        <div className="nav-icon">🔔</div>
        <div className="profile-circle">R</div>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;