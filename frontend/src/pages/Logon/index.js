import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import { Link, useHistory } from 'react-router-dom'
import heroesTag from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Logon(){
    const [userId,setUserId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();
        try{
            const response = await api.post("session", { id: userId});
            localStorage.setItem("id", userId);
            localStorage.setItem("name", response.data.name);
            history.push("/profile");
        }catch(e){
            alert("Not able to login. Please try again");
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} />
                <form onSubmit={handleLogin}>
                    <h1>Sign in</h1>
                    <input id="userId" placehoder="User ID"
                        onChange={e => setUserId(e.target.value)}
                    />
                    <button className="button" type="submit">Login</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Create an account
                    </Link>
                </form>
            </section>
            <img src={heroesTag} />
        </div>
    )
}