import express, { Router } from "express" ;
import pool from "../db.js";
import bcrypt from "bcrypt";
import upload from "../upload.js";
import jwt from "jsonwebtoken";

const usersRoute = Router();
usersRoute.use(express.json());

usersRoute.get("/", async(req, res)=>{
    const users = await pool.query("select * from users");
    res.json(users.rows);
})

// post with image
// upload is middleware that processes the incoming request and makes the form data available in req.body. 
// The none() method is used to indicate that we are not expecting any files to be uploaded, only form data.
// single() method is used to handle a single file upload, and the argument "img" specifies the name of the form field that contains the file.
usersRoute.post("/upload", upload.single("img") , async(req, res)=>{
    try{
        const check=await pool.query("select * from users where username = $1", [req.body.username]);
        if(check.rows.length > 0){
            return res.status(409).json({message: "Username already exists"});
        }
        const {username, userpassword}=req.body;
        const hashpassword= await bcrypt.hash(userpassword, 10);

        const adduser = await pool.query("insert into users (username, userpassword, userprofile) values ($1, $2, $3) returning *;", 
            [username, hashpassword, req.file.filename]);

        const newUser={...adduser.rows[0]};
        delete newUser.userpassword;

        res.status(201).json({message: "user added successfully", user: newUser});
    }catch(err){
        res.status(500).json({message: "Error adding user", error: err.message});
    }
})

// post without image
usersRoute.post("/", async(req, res)=>{
    try{
        const check=await pool.query("select * from users where username = $1", [req.body.username]);
        if(check.rows.length > 0){
            return res.status(409).json({message: "Username already exists"}); //409: conflict
        }
        const {username, userpassword}=req.body;
        // Hash the password before storing it in the database, this function takes 2 parameters, 
        // the password to hash and the number of salt rounds (10 is a common choice)
        const hashpassword= await bcrypt.hash(userpassword, 10);

        const adduser = await pool.query("insert into users (username, userpassword) values ($1, $2) returning *;", 
            [username, hashpassword]);

        const newUser={...adduser.rows[0]}; // Create a new user object based on the result of the insert query
        // The adduser.rows[0] contains the newly added user data, including the hashed password. 
        // but doesnt point to the same memory location as the original object, 
        // so we can safely modify it without affecting the original data in the database.
        delete newUser.userpassword; // Remove the password from the response for security

        res.status(201).json({message: "user added successfully", user: newUser});
    }catch(err){
        res.status(500).json({message: "Error adding user", error: err.message});
    }
})

usersRoute.post("/login", async(req, res)=>{
    try{
        // check if user exists
        const check=await pool.query("select * from users where username = $1", [req.body.username]);
        // if the query returns 0 rows, it means user doesn'y exist
        if(check.rows.length === 0){
            return res.status(404).json({message: "User does not exist"});
        }
        const {username, userpassword}=req.body;
        // compare the provided password with the hashed password stored in the database using bcrypt's compare function
        // userpassword: provided password
        // check.rows[0].userpassword: hashed password from the database (check has the query result from before)
        const checkpassword = await bcrypt.compare(userpassword, check.rows[0].userpassword);
        // if statement to determine the outcome of the compariso

        if(!checkpassword){
            return res.status(409).json({message: "Invalid credentials"});
        }
        // considering the user credntials are correct, return the user credentials and indeicate he's logged in
        const loginuser = await pool.query("select * from users where username = $1", 
            [username]);
        if(loginuser.rows.length === 0){
            return res.status(409).json({message: "Invalid credentials"});
        }

        const token = jwt.sign(
            {
                userid:check.rows[0].userid,
                userrole:check.rows[0].userrole
            },
            "edgvhgvbujjugvftgdxsesxxftyghb",
            {expiresIn: "1hr"}
        )

        res.status(201).json({message: "Login is successful", user: loginuser.rows[0], token: token});
    }catch(err){
        res.status(500).json({message: "Error adding user", error: err.message});
    }
})

export default usersRoute;
