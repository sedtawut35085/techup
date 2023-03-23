import React, { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { FaChevronLeft, FaSort, FaFrownOpen } from 'react-icons/fa';
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { HiOutlineChartBar } from 'react-icons/hi'
import { TbDoorExit, TbClock, TbClockOff } from 'react-icons/tb'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { RiVipCrown2Fill, RiInstagramFill, RiFacebookCircleFill, RiGithubFill, RiGlobalFill, RiLineFill } from 'react-icons/ri'
import { AiTwotoneMail } from 'react-icons/ai'

import { IoCloseCircle } from 'react-icons/io5'
import { getQuestionForEachTopic, getCountOfQuestionForEachTopic } from '../../service/question.js';

import SelectPicker2 from '../../components/picker_select/selectPicker2.js'
import BackgroundIcon from '../../components/background/bgIcons.js';

function TopicProf() {
    const location = useLocation();
    const [modal, setModal] = useState(false)

    const data = location.state;
    const [currentpage,setCurrentpage] = useState(1);
    const [lastQuestionID,setLastQuestionID] = useState(0);
    let pageStart = 0;
    let pageSize = 5;
    let pageNumber
    let todayDate = new Date().toISOString().slice(0, 10);
    let todayDatetime = new Date(todayDate);
    let duedatetime;

    async function loadQuestionForEachTopic() {
        const res = await getQuestionForEachTopic(data.TopicID,pageStart,pageSize);
        setAllQuestion(res); 
    }

    async function loadCountofQuestionForEachTopic() {
        const res = await getCountOfQuestionForEachTopic(data.TopicID);
        const Pagenumberlist = []
        pageNumber = Math.ceil(res[0]["count(*)"] / pageSize);
        for(let i=1;i<=pageNumber;i++){
            Pagenumberlist.push(i)
        }
        setNumberPage(Pagenumberlist)
    }

    const [allQuestion, setAllQuestion] = useState([])
    const [numberPage, setNumberPage] = useState([])

    useEffect(() => {
        loadCountofQuestionForEachTopic();
        loadQuestionForEachTopic();
    }, []);

    const contact = JSON.parse(data.Contact)

    const statusAll = [
        {label: "Ontime", data: "ontime"},
        {label: "Outtime", data: "outtime"},
    ]
    const [status, setStatus] = useState({label: "", data: ""})

    const difficultyAll = [
        {label: "Easy", data: "Easy"},
        {label: "Normal", data: "Normal"},
        {label: "Hard", data: "Hard"}
    ]
    const [difficulty, setDifficulty] = useState({label: "", data: ""})

    const [search, setSearch] = useState("")

    const listQuestions = allQuestion.map((question, i) => 
    <tr key={i}>
        <td className="status">
            {duedatetime = new Date(question.DueDate) < todayDatetime ?
            <>
                <TbClockOff size={24} /> 
            </>
            :
            <>
                <TbClock className="color-1" size={24} /> 
            </>
            }
        </td>
        <td className="title thai"><Link to="1">{question.QuestionName}</Link></td>
        <td className="date">{question.DueDate}</td>
        <td className="acceptance">10.00 %</td>
        <td className="difficulty color-1">{question.Difficulty}</td>
        <td className="point-table"><span className="point" style={{backgroundColor: "#FED470"}}>{question.Point} P</span></td>
    </tr>
    )

    async function changepage(event) {
        event.preventDefault();
        setCurrentpage(event.target.value)
        pageStart = 5*(event.target.value - 1)
        await loadQuestionForEachTopic()
    }
    
    return (
        <div className="topic-page">
            <div className="cover-container">
                <Link className="btn-back" to="/professor">
                    <FaChevronLeft />
                </Link>
                <div className="body">
                    <div className="main-section">
                        <div className="title">
                            <span className="f-xl fw-700">{data.TopicName}</span>
                        </div>
                        <p className="f-md thai fw-400 mt-4">{data.Description}</p>
                        <div className="divider mt-5"></div>
                    </div>
                    <div className="info-section item">
                        <div className="info-box">
                            <span className="color-1 f-lg fw-700 d-flex ai-center">Stats Session<HiOutlineChartBar className="ms-2" size={28} /></span>
                            <div className="d-flex ai-center mt-3 jc-btw bar">
                                <span className="color-3 f-md">Easy</span>
                                <div className="stat-bar">
                                    <div className="stat-val" style={{width: 50 + "%"}}></div>
                                </div>
                            </div>
                            <div className="d-flex ai-center mt-4 jc-btw bar">
                                <span className="color-1 f-md">Normal</span>
                                <div className="stat-bar">
                                    <div className="stat-val" style={{width: 50 + "%"}}></div>
                                </div>
                            </div>
                            <div className="d-flex ai-center mt-4 jc-btw bar">
                                <span className="color-5 f-md">Hard</span>
                                <div className="stat-bar">
                                    <div className="stat-val" style={{width: 50 + "%"}}></div>
                                </div>
                            </div>
                        </div>
                        <div className="info-box mt-5">
                            <span className="color-1 f-lg fw-700 d-flex ai-center">Detail Session<BiMessageSquareDetail className="ms-2" size={28} /></span>      
                            <div className="detail">
                                <div className="pt-4 d-flex fd-col jc-center ai-center">
                                    <img width="100px" className="profile-pic" src="/assets/images/icons/profile.png" />
                                    <div className="d-flex jc-center ai-center mt-4 f-md">
                                        <RiVipCrown2Fill className="color-1 me-1" size={24} /> {data.Name} {data.Surname}
                                    </div>
                                </div>
                                <div className="divider mt-3"></div>
                                <div className="contact-all">
                                {contact.Email === undefined ?
                                    <>
                                    
                                    </>
                                    :                        
                                    <>
                                        <div className="contact">
                                            <div className="icon">
                                                <AiTwotoneMail size={32} />
                                            </div>
                                            <span>{contact.Email}</span>
                                        </div>
                                    </>
                                } 
                                {contact.Facebook === undefined ?
                                    <>
                                    
                                    </>
                                    :                        
                                    <>
                                        <div className="contact">
                                            <div className="icon">
                                                <RiFacebookCircleFill size={32} />
                                            </div>
                                            <span>{contact.Facebook}</span>
                                        </div>
                                    </>
                                }
                                {contact.Instagram === undefined ?
                                    <>
                                    
                                    </>
                                    :                        
                                    <>
                                        <div className="contact">
                                            <div className="icon">
                                                <RiInstagramFill size={32} />
                                            </div>
                                            <span>{contact.Instagram}</span>
                                        </div>
                                    </>
                                } 
                                {contact.LineID === undefined ?
                                    <>
                                    
                                    </>
                                    :                        
                                    <>
                                        <div className="contact">
                                            <div className="icon">
                                                <RiLineFill size={32} />
                                            </div>
                                            <span>{contact.LineID}</span>
                                        </div>
                                    </>
                                } 
                                {contact.ETC === undefined ?
                                    <>
                                    
                                    </>
                                    :                        
                                    <>
                                        <div className="contact">
                                            <div className="icon">
                                                <RiGlobalFill size={32} />
                                            </div>
                                            <span>{contact.ETC}</span>
                                        </div>
                                    </>
                                }   
                                </div>
                            </div>                      
                        </div>
                    </div>
                    <div className="question-section">
                        <span className="f-xl fw-700">Question</span>
                        <div className="top-question-section mt-4">
                            <div className="filter">
                                <SelectPicker2
                                id='status'
                                placeholder="Status"
                                data={statusAll}
                                defaultValue={status}
                                setValue={setStatus}
                                />
                                <SelectPicker2
                                id='difficulty'
                                placeholder="Difficulty"
                                data={difficultyAll}
                                defaultValue={difficulty}
                                setValue={setDifficulty}
                                />
                                <div className="search-box">
                                    <FiSearch size={24} className="me-1" />
                                    <input 
                                    placeholder="Search question..."
                                    onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Link className="btn-addquestion" to="/addquestion" state={data} >Add Question + </Link> 
                        </div>
                        <div className="question-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="status">Status <FaSort /></th>
                                        <th className="title">Title <FaSort /></th>
                                        <th className="date">Due date <FaSort /></th>
                                        <th className="acceptance">Acceptance <FaSort /></th>
                                        <th className="difficulty">Difficulty <FaSort /></th>
                                        <th className="point-table">Point <FaSort /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listQuestions}
                                    {/* <tr>
                                        <td className="status">
                                            <TbClock className="color-1" size={24} /> 
                                        </td>
                                        <td className="title thai"><Link to="1">Pipeline ทำงานอย่างไร</Link></td>
                                        <td className="date">08-12-22</td>
                                        <td className="acceptance">10.00 %</td>
                                        <td className="difficulty color-1">Normal</td>
                                        <td className="point-table"><span className="point" style={{backgroundColor: "#FED470"}}>150 P</span></td>
                                    </tr> */}
                                    {/* <tr className="color-gray2">
                                        <td className="status">
                                            <TbClockOff size={24} /> 
                                        </td>
                                        <td className="title thai"><Link to="5">What is a bootstrap program, and where is it stored?</Link></td>
                                        <td className="date">01-01-21</td>
                                        <td className="acceptance">10.00 %</td>
                                        <td className="difficulty color-5">Hard</td>
                                        <td className="point-table"><span className="point" style={{backgroundColor: "#FED470"}}>1 P</span></td>
                                    </tr> */}
                                </tbody>
                            </table>                                                      
                        </div>
                        <div className="pagination1">
                            <div className="display-per-page">
                                {/* <span>Display per page</span>
                                <select className="page">
                                    <option default>1</option>
                                    <option>10</option>
                                    <option>25</option>
                                </select> */}
                            </div>
                            <div className="pagination-number">
                                <span className="arrow disable"><FiChevronsLeft /></span>
                                <span className="arrow disable"><FiChevronLeft /></span>
                                {numberPage.map((key, i) => (
                                    <button key={i} name={key} value={key} className={
                                        currentpage === key
                                        ? "number active"
                                        : "number"
                                    } onClick={changepage}>{key}</button>
                                ))}
                                {/* <span className="number active">1</span>
                                <span className="number">2</span>
                                <span className="number">3</span>
                                <span className="number">4</span>
                                <span className="number">5</span>
                                 */}
                                <span className="arrow"><FiChevronRight /></span>
                                <span className="arrow"><FiChevronsRight /></span>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>

            {/* Background */}
            <div className="background-container"></div>
            <BackgroundIcon 
                icon={data.icon} 
                color={
                    data.type === "Computer Science"
                    ? "#1B1F4B"
                    : data.type === "Data Science"
                    ? "#6A244D"
                    : "#194D45"
                }
            />
        </div>
    );
}

export default TopicProf;