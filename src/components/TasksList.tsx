import React, { FC} from 'react';
import {TaskType} from "../App";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {UniversalCheckBox} from "./UniversalCheckBox";

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

   const onChangeHandler = (tID: string, checkedValue:  boolean) => {
      props.changeStatus(props.todoListID, tID, checkedValue)
   }

   const tasksJSXElements = tasks.map((t) => {
      const onClickRemoveTask = () => removeTask(props.todoListID, t.id)

      return (
         <li key={t.id} className={t.isDone ? "isDone" : ''}>
            {/*<input type="checkbox" checked={t.isDone} onChange={(e) => props.changeStatus(props.todoListID, t.id, e.currentTarget.checked)}/>*/}
            {/*<Checkbox  checked={t.isDone} onChange={(e) => props.changeStatus(props.todoListID, t.id, e.currentTarget.checked)}/>*/}
            <UniversalCheckBox callBack={(checkedValue) => onChangeHandler(t.id, checkedValue)} checked={t.isDone} />
            <EditableSpan title={t.title} callBack={(newTitle: string) => updateTaskHandler(t.id, newTitle)}/>
            {/*<ButtonTodoList title={'x'} onClickHandler={onClickRemoveTask}/>*/}

            <IconButton aria-label="delete" >
               <DeleteIcon onClick={onClickRemoveTask}/>
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
