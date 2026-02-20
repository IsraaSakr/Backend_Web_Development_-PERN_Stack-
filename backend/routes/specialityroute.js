import express, { Router } from "express" ;
import pool from "../db.js";

const specialityRoute = Router(); 
specialityRoute.use(express.json());

specialityRoute.get("/", async(req,res)=>{
    const speciality=await pool.query("SELECT * FROM speciality");
    res.json({speciality: speciality.rows, count: speciality.rows.length, message: "speciality retrieved successfully"});
})

specialityRoute.post("/", async(req,res)=>{
    const {specialityName}=req.body;
    const addspeciality = await pool.query("insert into speciality (specialityname) values ($1) returning *;", [specialityName]);
    res.json({message: "speciality added successfully", speciality: addspeciality.rows[0]});
})

specialityRoute.put("/:id", async(req,res)=>{
    const {specialityName}=req.body;
    const updatespeciality = await pool.query("update speciality set specialityname = $1 where specialityid = $2 returning *;",
        [specialityName, req.params.id]);
    res.json({message: "speciality updated successfully", speciality: updatespeciality.rows[0]});
})

specialityRoute.delete("/:id", async(req,res)=>{
    const deletespeciality = await pool.query("delete from speciality where specialityid = $1;", [req.params.id]);
    res.json({message: "speciality deleted successfully"});
})

export default specialityRoute;
