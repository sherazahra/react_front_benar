import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(' ');
    const [password, setPassword] = useState(' ');

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register',{
                username: username,
                password: password,
            });
            console.log('Pendaftaran behasil: ', response.data);
            navigate('/login');
            window.location.reload();
        }catch (error){
            console.error('Gagal mendaftar:', error);
        }
    };

    return(

        <div className="container">
            <h2 className="mt-5">Buat Akun</h2>
            <div className="from-group">
                <label>Username:</label>
                <input className="from-group" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <br/>
            <div className="from-group">
                <label>Password:</label>
                <input className="from-group" type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className="btn btn-primary mt-2" onClick={handleRegister}>Submit</button>
        </div>
    );
}

export default Register;