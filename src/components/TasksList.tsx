import React, {FC} from 'react';
import {TaskType} from "../App";
import ButtonTodoList from "../ButtonTodoList";
import todoList from "./TodoList";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type TaskListPropsType = {
   tasks: Array<TaskType>
   removeTask: (todoListID: string, id: string) => void
   changeStatus: (todoListID: string, id: string, isDone: boolean) => void
   todoListID: string
   updateTask: (todoListID: string, taskID: string, newTitle: string) => void
}

const TasksList: FC<TaskListPropsType> = ({tasks, removeTask, ...props}) => {

   const updateTaskHandler = (taskID: string, newTitle: string) => {
      props.updateTask(props.todoListID, taskID, newTitle)
   }

   const tasksJSXElements = tasks.map((t) => {
      const onClickRemoveTask = () => removeTask(props.todoListID, t.id)
      return (
         <li key={t.id} className={t.isDone ? "isDone" : ''}>
            {/*<input type="checkbox" checked={t.isDone} onChange={(e) => props.changeStatus(props.todoListID, t.id, e.currentTarget.checked)}/>*/}
            <Checkbox  checked={t.isDone} onChange={(e) => props.changeStatus(props.todoListID, t.id, e.currentTarget.checked)}/>
            <EditableSpan title={t.title} callBack={(newTitle: string) => updateTaskHandler(t.id, newTitle)}/>
            {/*<ButtonTodoList title={'x'} onClickHandler={onClickRemoveTask}/>*/}

            <IconButton aria-label="delete" >
               <DeleteIcon />
            </IconButton>
         </li>
      )
   })

   return (
      <ul>
         {tasksJSXElements}
      </ul>
   );
};

export default TasksList;
