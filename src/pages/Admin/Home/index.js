import Auth from '../../../configuration/configuration-aws'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import '../../../assets/styles/Sidebar.css'
// import 'bootstrap-icons/font/bootstrap-icons.css';

function AdminHomepage() {  
    
    const navigate = useNavigate();

    async function logout() {
        await Auth.signOut();
        navigate('/Admin');
    }

    return (
        <div className='sidebar'>
             <div onClick={logout}>
                SignOut

            </div>
            <Sidebar />
        </div>
        
       
        
   
    )
}

export default AdminHomepage