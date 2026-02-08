import API from "./api";
import React, { useEffect, useState } from "react";

const API = "https://hrms-lite-backend-8mbb.onrender.com";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  const loadEmployees = () => {
    fetch(`${API}/employees`)
      .then((res) => res.json())
      .then(setEmployees);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    await fetch(`${API}/employees/${id}`, {
      method: "DELETE",
    });

    loadEmployees();
  };

  return (
    <>
      <h3>Employee List</h3>

      {employees.length === 0 && (
        <p className="empty">No employees added yet.</p>
      )}

      {employees.map((e) => (
        <div className="employee-row" key={e.employee_id}>
          <span>
            <strong>{e.name}</strong> — {e.department}
          </span>
          <button onClick={() => deleteEmployee(e.employee_id)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
}

export default EmployeeList;
