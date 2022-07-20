import React, { useState, useEffect } from "react";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import DisplayGoogleChart from "../DisplayGoogleChart/DisplayGoogleChart";
import axios from "axios";

const DisplayLineOfEffort = ({ linesOfEffort }) => {
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
    console.log("tasks", tasks);

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
    function buildComponantList() {
        // let projectMap = linesOfEffort.map((loe, index) => {
            
        //     // let filteredTasks = tasks.filter(
        //     //     (task) => task.lineOfEffort_id == loe.id
        //     // );
        //     for(let i =0; i<tasks.length;i++){
        //          if (tasks[i].id === loe.id) {
        //         return [
        //             <div key={index}>
        //                 <h1>{loe.name}</h1>
        //                 <AddTaskForm loe={loe} createNewTask={createNewTask} />
                        
        //                 <DisplayGoogleChart tasks={tasks} loe={loe} />
        //             </div>
        //         ];
        //     }
           
        //     // } else {
        //     //     return [
        //     //         <div key={index}>
        //     //             <h1>{loe.name}</h1>
        //     //             <AddTaskForm loe={loe} createNewTask={createNewTask} />
        //     //         </div>
        //     //     ];
        //     // }
        // });

        //return [taskMap];
        //}
        // //);
        // let distinctProjectMap = [...new Set(projectMap)];
        // return projectMap;
    }

    //return <div>{buildComponantList()}</div>;
    return (
        <div>
            {console.log("line of effort:", linesOfEffort)}
            {console.log("tasks:", tasks)}
            {linesOfEffort.map((loe, index) => {
                // console.log("***linesofeffort", linesOfEffort);
                // console.log("***tasks", tasks);
                return (
                    <div key={index}>
                        <h1>{loe.name}</h1><button>Delete Project</button>
                        <AddTaskForm loe={loe} createNewTask={createNewTask} />
                        {tasks.filter(el => el.lineOfEffort_id == loe.id).length > 0 ? (
                            <DisplayGoogleChart tasks={tasks} loe={loe} />
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
