// Import Express, you could've used keyword "require" if you were using CommonJS
import express from "express" 
import pool from "./db.js"; // Import the database connection pool
import productRoute from "./routes/productroutes.js";
import supplierRoute from "./routes/supplierroutes.js";
import doctorRoute from "./routes/doctorroute.js";
import specialityRoute from "./routes/specialityroute.js";
import cityRoute from "./routes/cityroute.js";
import patientRoute from "./routes/patientroute.js";
import assignRoute from "./routes/assigndoctortopatient.js";
import usersRoute from "./routes/usersroute.js";
import cors from "cors";

// Create an Express application
const app = express();
app.use(cors())
app.use(express.static("public"));
app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/products", productRoute); // Use the product routes
app.use("/suppliers", supplierRoute); 
app.use("/doctor", doctorRoute); 
app.use("/speciality", specialityRoute); 
app.use("/city", cityRoute); 
app.use("/patient", patientRoute);
app.use("/assign", assignRoute);
app.use("/users", usersRoute);

// Define a route for the root URL
// get function takes two arguments: route path and a callback function
// req represents the request object
// res represents the response object
app.get("/", (req, res) => {
  res.send("Hello, World!");
})

// Start the server
// listen function takes two arguments: port number and a callback function
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
  // Call the function to check database connection when server starts
  checkDatabaseConnection();
})

// Function to check database connection
async function checkDatabaseConnection() {
  try{
    const a = await pool.query("select 1")
  console.log("connection is established.")
  }catch(err){
    console.error("Database connection failed:", err);
  }
}

// to call the db use async on the function
// These are simple CRUD routes for the vendors table, 
// the pattern is clear, define a route, async function, query the db, send response
app.get("/vendors", async(req, res) => {
  const vendors = await pool.query("SELECT * FROM vendors");
  res.send(vendors.rows);
})

app.post("/addVendor", async(req, res) => {
  const {vendorName, vendorIsLocal, vendorCost, vendorDob}=req.body; // Destructure the request body to get vendor details  
  const addVendor = await pool.query("insert into vendors (vendorname, vendorislocal, vendorcost, vendordob) values ($1, $2, $3, $4);", 
    [vendorName, vendorIsLocal, vendorCost, vendorDob]);
  res.send(`Vendor added successfully`);
})

app.put("/updateVendor/:id", async(req, res) => {
  const updateVendor = await pool.query("update vendors set vendorcost = $1, vendorislocal = $2 where vendorid = $3;", 
    [req.body.vendorCost, req.body.vendorIsLocal, req.params.id]);
    const vendorName = await pool.query("select vendorname from vendors where vendorid = $1;", [req.params.id]);
  res.send(`Vendor ${vendorName.rows[0].vendorname} was updated successfully`); // Access vendor name from the query result
})

app.delete("/deleteVendor/:id", async(req, res) => { // :id is a route parameter
  const deleteVendor = await pool.query("delete from vendors where vendorid = $1;", [req.params.id]);
  res.send("Vendor deleted successfully");
})

//products and suppliers have a one-to-many relationship

/*
app.post("/addProduct", async(req, res) => {
  const {productName, productPrice, productExist, productEXP, supplierName}=req.body;
  const supplieridResult = await pool.query("select supplierid from suppliers where suppliername = $1;", [supplierName]);
  const addProduct = await pool.query("insert into products (productname, productprice, productexist, productexp, supplierid) values ($1, $2, $3, $4, $5);",
    [productName, productPrice, productExist, productEXP, supplieridResult.rows[0].supplierid]);
  res.send(`Product added successfully`);
})

app.post("/addProduct/:id", async(req, res) => {
  const {productName, productPrice, productExist, productEXP}=req.body;
  const addProduct = await pool.query("insert into products (productname, productprice, productexist, productexp, supplierid) values ($1, $2, $3, $4, $5);",
    [productName, productPrice, productExist, productEXP, req.params.id]);
  res.send(`Product added successfully`);
})

app.get("/productsWithSupplier", async(req,res) => {
  const result = await pool.query("select suppliername, productname, productprice, productexist from products join suppliers on products.supplierid=suppliers.supplierid")
  res.send(result.rows);
})

// all the supplier routes

app.get("/suppliers", async(req, res) => {
  const suppliers = await pool.query("SELECT * FROM suppliers");
  res.send(suppliers.rows);
})

app.post("/supplier", async(req,res)=>{
  const {supplierName}=req.body;
  const addSupplier = await pool.query("insert into suppliers (suppliername) values ($1);", [supplierName]);
  res.send(`Supplier added successfully`);
})

*/