import express, { Router } from "express" ;
import pool from "../db.js";
import testMiddleware from "../middleware/test.js";
import { auth, isAdmin } from "../middleware/auth.js";
 
const doctorRoute = Router(); 
doctorRoute.use(express.json());

doctorRoute.get("/", async(req,res)=>{
    try{
    const doctor=await pool.query(`
        SELECT doctor.doctorid, doctor.doctorfirstname, doctor.doctorfamilyname, speciality.specialityname, city.cityname
        FROM doctor
        JOIN speciality ON doctor.specialityid = speciality.specialityid
        JOIN city ON doctor.cityid = city.cityid
    `);
    res.status(200).json({doctor: doctor.rows, count: doctor.rows.length, message: "doctor retrieved successfully"});
    }
    catch(err){
        res.status(500).json({msg:err.message,success:false});
    }
})

doctorRoute.post("/", auth, isAdmin, async(req,res)=>{
    try{
    const {doctorfirstname, doctorlastname, specialityid, cityid}=req.body;
    if(typeof doctorfirstname !=="string" || typeof doctorlastname !=="string" || isNaN(specialityid) || isNaN(cityid))
        return res.status(400).json({msg:"invalid data"});
    const adddoctor = await pool.query("insert into doctor (doctorfirstname, doctorfamilyname, specialityid, cityid) values ($1, $2, $3, $4) returning *;", 
        [doctorfirstname, doctorlastname, specialityid, cityid]);
    res.status(201).json({message: "doctor added successfully", doctor: adddoctor.rows[0]});
    }
    catch(err){
        res.status(500).json({msg:err.message,success:false});
    }
})

doctorRoute.put("/:id", testMiddleware, async(req,res)=>{
    try{
        const {doctorfirstname, doctorlastname}=req.body;
        if(typeof doctorfirstname !=="string" || typeof doctorlastname !=="string" || isNaN(req.params.id))
            return res.status(400).json({msg:"invalid data"});
        const updatedoctor = await pool.query("update doctor set doctorfirstname = $1, doctorfamilyname = $2 where doctorid = $3 returning *;",
            [doctorfirstname, doctorlastname, req.params.id]);
        if(updatedoctor.rowCount===0)
            return res.status(404).json({msg:"not found"})    
        res.json({message: "doctor updated successfully", doctor: updatedoctor.rows[0]});
    }
    catch(err){
        res.status(500).json({msg:err.message,success:false});
    }
})


doctorRoute.delete("/:id", auth, isAdmin, async(req,res)=>{
    try{
        if(isNaN(req.params.id))
            return res.status(400).json({msg:"invalid data"});
        const deletedoctor = await pool.query("delete from doctor where doctorid = $1;", [req.params.id]);
        if(deletedoctor.rowCount===0)
            return res.status(404).json({msg:"not found"});
        res.json({message: "doctor deleted successfully"});
    }catch(err){
        req.status(500).json({msg: err.message, success:false});
    }
})

export default doctorRoute;
