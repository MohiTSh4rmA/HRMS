import React, { useEffect, useState } from "react";
import API from "./api";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const loadEmployees = () => {
    fetch(`${API}/employees`)
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch(() => setError("Backend not reachable"));
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const deleteEmployee = (id) => {
    fetch(`${API}/employees/${id}`, {
      method: "DELETE",
    }).then(loadEmployees);
  };

  return (
    <div>
      <h2>Employees</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name} ({emp.employee_id}) - {emp.department}
            <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
