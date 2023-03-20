import React, { useEffect, useState } from 'react';

import { TbSwords, TbListDetails } from 'react-icons/tb'

import BackgroundIcon from '../../components/background/bgIcons.js';
import TopicBox from '../../components/box_topic/boxTopic.js'
import QuestionBox from '../../components/box_question/boxQuestion.js'
import { getAllTopic , getList } from '../../service/topic.js';

function Homepage() {

    async function loadAllTopic() {
        const res = await getAllTopic();
        setAllTopic(res);
    }
    async function loadmyList() {
        const res = await getList();
        setMyList(res);
    }
    const noneTopic = false;
    // const [allTopic, setAllTopic] = useState([
    //     {name: "Operating System", type: "Computer Science", owner: "Chukiat Worasucheep", icon: "idea"},
    //     {name: "Software Engineer", type: "Computer Science", owner: "Wittawin Susutti", icon: "rocket"},
    //     {name: "Finance", type: "Digital Business", owner: "Chukiat Worasucheep", icon: "piggy-bank"},
    //     {name: "Data Science", type: "Data Science", owner: "Chukiat Worasucheep", icon: "connections"}
    // ])

    const [allTopic, setAllTopic] = useState([])
    const [myList, setMyList] = useState([])
    useEffect(() => {
        loadAllTopic();
        loadmyList();
    }, []);

    const [challenging, setChallenging] = useState([
        {name: "Kernel คืออะไร", date: "26-02-2023", point: "100", difficulty: "easy", topic: "Operating System", type: "Computer Science", icon: "idea"}
    ])

    return (
        <div className="homepage">
            <div className="cover-container">
                {
                    noneTopic
                    ?   <div className="none-topic">
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
                            <span className="f-xl fw-700"><TbSwords className="color-1 me-2" />Challenging</span>
                            <div className="topic-section">
                                {challenging.map((question, key) => (
                                    <QuestionBox
                                        key={key}
                                        data={question}
                                     />
                                ))}
                            </div>         
                            <span className="mt-3 f-xl fw-700"><TbListDetails className="color-1 me-2" />My list</span>
                            <div className="topic-section">
                                {myList.map((topic, key) => (
                                    <TopicBox
                                        key={key}
                                        data={topic}
                                     />
                                ))}
                            </div>    
                            <div className="mt-3 mb-5 divider"></div>             
                            <p className="f-xl fw-700">
                                <img className="me-2" alt="logo" width="36px" src="/assets/images/logo/logo.png" />
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
                }
            </div>
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    );
}

export default Homepage;