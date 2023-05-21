import React, { useState } from 'react';
import $ from 'jquery'

import { FaChevronDown, FaTimes } from 'react-icons/fa';

const SelectPicker4 = ({id, data, defaultValue, setValue, placeholder}) => {

    const [isShow, setIsShow] = useState(false);
    const [width, setWidth] = useState("");
    const [selected, setSelected] = useState(defaultValue)

    function toggleOption() {
        setWidth($(`#tu-selectpicker-box-${id}`).width());
        setIsShow(!isShow);
    }

    function selectOption(option) {
        setIsShow(false)
        setSelected(option.TopicID)
        setValue(option.TopicID)
    }

    return (
        <div className="tu-selectpicker" onMouseLeave={() => setIsShow(false)}>
            <div className="tu-selectpicker-box" id={"tu-selectpicker-box-" + id} onClick={() => toggleOption()}>
                {
                    selected === "" 
                    ?   <span className="color-gray2">{placeholder}</span>
                    :   <span>{selected}</span>
                } 
                <div className="icon">
                    <FaChevronDown style={isShow ? {transform: "rotate(0.5turn)"} : {}} />
                </div>
            </div>
            <div className={"tu-selectpicker-options " + (isShow ? "showed" : "")} style={{width: width + 40}}>
                {data.map((item, key) => (
                    <div key={key} className={"option " + (item.TopicID === selected ? "selected" : "")} onClick={() => selectOption(item)}>{item.TopicID}</div>
                ))}
            </div>
        </div>
    )

}

export default SelectPicker4