import React, { useState } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';

import SelectPicker from "../picker_select/selectPicker.js"

const ContactInfo = () => {

    const [contact, setContact] = useState({label: "", data: ""});

    const contactAll = [
        {label: "Email", data: "email"},
        {label: "Facebook", data: "fb"},
        {label: "Instagram", data: "ig"},
        {label: "Line ID", data: "line"},
        {label: "ETC.", data: "etc"}
    ]

    return (
        <div className="row">
            <div className="col-7">
                <input
                    type="text" 
                    name="techup-id" 
                    id="techup-id" 
                    className="input-box"
                    placeholder="Contact 1"
                    onChange={(event) => setContact(event.target.value)}
                />
            </div>
            <div className="col-4">
                <SelectPicker
                    id="contact-type"
                    placeholder="Type of contact"
                    data={contactAll}
                    defaultValue={contact}
                    setValue={setContact}
                />
            </div>
            <div className="col-1 d-flex ai-center">
                <div className="delete-contact" data-title="Delete contact">
                    <FaTimes />
                </div>
            </div>
            <div className="col-12">
                <span className="add-contact"><FaPlus className="me-2" /> Add new contact</span>
            </div>
        </div>
    )
}

export default ContactInfo;