import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    // usestates
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault(); //prevent page reload

        // send the result to the login route acording to what the backend expects
        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, userpassword: password })
        });

        const result = await response.json();
        //since the result is json object we have to nitpick from it
        if(result.token) {
            // Save token so we can use it in future requests
            localStorage.setItem("token", result.token);
        }

        if (response.status === 201) { //in my case the backend returns 201, so it depends
            navigate("/list");
        } else {
            console.log(result.message);
        }

        // Reset form fields back to empty/default
        setUsername("");
        setPassword("");
        setMessage("");
    }

    return (
        <div>
            <form>
                <div className="input-control">
                    <label htmlFor="username">Username</label>
                    {/* value connects input to state, onChange updates state when user types */}
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="input-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button onClick={handleLogin}>Login</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}