import React, { useState } from "react";
import API from "./api";

function EmployeeForm({ onAdd }) {
  const [formData, setFormData] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: "",
  });

  const submit = (e) => {
    e.preventDefault();

    fetch(`${API}/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => {
      setFormData({
        employee_id: "",
        name: "",
        email: "",
        department: "",
      });
      onAdd();
    });
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Employee ID"
        value={formData.employee_id}
        onChange={(e) =>
          setFormData({ ...formData, employee_id: e.target.value })
        }
        required
      />
      <input
        placeholder="Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
        required
      />
      <input
        placeholder="Email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
        required
      />
      <input
        placeholder="Department"
        value={formData.department}
        onChange={(e) =>
          setFormData({ ...formData, department: e.target.value })
        }
        required
      />
      <button type="submit">Add Employee</button>
    </form>
  );
}

export default EmployeeForm;
