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
                        <div className="item-wrap">
                            <div className="redeem-card">
                                <div className="detail-hover">
                                    <span>T-Shirt</span>
                                    <button>See details</button>
                                </div>
                                <img alt="T-Shirt" src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_510/https://www.moment-tshirt.com/wp-content/uploads/2021/02/Soft-Premium-Orange-scaled-510x510.jpg"/>
                            </div>
                            <div className="redeem-card">
                                <div className="detail-hover">
                                    <span>Pen</span>
                                    <button>See details</button>
                                </div>
                                <img alt="Pen" src="https://www.premiums.co.th/wp-content/uploads/2021/11/PP9289-FSCI-KMUTT2.jpg" />
                            </div>
                            <div className="redeem-card">
                                <div className="detail-hover">
                                    <span>Bubble Tea</span>
                                    <button>See details</button>
                                </div>
                                <img alt="Bubble Tea" src="https://i.pinimg.com/736x/1e/42/c6/1e42c6c9e4c234e2f843426675a26d48.jpg"/>
                            </div>
                        </div>
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