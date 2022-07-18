import React, { useState } from "react";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import DisplayGoogleChart from "../DisplayGoogleChart/DisplayGoogleChart";
import axios from "axios";


const DisplayLineOfEffort = ({ linesOfEffort }) => {
    const [tasks, setTasks] = useState();

    async function createNewTask(newTask) {
        console.log("newtask from createnewtask function", newTask)
        try {
            let response = await axios.post(
                `http://127.0.0.1:8000/api/LRPlanner/tasks/`,
                newTask
            );
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {linesOfEffort.map((loe, index) => {
                return (
                    <div key={index}>
                        <h1>{loe.name}</h1>
                        <AddTaskForm loe={loe} createNewTask={createNewTask} />
                        <DisplayGoogleChart loe={loe} />
                    </div>
                );
            })}
        </div>
    );
};

export default DisplayLineOfEffort;
