
import { useNavigate } from 'react-router-dom'
import { FaThList, FaUsersCog, FaMotorcycle, FaSignOutAlt } from 'react-icons/fa'
import { useState } from 'react'

const Sidebar = () => {

    return (
        <div className='bg-white'>
            <div className='m-2'>
                <i className='bi bi-bootstrap-fill me-2 fs'></i>
                <span className='brand-name fs-4'>Yorname</span>
            </div>
            <hr className='text-dark' />
            <div className='list-group list-group-flush'>
                <a className='list-group-item py-2'>
                    <FaThList></FaThList>
                    <span className='m-4'>Dashboard</span>
                </a>
                <a className='list-group-item py-2'>
                    <FaThList></FaThList>
                    <span className='m-4'>Home</span>
                </a>
                <a className='list-group-item py-2'>
                    <FaThList></FaThList>
                    <span className='m-4'>eiei3</span>
                </a>
                <a className='list-group-item py-2'>
                    <FaThList></FaThList>
                    <span className='m-4'>eiei4</span>
                </a>
            </div>

          
        </div>
    )
}

export default Sidebar