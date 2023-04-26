import Auth from '../../../configuration/configuration-aws'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import '../../../assets/styles/Sidebar.css'
import '../../../assets/styles/Admin.css'
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
        console.log(step)
        setCurrentPage(step)
    }

    return ( 
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white shadow bg-body rounded">
                    <Sidebar handleChangePage={handleChangePage} currentPage={currentPage}/>
                </div>
                <div className="col py-3">
                    <BodyContent logout={logout} currentEmailUser={currentEmailUser} currentPage={currentPage}/>
                </div>
            </div>
        </div>
        // <div classNameName='container-fluid bg-white min-vh-100'>
        //     <div classNameName='row'>
        //         { toggle && <div classNameName='col-4 col-md-2 bg-white vh-100 position-fixed'>
        //              <Sidebar />
        //         </div>}
        //         { toggle &&  <div classNameName='col-4 col-md-2'></div>}
        //         <div classNameName='col'>
        //             <BodyContent Toggle={Toggle} />
        //         </div>
        //     </div>
        //      {/* <div onClick={logout}>
        //         SignOut

        //     </div> */}
            
        // </div>
        
       
        
   
    )
}

export default AdminHomepage