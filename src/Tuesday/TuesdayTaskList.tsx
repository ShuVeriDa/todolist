import {TuesdayTaskType} from "./Tuesday";
import {ChangeEvent, FC} from "react";
import {TuesadayButton} from "./TuesadayButton";
import classes from './Tuesday.module.css'
import {TuesdayEditableSpan} from "./TuesdayEditableSpan";

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

   const taskElements = tasks.map((t) => {
      const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
         props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked)
      }

      const updateTaskHandler = (taskID: string, newTitle: string) => {
         props.updateTask(props.todoListID, taskID, newTitle)
      }

      return (
         <li key={t.id} className={t.isDone ? classes.is_done : ""} style={{display: "flex", justifyContent: "space-between", padding: "1.5px 0"}}>
            <input type="checkbox"
                   checked={t.isDone}
                   onChange={onChangeHandler}
            />
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
