import React,{ useState } from 'react';

import BackgroundIcon from '../../components/background/bgIcons.js';
import {IoEyeSharp} from 'react-icons/io5';
import {BiSearch} from 'react-icons/bi';

function Ranking() {
    const [userData,setUserData] = useState([
        {
            name: "aoystwr",
            point : "9999",
            image : "https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.6435-9/73168447_2514376778651048_2509528985663176704_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG5qhR_w88_xeMdhxyxgYcgrXSV2hV34hatdJXaFXfiFk8Owv34Ecy3LZ3v5e6WdZCRJ-3Xzcm0qv3dVGxqCrZM&_nc_ohc=kuQGgUcF1NAAX96xE_Z&_nc_ht=scontent.fbkk22-2.fna&oh=00_AfDhehoyLbulh3AJ_WmRWEu080Ilyyjmv6Uc5SA19NxpBA&oe=644E84B4"
        },
        {
            name: "bwtnsri_",
            point : "8888",
            image : "https://scontent.fbkk22-2.fna.fbcdn.net/v/t39.30808-6/271383089_4340697786031986_5484066919531874000_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeE0tPin8iZeQT8NgkI2aueUL5Ps_wEuYtwvk-z_AS5i3NFwDTwykDdqT5NZnVP1dMlinLx2DnjgND84NaseHsYP&_nc_ohc=T3zMxwWvkjQAX8AkGOK&_nc_ht=scontent.fbkk22-2.fna&oh=00_AfDvCIPUZ2BMdEmRWrlMwUiEyDElhgXeWJIICm783yCuZg&oe=642C8D48"
        },
        {
            name: "a_phongrawit",
            point : "7777",
            image : "https://cdn.discordapp.com/attachments/476784936980971524/1091430605885018243/IMG_7553.JPG"
        }
    ])
    return (
        <div className="ranking">
            <div className="cover-container">
                <div className="row">
                    <p className="f-xl fw-800">Leaderboard<span className="color-1 f-xl fw-800"> TECHUP</span></p>
                </div>
                <div className="row">
                    <div className="col-4 text-center">
                        <div className="ranking-frame sh-lg">
                            <div className="ranking-image-frame">
                                <img className="ranking-image" width="100%" src={userData[0].image}></img>
                                <div className="rank-no d-flex align-items-center jc-center" id="first">
                                    <span>1st</span>
                                </div>
                            </div>
                            <p>{userData[0].name}</p>
                            <div className="ranking-point bg-color-2 text-center color-white d-flex align-items-center jc-center mx-auto">
                                <span>{userData[0].point} P</span>
                            </div>
                            <div className="divider mt-5 mb-3"></div>
                            <div className="color-gray2">
                                <IoEyeSharp></IoEyeSharp>
                                <span> See profile</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 text-center">
                        <div className="ranking-frame sh-lg">
                            <div className="ranking-image-frame">
                                <img className="ranking-image" width="100%" src={userData[1].image}></img>
                                <div className="rank-no d-flex align-items-center jc-center" id="second">
                                    <span>2nd</span>
                                </div>
                            </div>
                            <p>{userData[1].name}</p>
                            <div className="ranking-point bg-color-2 text-center color-white d-flex align-items-center jc-center mx-auto">
                                <span>{userData[1].point} P</span>
                            </div>
                            <div className="divider mt-5 mb-3"></div>
                            <div className="color-gray2">
                                <IoEyeSharp></IoEyeSharp>
                                <span> See profile</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 text-center">
                        <div className="ranking-frame sh-lg">
                            <div className="ranking-image-frame">
                                <img className="ranking-image" width="100%" src={userData[2].image}></img>
                                <div className="rank-no d-flex align-items-center jc-center" id="third">
                                    <span>3rd</span>
                                </div>
                            </div>
                            <p>{userData[2].name}</p>
                            <div className="ranking-point bg-color-2 text-center color-white d-flex align-items-center jc-center mx-auto">
                                <span>{userData[2].point} P</span>
                            </div>
                            <div className="divider mt-5 mb-3"></div>
                            <div className="color-gray2">
                                <IoEyeSharp></IoEyeSharp>
                                <span> See profile</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex jc-end">
                    <div className="ranking-search sh-md d-flex ai-center color-gray2">
                        <BiSearch size={20}></BiSearch>
                        <span> Search...</span>
                    </div>
                </div>
            </div>
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    );
}

export default Ranking;