import express, { Router } from "express" 
import pool from "../db.js";

const supplierRoute = Router(); // router instance
supplierRoute.use(express.json());

supplierRoute.get("/", async(req,res)=>{
    const suppliers=await pool.query("SELECT * FROM suppliers");
    res.json({suppliers: suppliers.rows, count: suppliers.rows.length, message: "Suppliers retrieved successfully"});
})

supplierRoute.post("/", async(req,res)=>{
    const {supplierName}=req.body;
    const addSupplier = await pool.query("insert into suppliers (suppliername) values ($1) returning *;", [supplierName]);
    res.json({message: "Supplier added successfully", supplier: addSupplier.rows[0]});
})

supplierRoute.put("/:id", async(req,res)=>{
    const {supplierName}=req.body;
    const updateSupplier = await pool.query("update suppliers set suppliername = $1 where supplierid = $2 returning *;",
        [supplierName, req.params.id]);
    res.json({message: "Supplier updated successfully", supplier: updateSupplier.rows[0]});
})

supplierRoute.delete("/:id", async(req,res)=>{
    const deleteSupplier = await pool.query("delete from suppliers where supplierid = $1;", [req.params.id]);
    res.json({message: "Supplier deleted successfully"});
})

export default supplierRoute;