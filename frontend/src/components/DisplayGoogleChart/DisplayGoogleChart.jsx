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

        let newRows = filteredTasks.map((task) => {
            let newNewRows = Object.values(task);
            newNewRows.pop();
            newNewRows.pop();
            newNewRows[0].toString();

            let startDate = [new Date(newNewRows[3]).getFullYear(), new Date(newNewRows[3]).getMonth(), new Date(newNewRows[3]).getDate()]
            let endDate =[new Date(newNewRows[4]).getFullYear(), new Date(newNewRows[4]).getMonth(), new Date(newNewRows[4]).getDate()]
            newNewRows[3] = new Date(startDate)
            newNewRows[4] = new Date(endDate)

            console.log('startdate', startDate)
            console.log('enddate', endDate)
            
            console.log("newnewrows", newNewRows);
            return newNewRows;
        });
        console.log("newrows", newRows);

        const rows = [
            [
                "2014Summer",
                "Summer 2014",
                "summer",
                new Date(2014, 5, 21),
                new Date(2014, 8, 20),
                null,
                100,
                null,
            ],
            [
                "2014Autumn",
                "Autumn 2014",
                "autumn",
                new Date(2014, 8, 21),
                new Date(2014, 11, 20),
                null,
                100,
                null,
            ],
            [
                "2014Winter",
                "Winter 2014",
                "winter",
                new Date(2014, 11, 21),
                new Date(2015, 2, 21),
                null,
                100,
                null,
            ],
            [
                "2015Spring",
                "Spring 2015",
                "spring",
                new Date(2015, 2, 22),
                new Date(2015, 5, 20),
                null,
                50,
                null,
            ],
            [
                "2015Summer",
                "Summer 2015",
                "summer",
                new Date(2015, 5, 21),
                new Date(2015, 8, 20),
                null,
                0,
                null,
            ],
            [
                "2015Autumn",
                "Autumn 2015",
                "autumn",
                new Date(2015, 8, 21),
                new Date(2015, 11, 20),
                null,
                0,
                null,
            ],
            [
                "2015Winter",
                "Winter 2015",
                "winter",
                new Date(2015, 11, 21),
                new Date(2016, 2, 21),
                null,
                0,
                null,
            ],
            [
                "Football",
                "Football Season",
                "sports",
                new Date(2014, 8, 4),
                new Date(2015, 1, 1),
                null,
                100,
                null,
            ],
            [
                "Baseball",
                "Baseball Season",
                "sports",
                new Date(2015, 2, 31),
                new Date(2015, 9, 20),
                null,
                14,
                null,
            ],
            [
                "Basketball",
                "Basketball Season",
                "sports",
                new Date(2014, 9, 28),
                new Date(2015, 5, 20),
                null,
                86,
                null,
            ],
            [
                "Hockey",
                "Hockey Season",
                "sports",
                new Date(2014, 9, 8),
                new Date(2015, 5, 21),
                null,
                89,
                null,
            ],
            [
                "Hockey",
                "Hockey Season",
                "sports",
                new Date(2016, 2, 8),
                new Date(2016, 3, 21),
                null,
                89,
                null,
            ],
        ];

        const data = [columns, ...newRows];

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
        height: 400,
        gantt: {
            trackHeight: 30,
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
