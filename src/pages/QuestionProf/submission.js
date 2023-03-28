import React, { ChangeEvent, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import $ from 'jquery'

import { fileSize, fileType, download, downloadAll } from '../../assets/js/helper'
import Moment from 'moment';
import { FaChevronLeft } from 'react-icons/fa';
import { TbCalendarTime, TbBulb, TbLock, TbInfoCircle, TbFileUpload, TbFileZip, } from 'react-icons/tb'
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
    const [fileList, setFileList] = useState([
        {
            id: "1",
            src: "/assets/images/icons/logo.png",
            name: "Test 1.png",
            size: 19999
        },
        {
            id: "2",
            src: "/assets/images/icons/logo.png",
            name: "Test 2.png",
            size: 19999
        }
    ]);

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
                            <div>
                                <span className="f-smd color-gray2">
                                    Name: <span className="color-black">Sedtawut chalothornnarumit</span>
                                </span>
                            </div>
                            <div className="mt-3">
                                <span className="f-smd color-gray2">
                                    Submission time: <span className="color-black">01/12/2022, 00:00:00</span>
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
                                        เคอร์เนล (Kernel) คือโปรแกรมพื้นฐานภายใต้ระบบปฏิบัติการคอมพิวเตอร์ (OS) 
                                        ที่คอยทำหน้าที่เป็นสื่อกลางระหว่างฮาร์ดแวร์ กับ ซอฟต์แวร์และช่วยจัดการทรัพยากรในคอมพิวเตอร์ต่าง ๆ เช่น 
                                        การใช้พื้นที่ หน่วยความจำ (RAM) , การใช้ หน่วยประมวลผลกลาง (CPU) การจัดการไฟล์ และ ระบบอื่น ๆ 
                                        ส่วนใหญ่ เป็นต้น (เว้นแต่ GPU อยู่นอกเหนือหน้าที่ของเคอร์เนล) นอกจากนี้ยังมีหน้าที่เป็นตัวควบคุมอุปกรณ์ 
                                        Input / Output และอุปกรณ์ต่อพ่วงอื่น ๆ อย่าง เมาส์ (Mouse), จอมอนิเตอร์ (Monitor), แป้นพิมพ์ 
                                        (Keyboard) ฯลฯ ที่เชื่อมต่อระบบผ่านไดร์เวอร์ อีกด้วย
                                    </p>
                                </div>      
                                <div className="attachment">
                                    <span className="f-md fw-700">Attachment (0)</span>
                                    <div className="sp-vertical"></div>
                                    {fileList.map((file, key) => (
                                        <div className="attach-file" key={key}>
                                            <div className="d-flex jc-center ai-center">
                                                <div className="file-icon">{fileType(file.name)}</div>
                                                <div className="file-info">
                                                    <a 
                                                        className="file-name"
                                                        href={file.src}
                                                        download={file.name}
                                                    >
                                                        {file.name}
                                                    </a>
                                                    <span className="file-size">{fileSize(file.size)}</span>
                                                </div>
                                            </div>
                                            <div className="file-action">
                                                <button className="btn-download" onClick={() => download(file.src, file.name)}>
                                                    Download
                                                </button>
                                            </div>
                                        </div>
                                    ))}                                    
                                    <div className="divider my-4"></div>
                                    <div className="d-flex jc-center ai-center">
                                        <button 
                                            className="btn-01 d-flex jc-center ai-center" 
                                            onClick={() => downloadAll(fileList, ("Sedtawut_" + inFoQuestion.QuestionName))}
                                        >
                                            <TbFileZip size={24} className="me-1" />
                                            Download All
                                        </button>
                                    </div>
                                </div>                       
                            </div>
                            <div className={`score ${menuActive === 2 ? "active" : ""}`}>
                                <div className="comment-box">
                                    <textarea 
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
                                    <button className="btn-01">Submit</button>
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

export default SubmissionProf;