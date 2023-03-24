import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import BackgroundIcon from '../../components/background/bgIcons.js';

import { FaChevronLeft} from 'react-icons/fa';
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import SelectPicker2 from '../../components/picker_select/selectPicker2.js'

function SubmitProf() {

    const statusAll = [
        {label: "Available", data: "available"},
        {label: "Ongoing", data: "ongoing"},
        {label: "Submitted", data: "submitted"}
    ]
    const [status, setStatus] = useState({label: "", data: ""})

    const difficultyAll = [
        {label: "Easy", data: "Easy"},
        {label: "Normal", data: "Normal"},
        {label: "Hard", data: "Hard"}
    ]
    const [difficulty, setDifficulty] = useState({label: "", data: ""})

    const [search, setSearch] = useState("")

    return (
        <div className="submit">
            <div className="cover-container">
            <Link className="btn-back" to="/professor">
                <FaChevronLeft />
            </Link>
            <div className="submit-main d-flex fd-col">                           
                <div className="submit-section">
                        <div className="mb-4">
                            <div className='d-flex jc-btw'>
                                <span className="f-lg fw-700">All Submissions</span>
                            </div>
                        </div>
                        <div className="filter mb-4">
                            <SelectPicker2
                            id='status'
                            placeholder="Status"
                            data={statusAll}
                            defaultValue={status}
                            setValue={setStatus}
                            />
                            <SelectPicker2
                            id='difficulty'
                            placeholder="Difficulty"
                            data={difficultyAll}
                            defaultValue={difficulty}
                            setValue={setDifficulty}
                            />
                            <div className="search-box">
                                <FiSearch size={24} className="me-1" />
                                <input 
                                placeholder="Search submit..."
                                onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="submit-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="title">Title </th>
                                        <th className="topic">Topic - Question </th>
                                        <th className="status">Status </th>
                                        <th className="duedate">Due Date </th>
                                        <th className="datesubmit">Date Submission </th>
                                        <th className="action">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="title thai">Sedtawut chalothornnarumit</td>
                                        <td className="topic thai">OS - Kernel คืออะไร</td>
                                        <td className="status thai color-12">Unchecked</td>
                                        <td className="duedate thai">05-12-2022</td>
                                        <td className="datesubmit thai">05-12-2022, 00:00</td>
                                        <td className="point-table">
                                            <div className="col-12">
                                                <button type="submit" className="btnsubmit-viewdetail">View Detail</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="title thai">Sedtawut chalothornnarumit</td>
                                        <td className="topic thai">OS - Kernel คืออะไร</td>
                                        <td className="status thai color-12">Unchecked</td>
                                        <td className="duedate thai">05-12-2022</td>
                                        <td className="datesubmit thai">05-12-2022, 00:00</td>
                                        <td className="point-table">
                                            <div className="col-12">
                                                <button type="submit" className="btnsubmit-viewdetail">View Detail</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="title thai">Sedtawut chalothornnarumit</td>
                                        <td className="topic thai">OS - Kernel คืออะไร</td>
                                        <td className="status thai color-3">checked</td>
                                        <td className="duedate thai">05-12-2022</td>
                                        <td className="datesubmit thai">05-12-2022, 00:00</td>
                                        <td className="point-table">
                                            <div className="col-12">
                                                <button type="submit" className="btnsubmit-viewdetail">View Detail</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>                                                     
                        </div>
                        <div className="pagination1">
                            <div className="display-per-page">
                                <span>Display per page</span>
                                <select className="page">
                                    <option default>5</option>
                                    <option>10</option>
                                    <option>25</option>
                                </select>
                            </div>
                            <div className="pagination-number">
                                <span className="arrow disable"><FiChevronsLeft /></span>
                                <span className="arrow disable"><FiChevronLeft /></span>
                                <span className="number active">1</span>
                                <span className="number">2</span>
                                <span className="number">3</span>
                                <span className="number">4</span>
                                <span className="number">5</span>
                                <span className="arrow"><FiChevronRight /></span>
                                <span className="arrow"><FiChevronsRight /></span>
                            </div>
                        </div>
                    </div>                     
            </div>
            </div>
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    );
}

export default SubmitProf;