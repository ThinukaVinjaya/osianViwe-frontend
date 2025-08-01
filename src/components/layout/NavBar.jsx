import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logout from '../auth/Logout';
import { AuthContext } from '../auth/AuthProvider';

const NavBar = () => {
    const [showAccount, setShowAccount] = useState(false);

    const { user } = useContext(AuthContext);

    const handleAccountClick = () => {
        setShowAccount(!showAccount);
    };

    const isLoggedIn = user !== null
    const userRole = user?.roles?.[0]?.name || localStorage.getItem("userRole");

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand hotel-color">
                    OsianView Hotel
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/browse-all-rooms">
                                Browse All Rooms
                            </NavLink>
                        </li>

                        {isLoggedIn && userRole === "ROLE_ADMIN" && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin">
                                    Admin
                                </NavLink>
                            </li>
                        )}
                    </ul>

                    <ul className="navbar-nav d-flex">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/find-booking">
                                Find My Booking
                            </NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded={showAccount}
                                onClick={handleAccountClick}
                            >
                                Account
                            </a>
                            <ul
                                className={`dropdown-menu ${showAccount ? 'show' : ''}`}
                                aria-labelledby="navbarDropdown"
                            >
                                {isLoggedIn ? (
                                    <Logout />
                                ) : (
                                    <li>
                                        <Link className="dropdown-item" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;


