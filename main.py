from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine, SessionLocal
import models, schemas

Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/employees")
def add_employee(employee: schemas.EmployeeCreate):
    db = SessionLocal()

    existing = db.query(models.Employee).filter(
        models.Employee.employee_id == employee.employee_id
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Employee already exists")

    new_emp = models.Employee(**employee.dict())
    db.add(new_emp)
    db.commit()

    return {"message": "Employee added successfully"}


@app.get("/employees")
def get_employees():
    db = SessionLocal()
    return db.query(models.Employee).all()


@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: str):
    db = SessionLocal()

    emp = db.query(models.Employee).filter(
        models.Employee.employee_id == employee_id
    ).first()

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(emp)
    db.commit()

    return {"message": "Employee deleted successfully"}


@app.post("/attendance")
def mark_attendance(attendance: schemas.AttendanceCreate):
    db = SessionLocal()

    record = models.Attendance(**attendance.dict())
    db.add(record)
    db.commit()

    return {"message": "Attendance marked successfully"}


@app.get("/attendance/{employee_id}")
def get_attendance(employee_id: str):
    db = SessionLocal()
    return db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id
    ).all()
