import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
export default function Register(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const history = useHistory();
    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }
        try {
            const response = await api.post('ongs', data);
            alert(`Your access ID is ${response.data.id}`);
            history.push('/');
        }catch(e){
            alert("An error has occured");
        }
    }

    return (
    <div className="register-container">
       <div className="content">

        <section className="form">
            <img src={logoImg} alt="Logo heroes" />
            <h1>Create an account</h1>
            <p>Make your register, be a member and help people to find incidents in your ONGs</p>
            <Link className="back-link" to="/">
                <FiArrowLeft size={16} color="#E02041" />
                Back to Logon
            </Link>
        </section>
        <form onSubmit={handleRegister}>
            <input id="ongName" placeholder="ONG's name" 
                onChange={e => setName(e.target.value)}
            />
            <input id="email" type="email" placeholder="E-mail" 
                onChange={e => setEmail(e.target.value)}
            />
            <input id="whatsapp" placeholder="Whatsapp"
                onChange={e => setWhatsapp(e.target.value)}
            />
            <div className="input-group">
                <input id="city" placeholder="City"
                    onChange={e => setCity(e.target.value)}
                />
                <input id="uf" placeholder="UF" style={{width: 80}} 
                    onChange={e => setUf(e.target.value)}
                />
            </div>
            <button className="button" type="submit"> Register </button>
        </form>
       </div>
    </div>
    )
}