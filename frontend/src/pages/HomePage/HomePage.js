import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import AddLoeForm from "../../components/AddLoeForm/AddLoeForm";
import axios from "axios";
import DisplayGoogleChart from "../../components/DisplayGoogleChart/DisplayGoogleChart";
import DisplayLineOfEffort from "../../components/DisplayLineOfEffort/DisplayLineOfEffort";

const HomePage = () => {
    // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
    // The "token" value is the JWT token that you will send in the header of any request requiring authentication
    //TODO: Add an AddCars Page to add a car for a logged in user's garage
    const [user, token] = useAuth();
    const [linesOfEffort, setLinesOfEffort] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    async function createNewLoe(loeName) {
        try {
            let response = await axios.post(
                `http://127.0.0.1:8000/api/LRPlanner/`,
                loeName
            );
            getLinesOfEffort();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLinesOfEffort();
    }, []);

    async function getLinesOfEffort() {
        try {
            let response = await axios.get(
                "http://127.0.0.1:8000/api/LRPlanner/"
            );
            setLinesOfEffort(response.data);
        } catch (error) {
            console.log(error);
        }
        console.log(linesOfEffort);
    }

    return (
        <div className="container">
            {/* <AddLoeForm handleClose={togglePopup} createNewLoe={createNewLoe} /> */}
            {/* <h1>Home Page for {user.username}!</h1> */}
            <li>
                    <input
                        type="button"
                        value="Add New Project"
                        onClick={togglePopup}
                        className="inputone"
                    />
                    {isOpen && (
                        <AddLoeForm createNewLoe={createNewLoe} handleClose={togglePopup}  />
                    )}
                </li>
            <div>
                <DisplayLineOfEffort linesOfEffort={linesOfEffort} />
            </div>
        </div>
    );
};

export default HomePage;
