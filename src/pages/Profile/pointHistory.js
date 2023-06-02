import React, { useState, useEffect } from 'react'
import Moment from 'moment';

import { getLogPoint } from '../../service/logPoint.js'
import { getRewards } from '../../service/store.js'

import { TbGift, TbHistory, TbClock } from 'react-icons/tb';
import { FaSort } from 'react-icons/fa';

import BackgroundIcon from '../../components/background/bgIcons.js';

const TbLetterP = () => {
    return(
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
            <path d="M10 12h2a2 2 0 1 0 0 -4h-2v8"></path>
        </svg>
    )
}

function PointHistory() {

    const [isLoading, setIsLoading] = useState(true);

    const [allReward, setAllReward] = useState();

    const [allLog, setAllLog] = useState();
    const [redeemReward, setRedeemReward] = useState();

    async function loadPointLog() {
        let resLog = await getLogPoint();
        let resReward = await getRewards();        
        setAllReward(resReward)

        let rewardName = "";
        let rewardImage = "";
        let rewardLogArray = []
        for(let i=0; i < resLog.length; i++) {
            resLog[i].id = i + 1;
            if(resLog[i].Type == "Use") {
                rewardName = resLog[i].Description.split("Redeem reward: ")[1];
                resLog[i].RewardName = rewardName;
                for(let j=0; j < resReward.length; j++) {
                    if(resReward[j].RewardName === rewardName) {
                        rewardImage = resReward[j].RewardImage;
                        resLog[i].RewardImage = rewardImage;
                    }
                }
                rewardLogArray.push(resLog[i])
            }

            
        }

        setAllLog(resLog)
        setRedeemReward(rewardLogArray);
        setIsLoading(false)
    }

    useEffect( () => {
        loadPointLog();
    }, [])

    return (
        <div className="point-history-page">
            <div className="cover-container">
                {
                    isLoading &&
                    <div className="loader2">
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                }
                 {
                    !isLoading &&
                    <div className="body">
                        <div data-aos="fade-up" data-aos-duration="1000" className="redeem-reward">
                            <span className="title"><TbGift className="color-1" />Redeem reward</span>
                            {
                                redeemReward.length === 0
                                ?   <span className="d-flex jc-center ai-center py-5 color-gray2">You don't have any redeem reward.</span>
                                :   <div className="item-wrap">
                                        {redeemReward.map((reward, key) => 
                                            <div className="redeem-card" key={key}>
                                                <div className="detail-hover">
                                                    <div className="redeem-detail">
                                                        <div className="d-flex">
                                                            <span className="left"><TbLetterP />Points:</span>
                                                            <span>{reward.Point} P</span>
                                                        </div>
                                                        <div className="d-flex ai-start">
                                                            <span className="left"><TbClock />Time:</span>
                                                            <span>{Moment(reward.Date).format('MMM DD, YYYY - H:mm')}</span>
                                                        </div>
                                                    </div>
                                                    <span className="reward-name">{reward.RewardName}</span>
                                                </div>
                                                <img alt="T-Shirt" src={reward.RewardImage}/>
                                            </div>
                                        )}
                                    </div>
                            }                            
                        </div>
                        <div data-aos="fade-up" data-aos-duration="1000" className="divider my-5"></div>
                        <div data-aos="fade-up" data-aos-duration="1200" className="log-point">
                            <span className="title"><TbHistory className="color-1" />Points history</span>
                            {
                                allLog.length === 0
                                ?   <span className="d-flex jc-center ai-center py-5 color-gray2">You don't have any points history.</span>
                                :   <div className="log-table">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="number">#</th>
                                                    <th className="description">Description</th>
                                                    <th className="points">Points</th>
                                                    <th className="date">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allLog.map((log, key) => (
                                                        <tr key={key}>
                                                            <td className="number">{log.id}</td>
                                                            <td className="description thai">{log.Description}</td>
                                                            {
                                                                log.Type === "Use"
                                                                ?   <td className="points color-5 fw-600">-{log.Point} P</td>
                                                                :   <td className="points color-3 fw-600">+{log.Point} P</td>
                                                            }
                                                            <td className="date">{Moment(log.Date).format('MMM DD, YYYY - H:mm')}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>                                                      
                                    </div>
                            }                            
                        </div>
                    </div>
                }
            </div>

            {/* Background */}
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    )
}

export default PointHistory