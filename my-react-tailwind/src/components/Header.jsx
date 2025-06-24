import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../Redux/slices/userLoginSlice";

function Header() {
  const { currentUser, loginStatus } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  function signout() {
    sessionStorage.removeItem("token");
    dispatch(resetState());
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark fs-5">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="Logo" width="60" />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {loginStatus === false ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/signup">
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/signin">
                    Sign In
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink
                  className="nav-link d-flex align-items-center text-white"
                  to="/signin"
                  onClick={signout}
                >
                  <span className="me-2 text-capitalize fw-bold">
                    {currentUser.username}
                    <sup className="ms-1 text-warning" style={{ fontSize: "0.9rem" }}>
                      ({currentUser.userType})
                    </sup>
                  </span>
                  <span className="badge bg-danger">Sign Out</span>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
