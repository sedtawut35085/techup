
import { useNavigate } from 'react-router-dom'
import { FaThList, FaUsersCog, FaMotorcycle, FaSignOutAlt } from 'react-icons/fa'
import { useState } from 'react'

const Navbar = ({logout,currentEmailUser}) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white px-3 border-bottom border-black">
        <div className="container-fluid fs-4">
          {/* <FaThList onClick={Toggle}></FaThList> */}
          <a className="navbar-brand" href="#"></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className='fs-6 m-2'>{currentEmailUser}</span>
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {/* <li><a className="dropdown-item" href="#">{currentEmailUser}</a></li>
                  <li><hr className="dropdown-divider"/></li> */}
                  <li><a className="dropdown-item logout" onClick={logout}>logout</a></li>
                </div>
              </li>
            </ul>
            {/* <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
          </div>
        </div>
      </nav>
    )
}

export default Navbar