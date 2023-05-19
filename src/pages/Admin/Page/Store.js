import { FaChevronLeft} from 'react-icons/fa';
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'

const Store = ({currentPage}) =>{
    return ( 

        <div className='container-fluid'>
            <div className='row g-3 my-2'>
                <span className='pt-2 f-lg fw-600'>{currentPage}</span>  
                    <div className="table-responsive-lg">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="no">No. </th>
                                    <th className="id">ID</th>
                                    <th className="email">Email </th>
                                    <th className="name">Name </th>
                                    <th className="action">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td className="title thai">1</td>
                                    <td className="topic thai">62090500450</td>
                                    <td className="email thai">Wittanasiri@gmail.com</td>
                                    <td className="name thai">Wittanasiri</td>
                                    <td className="point-table">
                                        <div className="col-12">
                                            <button type="submit" className="btnsubmit-viewdetail">View Detail</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="title thai">1</td>
                                    <td className="topic thai">62090500450</td>
                                    <td className="email thai">Wittanasiri@gmail.com</td>
                                    <td className="name thai">Wittanasiri</td>
                                    <td className="point-table">
                                        <div className="col-12">
                                            <button type="submit" className="btnsubmit-viewdetail">View Detail</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="title thai">1</td>
                                    <td className="topic thai">62090500450</td>
                                    <td className="email thai">Wittanasiri@gmail.com</td>
                                    <td className="name thai">Wittanasiri</td>
                                    <td className="point-table">
                                        <div className="col-12">
                                            <button type="submit" className="btnsubmit-viewdetail">View Detail</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
    )
}

export default Store