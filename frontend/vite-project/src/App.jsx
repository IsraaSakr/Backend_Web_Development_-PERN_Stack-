import Form from "./form";  
import List from "./list";
import Login from "./login";
import {Link, Routes, Route, Navigate} from "react-router-dom";

export default function App() {
  // Form is a function that returns a form element. We are importing it from the form.jsx file and then rendering it in the App component.
  // return <div><Form /><List /></div>;

  return(
    <>
    <header>
      <Link to="/add">add new doctor</Link> &nbsp;&nbsp;
      <Link to="/list">list of doctors</Link>
      <br/>
      <Link to="/login">login</Link>
    </header>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />}/>
      <Route path="/add" element={<Form />}/>
      <Route path="/list" element={<List />}/>
      <Route path="/login" element={<Login />}/>
    </Routes>
    </>
  );
}
