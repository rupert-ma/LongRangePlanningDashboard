import React, { useState } from "react";

const AddTaskForm = ({ createNewTask, loe, teams }) => {
    const [taskName, setTaskName] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [duration, setDuration] = useState(null);
    const [percent_complete, setPercent_complete] = useState(1);
    const [dependencies, setDependencies] = useState(null);
    const [lineOfEffort_id, setLineOfEffort_id] = useState(loe.id);
    const [resource, setResource] = useState(1);
    const [asset_id, setAsset_id] = useState();

    function handleSubmit(event) {
        event.preventDefault();
        let newTask = {
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
        console.log("newTask", newTask);
        createNewTask(newTask);
    }

    return (
        <div>
            <div className="form-group row">
                <form onSubmit={handleSubmit}>
                    <label className="col-sm-2 col-form-label">Enter Task Name: </label>
                    <input
                        type="text"
                        value={taskName}
                        onChange={(event) => setTaskName(event.target.value)}
                    />
                    <label className="col-sm-2 col-form-label">Enter Start Date: </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                    />
                    <label className="col-sm-2 col-form-label">Enter End Date: </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                    />
                    <label className="col-sm-2 col-form-label">Assign Team</label>
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
                    <button className="btn btn-primary btn-sm" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskForm;
