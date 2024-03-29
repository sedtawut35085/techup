import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';

import { getQuestionForEachTopic, getCountOfQuestionForEachTopic } from '../../service/question.js';
import { getEachTopic } from '../../service/topic'

import { FaChevronLeft, FaSort, FaFrownOpen } from 'react-icons/fa';
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { HiOutlineChartBar } from 'react-icons/hi'
import { TbClock, TbClockOff } from 'react-icons/tb'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { RiVipCrown2Fill, RiMailFill, RiInstagramFill, RiFacebookCircleFill, RiGithubFill, RiGlobalFill, RiLineFill } from 'react-icons/ri'

import SelectPicker2 from '../../components/picker_select/selectPicker2.js'
import BackgroundIcon from '../../components/background/bgIcons.js';

function TopicProf() {
    // const location = useLocation();
    // const data = location.state;
    const [isLoading, setIsLoading] = useState(true)
    const [isLoading1, setIsLoading1] = useState(true)
    const [isLoading2, setIsLoading2] = useState(true)
    const [data,setData] = useState([])
    const [currentpage,setCurrentpage] = useState(1);
    const [pageSize,setPageSize] = useState(5);
    let pageStart = 0;
    let pageNumber
    let todayDate = new Date().toISOString().slice(0, 10);
    let todayDatetime = new Date(todayDate);
    let duedatetime;
    let TopicID = window.location.href.split("/")[4];
    const [contact,setContact] = useState([])

    useEffect(() => {
        getTopicData()
        loadCountofQuestionForEachTopic(pageSize);
        loadQuestionForEachTopic(pageStart,pageSize);
    }, []);
    
    async function getTopicData() {
        let res = await getEachTopic(TopicID)
        setData(res[0])
        setContact(JSON.parse(res[0].Contact))
        setIsLoading(false)
    }

    async function loadQuestionForEachTopic(pageStart,value) {
        const res = await getQuestionForEachTopic(TopicID,pageStart,value);
        setAllQuestion(res); 
        setIsLoading2(false)
    }

    async function loadCountofQuestionForEachTopic(pageSize) {
        const res = await getCountOfQuestionForEachTopic(TopicID);
        const Pagenumberlist = []
        pageNumber = Math.ceil(res[0]["count(*)"] / pageSize);
        for(let i=1;i<=pageNumber;i++){
            Pagenumberlist.push(i)
        }
        setNumberPage(Pagenumberlist)
        setIsLoading1(false)
    }

    const [allQuestion, setAllQuestion] = useState([])
    const [numberPage, setNumberPage] = useState([])

    const statusAll = [
        {label: "Ontime", data: "ontime", title: "Date"},
        {label: "Outtime", data: "outtime", title: "Date"},
    ]
    const [status, setStatus] = useState({label: "", data: ""})

    const difficultyAll = [
        {label: "Easy", data: "Easy", title: "Difficulty"},
        {label: "Normal", data: "Normal", title: "Difficulty"},
        {label: "Hard", data: "Hard", title: "Difficulty"}
    ]
    const [difficulty, setDifficulty] = useState({label: "", data: ""})

    const [search, setSearch] = useState("")

    const listQuestions = allQuestion.map((question, i) =>
    <tr 
        className={`
            ${
                question.SubmissionID !== null 
                ? "color-3" 
                : Moment(question.DueDate).isSameOrBefore(new Moment().format('YYYY-MM-DD')) 
                ? "color-gray2"
                : ""
            }`} 
        key={i}
    >
        <td className="status">
            {
                Moment(question.DueDate).isSameOrBefore(new Moment().format('YYYY-MM-DD'))
                ?   <TbClockOff className={`${question.SubmissionID === null ? "color-gray2" : "color-3"}`} size={24} /> 
                :   <TbClock className={`${question.SubmissionID === null ? "color-1" : "color-3"}`} size={24} /> 
            }            
        </td>
        <td className="title thai"><Link to={`/professor/${TopicID}/question/${question.QuestionID}`} state={data} >{question.QuestionName}</Link></td>
        <td className="date">{question.DueDate}</td>
        <td className="acceptance">10.00 %</td>
        <td 
            className={`difficulty ${
                question.Difficulty === "Easy" && question.SubmissionID === null
                ? "color-3"
                : question.Difficulty === "Normal" && question.SubmissionID === null
                ? "color-1"
                : question.Difficulty === "Hard" && question.SubmissionID === null
                ? "color-5"
                : "color-3"
            }`}
        >
            {question.Difficulty}
        </td>
        <td className="point-table"><span className="point" style={{backgroundColor: "#FED470"}}>{question.Point} P</span></td>
    </tr>
    )

    async function changepage(event) {
        let temp = event.target.value
        setCurrentpage(Number(temp))
        pageStart = pageSize*(event.target.value - 1)
        await loadQuestionForEachTopic(pageStart,pageSize)
    }

    async function gotofirstpage(event) {
        setCurrentpage(1)
        pageStart = pageSize*(1 - 1)
        await loadQuestionForEachTopic(pageStart,pageSize)
    }

    async function gotolastpage(event) {
        setCurrentpage(numberPage.length)
        pageStart = pageSize*(numberPage.length - 1)
        await loadQuestionForEachTopic(pageStart,pageSize)
    }

    async function gotobackpage(event) {
        event.preventDefault();
        setCurrentpage(currentpage-1)
        pageStart = pageSize*(currentpage - 2)
        await loadQuestionForEachTopic(pageStart,pageSize)
    }

    async function gotonextpage(event) {
        setCurrentpage(currentpage+1)
        pageStart = pageSize*(currentpage)
        await loadQuestionForEachTopic(pageStart,pageSize)
    }

    async function changepagesize(pageSize) {
        setPageSize(Number(pageSize))
        setCurrentpage(1)
        pageStart = pageSize*(1 - 1)
        await loadCountofQuestionForEachTopic(Number(pageSize))
        await loadQuestionForEachTopic(pageStart,Number(pageSize))
    }

    async function changefilter() {
        // setCurrentpage(1)
        // pageStart = pageSize*(1 - 1)
        // await loadCountofQuestionForEachTopic(Number(pageSize))
        // await loadQuestionForEachTopic(pageStart,Number(pageSize))
    }
    
    return (
        <div className="topic-page">
            <div className="cover-container">
            {
                (isLoading || isLoading1 || isLoading2) &&
                <div className="loader2">
                    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                </div>
            }
            { 
                !(isLoading || isLoading1 || isLoading2) &&
                <>
                <Link data-aos="fade-right" data-aos-duration="1000"  className="btn-back" to="/professor">
                    <FaChevronLeft />
                </Link>
                <div data-aos="fade-up" data-aos-duration="1000"  className="body">
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
                                    <img width="160px" height="160px" className="profile-pic rounded-circle" src={data.ImageURL} alt="Avatar" />
                                    <div className="d-flex jc-center ai-center mt-4 f-md">
                                        <RiVipCrown2Fill className="color-1 me-1" size={24} /> {data.Name} {data.Surname}
                                    </div>
                                </div>
                                <div className="divider mt-3"></div>
                                <div className="contact-all">
                                    {contact.Email &&
                                        <div className="contact">
                                            <div className="icon">
                                                <RiMailFill size={28} />
                                            </div>
                                            <span>{contact.Email}</span>
                                        </div>
                                    }
                                    {contact.Facebook && 
                                        <div className="contact">
                                            <div className="icon">
                                                <RiFacebookCircleFill size={28} />
                                            </div>
                                            <span>{contact.Facebook}</span>
                                        </div>
                                    }
                                    {contact.Instagram &&
                                        <div className="contact">
                                            <div className="icon">
                                                <RiInstagramFill size={28} />
                                            </div>
                                            <span>{contact.Instagram}</span>
                                        </div>
                                    }
                                    {contact.LineID &&
                                        <div className="contact">
                                            <div className="icon">
                                                <RiLineFill size={28} />
                                            </div>
                                            <span>{contact.LineID}</span>
                                        </div>
                                    }
                                    {contact.ETC &&
                                        <div className="contact">
                                            <div className="icon">
                                                <RiGlobalFill size={28} />
                                            </div>
                                            <span>{contact.ETC}</span>
                                        </div>
                                    }
                                </div>
                            </div>                      
                        </div>
                    </div>
                    <div className="question-section">
                        <div className="d-flex ai-center">
                            <span className="f-xl fw-700 me-3">Question</span>
                            <Link className="btn-2-edit" to={`/professor/${TopicID}/addquestion`} >Add Question +</Link>
                        </div>
                        <div className="top-question-section mt-0">
                            {/* <div className="filter">
                                <SelectPicker2
                                id='status'
                                placeholder="Status"
                                data={statusAll}
                                changefilter={changefilter}
                                defaultValue={status}
                                setValue={setStatus}
                                />
                                <SelectPicker2
                                id='difficulty'
                                placeholder="Difficulty"
                                changefilter={changefilter}
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
                            </div> */}
                            
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
                                <span>Display per page</span>
                                <select onChange={(event) => {changepagesize(event.target.value)}} className="page">
                                    <option default>5</option>
                                    <option>10</option>
                                    <option>25</option>
                                </select>
                            </div>
                            <div className="pagination-number">
                                <button onClick={gotofirstpage} className={
                                    currentpage !== 1 
                                    ? "arrow"
                                    : "arrow disable"
                                    }><FiChevronsLeft /></button>
                                <button onClick={gotobackpage} className={
                                    currentpage !== 1 
                                    ? "arrow"
                                    : "arrow disable"
                                    }><FiChevronLeft /></button>
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
                                <button onClick={gotonextpage} className={
                                    currentpage < numberPage.length
                                    ? "arrow"
                                    : "arrow disable"
                                    }><FiChevronRight /></button>
                                <button onClick={gotolastpage} className={
                                    currentpage < numberPage.length
                                    ? "arrow"
                                    : "arrow disable"
                                    }><FiChevronsRight /></button>
                            </div>
                        </div>  
                    </div>
                </div>
                </>
            }
            {/* Background */}
            <div className="background-container"></div>
            <BackgroundIcon 
                icon={data.Icon} 
                color={
                    data.Type === "Computer Science"
                    ? "#1B1F4B"
                    : data.Type === "Data Science"
                    ? "#6A244D"
                    : data.Type === "Digital Business"
                    ? "#194D45"
                    : "#FFA242"
                }
            />
            </div>
        </div>
    );
}

export default TopicProf;