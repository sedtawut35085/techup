
import { useNavigate } from 'react-router-dom'
import { FaUserAlt, FaChalkboardTeacher } from 'react-icons/fa'
import { BsFillGrid1X2Fill } from 'react-icons/bs'
import { RiDiscussFill } from 'react-icons/ri'
import { IoMdArrowDropdown,IoMdArrowDropup } from 'react-icons/io'
import { GiDiscussion } from 'react-icons/gi'
import { GoReport } from 'react-icons/go'
import { useState } from 'react'

const Sidebar = ({handleChangePage,currentPage}) => {

    const [toggleDiscussandReport,setToggleDiscussandReport] = useState(true)

    const toggleChangeDiscussandReport = () => {
        setToggleDiscussandReport(!toggleDiscussandReport)
    }

    return (  
        <div className="d-flex flex-column align-items-center align-items-sm-start px-2 pt-2 min-vh-100 border-right border-black">
            <a href="/" className="d-flex align-items-center py-4 px-2 mb-md-0 me-md-auto color-1 text-decoration-none border-bottom border-black">
                <img className="sign-logo" alt="logo" width="30px" height="30px" src="/assets/images/logo/logo.png" /><span className="f-xl fw-600 d-none d-sm-inline">TECHUP</span>
            </a>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0" id="menu">
                <li className="nav-item pt-4 list-group">
                    <div className={`nav-link align-middle px-2  ${currentPage === "Home" ? "list-group-active" : ""}`} onClick={(e) => handleChangePage(e, 'Home')}>
                        <BsFillGrid1X2Fill className="fs-6"></BsFillGrid1X2Fill> <span className="ms-1 d-none d-sm-inline">Home</span>
                    </div>
                </li>
                <li className="nav-item pt-4 list-group">
                    <div className={`nav-link align-middle px-2  ${currentPage === "User" ? "list-group-active" : ""}`} onClick={(e) => handleChangePage(e, 'User')}>
                        <FaUserAlt className="fs-6"></FaUserAlt> <span className="ms-1 d-none d-sm-inline">User</span>
                    </div>
                </li>
                <li className="nav-item pt-4 list-group">
                    <div className={`nav-link align-middle px-2  ${currentPage === "Professor" ? "list-group-active" : ""}`} onClick={(e) => handleChangePage(e, 'Professor')}>
                        <FaChalkboardTeacher className="fs-6"></FaChalkboardTeacher> <span className="ms-1 d-none d-sm-inline">Professor</span>
                    </div>
                </li>
                <li className='pt-4'>
                    <a href="#submenu1" data-bs-toggle="collapse" className="px-2 align-middle" onClick={toggleChangeDiscussandReport}>
                        {toggleDiscussandReport === true ?
                            <>
                                <RiDiscussFill className="fs-6"></RiDiscussFill> <span className="ms-1 d-none d-sm-inline">Disscuss & Report <IoMdArrowDropdown className="fs-6"></IoMdArrowDropdown></span>
                            </>
                            :
                            <>
                                <RiDiscussFill className="fs-6"></RiDiscussFill> <span className="ms-1 d-none d-sm-inline">Disscuss & Report <IoMdArrowDropup className="fs-6 icon-flipped"></IoMdArrowDropup></span>
                            </>
                        }
                    </a>
                    <ul className="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                        <li className="nav-item w-100 px-4 list-group pt-3">
                            <div className={`nav-link align-middle px-2  ${currentPage === "Discuss" ? "list-group-active" : ""}`} onClick={(e) => handleChangePage(e, 'Discuss')}><GiDiscussion className="fs-6 mx-2"></GiDiscussion><span className="ms-1 d-none d-sm-inline">Discuss</span></div>
                        </li>
                        <li className='nav-item px-4 pt-2 list-group'>
                            <div className={`nav-link align-middle px-2  ${currentPage === "Report" ? "list-group-active" : ""}`} onClick={(e) => handleChangePage(e, 'Report')}><GoReport className="fs-6 mx-2"></GoReport><span className="ms-1 d-none d-sm-inline">Report</span></div>
                        </li>
                    </ul>
                </li>
            </ul>
            <hr/>
            {/* <div className="dropdown pb-4">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle"/>
                    <span className="d-none d-sm-inline mx-1">loser</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li>
                        <hr className="dropdown-divider"/>
                    </li>
                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div> */}
        </div>
        // <div className='bg-white border-right'>
            // <div className='mx-3 mt-3'>
            //     <span className='brand-name fs-4'><img className="sign-logo mb-2" alt="logo" width="30px" height="25px" src="/assets/images/logo/logo.png" /><span className='color-1 f-xl fw-500'>TECHUP</span></span>
            // </div>
        //     <hr className='text-dark' />
        //     <div className='list-group list-group-flush'>
        //         <a className='list-group-item py-2'>
        //             <FaThList></FaThList>
        //             <span className='m-3'>Dashboard</span>
        //         </a>
        //         <a className='list-group-item py-2'>
        //             <FaThList></FaThList>
        //             <span className='m-3'>Home</span>
        //         </a>
        //         <a className='list-group-item py-2'>
        //             <FaThList></FaThList>
        //             <span className='m-3'>eiei3</span>
        //         </a>
        //         <a className='list-group-item py-2'>
        //             <FaThList></FaThList>
        //             <span className='m-3'>eiei4</span>
        //         </a>
        //     </div>

          
        // </div>
    )
}

export default Sidebar