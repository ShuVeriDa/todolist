import React, {FC, useEffect} from 'react';
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {UniversalCheckBox} from "./UniversalCheckBox";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "../api/todolists-api";
import {FilterValuesType} from "../state/todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../state/tasks-reducers";

type TaskListPropsType = {
   tasks: TaskType[]
   removeTask: (todoListID: string, id: string) => void
   changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
   todoListID: string
   changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
   filter: FilterValuesType
}

const TasksList: FC<TaskListPropsType> = React.memo(({tasks, removeTask, ...props}) => {
   useEffect(() => {
      dispatch(fetchTasksTC(props.todoListID))
   }, [])

   const dispatch = useDispatch();
   let tasksForTodolist = tasks

   if (props.filter === 'active') {
      tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
   }
   if (props.filter === 'completed') {
      tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
   }
debugger
   return (
      <div>
         {
            tasksForTodolist.map(t => {
               return (
                  <Task key={t.id}
                        task={t}
                        changeTaskTitle={props.changeTaskTitle}
                        changeTaskStatus={props.changeTaskStatus}
                        todoListID={props.todoListID}
                        filter={props.filter}
                        removeTask={removeTask}
                  />
               )
            })
         }
      </div>
   );
});

export default TasksList;
