import { FaUserAlt, FaChalkboardTeacher } from 'react-icons/fa'
import { MdTopic } from 'react-icons/md'

const HomeDashboard = ({currentPage}) =>{
    return (
        <div className='container-fluid'>
                <div className='row g-3 my-2'>
                    <span className='pt-2 f-lg fw-600'>{currentPage}</span>
                    <div className='col-md-6'>
                        <div className="card text-dark bg-light mb-3">
                            <h5 className="card-header text-muted"><FaUserAlt className='m-2'></FaUserAlt>User & Professor</h5>
                            <div className="card-body">
                                <h5 className="card-title f-md text-muted">Amount of Student</h5>
                                <p className="card-text text-muted">200</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="card text-dark bg-light mb-3">
                            <h5 className="card-header text-muted"><MdTopic className='m-2'></MdTopic>Topic & Question</h5>
                            <div className="card-body">
                                <h5 className="card-title f-md text-muted">Amount of Topic</h5>
                                <p className="card-text text-muted">10</p>
                            </div>
                        </div> 
                    </div>
                    <span className='pt-2 f-lg fw-600'>Recent Submission</span>
                    <div className='table-responsive px-4'>
                        <table className="table">
                            <thead>
                                    <tr>
                                        <th className="title">Title </th>
                                        <th className="action">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="title thai col-8">Sedtawut Chalothornnarumit<br/><span className='f-xs color-gray2'>Submission Date 01/01/2022 - Kernel คืออะไร - Operating System</span></td>
                                    <td className="point-table">
                                        <div className="col-4 col-md-8 col-sm-auto pt-2">
                                            <div className="btn-view-detail">View Detail</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="title thai col-8">Sedtawut Chalothornnarumit<br/><span className='f-xs color-gray2'>Submission Date 01/01/2022 - Kernel คืออะไร - Operating System</span></td>
                                    <td className="point-table">
                                        <div className="col-4 col-md-8 col-sm-auto pt-2">
                                            <div className="btn-view-detail">View Detail</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="title thai col-8">Sedtawut Chalothornnarumit<br/><span className='f-xs color-gray2'>Submission Date 01/01/2022 - Kernel คืออะไร - Operating System</span></td>
                                    <td className="point-table">
                                        <div className="col-4 col-md-8 col-sm-auto pt-2">
                                            <div className="btn-view-detail">View Detail</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="title thai col-8">Sedtawut Chalothornnarumit<br/><span className='f-xs color-gray2'>Submission Date 01/01/2022 - Kernel คืออะไร - Operating System</span></td>
                                    <td className="point-table">
                                        <div className="col-4 col-md-8 col-sm-auto pt-2">
                                            <div className="btn-view-detail">View Detail</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="title thai col-8">Sedtawut Chalothornnarumit<br/><span className='f-xs color-gray2'>Submission Date 01/01/2022 - Kernel คืออะไร - Operating System</span></td>
                                    <td className="point-table">
                                        <div className="col-4 col-md-8 col-sm-auto pt-2">
                                            <div className="btn-view-detail">View Detail</div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                    </div>
                </div>
            </div>
    )
}

export default HomeDashboard