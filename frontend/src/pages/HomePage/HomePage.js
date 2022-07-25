import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import AddLoeForm from "../../components/AddLoeForm/AddLoeForm";
import axios from "axios";
import DisplayGoogleChart from "../../components/DisplayGoogleChart/DisplayGoogleChart";
import DisplayLineOfEffort from "../../components/DisplayLineOfEffort/DisplayLineOfEffort";
import DisplayTeams from "../../components/DisplayTeams/DisplayTeams";
import AddTeamForm from "../../components/AddTeamForm/AddTeamForm";

const HomePage = () => {
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
        getLinesOfEffort();
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
        try {
            let response = await axios.get(
                "http://127.0.0.1:8000/api/LRPlanner/asset/"
            );
            // console.log("response", response.data);
            setTeams(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    // console.log("tasks", tasks);

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
        // console.log("pk", pk);
        let response = await axios.delete(
            `http://127.0.0.1:8000/api/LRPlanner/loedelete/${pk}/`
        );
        getLinesOfEffort();
    }

    async function deleteTask(pk) {
        // console.log("pk", pk);
        let response = await axios.delete(
            `http://127.0.0.1:8000/api/LRPlanner/tasks/${pk}/`
        );
        //getTeams();
    }

    async function deleteTeam(pk) {
        // console.log("pk", pk);
        let response = await axios.delete(
            `http://127.0.0.1:8000/api/LRPlanner/asset/${pk}/`
        );
        getLinesOfEffort();
    }

    async function createTeam(newTeam) {
        try {
            let response = await axios.post(
                `http://127.0.0.1:8000/api/LRPlanner/asset/`,
                newTeam
            );
            getLinesOfEffort();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="" style={{margin: 20}}>
            {/* <h1>Home Page for {user.username}!</h1> */}

            <input 
                type="button"
                value="Add New Project"
                onClick={togglePopup}
                className="btn btn-primary btn-sm"
            />
            {isOpen && (
                <AddLoeForm
                    createNewLoe={createNewLoe}
                    handleClose={togglePopup}
                />
            )}

            <div >
                {teams.length > 0 && linesOfEffort.length > 0 ? (
                    <DisplayLineOfEffort
                        linesOfEffort={linesOfEffort}
                        deleteLineOfEffort={deleteLineOfEffort}
                        deleteTask={deleteTask}
                        teams={teams}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default HomePage;
