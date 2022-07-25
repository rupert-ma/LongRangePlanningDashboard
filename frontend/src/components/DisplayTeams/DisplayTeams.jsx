import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import AddTeamForm from "../AddTeamForm/AddTeamForm";

const DisplayTeams = ({ deleteTeam }) => {
    const [tasks, setTasks] = useState([]);
    const [teams, setTeams] = useState([]);
    const [asset_id, setAsset_id] = useState();

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
        try {
            let response = await axios.get(
                "http://127.0.0.1:8000/api/LRPlanner/tasks/"
            );
            setTasks(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTeams();
    }, []);
    console.log("tasks", tasks);
    console.log("display teams", teams);

    function handleSubmit(event) {
        console.log(asset_id);
        deleteTeam(asset_id);
    }

    function generateDataforChart() {
        let rows = tasks.map((task) => {
            let newNewRows = Object.values(task);
            newNewRows.pop();
            newNewRows.pop();
            newNewRows[0].toString();

            let startDate = [
                new Date(newNewRows[3]).getFullYear(),
                new Date(newNewRows[3]).getMonth(),
                new Date(newNewRows[3]).getDate(),
            ];
            let endDate = [
                new Date(newNewRows[4]).getFullYear(),
                new Date(newNewRows[4]).getMonth(),
                new Date(newNewRows[4]).getDate(),
            ];
            newNewRows[3] = new Date(startDate);
            newNewRows[4] = new Date(endDate);
            let id = task.asset_id;
            // console.log("id", id);
            // console.log("team name : ", teams[id].name);
            newNewRows[1] = newNewRows[1] + " : " + teams[id].name;
            

            // console.log("startdate", startDate);
            // console.log("enddate", endDate);

            // console.log("newnewrows", newNewRows);
            return newNewRows;
        });
        // console.log("rows", rows);
        const data = [columns, ...rows];

        return data;
    }

    const columns = [
        { type: "string", label: "Task ID" },
        { type: "string", label: "Task Name" },
        { type: "string", label: "Resource" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Duration" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" },
    ];

    const options = {
        height: 1000,
        gantt: {
            trackHeight: 30,
        },
    };

    return (
        <div>
            Teams section
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Delete Team</label>
                    <select
                        value={asset_id}
                        onChange={(event) => setAsset_id(event.target.value)}
                    >
                        <option value="">--Please choose an option--</option>
                        {teams.map((team, index) => (
                            <option key={index} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                    <button className="btn btn-danger btn-sm disabled" type="submit">Delete</button>
                </form>
            </div>
            {(tasks.length > 0 && teams.length > 0) ? (
                <Chart
                    chartType="Gantt"
                    width="100%"
                    height="50%"
                    data={generateDataforChart()}
                    options={options}
                />
            ) : null}
        </div>
    );
};

export default DisplayTeams;
