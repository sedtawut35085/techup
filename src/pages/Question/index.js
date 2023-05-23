import React, { ChangeEvent, useState , useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery'
import { ToastContainer, toast } from 'react-toastify';
import { fileSize, fileType, download, downloadAll } from '../../assets/js/helper'
import { FaChevronLeft } from 'react-icons/fa';
import { TbCalendarTime, TbBulb, TbSwords, TbLock, TbFileZip, TbInfoCircle, TbFileDescription, TbMessage2, TbFileUpload, TbMessageCircle, TbPaperclip, TbTrash, } from 'react-icons/tb'
import { GiFlyingFlag } from 'react-icons/gi'
import { BsReplyAll, BsCheckLg } from 'react-icons/bs'
import { HiOutlineExclamation } from 'react-icons/hi'
import { IoCloseCircle, IoCaretUp, IoCaretDown } from 'react-icons/io5'
import { getQuestion, updateQuestion } from '../../service/question';
import { getCommentNew , addComment } from '../../service/discussQuestion';
import { saveSubmission } from '../../service/submission'
import { getStudent } from '../../service/student';
import BackgroundIcon from '../../components/background/bgIcons.js';
import Moment from 'moment'
import { getEachSubmissionFromUserIDandQuestionID } from '../../service/submission'
import { convertToBase64, uploadPhoto } from '../../service';
import AWS from 'aws-sdk'
import { getChallenge,addChallengeUser,deleteChallengedUser } from '../../service/challenge';
import CommentDiscussQuestion from "../../components/comment/commentDiscussQuestion"
import { addAmountChalleger ,subAmountChalleger } from '../../service/challenge';
import { getUserHintStatus } from '../../service/hint';
import { addVote , changeVote , addAmountShow , subAmountShow , addAmountNotShow ,subAmountNotShow } from '../../service/hint';



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
    const [inFoSubmit, setInFoSubmit] = useState("")
    const [inFoUser, setInFoUser] = useState("")
    const [inFoQuestion, setInFoQuestion] = useState("")

    let topicID = window.location.href.split("/")[4];
    let QuestionId = window.location.href.split("/")[6];   

    // const [isLoading, setIsLoading] = useState([1, 2, 3, 4, 5]);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [isLoading1, setIsLoading1] = useState(true)
    const [isLoading2, setIsLoading2] = useState(true)
    const [isLoading3, setIsLoading3] = useState(true)
    const [isLoading4, setIsLoading4] = useState(true)
    const [isLoading5, setIsLoading5] = useState(true)

    const [isHintShow, setIsHintShow] = useState(false)

    const [isDone, setIsDone] = useState(false);
    const [isDoneEstimate, setIsDoneEstimate] = useState(false);

    const [voteShow, setVoteShow] = useState("")
    const [countVote, setCountVote] = useState(0)
    const [voteNeed , setVoteNeed] = useState(0)
    const [voteNow , setVoteNow] = useState(0)

    const [guModal, setGuModal] = useState(false);
    const [hintModal, setHintModal] = useState(false);
    const [voteModal, setVoteModal] = useState(false);

    const [commentDiscuss, setCommentDiscuss] = useState("");
    const [commentSubmission, setCommentSubmission] = useState("");
    const [fileList, setFileList] = useState([]);
    const [fileListSubmit, setFileListSubmit] = useState([]);

    const [challenge, setChallenge] = useState(false);
    const [menuActive, setMenuActive] = useState(1);
    const [showReply, setShowReply] = useState([]);

    const [discuss, setDiscuss] = useState([]);

    const rootComments = discuss.filter( (discuss) => discuss.ParentID === null)

    function getReply(discussQuestionId) {
        return discuss.filter(discuss => discuss.ParentID === discussQuestionId).sort(
            (a,b) => new Date(a.Date).getTime() - new Date(b.Date).getTime())
    }

    async function getDiscuss() {
        let res = await getCommentNew(QuestionId);
        setDiscuss(res)
        setIsLoading(false)
    }

    async function addNewComment() {
        await addComment(QuestionId,commentDiscuss)
        let res = await getCommentNew(QuestionId);
        setDiscuss(res)
    }
    
    async function loadEachSubmissionFromUserIDandQuestionID() {
        
        let res = await getEachSubmissionFromUserIDandQuestionID(QuestionId);
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
        // setIsLoading(isLoading-1)
        // setIsLoading(isLoading.splice(isLoading.indexOf(1), 1))
    }

    async function getQuestionFromQuestionID() {
        let res = await getQuestion(QuestionId);
        setInFoQuestion(res[0])
        let questionInfo = res[0]
        let percentShow = questionInfo.AmountShow / questionInfo.AmountChallenge
        if(questionInfo.AmountChallenge >= 10 && questionInfo.AmountShow > questionInfo.AmountNotShow &&  percentShow >= 0.5){
            setIsHintShow(true)
        }
        setCountVote(questionInfo.AmountShow - questionInfo.AmountNotShow)
        let need = Math.round(questionInfo.AmountChallenge/2)
        if(need < 5)
        {
            setVoteNeed(5)
        } else {
            setVoteNeed(Math.round(questionInfo.AmountChallenge/2))
        }
        setVoteNow(questionInfo.AmountShow)
        var date = new Moment(res[0].DueDate).format('YYYY-MM-DD')
        var today = new Moment().format('YYYY-MM-DD')
        let dateconvert = new Date(date).getTime();
        let todayconvert = new Date(today).getTime();
        let weeklyid = res[0].QuestionID
        if (dateconvert < todayconvert && questionInfo.isDueDateCheck === "0") {
            const bodydata1 = {
                "updateType": "Text",
                "updateKey": "isDueDateCheck",
                "updateValue": "1"
            }
            const bodydata = {
                "updateType": "Text",
                "updateKey": "Point",
                "updateValue": Math.ceil(questionInfo.Point*0.9)
            }
            questionInfo.Point = Math.ceil(questionInfo.Point*0.9)
            let res = await updateQuestion(weeklyid, bodydata1)
            let res2 = await updateQuestion(weeklyid, bodydata)
            // let res = await updateAdminWeeklyStatus(weeklyid, bodydata)
        }
        setIsLoading2(false)
    }
    async function getInfoUser() {
        let resUser = await getStudent();
        setInFoUser(resUser[0])
        setIsLoading3(false)
        // setIsLoading(isLoading-1)
        // setIsLoading(isLoading.splice(isLoading.indexOf(3), 1))
    }
    async function getChallengedStatus() {
        const res = await getChallenge(QuestionId);
        if (res.length > 0)
        {
            setChallenge(true);
        } else {
            setChallenge(false);
        }
        setIsLoading4(false)
        // setIsLoading(isLoading-1)
        // setIsLoading(isLoading.splice(isLoading.indexOf(4), 1))
    }
    
    async function loadHintUserStatus() {
        let res = await getUserHintStatus(QuestionId);
        if(res.length > 0) {
            if(res[0].Vote === 1){
                setVoteShow("Y")
            } else {
                setVoteShow("N")
            }
        } else {
            setVoteShow("")
        }
        setIsLoading5(false);
    }

    useEffect( () => {
        loadEachSubmissionFromUserIDandQuestionID()
        getQuestionFromQuestionID();
        getChallengedStatus();
        getInfoUser()
        getDiscuss()
        loadHintUserStatus();
    }, []);   

    function addChallenge(){
        addChallengeUser(QuestionId)
        addAmountChalleger(QuestionId)
        setChallenge(true)
    }

    function deleteChallenge(){
        deleteChallengedUser(QuestionId)
        subAmountChalleger(QuestionId)
        setChallenge(false)
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
                "StatusQuestion": "normal",
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
                    navigate(`/topic/${topicID}`)  
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
                                "StatusQuestion": "normal",
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
                                    navigate(`/topic/${topicID}`)
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

    function addShow(){
        addVote(QuestionId,1)
        addAmountShow(QuestionId)
    }

    function addNotShow(){
        addVote(QuestionId,0)
        addAmountNotShow(QuestionId)
    }

    function changeShowToNotShow(){
        changeVote(QuestionId,0)
        addAmountNotShow(QuestionId)
        subAmountShow(QuestionId)
    }

    function changeNotShowToShow(){
        changeVote(QuestionId,1)
        addAmountShow(QuestionId)
        subAmountNotShow(QuestionId)
    }

    function showHint(vote) {
        let i = voteNow
        if(vote === "Y" && voteShow === ""){
            setVoteShow(vote)
            addShow()
            setCountVote(countVote + 1)
            i = i+1
            setVoteNow(voteNow + 1)
        } else if(vote === "N" && voteShow === ""){
            setVoteShow(vote)
            addNotShow()
            setCountVote(countVote - 1)
        } else if(vote === "Y" && voteShow === "N"){
            setVoteShow(vote)
            changeNotShowToShow()
            setCountVote(countVote + 2)
            i = i+1
            setVoteNow(voteNow + 1)

        } else if(vote === "N" && voteShow === "Y"){
            setVoteShow(vote)
            changeShowToNotShow()
            setCountVote(countVote - 2)
            setVoteNow(voteNow - 1)
        }
        if(i>= voteNeed) {
            setIsHintShow(true)
            setVoteModal(false)
            setHintModal(true)
        }
        // console.log("vote need : " + voteNeed)
        // console.log("vote now : " + voteNow)
        // console.log("i = " , i)
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
            {
                loading &&
                <div className="loader">
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
            }
            <div className="cover-container">
                {
                    (isLoading === true) && (isLoading1 === true) && (isLoading2 === true) && (isLoading3 === true) && (isLoading4 === true) && (isLoading5 === true) &&
                    <div className="loader2">
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                }   
                {
                    (isLoading === false) && (isLoading1 === false) && (isLoading2 === false) && (isLoading3 === false) && (isLoading4 === false) && (isLoading5 === false) &&
                    <>
                    <Link data-aos="fade-right" data-aos-duration="1000" className="btn-back" to={-1}>
                        <FaChevronLeft />
                    </Link>
                    <div data-aos="fade-left" data-aos-duration="1000" className="body">
                        <div className="top-section">
                            <div className="left-side">
                                <p className="question-name">{inFoQuestion.QuestionName}</p>
                                <p className="subject-name">
                                    <div className="icon">
                                        <img width="24px" alt="icon" src={"/assets/images/icons/" + inFoQuestion.Icon + ".png"} />
                                    </div>
                                    {inFoQuestion.TopicName} -&nbsp;
                                    <span 
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
                                    {
                                        isDone
                                        ?   <>
                                                <div className="is-done">
                                                    <BsCheckLg className="me-1" size={15} />
                                                    Done
                                                </div>
                                            </>
                                        :   <>
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
                                            </>
                                    }
                                    
                                </div>
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
                                </div>
                            </div>
                        </div>
                        <div className="problem-section">
                            <div className="menu-section">
                                <div 
                                    className={`menu des ${menuActive === 1 ? "active" : ""}`}
                                    onClick={() => setMenuActive(1)} title='Description'
                                >
                                    <TbFileDescription className="icon" />
                                    <span>Description</span>
                                </div>
                                <div 
                                    className={`menu dis ${menuActive === 2 ? "active" : ""}`}
                                    onClick={() => setMenuActive(2)} title='Discuss'
                                >
                                    <TbMessage2 className="icon" />
                                    <span>Discuss</span>
                                </div>
                                <div 
                                    className={`menu sub ${menuActive === 3 ? "active" : ""}`}
                                    onClick={() => setMenuActive(3)} title='Submission'
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
                                                    <span className="f-md fw-700">Attachment ({fileListSubmit?.length || 0})</span>
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
                                                        (fileListSubmit?.length > 1) &&
                                                        <>
                                                        <div className="divider my-4"></div>
                                                        <div className="d-flex jc-center ai-center">
                                                            <button 
                                                                className="btn-01 d-flex jc-center ai-center" 
                                                                onClick={() => downloadAll(fileListSubmit, (inFoSubmit.FirstName + "_" + inFoQuestion.QuestionName))}
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
                                                    <button 
                                                        onClick={() => uploadFile(fileList)} 
                                                        className="btn-01" 
                                                        disabled={challenge ? false : true}
                                                        data-title={challenge ? null : "You must challenge this question before submit."}
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </>
                                    }                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                }
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
                        <p>{inFoQuestion.Hint}</p>
                    </div>
                </div>
            </div>

            {/* Hint vote Modal */}
            {
                1 &&
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
                            {
                                (inFoQuestion.AmountChallenge < 10) &&
                                <span className="count-vote">need {10 - inFoQuestion.AmountChallenge} more challenger to use this feature</span>
                            }
                            {   (inFoQuestion.AmountChallenge >= 10) &&
                                <>
                                <span className="count-vote">{voteNeed - voteNow} vote left to show hint</span>
                                <div className="vote-section">
                                    <span className={`vote jc-end ${voteShow === "Y" ? "active" : ""}`} onClick={() => showHint("Y")}>Show<IoCaretUp className="ms-1" size={14} /></span>
                                    <span className="number">{countVote}</span>
                                    <span className={`vote jc-start ${voteShow === "N" ? "active" : ""}`} onClick={() => showHint("N")}><IoCaretDown className="me-1" size={14} />Not show</span>
                                </div>
                                </>
                            }
                            <span className="info"><TbInfoCircle className="me-1" size={21} />If hint showed point will decrease by 10%</span>
                        </div>
                    </div>
                </div>
            }            

            {/* Background */}
            <div className="background-container"></div>
            <BackgroundIcon 
                icon={inFoQuestion.Icon} 
                color={
                    inFoQuestion.Type === "Computer Science"
                    ? "#1B1F4B"
                    : inFoQuestion.Type === "Data Science"
                    ? "#6A244D"
                    : inFoQuestion.Type === "Digital Business"
                    ? "#194D45"
                    : "#FFA242"
                }
            />
        </div>
    )
}

export default Question;