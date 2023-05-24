import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery'
import Moment from "moment"

import { toggleScrollable, defaultProfileImg } from '../../assets/js/helper'
import { addComment, getComment, getEachDiscussNew } from '../../service/discuss.js';

import { BsReplyAll } from 'react-icons/bs'
import { FaChevronLeft } from 'react-icons/fa';
import { IoCaretUp, IoCaretDown, IoCloseCircle } from 'react-icons/io5'
import { HiOutlineEye, HiOutlineExclamation, HiCheckCircle } from 'react-icons/hi'
import { TbMessage2, TbMessageCircle } from 'react-icons/tb'

import Comment from "../../components/comment/comment"
import BackgroundIcon from '../../components/background/bgIcons.js';


function DiscussDetail() {

    let discussID = window.location.href.split("/")[4];
    const [isLoading, setIsLoading] = useState(true)
    const [isLoading1, setIsLoading1] = useState(true)
    const [reportModal, setReportModal] = useState(false)
    const [reportDoneModal, setReportDoneModal] = useState(false)

    const [sortBy, setSortBy] = useState(1)
    const [comment , setComment] = useState("")
    const [discuss , setDiscuss] = useState("")

    async function getDiscussDetail(discussId) {
        let res = await getEachDiscussNew(discussId)
        setDiscuss(res[0])
        setIsLoading(false)
        // setIsLoading(isLoading.splice(isLoading.indexOf(1), 1))
    }

    async function getAllComment(discussId) {
        let res = await getComment(discussId)
        setAllComment(res)
        setIsLoading1(false)
        // setIsLoading(isLoading.splice(isLoading.indexOf(2), 1))
    }

    async function addNewComment() {
        await addComment(discussID,comment)
        let res = await getComment(discussID);
        setAllComment(res)
        setComment("")
    }

    const [allComment, setAllComment] = useState([])

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
                    isLoading === true && isLoading1 === true &&
                    <div className="loader2">
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                }  
                {
                    isLoading === false && isLoading1 === false &&
                    <>
                        <Link data-aos="fade-right" data-aos-duration="1000" className="btn-back" to={-1}>
                            <FaChevronLeft />
                        </Link>
                        <div data-aos="fade-up" data-aos-duration="1000" className="main-discuss-card">
                            <div className="color-gray1 vote-section">
                                <IoCaretUp className="vote" size={24} />
                                <span>{discuss.AmountLike}</span>
                                <IoCaretDown className="vote" size={24} />
                            </div>
                            <div className="detail-section">
                                <div className="header-detail">
                                    <div className="profile-info">
                                        <Link to={"/profile/" + discuss?.UserEmail}><img alt="Avatar" onError={defaultProfileImg} className="profile-img" src={discuss?.UserImage} /></Link>
                                        <div className="information">
                                            <p className="f-md m-0 thai fw-500">{discuss?.Title}</p>
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
                                            <span className="f-xs m-0 color-gray2">{discuss?.Name} {discuss?.SurName} created at: {Moment(discuss.Date).format('MMM DD, YYYY - H:mm')}</span>
                                        </div>
                                    </div>
                                    <div className="action">
                                        {/* <span><HiOutlineEye size={24} />{discuss?.View}</span> */}
                                        <span className="report" onClick={() => {setReportModal(true); toggleScrollable(true)}}><HiOutlineExclamation size={24} /></span>
                                    </div>
                                </div>
                                <p className="my-3 thai">
                                    {discuss?.Description}
                                </p>
                            </div>
                        </div>
                        <div className="comment-section">
                            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="d-flex jc-btw my-4">
                                <span className="f-md d-flex ai-center"><TbMessage2 className="me-1 color-1" size={36} />Comments ({rootComments.length})</span>
                                <div className="sorting">
                                    <span className={`sort-select ${sortBy === 1 ? 'active' : ''}`} onClick={() => setSortBy(1)}>Most Votes</span>
                                    <span className={`sort-select ${sortBy === 2 ? 'active' : ''}`} onClick={() => setSortBy(2)}>Newest</span>
                                    <span className={`sort-select ${sortBy === 3 ? 'active' : ''}`} onClick={() => setSortBy(3)}>Oldest</span>
                                </div>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" className="comment-box">
                                <textarea 
                                    className="autosize" 
                                    placeholder="Type comment here ..." 
                                    onChange={(e) => setComment(e.target.value)}
                                    value = {comment} 
                                />
                                <button className="btn-01" onClick={() => {addNewComment()}}>Comment</button>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" className="comment-wrap">
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
            
            {/* Report Modal */}
            <div className="tu-modal" style={reportModal ? {opacity: "1", visibility: "visible"} : {}}>
                <div className="tu-modal-card">
                    <IoCloseCircle className="close-button" onClick={() => {setReportModal(false); toggleScrollable(false);}} />
                    <div className="tu-modal-head">
                        <HiOutlineExclamation className="icon" />
                        <span>
                            What happening ?
                        </span>
                    </div>
                    <div className="tu-modal-body">
                        <label className="report-checkbox">Spam
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="report-checkbox">Sexual content
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="report-checkbox">Violent content
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="report-checkbox">Promotes terrorism
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="report-checkbox">Illegal content
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="report-checkbox">Hate speech
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="report-checkbox">Suicide or self-injury
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="report-checkbox">Something else...
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="tu-modal-footer">
                        <div className="cancel-button" onClick={() => {setReportModal(false); toggleScrollable(false);}}>No, nothing happening.</div>
                        <div className="accept-button" onClick={() => {setReportModal(false); setReportDoneModal(true);}}>Yes, report this.</div>
                    </div>
                </div>
            </div>

            {/* Report done Modal */}
            <div className="tu-modal" style={reportDoneModal ? {opacity: "1", visibility: "visible"} : {}}>
                <div className="tu-modal-card">
                    <IoCloseCircle className="close-button" onClick={() => {setReportDoneModal(false); toggleScrollable(false);}} />
                    <div className="tu-modal-head jc-center">
                        <HiCheckCircle className="icon" />
                        <span>
                        Your report has been sent!
                        </span>
                    </div>
                    <div className="tu-modal-body">
                        <p className="text-center mb-5 pb-4">Thank you for help us to make our community better.</p>
                    </div>
                    <div className="tu-modal-footer jc-center">
                        <div className="accept-button" onClick={() => {setReportDoneModal(false); toggleScrollable(false);}}>Done</div>
                    </div>
                </div>
            </div>

            {/* Background */}
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    )
};

export default DiscussDetail;