import {WednesdayTaskType} from "./Wednesday";
import {FC} from "react";
import {WednesdayButton} from "./WednesdayButton";
import classes from './Wednesday.module.css'
import {WednesdayEditableSpan} from "./WednesdayEditableSpan";
import {WednesdayUniversalCheckBox} from "./WednesdayUniversalCheckBox";

type TestTaskListType = {
   tasks: Array<WednesdayTaskType>
   removeTasks: (todoListID: string, taskID: string) => void
   changeTaskStatus:(todoListID: string, taskID: string, isDone: boolean)=>void
   todoListID: string
   updateTask: (todoListID: string, taskID: string, newTitle: string) => void
}

export const WednesdayTaskList: FC<TestTaskListType> = ({tasks, removeTasks, ...props}) => {
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
            <WednesdayUniversalCheckBox callBack={(checkedValue) => onChangeHandler(t.id, checkedValue)} checked={t.isDone}/>
            <WednesdayEditableSpan callBack={(newTitle: string) => updateTaskHandler(t.id, newTitle)} title={t.name} />
            <WednesdayButton
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
