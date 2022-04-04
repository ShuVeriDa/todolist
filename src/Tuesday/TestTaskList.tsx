import {TestType} from "./Test";
import {ChangeEvent, FC} from "react";
import {TestButton} from "./TestButton";
import classes from './Test.module.css'

type TestTaskListType = {
   tasks: Array<TestType>
   removeTasks: (id: string) => void
   changeTaskStatus:(taskId:string, isDone: boolean)=>void
}

export const TestTaskList: FC<TestTaskListType> = ({tasks, removeTasks, ...props}) => {

   const onClickRemoveTask = (t: string) => {
      removeTasks(t)
   }

   const taskElements = tasks.map((t) => {
      const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
         props.changeTaskStatus(t.id, e.currentTarget.checked)
      }
      return (
         <li key={t.id} className={t.isDone ? classes.is_done : ""} style={{display: "flex", justifyContent: "space-between", padding: "1.5px 0"}}>
            <input type="checkbox"
                   checked={t.isDone}
                   onChange={onChangeHandler}
            />
            {t.name}
            <TestButton
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
