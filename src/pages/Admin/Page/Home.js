import { FaUserAlt, FaChalkboardTeacher } from 'react-icons/fa'
import { MdTopic } from 'react-icons/md'
import { getAdminCountUser, getCountAllTopic, getCountAllProfessor } from '../../../service/admin'
import React, { useState, useEffect } from 'react'

const HomeDashboard = ({currentPage}) =>{

    const [isLoading, setIsLoading] = useState(true)
    const [isLoading1, setIsLoading1] = useState(true)
    const [isLoading2, setIsLoading2] = useState(true)
    const [countUser, setCountUser] = useState(null)
    const [countTopic, setCountTopic] = useState(null)
    const [countProfessor, setCountProfessor] = useState(null)
    async function loadCountOfUser() {
        let res = await getAdminCountUser()
        setCountUser(res[0]["count(*)"])
        setIsLoading(false)
    }

    async function loadCountOfTopic() {
        let res = await getCountAllTopic()
        setCountTopic(res[0]["count(*)"])
        setIsLoading1(false)
    }

    async function loadCountOfProfessor() {
        let res = await getCountAllProfessor()
        setCountProfessor(res[0]["count(*)"])
        setIsLoading2(false)
    }

    useEffect( () => {
        loadCountOfUser()
        loadCountOfTopic()
        loadCountOfProfessor()
    }, []);

    return (
        <div className='container-fluid'> 
                {
                (isLoading === true) && (isLoading1 === true) && (isLoading2 === true) &&
                <div className="loader2">
                    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                </div>
                }
                { (isLoading === false) && (isLoading1 === false) && (isLoading2 === false) &&
                <div className='row g-3 my-2'>
                    <span className='pt-2 f-lg fw-600'>{currentPage}</span>
                    <div className='col-md-6'>
                        <div className="card text-dark bg-light mb-3">
                            <h5 className="card-header text-muted"><FaUserAlt className='m-2'></FaUserAlt>User & Professor</h5>
                            <div className="card-body">
                                <h5 className="card-title f-md text-muted ">Amount of Student : Professor</h5>
                                <p className="card-text text-muted">{countUser} : {countProfessor}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="card text-dark bg-light mb-3">
                            <h5 className="card-header text-muted"><MdTopic className='m-2'></MdTopic>Topic & Question</h5>
                            <div className="card-body">
                                <h5 className="card-title f-md text-muted">Amount of Topic</h5>
                                <p className="card-text text-muted">{countTopic}</p>
                            </div>
                        </div> 
                    </div>
                    {/* <span className='pt-2 f-lg fw-600'>Recent Reward</span> */}
                    {/* <div className='table-responsive px-4'>
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
                                </tr>
                                <tr>
                                    <td className="title thai col-12">
                                        62090500450 - Sedtawut Chalothornnarumit
                                        <br/><span className='f-sm color-gray2'>Date Redeem Point 01/01/2022 - Type Reward T-shirt - Redeem Point 560</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                    </div> */}
                </div>
                }
            </div>
    )
}

export default HomeDashboard