import Auth from '../../../configuration/configuration-aws'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import '../../../assets/styles/Sidebar.css'
import BodyContent from '../Page';
// import 'bootstrap-icons/font/bootstrap-icons.css';

function AdminHomepage() {  
    
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState("Home")

    async function logout() {
        await Auth.signOut();
        navigate('/Admin');
    }

    const [currentEmailUser, setCurrentEmailUser] = useState("");

    
    useEffect( () => {
        checkAuthen();
    }, []);

    async function checkAuthen() {
        await Auth.currentAuthenticatedUser()
        .then(async(response) => {
        setCurrentEmailUser(response.attributes.email);
        })
        .catch(() => {
        }) 
    }

    const [toggle, setToggle] = useState(true)
    const Toggle = () => {
        setToggle(!toggle)
    }

    const handleChangePage = async (e, step) => {
        setCurrentPage(step)
    }

    return ( 
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-2 col-md-3 col-xl-2 px-sm-2 px-0 bg-white shadow bg-body rounded">
                    <Sidebar handleChangePage={handleChangePage} currentPage={currentPage}/>
                </div>
                <div className="col-10 col-md-9 col-xl-10 py-3">
                    <BodyContent logout={logout} currentEmailUser={currentEmailUser} currentPage={currentPage}/>
                </div>
            </div>
        </div> 
    )
}

export default AdminHomepage