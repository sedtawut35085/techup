import React, { useState ,useEffect } from 'react';
import Moment from 'moment';
import { Link ,useLocation } from 'react-router-dom';

import { toggleScrollable } from '../../assets/js/helper'
import { addJoinTopic , getJoin , deleteJoinedTopic } from '../../service/joinTopic'
import { getQuestionForEachTopic, getCountOfQuestionForEachTopic } from '../../service/question.js';
import { getEachTopic } from '../../service/topic';

import { BiMessageSquareDetail } from 'react-icons/bi'
import { FaChevronLeft, FaSort, FaFrownOpen } from 'react-icons/fa';
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { HiOutlineChartBar } from 'react-icons/hi'
import { IoCloseCircle } from 'react-icons/io5'
import { RiVipCrown2Fill, RiMailFill, RiInstagramFill, RiFacebookCircleFill, RiGithubFill, RiGlobalFill , RiLineFill } from 'react-icons/ri'
import { TbDoorExit, TbArrowsShuffle, TbClock, TbClockOff, TbSwords } from 'react-icons/tb'

import SelectPicker2 from '../../components/picker_select/selectPicker2.js'
import BackgroundIcon from '../../components/background/bgIcons.js';

function Topic() {

    const topicID = window.location.href.split("/")[4]

    // const [isLoading, setIsLoading] = useState([1, 2, 3, 4])
    const [isLoading, setIsLoading] = useState(true)
    const [isLoading1, setIsLoading1] = useState(true)
    const [isLoading2, setIsLoading2] = useState(true)
    const [isLoading3, setIsLoading3] = useState(true)
    const [modal, setModal] = useState(false)
    const [data,setData] = useState([]);

    const [allQuestion, setAllQuestion] = useState([])
    const [contact, setContact] = useState([])
    const [join, setJoin] = useState();    

    async function getTopicData() {
        const res = await getEachTopic(topicID);
        setData(res[0]);
        setContact(JSON.parse(res[0].Contact))
        setIsLoading(false)
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
        setIsLoading1(false)
        // setIsLoading(isLoading.splice(isLoading.indexOf(2), 1))
    }
    async function loadQuestionForEachTopic(pageStart,value) {
        const res = await getQuestionForEachTopic(topicID,pageStart,value);
        setAllQuestion(res); 
        setIsLoading2(false)
        // setIsLoading(isLoading.splice(isLoading.indexOf(3), 1))
    }
    async function loadCountOfQuestionForEachTopic(pageSize) {
        const res = await getCountOfQuestionForEachTopic(topicID);
        const PageNumberList = []
        pageNumber = Math.ceil(res[0]["count(*)"] / pageSize);
        for(let i=1;i<=pageNumber;i++){
            PageNumberList.push(i)
        }
        setNumberPage(PageNumberList)
        setIsLoading3(false)
        // setIsLoading(isLoading.splice(isLoading.indexOf(4), 1))
    }    
    const listQuestions = allQuestion.map((question, i) =>   
    <tr 
        className={`
        ${
            question.SubmissionID !== null 
            ? "color-3" 
            : Moment(question.DueDate).isBefore(new Date()) 
            ? "color-gray2"
            : ""
        }`} 
        key={i}
    >
        <td className="status">
            {
                Moment(question.DueDate).isBefore(new Date())
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

    useEffect(() => {
        getTopicData();
        getJoinedList();
        loadCountOfQuestionForEachTopic(pageSize);
        loadQuestionForEachTopic(pageStart,pageSize);
    }, []);
    
    function leaveTopic(topicID) {
        deleteJoinedTopic(topicID);
        setJoin(false);
    }
    function joinTopic(topicID) {
        setJoin(true);
        addJoinTopic(topicID);
    }
    
    //Filter and search
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

    //Pagination function
    const [currentPage,setCurrentPage] = useState(1);
    const [numberPage, setNumberPage] = useState([])
    const [pageSize,setPageSize] = useState(5);
    let pageStart = 0;
    let pageNumber

    async function changePage(event) {
        let temp = event.target.value
        setCurrentPage(Number(temp))
        pageStart = pageSize*(event.target.value - 1)
        await loadQuestionForEachTopic(pageStart,pageSize)
    }
    async function goToFirstPage(event) {
        setCurrentPage(1)
        pageStart = pageSize*(1 - 1)
        await loadQuestionForEachTopic(pageStart,pageSize)
    }
    async function goToLastPage(event) {
        setCurrentPage(numberPage.length)
        pageStart = pageSize*(numberPage.length - 1)
        await loadQuestionForEachTopic(pageStart,pageSize)
    }
    async function goToPreviousPage(event) {
        event.preventDefault();
        setCurrentPage(currentPage-1)
        pageStart = pageSize*(currentPage - 2)
        await loadQuestionForEachTopic(pageStart,pageSize)
    }
    async function goToNextPage(event) {
        setCurrentPage(currentPage+1)
        pageStart = pageSize*(currentPage)
        await loadQuestionForEachTopic(pageStart,pageSize)
    }
    async function changePageSize(pageSize) {
        setPageSize(Number(pageSize))
        setCurrentPage(1)
        pageStart = pageSize*(1 - 1)
        await loadCountOfQuestionForEachTopic(Number(pageSize))
        await loadQuestionForEachTopic(pageStart,Number(pageSize))
    }

    return (
        <div className="topic-page">
            <div className="cover-container">
                {
                    (isLoading === true) && (isLoading1 === true) && (isLoading2 === true) && (isLoading3 === true) &&
                    <div className="loader2">
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                }      
                {
                    (isLoading === false) && (isLoading1 === false) && (isLoading2 === false) && (isLoading3 === false) &&
                    <>
                        <Link data-aos="fade-down" data-aos-duration="1000" className="btn-back" to="/home">
                            <FaChevronLeft />
                        </Link>
                        <div data-aos="fade-down" data-aos-duration="1000" className="body">                    
                            <div className="main-section">
                                <div className="title">
                                    <span className="f-xl fw-700">{data.TopicName}</span>
                                    {
                                        join
                                        ?   <button className="btn-3" onClick={() => {setModal(true); toggleScrollable(true);}}><TbDoorExit /> Leave</button>
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
                                <div className="d-flex jc-btw ai-center pb-2">
                                    <span className="f-xl fw-700">Question</span>
                                </div>                                
                                {/* <div className="top-question-section mt-4">
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
                                    <button className="btn-4 random">
                                        <span>Random</span><TbArrowsShuffle className="icon"/>
                                    </button>
                                </div> */}
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
                                        </tbody>
                                    </table>                                                      
                                </div>
                                <div className="pagination1">
                                    <div className="display-per-page">
                                        <span>Display per page</span>
                                        <select onChange={(event) => {changePageSize(event.target.value)}} className="page">
                                            <option default>5</option>
                                            <option>10</option>
                                            <option>25</option>
                                        </select>
                                    </div>
                                    <div className="pagination-number">
                                        <button 
                                            onClick={goToFirstPage} 
                                            className={currentPage !== 1 ? "arrow" : "arrow disable"}
                                            disabled={currentPage === 1}
                                        >
                                            <FiChevronsLeft />
                                        </button>
                                        <button 
                                            onClick={goToPreviousPage} 
                                            className={currentPage !== 1 ? "arrow" : "arrow disable"}
                                            disabled={currentPage === 1}
                                        >
                                            <FiChevronLeft />
                                        </button>
                                        {numberPage.map((key, i) => (
                                            <button key={i} name={key} value={key} className={
                                                currentPage === key
                                                ? "number active"
                                                : "number"
                                            } onClick={changePage}>{key}</button>
                                        ))}
                                        <button 
                                            onClick={goToNextPage} 
                                            className={currentPage < numberPage.length ? "arrow" : "arrow disable"}
                                            disabled={currentPage >= numberPage.length}
                                        >
                                            <FiChevronRight />
                                        </button>
                                        <button 
                                            onClick={goToLastPage}
                                            className={currentPage < numberPage.length ? "arrow" : "arrow disable"}
                                            disabled={currentPage >= numberPage.length}
                                        >
                                            <FiChevronsRight />
                                        </button>
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </>
                }
            </div>

            {/* Modal */}
            <div className="tu-modal" style={modal ? {opacity: "1", visibility: "visible"} : {}}>
                <div className="tu-modal-card">
                    <IoCloseCircle className="close-button" onClick={() => {setModal(false); toggleScrollable(false);}} />
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
                        <div className="cancel-button" onClick={() => {setModal(false); toggleScrollable(false);}}>No, keep me remain.</div>
                        <div className="accept-button" onClick={() => {setModal(false); leaveTopic(data.TopicID); toggleScrollable(false);}}>Yes, I want to leave.</div>
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