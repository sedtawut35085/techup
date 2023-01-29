import React, { useState } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaChevronLeft, FaUserCircle, FaUpload } from 'react-icons/fa';

import BackgroundIcon from '../../components/background/bgIcons.js';
import SelectPicker from '../../components/picker_select/selectPicker.js'
import TuDatePicker from '../../components/picker_date/datePicker.js'
import ContactInfo from '../../components/contact_info/contactInfo.js'

function SelectRole() {

    const [role, setRole] = useState("");

    const [image, setImage] = useState("");
    const [techupID, setTechupID] = useState("") 
    const [studentID, setStudentID] = useState("") 
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [gender, setGender] = useState({label: "", data: ""})
    const [birthday, setBirthday] = useState("")

    const genderAll = [
        {label: "Male", data: "male"},
        {label: "Female", data: "female"}
    ]

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="select-role">
            <div className="cover-container" style={{paddingTop: 0}}>
                <div className="container">
                    {
                    role === "student"
                    ?   <div className="select-page">
                            <div className="btn-back" onClick={() => setRole("")}>
                                <FaChevronLeft />
                            </div>
                            <p className="title f-xl fw-800">Information - Student</p>
                            <form className="input-section pt-4 row" onSubmit={handleSubmit}>
                                <div className="col-lg-6 col-md-12 d-flex fd-col ai-center jc-center profile-image">
                                    {
                                        image === ""
                                        ?   <FaUserCircle className="icon" />
                                        :   <img src={image} />
                                    }
                                    <input type="file" accept="image/*" name="profile-img" id="profile-img" onChange={(event) => setImage(URL.createObjectURL(event.target.files[0]))} />
                                    <label htmlFor="profile-img"><FaUpload className="me-2" />Upload</label>
                                </div>
                                <div className="col-lg-6 col-md-12 px-4">
                                    <div className="col-12 pt-4">
                                        <label className="f-lg pb-2" htmlFor="techup-id">Techup ID<span className="color-5">*</span></label>
                                        <input
                                            type="text" 
                                            name="techup-id" 
                                            id="techup-id" 
                                            className="input-box"
                                            placeholder="Display name... (Will show in profile and leaderboard)"
                                            onChange={(event) => setTechupID(event.target.value)}
                                        />
                                    </div>
                                    <div className="col-12 pt-4">
                                        <label className="f-lg pb-2" htmlFor="student-id">Student ID<span className="color-5">*</span></label>
                                        <input
                                            type="text" 
                                            name="student-id" 
                                            id="student-id" 
                                            className="input-box"
                                            placeholder="Enter KMUTT student ID (Ex. xx090500xxx)"
                                            onChange={(event) => setStudentID(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 pt-4 px-4">
                                    <label className="f-lg pb-2" htmlFor="name">Name<span className="color-5">*</span></label>
                                    <input
                                        type="text" 
                                        name="name" 
                                        id="name" 
                                        className="input-box"
                                        placeholder="Enter your English first name"
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-12 pt-4 px-4">
                                    <label className="f-lg pb-2" htmlFor="surname">Surname<span className="color-5">*</span></label>
                                    <input
                                        type="text" 
                                        name="surname" 
                                        id="surname" 
                                        className="input-box"
                                        placeholder="Enter your English surname"
                                        onChange={(event) => setSurname(event.target.value)}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-12 pt-4 px-4">
                                    <label className="f-lg pb-2" htmlFor="gender">Gender {gender.label}</label>
                                    <SelectPicker 
                                        name="gender" 
                                        id="gender" 
                                        placeholder="-"
                                        data={genderAll}
                                        defaultValue={gender}
                                        setValue={setGender}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-12 pt-4 px-4">
                                    <label className="f-lg pb-2" htmlFor="birthday">Birthday</label>
                                    <TuDatePicker
                                        name="birthday"
                                        id="birthday"
                                        defaultValue={birthday}
                                        setValue={setBirthday}
                                        max={new Date()}
                                     />
                                </div>
                                <div className="col-12 pt-4 px-4">
                                    <label className="f-lg pb-2" htmlFor="contact">Contact</label>
                                    <ContactInfo />
                                </div>
                                <div className="col-12 pt-4 px-4"><div className="divider"></div></div>
                                <div className="col-12 pt-5 d-flex jc-center">
                                    <button type="submit" className="btn-01">Submit</button>
                                </div>
                            </form>
                        </div>
                    :   role === "professor"
                    ?   <div className="select-page">
                            <div className="btn-back" onClick={() => setRole("")}>
                                <FaChevronLeft />
                            </div>
                            <p className="title f-xl fw-800">Information - Professor</p>
                            <form className="input-section pt-4 row" onSubmit={handleSubmit}>
                                <div className="col-lg-6 col-md-12 d-flex fd-col ai-center jc-center profile-image">
                                    {
                                        image === ""
                                        ?   <FaUserCircle className="icon" />
                                        :   <img src={image} />
                                    }
                                    <input type="file" accept="image/*" name="profile-img" id="profile-img" onChange={(event) => setImage(URL.createObjectURL(event.target.files[0]))} />
                                    <label htmlFor="profile-img"><FaUpload className="me-2" />Upload</label>
                                </div>
                                <div className="col-lg-6 col-md-12 px-4">
                                    <div className="col-12 pt-4">
                                        <label className="f-lg pb-2" htmlFor="techup-id">Techup ID<span className="color-5">*</span></label>
                                        <input
                                            type="text" 
                                            name="techup-id" 
                                            id="techup-id" 
                                            className="input-box"
                                            placeholder="Display name... (Will show in profile and leaderboard)"
                                            onChange={(event) => setTechupID(event.target.value)}
                                        />
                                    </div>
                                    <div className="col-12 pt-4">
                                        <label className="f-lg pb-2" htmlFor="student-id">Student ID<span className="color-5">*</span></label>
                                        <input
                                            type="text" 
                                            name="student-id" 
                                            id="student-id" 
                                            className="input-box"
                                            placeholder="Enter KMUTT student ID (Ex. xx090500xxx)"
                                            onChange={(event) => setStudentID(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 pt-4 px-4">
                                    <label className="f-lg pb-2" htmlFor="name">Name<span className="color-5">*</span></label>
                                    <input
                                        type="text" 
                                        name="name" 
                                        id="name" 
                                        className="input-box"
                                        placeholder="Enter your English first name"
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-12 pt-4 px-4">
                                    <label className="f-lg pb-2" htmlFor="surname">Surname<span className="color-5">*</span></label>
                                    <input
                                        type="text" 
                                        name="surname" 
                                        id="surname" 
                                        className="input-box"
                                        placeholder="Enter your English surname"
                                        onChange={(event) => setSurname(event.target.value)}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-12 pt-4 px-4">
                                    <label className="f-lg pb-2" htmlFor="gender">Gender {gender.label}</label>
                                    <SelectPicker 
                                        name="gender" 
                                        id="gender" 
                                        placeholder="-"
                                        data={genderAll}
                                        defaultValue={gender}
                                        setValue={setGender}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-12 pt-4 px-4">
                                    <label className="f-lg pb-2" htmlFor="birthday">Birthday</label>
                                    <TuDatePicker
                                        name="birthday"
                                        id="birthday"
                                        defaultValue={birthday}
                                        setValue={setBirthday}
                                        max={new Date()}
                                    />
                                </div>
                                <div className="col-12 pt-4 px-4">
                                    <label className="f-lg pb-2" htmlFor="contact">Contact</label>
                                    <ContactInfo />
                                </div>
                                <div className="col-12 pt-4 px-4"><div className="divider"></div></div>
                                <div className="col-12 pt-5 d-flex jc-center">
                                    <button type="submit" className="btn-01">Submit</button>
                                </div>
                            </form>
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
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    )
}

export default SelectRole