import {Test2TaskType} from "./Test2";

import {TestButton2} from "./TestButton2";
import classes from './Test2.module.css'
import {ChangeEvent} from "react";
import {Test2EditableSpan} from "./Test2EditableSpan";

export type TestTaskList2PropsType = {
   tasks: Array<Test2TaskType>
   removeTasks: (todoListsID: string, taskID: string) => void
   changeStatus: (todoListsID: string, tasksID: string, isDone: boolean) => void
   todoListID: string
   updateTask: (todoListID: string, taskID: string, newTitle: string) => void
}

export const TestTaskList2: React.FC<TestTaskList2PropsType> = ({tasks, removeTasks, ...props}) => {
   const elementTasks = tasks.map(t => {

      const removeTaskHandler = () => removeTasks(props.todoListID, t.id)
      const changeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(props.todoListID, t.id, e.currentTarget.checked)

      const updateTaskHandler = (taskID: string, newTitle: string) => {
         props.updateTask(props.todoListID, taskID, newTitle)
      }
      return (
         <li key={t.id} className={classes.task}>
            <input type="checkbox" checked={t.isDone} onChange={changeHandler}/>
            <Test2EditableSpan callBack={(newTitle: string) => updateTaskHandler(t.id, newTitle)} title={t.name}/>
            <TestButton2 title={'x'} callBack={removeTaskHandler}/>
         </li>
      )
   })


   return (
      <ul className={classes.taskUl}>
         {elementTasks}
      </ul>
   );
};