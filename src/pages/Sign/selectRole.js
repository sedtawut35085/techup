import React, { useState, useContext, useEffect } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaChevronLeft, FaUserCircle, FaUpload } from 'react-icons/fa';
import Auth from '../../configuration/configuration-aws'
import Moment from 'moment';
import { isNumber } from '../../assets/js/helper'
import BackgroundIcon from '../../components/background/bgIcons.js';
import SelectPicker from '../../components/picker_select/selectPicker.js'
import TuDatePicker from '../../components/picker_date/datePicker.js'
import ContactInfo from '../../components/contact_info/contactInfo.js'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth';
import { saveStudent } from '../../service/student';
import { saveProfessor } from '../../service/professor';

function SelectRole() { 

    const [role, setRole] = useState("");
    const { currentEmailUser } = useContext(AuthContext);

    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState("");
    const [techupID, setTechupID] = useState("") 
    const [studentID, setStudentID] = useState("") 
    const [professorID, setProfessorID] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [gender, setGender] = useState({label: "", data: ""})
    const [birthday, setBirthday] = useState("")
    const [contacts, setContacts] = useState([])
    const [location, setLocation] = useState(null)
    
    const [errors, setErrors] = useState([])
    const [errorsSubmit, setErrorsSubmit] = useState(false)

    const navigate = useNavigate()

    const genderAll = [
        {label: "Male", data: "male"},
        {label: "Female", data: "female"}
    ]

    useEffect( () => {
        checkAuthen()
    }, []);  

    async function checkAuthen() {
        await Auth.currentAuthenticatedUser()
        .then(async (response) => {
          if(response.attributes.email.includes('@mail.kmutt.ac.th')){
            setRole("student")
          }else{
            setRole("professor")
          }
        })
        .catch(() => {
        })
      }

    function goBack() {
        setRole("")
        setImage("")
        setTechupID("")
        setStudentID("")
        setProfessorID("")
        setName("")
        setSurname("")
        setGender({label: "", data: ""})
        setBirthday("")
        setLocation("")
        setContacts([])
        setErrors([])
        setErrorsSubmit(false)
    }
    
    async function handleSubmit(event) {
        setErrors([]);
        const arrayError = [];

        if(role === "student") {
            if(techupID === "") {
                arrayError.push('techupId');
            }
            if(studentID.length !== 11){
                if(studentID === "") {
                    arrayError.push('stuId');
                } else {
                    arrayError.push('invalid_stuId');
                }
            }
            if(location == ""){
                arrayError.push('location');
            }
        }
        // if(role === "professor") {
        //     if(professorID.length !== 11){
        //         if(studentID === "") {
        //             arrayError.push('profId');
        //         } else {
        //             arrayError.push('invalid_profId');
        //         }
        //     }
        // }
        if(image == ""){
            arrayError.push('image');
        }
        if(name === ""){
            arrayError.push('name');
        }
        if(surname === ""){
            arrayError.push('surname');
        }
        if(gender.label == ""){
            arrayError.push('gender');
        }
        if(birthday == ""){
            arrayError.push('birthday');
        }
        if(arrayError.length === 0) {
            if(role === "professor") {
                let website = [];
                for(let i =0;i<contacts.length;i++){
                    let label = contacts[i].type.label
                    let value = contacts[i].contact
                    website = {...website, [label]: value}
                }
                var data = {
                    "ProfessorEmail": currentEmailUser,
                    "ProfessorID": professorID,  
                    "Name": name,    
                    "SurName": surname,   
                    "Gender": gender.label,    
                    "Birthday": Moment(birthday, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                    "Contact": website,
                    "Notification": false,
                    "Point": 0, 
                    "ImageURL": 'image'
                }
                event.preventDefault();
                let response = await saveProfessor(data, imageFile)
                if(response.status === 200){
                    navigate('/professor')
                }else{
                    setErrorsSubmit(true)
                }
            }else{
                let website = [];
                for(let i =0;i<contacts.length;i++){
                    let label = contacts[i].type.label
                    let value = contacts[i].contact
                    website = {...website, [label]: value}
                }
                var data = {
                    "UserEmail": currentEmailUser,
                    "TechUpID": techupID,    
                    "StudentID": studentID,    
                    "FirstName": name,    
                    "SurName": surname,   
                    "Gender": gender.label,    
                    "Birthday": Moment(birthday).format('YYYY-MM-DD'),
                    "Location": location,
                    "Website": website,
                    "Notification": false,
                    "Point": 0,
                    "ImageURL": 'image'
                }
                event.preventDefault();
                let response = await saveStudent(data, imageFile)
                if(response.status === 200){
                    navigate('/home')
                }else{
                    setErrorsSubmit(true)
                }
            }
        }

        setErrors(arrayError);
        event.preventDefault();
    } 
    
    async function onSelectFile(event) {
        setImage(URL.createObjectURL(event.target.files[0]))
        setImageFile(event.target.files[0])
    }

    return (
        <div className="select-role">
            <div className="cover-container" style={{paddingTop: 0}}>
                <div className="container">
                    {
                    role === "student"
                    ?   <div className="select-page">
                            {/* <div className="btn-back" onClick={() => goBack()}>
                                <FaChevronLeft />
                            </div> */}
                            <p className="title f-xl fw-800">Information - Student</p>
                            <form className="input-section pt-4 row" onSubmit={handleSubmit}>
                                <div className="col-lg-6 col-md-12 d-flex fd-col ai-center jc-center profile-image">
                                    {
                                        image === ""
                                        ?   <FaUserCircle className="icon" />
                                        :   <img src={image} />
                                    }
                                    <input id="profile-img" name="profile-img" type="file" accept="image/*" onChange={onSelectFile}/>
                                    <label htmlFor="profile-img"><FaUpload className="me-2" />Upload</label>
                                    {errors.includes("image") && (<p className="f-xs color-5 pt-2" htmlFor="image-id">Please upload you image</p>)}
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
                                            maxLength="30"
                                            onChange={(event) => setTechupID(event.target.value)}
                                        />
                                        {errors.includes("techupId") && (<label className="f-xs color-5 pt-2" htmlFor="techup-id">Please enter your Techup ID</label>)}
                                    </div>
                                    <div className="col-12 pt-4">
                                        <label className="f-lg pb-2" htmlFor="student-id">Student ID<span className="color-5">*</span></label>
                                        <input
                                            type="text" 
                                            name="student-id" 
                                            id="student-id" 
                                            className="input-box"
                                            placeholder="Enter KMUTT student ID (Ex. xx090500xxx)"
                                            maxLength="15"
                                            onKeyPress={(event) => isNumber(event)}
                                            onChange={(event) => setStudentID(event.target.value)}
                                        />
                                        {errors.includes("stuId") && (<label className="f-xs color-5 pt-2" htmlFor="student-id">Please enter your Student ID</label>)}
                                        {errors.includes("invalid_stuId") && (<label className="f-xs color-5 pt-2" htmlFor="student-id">Please enter a valid Student ID</label>)}
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
                                    {errors.includes("name") && (<label className="f-xs color-5 pt-2" htmlFor="name">Please enter your Name</label>)}
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
                                    {errors.includes("surname") && (<label className="f-xs color-5 pt-2" htmlFor="surname">Please enter your Surname</label>)}
                                </div>
                                <div className="col-lg-6 col-md-12 pt-4 px-4">
                                    <label className="f-lg pb-2" htmlFor="gender">Gender<span className="color-5">*</span></label>
                                    <SelectPicker 
                                        name="gender" 
                                        id="gender" 
                                        placeholder="-"
                                        data={genderAll}
                                        defaultValue={gender}
                                        setValue={setGender}
                                    />
                                    {errors.includes("gender") && (<label className="f-xs color-5 pt-2" htmlFor="gender">Please select your Gender</label>)}
                                </div>
                                <div className="col-lg-6 col-md-12 pt-4 px-4">
                                    <label className="f-lg pb-2" htmlFor="birthday">Birthday<span className="color-5">*</span></label>
                                    <TuDatePicker
                                        name="birthday"
                                        id="birthday"
                                        defaultValue={birthday}
                                        setValue={setBirthday}
                                        max={new Date()}
                                     />
                                     {errors.includes("birthday") && (<label className="f-xs color-5 pt-2" htmlFor="gender">Please enter your Birthday</label>)}
                                </div>
                                <div className="col-lg-6 col-md-12 pt-4 px-4">
                                    <label className="f-lg pb-2" htmlFor="name">Location</label>
                                    <input
                                        type="text" 
                                        name="location" 
                                        id="location" 
                                        className="input-box"
                                        placeholder="Enter your English location"
                                        onChange={(event) => setLocation(event.target.value)}
                                    />
                                </div>
                                <div className="col-12 pt-4 px-4">
                                    <label className="f-lg pb-2" htmlFor="contact">Contact</label>
                                    <ContactInfo setValue={setContacts} />
                                </div>
                                <div className="col-12 pt-4 px-4"><div className="divider"></div></div>
                                <div className="col-12 pt-5 d-flex jc-center">
                                    <button type="submit" className="btn-01">Submit</button>
                                </div>
                                {errorsSubmit === false?
                                    <>
                                    </>
                                        :                        
                                    <>
                                        <div className="col-12 pt-5 d-flex jc-center">
                                            <label className="f-xm color-5" htmlFor="error">server error</label>
                                        </div>
                                    </>
                                } 
                            </form>
                        </div>
                    :   role === "professor"
                    ?   <div className="select-page">
                            {/* <div className="btn-back" onClick={() => goBack()}>
                                <FaChevronLeft />
                            </div> */}
                            <p className="title f-xl fw-800">Information - Professor</p>
                            <form className="input-section pt-4 row" onSubmit={handleSubmit}>
                            <div className="col-lg-6 col-md-12 d-flex fd-col ai-center jc-center profile-image">
                                    {
                                        image === ""
                                        ?   <FaUserCircle className="icon" />
                                        :   <img src={image} />
                                    }
                                    <input id="profile-img" name="profile-img" type="file" accept="image/*" onChange={onSelectFile}/>
                                    <label htmlFor="profile-img"><FaUpload className="me-2" />Upload</label>
                                    {errors.includes("image") && (<p className="f-xs color-5 pt-2" htmlFor="image-id">Please upload you image</p>)}
                                </div>
                                <div className="col-lg-6 col-md-12 px-4">
                                    <div className="col-12 pt-4">
                                        <label className="f-lg pb-2" htmlFor="name">Name<span className="color-5">*</span></label>
                                        <input
                                            type="text" 
                                            name="name" 
                                            id="name" 
                                            className="input-box"
                                            placeholder="Enter your English first name"
                                            onChange={(event) => setName(event.target.value)}
                                        />
                                        {errors.includes("name") && (<label className="f-xs color-5 pt-2" htmlFor="name">Please enter your Name</label>)}
                                    </div>
                                    <div className="col-12 pt-4">
                                        <label className="f-lg pb-2" htmlFor="surname">Surname<span className="color-5">*</span></label>
                                        <input
                                            type="text" 
                                            name="surname" 
                                            id="surname" 
                                            className="input-box"
                                            placeholder="Enter your English surname"
                                            onChange={(event) => setSurname(event.target.value)}
                                        />
                                        {errors.includes("surname") && (<label className="f-xs color-5 pt-2" htmlFor="surname">Please enter your Surname</label>)}
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 pt-4 px-4">
                                    <label className="f-lg pb-2" htmlFor="professor-id">Professor ID<span className="color-5">*</span></label>
                                        <input
                                            type="text" 
                                            name="professor-id" 
                                            id="professor-id" 
                                            className="input-box"
                                            placeholder="Enter KMUTT professor ID (Ex. xx090500xxx)"
                                            maxLength="15"
                                            onKeyPress={(event) => isNumber(event)}
                                            onChange={(event) => setProfessorID(event.target.value)}
                                        />
                                        {/* {errors.includes("profId") && (<label className="f-xs color-5 pt-2" htmlFor="professor-id">Please enter your Professor ID</label>)}
                                        {errors.includes("invalid_profId") && (<label className="f-xs color-5 pt-2" htmlFor="professor-id">Please enter a valid Professor ID</label>)} */}
                                </div>
                                <div className="col-lg-6 col-md-12 pt-4 px-4">
                                    <label className="f-lg pb-2" htmlFor="gender">Gender<span className="color-5">*</span></label>
                                    <SelectPicker 
                                        name="gender" 
                                        id="gender" 
                                        placeholder="-"
                                        data={genderAll}
                                        defaultValue={gender}
                                        setValue={setGender}
                                    />
                                    {errors.includes("gender") && (<label className="f-xs color-5 pt-2" htmlFor="gender">Please select your Gender</label>)}
                                </div>
                                <div className="col-lg-6 col-md-12 pt-4 px-4">
                                    <label className="f-lg pb-2" htmlFor="birthday">Birthday<span className="color-5">*</span></label>
                                    <TuDatePicker
                                        name="birthday"
                                        id="birthday"
                                        defaultValue={birthday}
                                        setValue={setBirthday}
                                        max={new Date()}
                                    />
                                    {errors.includes("birthday") && (<label className="f-xs color-5 pt-2" htmlFor="gender">Please enter your Birthday</label>)}
                                </div>
                                <div className="col-12 pt-4 px-4">
                                    <label className="f-lg pb-2" htmlFor="contact">Contact</label>
                                    <ContactInfo setValue={setContacts} />
                                </div>
                                <div className="col-12 pt-4 px-4"><div className="divider"></div></div>
                                <div className="col-12 pt-5 d-flex jc-center">
                                    <button type="submit" className="btn-01">Submit</button>
                                </div>
                                {errorsSubmit === false?
                                    <>  
                                    </>
                                        :                        
                                    <>
                                        <div className="col-12 pt-5 d-flex jc-center">
                                            <label className="f-xm color-5" htmlFor="error">server error</label>
                                        </div>
                                    </>
                                } 
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