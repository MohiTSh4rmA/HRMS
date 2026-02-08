import React from "react";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import Attendance from "./Attendance";
import DashboardStats from "./DashboardStats";
import "./styles.css";

function App() {
  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>HRMS Lite – Admin Dashboard</h1>
      </div>

      {/* Dashboard Stats */}
      <div style={{ marginBottom: "30px" }}>
        <DashboardStats />
      </div>

      {/* Add Employee */}
      <div className="card">
        <EmployeeForm />
      </div>

      {/* Employee List */}
      <div className="card">
        <EmployeeList />
      </div>

      {/* Attendance Management */}
      <div className="card">
        <Attendance />
      </div>
    </div>
  );
}


export default App;
