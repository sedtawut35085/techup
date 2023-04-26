import React, { useState } from 'react';
import $ from 'jquery'

import { FaChevronDown, FaTimes } from 'react-icons/fa';
import { IoPersonCircleOutline, IoPersonOutline, IoGiftOutline, IoSettingsOutline, IoExitOutline } from 'react-icons/io5'

const SelectPickerIcon = ({id, data, defaultValue, setValue, placeholder}) => {

    const [isShow, setIsShow] = useState(false);
    const [width, setWidth] = useState("");
    const [selected, setSelected] = useState(defaultValue)

    function toggleOption() {
        setWidth($(`#tu-selectpicker-box-${id}`).width());
        setIsShow(!isShow);
    }

    function selectOption(option) {
        setIsShow(false)
        setSelected(option)
        setValue(option)
    }
    
    return (
        <div className="tu-selectpicker" onMouseLeave={() => setIsShow(false)}>
            <div className="tu-selectpickericon-box" id={"tu-selectpicker-box-" + id} onClick={() => toggleOption()}>
                {
                    selected.label === "" && selected.data === ""
                    ?   <span className="color-gray2">{placeholder}</span>
                    :   <span>{selected.label}</span>
                } 
                <div className="icon">
                    <FaChevronDown style={isShow ? {transform: "rotate(0.5turn)"} : {}} />
                </div>
            </div>
            <div className={"tu-selectpicker-options " + (isShow ? "showed" : "")} style={{width: width + 40}}>
                {data.map((item, key) => (
                    <div key={key} className={"option " + (item.label === selected.label ? "selected" : "")} onClick={() => selectOption(item)}>
                        <img alt="icon" width="20px" style = {{marginRight : 15}} src={"/assets/images/icons/" + item.img +".png"} /> {item.label}
                    </div>
                ))}
            </div>
        </div>
    ) 

}

export default SelectPickerIcon