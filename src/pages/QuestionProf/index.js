import React, { ChangeEvent, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import $ from 'jquery'

import { fileSize, fileType } from '../../assets/js/helper'
import Moment from 'moment';
import { FaChevronLeft } from 'react-icons/fa';
import { TbCalendarTime, TbBulb, TbSwords, TbLock, TbInfoCircle, TbFileDescription, TbMessage2, TbFileUpload, TbMessageCircle, TbPaperclip, TbTrash } from 'react-icons/tb'
import { GiFlyingFlag } from 'react-icons/gi'
import { BsReplyAll } from 'react-icons/bs'
import { getQuestion } from '../../service/question';
import { HiOutlineExclamation } from 'react-icons/hi'
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { IoCloseCircle, IoCaretUp, IoCaretDown } from 'react-icons/io5'

import BackgroundIcon from '../../components/background/bgIcons.js';

function QuestionProf() {
    const [inFoQuestion, setInFoQuestion] = useState("")
    const location = useLocation();
    let ShortName = window.location.href.split("/")[4];
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

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        let array = [...fileList]
        for(let i=0; i<e.target.files.length; i++){
            if(fileList.indexOf(e.target.files[i]) < 0) {
                array.push(e.target.files[i]);
            }
        }
        console.log(e.target.files)
        console.log(array)
    };

    const handleUploadClick = () => {
        if (!fileList) {
            return;
        }
    
        // 👇 Create new FormData object and append files
        const data = new FormData();
        files.forEach((file, i) => {
            data.append(`file-${i}`, file, file.name);
        });
    
        // 👇 Uploading the files using the fetch API to the server
        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: data,
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    };

    const files = fileList ? [...fileList] : [];

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
                <Link className="btn-back" to={`/professor/${ShortName}`} state={dataProf}>
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
                                <button 
                                    className="btn-6" 
                                    onClick={() => setGuModal(true)}
                                    style={
                                        challenge 
                                        ? {opacity: 1, visibility: "visible", width: "unset"} 
                                        : {opacity: 0, visibility: "hidden", width: 0, padding: 0, margin: 0}
                                    }
                                >
                                    <GiFlyingFlag size={22} />
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
                            <div className="submit-table">
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
                                </div>
                                <div className="pagination1">
                            <div className="display-per-page">
                                <span>Display per page</span>
                                <select className="page">
                                    <option default>5</option>
                                    <option>10</option>
                                    <option>25</option>
                                </select>
                            </div>
                            <div className="pagination-number">
                                <span className="arrow disable"><FiChevronsLeft /></span>
                                <span className="arrow disable"><FiChevronLeft /></span>
                                <span className="number active">1</span>
                                <span className="number">2</span>
                                <span className="number">3</span>
                                <span className="number">4</span>
                                <span className="number">5</span>
                                <span className="arrow"><FiChevronRight /></span>
                                <span className="arrow"><FiChevronsRight /></span>
                            </div>
                        </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>

            {/* Give up Modal */}
            <div className="tu-modal" style={guModal ? {opacity: "1", visibility: "visible"} : {}}>
                <div className="tu-modal-card">
                    <IoCloseCircle className="close-button" onClick={() => setGuModal(false)} />
                    <div className="tu-modal-head">
                        <GiFlyingFlag className="icon" />
                        <span>
                            Are you sure you want to give up ?
                        </span>
                    </div>
                    <div className="tu-modal-body">
                        <p>If you give up this question, submission that you have submitted before will disappear. And you’ll not earn points that you should have received.</p>
                    </div>
                    <div className="tu-modal-footer">
                        <div className="cancel-button" onClick={() => setGuModal(false)}>No, keep me challenging.</div>
                        <div className="accept-button" onClick={() => {setGuModal(false); setChallenge(false)}}>Yes, I want to give up.</div>
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

export default QuestionProf;