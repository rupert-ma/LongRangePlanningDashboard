import React, { useState } from "react";

const ModifyTaskForm = ({ modifyTask, loe, tasks }) => {
    const [taskid, setTaskid] = useState();
    const [taskName, setTaskName] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [duration, setDuration] = useState(null);
    const [percent_complete, setPercent_complete] = useState(1);
    const [dependencies, setDependencies] = useState(null);
    const [lineOfEffort_id, setLineOfEffort_id] = useState(loe.id);
    const [resource, setResource] = useState(1);
    const [asset_id, setAsset_id] = useState(1);

    let filteredTasks = tasks.filter((task) => task.lineOfEffort_id == loe.id);

    function handleSubmit(event) {
        event.preventDefault();
        let newTask = {
            id: taskid,
            name: taskName,
            resource: resource.toString(),
            start_date: startDate,
            end_date: endDate,
            duration: duration,
            percent_complete: percent_complete,
            dependencies: dependencies,
            asset_id: asset_id,
            lineOfEffort_id: lineOfEffort_id,
        };
        // console.log("newTask",newTask)
        modifyTask(newTask);
    }

    return (
        <div>
            <div className="form-group row">
                <form onSubmit={handleSubmit}>
                    <label className="col-sm-2 col-form-label">
                        Modify Task
                    </label>
                    <select
                        value={taskid}
                        onChange={(event) => setTaskid(event.target.value)}
                    >
                        <option value="">--Please choose an option--</option>
                        {filteredTasks.map((task, index) => (
                            <option key={index} value={task.id}>
                                {task.name}
                            </option>
                        ))}
                    </select>
                    <label className="col-sm-2 col-form-label">
                        Enter New Task Name:{" "}
                    </label>
                    <input
                        type="text"
                        value={taskName}
                        onChange={(event) => setTaskName(event.target.value)}
                    />
                    <label className="col-sm-2 col-form-label">
                        Enter New Start Date:{" "}
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                    />
                    <label className="col-sm-2 col-form-label">
                        Enter New End Date:{" "}
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                    />
                    <button className="btn btn-primary btn-sm" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ModifyTaskForm;
