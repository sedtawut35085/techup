import React from 'react'
import { Link } from 'react-router-dom';
import Moment from 'moment';

import { formatDate, convertToDate } from '../../assets/js/helper'

const QuestionBox = ({data}) => {

    

    return (
        <Link className="question-box col-3" to={`/topic/${data.TopicID}/question/${data.QuestionID}`}>
            <div 
                className="body" 
                style={
                    data.Type === "Computer Science"
                    ? {backgroundColor: "#1B1F4B"}
                    : data.Type === "Data Science"
                    ? {backgroundColor: "#6A244D"}
                    : data.Type === "Digital Business"
                    ? {backgroundColor: "#194D45"}
                    : {backgroundColor: "#fff"}
                }
                title={data.TopicName}
            >
                <div className="point">{data.Point} P</div>
                <div className="title">
                    <span className="f-lg fw-600 thai">{data.QuestionName}</span>
                    <span className="f-xs fw-400">Due date:&nbsp;
                        {   
                            Moment(data.DueDate).isSame(new Date(), "day")
                            ? <span className="color-3 fw-600">Today</span>
                            : Moment(data.DueDate).isBefore(new Date(), "day")
                            ? <span className="color-5 fw-600">Out time</span>
                            : Moment(data.DueDate).isAfter(new Date(), "day")
                            ? <span className="color-1 fw-600">{Moment(data.DueDate).format('DD-MM-YYYY')}</span>
                            : <span>-</span>
                        }
                    </span>
                </div>
                <div className="bottom f-sm">
                    {
                        data.TopicName.length > 29 ?
                        <>
                        <span>{data.TopicName.substring(0, 23) + "..."}</span>
                        </>
                        :<>
                        <span>{data.TopicName}</span>
                        </>
                    }
                    <span 
                        className={`text-capitalize fw-700 ${
                            data.Difficulty === "Easy"
                            ? "color-3"
                            : data.Difficulty === "Normal"
                            ? "color-1"
                            : "color-5"
                        }`}
                    >
                        {data.Difficulty}
                    </span>
                </div>
                <div className="bg-icon">
                    <li>
                        <img alt="icon" width="65px" src={"/assets/images/icons/" + data.Icon + ".png"} />
                    </li>   
                    <li>
                        <img alt="icon" width="25px" src={"/assets/images/icons/" + data.Icon + ".png"} />
                    </li>                                  
                    <li>
                        <img alt="icon" width="35px" src={"/assets/images/icons/" + data.Icon + ".png"} />
                    </li>
                    <li>
                        <img alt="icon" width="100px" src={"/assets/images/icons/" + data.Icon + ".png"} />
                    </li>
                </div>
            </div>
        </Link>
    )
}

export default QuestionBox