import React, {FC, useEffect} from 'react';
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {UniversalCheckBox} from "../../components/UniversalCheckBox/UniversalCheckBox";
import {Task} from "../TodolistsList/Todolist/Task/Task";
import {FilterValuesType, TodolistDomainType} from "../TodolistsList/todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../TodolistsList/tasks-reducers";
import {TaskStatuses, TaskType} from "../../api/types";

type TaskListPropsType = {
   tasks: TaskType[]
   removeTask: (todoListID: string, id: string) => void
   changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
   todoListID: string
   changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
   filter: FilterValuesType
   demo?: boolean
}

const TasksList = React.memo(({demo = false, tasks, removeTask, ...props}: TaskListPropsType) => {
   const dispatch = useDispatch()

   useEffect(() => {
      if (demo) {
         return
      }

      dispatch(fetchTasksTC(props.todoListID))
   }, [])

   let tasksForTodolist = tasks

   if (props.filter === 'active') {
      tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
   }
   if (props.filter === 'completed') {
      tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
   }
   return (
      <div>
         {
            tasksForTodolist.map(t => {
               return (
                  <Task key={t.id} task={t} todoListID={props.todoListID}
                        changeTaskTitle={props.changeTaskTitle}
                        changeTaskStatus={props.changeTaskStatus}
                        removeTask={removeTask}
                  />
               )
            })
         }
      </div>
   );
});

export default TasksList;
