import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery'

import BackgroundIcon from '../../components/background/bgIcons.js';

import { BsReplyAll } from 'react-icons/bs'
import { FaChevronLeft } from 'react-icons/fa';
import { IoCaretUp, IoCaretDown } from 'react-icons/io5'
import { HiOutlineEye, HiOutlineExclamation } from 'react-icons/hi'
import { TbMessage2, TbMessageCircle } from 'react-icons/tb'
import { getComment, getEachDiscuss } from '../../service/discuss.js';
import Comment from "../../components/comment/comment"
import Moment from "moment"
import { addComment } from '../../service/discuss.js';

function DiscussDetail() {

    let discussID = window.location.href.split("/")[4];

    const [isLoading, setIsLoading] = useState([1, 2])

    const [sortBy, setSortBy] = useState(1)
    const [comment , setComment] = useState("")
    const [discuss , setDiscuss] = useState("")

    async function getDiscussDetail(discussId) {
        let res = await getEachDiscuss(discussId)
        setDiscuss(res[0])
        setIsLoading(isLoading.splice(isLoading.indexOf(1), 1))
    }

    async function getAllComment(discussId) {
        let res = await getComment(discussId)
        setAllComment(res)
        setIsLoading(isLoading.splice(isLoading.indexOf(2), 1))
    }

    async function addNewComment() {
        await addComment(discussID,comment)
        let res = await getComment(discussID);
        setAllComment(res)
        setComment("")
    }

    const [allComment, setAllComment] = useState([
        // {
        //     id: "1",
        //     detail: "Nibh et faucibus enim odio purus feugiat tempor massa libero. Luctus montes, vitae eget consequat morbi lacus, nibh commodo. Sed cras cursus sed neque purus elit vitae et non. Proin massa ut velit duis ullamcorper. Arcu aliquet elementum non volutpat ipsum massa egestas mauris nunc.",
        //     vote: 50,
        //     owner: {
        //         name: "Wattanasiri Uparakkitanon",
        //     },
        //     datetime: "11/5/2022, 00:00",
        //     reply: [
        //         {
        //             id: "2",
        //             detail: "Nibh et faucibus enim odio purus feugiat tempor massa libero. Luctus montes, vitae eget consequat morbi lacus, nibh commodo. Sed cras cursus sed neque purus elit vitae et non. Proin massa ut velit duis ullamcorper. Arcu aliquet elementum non volutpat ipsum massa egestas mauris nunc.",
        //             vote: 20,
        //             owner: {
        //                 name: "Wattanasiri Uparakkitanon",
        //             },
        //             datetime: "11/5/2022, 00:00",
        //         },
        //         {
        //             id: "3",
        //             detail: "Nibh et faucibus enim odio purus feugiat tempor massa libero. Luctus montes, vitae eget consequat morbi lacus, nibh commodo. Sed cras cursus sed neque purus elit vitae et non. Proin massa ut velit duis ullamcorper. Arcu aliquet elementum non volutpat ipsum massa egestas mauris nunc.",
        //             vote: 10,
        //             owner: {
        //                 name: "Wattanasiri Uparakkitanon",
        //             },
        //             datetime: "11/5/2022, 00:00",
        //         }
        //     ]
        // },
        // {
        //     id: "4",
        //     detail: "Nibh et faucibus enim odio purus feugiat tempor massa libero. Luctus montes, vitae eget consequat morbi lacus, nibh commodo. Sed cras cursus sed neque purus elit vitae et non. Proin massa ut velit duis ullamcorper. Arcu aliquet elementum non volutpat ipsum massa egestas mauris nunc.",
        //     vote: 40,
        //     owner: {
        //         name: "Wattanasiri Uparakkitanon",
        //     },
        //     datetime: "11/5/2022, 00:00",
        //     reply: [
        //         {
        //             id: "5",
        //             detail: "Nibh et faucibus enim odio purus feugiat tempor massa libero. Luctus montes, vitae eget consequat morbi lacus, nibh commodo. Sed cras cursus sed neque purus elit vitae et non. Proin massa ut velit duis ullamcorper. Arcu aliquet elementum non volutpat ipsum massa egestas mauris nunc.",
        //             vote: 20,
        //             owner: {
        //                 name: "Wattanasiri Uparakkitanon",
        //             },
        //             datetime: "11/5/2022, 00:00",
        //         }
        //     ]
        // }
    ])

    const rootComments = allComment.filter( (allComment) => allComment.ParentID === null)

    function getReply(commentId) {
        return allComment.filter(allComment => allComment.ParentID === commentId).sort(
            (a,b) => new Date(a.Date).getTime() - new Date(b.Date).getTime())
    }

    useEffect( () => {
        getDiscussDetail(discussID)
        getAllComment(discussID)
    } , []);

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
                    isLoading.length !== 0 &&
                    <div className="loader2">
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                }  
                {
                    isLoading.length === 0 &&
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
                                        <img className="profile-img" src={discuss?.UserImage} />
                                        <div className="infomation">
                                            <p className="f-md m-0">{discuss?.Title}</p>
                                            <div className="tags">
                                                {JSON.parse(discuss?.Tags).map((eachTag) => 
                                                    // <div className="discuss-tag">
                                                    //     <span>#{eachTag}</span>
                                                    // </div>
                                                    <span>#{eachTag}</span>
                                                )}
                                                {/* <span>#FullStack</span>
                                                <span>#Internship</span>
                                                <span>#Experience</span> */}
                                            </div>
                                            <span className="f-xs m-0 color-gray2">{discuss?.AuthorName} {discuss?.AuthorSurName} created at: {Moment(discuss.Date).format('DD-MM-YYYY hh:mm')} </span>
                                        </div>
                                    </div>
                                    <div className="action">
                                        <span><HiOutlineEye size={24} />768</span>
                                        <span className="report"><HiOutlineExclamation size={24} /></span>
                                    </div>
                                </div>
                                <p className="my-3">
                                    {discuss?.Description}
                                </p>
                            </div>
                        </div>
                        <div className="comment-section">
                            <div className="d-flex jc-btw my-4">
                                <span className="f-md d-flex ai-center"><TbMessage2 className="me-1 color-1" size={36} />Comments ({rootComments.length})</span>
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
                                    value = {comment} 
                                />
                                <button className="btn-01" onClick={() => {addNewComment()}}>Comment</button>
                            </div>
                            <div className="comment-wrap">
                                {
                                    rootComments.map((comment, key) => (
                                        <Comment  
                                            key={comment.DiscussQuestionID}
                                            comment={comment}
                                            replies={getReply(comment.DiscussID)}></Comment>
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