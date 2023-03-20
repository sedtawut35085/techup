import React, { useState, useEffect } from 'react';

import { TbSwords, TbListDetails } from 'react-icons/tb'
import { Link } from 'react-router-dom';
import BackgroundIcon from '../../components/background/bgIcons.js';
import TopicBox from '../../components/box_topic/boxTopic.js'
import { getTopicfromProfessor } from '../../service/topic.js';

function Professor() {

    const [allTopic, setAllTopic] = useState([])

    useEffect( () => {
        getTopics();
      }, []);
    
    async function getTopics() {
        let res = await getTopicfromProfessor();
        console.log('res',res)
        setAllTopic(res);
    }

    return (
        <div className="homepage">
            <div className="cover-container">
            <div className="homepage-main d-flex fd-col">                           
                <span className="mt-3 f-xl fw-700"><TbListDetails className="color-1 me-2" />My list</span>
                <div className="topic-section">
                    {allTopic.map((topic, key) => (
                        <TopicBox
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
            </div>
            </div>
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    );
}

export default Professor;