

import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const isLoggedIn = user !== null;

  const onLogout = () => {
    handleLogout();
    navigate("/", { state: { message: "You have been logged out!" } });
  };

  if (!isLoggedIn) return null;

  return (
    <>
      <li>
        <Link className="dropdown-item" to={"/profile"}>
          Profile
        </Link>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <li>
        <button type="button" className="dropdown-item" onClick={onLogout}>
          Logout
        </button>
      </li>
    </>
  );
};

export default Logout;
