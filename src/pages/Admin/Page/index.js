import Auth from '../../../configuration/configuration-aws'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import '../../../assets/styles/Sidebar.css'
import Navbar from '../Nav';
import HomeDashboard from './Home';
import HomeUser from './User/index';
import Professor from './Professor';
import Discuss from './Discuss';
import Report from './Report';
import Weekly from './Weekly/index';
import Store from './Store';
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
                    <HomeUser currentPage={currentPage}/>
                </>
                :
                <>
                </>
            }
            {
                currentPage === "Weekly" ?
                <>
                    <Weekly currentPage={currentPage}/>
                </>
                :
                <>
                </>
            }
            {
                currentPage === "Store" ?
                <>
                    <Store currentPage={currentPage}/>
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