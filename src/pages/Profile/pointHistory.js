import React from 'react'

import { TbGift, TbHistory } from 'react-icons/tb';

import BackgroundIcon from '../../components/background/bgIcons.js';

function PointHistory() {
    return (
        <div className="point-history-page">
            <div className="cover-container">
                <div className="body">
                    <div className="redeem-reward">
                        <span className="title"><TbGift className="color-1" />Redeem reward</span>
                    </div>
                    <div className="log-point">
                        <span className="title"><TbHistory className="color-1" />Points history</span>
                    </div>
                </div>
            </div>

            {/* Background */}
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    )
}

export default PointHistory