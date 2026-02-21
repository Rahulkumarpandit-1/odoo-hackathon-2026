import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Reports() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />

      <div style={{ display: "flex" }}>
        {isOpen && <Sidebar />}

        <div
          style={{
            flex: 1,
            padding: "20px",
            marginLeft: isOpen ? "250px" : "0",
            transition: "0.3s",
          }}
        >
          <h1>Reports Overview 📈</h1>

          <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            <div className="card">
              <h3>Monthly Revenue</h3>
              <p>₹ 4.2L</p>
            </div>

            <div className="card">
              <h3>Active Drivers</h3>
              <p>142</p>
            </div>

            <div className="card">
              <h3>Completed Trips</h3>
              <p>1,240</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;