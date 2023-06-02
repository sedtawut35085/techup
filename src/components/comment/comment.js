import React, { ChangeEvent, useState , useEffect } from 'react';
import Moment from 'moment'
import { Link } from  'react-router-dom'

import { defaultProfileImg, toggleScrollable } from '../../assets/js/helper'

import { IoCaretUp, IoCaretDown } from 'react-icons/io5'
import { TbMessageCircle } from 'react-icons/tb'
import { BsReplyAll} from 'react-icons/bs'
import { HiOutlineExclamation } from 'react-icons/hi'

const Comment = ({key , comment , replies, setReportModal}) => {
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

    function getReply(array,discussQuestionId) {
        return array.filter(array => array.ParentID === discussQuestionId).sort(
            (a,b) => new Date(a.Date).getTime() - new Date(b.Date).getTime())
    }
    return (
        <div className="comment-reply" key={key}>
            <div className="d-flex user-info">
                <Link to={"/profile/" + comment?.UserEmail}><img alt="Avatar" onError={defaultProfileImg} src={comment?.UserImage}/></Link>
                <div className="ms-2 d-flex fd-col">
                    <span className="f-md">{comment?.Name} {comment?.SurName}</span>
                    <span className="f-xs color-gray2">created at: {Moment(comment?.Date).format('DD-MM-YYYY , hh:mm')}</span>
                </div>
            </div>
            <p className="f-md my-3 thai">{comment?.Comment}</p>
            <div className="action">
                <div className="d-flex ai-center vote">
                    <IoCaretUp className="" />
                    <span className="mx-2">{comment?.AmountLike}</span>
                    <IoCaretDown className="" />
                </div>
                {
                    replies.length > 0
                    ?   <div className="d-flex ai-center" onClick={() => toggleReply(comment?.DiscussID)}>
                            <TbMessageCircle size={24} className="color-1 me-1" />
                            <span>Show {replies.length} Reply</span>
                        </div>
                    :   null
                }
                {/* <div className="d-flex ai-center">
                    <BsReplyAll size={24} className="color-1 me-1" />
                    <span>Reply</span>
                </div> */}
                <div className="d-flex ai-center report" onClick={() => {setReportModal(true); toggleScrollable(true)}}>
                    <HiOutlineExclamation size={24} className="color-1 me-1" />
                    <span>report</span>
                </div>  
            </div>
        </div>
    );
};

export default Comment;