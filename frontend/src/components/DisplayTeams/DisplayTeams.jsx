import React, { useState } from 'react';
import { Chart } from "react-google-charts";


const DisplayTeams = ({teams, tasks}) => {
    console.log("display teams", teams);

    function generateDataforChart() {
        

        // let filteredTasks = tasks.filter(
        //     (task) => task.asset_id == teams.id
        // );
        // console.log("filteredtasks", filteredTasks);

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
            let id = task.asset_id
            //console.log('id',id)
            //console.log('team name',teams[id].name)
            newNewRows[1] = newNewRows[1] + " " + teams[id].name;


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

            <Chart
            chartType="Gantt"
            width="100%"
            height="50%"
            data={generateDataforChart()}
            options={options}
        />

        </div>
     );
}
 
export default DisplayTeams;