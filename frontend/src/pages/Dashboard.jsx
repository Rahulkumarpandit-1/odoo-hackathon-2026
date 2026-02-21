import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [stats, setStats] = useState({});

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dashboard/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      {isOpen && <Sidebar />}

      <div
        className="dashboard-content"
        style={{ marginLeft: isOpen ? "270px" : "0" }}
      >
        <h1 className="dashboard-title">Dashboard Overview 🚀</h1>

        <div className="cards">
          <div className="card">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>

          <div className="card">
            <h3>Active Vehicles</h3>
            <p>{stats.totalVehicles}</p>
          </div>

          <div className="card">
            <h3>Revenue</h3>
            <p>₹ {stats.totalRevenue}</p>
          </div>

          <div className="card">
            <h3>Reports</h3>
            <p>{stats.totalReports}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;