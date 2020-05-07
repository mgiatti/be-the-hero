import React, { useEffect, useState } from 'react';
import { FiPower, FiTrash } from 'react-icons/fi';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Profile(){
    const ongId = localStorage.getItem("id");
    const ongName = localStorage.getItem("name");
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    useEffect(()=>{
        fetchData();
      
    },[],[ongId]);

    async function removeIncident(incidentId){
        try{
            await api.delete(`incidents/${incidentId}`, { headers: { Authorization : ongId }},);
            setIncidents(incidents.filter(incident => incident.id !== incidentId));
        }catch(e){
            alert("An error has occured. Please try again");
        }
    }

    async function fetchData(){
        try{
            const response = await api.get("profile", { headers: { Authorization : ongId }});
            setIncidents(response.data);
        }catch(e){
        
        }   
    }

    async function logout(){
        localStorage.clear();
        history.push("/");
    }

    return (
    <div className="profile-container">
        <header className="form">
            <img src={logoImg} alt="Logo heroes" />
            <span> Welcome, {ongName}</span>
            <p>Make your register, be a member and help people to find incidents in your ONGs</p>
            <Link className="button" to="/incidents/new">
                Create new Incident
            </Link>
            <button type="button" onClick={logout}>
                <FiPower size={18} color="#E02041" />
            </button>
        </header>
        <h1>Incidents</h1>
        <ul>
            {incidents.map(incident => (
                <li key={incident.id}>
                <strong>Incident:</strong>
                <p> {incident.title}</p>
                <strong>Description:</strong>
                <p>{incident.description}</p>
                <strong> Value</strong>
                <p> {Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                <button type="button" onClick={(e)=> {removeIncident(incident.id)}}>
                    <FiTrash size={20} color="#a8a8b3"/>
                </button>
                </li>
            ))}
        </ul>
    </div>
    )
}