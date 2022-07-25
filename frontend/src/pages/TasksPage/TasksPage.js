import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import AddTeamForm from "../../components/AddTeamForm/AddTeamForm";
import DisplayTeams from "../../components/DisplayTeams/DisplayTeams";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getTasks();
        getTeams();
        return () => controller.abort();
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
        // console.log("a", a.start_date);
        // console.log("b", b.start_date);
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
        <div className="container">
            {tasks.length > 0 && teams.length > 0 ? (
                <table className="table-layout">
                    <TableHead>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Team Tasked</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedTasks.map((task, index) => {
                            //console.log(task.id);
                            return (
                                <TableRow key={index}>
                                    <TableCell>{task.name}</TableCell>
                                    <TableCell>{task.start_date}</TableCell>
                                    <TableCell>{task.end_date}</TableCell>
                                    <TableCell>
                                        {teams[task.asset_id].name}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </table>
            ) : null}
        </div>
    );
};

export default TasksPage;
