import express, { Router } from "express" ;
import pool from "../db.js";

const patientRoute = Router(); 
patientRoute.use(express.json());

patientRoute.get("/", async(req,res)=>{
    const patient=await pool.query("SELECT * FROM patient");
    res.json({patient: patient.rows, count: patient.rows.length, message: "patient retrieved successfully"});
})

patientRoute.post("/", async(req,res)=>{
    const {patientfirstname, patientlastname, cityid}=req.body;
    const addpatient = await pool.query("insert into patient (patientfirstname, patientlastname, cityid) values ($1, $2, $3) returning *;", 
        [patientfirstname, patientlastname, cityid]);
    res.json({message: "patient added successfully", patient: addpatient.rows[0]});
})

patientRoute.put("/:id", async(req,res)=>{
    const {patientfirstname, patientlastname}=req.body;
    const updatepatient = await pool.query("update patient set patientfirstname = $1, patientlastname = $2 where patientid = $3 returning *;",
        [patientfirstname, patientlastname, req.params.id]);
    res.json({message: "patient updated successfully", patient: updatepatient.rows[0]});
})

patientRoute.delete("/:id", async(req,res)=>{
    const deletepatient = await pool.query("delete from patient where patientid = $1;", [req.params.id]);
    res.json({message: "patient deleted successfully"});
})

export default patientRoute;
