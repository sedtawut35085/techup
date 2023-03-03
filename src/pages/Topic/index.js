import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { HiOutlineChartBar } from 'react-icons/hi'
import BackgroundIcon from '../../components/background/bgIcons.js';

function Topic() {

    const [data, setData] = useState({
        name: "Operation System",
        type: "Computer Science",
        icon: "idea",
        description: "ระบบปฏิบัติการ(Operating System) หรือ โอเอส(OS) คือ ซอฟต์แวร์ที่ทำหน้าที่ควบคุมการทำงานของระบบคอมพิวเตอร์ ให้คอมพิวเตอร์และอุปกรณ์ต่อพ่วงต่าง ๆ ทำงานร่วมกันอย่างมีประสิทธิภาพ ซอฟต์แวร์ระบบที่รู้จักกันดี คือ ระบบปฏิบัติการ(OS-Operating System) เช่น MS-DOS, UNIX, OS/2, Windows, Linux และ Ubuntu เป็นต้น",
    })

    const [owner, setOwner] = useState({
        name: "Chukiat",
        surname: "Worasucheep",
        contact: [
            { contact: "Chukiat Woras", type: {label: "Facebook", data: "fb"}},
            { contact: "chukiat_woras", type: {label: "Instagram", data: "ig"}},
            { contact: "Chukiat Worasucheep", type: {label: "GitHub", data: "github"}},
            { contact: "https://math.kmutt.ac.th/index.php/staff-directory/staff/lecturer/applied-computer-science/41-assoc-prof-chukiat-worasucheep", type: {label: "Link", data: "link"}}
        ]
    })

    const [question, setQuestion] = useState([

    ])

    return (
        <div className="topic-page">
            <div className="cover-container">
                <Link className="btn-back" to="/home">
                    <FaChevronLeft />
                </Link>
                <div className="body">
                    <div className="main-section">
                        <div className="title">
                            <span className="f-xl fw-700">{data.name}</span>
                            <button className="btn-2">+ Join</button>
                        </div>
                        <p className="f-md thai fw-400 mt-4">{data.description}</p>
                        <div className="divider my-5"></div>
                        <span className="f-xl fw-700">Question</span>
                    </div>
                    <div className="info-section">
                        <div className="info-box">
                            <span className="color-1 f-lg fw-700 d-flex ai-center">Stats Session<HiOutlineChartBar className="ms-2" size={28} /></span>
                            <div className="d-flex ai-center mt-3 jc-btw bar">
                                <span className="color-3 f-md">Easy</span>
                                <div className="stat-bar" data-title={"16/20"}>
                                    <div className="stat-val" style={{width: 50 + "%"}}></div>
                                </div>
                            </div>
                            <div className="d-flex ai-center mt-4 jc-btw bar">
                                <span className="color-1 f-md">Normal</span>
                                <div className="stat-bar">
                                    <div className="stat-val" style={{width: 50 + "%"}}></div>
                                </div>
                            </div>
                            <div className="d-flex ai-center mt-4 jc-btw bar">
                                <span className="color-5 f-md">Hard</span>
                                <div className="stat-bar">
                                    <div className="stat-val" style={{width: 50 + "%"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="background-container"></div>
            <BackgroundIcon 
                icon={data.icon} 
                color={
                    data.type === "Computer Science"
                    ? "#1B1F4B"
                    : data.type === "Data Science"
                    ? "#6A244D"
                    : "#194D45"
                }
            />
        </div>
    );
}

export default Topic;