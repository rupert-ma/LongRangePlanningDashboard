import React from "react";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import AddLoeForm from "../AddLoeForm/AddLoeForm";
import axios from "axios";

const Navbar = () => {
    const { logoutUser, user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid">
            <div class="container-fluid">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link
                            to="/"
                            style={{ textDecoration: "none", color: "white" }}
                        >
                            <h1
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                }}
                            >
                                Planning Dashboard
                            </h1>
                        </Link>
                    </li>
                </ul>
                <div className="d-flex">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link
                                to="/"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                }}
                            >
                                <p>Main | </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/teams"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                }}
                            >
                                <p>Teams View | </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/alltasks"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                }}
                            >
                                <p>View All Tasks </p>
                            </Link>
                        </li>

                        <li>
                            {user ? (
                                <button
                                    className=" nav-item btn btn-secondary btn-sm"
                                    onClick={logoutUser}
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
