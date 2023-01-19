import React, { useState } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaChevronLeft } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io'

import BackgroundIcon from '../../components/background/bgIcons.js'

function SelectRole() {

    const [role, setRole] = useState("")

    return (
        <div className="select-role">
            <div className="cover-container" style={{paddingTop: 0}}>
                <div className="container">
                    {
                    role === "student"
                    ?   <div className="select-page">
                            <div className="btn-back">
                                <FaChevronLeft />
                            </div>
                            <span className="f-xl fw-800 ps-4">Information - Student</span>
                        </div>
                    :   role === "professor"
                    ?   <div className="select-page">
                            <div className="px-5">
                                <div className="select-role-title text-center">
                                    <span className="f-xl fw-800 ps-4">Information - Professor</span>
                                </div>
                            </div>
                            <div className="sp-vertical py-5"></div>
                            <div className="select-section">
                                <div className="select-role-box" id="student" onClick={() => setRole('student')}>
                                    <span className="icon">
                                        <FaUserGraduate id="student-icon" />
                                    </span>
                                    <span className="text">Student</span>
                                </div>
                                <span className="f-xl fw-800 py-4">Or</span>
                                <div className="select-role-box" id="professor" onClick={() => setRole('professor')}>
                                    <span  className="icon">
                                        <FaChalkboardTeacher id="professor-icon" />
                                    </span>
                                    <span className="text">Professor</span>
                                </div>
                            </div>
                        </div>
                    :   <div className="main-page py-5">
                            <div className="sp-vertical py-4"></div>
                            <div className="px-5">
                                <div className="select-role-title text-center">
                                    <p className="f-xl fw-800">Select your role in <span className="color-1 f-xl fw-800">TECHUP</span></p>
                                </div>
                            </div>
                            <div className="sp-vertical py-4"></div>
                            <div className="select-section">
                                <div className="select-role-box" id="student" onClick={() => setRole('student')}>
                                    <span className="icon">
                                        <FaUserGraduate id="student-icon" />
                                    </span>
                                    <span className="text">Student</span>
                                </div>
                                <span className="f-xl fw-800 py-4">Or</span>
                                <div className="select-role-box" id="professor" onClick={() => setRole('professor')}>
                                    <span  className="icon">
                                        <FaChalkboardTeacher id="professor-icon" />
                                    </span>
                                    <span className="text">Professor</span>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <BackgroundIcon />
        </div>
    )
}

export default SelectRole