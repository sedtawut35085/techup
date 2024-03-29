import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment'
import { toast } from 'react-toastify';

import { getWeeklyQuestion } from '../../service/weeklyQuestion';
import { getCount, getAllSubmissionOnWeekly, getCountAllSubmissionOnWeekly } from '../../service/submission';
import { getStudent } from '../../service/student';
import { getComment, getWeeklyCommentNew , addComment } from '../../service/discussQuestion';

import { FaSort } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { HiOutlineCalendar, HiOutlineExclamation } from 'react-icons/hi';
import { TbCalendarTime, TbFileDescription, TbMessage2, TbFileUpload, TbMessageCircle } from 'react-icons/tb'
import { IoCaretUp, IoCaretDown } from 'react-icons/io5'
import { BsReplyAll } from 'react-icons/bs'

import CommentDiscussQuestion from "../../components/comment/commentDiscussQuestion"
import BackgroundIcon from '../../components/background/bgIcons.js';


function Weeklyprof() {
    
    // const location = useLocation();
    const [topicID , setTopicID] = useState("");
    const [QuestionID , setQuestionID] = useState("");
    const [pageSize,setPageSize] = useState(5);
    const [isHaveWeekly, setIsHaveWeekly] = useState(false)

    const [isLoading1, setIsLoading1] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [isLoading3, setIsLoading3] = useState(true);
    const [isLoading4, setIsLoading4] = useState(true);

    const [allSubmission,setAllSubmission] = useState([]);
    const [numberPage, setNumberPage] = useState([])
    const [inFoQuestion, setInFoQuestion] = useState("")
    const [inFoUser, setInFoUser] = useState("")

    const [menuActive, setMenuActive] = useState(1);
    const [isDone, setIsDone] = useState(false);
    let pageStart = 0;
    let pageNumber
    const [commentDiscuss, setCommentDiscuss] = useState("");
    const [discuss, setDiscuss] = useState([]);    
    const [showReply, setShowReply] = useState([]);
    const [currentpage,setCurrentpage] = useState(1);
    
    const rootComments = discuss.filter( (discuss) => discuss.ParentID === null)

    function getReply(discussQuestionId) {
        return discuss.filter(discuss => discuss.ParentID === discussQuestionId).sort(
            (a,b) => new Date(a.Date).getTime() - new Date(b.Date).getTime())
    }

    async function getDiscuss() {
        let res = await getWeeklyCommentNew();
        setDiscuss(res)
        setIsLoading1(false)
    }

    async function addNewComment() {
        if (commentDiscuss !== "") {
            await addComment(inFoQuestion.QuestionID,commentDiscuss)
            let res = await getWeeklyCommentNew();
            setDiscuss(res)
            setCommentDiscuss("")
        } else {
            toast.error('Please enter comment!', {
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

    async function loadCount(pageSize) {
        const res = await getCountAllSubmissionOnWeekly();
        const Pagenumberlist = []
        pageNumber = Math.ceil(res[0]["count(*)"] / pageSize);
        for(let i=1;i<=pageNumber;i++){
            Pagenumberlist.push(i)
        }
        setNumberPage(Pagenumberlist)
    }

    async function changepage(event) {
        let temp = event.target.value
        setCurrentpage(Number(temp))
        pageStart = pageSize*(event.target.value - 1)
        await loadWeeklySubmission(pageStart,pageSize)
    }

    async function gotofirstpage(event) {
        setCurrentpage(1)
        pageStart = pageSize*(1 - 1)
        await loadWeeklySubmission(pageStart,pageSize)
    }

    async function gotolastpage(event) {
        setCurrentpage(numberPage.length)
        pageStart = pageSize*(numberPage.length - 1)
        await loadWeeklySubmission(pageStart,pageSize)
    }

    async function gotobackpage(event) {
        event.preventDefault();
        setCurrentpage(currentpage-1)
        pageStart = pageSize*(currentpage - 2)
        await loadWeeklySubmission(pageStart,pageSize)
    }

    async function gotonextpage(event) {
        setCurrentpage(currentpage+1)
        pageStart = pageSize*(currentpage)
        await loadWeeklySubmission(pageStart,pageSize)
    }

    async function changepagesize(pageSize) {
        setPageSize(Number(pageSize))
        setCurrentpage(1)
        pageStart = pageSize*(1 - 1)
        await loadCount(Number(pageSize))
        await loadWeeklySubmission(pageStart,Number(pageSize))
    }
    
    function toggleReply(id) {
        let array = [...showReply];
        if(array.indexOf(id) > -1) {
            array.splice(array.indexOf(id), 1);
        } else {
            array.push(id);
        }
        setShowReply(array)
    }  

    async function getInfoUser() {
        let resUser = await getStudent();
        setInFoUser(resUser[0])
        setIsLoading2(false)
    }

    async function loadWeeklyQuestion(){
        let res = await getWeeklyQuestion()
        if(res[0] !== undefined){
            setInFoQuestion(res[0]);
            setTopicID(res[0].TopicID);
            setQuestionID(res[0].QuestionID);
            setIsHaveWeekly(true)
            setIsLoading3(false);
        }else{
            setIsHaveWeekly(false)
            setIsLoading3(false);
        }
        // loadEachSubmissionFromUserIDandQuestionID();
    }

    async function loadWeeklySubmission(pageStart,pageSize){
        let res = await getAllSubmissionOnWeekly(pageStart,pageSize);
        if(res[0] === undefined){
            setIsDone(false)
        }else{ 
            setIsDone(true)
            setAllSubmission(res)
        }
        setIsLoading4(false)
    }

    useEffect(() => {
        loadWeeklyQuestion();
        loadWeeklySubmission(pageStart,pageSize);
        getInfoUser();
        getDiscuss();
        loadCount(pageSize); 
    }, [])

    return (
        <div className="weekly-page">
            <div className="cover-container">
                {
                    (isLoading1 || isLoading2 || isLoading3 || isLoading4) &&
                    // isLoading3 &&
                    <div className="loader2">
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                }   
                {
                    !(isLoading1 || isLoading2 || isLoading3 || isLoading4) &&
                    // !isLoading3 &&
                    <>  
                    {isHaveWeekly === true ?                       
                    <div data-aos="fade-left" data-aos-duration="1000" className="body">
                        <div className='pb-4'>
                        <Link className="btn-addquestion p-2" to={`/professor/weekly/addweekly`} >Add Weekly + </Link> 
                        </div>
                        <div className="top-section">
                            <div className="left-side pt-2">
                                <p className="question-name">{inFoQuestion.QuestionName}</p>
                                <p className="subject-name">
                                    <div className="icon">
                                        <HiOutlineCalendar size={24} />
                                    </div>
                                    Weekly question -&nbsp;
                                    <span 
                                        // className="color-3"
                                        className={`${
                                            inFoQuestion.Difficulty === "Easy"
                                            ? "color-3"
                                            : inFoQuestion.Difficulty === "Normal"
                                            ? "color-1"
                                            : inFoQuestion.Difficulty === "Hard"
                                            ? "color-5"
                                            : ""
                                        }`}
                                    >
                                        {inFoQuestion.Difficulty}
                                    </span>
                                </p>
                                <p className="due-date">
                                    <div className="icon">
                                        <TbCalendarTime size={24} />
                                    </div>
                                    Due date - {Moment(inFoQuestion.DueDate).format('DD/MM/YYYY')}
                                    {/* Due date - 01/03/2023 */}
                                </p>
                            </div>
                            <div className="right-side">
                                <div className="point">
                                    <span>{inFoQuestion.Point} P</span>
                                </div>
                            </div>
                        </div>
                        <div className="problem-section">
                            <div className="menu-section">
                                <div 
                                    className={`menu des ${menuActive === 1 ? "active" : ""}`}
                                    onClick={() => setMenuActive(1)} 
                                    data-title={menuActive === 1 ? null : "Description"}
                                >
                                    <TbFileDescription className="icon" />
                                    <span>Description</span>
                                </div>
                                <div 
                                    className={`menu dis ${menuActive === 2 ? "active" : ""}`}
                                    onClick={() => setMenuActive(2)} 
                                    data-title={menuActive === 2 ? null : "Discuss"}
                                >
                                    <TbMessage2 className="icon" />
                                    <span>Discuss</span>
                                </div>
                                <div 
                                    className={`menu sub ${menuActive === 3 ? "active" : ""}`}
                                    onClick={() => setMenuActive(3)} 
                                    data-title={menuActive === 3 ? null : "Submission"}
                                >
                                    <TbFileUpload className="icon" />
                                    <span>Submission</span>
                                </div>
                            </div>
                            <div className={`detail-section ${menuActive === 1 ? "description" : menuActive === 2 ? "discuss" : "submission"}`}>
                                <div className={`description ${menuActive === 1 ? "active" : ""}`}>
                                    <p>
                                        {inFoQuestion.QuestionDescription}
                                    </p>
                                </div>
                                <div className={`discuss ${menuActive === 2 ? "active" : ""}`}>
                                    <div className="comment-box">
                                        <textarea 
                                            className="autosize" 
                                            placeholder="Type comment here ..." 
                                            onChange={(e) => setCommentDiscuss(e.target.value)}
                                            value={commentDiscuss} 
                                        />
                                        <button className="btn-01" onClick={() => addNewComment()}>Comment</button>
                                    </div>
                                    {/* <div className="sort">
                                        <span>Sort by :</span>
                                        <select>
                                            <option>Best</option>
                                            <option>Newest</option>
                                            <option>Oldest</option>
                                        </select>
                                    </div> */}
                                    {
                                        rootComments.map((comment, key) => (
                                            <CommentDiscussQuestion
                                                key={comment.DiscussQuestionID}
                                                comment={comment}
                                                replies={getReply(comment.DiscussQuestionID)}></CommentDiscussQuestion>
                                        ))
                                    }
                                </div>
                                <div className={`submission ${menuActive === 3 ? "active" : ""}`}>
                                <div className="submission-table">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="status">Status <FaSort /></th>
                                                <th className="name">Name <FaSort /></th>
                                                <th className="date">Date submission <FaSort /></th>
                                                <th className="action text-center">Action</th>
                                            </tr>  
                                        </thead>
                                        <tbody>
                                        {allSubmission.map((submit, i) => 
                                        <tr key={i}> 
                                            <td className={`status ${submit.Status === "Checked" ? "color-3" : "color-1"} `}>{submit.Status}</td>
                                            <td className="name">{submit.FirstName + " " + submit.SurName}</td>
                                            <td className="date">{submit.DateSubmit}</td>
                                            { submit.Status === "UnChecked"
                                            ?
                                            <>
                                                <td className="action">
                                                    <Link className="btn-view-detail" to={`question/${submit.QuestionID_Submissions}/submission/${submit.SubmissionID}`}>View Detail</Link>
                                                </td>
                                            </>
                                            :
                                            <>
                                                <td className="action">
                                                    <div className="btn-view-detail">View Detail</div>
                                                </td>
                                            </>

                                            }
                                           
                                        </tr>
                                        )}
                                                                        
                                        </tbody>
                                    </table>                                                      
                                </div>                               
                                </div>
                            </div>
                        </div>
                        {
                        menuActive === 3
                        ?   
                        <div className="pagination1">                                    
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
                                <div className="display-per-page">
                                    <span>Display per page</span>
                                    <select onChange={(event) => {changepagesize(event.target.value)}} className="page">
                                        <option default>5</option>
                                        <option>10</option>
                                        <option>25</option>
                                    </select>
                                    {/* <span>Showing 1-5 of 25</span> */}
                                </div>
                            </div>
            
                        : null
                    }            
                    </div>
                    :
                    <>
                     <div >
                            <div className="text-center f-md thai pt-4 pb-4">
                                Now there is no question of the week, Please add question of weekly or wait for admin accept.
                            </div>
                            <div className="text-center f-md thai pt-4">
                                <Link className="btn-addquestion p-2" to={`/professor/weekly/addweekly`} >Add Weekly + </Link> 
                            </div>
                        </div>
                    </>
                    }
                    </>
                }
            </div>
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    );
}

export default Weeklyprof;