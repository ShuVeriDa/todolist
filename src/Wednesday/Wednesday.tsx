import {WednesdayTodoList} from "./WednesdayTodoList";
import {useCallback} from "react";
import {WednesdayAddItemForm} from "./WednesdayAddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {WednesdayAppRootStateType} from "./state/storeWednesday";
import {
   addTaskAC,
   addTodolistAC,
   changeTaskStatusAC,
   removeTaskAC,
   removeTodoListAC,
   updateTaskTitleAC
} from "./state/tasks-reducers";
import {changeFilterAC, changeTodoListTitleAC} from "./state/todolists-reducer";


export type WednesdayTaskType = {
   id: string
   name: string
   isDone: boolean
}

export type WednesdayTodoListType = {
   id: string
   title: string
   filter: WednesdayFilterValueType
}

export type WednesdayTaskObjectType = {
   [key: string]: WednesdayTaskType[]
}

export type WednesdayFilterValueType = "all" | "active" | "completed"

export const Wednesday = () => {
   const todolists = useSelector<WednesdayAppRootStateType, WednesdayTodoListType[]>(state => state.todolists)
   const tasks = useSelector<WednesdayAppRootStateType, WednesdayTaskObjectType>(state => state.tasks)
   const dispatch = useDispatch()

   //Todolist
   const addTodoListHandler = useCallback((newTitle: string) => {
      dispatch(addTodolistAC(newTitle))
   }, [dispatch])

   const removeTodoList = useCallback((todoListID: string) => {
     dispatch(removeTodoListAC(todoListID))
   }, [dispatch])

   const changeFilter = useCallback((todoListID: string, filter: WednesdayFilterValueType) => {
      dispatch(changeFilterAC(todoListID, filter))
   }, [dispatch])

   const updateTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
      dispatch(changeTodoListTitleAC(todoListID, newTitle))
   }, [dispatch])

   //addTask
   const addTask = useCallback((todoListID: string, title: string) => {
      dispatch(addTaskAC(todoListID, title))
   }, [dispatch])

   const removeTasks = useCallback((todoListID: string, taskID: string) => {
      dispatch(removeTaskAC(todoListID, taskID))
   }, [])

   const changeStatus = useCallback((todoListID: string, taskID: string, isDone: boolean) => {
      dispatch(changeTaskStatusAC(todoListID, taskID, isDone))
   }, [])

   const updateTask = useCallback((todoListID: string, taskID: string, newTitle: string) => {
      dispatch(updateTaskTitleAC(todoListID, taskID, newTitle))
   }, [])

   return (
      <div>
         <WednesdayAddItemForm callBack={addTodoListHandler}/>
         {todolists.map(tdl => {

               let allTodolistTasks = tasks[tdl.id]
               let tasksForTodolist = allTodolistTasks
               return (
                  <WednesdayTodoList key={tdl.id}
                                     todoListID={tdl.id}
                                     TasksHeaderTitle={tdl.title}
                                     tasks={tasksForTodolist}
                                     removeTasks={removeTasks}
                                     addTask={addTask}
                                     changeFilter={changeFilter}
                                     changeTaskStatus={changeStatus}
                                     filter={tdl.filter}
                                     updateTask={updateTask}
                                     removeTodoList={removeTodoList}
                                     updateTodoListTitle={updateTodoListTitle}
                  />
               )
            })
         }

      </div>
   );
};