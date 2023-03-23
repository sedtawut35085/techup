import React from 'react';

import BackgroundIcon from '../../components/background/bgIcons.js';
import {IoEyeSharp} from 'react-icons/io5';
import {BiSearch} from 'react-icons/bi';

function Ranking() {

    return (
        <div className="ranking">
            <div className="cover-container">
                <div className="row">
                    <p className="f-xl fw-800">Leaderboard<span className="color-1 f-xl fw-800"> TECHUP</span></p>
                </div>
                <div className="row">
                    <div className="col-4 text-center">
                        <div className="ranking-frame sh-lg">
                            <div className="ranking-image-frame">
                                <img className="ranking-image" width="100%" src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"></img>
                                <div className="rank-no d-flex align-items-center jc-center" id="first">
                                    <span>1st</span>
                                </div>
                            </div>
                            <p>aoystwr</p>
                            <div className="ranking-point bg-color-2 text-center color-white d-flex align-items-center jc-center mx-auto">
                                <span>9999 P</span>
                            </div>
                            <hr></hr>
                            <div className="color-gray2">
                                <IoEyeSharp></IoEyeSharp>
                                <span> See profile</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 text-center">
                        <div className="ranking-frame sh-lg">
                            <div className="ranking-image-frame">
                                <img className="ranking-image" width="100%" src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"></img>
                                <div className="rank-no d-flex align-items-center jc-center" id="second">
                                    <span>2nd</span>
                                </div>
                            </div>
                            <p>bwtnsri_</p>
                            <div className="ranking-point bg-color-2 text-center color-white d-flex align-items-center jc-center mx-auto">
                                <span>9999 P</span>
                            </div>
                            <hr></hr>
                            <div className="color-gray2">
                                <IoEyeSharp></IoEyeSharp>
                                <span> See profile</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 text-center">
                        <div className="ranking-frame sh-lg">
                            <div className="ranking-image-frame">
                                <img className="ranking-image" width="100%" src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"></img>
                                <div className="rank-no d-flex align-items-center jc-center" id="third">
                                    <span>3rd</span>
                                </div>
                            </div>
                            <p>a_phongrawit</p>
                            <div className="ranking-point bg-color-2 text-center color-white d-flex align-items-center jc-center mx-auto">
                                <span>9999 P</span>
                            </div>
                            <hr></hr>
                            <div className="color-gray2">
                                <IoEyeSharp></IoEyeSharp>
                                <span> See profile</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex jc-end">
                    <div className="ranking-search sh-md d-flex ai-center color-gray2">
                        <BiSearch size={20}></BiSearch>
                        <span> Search...</span>
                    </div>
                </div>
            </div>
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    );
}

export default Ranking;