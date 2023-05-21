import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Moment from 'moment'
import { getWeeklyQuestion } from '../../service/weeklyQuestion';
import { getAllSubmissionOnWeekly } from '../../service/submission';
import { getStudent } from '../../service/student';

import { FaSort } from 'react-icons/fa';

import BackgroundIcon from '../../components/background/bgIcons.js';

import { HiOutlineCalendar, HiOutlineExclamation } from 'react-icons/hi';
import { TbCalendarTime, TbFileDescription, TbMessage2, TbFileUpload, TbMessageCircle } from 'react-icons/tb'
import { IoCaretUp, IoCaretDown } from 'react-icons/io5'
import { BsReplyAll } from 'react-icons/bs'

function Weeklyprof() {
    
    // const location = useLocation();
    const [topicID , setTopicID] = useState("");
    const [QuestionID , setQuestionID] = useState("");

    const navigate = useNavigate()

    const [isHaveWeekly, setIsHaveWeekly] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading1, setIsLoading1] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [allSubmission,setAllSubmission] = useState([]);

    const [inFoQuestion, setInFoQuestion] = useState("")
    const [inFoUser, setInFoUser] = useState("")

    const [menuActive, setMenuActive] = useState(1);
    const [isDone, setIsDone] = useState(false);

    const [commentDiscuss, setCommentDiscuss] = useState("");
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
    ]);    
    const [showReply, setShowReply] = useState([]);
    
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
        // setIsLoading(isLoading-1)
        // setIsLoading(isLoading.splice(isLoading.indexOf(3), 1))
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
    console.log(inFoQuestion)
    console.log(isHaveWeekly)

    async function loadWeeklySubmission(){
        let res = await getAllSubmissionOnWeekly();
        if(res[0] === undefined){
            setIsDone(false)
        }else{ 
            setIsDone(true)
            setAllSubmission(res)
        }
        setIsLoading1(false)
    }

    useEffect(() => {
        loadWeeklyQuestion();
        loadWeeklySubmission();
        getInfoUser();
    }, [])

    return (
        <div className="weekly-page">
            <div className="cover-container">
                {
                    isLoading && isLoading1 && isLoading2 && 
                    // isLoading3 &&
                    <div className="loader2">
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                }   
                {
                    !isLoading && !isLoading1 && !isLoading2 && 
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
                                    <span>{inFoQuestion.Point} P</span>
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
                                <Link className="btn-addquestion" to={`/professor/weekly/addweekly`} >Add Weekly + </Link> 
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