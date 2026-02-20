import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function List() {
    // doctors holds the array, message holds the backend response text
    const [doctors, setDoctors] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); 

    // Fetches all doctors from the backend and stores them in state
    async function loadDoctors() {
        const data = await fetch("http://localhost:3000/doctor/");
        const result = await data.json();
        setMessage(result.message);
        setDoctors(result.doctor);
    }

    // Runs loadDoctors once when the component first loads
    useEffect(() => {
        loadDoctors();
    }, []);

    async function handleDelete(x){
        if(window.confirm("are you sure?")){
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3000/doctor/${x}`, {
                method: "DELETE",
                headers: { "token": token }
            });
            const result = await response.json();
            if(response.status === 200){
                const newList = doctors.filter((d) => d.doctorid != x);
                setDoctors(newList);
            } else {
                alert(result.msg);
            }
        }
    }

    function handleLogout(){
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            <h1 className="maintitle">Hello, this is a list of doctors</h1>
            <span>{message}</span>
            <div className="result">
                {/* Loop through doctors array and render a row for each one */}
                {doctors.map((dr) => (
                    // key helps React track each item in the list
                    <p key={dr.doctorid}>
                        <span className="spn">{dr.doctorid}</span>
                        <span className="spn">{dr.doctorfirstname}</span>
                        <span className="spn">{dr.doctorfamilyname}</span>
                        <span className="spn">{dr.specialityname}</span>
                        <span className="spn">{dr.cityname}</span>
                        <button onClick={()=>handleDelete(dr.doctorid)}>delete</button>
                    </p>
                ))}
            </div>
        </div>
    );
}
