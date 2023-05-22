import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Moment from 'moment';

import { getStudent } from '../../service/student'
import { isNumber, defaultProfileImg } from '../../assets/js/helper'
import SelectPicker from '../../components/picker_select/selectPicker.js'
import TuDatePicker from '../../components/picker_date/datePicker.js'
import ContactInfo from '../../components/contact_info/contactInfo.js'
import { updateUserProfile } from '../../service/student';

import { FaChevronLeft, FaUpload } from 'react-icons/fa';

import BackgroundIcon from '../../components/background/bgIcons.js';

function EditProfile() {


    const userEmail = (useLocation().pathname).split("/")[2];
    const [isLoading, setIsLoading] = useState(true);

    const [currentUser, setCurrentUser] = useState();
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState("");
    const [techupID, setTechupID] = useState("") 
    const [studentID, setStudentID] = useState("") 
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [gender, setGender] = useState({label: "", data: ""})
    const [birthday, setBirthday] = useState("")
    const [contacts, setContacts] = useState([])
    const [location, setLocation] = useState("")
    const [point, setPoint] = useState(0)
    
    const [errors, setErrors] = useState([])
    const [errorsSubmit, setErrorsSubmit] = useState(false)

    const navigate = useNavigate()

    const genderAll = [
        {label: "Male", data: "male"},
        {label: "Female", data: "female"}
    ]

    async function loadCurrentInfoUser() {
        let res = await getStudent();
        setCurrentUser(res[0]);

        setImage(res[0].ImageURL)
        setTechupID(res[0].TechUpID)
        setStudentID(res[0].StudentID)
        setName(res[0].FirstName)
        setSurname(res[0].SurName)
        setGender({
            label: res[0].Gender,
            data: res[0].Gender
        })
        setBirthday(Moment(res[0].Birthday).format('DD-MM-YYYY'))
        setLocation(res[0].Location)
        setPoint(res[0].Point)

        let contactObject = JSON.parse(res[0].Website)
        let defaultContact = [];
        for(let key in contactObject) {
            defaultContact.push({ contact: contactObject[key], type: {label: key, data: key}})
        }
        setContacts(defaultContact)
        setIsLoading(false);
    }

    async function onSelectFile(event) {
        setImage(URL.createObjectURL(event.target.files[0]))
        setImageFile(event.target.files[0])
    }

    async function handleSubmit(event) {

        setErrors([]);
        const arrayError = [];

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
            let website = [];
            for(let i =0;i<contacts.length;i++){
                let label = contacts[i].type.label
                let value = contacts[i].contact
                website = {...website, [label]: value}
            }
            var data = {
                "TechUpID": techupID,    
                "StudentID": studentID, 
                "FirstName": name,    
                "SurName": surname,   
                "Gender": gender.label,    
                "Birthday": Moment(birthday).format('YYYY-MM-DD'),
                "Location": location,
                "Website": website,
                "Notification": false,
                "Point": point,
                "ImageURL": 'image'
            }
            event.preventDefault();
            
        } else {
            setErrors(arrayError);
        }

        event.preventDefault();
    }

    async function editProfile(){
        let body = {
            "TechUpID" : techupID,
            "StudentID" : studentID,
            "FirstName" : name,
            "SurName" : surname,
            "Gender" : gender,
            "Birthday" : birthday,
            "Location" :location,
            "Website" : contacts,
        }
        await updateUserProfile(body);
        navigate("/profile/"+userEmail)
    }

    useEffect( () => {
        loadCurrentInfoUser();
    }, [])

    return (
        <div className="edit-profile-page">
            <div className="cover-container">
                {
                    isLoading &&
                    <div className="loader2">
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                }
                {
                    !isLoading &&
                    <>
                    <Link data-aos="fade-right" data-aos-duration="1000" className="btn-back" to={"/profile/" + userEmail}>
                        <FaChevronLeft />
                    </Link>
                    <div data-aos="fade-up" data-aos-duration="1000" className="body">                    
                        <span className="f-xl fw-700">Edit Profile</span>
                        <form className="input-section pt-4 row" onSubmit={handleSubmit}>
                            <div className="col-lg-6 col-md-12 d-flex fd-col ai-center jc-center profile-image">                            
                                <img className="profile-img" onError={defaultProfileImg} src={image}  alt="Avatar" />
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
                                        value={techupID}
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
                                        value={studentID}
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
                                    value={name}
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
                                    value={surname}
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
                                    value={location}
                                    onChange={(event) => setLocation(event.target.value)}
                                />
                            </div>
                            <div className="col-12 pt-4 px-4">
                                <label className="f-lg pb-2" htmlFor="contact">Contact</label>
                                <ContactInfo defaultValue={contacts} setValue={setContacts} />
                            </div>
                            <div className="col-12 pt-4 px-4"><div className="divider"></div></div>
                            <div className="col-12 pt-5 d-flex jc-center">
                                <button type="submit" className="btn-01" onClick={editProfile()}>Submit</button>
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
                    </>
                }
            </div>
            {/* Background */}
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    )
}

export default EditProfile