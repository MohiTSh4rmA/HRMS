import React, { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch(`${API}/employees`)
      .then((res) => res.json())
      .then(setEmployees);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const markAttendance = async () => {
    if (!form.employee_id || !form.date) {
      alert("Please select employee and date");
      return;
    }

    await fetch(`${API}/attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Attendance marked");
    loadAttendance(form.employee_id);
  };

  const loadAttendance = async (empId) => {
    const res = await fetch(`${API}/attendance/${empId}`);
    const data = await res.json();
    setRecords(data);
  };

  return (
    <>
      <h3>Attendance Management</h3>

      <select name="employee_id" onChange={handleChange}>
        <option value="">Select Employee</option>
        {employees.map((e) => (
          <option key={e.employee_id} value={e.employee_id}>
            {e.name}
          </option>
        ))}
      </select>

      <input type="date" name="date" onChange={handleChange} />

      <select name="status" onChange={handleChange}>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <button onClick={markAttendance}>Mark Attendance</button>

      {records.length > 0 && (
        <>
          <h4 style={{ marginTop: "20px" }}>Attendance Records</h4>
          {records.map((r, i) => (
            <div key={i} className="employee-row">
              <span>
                {r.date} — {r.status}
              </span>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default Attendance;
