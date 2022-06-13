import {WednesdayInput} from "./WednesdayInput";
import {WednesdayTodoListHeader} from "./WednesdayTodoListHeader";
import {WednesdayButton} from "./WednesdayButton";
import {WednesdayTaskList} from "./WednesdayTaskList";
import {WednesdayFilterValueType, WednesdayTaskType} from "./Wednesday";
import {FC, useCallback, useState} from "react";
import {FilterValuesType} from "../TodoActual/App";
import classes from "./Wednesday.module.css";
import {WednesdayAddItemForm} from "./WednesdayAddItemForm";
import todoList from "../TodoActual/components/TodoList";

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

   const onAllClickHandler = useCallback(() => changeFilter(props.todoListID, 'all'), [])
   const onActiveClickHandler = useCallback(() => changeFilter(props.todoListID, 'active'), [])
   const onCompletedClickHandler = useCallback(() => changeFilter(props.todoListID, 'completed'), [])

   const addTaskHandler = useCallback((title: string) => {
      addTask(props.todoListID, title)
   }, [addTask, [props.todoListID]])

   return (
      <div>
         <WednesdayTodoListHeader updateTodoListTitle={props.updateTodoListTitle}
                                  todoListID={props.todoListID}
                                  removeTodoList={props.removeTodoList}
                                  title={props.TasksHeaderTitle}
                                  callBack={() => collapsedTasks(!collapsed)}
         />
         {collapsed && <div>
             <WednesdayAddItemForm callBack={addTaskHandler}/>
             <>
                 <WednesdayTaskList todoListID={props.todoListID}
                                    tasks={tasks}
                                    removeTasks={removeTasks}
                                    changeTaskStatus={props.changeTaskStatus}
                                    updateTask={props.updateTask}
                                    filter={props.filter}
                 />
             </>
             <div style={{display: "flex", justifyContent: "space-between"}}>
                 <WednesdayButton btnClass={props.filter === "all" ? "btn_active" : ""}
                                  callback={onAllClickHandler}
                                  title={"All"}
                 />
                 <WednesdayButton btnClass={props.filter === "active" ? "btn_active" : ""}
                                  callback={onActiveClickHandler}
                                  title={"Active"}
                 />
                 <WednesdayButton btnClass={props.filter === "completed" ? "btn_active" : ""}
                                  callback={onCompletedClickHandler}
                                  title={"Completed"}
                 />
             </div>
         </div>}

      </div>
   );
};
