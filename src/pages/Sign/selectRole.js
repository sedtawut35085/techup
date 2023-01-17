import React, { useState } from 'react';
import BackgroundIcon from '../../components/background/bgIcons.js'

function SelectRole() {

    return (
        <div>
            <div className="container">
                <div className="sp-vertical py-5 mb-5"></div>
                <div className="px-5">
                    <div className="select-role-title text-center">
                        <span className="color-black f-xl fw-800 ps-4">Select your role in <span className="color-1 f-xl fw-800 pe-4">TECHUP</span></span>
                    </div>
                </div>
            </div>
            <BackgroundIcon />
        </div>
    )
}

export default SelectRole