import React from "react";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import AddLoeForm from "../AddLoeForm/AddLoeForm";
import "./NavBar.css";
import axios from "axios";

const Navbar = () => {
    const { logoutUser, user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-primary">
            <ul>
                <li className="brand">
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: "white" }}
                    >
                        <h1>Planning Dashboard</h1>
                    </Link>
                </li>
                <li className="brand">
                    <Link
                        to="/teams"
                        style={{ textDecoration: "none", color: "white" }}
                    >
                        <p>Teams View</p>
                    </Link>
                </li>
                <li className="brand">
                    <Link
                        to="/alltasks"
                        style={{ textDecoration: "none", color: "white" }}
                    >
                        <p>View All Tasks</p>
                    </Link>
                </li>

                <li>
                    {user ? (
                        <button
                            className="btn btn-secondary btn-sm"
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
    );
};

export default Navbar;
