import {Test2FilterValuesType, Test2TaskType} from "./Test2";
import { FC, useCallback} from "react";
import {Test2UniversalCheckBox} from "./Test2UniversalCheckBox";
import {Test2EditableSpan} from "./Test2EditableSpan";
import {TestButton2} from "./TestButton2";

type TestTask2PropsType = {
   task: Test2TaskType
   todolistID: string
   filter: Test2FilterValuesType
   removeTask: (todolistID: string, taskID: string) => void
   changeTaskStatus: (todolistID: string, taskID: string, isDoneValue: boolean) => void
   changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
}

export const TestTask2: FC<TestTask2PropsType> = (
   {
      task, todolistID, filter, removeTask,
      changeTaskStatus, changeTaskTitle,
      ...props
   }

   ) => {

   const removeTaskHandler = useCallback(() => {
      removeTask(todolistID, task.id)
   }, [])

   const onChangeHandler = (taskID: string, checkedValue: boolean) => {
      changeTaskStatus(todolistID, taskID, checkedValue)
   }

   const onChangeTaskTitleHandler = useCallback((taskID: string, newTitle: string) => {
      console.log(task.title)
      changeTaskTitle(todolistID, taskID, newTitle)
   }, [todolistID, changeTaskTitle, task.title])

   return (
      <div key={task.id}>
         <Test2UniversalCheckBox checked={task.isDone}
                                 callBack={(checkedValue: boolean) => onChangeHandler(task.id, checkedValue)}
         />
         <Test2EditableSpan callBack={(newTitle: string) => onChangeTaskTitleHandler(task.id, newTitle)} title={task.title}/>
         <TestButton2 title={'x'} callBack={removeTaskHandler} />
      </div>
   );
};

