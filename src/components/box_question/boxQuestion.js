import React from 'react'

import { formatDate, convertToDate } from '../../assets/js/helper'

const QuestionBox = ({data}) => {

    

    return (
        <div className="question-box col-3">
            <div 
                className="body" 
                style={
                    data.type === "Computer Science"
                    ? {backgroundColor: "#1B1F4B"}
                    : data.type === "Data Science"
                    ? {backgroundColor: "#6A244D"}
                    : {backgroundColor: "#194D45"}
                }
            >
                <div className="point">{data.Point} P</div>
                <div className="title">
                    <span className="f-lg fw-600 thai">{data.QuestionName}</span>
                    <span className="f-xs fw-400">Due date:&nbsp;
                        {   
                            data.DueDate == formatDate(new Date())
                            ? <span className="color-5 fw-600">Today</span>
                            : convertToDate(data.DueDate) < new Date()
                            ? <span className="color-gray2 fw-600">Out time</span>
                            : convertToDate(data.DueDate) > new Date()
                            ? <span className="color-1 fw-600">{data.DueDate}</span>
                            : <span>-</span>
                        }
                    </span>
                </div>
                <div className="bottom f-sm">
                    <span>{data.TopicName}</span>
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
        </div>
    )
}

export default QuestionBox