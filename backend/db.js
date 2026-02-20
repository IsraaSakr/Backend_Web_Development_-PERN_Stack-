import {Pool} from 'pg';

// Create a new connection pool to the PostgreSQL database
// POOL takes 4 parameters: host, user, password, database, port
const pool = new Pool({
    host:"localhost",
    user:"postgres",
    password:"admin",
    database:"webCourse_db",
    port:5432
});

export default pool;
