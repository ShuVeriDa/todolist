import React from 'react';
import classes from "./Wednesday.module.css";
import {WednesdayUniversalCheckBox} from "./WednesdayUniversalCheckBox";
import {WednesdayEditableSpan} from "./WednesdayEditableSpan";
import {WednesdayButton} from "./WednesdayButton";
import {WednesdayFilterValueType, WednesdayTaskType} from "./Wednesday";

type WednesdayTaskPropsType = {
   task: WednesdayTaskType
   removeTasks: (todolistID: string, id: string) => void
   changeTaskStatus: (todolistID: string, id: string, isDone: boolean) => void
   todolistID: string
   updateTask: (todoListID: string, taskID: string, newTitle: string) => void
   filter: WednesdayFilterValueType
}


export const WednesdayTask:React.FC<WednesdayTaskPropsType> = React.memo(({task, removeTasks, ...props}) => {
   const onClickRemoveTask = (t: string) => {
      removeTasks(props.todolistID, t)
   }

   const onChangeHandler = (tID: string, checkedValue:  boolean) => {
      props.changeTaskStatus(props.todolistID, tID, checkedValue)
   }

   const updateTaskHandler = (taskID: string, newTitle: string) => {
      props.updateTask(props.todolistID, taskID, newTitle)
   }

   return (
      <li key={task.id} className={task.isDone ? classes.is_done : ""} style={{display: "flex", justifyContent: "space-between", padding: "1.5px 0"}}>
         <WednesdayUniversalCheckBox callBack={(checkedValue) => onChangeHandler(task.id, checkedValue)} checked={task.isDone}/>
         <WednesdayEditableSpan callBack={(newTitle: string) => updateTaskHandler(task.id, newTitle)} title={task.name} />
         <WednesdayButton
            title={"x"}
            callback = {() => onClickRemoveTask(task.id)}
         />
      </li>
   )
})

export default WednesdayTask;
