import React, { useState } from "react";

const API = "https://hrms-lite-backend-8mbb.onrender.com";

function EmployeeForm() {
  const [form, setForm] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
  try {
    const res = await fetch(`${API}/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const err = await res.text();
      alert("Backend error: " + err);
      return;
    }

    alert("Employee Added");
    window.location.reload();
  } catch (e) {
    alert("Network error: Backend not reachable");
    console.error(e);
  }
};


  return (
  <>
    <h3>Add Employee</h3>

    <input
      name="employee_id"
      placeholder="Employee ID"
      onChange={handleChange}
    />

    <input
      name="name"
      placeholder="Full Name"
      onChange={handleChange}
    />

    <input
      name="email"
      placeholder="Email Address"
      onChange={handleChange}
    />

    <input
      name="department"
      placeholder="Department"
      onChange={handleChange}
    />
    <p style={{ fontSize: "13px", color: "#555" }}>
  Please ensure employee ID and email are unique.
</p>

    <button onClick={submit}>Add Employee</button>
  </>
);

}

export default EmployeeForm;
