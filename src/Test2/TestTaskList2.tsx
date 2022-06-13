import {ChangeEvent, FC} from "react";
import {Test2FilterValuesType, Test2TaskType} from "./Test2";
import {TestButton2} from "./TestButton2";
import {TestTask2} from "./TestTask2";

type TestTaskList2Type = {
   tasks: Test2TaskType[]
   filter: Test2FilterValuesType
   todolistID: string
   removeTask: (todolistID: string, taskID: string) => void
   changeTaskStatus: (todolistID: string, taskID: string, isDoneValue: boolean) => void
   changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
}


export const TestTaskList2: FC<TestTaskList2Type> = (
   {
      tasks, filter, todolistID,
      removeTask, changeTaskStatus, changeTaskTitle,
      ...props
   }) => {
   let tasksForTodolist = tasks

   if (filter === 'active') {
      tasksForTodolist = tasks.filter(t => !t.isDone)
   }
   if (filter === 'completed') {
      tasksForTodolist = tasks.filter(t => t.isDone)
   }


   return (
      <ul>
         {tasksForTodolist.map(t => {
            return (
              <TestTask2 key={t.id}
                         task={t}
                         todolistID={todolistID}
                         filter={filter}
                         removeTask={removeTask}
                         changeTaskStatus={changeTaskStatus}
                         changeTaskTitle={changeTaskTitle}
              />
            )
         })}
      </ul>
   );
};
