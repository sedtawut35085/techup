import React, { useEffect, useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Moment from 'moment'
import AWS from 'aws-sdk'
import { getWeeklyQuestion } from '../../service/weeklyQuestion';
import { updateAdminWeeklyStatus } from '../../service/admin'
import { getStudent } from '../../service/student';
import CommentDiscussQuestion from "../../components/comment/commentDiscussQuestion"
import { getComment,getWeeklyComment , addComment } from '../../service/discussQuestion';

import { fileSize, fileType, download, downloadAll } from '../../assets/js/helper'
import { saveSubmission } from '../../service/submission'
import { getWeeklySubmission } from '../../service/submission';

import BackgroundIcon from '../../components/background/bgIcons.js';

import { HiOutlineCalendar, HiOutlineExclamation } from 'react-icons/hi';
import { TbCalendarTime, TbBulb, TbSwords, TbLock, TbFileZip, TbInfoCircle, TbFileDescription, TbMessage2, TbFileUpload, TbMessageCircle, TbPaperclip, TbTrash, } from 'react-icons/tb'
import { IoCloseCircle, IoCaretUp, IoCaretDown } from 'react-icons/io5'
import { BsReplyAll, BsCheckLg } from 'react-icons/bs'

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

function Weekly() {
    
    // const location = useLocation();
    const [topicID , setTopicID] = useState("");
    const [QuestionID , setQuestionID] = useState("");

    const navigate = useNavigate()

    const [inFoSubmit, setInFoSubmit] = useState("")
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading1, setIsLoading1] = useState(true);
    const [isLoading3, setIsLoading3] = useState(true);
    const [isLoading4, setIsLoading4] = useState(true);
    
    

    const [inFoQuestion, setInFoQuestion] = useState("")
    const [inFoUser, setInFoUser] = useState("")
    const [isHaveWeekly, setIsHaveWeekly] = useState(false)

    const [isHintShow, setIsHintShow] = useState(false)
    const [menuActive, setMenuActive] = useState(1);
    const [hintModal, setHintModal] = useState(false);
    const [voteModal, setVoteModal] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [isDoneEstimate, setIsDoneEstimate] = useState(false);

    const [commentDiscuss, setCommentDiscuss] = useState("");
    const [discuss, setDiscuss] = useState([]);
    const rootComments = discuss.filter( (discuss) => discuss.ParentID === null)    
    const [showReply, setShowReply] = useState([]);

    function getReply(discussQuestionId) {
        return discuss.filter(discuss => discuss.ParentID === discussQuestionId).sort(
            (a,b) => new Date(a.Date).getTime() - new Date(b.Date).getTime())
    }

    async function getDiscuss() {
        let res = await getWeeklyComment();
        setDiscuss(res)
        setIsLoading(false)
    }

    async function addNewComment() {
        await addComment(inFoQuestion.QuestionID,commentDiscuss)
        let res = await getComment(inFoQuestion.QuestionID);
        setDiscuss(res)
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
    
    const [commentSubmission, setCommentSubmission] = useState("");
    const [fileList, setFileList] = useState([]);
    const [fileListSubmit, setFileListSubmit] = useState([]);

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
        setLoading(true)
        const convertFiles = []

        if(file.length === 0 && commentSubmission === "") {
            toast.error('Please enter answer!', {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            setLoading(false)
        } else if (file.length === 0) {            
            var body = {
                "StudentEmail": inFoUser.UserEmail,
                "FirstName": inFoUser.FirstName,
                "SurName": inFoUser.SurName,
                "DateSubmit": Moment(new Date()).format('YYYY-MM-DD'),
                "DueDate": Moment(inFoQuestion.DueDate).format('YYYY-MM-DD'),
                "Status":"UnChecked",
                "QuestionID": inFoQuestion.QuestionID,
                "QuestionName":inFoQuestion.QuestionName,
                "TopicID": inFoQuestion.TopicID,
                "TopicName": inFoQuestion.TopicName,
                "Answer": commentSubmission
            }
            let ressavesubmit = saveSubmission(body)
                .then((res)=>{    
                    setLoading(false)
                    toast.success('Success submission!', {
                        position: "bottom-left",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                    });  
                    navigate("/home")             
                })
                .catch((err) => {
                    toast.error('Server error, please try again', {
                        position: "bottom-left",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                    });
                    setLoading(false)
                })
        } else if(file.length !== 0){
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
                            let ressavesubmit = saveSubmission(body)
                                .then((res)=>{
                                    setLoading(false)
                                    toast.success('Success submission!', {
                                        position: "bottom-left",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        theme: "light",
                                    });     
                                    navigate("/home")
                                })
                                .catch((err) => {
                                    toast.error('Server error, please try again', {
                                        position: "bottom-left",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        theme: "light",
                                    });
                                    setLoading(false)
                                })
                          }, 3000);
                    }
                });
            });
        } else {
            toast.error('Server error, please try again', {
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
    const files = fileList ? [...fileList] : [];

    const [voteShow, setVoteShow] = useState("")
    const [countVote, setCountVote] = useState(19)

    async function getInfoUser() {
        let resUser = await getStudent();
        setInFoUser(resUser[0])
        setIsLoading3(false)
    }

    async function loadWeeklyQuestion(){
        let res = await getWeeklyQuestion()
        if(res[0] !== undefined){
            setInFoQuestion(res[0]);
            setTopicID(res[0].TopicID);
            setQuestionID(res[0].QuestionID);
            setIsHaveWeekly(true)
            setIsLoading(false);
        }else{
            setIsHaveWeekly(false)
            setIsLoading(false);
        }
        
        
        // loadEachSubmissionFromUserIDandQuestionID();
    }

    async function loadWeeklySubmission(){
        let res = await getWeeklySubmission();
        if(res[0] === undefined){
            setIsDone(false)
        }else{
            setIsDone(true)
            setInFoSubmit(res[0])
            setFileListSubmit(JSON.parse(res[0].FileAttachment))
            if(res[0].Score === null){
                setIsDoneEstimate(false)
            }else{
                setIsDoneEstimate(true)
            }
        }
        setIsLoading1(false)
    }

    useEffect(() => {
        loadWeeklyQuestion();
        loadWeeklySubmission();
        getInfoUser();
        getDiscuss();
    }, [])

    return (
        <div className="weekly-page">
             {
                loading &&
                <div className="loader">
                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
            }
            <div className="cover-container">
                {
                    isLoading && isLoading1 && isLoading3 &&
                    // isLoading3 &&
                    <div className="loader2">
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                }   
                {
                    !isLoading && !isLoading1 && !isLoading3 &&
                    // !isLoading3 &&
                    <>  
                    {isHaveWeekly === true ?              
                    <div data-aos="fade-left" data-aos-duration="1000" className="body">
                        <div className="top-section">
                            <div className="left-side">
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
                                    {
                                        isDone
                                        ?  
                                        <>
                                            { isDoneEstimate
                                            ? <span>{inFoSubmit.Score*inFoQuestion.Point/100} / {inFoQuestion.Point} P</span>
                                            :  <span>Waiting for professor to evaluate</span>
                                            }
                                        </>
                                        :   <span>{inFoQuestion.Point} P</span>
                                    }                                
                                    {/* <span>{inFoQuestion.Point} P</span> */}
                                </div>
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
                                        {inFoQuestion.QuestionDescription}
                                    </p>
                                </div>
                                <div className={`discuss ${menuActive === 2 ? "active" : ""}`}>
                                    <div className="comment-box">
                                        <textarea 
                                            className="autosize" 
                                            placeholder="Type comment here ..." 
                                            onChange={(e) => setCommentDiscuss(e.target.value)}
                                            value = {commentDiscuss} 
                                        />
                                        <button className="btn-01" onClick={() => {addNewComment();setCommentDiscuss("");}}>Comment</button>
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
                                        rootComments.map((comment, key) => (
                                            <CommentDiscussQuestion
                                                key={comment.DiscussQuestionID}
                                                comment={comment}
                                                replies={getReply(comment.DiscussQuestionID)}></CommentDiscussQuestion>
                                        ))
                                    }
                                    {/* {
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
                                    } */}
                                </div>
                                <div className={`submission ${menuActive === 3 ? "active" : ""}`}>
                                    {
                                        isDone 
                                        ?   <>
                                                <span className="fw-700 f-md">Comment from professor</span>
                                                <div className="sp-vertical"></div>
                                                <div className="comment-box-edit">
                                                    {
                                                        inFoSubmit.CommentFromProf === null
                                                        ?   <p>No comment</p>
                                                        :   <p>{inFoSubmit.CommentFromProf}</p>
                                                    }                                                
                                                </div>
                                                <div className="divider my-4"></div>
                                                <span className="fw-700 f-md">Your submission</span>
                                                <div className="sp-vertical"></div>
                                                <div className="comment-box-edit">
                                                    {
                                                        inFoSubmit.Answer === null
                                                        ?   <p>No Text Answer</p>
                                                        :   <p>{inFoSubmit.Answer}</p>
                                                    }                                                
                                                </div>
                                                <div className="attachment">
                                                    <span className="f-md fw-700">Attachment ({fileList.length})</span>
                                                    <div className="sp-vertical"></div>
                                                    {fileListSubmit?.map((file, key) => ( 
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
                                                        fileListSubmit &&
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
                                            </>
                                        :   <>
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
                                            </>
                                    }                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        <div >
                            <div className="text-center f-md thai pt-4 pb-4">
                                Now there is no question of the week, Please wait and try again later.
                            </div>
                            <div className="text-center f-md thai pt-4">
                                <Link className="btn-addquestion" to={`/home`} >Go Home </Link> 
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

export default Weekly;