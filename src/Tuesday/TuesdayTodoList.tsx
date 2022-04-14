import {TuesdayInput} from "./TuesdayInput";
import {TuesdayTodoListHeader} from "./TuesdayTodoListHeader";
import {TuesadayButton} from "./TuesadayButton";
import {TuesdayTaskList} from "./TuesdayTaskList";
import {TuesdayFilterValueType, TuesdayTaskType} from "./Tuesday";
import {FC, useState} from "react";
import {FilterValuesType} from "../App";
import classes from "./Tuesday.module.css";
import {TuesdayAddItemForm} from "./TuesdayAddItemForm";
import todoList from "../components/TodoList";

export type TestTodoListType = {
   tasks: Array<TuesdayTaskType>
   removeTasks: (todoListID: string, taskID: string) => void
   addTask: (todoListID: string, title: string) => void
   changeFilter: (todoListID: string, filter: TuesdayFilterValueType) => void
   changeTaskStatus: (todoListID: string, taskID: string, isDone: boolean) => void
   filter: TuesdayFilterValueType
   TasksHeaderTitle: string
   todoListID: string
   updateTask: (todoListID: string, taskID: string, newTitle: string) => void
   removeTodoList: (todoListID: string) => void
}

export const TuesdayTodoList: FC<TestTodoListType> = ({tasks, removeTasks, addTask, changeFilter, ...props}) => {
   const [collapsed, setCollapsed] = useState<boolean>(true)
   const collapsedTasks = (b: boolean) => {
      setCollapsed(b)
   }

   const changeFilterHandler = (filterValues: FilterValuesType) => {
      changeFilter(props.todoListID, filterValues)
   }

   const addTaskHandler = (title: string) => {
      addTask(props.todoListID, title)
   }

   return (
      <div>
         <TuesdayTodoListHeader todoListID={props.todoListID} removeTodoList={props.removeTodoList} title={props.TasksHeaderTitle} callBack={() => collapsedTasks(!collapsed)}/>
         { collapsed && <div>
             <>
                 <TuesdayAddItemForm callBack={addTaskHandler} />
             </>
             <>
                 <TuesdayTaskList
                     todoListID={props.todoListID}
                     tasks={tasks}
                     removeTasks={removeTasks}
                     changeTaskStatus={props.changeTaskStatus}
                     updateTask={props.updateTask}
                 />
             </>
             <div style={{display: "flex", justifyContent: "space-between"}}>
                 <TuesadayButton btnClass={props.filter === "all" ? "btn_active" : ""}
                                 callback={() => changeFilterHandler('all')} title={"All"}/>
                 <TuesadayButton btnClass={props.filter === "active" ? "btn_active" : ""}
                                 callback={() => changeFilterHandler('active')} title={"Active"}/>
                 <TuesadayButton btnClass={props.filter === "completed" ? "btn_active" : ""}
                                 callback={() => changeFilterHandler('completed')} title={"Completed"}/>
             </div>
         </div>}

      </div>
   );
};
