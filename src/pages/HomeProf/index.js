import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Moment from 'moment';

import Auth from '../../configuration/configuration-aws'
import { getTopicfromProfessor } from '../../service/topic.js';
import { getAllSubmissionFromProfessorID } from '../../service/submission.js';

import { FiChevronRight } from 'react-icons/fi'
import { TbListDetails, TbClock } from 'react-icons/tb'

import BackgroundIcon from '../../components/background/bgIcons.js';
import TopicBoxProf from '../../components/box_topic/boxTopicProf.js'

function Professor() {
    const [isLoading, setIsLoading] = useState(true)
    const [isLoading1, setIsLoading1] = useState(true)
    const [isLoading2, setIsLoading2] = useState(true)
    const [allTopic, setAllTopic] = useState([])
    const [recentSubmission, setRecentSubmission] = useState([])
    const navigate = useNavigate()

    async function checkAuthen() {
        await Auth.currentAuthenticatedUser()
        .then(async(response) => {
            if(response.attributes.email.includes('@mail.kmutt.ac.th')){
                navigate('/home');
            }
        })
        .catch(() => {
            navigate('/');
        })
        setIsLoading2(false)
    }
    useEffect( () => {
        checkAuthen()
        getTopics();
        loadAllSubmissionFromProfessorID()
      }, []);
    
    async function getTopics() {
        let res = await getTopicfromProfessor();
        setAllTopic(res);
        setIsLoading(false)
    }

    async function loadAllSubmissionFromProfessorID() {
        let res = await getAllSubmissionFromProfessorID(0, 5);
        setRecentSubmission(res);
        setIsLoading1(false)
    }

    return (
        <div className="homepage-prof">
            <div className="cover-container">
            {
                (isLoading || isLoading1 || isLoading2) && 
                <div className="loader2">
                    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                </div>
            }
            { 
                !(isLoading || isLoading1 || isLoading2) && 
                <div className="homepage-prof-main d-flex fd-col" data-aos="fade-up" data-aos-duration="1000">                           
                    <span className="f-xl fw-700"><TbListDetails className="color-1 me-2" />My list</span>
                    <div className="box-zone">
                        {allTopic.map((topic, key) => (
                            <TopicBoxProf
                                key={key}
                                data={topic}
                                />
                        ))}
                        <Link className="topic-box col-3" to="/add-topic">
                            <div 
                                className="body" 
                                style={
                                    {backgroundColor: "#FFF"}
                                }
                            >
                                <div className="title">
                                    <span className="f-lg color-black text-center pt-4">+ Add Topic</span>
                                </div>
                                <div className="bg-icon">
                                    <li>
                                        <img alt="icon" width="65px" src={"/assets/images/logo/logo(white).png"} />
                                    </li>   
                                    <li>
                                        <img alt="icon" width="25px" src={"/assets/images/logo/logo(white).png"} />
                                    </li>                                  
                                    <li>
                                        <img alt="icon" width="35px" src={"/assets/images/logo/logo(white).png"} />
                                    </li>
                                    <li>
                                        <img alt="icon" width="100px" src={"/assets/images/logo/logo(white).png"} />
                                    </li>
                                </div>
                            </div>
                        </Link>
                    </div>    
                    <div className="my-5 divider"></div>
                    <div className="home-prof-section">
                        <div className="top-home-prof-section">
                            <span className="f-xl fw-700"><TbClock className="color-1 me-2" />Recent Submissions</span>
                            <Link className="f-md" to="/submit">See all Submissions<FiChevronRight size={20} /></Link>
                        </div>
                        {recentSubmission.length !== 0
                            ?   <div className="submission-list-wrap">
                                {
                                    recentSubmission.map((submission, key) => (
                                        <div className="submission-list" key={key}>
                                            <div className="left">
                                                <span className="student-name">{submission.FirstName} {submission.SurName}</span>
                                                <span className="detail">
                                                    <span className="submission-date"><span>Submission Date</span> {Moment(submission.DateSubmit).format("DD/MM/YYYY")} - </span>
                                                    <span className="topic-name">{submission.ShortName.toUpperCase()} - </span>
                                                    <span className="question-title thai">{submission.QuestionName_Submissions}</span>
                                                </span>
                                            </div>
                                            <Link className="btn-view-detail" to={`/professor/${submission.TopicID}/question/${submission.QuestionID_Submissions}/submission/${submission.SubmissionID}`}>View Detail</Link>
                                        </div>
                                    ))
                                }
                                </div>
                            :   <span className='f-md color-gray2 d-flex jc-center ai-center py-5'>- No submission from students -</span>
                        }
                    </div>                     
                </div>
            }
                <div className="background-container"></div>
                <BackgroundIcon />
            </div>
        </div>
    );
}

export default Professor;