import React from 'react';

import BackgroundIcon from '../../components/background/bgIcons.js';

function Homepage() {

    return (
        <div className="homepage">
            <div className="cover-container">
                <h1>Homepage</h1>
            </div>
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    );
}

export default Homepage;