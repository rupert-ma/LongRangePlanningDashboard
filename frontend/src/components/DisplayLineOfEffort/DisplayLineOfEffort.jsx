import React, { useState, useEffect } from "react";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import DisplayGoogleChart from "../DisplayGoogleChart/DisplayGoogleChart";
import axios from "axios";
import ModifyTaskForm from "../ModifyTaskForm/ModifyTaskForm";

const DisplayLineOfEffort = ({
    linesOfEffort,
    deleteLineOfEffort,
    deleteTask,
    teams,
}) => {
    const [tasks, setTasks] = useState([]);
    const [taskid, setTaskid] = useState();

    function handleSubmit(event) {
        deleteTask(taskid);
    }

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
        getTasks();
    }

    async function modifyTask(newTask) {
        console.log("newtask from modifytask function", newTask);
        try {
            let response = await axios.put(
                `http://127.0.0.1:8000/api/LRPlanner/tasks/${newTask.id}/`,
                newTask
            );
        } catch (error) {
            console.log(error);
        }
        getTasks();
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
                    <div key={index} className="card border-secondary mb-3">
                        <h1>{loe.name}</h1>
                        <button
                            className="btn btn-outline-danger"
                            value={loe.id}
                            onClick={(event) =>
                                handleDelete(event.target.value)
                            }
                        >
                            Delete Project
                        </button>
                        <AddTaskForm
                            loe={loe}
                            createNewTask={createNewTask}
                            teams={teams}
                        />
                        <ModifyTaskForm
                            modifyTask={modifyTask}
                            loe={loe}
                            tasks={tasks}
                        />
                        <div className="form-group row">
                            <form onSubmit={handleSubmit}>
                                <label className="col-sm-2 col-form-label">
                                    Delete Task
                                </label>
                                <select
                                    value={taskid}
                                    onChange={(event) =>
                                        setTaskid(event.target.value)
                                    }
                                >
                                    <option value="">
                                        --Please choose an option--
                                    </option>
                                    {tasks
                                        .filter(
                                            (task) =>
                                                task.lineOfEffort_id == loe.id
                                        )
                                        .map((task, index) => (
                                            <option key={index} value={task.id}>
                                                {task.name}
                                            </option>
                                        ))}
                                </select>
                                <button
                                    className="btn btn-danger btn-sm disabled"
                                    type="submit"
                                >
                                    Delete
                                </button>
                            </form>
                        </div>

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
