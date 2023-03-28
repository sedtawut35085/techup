import React, { ChangeEvent, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import $ from 'jquery'

import { fileSize, fileType } from '../../assets/js/helper'
import Moment from 'moment';
import { FaChevronLeft } from 'react-icons/fa';
import { TbCalendarTime, TbBulb, TbLock, TbInfoCircle, TbFileUpload, TbMessageCircle, TbPaperclip, TbTrash } from 'react-icons/tb'
import { GiFlyingFlag } from 'react-icons/gi'
import { BsReplyAll } from 'react-icons/bs'
import { getQuestion } from '../../service/question';
import { HiOutlineExclamation } from 'react-icons/hi'
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { IoCloseCircle, IoCaretUp, IoCaretDown } from 'react-icons/io5'

import BackgroundIcon from '../../components/background/bgIcons.js';

function SubmissionProf() {
    const [inFoQuestion, setInFoQuestion] = useState("")
    const location = useLocation();
    let TopicID = window.location.href.split("/")[4];
    let QuestionId = window.location.href.split("/")[6];

    useEffect( () => {
        getQuestionFromQuestionID(); 
      }, []);

    async function getQuestionFromQuestionID() {
        let res = await getQuestion(QuestionId);
        setInFoQuestion(res[0])
    }
    // console.log(inFoQuestion)
    
    const dataProf = location.state;
    const isHintShow = false;
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

    return(
        <div className="question-page">
            <div className="cover-container">
                <Link className="btn-back" to={`/professor/${TopicID}/question/${QuestionId}`}>
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
                        </div>
                    </div>
                    <div className="problem-section">
                        <div className="menu-section">
                            <div 
                                className={`menu des ${menuActive === 1 ? "active" : ""}`}
                                onClick={() => setMenuActive(1)}
                            >
                                <TbFileUpload className="icon" />
                                <span>Description</span>
                            </div>
                            <div 
                                className={`menu sub ${menuActive === 2 ? "active" : ""}`}
                                onClick={() => setMenuActive(2)}
                            >
                                <TbFileUpload className="icon" />
                                <span>Submission</span>
                            </div>
                        </div>
                        <div className={`detail-section ${menuActive === 1 ? "description" : "submission"}`}>
                            <div className={`description ${menuActive === 1 ? "active" : ""}`}>                                
                            </div>
                            <div className={`submission ${menuActive === 2 ? "active" : ""}`}>                            
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

export default SubmissionProf;