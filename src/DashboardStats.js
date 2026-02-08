import React, { useEffect, useState } from "react";
import API from "./api";

function DashboardStats() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch(`${API}/employees`)
      .then((res) => res.json())
      .then((data) => setCount(data.length));
  }, []);

  return <h3>Total Employees: {count}</h3>;
}

export default DashboardStats;
