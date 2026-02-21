import React, { useEffect, useState } from "react";
import axios from "axios";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    const res = await axios.get("http://localhost:5000/api/vehicles");
    setVehicles(res.data);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>🚗 Vehicles Management</h1>

      <table>
        <thead>
          <tr>
            <th>Vehicle No</th>
            <th>Driver</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v, index) => (
            <tr key={index}>
              <td>{v.number}</td>
              <td>{v.driver}</td>
              <td>{v.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Vehicles;