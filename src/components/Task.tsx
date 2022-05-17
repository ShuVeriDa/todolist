import React, {FC, useCallback} from "react";
import {UniversalCheckBox} from "./UniversalCheckBox";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {FilterValuesType, TaskType} from "../AppWithRedux";

type PropsType = {
   task: TaskType
   removeTask: (todoListID: string, id: string) => void
   changeStatus: (todoListID: string, id: string, isDone: boolean) => void
   todoListID: string
   updateTask: (todoListID: string, taskID: string, newTitle: string) => void
   filter: FilterValuesType
}

export const Task: FC<PropsType> = ({task, removeTask, ...props}) => {

   const updateTaskHandler = useCallback((taskID: string, newTitle: string) => {
      props.updateTask(props.todoListID, taskID, newTitle)
   }, [props.todoListID, props.updateTask, task.title])

   const onChangeHandler = (tID: string, checkedValue: boolean) => {
      props.changeStatus(props.todoListID, tID, checkedValue)
   }

   const onClickRemoveTask = useCallback(() => removeTask(props.todoListID, task.id), [],)

   return (
      <div key={task.id} className={task.isDone ? "isDone" : ''}>
         {/*<input type="checkbox" checked={t.isDone} onChange={(e) => props.changeStatus(props.todoListID, t.id, e.currentTarget.checked)}/>*/}
         {/*<Checkbox  checked={t.isDone} onChange={(e) => props.changeStatus(props.todoListID, t.id, e.currentTarget.checked)}/>*/}
         <UniversalCheckBox callBack={(checkedValue) => onChangeHandler(task.id, checkedValue)}
                            checked={task.isDone}/>
         <EditableSpan title={task.title}
                       callBack={(newTitle: string) => updateTaskHandler(task.id, newTitle)}
         />
         {/*<ButtonTodoList title={'x'} onClickHandler={onClickRemoveTask}/>*/}

         <IconButton aria-label="delete" onClick={onClickRemoveTask}>
            <DeleteIcon />
         </IconButton>
      </div>
   )
}