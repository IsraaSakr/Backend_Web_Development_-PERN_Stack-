import { useState, useEffect, useRef} from "react";

export default function Form() {
    // useState creates variables that React watches - when they change, the UI updates automatically
    const [message, setMessage] = useState("");
    const [cities, setCities] = useState([]);
    const [name, setName] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [specs, setSpecs] = useState([]);
    const [selectedCity, setSelectedCity] = useState(0);
    const [selectedSpec, setSelectedSpec] = useState(0);
    
    // useRef creates a reference to a DOM element (the input field in this case)
    const nameRef = useRef();

    // Fetch cities from backend and store in state
    async function loadCity() {
        const city = await fetch("http://localhost:3000/city");
        const result = await city.json();
        setCities(result.city); // Updates cities state, triggers re-render
    }

    // Fetch specialities from backend and store in state
    async function loadSpec(){
        const spec = await fetch("http://localhost:3000/speciality");
        const result = await spec.json();
        setSpecs(result.speciality);
    }

    // useEffect runs once when component first loads (empty [] means "run once")
    useEffect(() => {
        loadCity();
        loadSpec();
    }, []);

    // Handles form submission - adds new doctor to database
    async function addDoctor(e){
        e.preventDefault(); // Stops page from refreshing
        
        // Send POST request to backend with form data
        const response = await fetch("http://localhost:3000/doctor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth": "admin"
            },
            body: JSON.stringify({
                doctorfirstname: name,
                doctorlastname: familyName,
                specialityid: parseInt(selectedSpec),
                cityid: parseInt(selectedCity)
            })
        });
        
        const result = await response.json();
        setMessage(result.message);
        
        // Reset form fields back to empty/default
        setName("");
        setFamilyName("");
        setSelectedCity(0);
        setSelectedSpec(0);
        nameRef.current.focus(); // Put cursor back in name field
        alert(result.message);
    }

    return (
        <div>
            <form action="">
                <div className="input-control">
                    <label htmlFor="drname">Doctor Name</label>
                    {/* value connects input to state, onChange updates state when user types */}
                    <input type="text" id="drname" value={name} onChange={(e) => setName(e.target.value)} autoFocus ref={nameRef}/>
                </div>

                <div className="input-control">
                    <label htmlFor="drfamily">Doctor Last Name</label>
                    <input type="text" id="drfamily" value={familyName} onChange={(e) => setFamilyName(e.target.value)} />
                </div>

                <div className="input-control">
                    <label htmlFor="city">City</label>
                    <select id="city" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                        <option value="0" hidden>select a city</option>
                        {/* map loops through cities array and creates an option for each */}
                        {cities.map((city) => (
                            <option value={city.cityid} key={city.cityid}>
                                {city.cityname}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="input-control">
                    <label htmlFor="spec">Speciality</label>
                    <select id="spec" value={selectedSpec} onChange={(e) => setSelectedSpec(e.target.value)}>
                        <option value="0" hidden>select a speciality</option>
                        {specs.map((spec) => (
                            <option value={spec.specialityid} key={spec.specialityid}>
                                {spec.specialityname}
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={addDoctor}>Add a new Dr</button>
                {/* Only show message if it exists (&&) */}
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}