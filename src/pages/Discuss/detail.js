import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery'

import BackgroundIcon from '../../components/background/bgIcons.js';

import { BsReplyAll } from 'react-icons/bs'
import { FaChevronLeft } from 'react-icons/fa';
import { IoCaretUp, IoCaretDown } from 'react-icons/io5'
import { HiOutlineEye, HiOutlineExclamation } from 'react-icons/hi'
import { TbMessage2, TbMessageCircle } from 'react-icons/tb'

function DiscussDetail() {

    const [isLoading, setIsLoading] = useState(true)

    const [sortBy, setSortBy] = useState(1)
    const [comment, setComment] = useState("")

    const [allComment, setAllComment] = useState([
        {
            id: "1",
            detail: "Nibh et faucibus enim odio purus feugiat tempor massa libero. Luctus montes, vitae eget consequat morbi lacus, nibh commodo. Sed cras cursus sed neque purus elit vitae et non. Proin massa ut velit duis ullamcorper. Arcu aliquet elementum non volutpat ipsum massa egestas mauris nunc.",
            vote: 50,
            owner: {
                name: "Wattanasiri Uparakkitanon",
            },
            datetime: "11/5/2022, 00:00",
            reply: [
                {
                    id: "2",
                    detail: "Nibh et faucibus enim odio purus feugiat tempor massa libero. Luctus montes, vitae eget consequat morbi lacus, nibh commodo. Sed cras cursus sed neque purus elit vitae et non. Proin massa ut velit duis ullamcorper. Arcu aliquet elementum non volutpat ipsum massa egestas mauris nunc.",
                    vote: 20,
                    owner: {
                        name: "Wattanasiri Uparakkitanon",
                    },
                    datetime: "11/5/2022, 00:00",
                },
                {
                    id: "3",
                    detail: "Nibh et faucibus enim odio purus feugiat tempor massa libero. Luctus montes, vitae eget consequat morbi lacus, nibh commodo. Sed cras cursus sed neque purus elit vitae et non. Proin massa ut velit duis ullamcorper. Arcu aliquet elementum non volutpat ipsum massa egestas mauris nunc.",
                    vote: 10,
                    owner: {
                        name: "Wattanasiri Uparakkitanon",
                    },
                    datetime: "11/5/2022, 00:00",
                }
            ]
        },
        {
            id: "4",
            detail: "Nibh et faucibus enim odio purus feugiat tempor massa libero. Luctus montes, vitae eget consequat morbi lacus, nibh commodo. Sed cras cursus sed neque purus elit vitae et non. Proin massa ut velit duis ullamcorper. Arcu aliquet elementum non volutpat ipsum massa egestas mauris nunc.",
            vote: 40,
            owner: {
                name: "Wattanasiri Uparakkitanon",
            },
            datetime: "11/5/2022, 00:00",
            reply: [
                {
                    id: "5",
                    detail: "Nibh et faucibus enim odio purus feugiat tempor massa libero. Luctus montes, vitae eget consequat morbi lacus, nibh commodo. Sed cras cursus sed neque purus elit vitae et non. Proin massa ut velit duis ullamcorper. Arcu aliquet elementum non volutpat ipsum massa egestas mauris nunc.",
                    vote: 20,
                    owner: {
                        name: "Wattanasiri Uparakkitanon",
                    },
                    datetime: "11/5/2022, 00:00",
                }
            ]
        }
    ])
    const [showReply, setShowReply] = useState([]);

    function toggleReply(id) {
        let array = [...showReply];
        if(array.indexOf(id) > -1) {
            array.splice(array.indexOf(id), 1);
        } else {
            array.push(id);
        }
        setShowReply(array)
    }

    setTimeout(() => {
        setIsLoading(false)
    }, 100)

    function autosize(){
        var text = $('.autosize');
    
        text.each(function(){
            $(this).attr('rows',1);
            resize($(this));
        });
    
        text.on('input', function(){
            resize($(this));
        });  
        function resize ($text) {
            $text.css('height', 'auto');
            $text.css('height', $text[0].scrollHeight+'px');
        }
    }
    autosize();
    
    return (
        <div className="discuss-detail-page">
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
                    <>
                        <Link data-aos="fade-right" data-aos-duration="1000" className="btn-back" to={-1}>
                            <FaChevronLeft />
                        </Link>
                        <div className="main-discuss-card">
                            <div className="vote-section">
                                <IoCaretUp className="color-1" size={24} />
                                <span>78</span>
                                <IoCaretDown className="color-1" size={24} />
                            </div>
                            <div className="detail-section">
                                <div className="header-detail">
                                    <div className="profile-info">
                                        <img className="profile-img" src="https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.6435-9/73168447_2514376778651048_2509528985663176704_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG5qhR_w88_xeMdhxyxgYcgrXSV2hV34hatdJXaFXfiFk8Owv34Ecy3LZ3v5e6WdZCRJ-3Xzcm0qv3dVGxqCrZM&_nc_ohc=kuQGgUcF1NAAX96xE_Z&_nc_ht=scontent.fbkk22-2.fna&oh=00_AfDhehoyLbulh3AJ_WmRWEu080Ilyyjmv6Uc5SA19NxpBA&oe=644E84B4" />
                                        <div className="infomation">
                                            <p className="f-md m-0">Share Full Stack Developer internship experience</p>
                                            <div className="tags">
                                                <span>#FullStack</span>
                                                <span>#Internship</span>
                                                <span>#Experience</span>
                                            </div>
                                            <span className="f-xs m-0 color-gray2">Sedtawut created at: Dec 10, 2022 - 2:30 </span>
                                        </div>
                                    </div>
                                    <div className="action">
                                        <span><HiOutlineEye size={24} />768</span>
                                        <span className="report"><HiOutlineExclamation size={24} /></span>
                                    </div>
                                </div>
                                <p className="my-3">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh et faucibus enim odio purus feugiat tempor massa libero. Luctus montes, vitae eget consequat morbi lacus, nibh commodo. Sed cras cursus sed neque purus elit vitae et non. Proin massa ut velit duis ullamcorper. Arcu aliquet elementum non volutpat ipsum massa egestas mauris nunc.
                                </p>
                            </div>
                        </div>
                        <div className="comment-section">
                            <div className="d-flex jc-btw my-4">
                                <span className="f-md d-flex ai-center"><TbMessage2 className="me-1 color-1" size={36} />Comments (2)</span>
                                <div className="sorting">
                                    <span className={`sort-select ${sortBy === 1 ? 'active' : ''}`} onClick={() => setSortBy(1)}>Most Votes</span>
                                    <span className={`sort-select ${sortBy === 2 ? 'active' : ''}`} onClick={() => setSortBy(2)}>Newest</span>
                                    <span className={`sort-select ${sortBy === 3 ? 'active' : ''}`} onClick={() => setSortBy(3)}>Oldest</span>
                                </div>
                            </div>
                            <div className="comment-box">
                                <textarea 
                                    className="autosize" 
                                    placeholder="Type comment here ..." 
                                    onChange={(e) => setComment(e.target.value)} 
                                />
                                <button className="btn-01">Comment</button>
                            </div>
                            <div className="comment-wrap">
                                {
                                    allComment.map((item, key) => (
                                        <div className="comment-reply" key={key}>
                                            <div className="d-flex">
                                                <img height="50px" src="/assets/images/icons/profile.png" />
                                                <div className="ms-2 d-flex fd-col">
                                                    <span className="f-md">{item.owner.name}</span>
                                                    <span className="f-xs color-gray2">created at: {item.datetime}</span>
                                                </div>
                                            </div>
                                            <p className="f-md my-3">{item.detail}</p>
                                            <div className="action">
                                                <div className="d-flex ai-center">
                                                    <IoCaretUp className="color-1" />
                                                    <span className="mx-2">{item.vote}</span>
                                                    <IoCaretDown className="color-1" />
                                                </div>
                                                {
                                                    item?.reply.length > 0
                                                    ?   <div className="d-flex ai-center" onClick={() => toggleReply(item?.id)}>
                                                            <TbMessageCircle size={24} className="color-1 me-1" />
                                                            <span>Show {item?.reply?.length} Reply</span>
                                                        </div>
                                                    :   null
                                                }
                                                <div className="d-flex ai-center">
                                                    <BsReplyAll size={24} className="color-1 me-1" />
                                                    <span>Reply</span>
                                                </div>
                                                <div className="d-flex ai-center">
                                                    <HiOutlineExclamation size={24} className="color-1 me-1" />
                                                    <span>report</span>
                                                </div>  
                                            </div>
                                        </div>
                                    ))
                                }                                
                            </div>
                        </div>
                    </>                    
                }                 
            </div>
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    )
};

export default DiscussDetail;