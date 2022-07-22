import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import AddTeamForm from "../../components/AddTeamForm/AddTeamForm";
import DisplayTeams from "../../components/DisplayTeams/DisplayTeams";

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getTasks();
        getTeams();
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

    const sortedTasks = tasks.sort((a, b) => {
        console.log('a',a.start_date)
        console.log('b',b.start_date)
        return new Date(a.start_date) - new Date(b.start_date);
    });

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

    return (
        <div>
            <table className="table-layout">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Team Tasked</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTasks.map((task, index) => {
                        //console.log(task.id);
                        return (
                            <tr key={index}>
                                <td>{task.name}</td>
                                <td>{task.start_date}</td>
                                <td>{task.end_date}</td>
                                <td>{teams[task.asset_id].name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TasksPage;
