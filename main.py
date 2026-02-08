from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List
from datetime import date

app = FastAPI()

# =======================
# CORS (FINAL SAFE FIX)
# =======================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # allow all origins
    allow_credentials=False,      # MUST be False with "*"
    allow_methods=["*"],
    allow_headers=["*"],
)

# =======================
# MODELS
# =======================
class Employee(BaseModel):
    id: int
    employee_id: str
    name: str
    email: EmailStr
    department: str


class EmployeeCreate(BaseModel):
    employee_id: str
    name: str
    email: EmailStr
    department: str


class Attendance(BaseModel):
    employee_id: str
    status: str
    date: date | None = None


# =======================
# IN-MEMORY DATA
# =======================
employees: List[Employee] = []
attendance_records: List[dict] = []


# =======================
# ROUTES
# =======================
@app.get("/")
def root():
    return {"message": "HRMS Backend Running"}


@app.get("/employees", response_model=List[Employee])
def get_employees():
    return employees


@app.post("/employees", response_model=Employee)
def add_employee(emp: EmployeeCreate):
    for e in employees:
        if e.employee_id == emp.employee_id:
            raise HTTPException(status_code=400, detail="Employee already exists")

    new_emp = Employee(
        id=len(employees) + 1,
        employee_id=emp.employee_id,
        name=emp.name,
        email=emp.email,
        department=emp.department,
    )
    employees.append(new_emp)
    return new_emp


@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: int):
    global employees
    employees = [e for e in employees if e.id != emp_id]
    return {"message": "Employee deleted"}


@app.post("/attendance")
def mark_attendance(att: Attendance):
    attendance_records.append({
        "employee_id": att.employee_id,
        "status": att.status,
        "date": att.date or date.today()
    })
    return {"message": "Attendance marked"}


@app.get("/attendance")
def get_attendance():
    return attendance_records
