import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(' ');
    const [password, setPassword] = useState(' ');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login',{
                username: username,
                password: password,
            });
            const token = response.data.token;

            if (token) {
                localStorage.setItem('token', token);
                navigate('/mhs');
                window.location.reload();
            }else {
                console.errr ('Gagal login : token tidak di terima');
            }   
        }catch (error){
            if (error.response.status === 402) {
                console.errr ('Gagal login :kata dandi atau username salah');
            }else {
                console.error('Gagar login:', error);
            }
        }  
    };

    return(

        <div className="container">
            <h2 className="mt-5">Login</h2>
            <div className="from-group">
                <label>Username:</label>
                <input className="from-group" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <br/>
            <div className="from-group">
                <label>Password:</label>
                <input className="from-group" type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className="btn btn-primary mt-2" onClick={handleLogin}>Login</button>
            <p className="mt-2" >Belum punya akun? <a href="/register">Daftar</a></p>
        </div>
    );
}

export default Login;