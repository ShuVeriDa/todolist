import {TuesdayTaskType} from "./Tuesday";
import {ChangeEvent, FC} from "react";
import {TuesadayButton} from "./TuesadayButton";
import classes from './Tuesday.module.css'
import {TuesdayEditableSpan} from "./TuesdayEditableSpan";
import {TuesdayUniversalCheckBox} from "./TuesdayUniversalCheckBox";

type TestTaskListType = {
   tasks: Array<TuesdayTaskType>
   removeTasks: (todoListID: string, taskID: string) => void
   changeTaskStatus:(todoListID: string, taskID: string, isDone: boolean)=>void
   todoListID: string
   updateTask: (todoListID: string, taskID: string, newTitle: string) => void
}

export const TuesdayTaskList: FC<TestTaskListType> = ({tasks, removeTasks, ...props}) => {
   const onClickRemoveTask = (t: string) => {
      removeTasks(props.todoListID, t)
   }

   const onChangeHandler = (tID: string, checkedValue:  boolean) => {
      props.changeTaskStatus(props.todoListID, tID, checkedValue)
   }

   const taskElements = tasks.map((t) => {

      const updateTaskHandler = (taskID: string, newTitle: string) => {
         props.updateTask(props.todoListID, taskID, newTitle)
      }

      return (
         <li key={t.id} className={t.isDone ? classes.is_done : ""} style={{display: "flex", justifyContent: "space-between", padding: "1.5px 0"}}>
            <TuesdayUniversalCheckBox callBack={(checkedValue) => onChangeHandler(t.id, checkedValue)} checked={t.isDone}/>
            <TuesdayEditableSpan callBack={(newTitle: string) => updateTaskHandler(t.id, newTitle)} title={t.name} />
            <TuesadayButton
               title={"x"}
               callback = {() => onClickRemoveTask(t.id)}
            />
         </li>
      )
   })

   return (
      <div>
         <ul style={{ listStyleType: 'none', padding: '0'}}>
            {taskElements}
         </ul>
      </div>
   );
};
