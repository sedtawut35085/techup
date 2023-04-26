import React, { useState } from 'react';
import $ from 'jquery'

import { FaChevronDown, FaTimes } from 'react-icons/fa';

const SelectPicker = ({id, data, defaultValue, setValue, placeholder}) => {

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

    function clearOption() {
        setTimeout(() => {
            setIsShow(false)
            setSelected({label: "", data: ""})
            setValue({label: "", data: ""})
        }, 1);
    }
    
    return (
        <div className="tu-selectpicker" onMouseLeave={() => setIsShow(false)}>
            <div className="tu-selectpicker-box" id={"tu-selectpicker-box-" + id} onClick={() => toggleOption()}>
                {
                    selected.label === "" && selected.data === ""
                    ?   <span className="color-gray2">{placeholder}</span>
                    :   <span>{selected.label}</span>
                } 
                <div className="icon">
                    <FaTimes 
                        className="delete" 
                        style={selected.label === "" && selected.data === "" ? {display: "none"} : {}} 
                        onClick={() => clearOption()}
                    />
                    <FaChevronDown style={isShow ? {transform: "rotate(0.5turn)"} : {}} />
                </div>
            </div>
            <div className={"tu-selectpicker-options " + (isShow ? "showed" : "")} style={{width: width + 40}}>
                {data.map((item, key) => (
                    <div key={key} className={"option " + (item.label === selected.label ? "selected" : "")} onClick={() => selectOption(item)}>{item.label}</div>
                ))}
            </div>
        </div>
    )

}

export default SelectPicker