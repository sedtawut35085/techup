import { FaUserAlt, FaChalkboardTeacher } from 'react-icons/fa'
import { MdTopic } from 'react-icons/md'
import { getAdminCountUser } from '../../../service/admin'
import React, { useState, useEffect } from 'react'

const HomeDashboard = ({currentPage}) =>{
    const [countUser, setCountUser] = useState(null)
    async function loadCountOfUser() {
        let res = await getAdminCountUser()
        setCountUser(res[0]["count(*)"])
    }

    useEffect( () => {
        loadCountOfUser();
    }, []);
    return (
        <div className='container-fluid'> 
                <div className='row g-3 my-2'>
                    <span className='pt-2 f-lg fw-600'>{currentPage}</span>
                    <div className='col-md-6'>
                        <div className="card text-dark bg-light mb-3">
                            <h5 className="card-header text-muted"><FaUserAlt className='m-2'></FaUserAlt>User & Professor</h5>
                            <div className="card-body">
                                <h5 className="card-title f-md text-muted">Amount of Student : Professor</h5>
                                <p className="card-text text-muted">{countUser} : 4</p>
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
                    <span className='pt-2 f-lg fw-600'>Recent Reward</span>
                    <div className='table-responsive px-4'>
                        <table className="table">
                            <thead>
                                    <tr>
                                        <th className="title">Title </th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="title thai col-12">
                                        62090500450 - Sedtawut Chalothornnarumit
                                        <br/><span className='f-sm color-gray2'>Date Redeem Point 01/01/2022 - Type Reward T-shirt - Redeem Point 560</span>
                                    </td>
                                    {/* <td className="point-table">
                                        <div className="col-4 col-md-8 col-sm-auto pt-2">
                                            <div className="btn-view-detail">View Detail</div>
                                        </div>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td className="title thai col-12">
                                        62090500450 - Sedtawut Chalothornnarumit
                                        <br/><span className='f-sm color-gray2'>Date Redeem Point 01/01/2022 - Type Reward T-shirt - Redeem Point 560</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="title thai col-12">
                                        62090500450 - Sedtawut Chalothornnarumit
                                        <br/><span className='f-sm color-gray2'>Date Redeem Point 01/01/2022 - Type Reward T-shirt - Redeem Point 560</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="title thai col-12">
                                        62090500450 - Sedtawut Chalothornnarumit
                                        <br/><span className='f-sm color-gray2'>Date Redeem Point 01/01/2022 - Type Reward T-shirt - Redeem Point 560</span>
                                    </td>
                                    {/* <td className="point-table">
                                        <div className="col-4 col-md-8 col-sm-auto pt-2">
                                            <div className="btn-view-detail">View Detail</div>
                                        </div>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td className="title thai col-12">
                                        62090500450 - Sedtawut Chalothornnarumit
                                        <br/><span className='f-sm color-gray2'>Date Redeem Point 01/01/2022 - Type Reward T-shirt - Redeem Point 560</span>
                                    </td>
                                    {/* <td className="point-table">
                                        <div className="col-4 col-md-8 col-sm-auto pt-2">
                                            <div className="btn-view-detail">View Detail</div>
                                        </div>
                                    </td> */}
                                </tr>
                                </tbody>
                            </table>
                    </div>
                </div>
            </div>
    )
}

export default HomeDashboard