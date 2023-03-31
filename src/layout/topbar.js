import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Auth from '../configuration/configuration-aws'
import { HiOutlineCalendar, HiOutlineBell } from 'react-icons/hi'
import { FiChevronRight } from 'react-icons/fi'
import { IoPersonCircleOutline, IoPersonOutline, IoGiftOutline, IoSettingsOutline, IoExitOutline } from 'react-icons/io5'
import { getStudent } from '../service/student'

const TopBar = ({currentEmailUser,isProfessor}) => {

    const pathname = (useLocation().pathname).split("/")[1]
    const [dropdownActive, setDropdownActive] = useState(false)
    const [inFoUser, setInFoUser] = useState("")
    const navigate = useNavigate()

    async function logout() {
        await Auth.signOut();
        navigate('/')
    }

    async function loadinfoUser() {
        let resUser = await getStudent();
        setInFoUser(resUser[0])
    }

    useEffect( () => {
        loadinfoUser()
      }, []);

    return (
        <div className="topbar" onMouseLeave={() => setDropdownActive(false)}>
            <nav>
                {isProfessor === false?
                    <>
                      <Link className={`nav hover ${pathname === "home" ? "active" : ""}`} to="/home">
                            <div>
                                <img alt="logo-text(bold).png" src="/assets/images/logo/logo-text(bold).png" height="32"/>
                            </div>
                        </Link>
                    </>
                    :                        
                    <>
                       <Link className={`nav hover ${pathname === "professor" ? "active" : ""}`} to="/professor">
                            <div>
                                <img alt="logo-text(bold).png" src="/assets/images/logo/logo-text(bold).png" height="32"/>
                            </div>
                        </Link>
                    </>
                } 
                
                <Link className={`nav hover ${pathname === "discuss" ? "active" : ""}`} to="/discuss">
                    <div>Discuss</div>
                </Link>
                <Link className={`nav hover ${pathname === "ranking" ? "active" : ""}`} to="/ranking">
                    <div>Ranking</div>
                </Link>
                {isProfessor === false?
                    <>
                       <Link className={`nav hover ${pathname === "store" ? "active" : ""}`} to="/store">
                            <div>Store</div>
                        </Link>
                        <Link className={`nav ${pathname === "weekly" ? "active" : ""}`} to="/weekly">
                            <div>
                                <HiOutlineCalendar size={24} />
                                <span className="badge">.</span>
                            </div>
                        </Link>
                    </>
                    :                        
                    <>
                       <Link className={`nav hover ${pathname === "Weekly" ? "active" : ""}`} to="/weekly">
                            <div>Weekly</div>
                        </Link>
                    </>
                } 
            </nav>
            <div className="profile-section">
                <div className="nav">
                    <div className="notification">
                        <div className="icon">
                            <HiOutlineBell size={24} />
                            <span className="badge">.</span>
                        </div>
                    </div>
                </div>
                {isProfessor === false?
                    <>
                       <div className="nav">
                            <div className="point">{inFoUser.Point} P</div>
                        </div>
                    </>
                    :                        
                    <>
                    </>
                } 
                <div className="nav">
                    <div className="profile-pic">
                        <div className="img" onClick={() => setDropdownActive(!dropdownActive)}>
                            <IoPersonCircleOutline />
                        </div>
                        <div className={`dropdown ${dropdownActive ? "active" : ""}`}>
                            <div className="info">
                                <span className="full-name f-sm">{currentEmailUser.substring(0, 20) + "..."}</span>
                            </div>
                            <div className="px-2">
                                <div className="divider my-3"></div>
                            </div>
                            <div className="menu">
                                <Link className="d-flex jc-btw">
                                    <div>
                                        <IoPersonOutline size={32} className="me-3" />Profile
                                    </div> 
                                    <FiChevronRight size={28} />
                                </Link>
                                <Link className="d-flex jc-btw">
                                    <div>
                                        <IoGiftOutline size={32} className="me-3" />Point
                                    </div>
                                    <FiChevronRight size={28} />
                                </Link>
                                <Link className="d-flex jc-btw">
                                    <div>
                                        <IoSettingsOutline size={32} className="me-3" />Settings
                                    </div>
                                    <FiChevronRight size={28} />
                                </Link>
                                <Link className="d-flex jc-btw" onClick={logout}>
                                    <div>
                                        <IoExitOutline size={32} className="me-3" />Sign out
                                    </div>
                                    <FiChevronRight size={28} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;