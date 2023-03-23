import React from 'react'

import { Link } from 'react-router-dom';
import { RiVipCrown2Fill } from 'react-icons/ri'

const TopicBoxProf = ({data}) => {
  return (
    <Link className="topic-box col-3" to="/professor/os">
        <div 
            className="body" 
            style={
                data.Type === "Computer Science"
                ? {backgroundColor: "#1B1F4B"}
                : data.Type === "Data Science"
                ? {backgroundColor: "#6A244D"}
                : {backgroundColor: "#194D45"}
            }
        >
            <div className="title">
                <span className="f-lg fw-700">{data.TopicName}</span>
                <span className="f-xs fw-400">{data.Type}</span>
            </div>
            <span className="professor-owner f-xs fw-500"><RiVipCrown2Fill className="color-1 me-1" size={20} />{data.Name+" "+data.Surname}</span>
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

export default TopicBoxProf 