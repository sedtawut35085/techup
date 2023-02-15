import React, { useState } from 'react';
import $ from 'jquery'
import DatePicker from 'sassy-datepicker';
import { formatDate, convertToDate } from '../../assets/js/helper'

import { FaChevronDown, FaTimes } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi'

const TuDatePicker = ({id, defaultValue, setValue, max}) => {

    const [isShow, setIsShow] = useState(false);
    const [width, setWidth] = useState("");
    const [date, setDate] = useState(new Date());
    const [selectDate, setSelectDate] = useState(defaultValue);

    function toggleOption() {
        if(defaultValue !== "") {
            setDate(convertToDate(defaultValue));
        }
        setWidth($(`#tu-datepicker-box-${id}`).width());
        setIsShow(!isShow);
    }

    function onChangeDate (newDate) {
        setDate(newDate)
        setSelectDate(formatDate(newDate))
        setValue(formatDate(newDate))
        setIsShow(false)
    }

    function clearOption() {
        setTimeout(() => {
            setIsShow(false);
            setDate(new Date())
            setSelectDate("");
            setValue("");
        }, 1);
    }

    return(
        <div className="tu-selectpicker">
            <div className="tu-selectpicker-box" id={"tu-datepicker-box-" + id} onClick={() => toggleOption()}>
                {
                    selectDate == ""
                    ?   <span className="color-gray2">DD-MM-YYYY</span>
                    :   <span>{selectDate}</span>
                }
                <div className="icon">
                    <FaTimes 
                        className="delete" 
                        style={selectDate == "" ? {display: "none"} : {}}
                        onClick={() => clearOption()}
                    />
                    <FiCalendar size={20} />
                </div>
            </div>
            <div className={"tu-datepicker-calendar " + (isShow ? "showed" : "")} style={{marginLeft: width - 220}}>
                <DatePicker onChange={onChangeDate} value={date} maxDate={max} />
            </div>
        </div>
        // <div>
        //     <DatePicker onChange={onChangeDate} value={date} />
        // </div>
    )

}

export default TuDatePicker