import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

const DisplayGoogleChart = ({ loe }) => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        getTasks();
    }, []);

    console.log("loe", loe);

    //axios call to all tasks
    //isolate tasks by those associated with loe
    //format data from task into format below

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
    console.log("tasks", tasks);

    function generateDataforChart() {
        let filteredTasks = tasks.filter(
            (task) => task.lineOfEffort_id == loe.id
        );
        console.log("filteredtasks", filteredTasks);

        let distinctTasks = [...new Set(filteredTasks)];
        console.log("distinctTasks", distinctTasks);
        let rows = [
            "",
            "",
            "",
            new Date(2022, 1, 1),
            new Date(2022, 12, 31),
            null,
            100,
            null,
          ]

        rows = filteredTasks.map((task) => {
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

            console.log("startdate", startDate);
            console.log("enddate", endDate);

            console.log("newnewrows", newNewRows);
            return newNewRows;
        });
        console.log("rows", rows);
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
        vAxis: {
            viewWindowMode: "explicit",
            viewWindow: {
                min: new Date(2022, 1, 1),
                max: new Date(2015, 12, 31),
            },

            height: 400,
            gantt: {
                trackHeight: 30,
            },
        },
    };

    return (
        <Chart
            chartType="Gantt"
            width="100%"
            height="50%"
            data={generateDataforChart()}
            options={options}
        />
    );
};

export default DisplayGoogleChart;
