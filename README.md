# Backend Web Development – PERN Stack

Personal notes and project files from a backend web development course at the **Ghobeiry Municipality Vocational Training Center**, documented by **Israa Sakr**.

---

## 🛠 Tech Stack

- **PostgreSQL** – Database
- **Express.js** – Backend framework
- **React** – Frontend
- **Node.js** – Runtime

---

## 📚 Sessions

### Session 1 – Project Setup (Tue, Jan 27, 2026)
- Initializing a Node project with `npm init -y`
- Installing Express, Nodemon, pg, dotenv
- Connecting to a PostgreSQL database
- Creating tables manually and via SQL
- Basic CRUD operations in PostgreSQL

### Session 2 – Async & Fetching Data (Thu, Jan 29, 2026)
- Working with async/await and Promises
- Key concepts: async functions return a Promise, `await` pauses the function not the thread
- Fetching data from the database through routes
- Testing endpoints with Postman
- Using JSON Placeholder for mock data

### Session 3 – Full CRUD Routes (Tue, Feb 3, 2026)
- Full CRUD routes (GET, POST, PUT, DELETE)
- Using `req.params` and `req.body`
- Preventing SQL injection with parameterized queries
- Simplifying and cleaning up route code
- Organizing routes into separate files

### Session 4 – Relationships & Foreign Keys (Thu, Feb 5, 2026)
- One-to-one, one-to-many, many-to-many relationships
- Creating foreign keys (manually and via SQL)
- Cascade delete behavior
- Joining tables with SQL JOIN
- Viewing ER diagrams in pgAdmin

### Session 5 – Many-to-Many & Error Handling (Fri, Feb 6, 2026)
- Designing a many-to-many relationship (doctors & patients)
- Junction tables
- Full CRUD for multiple entities: City, Speciality, Doctor, Patient, Assign
- try/catch for error handling in all routes
- Validating input and returning proper error messages

### Session 6 – Users & Auth Basics (Tue, Feb 10, 2026)
- Creating a users table
- Registration route with input validation
- Hashing passwords with **bcrypt** (salting, security tradeoffs)
- Difference between hashing and encryption

### Session 7 – File Uploads & Middleware (Thu, Feb 12, 2026)
- Uploading images with **Multer**
- Preserving original file names
- Writing custom middleware functions
- Connecting the backend to a simple HTML/JS frontend using `fetch`

### Session 8 – HTTP Codes & React Intro *(Fri, Feb 13, 2026)*
- HTTP status codes reference
- React core concepts: components, useState, useEffect, props, lists with `.map()`
- Controlled components and form handling in React

### Session 9 – React Frontend (Tue, Feb 17, 2026)
- Setting up a React project with Vite
- Installing and configuring **cors** on the backend
- Building Form and List components
- Fetching data from the backend in React
- Controlled form components and state management

### Session 10 – React Routing & JWT (Wed, Feb 18, 2026)
- Client-side routing with React Router (`BrowserRouter`, `Routes`, `Link`)
- Login form and authentication flow
- Generating and verifying **JWT tokens**
- Storing tokens in localStorage
- Protecting routes with auth middleware
- Logout functionality (clearing localStorage, redirecting with `useNavigate`)
- Role-based access control (admin vs regular user)

---

## 📝 Notes

The `documentation/` folder contains the full course notes in PDF format and Word format, covering all sessions with code examples and Postman screenshots. You can also find sql quereies in the backend folder along with any file mentioned during the course.
