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
        <div className="navBar">
            <ul>
                <li className="brand">
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: "white" }}
                    >
                        <b>Planning Dashboard</b>
                    </Link>
                </li>
                <li className="brand">
                    <Link
                        to="/teams"
                        style={{ textDecoration: "none", color: "white" }}
                    >
                        <b>Teams View</b>
                    </Link>
                </li>
                <li className="brand">
                    <Link
                        to="/alltasks"
                        style={{ textDecoration: "none", color: "white" }}
                    >
                        <b>View All Tasks</b>
                    </Link>
                </li>

                <li>
                    {user ? (
                        <button onClick={logoutUser}>Logout</button>
                    ) : (
                        <button onClick={() => navigate("/login")}>
                            Login
                        </button>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
