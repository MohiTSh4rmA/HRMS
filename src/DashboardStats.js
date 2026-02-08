import React, { useEffect, useState } from "react";

const API = "https://hrms-lite-backend-8mbb.onrender.com";


function DashboardStats() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch(`${API}/employees`)
      .then((res) => res.json())
      .then((data) => setCount(data.length));
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div className="stat-card">
        <h2>{count}</h2>
        <p>Total Employees</p>
      </div>
    </div>
  );
}

export default DashboardStats;
