import express, { Router } from "express" ;
import pool from "../db.js";

const cityRoute = Router(); 
cityRoute.use(express.json());

cityRoute.get("/", async(req,res)=>{
    const city=await pool.query("SELECT * FROM city");
    res.json({city: city.rows, count: city.rows.length, message: "city retrieved successfully"});
})

cityRoute.post("/", async(req,res)=>{
    const {cityName}=req.body;
    const addcity = await pool.query("insert into city (cityname) values ($1) returning *;", [cityName]);
    res.json({message: "city added successfully", city: addcity.rows[0]});
})

cityRoute.put("/:id", async(req,res)=>{
    const {cityName}=req.body;
    const updatecity = await pool.query("update city set cityname = $1 where cityid = $2 returning *;",
        [cityName, req.params.id]);
    res.json({message: "city updated successfully", city: updatecity.rows[0]});
})

cityRoute.delete("/:id", async(req,res)=>{
    const deletecity = await pool.query("delete from city where cityid = $1;", [req.params.id]);
    res.json({message: "city deleted successfully"});
})

export default cityRoute;
