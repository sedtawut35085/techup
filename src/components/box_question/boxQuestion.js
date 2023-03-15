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
                <div className="point">{data.point} P</div>
                <div className="title">
                    <span className="f-lg fw-600 thai">{data.name}</span>
                    <span className="f-xs fw-400">Due date:&nbsp;
                        {   
                            data.date == formatDate(new Date())
                            ? <span className="color-5 fw-600">Today</span>
                            : convertToDate(data.date) < new Date()
                            ? <span className="color-gray2 fw-600">Out time</span>
                            : convertToDate(data.date) > new Date()
                            ? <span className="color-1 fw-600">{data.date}</span>
                            : <span>-</span>
                        }
                    </span>
                </div>
                <div className="bottom f-sm">
                    <span>{data.topic}</span>
                    <span 
                        className={`text-capitalize fw-700 ${
                            data.difficulty === "easy"
                            ? "color-3"
                            : data.difficulty === "normal"
                            ? "color-1"
                            : "color-5"
                        }`}
                    >
                        {data.difficulty}
                    </span>
                </div>
                <div className="bg-icon">
                    <li>
                        <img alt="icon" width="65px" src={"/assets/images/icons/" + data.icon + ".png"} />
                    </li>   
                    <li>
                        <img alt="icon" width="25px" src={"/assets/images/icons/" + data.icon + ".png"} />
                    </li>                                  
                    <li>
                        <img alt="icon" width="35px" src={"/assets/images/icons/" + data.icon + ".png"} />
                    </li>
                    <li>
                        <img alt="icon" width="100px" src={"/assets/images/icons/" + data.icon + ".png"} />
                    </li>
                </div>
            </div>
        </div>
    )
}

export default QuestionBox