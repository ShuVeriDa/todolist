import {WednesdayFilterValueType, WednesdayTaskType} from "./Wednesday";
import {FC} from "react";
import {WednesdayButton} from "./WednesdayButton";
import classes from './Wednesday.module.css'
import {WednesdayEditableSpan} from "./WednesdayEditableSpan";
import {WednesdayUniversalCheckBox} from "./WednesdayUniversalCheckBox";
import WednesdayTask from "./WednesdayTask";

type TestTaskListType = {
   tasks: Array<WednesdayTaskType>
   removeTasks: (todoListID: string, taskID: string) => void
   changeTaskStatus: (todoListID: string, taskID: string, isDone: boolean) => void
   todoListID: string
   updateTask: (todoListID: string, taskID: string, newTitle: string) => void
   filter: WednesdayFilterValueType
}

export const WednesdayTaskList: FC<TestTaskListType> = ({tasks, removeTasks, ...props}) => {

   let tasksForTodolist = tasks

   if (props.filter === 'active') {
      tasksForTodolist = tasks.filter(f => !f.isDone)
   }
   if (props.filter === "completed") {
      tasksForTodolist = tasks.filter(f => f.isDone)
   }

   return (
      <div>
         <ul style={{listStyleType: 'none', padding: '0', width: '300px'}}>
            {
               tasksForTodolist.map(t => {
                  return (
                     <WednesdayTask key={t.id}
                                    task={t}
                                    removeTasks={removeTasks}
                                    changeTaskStatus={props.changeTaskStatus}
                                    todolistID={props.todoListID}
                                    updateTask={props.updateTask}
                                    filter={props.filter}/>
                  )
               })
            }
         </ul>
      </div>
   );
};
