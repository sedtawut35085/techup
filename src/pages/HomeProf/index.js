import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import BackgroundIcon from '../../components/background/bgIcons.js';
import TopicBoxProf from '../../components/box_topic/boxTopicProf.js'
import { getTopicfromProfessor } from '../../service/topic.js';

import { FiChevronRight } from 'react-icons/fi'
import { TbListDetails } from 'react-icons/tb'

function Professor() {

    const [allTopic, setAllTopic] = useState([])

    useEffect( () => {
        getTopics();
      }, []);
    
    async function getTopics() {
        let res = await getTopicfromProfessor();
        setAllTopic(res);
    }

    return (
        <div className="homepageprof">
            <div className="cover-container">
            <div className="homepageprof-main d-flex fd-col">                           
                <span className="mt-3 f-xl fw-700"><TbListDetails className="color-1 me-2" />My list</span>
                <div className="topic-section">
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
                                <Link className="f-xm fw-700 color-gray3 pt-2" to="/submit">
                                    click to see all Submissions<FiChevronRight size={20} />
                                </Link>
                              
                            </div>
                        </div>
                        <div className="homeprof-table">
                            <table className="table">
                            <thead>
                                    <tr>
                                        <th className="title">Title </th>
                                        <th className="action">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="title thai"><Link to="3">Sedtawut chalothornnarumit <br/><span className='f-xs color-gray2'>Submission Date 01/01/22 - Kernel คืออะไร - Operating System</span></Link></td>
                                        <td className="point-table">
                                            <div className="col-12 pt-2">
                                                <button type="submit" className="btn-viewdetail">View Detail</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="title thai"><Link to="3">Sedtawut chalothornnarumit <br/><span className='f-xs color-gray2'>Submission Date 01/01/22 - Kernel คืออะไร - Operating System</span></Link></td>
                                        <td className="point-table">
                                            <div className="col-12 pt-2">
                                                <button type="submit" className="btn-viewdetail">View Detail</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr> 
                                        <td className="title thai"><Link to="3">Sedtawut chalothornnarumit <br/><span className='f-xs color-gray2'>Submission Date 01/01/22 - Kernel คืออะไร - Operating System</span></Link></td>
                                        <td className="point-table">
                                            <div className="col-12 pt-2">
                                                <button type="submit" className="btn-viewdetail">View Detail</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="title thai"><Link to="3">Sedtawut chalothornnarumit <br/><span className='f-xs color-gray2'>Submission Date 01/01/22 - Kernel คืออะไร - Operating System</span></Link></td>
                                        <td className="point-table">
                                            <div className="col-12 pt-2">
                                                <button type="submit" className="btn-viewdetail">View Detail</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="title thai"><Link to="3">Sedtawut chalothornnarumit <br/><span className='f-xs color-gray2'>Submission Date 01/01/22 - Kernel คืออะไร - Operating System</span></Link></td>
                                        <td className="point-table">
                                            <div className="col-12 pt-2">
                                                <button type="submit" className="btn-viewdetail">View Detail</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>                                                     
                        </div>
                    </div>                     
            </div>
            </div>
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    );
}

export default Professor;