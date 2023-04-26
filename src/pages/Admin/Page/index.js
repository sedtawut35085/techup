import Auth from '../../../configuration/configuration-aws'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import '../../../assets/styles/Sidebar.css'
import Navbar from '../Nav';
import HomeDashboard from './Home';
import User from './User';
import Professor from './Professor';
import Discuss from './Discuss';
import Report from './Report';
// import 'bootstrap-icons/font/bootstrap-icons.css';

function BodyContent({logout,currentEmailUser,currentPage}) {  

    return ( 
        <div>
            <Navbar logout={logout} currentEmailUser={currentEmailUser}/>
            {
                currentPage === "Home" ?
                <>
                    <HomeDashboard currentPage={currentPage}/>
                </>
                :
                <>
                </>
            }
            {
                currentPage === "User" ?
                <>
                    <User currentPage={currentPage}/>
                </>
                :
                <>
                </>
            }
            {
                currentPage === "Professor" ?
                <>
                    <Professor currentPage={currentPage}/>
                </>
                :
                <>
                </>
            }
            {
                currentPage === "Discuss" ?
                <>
                    <Discuss currentPage={currentPage}/>
                </>
                :
                <>
                </>
            }
            {
                currentPage === "Report" ?
                <>
                    <Report currentPage={currentPage}/>
                </>
                :
                <>
                </>
            }
   
        </div>
        
       
        
   
    )
}

export default BodyContent