import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Moment from 'moment';
import Auth from '../../configuration/configuration-aws'

import { defaultProfileImg } from '../../assets/js/helper'
import { getStudent, getStudentFromStudentEmail } from '../../service/student'

import { TbEdit, TbLogout } from 'react-icons/tb'
import { RiInstagramFill, RiFacebookCircleFill, RiGithubFill, RiGlobalFill , RiLineFill } from 'react-icons/ri'

import BackgroundIcon from '../../components/background/bgIcons.js';

function Profile() {

    const [isLoading1, setIsLoading1] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);

    const userEmail = (useLocation().pathname).split("/")[2];
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState();
    const [user, setUser] = useState();

    async function loadCurrentInfoUser() {
        let res = await getStudent();
        setCurrentUser(res[0]);
        setIsLoading1(false);
    }

    async function loadInfoUser() {
        let res = await getStudentFromStudentEmail(userEmail);
        let contact = JSON.parse(res[0].Website);
        res[0].Website = contact;
        setUser(res[0]);

        setIsLoading2(false);
        console.log(res)
    }

    async function signOut() {
        await Auth.signOut();
        navigate('/')
    }

    useEffect( () => {
        loadCurrentInfoUser()
        loadInfoUser()
    }, [])

    return (
        <div className="profile-page">
            <div className="cover-container">
                {
                    (isLoading1 || isLoading2) &&
                    <div className="loader2">
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                }
                {
                    !(isLoading1 || isLoading2) &&
                    <div className="body">
                        <div className="left-side">
                            <div data-aos="fade-up" data-aos-duration="1000" className="card-box main">
                                <img className="profile-img" onError={defaultProfileImg} src={user.ImageURL}  alt="Avatar" />
                                <span className="techup-id"><img src="/assets/images/icons/logo.png" />{user.TechUpID}</span>
                                <span className="point">Rank 1 - {user.Point} P</span>
                                {
                                    currentUser.UserEmail === user.UserEmail
                                    ?   <Link className="edit-profile" to="edit"><TbEdit size={21} />Edit profile</Link>
                                    :   null
                                }
                            </div>
                            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" id="info" className="card-box info">
                                <span className="title">Information</span>
                                <div className="sp-vertical"></div>
                                <div className="information">
                                    <span className="left">Student ID.</span>
                                    <span className="right">{user.StudentID}</span>
                                </div>
                                <div className="information">
                                    <span className="left">Name</span>
                                    <span className="right">{user.FirstName}</span>
                                </div>
                                <div className="information">
                                    <span className="left">Surname</span>
                                    <span className="right">{user.SurName}</span>
                                </div>
                                <div className="information">
                                    <span className="left">Gender</span>
                                    <span className="right">{user.Gender}</span>
                                </div>
                                <div className="information">
                                    <span className="left">Birthday</span>
                                    <span className="right">{Moment(user.Birthday).format('MMM DD, YYYY')}</span>
                                </div>
                                <div className="divider my-3"></div>
                                {user.Website.Facebook && 
                                    <div className="contact">
                                        <div className="icon">
                                            <RiFacebookCircleFill size={28} />
                                        </div>
                                        <span>{user.Website.Facebook}</span>
                                    </div>
                                }
                                {user.Website.Instagram &&
                                    <div className="contact">
                                        <div className="icon">
                                            <RiInstagramFill size={28} />
                                        </div>
                                        <span>{user.Website.Instagram}</span>
                                    </div>
                                }
                                {user.Website.LineID &&
                                    <div className="contact">
                                        <div className="icon">
                                            <RiLineFill size={28} />
                                        </div>
                                        <span>{user.Website.LineID}</span>
                                    </div>
                                }
                                {user.Website.ETC &&
                                    <div className="contact">
                                        <div className="icon">
                                            <RiGlobalFill size={28} />
                                        </div>
                                        <span>{user.Website.ETC}</span>
                                    </div>
                                }
                            </div>
                            {
                                currentUser.UserEmail === user.UserEmail
                                ?   <button className="sign-out" onClick={signOut}><TbLogout size={24} />Sign out</button>
                                :   null
                            }
                        </div>
                        <div className="right-side">
                            <div data-aos="fade-up" data-aos-duration="1000" className="card-box">
                                <span className="title">Community Stats</span>
                                <div className="coming-soon">Coming Soon...</div>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="card-box">
                                <span className="title">Solution Stats</span>
                                <div className="coming-soon">Coming Soon...</div>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" className="card-box">
                                <span className="title">Recent Submissions</span>
                                <div className="coming-soon">Coming Soon...</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            
            {/* Background */}
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
        
    )
}

export default Profile