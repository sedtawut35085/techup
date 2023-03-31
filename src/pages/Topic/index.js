import React, { useState ,useEffect } from 'react';
import Moment from 'moment';
import { Link ,useLocation } from 'react-router-dom';

import { FaChevronLeft, FaSort, FaFrownOpen } from 'react-icons/fa';
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { HiOutlineChartBar } from 'react-icons/hi'
import { TbDoorExit, TbArrowsShuffle, TbClock, TbClockOff, TbSwords } from 'react-icons/tb'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { RiVipCrown2Fill, RiMailFill, RiInstagramFill, RiFacebookCircleFill, RiGithubFill, RiGlobalFill , RiLineFill } from 'react-icons/ri'
import { addJoinTopic , getJoin , deleteJoinedTopic } from '../../service/joinTopic'
import { getQuestionForEachTopic, getCountOfQuestionForEachTopic } from '../../service/question.js';
import { getEachTopic } from '../../service/topic';
import { IoCloseCircle } from 'react-icons/io5'

import SelectPicker2 from '../../components/picker_select/selectPicker2.js'
import BackgroundIcon from '../../components/background/bgIcons.js';

function Topic() {
    const [modal, setModal] = useState(false)
    let topicID = window.location.href.split("/")[4]
    // const location = useLocation();
    // const data = location.state;
    const [data,setData] = useState([]);

    const [currentpage,setCurrentpage] = useState(1);
    const [numberPage, setNumberPage] = useState([])
    let pageStart = 0;
    const [pageSize,setPageSize] = useState(5);
    let pageNumber
    let todayDate = new Date().toISOString().slice(0, 10);
    let todayDatetime = new Date(todayDate);
    let duedatetime;

    async function getTopicData() {
        const res = await getEachTopic(topicID);
        setData(res[0]);
        setContact(JSON.parse(res[0].Contact))
    }

    async function loadQuestionForEachTopic(pageStart,value) {
        const res = await getQuestionForEachTopic(topicID,pageStart,value);
        setAllQuestion(res); 
    }

    async function loadCountofQuestionForEachTopic(pageSize) {
        const res = await getCountOfQuestionForEachTopic(topicID);
        const Pagenumberlist = []
        pageNumber = Math.ceil(res[0]["count(*)"] / pageSize);
        for(let i=1;i<=pageNumber;i++){
            Pagenumberlist.push(i)
        }
        setNumberPage(Pagenumberlist)
    }

    function leaveTopic(topicID) {
        deleteJoinedTopic(topicID);
        setJoin(false);
    }

    function joinTopic(topicID) {
        setJoin(true);
        addJoinTopic(topicID);
    }

    async function getJoinedList() {
        const res = await getJoin();
        const found = res.some(joined => joined.TopicID === (Number(topicID)))
        if (!found)
        {
            setJoin(false);
        } else {
            setJoin(true)
        }
    }

    const [allQuestion, setAllQuestion] = useState([])
    // const [joinedList, setJoinedList] = useState([])
    useEffect(() => {
        // loadQuestionForEachTopic();
        getTopicData();
        getJoinedList();
        loadCountofQuestionForEachTopic(pageSize);
        loadQuestionForEachTopic(pageStart,pageSize);
    }, []);

    const listQuestions = allQuestion.map((question, i) =>   
    <tr 
        className={`${question.SubmissionID === null ? "" : "color-3"}`} 
        key={i}
    >
        <td className="status">
            {
                duedatetime = new Date(question.DueDate) < todayDatetime 
                ?   <TbClockOff className={`${question.SubmissionID === null ? "color-gray2" : "color-3"}`} size={24} /> 
                :   <TbClock className={`${question.SubmissionID === null ? "color-1" : "color-3"}`} size={24} /> 
            }
        </td>
        <td className="title thai">
            <Link to={`/topic/${topicID}/question/${question.QuestionID}`}>{question.QuestionName}</Link>
        </td>
        <td className="date">{Moment(question.DueDate).format('YYYY-MM-DD')}</td>
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
        <td className="point-table">
            <span className={`point ${question.SubmissionID === null ? "" : "done"}`}>{question.SubmissionID === null ? (question.Point + "P") : "Done"}</span>
        </td>
       
    </tr>
    )

    const [contact, setContact] = useState([])

    const [join, setJoin] = useState();

    const [question, setQuestion] = useState([

    ])

    const statusAll = [
        {label: "Available", data: "available"},
        {label: "Ongoing", data: "ongoing"},
        {label: "Submitted", data: "submitted"}
    ]
    const [status, setStatus] = useState({label: "", data: ""})

    const difficultyAll = [
        {label: "Easy", data: "Easy"},
        {label: "Normal", data: "Normal"},
        {label: "Hard", data: "Hard"}
    ]
    const [difficulty, setDifficulty] = useState({label: "", data: ""})

    const [search, setSearch] = useState("")

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

    return (
        <div className="topic-page">
            <div className="cover-container">
                <Link className="btn-back" to="/home">
                    <FaChevronLeft />
                </Link>
                <div className="body">
                    <div className="main-section">
                        <div className="title">
                            <span className="f-xl fw-700">{data.TopicName}</span>
                            {
                                join
                                ?   <button className="btn-3" onClick={() => setModal(true)}><TbDoorExit /> Leave</button>
                                :   <button className="btn-2" onClick={() => joinTopic(data.TopicID)}>+ Join</button>
                            }
                        </div>
                        <p className="f-md thai fw-400 mt-4">{data.Description}</p>
                        <div className="divider mt-5"></div>
                    </div>
                    <div className="info-section">
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
                        <div className="info-box">
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
                            <button className="btn-4">
                                Random<TbArrowsShuffle className="ms-2"/>
                            </button>
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
                                            <TbSwords className="color-5" size={24} />
                                        </td>
                                        <td className="title thai"><Link to="1">Pipeline ทำงานอย่างไร</Link></td>
                                        <td className="date">08-12-22</td>
                                        <td className="acceptance">10.00 %</td>
                                        <td className="difficulty color-1">Normal</td>
                                        <td className="point-table"><span className="point" style={{backgroundColor: "#FED470"}}>150 P</span></td>
                                    </tr> */}
                                    {/* <tr>
                                        <td className="status">
                                            <TbClock className="color-1" size={24} /> 
                                        </td>
                                        <td className="title thai"><Link to="2">Kernel คืออะไร</Link></td>
                                        <td className="date">05-12-22</td>
                                        <td className="acceptance">10.00 %</td>
                                        <td className="difficulty color-3">Easy</td>
                                        <td className="point-table"><span className="point" style={{backgroundColor: "#FED470"}}>100 P</span></td>
                                    </tr>
                                    <tr>
                                        <td className="status">
                                            <TbClock className="color-1" size={24} /> 
                                        </td>
                                        <td className="title thai"><Link to="3">อธิบายความแตกต่าง virtualization and simulation</Link></td>
                                        <td className="date">05-12-22</td>
                                        <td className="acceptance">10.00 %</td>
                                        <td className="difficulty color-5">Hard</td>
                                        <td className="point-table"><span className="point" style={{backgroundColor: "#FED470"}}>100 P</span></td>
                                    </tr>
                                    <tr className="color-gray2">
                                        <td className="status">
                                            <TbClockOff size={24} /> 
                                            <TbSwords className="color-5" size={24} />
                                        </td>
                                        <td className="title thai"><Link to="4">Explain why an operating system can be viewed as a resource allocator.</Link></td>
                                        <td className="date">01-01-21</td>
                                        <td className="acceptance">10.00 %</td>
                                        <td className="difficulty color-5">Hard</td>
                                        <td className="point-table"><span className="point" style={{backgroundColor: "#FED470"}}>1 P</span></td>
                                    </tr>
                                    <tr className="color-gray2">
                                        <td className="status">
                                            <TbClockOff size={24} /> 
                                        </td>
                                        <td className="title thai"><Link to="5">What is a bootstrap program, and where is it stored?</Link></td>
                                        <td className="date">01-01-21</td>
                                        <td className="acceptance">10.00 %</td>
                                        <td className="difficulty color-5">Hard</td>
                                        <td className="point-table"><span className="point" style={{backgroundColor: "#58A550"}}>Done</span></td>
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
            </div>

            {/* Modal */}
            <div className="tu-modal" style={modal ? {opacity: "1", visibility: "visible"} : {}}>
                <div className="tu-modal-card">
                    <IoCloseCircle className="close-button" onClick={() => setModal(false)} />
                    <div className="tu-modal-head">
                        <FaFrownOpen className="icon" />
                        <span>
                            Are you sure you want to leave ?
                        </span>
                    </div>
                    <div className="tu-modal-body">
                        <p>If you leave this topic all questions that you're challenging will forced to give up, all questions that you have submitted and pending to professor will disappear. And you'll not receive all notifications from this topic</p>
                    </div>
                    <div className="tu-modal-footer">
                        <div className="cancel-button" onClick={() => setModal(false)}>No, keep me remain.</div>
                        <div className="accept-button" onClick={() => {setModal(false); leaveTopic(data.TopicID)}}>Yes, I want to leave.</div>
                    </div>
                </div>
            </div>

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
    );
}

export default Topic;