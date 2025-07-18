/*import React from 'react'
import { NavLink } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
            <div className='continaer-fluid'>
                <Link to={"/"}>
                    <span className='hotel-color'>lakeSide Hotel</span>
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls='#navbarScroll'
                    aria-expanded="false"
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id="navbarScroll">
                    <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' aria-current="page" to={"/browse-all-rooms"}>
                                Brows all rooms
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' aria-current="page" to={"/admin"}>
                                Admin
                            </NavLink>
                        </li>
                    </ul>
                    <ul className='d-flex navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to={"/find-booking"}>
                                Find my Booking
                            </NavLink>
                        </li>
                        <li className='nav-item dropdown'>
                            <a></a>
                            <ul>
                                <li>
                                    <Link to={"/login"} className="dropdown-item">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/profile"} className="dropdown-item">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/logout"} className="dropdown-item">
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar */

import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const NavBar = () => {
    const [showAccount, setShowAccount] = useState(false)

    const handleAccountClick = () => {
        setShowAccount(!showAccount)
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
            <div className='container-fluid'>
                <Link to={"/"} className=' navbar-brand hotel-color'>
                    OsianViwe Hotel
                </Link>

                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls='navbarScroll'
                    aria-expanded="false"
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div className='collapse navbar-collapse' id="navbarScroll">
                    <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to="/browse-all-rooms">
                                Browse all rooms
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to="/admin">
                                Admin
                            </NavLink>
                        </li>
                    </ul>

                    <ul className='navbar-nav d-flex'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to="/find-booking">
                                Find my Booking
                            </NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={handleAccountClick}
                            >
                                {" "}
                                Account
                            </a>
                            <ul className={`dropdown-menu ${showAccount ? "show" : ""}`}
                                aria-labelledby="navbarDropdown">
                                <li>
                                    <Link to="/login" className="dropdown-item">Login</Link>
                                </li>
                                <li>
                                    <Link to="/profile" className="dropdown-item">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/logout" className="dropdown-item">Logout</Link>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar

