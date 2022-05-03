import {WednesdayInput} from "./WednesdayInput";
import {WednesdayTodoListHeader} from "./WednesdayTodoListHeader";
import {WednesdayButton} from "./WednesdayButton";
import {WednesdayTaskList} from "./WednesdayTaskList";
import {WednesdayFilterValueType, WednesdayTaskType} from "./Wednesday";
import {FC, useState} from "react";
import {FilterValuesType} from "../App";
import classes from "./Wednesday.module.css";
import {WednesdayAddItemForm} from "./WednesdayAddItemForm";
import todoList from "../components/TodoList";

export type TestTodoListType = {
   tasks: Array<WednesdayTaskType>
   removeTasks: (todoListID: string, taskID: string) => void
   addTask: (todoListID: string, title: string) => void
   changeFilter: (todoListID: string, filter: WednesdayFilterValueType) => void
   changeTaskStatus: (todoListID: string, taskID: string, isDone: boolean) => void
   filter: WednesdayFilterValueType
   TasksHeaderTitle: string
   todoListID: string
   updateTask: (todoListID: string, taskID: string, newTitle: string) => void
   removeTodoList: (todoListID: string) => void
   updateTodoListTitle: (todoListID: string, newTitle: string) => void
}

export const WednesdayTodoList: FC<TestTodoListType> = ({tasks, removeTasks, addTask, changeFilter, ...props}) => {
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
         <WednesdayTodoListHeader updateTodoListTitle={props.updateTodoListTitle} todoListID={props.todoListID} removeTodoList={props.removeTodoList} title={props.TasksHeaderTitle} callBack={() => collapsedTasks(!collapsed)}/>
         { collapsed && <div>
             <>
                 <WednesdayAddItemForm callBack={addTaskHandler} />
             </>
             <>
                 <WednesdayTaskList
                     todoListID={props.todoListID}
                     tasks={tasks}
                     removeTasks={removeTasks}
                     changeTaskStatus={props.changeTaskStatus}
                     updateTask={props.updateTask}
                 />
             </>
             <div style={{display: "flex", justifyContent: "space-between"}}>
                 <WednesdayButton btnClass={props.filter === "all" ? "btn_active" : ""}
                                  callback={() => changeFilterHandler('all')} title={"All"}/>
                 <WednesdayButton btnClass={props.filter === "active" ? "btn_active" : ""}
                                  callback={() => changeFilterHandler('active')} title={"Active"}/>
                 <WednesdayButton btnClass={props.filter === "completed" ? "btn_active" : ""}
                                  callback={() => changeFilterHandler('completed')} title={"Completed"}/>
             </div>
         </div>}

      </div>
   );
};
