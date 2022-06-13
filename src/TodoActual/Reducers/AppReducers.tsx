import React, {useReducer, useState} from 'react';
import './AppReducers.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';
import {addTaskAC, removeTaskAC, TasksReducer} from "./reducers/TasksReducer";
import {changeFilterAC, FilterReducer} from "./reducers/FilterReducer";

export type FilterValuesType = "all" | "active" | "completed";

function AppReducers() {

    // let [tasks, setTasks] = useState([
    //     { id: v1(), title: "HTML&CSS", isDone: true },
    //     { id: v1(), title: "JS", isDone: true },
    //     { id: v1(), title: "ReactJS", isDone: false },
    //     { id: v1(), title: "Rest API", isDone: false },
    //     { id: v1(), title: "GraphQL", isDone: false },
    // ]);

    let [tasks, taskDispatch] = useReducer(TasksReducer,[
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);

    function removeTask(id: string) {
        taskDispatch(removeTaskAC(id))
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }

    function addTask(title: string) {
        taskDispatch(addTaskAC(title))
        // let task = { id: v1(), title: title, isDone: false };
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    let [filter, filterDispatch] = useReducer(FilterReducer, "all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        filterDispatch(changeFilterAC(value))
        // setFilter(value);
    }



    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask} />
        </div>
    );
}

export default AppReducers;
