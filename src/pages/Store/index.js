import React, { useEffect, useState } from 'react';
//import { BsChevronLeft , BsChevronDoubleLeft , BsChevronRight , BsChevronDoubleRight} from 'react-icons/bs';
import { HiChevronDoubleLeft , HiChevronLeft , HiChevronRight , HiChevronDoubleRight } from 'react-icons/hi';
import BackgroundIcon from '../../components/background/bgIcons.js';
import { getRewards } from '../../service/store.js';
import { toggleScrollable } from '../../assets/js/helper'
import { addToRedeemHistory , addToLogPoint , updateUserPoint } from '../../service/store.js';
import { getStudent } from '../../service/student.js';

import { FaFrownOpen } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5'

function Store() {
    //const [rewards, setReward] = useState(defaultValue || [{ reward: "", type: {label: "", image: "",point:""}}]);
    // const rewards = [1,2,3,4,5,6]
    const [isLoadingReward,setIsLoadingReward] = useState(true)
    const [isLoadingStudent,setIsLoadingStudent] = useState(true)

    const btnPages = [1,2,3,4]
    const [studentInfo,setStudentInfo] = useState('')
    const [rewards, setRewards] = useState([
        // { 
        //     name : "T-Shirt",
        //     point : "2500",
        //     image : "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_510/https://www.moment-tshirt.com/wp-content/uploads/2021/02/Soft-Premium-Orange-scaled-510x510.jpg"
        // },
        // { 
        //     name : "Ketchup",
        //     point : "999999",
        //     image : "https://images.healthshots.com/healthshots/en/uploads/2021/09/06153546/ketchup-1.jpg"
        // },
        // { 
        //     name : "Pen",
        //     point : "500",
        //     image : "https://www.premiums.co.th/wp-content/uploads/2021/11/PP9289-FSCI-KMUTT2.jpg"
        // },
        // { 
        //     name : "Bag",
        //     point : "1500",
        //     image : "http://www.lineagebloom.com/wp-content/uploads/BAG-SPUNBOND-FSCI-KMUTT-2.jpg"
        // },
        // { 
        //     name : "Bubble Tea",
        //     point : "800",
        //     image : "https://i.pinimg.com/736x/1e/42/c6/1e42c6c9e4c234e2f843426675a26d48.jpg"
        // },
        // { 
        //     name : "Calculator",
        //     point : "5000",
        //     image : "https://www.casio-intl.com/asia/en/calc/products/images/fx-991ESPLUS.jpg"
        // },

    ])

    const [modal, setModal] = useState(false)
    const [modalValue,setModalValue] = useState({})

    async function loadReward() {
        let res = await getRewards()
        setRewards(res)
        setIsLoadingReward(false)
    }

    async function loadStudent() {
        let res = await getStudent()
        setStudentInfo(res[0])
        setIsLoadingStudent(false)
    }

    async function redeemReward(reward){
        await updateUserPoint(reward)
        await addToRedeemHistory(reward)
        await addToLogPoint(reward)
        window.location.reload(false)
    }

    const listPages = btnPages.map((page) => 
        <div className="btn-page bg-color-white sh-sm">
            <span>{page}</span>
        </div>
    )    

    const listRewards = rewards.map((reward) => 
        <div className="col-4 text-center justify-content-center" key={reward.RewardID}>
            <div className="reward-frame sh-lg">
                <img className="reward-image" width="100%" src={reward.RewardImage}></img>
                <div className="row-reward ai-center d-flex justify-content-between align-items-center">
                    <span>{reward.RewardName}</span>
                    <button className={`${studentInfo.Point >= reward.Point ? "point" : "disabled"}`} disabled={studentInfo.Point >= reward.Point ? false : true} onClick={() => {setModalValue(reward);toggleModal()}}>{reward.Point} P</button>
                </div>
            </div>
        </div>
    )

    useEffect( () => {
        loadReward()
        loadStudent()
    }
    , [])

    function toggleModal(){
        setModal(true);
    }

    return (
        <div className="store">
            <div className="cover-container">
                {
                    isLoadingReward && isLoadingStudent &&
                    <div className="loader2">
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                }
                {
                    !isLoadingReward && !isLoadingStudent &&
                    <>
                        <div className="store-title text-center">
                            <p className="f-xl fw-800"> <span className="color-1 f-xl fw-800">TECHUP</span> Store</p>
                        </div>
                        <div className="row">{listRewards}</div>
                        <div className="row jc-btw align-items-center">
                            <div className='col'>
                                <div className="btn-page bg-color-white sh-sm color-1">
                                    <HiChevronDoubleLeft />
                                </div>
                                <div className="btn-page bg-color-white sh-sm color-1">
                                    <HiChevronLeft />
                                </div>
                                <span>{listPages}</span>
                                <div className="btn-page bg-color-white sh-sm color-1">
                                    <HiChevronRight />
                                </div>
                                <div className="btn-page bg-color-white sh-sm color-1">
                                    <HiChevronDoubleRight />
                                </div>
                            </div>
                            <div className='col text-end'>
                                <span className="">Display per page <div className="display-page bg-color-white sh-sm color-black">6</div> Showing 1-6 of 25</span>
                            </div>
                        </div>
                    </>
                }
            </div>


            <div className="tu-modal" style={modal ? {opacity: "1", visibility: "visible"} : {}}>
                <div className="tu-modal-card">
                    <IoCloseCircle className="close-button" onClick={() => {setModal(false); toggleScrollable(false);}} />
                    <div className="tu-modal-head">
                        <FaFrownOpen className="icon" />
                        <span>
                            Do you want to redeem this reward?
                        </span>
                    </div>
                    <div className="tu-modal-body">
                        <p>{modalValue.RewardID} : {modalValue.RewardName} need {modalValue.Point} Points</p>
                    </div>
                    <div className="tu-modal-footer">
                        <div className="cancel-button" onClick={() => {setModal(false); toggleScrollable(false);}}>No, keep my point.</div>
                        <div className="accept-button" onClick={() => {redeemReward(modalValue);setModal(false); toggleScrollable(false)}}>Yes, I want to redeem.</div>
                    </div>
                </div>
            </div>

            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    );
}

export default Store;