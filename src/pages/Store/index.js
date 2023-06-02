import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import { toggleScrollable } from '../../assets/js/helper'
import { addToRedeemHistory , addToLogPoint , updateUserPoint, getRewards } from '../../service/store.js';
import { getStudent } from '../../service/student.js';

import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { HiChevronDoubleLeft , HiChevronLeft , HiChevronRight , HiChevronDoubleRight } from 'react-icons/hi';
import { TbGift, TbCircleCheck, TbChevronsRight } from 'react-icons/tb';
import { IoCloseCircle } from 'react-icons/io5'

import BackgroundIcon from '../../components/background/bgIcons.js';

function Store() {
    
    const [isLoadingReward, setIsLoadingReward] = useState(true)
    const [isLoadingStudent, setIsLoadingStudent] = useState(true)

    const [currentUser,setCurrentUser] = useState('')
    const [rewards, setRewards] = useState([])

    const [modal, setModal] = useState(false)
    const [modalSuccess, setModalSuccess] = useState(false)
    const [modalValue,setModalValue] = useState({})

    async function loadReward() {
        let res = await getRewards()
        setRewards(res)
        setIsLoadingReward(false)
    }

    async function loadStudent() {
        let res = await getStudent()
        setCurrentUser(res[0])
        setIsLoadingStudent(false)
    }

    async function redeemReward(reward){
        await updateUserPoint(reward)
        await addToRedeemHistory(reward)
        await addToLogPoint(reward)
        setIsLoadingReward(true)
        setIsLoadingStudent(true)
        loadReward();
        loadStudent();
        setModal(false);
        setModalSuccess(true);
    }

    function toggleModal(){
        setModal(true);
        toggleScrollable(true);
    }
    
    useEffect( () => {
        loadReward()
        loadStudent()
    }
    , [])

    return (
        <div className="store-page">
            <div className="cover-container">
                {
                    (isLoadingReward || isLoadingStudent) &&
                    <div className="loader2">
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                }
                {
                    !(isLoadingReward || isLoadingStudent) &&
                    <>
                    <p data-aos="fade-up" data-aos-duration="1000" className="title"><span className="color-1">TECHUP</span> Store</p>
                    <div data-aos="fade-up" data-aos-duration="1200" className="item-wrap">
                        {rewards.map((reward, key) => 
                            <div className="item-card" key={reward.RewardID} onClick={() => {setModalValue(reward); toggleModal()}}>
                                <img src={reward.RewardImage} alt={reward.RewardName}></img>
                                <div className="detail">
                                    <span>{reward.RewardName}</span>
                                    <span className="point">{reward.Point} P</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* <div className="pagination1">                    
                        <div className="pagination-number">
                            <button className="arrow disable"><FiChevronsLeft /></button>
                            <button className="arrow disable"><FiChevronLeft /></button>
                            <button className="number active">1</button>
                            <button className="number">2</button>
                            <button className="number">3</button>
                            <button className="number">4</button>
                            <button className="number">5</button>
                            <button className="arrow"><FiChevronRight /></button>
                            <button className="arrow"><FiChevronsRight /></button>
                        </div>
                        <div className="display-per-page">
                            <span>Display per page</span>
                            <select defaultValue="6" className="page">
                                <option value="5">6</option>
                                <option value="10">12</option>
                                <option value="25">48</option>
                            </select>
                            <span>Showing 1-6 of 6</span>
                        </div>
                    </div> */}
                    </>
                }
            </div>

            {/* Modal Redeem */}
            <div className="tu-modal" style={modal ? {opacity: "1", visibility: "visible"} : {}}>
                <div className="tu-modal-card store">
                    <IoCloseCircle className="close-button" onClick={() => {setModal(false); toggleScrollable(false);}} />
                    <div className="tu-modal-head jc-center">
                        <TbGift className="icon" />
                        <span>{modalValue.RewardName}</span>
                    </div>
                    <div className="tu-modal-body">
                        <img src={modalValue.RewardImage} alt={modalValue.RewardName} />
                        <div className="detail">
                            <p>This reward need <span className="point">{modalValue.Point} P</span> to redeem</p>                           
                        </div>
                    </div>
                    <div className="tu-modal-footer jc-center">
                        {
                            currentUser.Point < modalValue.Point
                            ?   <span className="color-5 f-sm">You need more {modalValue.Point - currentUser.Point} Points to redeem this reward.</span>
                            :   <>
                                <div className="cancel-button" onClick={() => {setModal(false); toggleScrollable(false);}}>No, keep my point.</div>
                                <div className="accept-button" onClick={() => {redeemReward(modalValue)}}>Yes, I want to redeem.</div>
                                </>
                        }
                    </div>                   
                </div>
            </div>

            {/* Modal Success */}
            <div className="tu-modal" style={modalSuccess ? {opacity: "1", visibility: "visible"} : {}}>
                <div className="tu-modal-card store">
                    <IoCloseCircle className="close-button" onClick={() => {setModalSuccess(false); toggleScrollable(false);}} />
                    <div className="tu-modal-head jc-center">
                        <span>Successfully redeem!</span>
                    </div>
                    <div className="tu-modal-body jc-center ai-center">
                        <TbCircleCheck size={86} className="color-1" />
                        <span className="text-center f-sm">Your redemption has been completed. Would you like to go to the history redeem page?</span>
                    </div>
                    <div className="tu-modal-footer jc-center">
                        <div className="cancel-button" onClick={() => {setModalSuccess(false); toggleScrollable(false);}}>No, I don't want to go.</div>
                        <Link 
                            className="accept-button" 
                            to={"/profile/" + currentUser.UserEmail + "/point-history"} 
                            onClick={() => {setModalSuccess(false); toggleScrollable(false)}}
                        >
                            Yes, I want to go. <TbChevronsRight size={24} />
                        </Link>
                    </div>                   
                </div>
            </div>

            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    );
}

export default Store;