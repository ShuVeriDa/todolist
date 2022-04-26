import { Test2TaskType} from "./Test2";
import {Test2UniversalCheckBox} from "./Test2UniversalCheckBox";
import {TestButton2} from "./TestButton2";
import {Test2EditableSpan} from "./Test2EditableSpan";

type TestTaskList2Type = {
   todoListID: string
   tasks: Test2TaskType[]
   filter: string
   removeTask: (todoListID: string, taskID: string) => void
   changeStatus: (todoListID: string, taskID: string, isDone: boolean) => void
   updateTaskHandler: (todolistID: string, taskID: string, newTitle: string) => void
}

export const TestTaskList2: React.FC<TestTaskList2Type> = ({tasks, todoListID, filter, ...props}) => {

   const removeTaskHandler = (taskID: string) => {
      props.removeTask(todoListID, taskID)
   }

   const onChangeStatusHandler = (taskID: string, isDone: boolean) => {
      props.changeStatus(todoListID, taskID, isDone)
   }

   const onUpdateTaskHandler = (taskID: string, newTitle: string) => {
      props.updateTaskHandler(todoListID, taskID, newTitle)
   }

   return (
      <ul>
         {
            tasks.map((t) => {

               return (
                  <li key={t.id}>
                     <Test2UniversalCheckBox callBack={(isDone: boolean) => onChangeStatusHandler(t.id, isDone)} checked={t.isDone}/>
                     <Test2EditableSpan title={t.name} callBack={(newTitle: string) => onUpdateTaskHandler(t.id, newTitle)}/>
                     <TestButton2 callBack={() => removeTaskHandler(t.id)} title={'x'}/>
                  </li>
               )
            })
         }
      </ul>
   );
};
