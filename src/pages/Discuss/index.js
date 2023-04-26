import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';

import { BsFillTriangleFill } from 'react-icons/bs';
import { IoCaretUp } from 'react-icons/io5'
import { ImFire } from 'react-icons/im';
import { IoEyeSharp } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { FaEdit } from 'react-icons/fa';

import { getEachDiscuss , getDiscussInTrend ,getDiscussNewest ,getDiscussMostVote } from '../../service/discuss.js';

import BackgroundIcon from '../../components/background/bgIcons.js';

function Discuss() {
    const [filter , setFilter] = useState("inTrend")
    const [isLoading, setIsLoading] = useState(true)

    async function loadInTrendDiscuss() {
        const res = await getDiscussInTrend();
        setDiscusses(res);
        console.log('All discuss :', res)
        setIsLoading(false)
    }

    function filterNewest() {
        setFilter("newest");
    }

    function filterMostVote() {
        setFilter("mostVote");
    }

    function filterInTrend() {
        setFilter("inTrend");
    }

    useEffect(() => {
        loadInTrendDiscuss();
    }, []);


    const [discusses , setDiscusses] = useState([
        // {
        //     discussTopic : "1",
        //     tag : ["interview"],
        //     image : "https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.6435-9/73168447_2514376778651048_2509528985663176704_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG5qhR_w88_xeMdhxyxgYcgrXSV2hV34hatdJXaFXfiFk8Owv34Ecy3LZ3v5e6WdZCRJ-3Xzcm0qv3dVGxqCrZM&_nc_ohc=kuQGgUcF1NAAX96xE_Z&_nc_ht=scontent.fbkk22-2.fna&oh=00_AfDhehoyLbulh3AJ_WmRWEu080Ilyyjmv6Uc5SA19NxpBA&oe=644E84B4",
        //     author : "sedtawut",
        //     date : "12-12-2020",
        //     like : "125",
        //     view : "1300"
        // },
        // {
        //     discussTopic : "2",
        //     tag : ["coding","techup"],
        //     image : "https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.6435-9/73168447_2514376778651048_2509528985663176704_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG5qhR_w88_xeMdhxyxgYcgrXSV2hV34hatdJXaFXfiFk8Owv34Ecy3LZ3v5e6WdZCRJ-3Xzcm0qv3dVGxqCrZM&_nc_ohc=kuQGgUcF1NAAX96xE_Z&_nc_ht=scontent.fbkk22-2.fna&oh=00_AfDhehoyLbulh3AJ_WmRWEu080Ilyyjmv6Uc5SA19NxpBA&oe=644E84B4",
        //     author : "sedtawut",
        //     date : "20-12-2020",
        //     like : "80",
        //     view : "890"
        // },
    ])
    const AllDiscuss = discusses.map((discuss) => 
        <Link className="discuss-topic sh-sm" to={`/discuss/${discuss.DiscussID}`}>
            <div className="row d-flex ai-center">
                <div className="col-2 d-flex jc-center ai-center">
                    <img className="discuss-author-image" src={discuss.UserImage}></img>
                </div>
                <div className="col-7 ai-center">
                    <span className="discuss-topic-name">{discuss.Title}</span>
                    <div className='row discuss-tag-frame'>
                        {JSON.parse(discuss.Tags).map((eachTag) => 
                            <div className="discuss-tag">
                                <span>#{eachTag}</span>
                            </div>
                        )}
                    </div>
                    <span className="discuss-topic-date">{discuss.author} created at {Moment(discuss.Date).format('DD-MM-YYYY')}</span>
                </div>
                <div className="col-3 d-flex jc-center ai-center">
                    <div className='row'>
                        <div>
                            <span className="discuss-like"><IoCaretUp/> {discuss.AmountLike}</span>
                            <span className="discuss-view"><IoEyeSharp/> {discuss.View}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="discuss-author-image-frame">
                <img className="discuss-author-image" src={discuss.image}></img>
            </div> */}
        </Link>
        // <div className="col-4 text-center justify-content-center">
        //     <div className="reward-frame sh-lg">
        //         <img className="reward-image" width="100%" src={reward.image}></img>
        //         <div className="row-reward ai-center d-flex justify-content-between align-items-center">
        //             <span>{reward.name}</span>
        //             <div className="point">{reward.point} P</div>
        //         </div>
        //     </div>
        // </div>
    )

    return (
        <div className="discuss">
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
                    <div className="row">
                    <div className="col-9">
                        <div className="row d-flex jc-btw ai-center">
                            <div className="col d-flex jc-start ai-center">
                                <div className={filter === "inTrend" ? "discuss-top-active" : "discuss-top"} onClick={() => filterInTrend()}>
                                    <span><ImFire/> In trend</span>
                                </div>
                                <div className={filter === "newest" ? "discuss-top-active" : "discuss-top"} onClick={() => filterNewest()}>
                                    <span>Newest</span>
                                </div>
                                <div className={filter === "mostVote" ? "discuss-top-active" : "discuss-top"} onClick={() => filterMostVote()}>
                                    <span>Most Votes</span>
                                </div>
                            </div>
                            <div className="col d-flex jc-end ai-center">
                                <div className='discuss-search-title'>
                                    <span><FiSearch/> Search discuss title...</span>
                                </div>
                                <Link to="add" className='discuss-create-button'>
                                    <span>New <FaEdit/> </span>
                                </Link>
                            </div>
                        </div>
                        {AllDiscuss}
                    </div>
                    <div className="col-3 bg-color-1"></div>
                    </div>
                }                 
            </div>
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    );
}

export default Discuss;