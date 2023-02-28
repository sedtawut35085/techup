import React from 'react';
//import { BsChevronLeft , BsChevronDoubleLeft , BsChevronRight , BsChevronDoubleRight} from 'react-icons/bs';
import { HiChevronDoubleLeft , HiChevronLeft , HiChevronRight , HiChevronDoubleRight } from 'react-icons/hi';
import BackgroundIcon from '../../components/background/bgIcons.js';

function Store() {
    //const [rewards, setReward] = useState(defaultValue || [{ reward: "", type: {label: "", image: "",point:""}}]);
    const rewards = [1,2,3,4,5,6]
    const btnPages = [1,2,3,4]


    const listPages = btnPages.map((page) => 
        <div className="btn-page bg-color-white sh-sm">
            <span>{page}</span>
        </div>
    )    

    const listRewards = rewards.map((reward) => 
        <div className="col-4 text-center justify-content-center">
            <div className="reward-frame sh-lg">
                <img className="reward-image" width="100%" src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"></img>
                <div className="row-reward ai-center d-flex justify-content-between align-items-center">
                    <span>{reward}</span>
                    <div className="point">999 P</div>
                </div>
            </div>
        </div>
    )
    return (
        <div className="store">
            <div className="cover-container">
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
            </div>
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    );
}

export default Store;