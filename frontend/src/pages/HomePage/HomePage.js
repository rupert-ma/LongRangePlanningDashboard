import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import AddLoeForm from "../../components/AddLoeForm/AddLoeForm";
import axios from "axios";
import DisplayGoogleChart from "../../components/DisplayGoogleChart/DisplayGoogleChart";
import DisplayLineOfEffort from "../../components/DisplayLineOfEffort/DisplayLineOfEffort";
import DisplayTeams from "../../components/DisplayTeams/DisplayTeams";

const HomePage = () => {
    // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
    // The "token" value is the JWT token that you will send in the header of any request requiring authentication
    //TODO: Add an AddCars Page to add a car for a logged in user's garage
    const [user, token] = useAuth();
    const [linesOfEffort, setLinesOfEffort] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [teams, setTeams] = useState([]);
    const [tasks, setTasks] = useState([]);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        try {
            let response = await axios.get(
                "http://127.0.0.1:8000/api/LRPlanner/tasks/"
            );
            setTasks(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    console.log("tasks", tasks);

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

    useEffect(() => {
        async function getTeams() {
            try {
                let response = await axios.get(
                    "http://127.0.0.1:8000/api/LRPlanner/asset/"
                );
                console.log("response", response.data);
                setTeams(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getTeams();
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
        // console.log(linesOfEffort);
    }

    async function deleteLineOfEffort(pk) {
        console.log("pk", pk);
        let response = await axios.delete(
            `http://127.0.0.1:8000/api/LRPlanner/loedelete/${pk}/`
        );
        getLinesOfEffort();
    }

    async function deleteTask(pk) {
        console.log("pk", pk);
        let response = await axios.delete(
            `http://127.0.0.1:8000/api/LRPlanner/tasks/${pk}/`
        );
        getLinesOfEffort();
    }

    return (
        <div className="container">
            {/* <h1>Home Page for {user.username}!</h1> */}

            <input
                type="button"
                value="Add New Project"
                onClick={togglePopup}
                className="inputone"
            />
            {isOpen && (
                <AddLoeForm
                    createNewLoe={createNewLoe}
                    handleClose={togglePopup}
                />
            )}

            <div>
                <DisplayLineOfEffort
                    linesOfEffort={linesOfEffort}
                    deleteLineOfEffort={deleteLineOfEffort}
                    deleteTask={deleteTask}
                />
            </div>
            <div>
                <DisplayTeams teams={teams} tasks={tasks} />
            </div>
        </div>
    );
};

export default HomePage;

//timeline that lists assets instead of tasks, shows bar if tasked
