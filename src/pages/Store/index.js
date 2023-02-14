import React from 'react';

import BackgroundIcon from '../../components/background/bgIcons.js';

function Store() {

    return (
        <div className="store">
            <div className="cover-container">
                <span>TechUp Store<hr></hr></span>
            </div>
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    );
}

export default Store;