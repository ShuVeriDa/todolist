import {TestInput} from "./TestInput";
import {TestTodoListHeader} from "./TestTodoListHeader";
import {TestButton} from "./TestButton";
import {TestTaskList} from "./TestTaskList";
import {TestFilterValueType, TestType} from "./Test";
import {FC, useState} from "react";
import {FilterValuesType} from "../TodoActual/App";
import classes from "./Test.module.css";

export type TestTodoListType = {
   tasks: Array<TestType>
   removeTasks: (id: string) => void
   addTask: (title: string) => void
   changeFilter: (filter: TestFilterValueType) => void
   changeTaskStatus: (taskId: string, isDone: boolean) => void
   filter: TestFilterValueType
   TasksHeaderTitle: string
}

export const TestTodoList: FC<TestTodoListType> = ({tasks, removeTasks, addTask, changeFilter, ...props}) => {
   const [collapsed, setCollapsed] = useState<boolean>(true)
   const collapsedTasks = (b: boolean) => {
      setCollapsed(b)
   }

   const [title, setTitle] = useState<string>("")
   const [error, setError] = useState<string | null>(null)

   const newTask = () => {
      if (title.trim() !== "") {
         addTask(title.trim())
         setTitle("")
      } else {
         setError('Title is required')
      }
   }

   const changeFilterHandler = (filterValues: FilterValuesType) => {
      changeFilter(filterValues)
   }

   return (
      <div>
         <TestTodoListHeader title={props.TasksHeaderTitle} callBack={() => collapsedTasks(!collapsed)}/>
         { collapsed && <div>
             <>
                 <TestInput valueTitle={title} setTitle={setTitle} callBack={newTask} error={error} setError={setError}/>
                 <TestButton title={"+"} callback={newTask}/>
                {error && <div className={classes.error_message}>{error}</div>}
             </>
             <>
                 <TestTaskList
                     tasks={tasks}
                     removeTasks={removeTasks}
                     changeTaskStatus={props.changeTaskStatus}
                 />
             </>
             <div style={{display: "flex", justifyContent: "space-between"}}>
                 <TestButton btnClass={props.filter === "all" ? "btn_active" : ""}
                             callback={() => changeFilterHandler('all')} title={"All"}/>
                 <TestButton btnClass={props.filter === "active" ? "btn_active" : ""}
                             callback={() => changeFilterHandler('active')} title={"Active"}/>
                 <TestButton btnClass={props.filter === "completed" ? "btn_active" : ""}
                             callback={() => changeFilterHandler('completed')} title={"Completed"}/>
             </div>
         </div>}

      </div>
   );
};
