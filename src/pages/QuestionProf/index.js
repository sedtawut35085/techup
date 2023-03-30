import React, { ChangeEvent, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import $ from 'jquery'
import Moment from 'moment';

import { fileSize, fileType } from '../../assets/js/helper'
import { getQuestion } from '../../service/question';

import { FaChevronLeft, FaSort } from 'react-icons/fa';
import { TbCalendarTime, TbBulb, TbLock, TbInfoCircle, TbFileDescription, TbMessage2, TbFileUpload, TbMessageCircle, } from 'react-icons/tb'
import { BsReplyAll } from 'react-icons/bs'
import { HiOutlineExclamation } from 'react-icons/hi'
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { IoCloseCircle, IoCaretUp, IoCaretDown } from 'react-icons/io5'
import { getCount, getAllSubmission } from '../../service/submission';

import BackgroundIcon from '../../components/background/bgIcons.js';
import { all } from 'axios';

function QuestionProf() {
    const [inFoQuestion, setInFoQuestion] = useState("")
    const [numberPage, setNumberPage] = useState([])
    const [pageSize,setPageSize] = useState(5);
    const [currentpage,setCurrentpage] = useState(1);
    const [allSubmission,setAllSubmission] = useState([]);
    const location = useLocation();
    let pageStart = 0;
    let pageNumber
    let TopicID = window.location.href.split("/")[4];
    let QuestionId = window.location.href.split("/")[6];

    useEffect( () => {
        getQuestionFromQuestionID();
        loadCount(pageSize); 
        loadSubmission(pageStart,pageSize);
      }, []);

    async function getQuestionFromQuestionID() {
        let res = await getQuestion(QuestionId);
        setInFoQuestion(res[0])
    }

    async function loadSubmission(pageStart,value) {
        const res = await getAllSubmission(QuestionId,pageStart,value);
        setAllSubmission(res)
    }

    async function loadCount(pageSize) {
        const res = await getCount(QuestionId);
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
        await loadSubmission(pageStart,pageSize)
    }

    async function gotofirstpage(event) {
        setCurrentpage(1)
        pageStart = pageSize*(1 - 1)
        await loadSubmission(pageStart,pageSize)
    }

    async function gotolastpage(event) {
        setCurrentpage(numberPage.length)
        pageStart = pageSize*(numberPage.length - 1)
        await loadSubmission(pageStart,pageSize)
    }

    async function gotobackpage(event) {
        event.preventDefault();
        setCurrentpage(currentpage-1)
        pageStart = pageSize*(currentpage - 2)
        await loadSubmission(pageStart,pageSize)
    }

    async function gotonextpage(event) {
        setCurrentpage(currentpage+1)
        pageStart = pageSize*(currentpage)
        await loadSubmission(pageStart,pageSize)
    }

    async function changepagesize(pageSize) {
        setPageSize(Number(pageSize))
        setCurrentpage(1)
        pageStart = pageSize*(1 - 1)
        await loadCount(Number(pageSize))
        await loadSubmission(pageStart,Number(pageSize))
    }

    const [guModal, setGuModal] = useState(false);
    const [hintModal, setHintModal] = useState(false);
    const [voteModal, setVoteModal] = useState(false);

    const [data, setData] = useState({
        name: "Operation System",
        type: "Computer Science",
        icon: "idea",
        description: "ระบบปฏิบัติการ(Operating System) หรือ โอเอส(OS) คือ ซอฟต์แวร์ที่ทำหน้าที่ควบคุมการทำงานของระบบคอมพิวเตอร์ ให้คอมพิวเตอร์และอุปกรณ์ต่อพ่วงต่าง ๆ ทำงานร่วมกันอย่างมีประสิทธิภาพ ซอฟต์แวร์ระบบที่รู้จักกันดี คือ ระบบปฏิบัติการ(OS-Operating System) เช่น MS-DOS, UNIX, OS/2, Windows, Linux และ Ubuntu เป็นต้น",
    });

    const [commentDiscuss, setCommentDiscuss] = useState("")
    const [commentSubmission, setCommentSubmission] = useState("")
    const [fileList, setFileList] = useState([]);

    const [challenge, setChallenge] = useState(false);
    const [menuActive, setMenuActive] = useState(1);
    const [showReply, setShowReply] = useState([]);
    const [discuss, setDiscuss] = useState([
        {
            id: "1",
            detail: "Nibh et faucibus enim odio purus feugiat tempor massa libero. Luctus montes, vitae eget consequat morbi lacus, nibh commodo. Sed cras cursus sed neque purus elit vitae et non. Proin massa ut velit duis ullamcorper. Arcu aliquet elementum non volutpat ipsum massa egestas mauris nunc.",
            vote: 50,
            owner: {
                name: "Wattanasiri Uparakkitanon",
            },
            datetime: "11/5/2022, 00:00",
            reply: [
                {
                    id: "2",
                    detail: "Nibh et faucibus enim odio purus feugiat tempor massa libero. Luctus montes, vitae eget consequat morbi lacus, nibh commodo. Sed cras cursus sed neque purus elit vitae et non. Proin massa ut velit duis ullamcorper. Arcu aliquet elementum non volutpat ipsum massa egestas mauris nunc.",
                    vote: 20,
                    owner: {
                        name: "Wattanasiri Uparakkitanon",
                    },
                    datetime: "11/5/2022, 00:00",
                },
                {
                    id: "3",
                    detail: "Nibh et faucibus enim odio purus feugiat tempor massa libero. Luctus montes, vitae eget consequat morbi lacus, nibh commodo. Sed cras cursus sed neque purus elit vitae et non. Proin massa ut velit duis ullamcorper. Arcu aliquet elementum non volutpat ipsum massa egestas mauris nunc.",
                    vote: 10,
                    owner: {
                        name: "Wattanasiri Uparakkitanon",
                    },
                    datetime: "11/5/2022, 00:00",
                }
            ]
        },
        {
            id: "4",
            detail: "Nibh et faucibus enim odio purus feugiat tempor massa libero. Luctus montes, vitae eget consequat morbi lacus, nibh commodo. Sed cras cursus sed neque purus elit vitae et non. Proin massa ut velit duis ullamcorper. Arcu aliquet elementum non volutpat ipsum massa egestas mauris nunc.",
            vote: 40,
            owner: {
                name: "Wattanasiri Uparakkitanon",
            },
            datetime: "11/5/2022, 00:00",
            reply: [
                {
                    id: "5",
                    detail: "Nibh et faucibus enim odio purus feugiat tempor massa libero. Luctus montes, vitae eget consequat morbi lacus, nibh commodo. Sed cras cursus sed neque purus elit vitae et non. Proin massa ut velit duis ullamcorper. Arcu aliquet elementum non volutpat ipsum massa egestas mauris nunc.",
                    vote: 20,
                    owner: {
                        name: "Wattanasiri Uparakkitanon",
                    },
                    datetime: "11/5/2022, 00:00",
                }
            ]
        }
    ])

    function toggleReply(id) {
        let array = [...showReply];
        if(array.indexOf(id) > -1) {
            array.splice(array.indexOf(id), 1);
        } else {
            array.push(id);
        }
        setShowReply(array)
    }
    
    function deleteFile(file) {
        setFileList(fileList.filter(fileList => fileList !== file))
    }

    function autosize(){
        var text = $('.autosize');
    
        text.each(function(){
            $(this).attr('rows',1);
            resize($(this));
        });
    
        text.on('input', function(){
            resize($(this));
        });
        
        function resize ($text) {
            $text.css('height', 'auto');
            $text.css('height', $text[0].scrollHeight+'px');
        }
    }
    autosize();

    return(
        <div className="question-page">
            <div className="cover-container">
                <Link className="btn-back" to={`/professor/${TopicID}`}>
                    <FaChevronLeft />
                </Link>
                <div className="body">
                    <div className="top-section">
                        <div className="left-side">
                            <p className="question-name">{inFoQuestion.QuestionName}</p>
                            <p className="subject-name">
                                <div className="icon">
                                    <img width="24px" alt="icon" src={"/assets/images/icons/" + data.icon + ".png"} />
                                </div>
                                Operating System -&nbsp;<span className="color-3">Easy</span>
                            </p>
                            <p className="due-date">
                                <div className="icon">
                                    <TbCalendarTime size={24} />
                                </div>
                                Due date - {Moment(inFoQuestion.DueDate).format('YYYY-MM-DD')}
                            </p>
                        </div>
                        <div className="right-side">
                            <div className="action">
                                <button 
                                    className="btn-5"
                                    onClick={() => {
                                        setHintModal(true);
                                    }}
                                >
                                    <TbBulb size={22} className="me-1" />Hint
                                </button>                               
                            </div>
                            <div className="point">100 P</div>
                        </div>
                    </div>
                    <div className="problem-section">
                        <div className="menu-section">
                            <div 
                                className={`menu des ${menuActive === 1 ? "active" : ""}`}
                                onClick={() => setMenuActive(1)}
                            >
                                <TbFileDescription className="icon" />
                                <span>Description</span>
                            </div>
                            <div 
                                className={`menu dis ${menuActive === 2 ? "active" : ""}`}
                                onClick={() => setMenuActive(2)}
                            >
                                <TbMessage2 className="icon" />
                                <span>Discuss</span>
                            </div>
                            <div 
                                className={`menu sub ${menuActive === 3 ? "active" : ""}`}
                                onClick={() => setMenuActive(3)}
                            >
                                <TbFileUpload className="icon" />
                                <span>Submission</span>
                            </div>
                        </div>
                        <div className={`detail-section ${menuActive === 1 ? "description" : menuActive === 2 ? "discuss" : "submission"}`}>
                            <div className={`description ${menuActive === 1 ? "active" : ""}`}>
                                <p>
                                   {inFoQuestion.Description}
                                </p>
                            </div>
                            <div className={`discuss ${menuActive === 2 ? "active" : ""}`}>
                                <div className="comment-box">
                                    <textarea 
                                        className="autosize" 
                                        placeholder="Type comment here ..." 
                                        onChange={(e) => setCommentDiscuss(e.target.value)} 
                                    />
                                    <button className="btn-01">Comment</button>
                                </div>
                                <div className="sort">
                                    <span>Sort by :</span>
                                    <select>
                                        <option>Best</option>
                                        <option>Newest</option>
                                        <option>Oldest</option>
                                    </select>
                                </div>
                                {
                                    discuss.map((comment, key) => (
                                        <div className="comment" key={key}>
                                            <div className="comment-owner">
                                                <img height="50px" src="/assets/images/icons/profile.png" />
                                                <div className="owner-detail">
                                                    <span>{comment?.owner?.name}</span>
                                                    <div className="date">
                                                        <span>Create at:</span>
                                                        <span className="ms-2">{comment?.datetime}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="comment-detail">
                                                {comment?.detail}
                                            </p>
                                            <div className="comment-action">
                                                <div className="vote">
                                                    <IoCaretUp className="icon" />
                                                    <span>{comment?.vote}</span>
                                                    <IoCaretDown className="icon" />
                                                </div>
                                                {
                                                    comment?.reply.length > 0
                                                    ?   <div className="show-reply" onClick={() => toggleReply(comment?.id)}>
                                                            <TbMessageCircle className="icon" />
                                                            <span>Show {comment?.reply?.length} Reply</span>
                                                        </div>
                                                    :   null
                                                }
                                                <div className="reply">
                                                    <BsReplyAll className="icon" />
                                                    <span>Reply</span>
                                                </div>
                                                <div className="report">
                                                    <HiOutlineExclamation className="icon" />
                                                    <span>report</span>
                                                </div>                                        
                                            </div>
                                            <div className={`comment-reply ${showReply.indexOf(comment?.id) > -1 ? "active" : ""}`}>
                                            {
                                                comment?.reply.map((replyComment, key1) => (
                                                        <div className="comment" key={key1}>
                                                            <div className="comment-owner">
                                                                <img height="50px" src="/assets/images/icons/profile.png" />
                                                                <div className="owner-detail">
                                                                    <span>{replyComment?.owner.name}</span>
                                                                    <div className="date">
                                                                        <span>Create at:</span>
                                                                        <span className="ms-2">{replyComment?.datetime}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <p className="comment-detail">
                                                                {replyComment?.detail}
                                                            </p>
                                                            <div className="comment-action">
                                                                <div className="vote">
                                                                    <IoCaretUp className="icon" />
                                                                    <span>{replyComment?.vote}</span>
                                                                    <IoCaretDown className="icon" />
                                                                </div>
                                                                <div className="report">
                                                                    <HiOutlineExclamation className="icon" />
                                                                    <span>report</span>
                                                                </div>                                        
                                                            </div>
                                                        </div>
                                                ))
                                            }            
                                            </div>
                                        </div>
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
                                            <td className="action">
                                                <Link className="btn-view-detail" to={`submission/${submit.SubmissionID}`}>View Detail</Link>
                                            </td>
                                        </tr>
                                        )}
                                            {/* <tr>
                                                <td className="status color-1">Unchecked</td>
                                                <td className="name">Wattanasiri Uparakkitanon</td>
                                                <td className="date">05-12-2022, 00:00</td>
                                                <td className="action">
                                                    <Link className="btn-view-detail" to="submission/1">View Detail</Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="status color-1">Unchecked</td>
                                                <td className="name">Phongrawit Phiphatbawornchat</td>
                                                <td className="date">05-12-2022, 00:00</td>
                                                <td className="action">
                                                    <Link className="btn-view-detail" to="submission/1">View Detail</Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="status color-3">Checked</td>
                                                <td className="name">Nattapat Sittichai</td>
                                                <td className="date">05-12-2022, 00:00</td>
                                                <td className="action">
                                                    <Link className="btn-view-detail" to="submission/1">View Detail</Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="status color-3">Checked</td>
                                                <td className="name">Pisit Jaiton</td>
                                                <td className="date">05-12-2022, 00:00</td>
                                                <td className="action">
                                                    <Link className="btn-view-detail" to="submission/1">View Detail</Link>
                                                </td>
                                            </tr>                                                                                         */}
                                        </tbody>
                                    </table>                                                      
                                </div>
                                {/* <div className="submit-table">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="title">Name </th>
                                                <th className="topic">Topic - Question </th>
                                                <th className="status">Status </th>
                                                <th className="duedate">Due Date </th>
                                                <th className="datesubmit">Date Submission </th>
                                                <th className="action">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="title thai">Sedtawut chalothornnarumit</td>
                                                <td className="topic thai">OS - Kernel คืออะไร</td>
                                                <td className="status thai color-12">Unchecked</td>
                                                <td className="duedate thai">05-12-2022</td>
                                                <td className="datesubmit thai">05-12-2022, 00:00</td>
                                                <td className="point-table">
                                                    <div className="col-12">
                                                        <button type="submit" className="btnsubmit-viewdetail">View Detail</button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="title thai">Sedtawut chalothornnarumit</td>
                                                <td className="topic thai">OS - Kernel คืออะไร</td>
                                                <td className="status thai color-12">Unchecked</td>
                                                <td className="duedate thai">05-12-2022</td>
                                                <td className="datesubmit thai">05-12-2022, 00:00</td>
                                                <td className="point-table">
                                                    <div className="col-12">
                                                        <button type="submit" className="btnsubmit-viewdetail">View Detail</button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="title thai">Sedtawut chalothornnarumit</td>
                                                <td className="topic thai">OS - Kernel คืออะไร</td>
                                                <td className="status thai color-3">checked</td>
                                                <td className="duedate thai">05-12-2022</td>
                                                <td className="datesubmit thai">05-12-2022, 00:00</td>
                                                <td className="point-table">
                                                    <div className="col-12">
                                                        <button type="submit" className="btnsubmit-viewdetail">View Detail</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>                                                     
                                </div>                                 */}
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
            </div>            

            {/* Hint show Modal */}
            <div className="tu-modal" style={hintModal ? {opacity: "1", visibility: "visible"} : {}}>
                <div className="tu-modal-card">
                    <IoCloseCircle className="close-button" onClick={() => setHintModal(false)} />
                    <div className="tu-modal-head">
                        <TbBulb className="icon" />
                        <span>
                            Hint!
                        </span>
                    </div>
                    <div className="tu-modal-body">
                        <p>Kernel is Kernel :p</p>
                    </div>
                </div>
            </div>

            {/* Hint vote Modal */}
            <div className="tu-modal" style={voteModal ? {opacity: "1", visibility: "visible"} : {}}>
                <div className="tu-modal-card hint">
                    <IoCloseCircle className="close-button" onClick={() => setVoteModal(false)} />
                    <div className="tu-modal-head jc-center">
                        <TbBulb className="icon" />
                        <span>
                            Vote to show hint!
                        </span>
                    </div>
                    <div className="tu-modal-body mb-0">
                        <TbLock className="color-1" size={140} />
                        <span className="count-vote">1 vote left to show hint</span>
                        <div className="vote-section">
                            <span className="vote active jc-end">Show<IoCaretUp className="ms-1" size={14} /></span>
                            <span className="number">19</span>
                            <span className="vote jc-start"><IoCaretDown className="me-1" size={14} />Not show</span>
                        </div>
                        <span className="info"><TbInfoCircle className="me-1" size={21} />If hint showed point will decrease by 10%</span>
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
    )
}

export default QuestionProf;