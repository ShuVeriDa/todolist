import React from 'react';
import {TaskType} from "./App";

type TaskListPropsType = {
    tasks: Array<TaskType>
}

const TasksList = (props: TaskListPropsType) => {
    return (
            <ul>
                <li>
                    <input type="checkbox" checked={props.tasks[0].isDone}/>
                    <span>{props.tasks[0].title}</span>
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[1].isDone}/>
                    <span>{props.tasks[1].title}</span>
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[2].isDone}/>
                    <span>{props.tasks[2].title}</span>
                </li>
            </ul>
    );
};

export default TasksList;
