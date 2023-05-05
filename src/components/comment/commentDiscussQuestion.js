import React, { ChangeEvent, useState , useEffect } from 'react';
import Moment from 'moment'

import { defaultProfileImg } from '../../assets/js/helper'

import { IoCaretUp, IoCaretDown } from 'react-icons/io5'
import { TbMessageCircle } from 'react-icons/tb'
import { BsReplyAll} from 'react-icons/bs'
import { HiOutlineExclamation } from 'react-icons/hi'

const CommentDiscussQuestion = ({comment , replies}) => {
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
        <div className="comment">
            <div className="comment-owner">
                <img alt="Avatar" className="owner-image" onError={defaultProfileImg} src={comment?.UserImage} />
                <div className="owner-detail">
                    <span>{comment?.AuthorName} {comment.AuthorSurName}</span>
                    <div className="date">
                        <span>Create at:</span>
                        <span className="ms-2">{Moment(comment?.Date).format('DD-MM-YYYY , hh:mm')}</span>
                    </div>
                </div>
            </div>
            <p className="comment-detail">
                {comment?.Comment}
            </p>
            <div className="comment-action">
                <div className="vote">
                    <IoCaretUp className="icon" />
                    <span>{comment?.AmountLike}</span>
                    <IoCaretDown className="icon" />
                </div>
                {
                    // comment.AmountLike > -1
                    replies.length > 0
                    ?   <div className="show-reply" onClick={() => toggleReply(comment?.DiscussQuestionID)}>
                            <TbMessageCircle className="icon" />
                            <span>Show {replies.length} Reply</span>
                        </div>
                    :   null
                }
                <div className="reply">
                    <BsReplyAll className="icon" />
                    <span>Reply</span>
                </div>
                <div className="report">
                    <HiOutlineExclamation className="icon" />
                    <span>report</span>
                </div>                                        
            </div>
            <div className={`comment-reply ${showReply.indexOf(comment?.DiscussQuestionID) > -1 ? "active" : ""}`}>
            {
                replies.map((replyComment, key1) => (
                        <CommentDiscussQuestion comment={replyComment} key={replyComment.DiscussQuestionID} replies={[]}></CommentDiscussQuestion>
                        // <div className="comment" key={key1}>
                        //     <div className="comment-owner">
                        //         <img className="owner-image" height="50px" src={replyComment?.UserImage} />
                        //         <div className="owner-detail">
                        //             <span>{replyComment?.AuthorName} {replyComment?.AuthorSurName}</span>
                        //             <div className="date">
                        //                 <span>Create at:</span>
                        //                 <span className="ms-2">{Moment(replyComment?.Date).format('DD-MM-YYYY , hh:mm')}</span>
                        //             </div>
                        //         </div>
                        //     </div>
                        //     <p className="comment-detail">
                        //         {replyComment?.Comment}
                        //     </p>
                        //     <div className="comment-action">
                        //         <div className="vote">
                        //             <IoCaretUp className="icon" />
                        //             <span>{replyComment?.AmountLike}</span>
                        //             <IoCaretDown className="icon" />
                        //         </div>
                        //         <div className="report">
                        //             <HiOutlineExclamation className="icon" />
                        //             <span>report</span>
                        //         </div>                                        
                        //     </div>
                        // </div>
                ))
            }            
            </div>
        </div>
    );
};

export default CommentDiscussQuestion;