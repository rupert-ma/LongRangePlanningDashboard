import React, { useState, useEffect } from "react";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import DisplayGoogleChart from "../DisplayGoogleChart/DisplayGoogleChart";
import axios from "axios";

const DisplayLineOfEffort = ({ linesOfEffort, deleteLineOfEffort }) => {
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

    async function createNewTask(newTask) {
        // console.log("newtask from createnewtask function", newTask);
        try {
            let response = await axios.post(
                `http://127.0.0.1:8000/api/LRPlanner/tasks/`,
                newTask
            );
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDelete(pk) {
        deleteLineOfEffort(pk);
    }

    return (
        <div>
            {/* {console.log("line of effort:", linesOfEffort)}
            {console.log("tasks:", tasks)} */}
            {linesOfEffort.map((loe, index) => {
                // console.log("***linesofeffort", linesOfEffort);
                // console.log("***tasks", tasks);
                return (
                    <div key={index}>
                        <h1>{loe.name}</h1>

                        <AddTaskForm loe={loe} createNewTask={createNewTask} />
                        <button
                            value={loe.id}
                            onClick={(event) =>
                                handleDelete(event.target.value)
                            }
                        >
                            Delete Project
                        </button>

                        {tasks.filter((el) => el.lineOfEffort_id == loe.id)
                            .length > 0 ? (
                            <div>
                                <DisplayGoogleChart tasks={tasks} loe={loe} />
                                
                                
                            </div>
                        ) : (
                            <p></p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default DisplayLineOfEffort;
