import React from 'react';

import { FaUserClock } from 'react-icons/fa';

import BackgroundIcon from '../../components/background/bgIcons.js';

function PendingProf() {

    function goBack() {
        window.location.href = '/'
    }

    return(
        <div className="pending-prof">
            <div className="cover-container pt-0 d-flex jc-center ai-center">
                <div className="d-flex ai-center fd-col">
                    <FaUserClock className="color-1" size={220} />
                    <p className="f-lg text-center">Your account has been pending<br/>Please wait for admin approve your account</p>
                    <button className="btn-01" onClick={() => goBack()}>Back to sign-in page</button>
                </div>
            </div>
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    )
}

export default PendingProf