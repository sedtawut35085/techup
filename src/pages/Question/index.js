import React, { ChangeEvent, useState , useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery'

import { fileSize, fileType } from '../../assets/js/helper'

import { FaChevronLeft } from 'react-icons/fa';
import { TbCalendarTime, TbBulb, TbSwords, TbLock, TbInfoCircle, TbFileDescription, TbMessage2, TbFileUpload, TbMessageCircle, TbPaperclip, TbTrash } from 'react-icons/tb'
import { GiFlyingFlag } from 'react-icons/gi'
import { BsReplyAll } from 'react-icons/bs'
import { HiOutlineExclamation } from 'react-icons/hi'

import { IoCloseCircle, IoCaretUp, IoCaretDown } from 'react-icons/io5'

import { getQuestion } from '../../service/question';
import { getDiscussQuestion } from '../../service/discussQuestion';
import { saveSubmission } from '../../service/submission'
import { getStudent } from '../../service/student';

import BackgroundIcon from '../../components/background/bgIcons.js';

import Moment from 'moment'

import { convertToBase64, uploadPhoto } from '../../service';
import AWS from 'aws-sdk'
import { getChallenge,addChallengeUser,deleteChallengedUser } from '../../service/challenge';


const S3_BUCKET ='techup-file-upload-storage';
const REGION ='ap-southeast-1';
const s3Subfolder = 'data-submit';

AWS.config.update({
    accessKeyId: 'AKIA6PZPD4TPJJAKDW6Q',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

function Question() {

    const navigate = useNavigate()
    const [inFoUser, setInFoUser] = useState("")
    const [inFoQuestion, setInFoQuestion] = useState("")
    // const [discuss,setDiscuss] = useState([])
    let topicID = window.location.href.split("/")[4];
    let QuestionId = window.location.href.split("/")[6];

    useEffect( () => {
        getQuestionFromQuestionID();
        getChallengedStatus();
        // getDiscuss();
        getInfoUser()
      }, []);

    async function getDiscuss() {
        let res = await getDiscussQuestion(QuestionId);
        console.log(res);
        setDiscuss(res)
    }

    async function getQuestionFromQuestionID() {
        let res = await getQuestion(QuestionId);
        setInFoQuestion(res[0])
        console.log(res[0])
    }

    async function getInfoUser() {
        let resUser = await getStudent();
        setInFoUser(resUser[0])
    }

    async function getChallengedStatus() {
        const res = await getChallenge(QuestionId);
        if (res.length > 0)
        {
            setChallenge(true);
        } else {
            setChallenge(false);
        }
    }

    function addChallenge(){
        addChallengeUser(QuestionId)
        setChallenge(true)
    }

    function deleteChallenge(){
        deleteChallengedUser(QuestionId)
        setChallenge(false)
    }

    const isHintShow = false;
    const [guModal, setGuModal] = useState(false);
    const [hintModal, setHintModal] = useState(false);
    const [voteModal, setVoteModal] = useState(false);

    const [data, setData] = useState({
        name: "Machine Learning",
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

    const handleFileChange = (e) => {
        let array = [...fileList]
        for(let i=0; i<e.target.files.length; i++){
            if(fileList.indexOf(e.target.files[i]) < 0) {
                array.push(e.target.files[i]);
            }
        }
        setFileList(array)
    };

    const uploadFile = async (file) => {
        const convertFiles = []
        console.log(file)
        file.forEach(async (files, i) => {
            let currentDate = new Date()
            currentDate = Moment(currentDate).format('YYYY-MM-DD:HH-mm-ss')
            const fileName = currentDate + "_" + files.name
            const params = {
                ACL: 'public-read',
                Body: files,
                Bucket: S3_BUCKET,
                Key: `${s3Subfolder}/${fileName}`
            };
            let name = files.name
            let size = files.size
            const convertFile = await myBucket.upload(params).promise().then((res) => {
                convertFiles.push(
                {
                    "name" : name,
                    "size" : size,
                    "Url" : res.Location
                })
                i = i+1
                if(i === file.length){
                    setTimeout(() => {
                        var body = {
                            "StudentEmail": inFoUser.UserEmail,
                            "FirstName": inFoUser.FirstName,
                            "SurName": inFoUser.SurName,
                            "DateSubmit": Moment(new Date()).format('YYYY-MM-DD'),
                            "DueDate": Moment(inFoQuestion.DueDate).format('YYYY-MM-DD'),
                            "Status":"UnChecked",
                            "FileAttachment": convertFiles,
                            "QuestionID": inFoQuestion.QuestionID,
                            "QuestionName":inFoQuestion.QuestionName,
                            "TopicID": inFoQuestion.TopicID,
                            "TopicName": inFoQuestion.TopicName,
                            "Answer": commentSubmission
                        }
                        let ressavesubmit = saveSubmission(body).then((res)=>{
                            navigate(`/topic/${topicID}`)
                        })
                        console.log(ressavesubmit)
                      }, 3000);
                }
            });
        });
    }

    // const handleUploadClick = () => {

    //     console.log('11')
    //     if (!fileList) {
    //         return;
    //     } 
    
    //     // 👇 Create new FormData object and append files
    //     const data = new FormData();
    //     files.forEach((file, i) => {
    //         data.append(`file-${i}`, file, file.name);
    //     });
        
    //     // 👇 Uploading the files using the fetch API to the server
    //     fetch('https://httpbin.org/post', {
    //         method: 'POST',
    //         body: data,
    //     })
    //     .then((res) => res.json())
    //     .then((data) => console.log(data))
    //     .catch((err) => console.error(err));
    // };

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
                <Link className="btn-back" to={`/topic/${topicID}`}>
                    <FaChevronLeft />
                </Link>
                <div className="body">
                    <div className="top-section">
                        <div className="left-side">
                            <p className="question-name">{inFoQuestion.QuestionName}</p>
                            <p className="subject-name">
                                <div className="icon">
                                    <img width="24px" alt="icon" src={"/assets/images/icons/" + inFoQuestion.Icon + ".png"} />
                                </div>
                                {inFoQuestion.TopicName} -&nbsp;<span className="color-3">{inFoQuestion.Difficulty}</span>
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
                                        if(isHintShow) {
                                            setHintModal(true);
                                        } else {
                                            setVoteModal(true);
                                        }
                                    }}
                                >
                                    <TbBulb size={22} className="me-1" />Hint
                                </button>
                                <button 
                                    className="btn-5 active" 
                                    disabled
                                    style={
                                        challenge 
                                        ? {opacity: 1, visibility: "visible", width: "unset"} 
                                        : {opacity: 0, visibility: "hidden", width: 0, padding: 0, margin: 0}
                                    }
                                >
                                    <TbSwords size={22} className="me-1" />Challenging
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
                                <button 
                                    className="btn-5" 
                                    onClick={() => addChallenge()}
                                    style={
                                        challenge 
                                        ? {opacity: 0, visibility: "hidden", width: 0, padding: 0, margin: 0}
                                        : {opacity: 1, visibility: "visible", width: "unset"} 
                                    }
                                >
                                    <TbSwords size={22} className="me-1" />Challenge
                                </button>
                            </div>
                            <div className="point">{inFoQuestion.Point} P</div>
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
                                <div className="comment-box">
                                    <textarea 
                                        className="autosize" 
                                        placeholder="Type comment here ..." 
                                        onChange={(e) => setCommentSubmission(e.target.value)} 
                                    />
                                    <div className="file-input">
                                        <input
                                            type="file"
                                            name="file-input"
                                            id="file-input"
                                            className="file-input__input"
                                            onChange={handleFileChange}
                                            multiple
                                            // maxfilesize={175}
                                        />
                                        <label className="file-input__label" htmlFor="file-input">
                                            <TbPaperclip size={24} />
                                        </label>
                                    </div>
                                </div>
                                <div className="attachment">
                                    {/* <input type="file" onChange={handleFileInput}/> */}
                                    {/* <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button> */}
                                    {/* <input id="profile-img" name="profile-img" type="file" accept="image/*" onChange={onSelectFile}/> */}
                                    <span className="f-md fw-700">Attachment ({files?.length || 0})</span>
                                    <div className="sp-vertical"></div>
                                    {files.map((file, key) => (
                                    <div className="attach-file" key={key}>
                                        <div className="d-flex jc-center ai-center">
                                            <div className="file-icon">{fileType(file.name)}</div>
                                            <div className="file-info">
                                                <span className="file-name">{file.name}</span>
                                                <span className="file-size">{fileSize(file.size)}</span>
                                            </div>
                                        </div>
                                        <div className="file-action">
                                            <button className="btn-7" onClick={() => deleteFile(file)}>
                                                <TbTrash size={18} className="me-1" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                <div className="divider my-4"></div>
                                <div className="d-flex jc-center ai-center">
                                    <button onClick={() => uploadFile(fileList)} className="btn-01">Submit</button>
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
                        <div className="accept-button" onClick={() => {setGuModal(false); deleteChallenge()}}>Yes, I want to give up.</div>
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
                icon={inFoQuestion.Icon} 
                color={
                    inFoQuestion.Type === "Computer Science"
                    ? "#1B1F4B"
                    : inFoQuestion.Type === "Data Science"
                    ? "#6A244D"
                    : "#194D45"
                }
            />
        </div>
    )
}

export default Question;