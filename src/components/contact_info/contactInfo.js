import React, { useState, useEffect } from 'react';
import $ from 'jquery'
import { FaTimes, FaPlus, FaChevronDown } from 'react-icons/fa';

import SelectPicker from "../picker_select/selectPicker.js"

const ContactInfo = ({defaultValue , setValue}) => {

    const [contacts, setContacts] = useState(defaultValue || [{ contact: "", type: {label: "", data: ""}}]);
    const [isShow, setIsShow] = useState(-1)
    const [width, setWidth] = useState("");

    const contactAll = [
        {label: "Email", data: "email"},
        {label: "Facebook", data: "fb"},
        {label: "Instagram", data: "ig"},
        {label: "Line ID", data: "line"},
        {label: "ETC.", data: "etc"}
    ]

    function toggleOption(key) {
        setWidth($(`#tu-selectpicker-box-contact-type`).width());
        if(key == isShow) {
            setIsShow(-1);
        } else {
            setIsShow(key);
        }
    }

    function clearOption() {
        setTimeout(() => {
            setIsShow("")
        }, 1);
    }

    function editContact(index, data) {
        let array = [...contacts];
        array[index].contact = data;
        setContacts(array);
        setValue(array)
    }

    function editTypeContact(index, data) {
        let array = [...contacts];
        array[index].type = data;
        setContacts(array);
        setValue(array)
        setIsShow(-1)
    }

    function clearTypeContact(index) {
        setTimeout(() => {
            setIsShow(-1)
            let array = [...contacts];
            array[index].type = {label: "", data: ""};
            setContacts(array);
            setValue(array)
        }, 1);
    }

    function deleteContact(index) {
        let array = [...contacts];
        array.splice(index, 1)
        setContacts(array);
        setValue(array)
    }

    function addContact() {
        let array = [...contacts];
        array.push({ contact: "", type: {label: "", data: ""}})
        setContacts(array);
        setValue(array)
    }

    return (
        <div>
            {
                contacts.map((contact, key) => (
                    <div className="row contact-row" key={key}>
                        <div className="col-md-7 col-6">
                            <input
                                type="text" 
                                name="techup-id" 
                                id="techup-id" 
                                className="input-box"
                                placeholder={"Contact " + (key + 1)}
                                value={contact.contact}
                                onChange={(event) => editContact(key, (event.target.value))}
                            />
                        </div>
                        <div className="col-md-4 col-4">
                            <div className="tu-selectpicker" onMouseLeave={() => setIsShow(-1)}>
                                <div className="tu-selectpicker-box" id="tu-selectpicker-box-contact-type" onClick={() => toggleOption(key)}>
                                    {
                                        contact.type.label === "" && contact.type.data === ""
                                        ?   <span className="color-gray2">Type of contact</span>
                                        :   <span>{contact.type.label}</span>
                                    }
                                    <div className="icon">
                                        <FaChevronDown style={isShow === key ? {transform: "rotate(0.5turn)"} : {}} />
                                    </div>
                                </div>
                                <div className={"tu-selectpicker-options " + (isShow === key ? "showed" : "")} style={{width: width + 40}}>
                                    {contactAll.map((item, keyType) => (
                                        <div key={keyType} className={"option " + (item.label === contact.type.label ? "selected" : "")} onClick={() => editTypeContact(key, item)}>{item.label}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {
                            key > 0
                            ?   <div className="col-md-1 col-2 d-flex ai-center" onClick={() => deleteContact(key)}>
                                    <div className="delete-contact" data-title="Delete contact">
                                        <FaTimes />
                                    </div>
                                </div>
                            : null
                        }
                    </div>
                ))
            }
            <div className="col-12">
                <span className="add-contact" onClick={() => addContact()}><FaPlus className="me-2" /> Add new contact</span>
            </div>
        </div>
    )
}

export default ContactInfo;