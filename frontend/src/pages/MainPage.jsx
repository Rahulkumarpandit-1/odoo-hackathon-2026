import React from "react";
import "./MainPage.css";
import Navbar from "../components/Navbar";
function MainPage() {
  return (
    <div className="main-container">
      <aside className="sidebar">
        <h2>FleetFlow</h2>
        <ul>
          <li>Dashboard</li>
          <li>Trips</li>
          <li>Drivers</li>
          <li>Vehicles</li>
          <li>Expenses</li>
        </ul>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <h3>Welcome Admin 👋</h3>
        </header>

        <div className="dashboard-cards">
          <div className="card">🚛 Total Vehicles: 24</div>
          <div className="card">👨‍✈️ Drivers: 12</div>
          <div className="card">🛣️ Active Trips: 5</div>
          <div className="card">💰 Expenses: ₹45,000</div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;