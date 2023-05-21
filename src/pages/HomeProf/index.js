import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import BackgroundIcon from '../../components/background/bgIcons.js';
import TopicBoxProf from '../../components/box_topic/boxTopicProf.js'
import { getTopicfromProfessor } from '../../service/topic.js';
import Auth from '../../configuration/configuration-aws'
import { FiChevronRight } from 'react-icons/fi'
import { TbListDetails } from 'react-icons/tb'
import { getAllSubmissionFromProfessorID } from '../../service/submission.js';

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
        let res = await getAllSubmissionFromProfessorID(0,5);
        setRecentSubmission(res);
        setIsLoading1(false)
    }

    return (
        <div className="homepageprof">
            {
            (isLoading === true) && (isLoading1 === true) && (isLoading2 === true) && 
            <div className="loader2">
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
            </div>
            }
            { (isLoading === false) && (isLoading1 === false) && (isLoading2 === false) && 
            <div className="cover-container">
            <div className="homepageprof-main d-flex fd-col">                           
                <span className="mt-3 f-xl fw-700"><TbListDetails className="color-1 me-2" />My list</span>
                <div className="box-zone">
                    {allTopic.map((topic, key) => (
                        <TopicBoxProf
                            key={key}
                            data={topic}
                            />
                    ))}
                    <Link className="topic-box col-3" to="/addtopic">
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
                <div className="mt-3 mb-5 divider"></div>
                <div className="homeprof-section">
                        <div className="top-homeprof-section mb-4">
                            <div className='d-flex jc-btw'>
                                <span className="f-lg fw-700">Recent Submissions</span>
                                {/* <Link className="f-xm fw-700 color-gray3 pt-2" to="/submit">
                                    click to see all Submissions<FiChevronRight size={20} />
                                </Link> */}
                            </div>
                        </div>
                        {recentSubmission.length !== 0
                        ?
                        <>
                            <div className="homeprof-table"> 
                                <table className="table">
                                <thead>
                                        <tr>
                                            <th className="title">Title </th>
                                            <th className="action">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {recentSubmission.map((recentsubmission, i) => 
                                        <tr key={i}>
                                            <td className="title thai"><Link to={`/professor/${recentsubmission.TopicID}/question/${recentsubmission.QuestionID_Submissions}/submission/${recentsubmission.SubmissionID}`}>{recentsubmission.FirstName + " " + recentsubmission.SurName}<br/><span className='f-xs color-gray2'>{"Submission Date - " + recentsubmission.DateSubmit + " - " + recentsubmission.TopicName + " - " + recentsubmission.QuestionName_Submissions}</span></Link></td>
                                            <td className="point-table">
                                                <div className="col-8 pt-2">
                                                    <Link className="btn-view-detail" to={`/professor/${recentsubmission.TopicID}/question/${recentsubmission.QuestionID_Submissions}/submission/${recentsubmission.SubmissionID}`}>View Detail</Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>                                                     
                            </div>
                        </>
                        :
                        <>
                            <span className='color-gray2'>No submission from students</span>
                        </>
                    }
                </div>                     
            </div>
            </div>
            }
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    );
}

export default Professor;