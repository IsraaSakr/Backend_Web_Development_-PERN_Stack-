import express, { Router } from "express" 
import pool from "../db.js";

const productRoute = Router(); // router instance
productRoute.use(express.json());


productRoute.get("/", async(req,res)=>{
    const products = await pool.query("SELECT * FROM products");
    res.json({products: products.rows, count: products.rows.length, message: "Products retrieved successfully"});
})
// returning * to get the inserted row back
productRoute.post("/:id", async(req,res)=>{
    const {productName, productPrice, productExist, productEXP}=req.body;
    const addProduct = await pool.query
    ("insert into products (productname, productprice, productexist, productexp, supplierid) values ($1, $2, $3, $4, $5) returning *;",
    [productName, productPrice, productExist, productEXP, req.params.id]);
    res.json({message: "Product added successfully", product: addProduct.rows[0]});
})

productRoute.put("/:id", async(req,res)=>{
    const {productPrice, productExist}=req.body;
    const updateProduct = await pool.query("update products set productprice = $1, productexist = $2 where productid = $3;",
        [productPrice, productExist, req.params.id]);
    res.send(`Product updated successfully`);
})

productRoute.delete("/:id", async(req,res)=>{
    const deleteProduct = await pool.query("delete from products where productid = $1;", [req.params.id]);
    res.send(`Product deleted successfully`);
})

export default productRoute;
