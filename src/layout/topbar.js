import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import $ from 'jquery'

import { toggleScrollable, defaultProfileImg } from '../assets/js/helper'
import Auth from '../configuration/configuration-aws'
import { getStudent } from '../service/student'
import { getWeeklyQuestion } from '../service/weeklyQuestion';

import { HiOutlineCalendar, HiOutlineBell, HiMenu } from 'react-icons/hi'
import { FiChevronRight } from 'react-icons/fi'
import { IoPersonCircleOutline, IoPersonOutline, IoGiftOutline, IoSettingsOutline, IoExitOutline } from 'react-icons/io5'
import { getProfessor } from '../service/professor';

const TopBar = ({currentEmailUser,isProfessor}) => {

    const pathname = (useLocation().pathname).split("/")[1];
    const pathname2 = (useLocation().pathname).split("/")[2];
    const [dropdownActive, setDropdownActive] = useState(false);
    const [inFoUser, setInFoUser] = useState("");
    const navigate = useNavigate();
    const lastScrollTop = useRef(0);
    const [isTopbarVisible, setIsTopbarVisible] = useState(true);
    const [topbarRes, setTopbarRes] = useState(false)
    // const [weeklyQuestion,setWeeklyQuestion] = useState("")

    // async function loadWeeklyQuestion(){
    //     let res = await getWeeklyQuestion();
    //     setWeeklyQuestion(res[0]);
    //     console.log(weeklyQuestion);
    // }

    const handleScroll = () => {

        const { pageYOffset } = window;

        if (pageYOffset > lastScrollTop.current) {
            setIsTopbarVisible(false);
        } else if (pageYOffset < lastScrollTop.current) {
            setIsTopbarVisible(true)
        }

        lastScrollTop.current = pageYOffset <= 0 ? 0 : pageYOffset;
    }

    async function logout() {
        await Auth.signOut();
        navigate('/');
    }

    async function loadInfoUser() {
       
        let resUser
        await Auth.currentAuthenticatedUser()
        .then(async(response) => {
          if(response.attributes.email.includes('@mail.kmutt.ac.th')){
            resUser = await getStudent();
          }else{
            resUser = await getProfessor();
          }
        })
        .catch(() => {
        }) 
        setInFoUser(resUser[0]);
    }

    function toggleTopbar() {
        if(topbarRes) {
            setTopbarRes(false)
            toggleScrollable(false)
        } else {
            setTopbarRes(true)
            toggleScrollable(true)
        }
    }

    function linkTo() {
        setTopbarRes(false); 
        toggleScrollable(false);
    }

    useEffect( () => {
        loadInfoUser()
        // loadWeeklyQuestion()

        window.addEventListener("scroll", handleScroll, { passive: true })
        $(window).resize(function() {
            if($(window).width() > 768) {
                setTopbarRes(false)
                toggleScrollable(false)
            }
        })

        setInterval(() => {
            loadInfoUser();
        }, 4000);
      }, []);
      
    return (
        <>
            <div className={`topbar ${isTopbarVisible ? "visible" : ""}`} onMouseLeave={() => setDropdownActive(false)}>
                <nav>
                    {currentEmailUser.includes('@mail.kmutt.ac.th') === true?
                        <>
                        <Link className={`nav hover ${pathname === "home" ? "active" : ""}`} to="/home" onClick={() => linkTo()}>
                                <div>
                                    <img alt="logo-text(bold).png" src="/assets/images/logo/logo-text(bold).png" height="32"/>
                                </div>
                            </Link>
                        </>
                        :                        
                        <>
                        <Link className={`nav hover ${pathname === "professor" && pathname2 === undefined ? "active" : ""}`} to="/professor">
                                <div>
                                    <img alt="logo-text(bold).png" src="/assets/images/logo/logo-text(bold).png" height="32"/>
                                </div>
                            </Link>
                        </>
                    } 
                    
                    <Link className={`nav top hover ${pathname === "discuss" ? "active" : ""}`} to="/discuss">
                        <div>Discuss</div>
                    </Link>
                    <Link className={`nav top hover ${pathname === "ranking" ? "active" : ""}`} to="/ranking">
                        <div>Ranking</div>
                    </Link>
                    {currentEmailUser.includes('@mail.kmutt.ac.th') === true?
                        <>
                            <Link className={`nav top hover ${pathname === "store" ? "active" : ""}`} to="/store">
                                <div>Store</div>
                            </Link>
                            <Link className={`nav top weekly ${pathname === "weekly" ? "active" : ""}`} to="/weekly">
                                <div>
                                    <HiOutlineCalendar size={24} />
                                    <span className="badge">.</span>
                                </div>
                            </Link>
                        </>
                        :                        
                        <>
                            <Link className={`nav top hover ${pathname === "professor" && pathname2 === "weekly" ? "active" : ""}`} to="/professor/weekly">
                                <div>Weekly</div>
                            </Link>
                        </>
                    }
                    <Link className={`nav toggle-sidebar hover ${topbarRes ? "active" : ""}`} onClick={() => toggleTopbar()}>
                        <div className="toggle-sidebar-content">
                            <HiMenu size={24} />
                        </div>
                    </Link>
                </nav>
                <div className="profile-section">
                    {/* <div className="nav">
                        <div className="notification">
                            <div className="icon">
                                <HiOutlineBell size={24} />
                                <span className="badge">.</span>
                            </div>
                        </div>
                    </div> */}
                    {currentEmailUser.includes('@mail.kmutt.ac.th') === true?
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
                                <img onError={defaultProfileImg} src={inFoUser.ImageURL}  alt="Avatar" />
                            </div>
                            <div className={`dropdown ${dropdownActive ? "active" : ""}`}>
                                <div className="info">
                                    {
                                        currentEmailUser.includes('@mail.kmutt.ac.th') === true
                                        ?
                                            <>
                                            <span className="f-smd">{inFoUser.TechUpID}</span>
                                            <span className="f-sm color-gray2">{inFoUser.FirstName} {inFoUser.SurName}</span>
                                            </>
                                        :  <>
                                            <span className="f-sm color-black">{inFoUser.Surname} {inFoUser.Surname}</span>
                                            </>
                                    } 
                                    
                                    {
                                        currentEmailUser.includes('@mail.kmutt.ac.th') === true
                                        ?
                                            <div className="nav">
                                                <div className="point">{inFoUser.Point} P</div>
                                            </div>
                                        :  null
                                    } 
                                </div>
                                <div className="px-2">
                                    <div className="divider my-3"></div>
                                </div>
                                <div className="menu">
                                    {
                                        currentEmailUser.includes('@mail.kmutt.ac.th') === true
                                        ?
                                        <Link className="d-flex jc-btw" to={"/profile/" + inFoUser.UserEmail}>
                                            <div>
                                                <IoPersonOutline size={32} className="me-3" />Profile
                                            </div> 
                                        <FiChevronRight size={28} />
                                    </Link>
                                        :  null
                                    }
                                    {
                                        currentEmailUser.includes('@mail.kmutt.ac.th') === true
                                        ?
                                        <Link className="d-flex jc-btw" to={"/profile/" + inFoUser.UserEmail + "/point-history"}>
                                            <div>
                                                <IoGiftOutline size={32} className="me-3" />Points
                                            </div>
                                            <FiChevronRight size={28} />
                                        </Link>
                                        :  null
                                    } 
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
            <div className={`topbar-res ${topbarRes ? "active" : ""}`}>
                <Link to="/discuss" onClick={() => linkTo()}>Discuss</Link>
                <Link to="/ranking" onClick={() => linkTo()}>Ranking</Link>
                <Link to="/store" onClick={() => linkTo()}>Store</Link>
                <Link to="/weekly" onClick={() => linkTo()}>Weekly</Link>
            </div>
            <div className={`backdrop ${topbarRes ? "active" : ""}`} onClick={() => linkTo()}></div>
        </>
    );
};

export default TopBar;