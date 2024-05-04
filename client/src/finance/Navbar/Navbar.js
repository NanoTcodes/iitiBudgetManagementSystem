import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import logo from "../../assets/images/iitindorelogo.png";
import { Link, useNavigate } from "react-router-dom";
import YearContext from "../../contexts/year/YearContext";
import AlertContext from "../../contexts/alert/AlertContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [years] = useState(() => {
    let years = [];
    for (let i = 2021; i <= new Date().getFullYear()+10; i++) years.push(i);
    return years;
  });
  const { setYear, year } = useContext(YearContext);
  const { successful, unSuccessful } = useContext(AlertContext);
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) navigate("/");
  }, []);

  const logOut = () => {
    localStorage.clear("authToken");
    navigate("/");
  };

  const changeYear = (i) => {
    setYear(i);
  };

  const addNewYear = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/admin/newYear`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ curr_year: year }),
      }
    );
    const json = await response.json();
    if (json.error) unSuccessful(json.error);
    else successful("New year added successfully!");
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg custom-navbar">
          <div className="container-fluid">
            <div className="container2">
              <Link className="navbar-brand" to="/finance">
                <img
                  src={logo}
                  alt="Logo"
                  width="60"
                  className="d-inline-block align-text-top"
                />
              </Link>
              <h5 className="nav-title">Budget Allocation IIT Indore</h5>
            </div>

            <div className="justify-content-between">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/finance"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      onClick={addNewYear}
                    >
                      Add new Year
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Change Year
                    </Link>
                    <ul className="dropdown-menu">
                      {years.map((year, i) => {
                        return (
                          <li
                            role="button"
                            className="dropdown-item"
                            key={i}
                            onClick={() => changeYear(year)}
                          >
                            {year}-{(year % 100) + 1}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                  {role == 2 && (
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle"
                        to="/"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Manage Users
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to="/finance/adduser">
                            Add new user/dept
                          </Link>
                        </li>
                        <hr className="dropdown-divider" />
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/finance/allusers"
                          >
                            View all users/depts
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}

                  <li
                    className="nav-item nav-link active"
                    role="button"
                    onClick={logOut}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
