import React from 'react'

import { RiVipCrown2Fill } from 'react-icons/ri'

const TopicBox = ({data}) => {
  return (
    <div className="topic-box col-3">
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
            <div className="title">
                <span className="f-lg fw-700">{data.name}</span>
                <span className="f-xs fw-400">{data.type}</span>
            </div>
            <span className="professor-owner f-xs fw-500"><RiVipCrown2Fill className="color-1 me-1" size={20} />{data.owner}</span>
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

export default TopicBox 