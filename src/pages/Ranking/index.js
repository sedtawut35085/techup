import React,{ useState } from 'react';
import { Link } from 'react-router-dom';

import { defaultProfileImg } from '../../assets/js/helper'

import { HiOutlineEye } from 'react-icons/hi'
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { FaSort } from 'react-icons/fa';

import SelectPicker3 from '../../components/picker_select/selectPicker3.js'
import UserData from '../../assets/data/user-data.json'
import BackgroundIcon from '../../components/background/bgIcons.js';

function Ranking() {

    const [userData, setUserData] = useState(UserData)
    const filterAll = [
        {label: "This week", data: "week"},
        {label: "This month", data: "month"},
        {label: "This year", data: "year"},
        {label: "Whole time", data: "all"},
    ]
    const [filter, setFilter] = useState({label: "Whole time", data: "all"})
    const [search, setSearch] = useState("")

    return (
        <div className="ranking-page">
            <div className="cover-container">
                <div className="ranking-header">
                    <p data-aos="fade-up" data-aos-duration="1000" className="f-xl fw-800">Leaderboard<span className="color-1 f-xl fw-800 ms-2">TECHUP</span></p>
                    <SelectPicker3 
                        id="filter"
                        placeholder="-"
                        data={filterAll}
                        defaultValue={filter}
                        setValue={setFilter}
                    />
                </div>
                <div className="ranking-top-3">
                    {
                        userData.map((user, key) => (
                            (key < 3) &&
                            <div key={key} data-aos="fade-up" data-aos-duration="1000" data-aos-delay={key * 200} className="top-card">
                                <div className="user-info">                                    
                                    <Link className="user-profile">
                                        <img alt="Avatar" onError={defaultProfileImg} src={user.ImageURL}></img>
                                        <span className="number" id={"no-" + (key + 1)}>
                                            {
                                                key === 0
                                                ? "1st"
                                                : key === 1
                                                ? "2nd"
                                                : "3rd"
                                            }
                                        </span>
                                    </Link>
                                    <span className="f-md">{user.TechUpID}</span>
                                    <span className="point">{user.Point} P</span>
                                </div>
                                <Link className="see-profile">
                                    <span><HiOutlineEye size={20} /> See profile</span>
                                </Link>
                            </div>
                        ))
                    }
                </div> 
                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600" className="search-section">
                    <div className="search-box-1">
                        <FiSearch size={22} className="me-1 color-gray2" />
                        <input 
                            value={search}
                            placeholder="Search..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>      
                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                    <div className="ranking-table">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="number">Rank No. <FaSort /></th>
                                    <th className="id">TechUp ID <FaSort /></th>
                                    <th className="points">Points <FaSort /></th>
                                    <th className="action">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userData.map((user, key) => (
                                        (key > 2) &&
                                        <tr key={key}>
                                            <td className="number">{key + 1}</td>
                                            <td className="id">{user.TechUpID}</td>
                                            <td className="points color-1 fw-600">{user.Point} P</td>
                                            <td className="action"><Link className="btn-view-detail">View Profile</Link></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>                                                      
                    </div>
                    <div className="pagination1">                    
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
                            <select defaultValue="10" className="page">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                            </select>
                            <span>Showing 1-10 of 25</span>
                        </div>
                    </div>
                </div>  
            </div>
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    );
}

export default Ranking;