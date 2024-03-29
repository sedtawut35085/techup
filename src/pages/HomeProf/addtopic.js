import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getProfessor } from '../../service/professor.js';
import { saveTopic } from '../../service/topic.js';

import { FaChevronLeft } from 'react-icons/fa';
import { RiVipCrown2Fill } from 'react-icons/ri'

import SelectPickerIcon from '../../components/picker_select_icon/selectPickerIcon.js';
import SelectPicker from '../../components/picker_select/selectPicker.js';
import BackgroundIcon from '../../components/background/bgIcons.js';

function AddTopic() {

    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [inFoProfessor, setInFoProfessor] = useState("");
    
    async function getProfessors() {
        let res = await getProfessor();
        setInFoProfessor(res[0]);
        setIsLoading(false);
    }

    const [name,setName] = useState("")
    const [icon,setIcon] = useState({label: "analysis", data: "analysis"})
    const [types,setTypes] = useState({label: "Computer Science", data: "Computer Science"})
    const [shortName,setShortName] = useState("")
    const [description,setDescription] = useState("")
    const navigate = useNavigate()
    const [errorsSubmit, setErrorsSubmit] = useState(false)
    const [errors, setErrors] = useState([])

    const iconAll = [
        {label: "analysis", data: "analysis", img: "analysis"},
        {label: "coins", data: "coins", img: "coins"},
        {label: "connections", data: "connections", img: "connections"},
        {label: "idea", data: "idea", img: "idea"},
        {label: "handshake", data: "handshake", img: "handshake"},
        {label: "rocket", data: "rocket", img: "rocket"},
        {label: "target", data: "target", img: "target"}
    ]

    const typeAll = [
        {label: "Computer Science", data: "Computer Science", img: "logo"},
        {label: "Data Science", data: "Data Science", img: "logo"},
        {label: "Digital Business", data: "Digital Business", img: "logo"}
    ]

    async function handleSubmit(event) {
        setLoadingSubmit(true)
        setErrors([]);
        const arrayError = [];
        if(name == ""){
            arrayError.push('name');
        }
        if(shortName === ""){
            arrayError.push('shortName');
        }
        if(description === ""){
            arrayError.push('description');
        }
        if(types == ""){
            arrayError.push('type');
        }
        if(icon.label == ""){
            arrayError.push('icon');
        }
        if(arrayError.length === 0) {
            event.preventDefault();
            var data = {
                "TopicName": name,
                "ShortName": shortName,
                "Description": description,  
                "Type": types.label,    
                "Owner": inFoProfessor.ProfessorEmail,   
                "Icon": icon.label
            }
            let res = await saveTopic(data)
            if(res === undefined){
                setErrorsSubmit(true)
            }else{
                navigate('/professor')
                toast.success('Add topic success!', {
                    position: "bottom-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });
            }
           
        }
        setLoadingSubmit(false);
        setErrors(arrayError);
        event.preventDefault();
        
    } 

    useEffect( () => {
        getProfessors();
    }, []);

    return (
        <div className="addtopic-page">
            {
                loadingSubmit &&
                <div className="loader">
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
            }
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
                    <Link className="btn-back" to="/professor" data-aos="fade-right" data-aos-duration="1000">
                        <FaChevronLeft />
                    </Link>
                    <p className="title f-xl fw-800" data-aos="fade-up" data-aos-duration="1000">Add topic</p>
                    <form className="pt-4 row" onSubmit={handleSubmit}>
                        <div className="px-4" data-aos="fade-up" data-aos-duration="1000">
                            <div className="col-12 pb-4">
                                <label className="f-lg pb-2" htmlFor="name-id">Name<span className="color-5">*</span></label>
                                <input
                                    type="text" 
                                    name="name-id" 
                                    id="name-id" 
                                    className="input-box"
                                    placeholder="Machine learning, Operating System, etc."
                                    onChange={(event) => setName(event.target.value)}
                                />
                                {errors.includes("name") && (<label className="f-xs color-5 pt-2" htmlFor="student-id">Please enter a name topic</label>)}
                            </div>
                            <div className="col-12 pb-4">
                                <label className="f-lg pb-2" htmlFor="student-id">Short Name<span className="color-5">*</span></label>
                                <input
                                    type="text" 
                                    name="shortname-id" 
                                    id="shortname-id" 
                                    className="input-box"
                                    placeholder="ML, OS, etc."
                                    maxLength="15"
                                    onChange={(event) => setShortName(event.target.value)}
                                />
                                {errors.includes("shortName") && (<label className="f-xs color-5 pt-2" htmlFor="student-id">Please enter a shortname topic</label>)}
                            </div> 
                            <div className="col-12 pb-4">
                                <label className="f-lg pb-2" htmlFor="description-id">Description<span className="color-5">*</span></label>
                                <textarea
                                    type="text" 
                                    name="description-id" 
                                    id="description-id" 
                                    className="input-textareabox pt-3"
                                    placeholder="Detail about topic..."
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                                {errors.includes("description") && (<label className="f-xs color-5 pt-2" htmlFor="student-id">Please enter a description of topic</label>)}
                            </div>
                            <label className="f-lg pb-2" htmlFor="type-id">Type<span className="color-5">*</span></label>
                            <div className="col-12 pb-4">
                            <SelectPickerIcon
                                    name="type" 
                                    id="type" 
                                    placeholder="-"
                                    data={typeAll}
                                    defaultValue={types}
                                    setValue={setTypes}
                                />
                            </div>
                            <label className="f-lg pb-2" htmlFor="icon-id">Icon<span className="color-5">*</span></label>
                            <div className="col-12 pb-4">
                                <SelectPickerIcon
                                    name="icon" 
                                    id="icon" 
                                    placeholder="-"
                                    data={iconAll}
                                    defaultValue={icon}
                                    setValue={setIcon}
                                />
                            </div>
                            <label className="f-lg pt-4" htmlFor="preview-id">Preview<span className="color-5"></span></label>   
                            <div className='box-zone'>
                                <div className="topic-box col-3">
                                    <div 
                                        className="body" 
                                        style={
                                            types.label === "Computer Science"
                                            ? {backgroundColor: "#1B1F4B"}
                                            : types.label === "Data Science"
                                            ? {backgroundColor: "#6A244D"}
                                            : {backgroundColor: "#194D45"}
                                        }
                                    >
                                        <div className="title">
                                            <span className="f-lg fw-700">{name || "Name"}</span>
                                            <span className="f-xs fw-400">{types.label || "type"}</span>
                                        </div>
                                        <span className="professor-owner f-xs fw-500"><RiVipCrown2Fill className="color-1 me-1" size={20} />{inFoProfessor.Name + " " + inFoProfessor.Surname}</span>
                                        <div className="bg-icon">
                                            <li>
                                                <img alt="icon" width="65px" src={"/assets/images/icons/" + icon.label + ".png"} />
                                            </li>   
                                            <li>
                                                <img alt="icon" width="25px" src={"/assets/images/icons/" + icon.label + ".png"} />
                                            </li>                                  
                                            <li>
                                                <img alt="icon" width="35px" src={"/assets/images/icons/" + icon.label + ".png"} />
                                            </li>
                                            <li>
                                                <img alt="icon" width="100px" src={"/assets/images/icons/" + icon.label + ".png"} />
                                            </li>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 mb-5 divider"></div>
                        <div className="col-12 d-flex jc-center">
                            <a href='/professor' className="btn-02">Cancel</a>
                            <button type="submit" className="btn-01">Submit</button>
                        </div>
                        {errorsSubmit === false?
                            <>
                                
                            </>
                                :                        
                            <>
                                <div className="col-12 pt-5 d-flex jc-center">
                                    <label className="f-xm color-5" htmlFor="error">This Topic or ShortName is already have.</label>
                                </div>
                            </>
                        } 
                    </form>
                    </>
                }
            </div>
            <div className="background-container"></div>
            <BackgroundIcon 
            
            />
        </div>
    );
}

export default AddTopic;