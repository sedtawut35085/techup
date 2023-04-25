import React, { useEffect, useState } from 'react';

import { TbSwords, TbListDetails } from 'react-icons/tb'

import BackgroundIcon from '../../components/background/bgIcons.js';
import TopicBox from '../../components/box_topic/boxTopic.js'
import QuestionBox from '../../components/box_question/boxQuestion.js'
import { getAllTopic , getList } from '../../service/topic.js';
import { getChallengeList } from '../../service/challenge.js';

function Homepage() {   

    const [isLoading, setIsLoading] = useState([1, 2, 3])
    const [challengeList ,setChallengeList] = useState([])
    const [allTopic, setAllTopic] = useState([])
    const [myList, setMyList] = useState([])

    async function loadChallengeList() {
        const res = await getChallengeList();
        setChallengeList(res); 
        setIsLoading(isLoading.splice(isLoading.indexOf(1), 1))
    }
    async function loadAllTopic() {
        const res = await getAllTopic();
        setAllTopic(res);
        setIsLoading(isLoading.splice(isLoading.indexOf(2), 1))
    }
    async function loadMyList() {
        const res = await getList();
        setMyList(res);
        setIsLoading(isLoading.splice(isLoading.indexOf(3), 1))
    }

    useEffect(() => {
        loadChallengeList();
        loadAllTopic();
        loadMyList();        
    }, []);

    return (
        <div className="homepage">
            <div className="cover-container">
                {
                    (isLoading.length > 0) &&
                    <div className="loader2">
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                }
                {
                    isLoading.length > 0
                    ?   null
                    :   (challengeList?.length === 0 && myList.length === 0)
                    ?   <div data-aos="fade-up" data-aos-duration="1000" className="none-topic">
                            <p className="f-xl fw-700 text-center">
                                <img className="me-2" alt="logo" width="38px" src="/assets/images/logo/logo.png" />
                                All Topic in <span className="color-1">TECHUP</span>
                            </p>
                            <div className="topic-section">
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
                               challengeList?.length !== 0 &&
                                <div data-aos="fade-up" data-aos-duration="1000">
                                    <span className="f-xl fw-700"><TbSwords className="color-1 me-2" />Challenging</span>
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
                                    <span className="mt-3 f-xl fw-700"><TbListDetails className="color-1 me-2" />My list</span>
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
                                <p className="f-xl fw-700">
                                    <img className="me-2" alt="logo" width="36px" src="/assets/images/logo/logo.png" />
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
                        </div>
                }
            </div>
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    );
}

export default Homepage;