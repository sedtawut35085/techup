import React, { ChangeEvent, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import $ from 'jquery'

import { fileSize, fileType, download, downloadAll } from '../../assets/js/helper'
import Moment from 'moment';
import { FaChevronLeft } from 'react-icons/fa';
import { TbCalendarTime, TbBulb, TbLock, TbInfoCircle, TbFileUpload, TbFileZip, } from 'react-icons/tb'
import { GiFlyingFlag } from 'react-icons/gi'
import { BsReplyAll } from 'react-icons/bs'
import { getQuestion } from '../../service/question';
import { updateStudentText, getStudentFromStudentEmail } from '../../service/student'
import { HiOutlineExclamation } from 'react-icons/hi'
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { IoCloseCircle, IoCaretUp, IoCaretDown } from 'react-icons/io5'
import { getEachSubmission, updateSubmission } from '../../service/submission';
import BackgroundIcon from '../../components/background/bgIcons.js';
import { addPointFromProfessorToLogPoint } from '../../service/logPoint';

function SubmissionWeeklyProf() {
    const [inFoQuestion, setInFoQuestion] = useState("")
    const [inFoUser, setInFoUser] = useState("")
    const [inFoSubmission, setInFoSubmission] = useState("")
    const location = useLocation();
    let TopicID = window.location.href.split("/")[4];
    let QuestionId = window.location.href.split("/")[6];
    let SubmissionId = window.location.href.split("/")[8];
    const navigate = useNavigate()

    useEffect( () => {
        getQuestionFromQuestionID(); 
        loadSubmission();
      }, []);

    async function getQuestionFromQuestionID() {
        let res = await getQuestion(QuestionId);
        setInFoQuestion(res[0])
    }

    async function loadSubmission() {
        let res = await getEachSubmission(SubmissionId);
        setInFoSubmission(res[0])
        setFileList(JSON.parse(res[0].FileAttachment))
        setScore(res[0].Score)
        setCommentScore(res[0].CommentFromProf)
        let resUser = await getStudentFromStudentEmail(res[0].StudentEmail);
        setInFoUser(resUser[0])
    }
    
    const [guModal, setGuModal] = useState(false);
    const [hintModal, setHintModal] = useState(false);
    const [voteModal, setVoteModal] = useState(false);
    const [fileList, setFileList] = useState([]);

    const [data, setData] = useState({
        name: "Operation System",
        type: "Computer Science",
        icon: "idea",
        description: "ระบบปฏิบัติการ(Operating System) หรือ โอเอส(OS) คือ ซอฟต์แวร์ที่ทำหน้าที่ควบคุมการทำงานของระบบคอมพิวเตอร์ ให้คอมพิวเตอร์และอุปกรณ์ต่อพ่วงต่าง ๆ ทำงานร่วมกันอย่างมีประสิทธิภาพ ซอฟต์แวร์ระบบที่รู้จักกันดี คือ ระบบปฏิบัติการ(OS-Operating System) เช่น MS-DOS, UNIX, OS/2, Windows, Linux และ Ubuntu เป็นต้น",
    });

    const [commentScore, setCommentScore] = useState("")
    const [score, setScore] = useState(-1)

    const [menuActive, setMenuActive] = useState(1);

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

    async function handleSubmit() {
        if(score < 0){

        }else{
            var bodystatus = {
                "updateKey": "Status",
                "updateValue": "Checked" 
            }
            var bodyscore = {
                "updateKey": "Score",
                "updateValue": score 
            }
            var bodyCommentscore = {
                "updateKey": "CommentFromProf",
                "updateValue": commentScore 
            }
            let resupdatestatus = await updateSubmission(SubmissionId,bodystatus)
            let resupdatescore = await updateSubmission(SubmissionId,bodyscore)
            let resupdatecommentscore = await updateSubmission(SubmissionId,bodyCommentscore)
            const point = score*inFoQuestion.Point/100
            var body = {
                "updateType": "Text",
                "updateKey": "Point",
                "updateValue": Number(point) + Number(inFoUser.Point)
            }
            let resupdateresult = await updateStudentText(body,inFoUser.UserEmail)
            var bodyForMostPoint = {
                "updateType": "Text",
                "updateKey": "MostPoint",
                "updateValue": Number(point) + Number(inFoUser.MostPoint)
            }
            let resupdateMaxpoint = await updateStudentText(bodyForMostPoint,inFoUser.UserEmail)
            let resAddToLogPoint = await addPointFromProfessorToLogPoint(inFoUser.UserEmail,point,"from Weekly Question : " + inFoQuestion.QuestionName)
            navigate(`/professor/weekly`)
        }
    }

    return(
        <div className="question-page">
            <div className="cover-container">
                <Link className="btn-back" to={-1}>
                    <FaChevronLeft />
                </Link>
                <div className="body">
                    <p className="fw-700 f-xl thai">{inFoQuestion.QuestionName}</p>
                    <div className="top-section">
                        <div className="left-side">
                            <p className="subject-name">
                                <div className="icon">
                                    <img width="24px" alt="icon" src={"/assets/images/icons/" + data.icon + ".png"} />
                                </div>
                                {inFoSubmission.TopicName}
                                 {/* -&nbsp;<span className="color-3">Easy</span> */}
                            </p>
                            <p className="due-date">
                                <div className="icon">
                                    <TbCalendarTime size={24} />
                                </div>
                                Due date - {Moment(inFoQuestion.DueDate).format('YYYY-MM-DD')}
                            </p>
                        </div>
                        <div className="right-side">
                            <div>
                                <span className="f-smd color-gray2">
                                    Name: <span className="color-black">{inFoSubmission.FirstName + " " + inFoSubmission.SurName}</span>
                                </span>
                            </div>
                            <div className="mt-3">
                                <span className="f-smd color-gray2">
                                    Submission Date: <span className="color-black">{inFoSubmission.DateSubmit}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="problem-section">
                        <div className="menu-section">
                            <div 
                                className={`menu ans ${menuActive === 1 ? "active" : ""}`}
                                onClick={() => setMenuActive(1)}
                            >
                                <TbFileUpload className="icon" />
                                <span>Answer</span>
                            </div>
                            <div 
                                className={`menu scr ${menuActive === 2 ? "active" : ""}`}
                                onClick={() => setMenuActive(2)}
                            >
                                <svg className="icon" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M10 17l4 -4"></path>
                                    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                                    <path d="M10 13h.01"></path><path d="M14 17h.01"></path>
                                </svg>
                                <span>Score</span>
                            </div>
                        </div>
                        <div className={`detail-section ${menuActive === 1 ? "answer" : "submission"}`}>
                            <div className={`answer ${menuActive === 1 ? "active" : ""}`}>
                                <div className="comment-box">
                                    <p className="m-0">
                                        {inFoSubmission.Answer}
                                    </p>
                                </div>      
                                <div className="attachment">
                                    <span className="f-md fw-700">Attachment ({fileList?.length || 0})</span>
                                    <div className="sp-vertical"></div>
                                    {fileList?.map((file, key) => ( 
                                        <div className="attach-file" key={key}>
                                            <div className="d-flex jc-center ai-center">
                                                <div className="file-icon">{fileType(file.name)}</div>
                                                <div className="file-info">
                                                    <a 
                                                        className="file-name"
                                                        href={file.Url}
                                                        download={file.name}
                                                    >
                                                        {file.name}
                                                    </a>
                                                    <span className="file-size">{fileSize(Number(file.size))}</span>
                                                </div>
                                            </div>
                                            <div className="file-action">
                                                <button className="btn-download" onClick={() => download(file.Url, file.name)}>
                                                    Download
                                                </button>
                                            </div>
                                        </div>
                                    ))}        
                                    {
                                        fileList &&
                                        <>                          
                                            <div className="divider my-4"></div>
                                            <div className="d-flex jc-center ai-center">
                                                <button 
                                                    className="btn-01 d-flex jc-center ai-center" 
                                                    onClick={() => downloadAll(fileList, (inFoQuestion.FirstName + "_" + inFoQuestion.QuestionName))}
                                                >
                                                    <TbFileZip size={24} className="me-1" />
                                                    Download All
                                                </button>
                                            </div>
                                        </>
                                    }  
                                </div>                       
                            </div>
                            <div className={`score ${menuActive === 2 ? "active" : ""}`}>
                                <div className="comment-box">
                                    <textarea
                                        defaultValue={commentScore}
                                        className="autosize" 
                                        placeholder="Type comment here ..." 
                                        onChange={(e) => setCommentScore(e.target.value)} 
                                    />
                                </div>
                                <div className="score-bar">
                                    <span className={`score-point ${score === 0 ? "active" : ""}`} onClick={() => setScore(0)}>0</span>
                                    <span className={`score-point ${score === 20 ? "active" : ""}`} onClick={() => setScore(20)}>20</span>
                                    <span className={`score-point ${score === 40 ? "active" : ""}`} onClick={() => setScore(40)}>40</span>
                                    <span className={`score-point ${score === 60 ? "active" : ""}`} onClick={() => setScore(60)}>60</span>
                                    <span className={`score-point ${score === 80 ? "active" : ""}`} onClick={() => setScore(80)}>80</span>
                                    <span className={`score-point ${score === 100 ? "active" : ""}`} onClick={() => setScore(100)}>100</span>
                                </div>
                                <div className="d-flex ai-center jc-btw">
                                    <span className="color-gray2 d-flex ai-center">
                                        <TbInfoCircle size={24} className="me-1" />
                                        Rate the answers reasonably and then press submit.
                                    </span>
                                    <button onClick={handleSubmit} className="btn-01">Submit</button>
                                </div>
                            </div>
                        </div>                       
                    </div>
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

export default SubmissionWeeklyProf;