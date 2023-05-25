import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment'

import { updateAdminWeeklyStatus } from '../../service/admin'
import { getAllTopic , getList } from '../../service/topic.js';
import { getChallengeList } from '../../service/challenge.js';
import { getEachSubmissionFromUserIDandQuestionID } from '../../service/submission'
import { getWeeklyQuestion } from '../../service/weeklyQuestion';

import { TbSwords, TbListDetails, TbListCheck } from 'react-icons/tb'

import TopicBox from '../../components/box_topic/boxTopic.js'
import QuestionBox from '../../components/box_question/boxQuestion.js'
import BackgroundIcon from '../../components/background/bgIcons.js';

function Homepage() {   

    const [isLoading, setIsLoading] = useState(true)
    const [isLoading1, setIsLoading1] = useState(true)
    const [isLoading2, setIsLoading2] = useState(true)
    const [isLoading3, setIsLoading3] = useState(true)
    const [challengeList, setChallengeList] = useState([])
    const [doneList, setDoneList] = useState([])
    const [allTopic, setAllTopic] = useState([])
    const [myList, setMyList] = useState([])

    async function loadWeeklyQuestion(){
        let res = await getWeeklyQuestion();
        if(res[0] !== undefined){
            var date = new Moment(res[0].DueDate).format('YYYY-MM-DD')
            var today = new Moment().format('YYYY-MM-DD')
            let dateconvert = new Date(date).getTime();
            let todayconvert = new Date(today).getTime();
            let weeklyid = res[0].QuestionID
            if (dateconvert < todayconvert) {
                const bodydata = {
                    "updateType": "Text",
                    "updateKey": "Status",
                    "updateValue": "normal"
                }
                let res = await updateAdminWeeklyStatus(weeklyid, bodydata)
            }
        }
        setIsLoading3(false);
        // loadEachSubmissionFromUserIDandQuestionID();
    }

    async function loadChallengeList() {
        const res = await getChallengeList();

        let ListOfChallenge = [];
        let ListOfDone = [];

        for (let question of res) {
            let resSubmission = await getEachSubmissionFromUserIDandQuestionID(question.QuestionID);
            if (resSubmission[0]) {
                if(resSubmission[0].Score) {
                    question.IsChecked = true
                } else {
                    question.IsChecked = false
                }
                ListOfDone.push(question);
            } else {
                ListOfChallenge.push(question)
            }
        }
        
        setDoneList(ListOfDone)
        setChallengeList(ListOfChallenge); 
        setIsLoading(false)
    }
    async function loadAllTopic() {
        const res = await getAllTopic();
        setAllTopic(res);
        setIsLoading1(false)
        // setIsLoading(isLoading.splice(isLoading.indexOf(2), 1))
    }
    async function loadMyList() {
        const res = await getList();
        setMyList(res);
        setIsLoading2(false)
        // setIsLoading(isLoading.splice(isLoading.indexOf(3), 1))
    }

    useEffect(() => {
        loadWeeklyQuestion();
        loadChallengeList();
        loadAllTopic();
        loadMyList();        
    }, []);

    return (
        <div className="homepage">
            <div className="cover-container">
                {
                    (isLoading || isLoading1 || isLoading2 || isLoading3) &&
                    <div className="loader2">
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                }
                {
                    isLoading || isLoading1 || isLoading2 || isLoading3
                    ?   null
                    :   (challengeList?.length === 0 && myList.length === 0)
                    ?   <div data-aos="fade-up" data-aos-duration="1000" className="none-topic">
                            <p className="f-xl fw-700 text-center">
                                <img className="me-2" alt="logo" width="38px" src="/assets/images/logo/logo.png" />
                                All Topic in <span className="color-1">TECHUP</span>
                            </p>
                            <div className="box-zone">
                                {allTopic.map((topic, key) => (
                                    <TopicBox
                                        key={key}
                                        data={topic}
                                     />
                                ))}
                            </div>
                        </div>
                    :   <div className="homepage-main d-flex fd-col">
                            {
                                doneList?.length !== 0 &&
                                <div data-aos="fade-up" data-aos-duration="1000">
                                    <span className="f-xl fw-700 title-menu"><TbListCheck className="color-1 me-2" />Submissions</span>
                                    <div className="done-question-table">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="number">#</th>
                                                    <th className="topic">Topic</th>
                                                    <th className="question">Question title</th>
                                                    <th className="status">Status</th>
                                                    <th className="action">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    doneList.map((question, key) => (
                                                        <tr key={key}>
                                                            <td className="number">{key + 1}</td>
                                                            <td className="topic">{question.TopicName}</td>
                                                            <td className="question thai" title={question.QuestionName}>{question.QuestionName}</td>
                                                            <td className="status">
                                                                {question.IsChecked 
                                                                    ? <span className="color-3">Checked</span> 
                                                                    : <span className="color-1">Waiting</span>
                                                                }
                                                            </td>
                                                            <td className="action"><Link className="btn-view-detail" to={`/topic/${question.TopicID}/question/${question.QuestionID}`}>View question</Link></td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }
                            {
                                challengeList?.length !== 0 &&
                                <div data-aos="fade-up" data-aos-duration="1000">
                                    <span className="f-xl fw-700 title-menu"><TbSwords className="color-1 me-2" />Challenging</span>
                                    <div className="box-zone">
                                        {challengeList.map((question, key) => (
                                            <QuestionBox
                                                key={key}
                                                data={question}
                                            />
                                        ))}
                                    </div>
                                </div>
                            }                            
                            {
                                myList?.length !== 0 &&
                                <div data-aos="fade-up" data-aos-duration="1000">
                                    <span className="mt-3 f-xl fw-700 title-menu"><TbListDetails className="color-1 me-2" />My list</span>
                                    <div className="box-zone">
                                        {myList.map((topic, key) => (
                                            <TopicBox
                                                key={key}
                                                data={topic}
                                            />
                                        ))}
                                    </div>  
                                </div>
                            }
                            <div data-aos="fade-up" data-aos-duration="1000">
                                <div className="mt-3 mb-5 divider"></div>             
                                <p className="f-xl fw-700 title-menu">
                                    <img className="me-2" alt="logo" width="36px" src="/assets/images/logo/logo.png" />
                                    All Topic in <span className="color-1" >TECHUP</span>
                                </p>
                                <div className="box-zone">
                                    {allTopic.map((topic, key) => (
                                        <TopicBox
                                            key={key}
                                            data={topic}
                                        />
                                    ))}
                                </div>   
                            </div>                                    
                        </div>
                }
            </div>
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    );
}

export default Homepage;