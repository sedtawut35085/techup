import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BackgroundIcon from '../../components/background/bgIcons.js';
import { FaChevronLeft } from 'react-icons/fa';
import TuDatePicker from '../../components/picker_date/datePicker.js'
// import { Select, Option } from "@material-tailwind/react";
import SelectPicker from '../../components/picker_select/selectPicker.js';
import SelectPicker4 from '../../components/picker_select/selectPicker4.js';
import { RiVipCrown2Fill } from 'react-icons/ri'
import { getProfessor } from '../../service/professor.js';
import { getTopicfromProfessor } from '../../service/topic.js';
import { saveQuestionForEachTopic } from '../../service/question.js';
import { saveTopic } from '../../service/topic.js';
import { useNavigate } from 'react-router-dom'
import Moment from 'moment';

function AddWeeklyQuestion() {

    const location = useLocation();
    const [allTopic, setAllTopic] = useState([])
    const data = location.state;
    const [inFoProfessor, setInFoProfessor] = useState("")
    let TopicID = window.location.href.split("/")[4];

    let res
    useEffect( () => {
        getProfessors(); 
        getTopics()
      }, []);
    
      async function getTopics() {
        let res = await getTopicfromProfessor();
        setAllTopic(res);
    }

    async function getProfessors() {
        res = await getProfessor();
        setInFoProfessor(res[0]);
    }
    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [topic,setTopic] = useState("")
    const [point,setPoint] = useState("")
    const [dificulty,setDificulty] = useState({label: "", data: ""})
    const [hint,setHint] = useState("")
    const [errorsSubmit, setErrorsSubmit] = useState(false)
    const [errors, setErrors] = useState([])

    const dificultyAll = [
        {label: "Easy", data: "Easy"},
        {label: "Normal", data: "Normal"},
        {label: "Hard", data: "Hard"}
    ]

    async function handleSubmit(event) {
        event.preventDefault();
        var today = new Moment().format('YYYY-MM-DD')
        var new_date = Moment(today, "YYYY-MM-DD").add('days', 12);
        var day = new_date.format('DD');
        var month = new_date.format('MM');
        var year = new_date.format('YYYY');
        var duedate = year + '-' + month + '-' + day
        setErrors([]);
        const arrayError = [];
        if(name === ""){
            arrayError.push('name');
        }
        if(description === ""){
            arrayError.push('description');
        }
        if(dificulty.label === ""){
            arrayError.push('dificulty');
        }
        if(topic === ""){
            arrayError.push('topic');
        }
        if(point === ""){
            arrayError.push('point');
        }
        if(hint === ""){
            arrayError.push('hint');
        }
        if(arrayError.length === 0) {
            event.preventDefault();
            var bodydata = {
                "TopicID": topic,
                "QuestionName": name,
                "Description": description,  
                "Difficulty": dificulty.data,    
                "Point": point,
                "DueDate": duedate,
                "Hint": hint,
                "Status": "request"
            }
            await saveQuestionForEachTopic(bodydata).then(navigate(`/professor`)).catch()
        }
        setErrors(arrayError);
    } 

    return (
        <div className="addquestion-page">
        <div className="cover-container">
            <Link className="btn-back" to={-1}>
                <FaChevronLeft />
            </Link>
            <p className="title f-xl fw-800">Add Weekly</p>
                <form className="pt-4 row" onSubmit={handleSubmit}>
                    <div className="px-4">
                        <div className="col-12 pb-4">
                            <label className="f-lg pb-2" htmlFor="name-id">Name<span className="color-5">*</span></label>
                            <input
                                type="text" 
                                name="name-id" 
                                id="name-id" 
                                className="input-box"
                                placeholder="What is operating system ?"
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
                                placeholder="Detail about topic..."
                                onChange={(event) => setDescription(event.target.value)}
                            />
                            {errors.includes("description") && (<label className="f-xs color-5 pt-2" htmlFor="description-id">Please enter a description of topic</label>)}
                        </div>
                        <label className="f-lg pb-2" htmlFor="topic-id">Topic<span className="color-5">*</span></label>
                        <div className="col-6 pb-4 ">
                            <SelectPicker4
                                name="allTopic" 
                                id="allTopic" 
                                placeholder="-"
                                data={allTopic}
                                defaultValue={topic}
                                setValue={setTopic}
                            />
                            {errors.includes("topic") && (<label className="f-xs color-5 pt-2" htmlFor="topic-id">Please select topic</label>)}
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
                            {errors.includes("dificulty") && (<label className="f-xs color-5 pt-2" htmlFor="dificulty-id">Please select dificulty</label>)}
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
                        {/* <label className="f-lg pb-2" htmlFor="duedate-id">Due Date<span className="color-5">*</span></label>
                        <div className="col-6 pb-4 ">
                            <TuDatePicker
                                name="duedate"
                                id="duedate"
                                defaultValue={duedate}
                                setValue={setDueDate}
                                min={new Date()}
                            />
                            {errors.includes("duedate") && (<label className="f-xs color-5 pt-2" htmlFor="duedate-id">Please enter duedate</label>)}
                        </div> */}
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
                        {/* <label className="f-lg pt-4" htmlFor="preview-id">Preview<span className="color-5"></span></label>   
                        <div className='topic-section'>
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
                        </div> */}
                    </div>
                    <div className="mt-2 mb-5 divider"></div>
                    <div className="col-12 d-flex jc-center">
                        <Link className='btn-02' to={`/professor/${TopicID}`}>
                            <span>Cancel</span>
                        </Link>
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
        <div className="background-container"></div>
        <BackgroundIcon 
          
        />
    </div>
    );
}

export default AddWeeklyQuestion;