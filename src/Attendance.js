import React, { useState } from "react";
import API from "./api";

function Attendance() {
  const [data, setData] = useState({
    employee_id: "",
    status: "Present",
  });

  const submit = (e) => {
    e.preventDefault();

    fetch(`${API}/attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      setData({ employee_id: "", status: "Present" });
    });
  };

  return (
    <form onSubmit={submit}>
      <h2>Mark Attendance</h2>
      <input
        placeholder="Employee ID"
        value={data.employee_id}
        onChange={(e) =>
          setData({ ...data, employee_id: e.target.value })
        }
        required
      />
      <select
        value={data.status}
        onChange={(e) => setData({ ...data, status: e.target.value })}
      >
        <option>Present</option>
        <option>Absent</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Attendance;
