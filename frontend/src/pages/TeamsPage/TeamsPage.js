import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import AddTeamForm from "../../components/AddTeamForm/AddTeamForm";
import DisplayTeams from "../../components/DisplayTeams/DisplayTeams";



const TeamsPage = () => {
    const [teams, setTeams] = useState([]);
    const [tasks, setTasks] = useState([]);

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
    // console.log("tasks", tasks);

    useEffect(() => {
        async function getTeams() {
            try {
                let response = await axios.get(
                    "http://127.0.0.1:8000/api/LRPlanner/asset/"
                );
                // console.log("response", response.data);
                setTeams(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getTeams();
    }, []);

    async function deleteTeam(pk) {
        // console.log("pk", pk);
        let response = await axios.delete(
            `http://127.0.0.1:8000/api/LRPlanner/asset/${pk}/`
        );
        //getLinesOfEffort();
    }

    async function createTeam(newTeam) {
        try {
            let response = await axios.post(
                `http://127.0.0.1:8000/api/LRPlanner/asset/`,
                newTeam
            );
            //getTeams();
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div>
             <div>
                <AddTeamForm createTeam={createTeam} />
                <DisplayTeams
                    teams={teams}
                    tasks={tasks}
                    deleteTeam={deleteTeam}
                />
            </div>
        </div>
    );
};

export default TeamsPage;