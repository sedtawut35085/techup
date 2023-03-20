import React, { useState } from 'react';

import { FaChevronLeft, FaSort, FaFrownOpen } from 'react-icons/fa';

import BackgroundIcon from '../../components/background/bgIcons.js';

function Question() {

    const [data, setData] = useState({
        name: "Operation System",
        type: "Computer Science",
        icon: "idea",
        description: "ระบบปฏิบัติการ(Operating System) หรือ โอเอส(OS) คือ ซอฟต์แวร์ที่ทำหน้าที่ควบคุมการทำงานของระบบคอมพิวเตอร์ ให้คอมพิวเตอร์และอุปกรณ์ต่อพ่วงต่าง ๆ ทำงานร่วมกันอย่างมีประสิทธิภาพ ซอฟต์แวร์ระบบที่รู้จักกันดี คือ ระบบปฏิบัติการ(OS-Operating System) เช่น MS-DOS, UNIX, OS/2, Windows, Linux และ Ubuntu เป็นต้น",
    })

    return(
        <div>
            <div className="cover-container">
                
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
    )
}

export default Question;