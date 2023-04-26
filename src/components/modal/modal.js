import React, { useState } from 'react';
import { toggleScrollable } from '../assets/js/helper'

import { FaFrownOpen } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5'

const Modal = ({}) => {

    const [modal, setModal] = useState(false)

    return (
        <div className="tu-modal" style={modal ? {opacity: "1", visibility: "visible"} : {}}>
                <div className="tu-modal-card">
                    <IoCloseCircle className="close-button" onClick={() => {setModal(false); toggleScrollable(false);}} />
                    <div className="tu-modal-head">
                        <FaFrownOpen className="icon" />
                        <span>
                            Title Example
                        </span>
                    </div>
                    <div className="tu-modal-body">
                        <p>Description Example</p>
                    </div>
                    <div className="tu-modal-footer">
                        <div className="cancel-button" onClick={() => {setModal(false); toggleScrollable(false);}}>No, keep me remain.</div>
                        <div className="accept-button" onClick={() => {setModal(false); toggleScrollable(false);}}>Yes, I want to leave.</div>
                    </div>
                </div>
            </div>
    )
}

export default Modal
