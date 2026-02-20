import express, { Router } from "express" ;
import pool from "../db.js";

const assignRoute = Router(); 
assignRoute.use(express.json());

assignRoute.get("/", async(req,res)=>{
    const assign=await pool.query("SELECT * FROM patient_doctor");
    res.json({assign: assign.rows, count: assign.rows.length, message: "assign retrieved successfully"});
})

assignRoute.post("/", async(req,res)=>{
    const {doctorid, patientid}=req.body;
    const addassign = await pool.query("insert into patient_doctor (patientid, doctorid) values ($1, $2) returning *;", [patientid, doctorid]);
    res.json({message: "a patient was assigned for a doctor", assign: addassign.rows[0]});
})

assignRoute.put("/doctor/:doctor_id/patient/:patient_id", async(req,res)=>{
    const {doctorid, patientid}=req.body;
    const updateassign = await pool.query("update patient_doctor set doctorid = $1, patientid = $2 where doctorid = $3 and patientid = $4 returning *;",
        [doctorid, patientid, req.params.doctor_id, req.params.patient_id]);
    res.json({message: "assigning was updated successfully", assign: updateassign.rows[0]});
})

assignRoute.delete("/doctor/:doctor_id/patient/:patient_id", async(req,res)=>{
    const deleteassign = await pool.query("delete from patient_doctor where doctorid = $1 and patientid = $2;", 
        [req.params.doctor_id, req.params.patient_id]);
    res.json({message: "assigning is deleted successfully"});
})

export default assignRoute;
