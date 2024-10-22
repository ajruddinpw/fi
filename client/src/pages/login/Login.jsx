import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './login.scss';
import newRequest from "../../utils/newRequest";
const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const res=await newRequest.post('https://fi-hwfz.vercel.app/auth/login',{username,password});
            localStorage.setItem("currentUser",JSON.stringify(res.data));
            navigate('/');
        } catch (err) {
            setError(err.response.data.error);
        }

    }
    return ([
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h1>Sign in</h1>
                <label htmlFor="">Username</label>
                <input
                    type="text"
                    name="username"
                    placeholder="johndoe"
                    onChange={e => setUsername(e.target.value)}
                />
                <label htmlFor="">Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                { error && <p className="error">{error}</p>}
            </form>
        </div>
    ]);
}
export default Login;
