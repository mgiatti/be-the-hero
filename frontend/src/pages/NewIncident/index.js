import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const ong_id = localStorage.getItem("id");
            await api.post("incidents", { title, description, value }, {
                headers: {
                    Authorization: ong_id
                }
            })
            history.push('/profile');
        }catch(e){
            alert("An error has occured. Please try again");
        }
    }

    return (
    <div className="newincident-container">
       <div className="content">

        <section className="form" >
            <img src={logoImg} alt="Logo heroes" />
            <h1>Create new incidents</h1>
            <p>Describe the case to find out a hero</p>
            <Link className="back-link" to="/">
                <FiArrowLeft size={16} color="#E02041" />
                Back to Logon
            </Link>
        </section>
        <form onSubmit={handleSubmit}>
            <input id="ongName" placeholder="incident title" onChange={(e)=> setTitle(e.target.value)} />
            <textarea id="email" type="email" placeholder="Description" onChange={(e)=> setDescription(e.target.value)} />
            <input id="whatsapp" placeholder="value in R$" onChange={(e)=> setValue(e.target.value)} />
            <button className="button" type="submit"> Register </button>
        </form> 
       </div>
    </div>
    )
}