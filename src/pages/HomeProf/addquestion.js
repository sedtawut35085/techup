import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Moment from 'moment';
import { toast } from 'react-toastify';

import { getProfessor } from '../../service/professor.js';
import { getEachTopic } from '../../service/topic';
import { saveQuestionForEachTopic } from '../../service/question.js';

import { FaChevronLeft } from 'react-icons/fa';
import { RiVipCrown2Fill } from 'react-icons/ri'

import TuDatePicker from '../../components/picker_date/datePicker.js'
import SelectPicker from '../../components/picker_select/selectPicker.js';
import BackgroundIcon from '../../components/background/bgIcons.js';

function AddQuestion() {

    let TopicID = window.location.href.split("/")[4];

    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoading1, setIsLoading1] = useState(true)

    const [inFoProfessor, setInFoProfessor] = useState("")
    const [topicInfo, setTopicInfo] = useState()
    
    async function getProfessors() {
        let res = await getProfessor();
        setInFoProfessor(res[0]);
        setIsLoading(false)
    }

    async function getTopicData() {
        let res = await getEachTopic(TopicID);
        setTopicInfo(res[0]);
        console.log(res[0])
        setIsLoading1(false)
    }
    
    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [point,setPoint] = useState("")
    const [dificulty,setDificulty] = useState({label: "", data: ""})
    const [duedate,setDueDate] = useState("")
    const [hint,setHint] = useState("")
    const [errorsSubmit, setErrorsSubmit] = useState(false)
    const [errors, setErrors] = useState([])

    const dificultyAll = [
        {label: "Easy", data: "Easy"},
        {label: "Normal", data: "Normal"},
        {label: "Hard", data: "Hard"}
    ]

    async function handleSubmit(event) {
        setLoadingSubmit(true)
        event.preventDefault();
        const [day, month, year] =  duedate.split('-')
        setErrors([]);
        const arrayError = [];
        if(name == ""){
            arrayError.push('name');
        }
        if(description === ""){
            arrayError.push('description');
        }
        if(dificulty.label === ""){
            arrayError.push('dificulty');
        }
        if(point === ""){
            arrayError.push('point');
        }
        if(duedate === ""){
            arrayError.push('duedate');
        }
        if(hint === ""){
            arrayError.push('hint');
        }
        if(arrayError.length === 0) {
            event.preventDefault();
            var bodydata = {
                "TopicID": TopicID,
                "QuestionName": name,
                "Description": description,  
                "Difficulty": dificulty.data,    
                "Point": point,
                "DueDate": `${year}-${month}-${day}`,
                "Hint": hint,
                "Status": "normal"
            } 
            let res = await saveQuestionForEachTopic(bodydata)
            if(res === undefined){
                setErrorsSubmit(true)
            }else{
                navigate(`/professor/${TopicID}`)
                toast.success('Add question success!', {
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
        setLoadingSubmit(false)
        setErrors(arrayError);
    } 

    useEffect( () => {
        getProfessors();
        getTopicData() 
    }, []);

    return (
        <div className="addquestion-page">
            {
                loadingSubmit &&
                <div className="loader">
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
            }
            <div className="cover-container">
                {
                    (isLoading || isLoading1) && 
                    <div className="loader2">
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                }
                {
                    !(isLoading || isLoading1) && 
                    <>
                    <Link className="btn-back" to={`/professor/${TopicID}`} data-aos="fade-right" data-aos-duration="1000">
                        <FaChevronLeft />
                    </Link>
                    <p className="title f-xl fw-800" data-aos="fade-up" data-aos-duration="1000">Add Question</p>
                    <form className="pt-4 row" onSubmit={handleSubmit}>
                        <div className="px-4" data-aos="fade-up" data-aos-duration="1000">
                            <div className="col-12 pb-4">
                                <label className="f-lg pb-2" htmlFor="name-id">Name<span className="color-5">*</span></label>
                                <input
                                    type="text" 
                                    name="name-id" 
                                    id="name-id" 
                                    className="input-box"
                                    placeholder={"What is " + topicInfo.TopicName + " ?"}
                                    onChange={(event) => setName(event.target.value)}
                                />
                                {errors.includes("name") && (<label className="f-xs color-5 pt-2" htmlFor="name-id">Please enter a name topic</label>)}
                            </div> 
                            <div className="col-12 pb-4">
                                <label className="f-lg pb-2" htmlFor="description-id">Description<span className="color-5">*</span></label>
                                <textarea
                                    type="text" 
                                    name="description-id" 
                                    id="description-id" 
                                    className="input-textareabox pt-3"
                                    placeholder="Detail about this question..."
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                                {errors.includes("description") && (<label className="f-xs color-5 pt-2" htmlFor="description-id">Please enter a description of topic</label>)}
                            </div>
                            <label className="f-lg pb-2" htmlFor="dificulty-id">Difficulty<span className="color-5">*</span></label>
                            <div className="col-6 pb-4 ">
                                <SelectPicker
                                    name="dificulty" 
                                    id="dificulty" 
                                    placeholder="-"
                                    data={dificultyAll}
                                    defaultValue={dificulty}
                                    setValue={setDificulty}
                                />
                                {errors.includes("dificulty") && (<label className="f-xs color-5 pt-2" htmlFor="dificulty-id">Please enter dificulty</label>)}
                            </div>
                            <div className="col-6 pb-4">
                                <label className="f-lg pb-2" htmlFor="point-id">Point<span className="color-5">*</span></label>
                                <input
                                    type="int" 
                                    name="point-id" 
                                    id="point-id" 
                                    className="input-box"
                                    placeholder="10, 20, 30, etc."
                                    onChange={(event) => setPoint(event.target.value)}
                                />
                                {errors.includes("point") && (<label className="f-xs color-5 pt-2" htmlFor="point-id">Please enter point</label>)}
                            </div>
                            <label className="f-lg pb-2" htmlFor="duedate-id">Due Date<span className="color-5">*</span></label>
                            <div className="col-6 pb-4 ">
                                <TuDatePicker
                                    name="duedate"
                                    id="duedate"
                                    defaultValue={duedate}
                                    setValue={setDueDate}
                                    min={new Date()}
                                />
                                {errors.includes("duedate") && (<label className="f-xs color-5 pt-2" htmlFor="duedate-id">Please enter duedate</label>)}
                            </div>
                            <div className="col-6 pb-4">
                                <label className="f-lg pb-2" htmlFor="hint-id">Hint<span className="color-5">*</span></label>
                                <input
                                    type="text" 
                                    name="hint-id" 
                                    id="hint-id" 
                                    className="input-box"
                                    placeholder="Some hint?"
                                    onChange={(event) => setHint(event.target.value)}
                                />
                                {errors.includes("hint") && (<label className="f-xs color-5 pt-2" htmlFor="hint-id">Please enter hint</label>)}
                            </div>                            
                        </div>
                        <div className="mt-2 mb-5 divider"></div>
                        <div className="col-12 d-flex jc-center">
                            <Link className='btn-02' to={`/professor/${TopicID}`}>
                                <span>Cancel</span>
                            </Link>
                            <button type="submit" className="btn-01">Submit</button>
                        </div>
                        {
                            errorsSubmit &&
                            <div className="col-12 pt-5 d-flex jc-center">
                                <label className="f-xm color-5" htmlFor="error">Server error. Please try again.</label>
                            </div>
                        } 
                    </form>
                    </>
                }
            </div>
            <div className="background-container"></div>
            <BackgroundIcon 
                icon={topicInfo?.Icon} 
                color={
                    topicInfo?.Type === "Computer Science"
                    ? "#1B1F4B"
                    : topicInfo?.Type === "Data Science"
                    ? "#6A244D"
                    : topicInfo?.Type === "Digital Business"
                    ? "#194D45"
                    : "#FFA242"
                }
            />
        </div>
    );
}

export default AddQuestion;