import React, { useState } from 'react';
import $ from 'jquery'

import { FaChevronDown } from 'react-icons/fa';

const SelectPicker3 = ({id, data, defaultValue, setValue, placeholder}) => {

    const [isShow, setIsShow] = useState(false);
    const [width, setWidth] = useState("");
    const [selected, setSelected] = useState(defaultValue)

    function toggleOption() {
        setWidth($(`#tu-selectpicker3-box-${id}`).width());
        setIsShow(!isShow);
    }

    function selectOption(option) {
        setIsShow(false)
        setSelected(option)
        setValue(option)
    }
    
    return (
        <div className="tu-selectpicker3" onMouseLeave={() => setIsShow(false)}>
            <div className="tu-selectpicker3-box" id={"tu-selectpicker3-box-" + id} onClick={() => toggleOption()}>
                {
                    selected.label === "" && selected.data === ""
                    ?   <span className="color-gray2">{placeholder}</span>
                    :   <span>{selected.label}</span>
                } 
                <div className="icon">                   
                    <FaChevronDown style={isShow ? {transform: "rotate(0.5turn)"} : {}} />
                </div>
            </div>
            <div className={"tu-selectpicker3-options " + (isShow ? "showed" : "")} style={{width: width + 40}}>
                {data.map((item, key) => (
                    <div key={key} className={"option " + (item.label === selected.label ? "selected" : "")} onClick={() => selectOption(item)}>{item.label}</div>
                ))}
            </div>
        </div>
    )

}

export default SelectPicker3