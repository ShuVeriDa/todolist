import {WednesdayTodoList} from "./WednesdayTodoList";
import {useState} from "react";
import {v1} from "uuid";
import classes from './Wednesday.module.css'
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
   const addTodoListHandler = (newTitle: string) => {
      dispatch(addTodolistAC(newTitle))
   }

   const removeTodoList = (todoListID: string) => {
     dispatch(removeTodoListAC(todoListID))
   }

   const changeFilter = (todoListID: string, filter: WednesdayFilterValueType) => {
      dispatch(changeFilterAC(todoListID, filter))
   }

   const updateTodoListTitle = (todoListID: string, newTitle: string) => {
      dispatch(changeTodoListTitleAC(todoListID, newTitle))
   }

   //addTask
   const addTask = (todoListID: string, title: string) => {
      dispatch(addTaskAC(todoListID, title))
   }

   const removeTasks = (todoListID: string, taskID: string) => {
      dispatch(removeTaskAC(todoListID, taskID))
   }

   const changeStatus = (todoListID: string, taskID: string, isDone: boolean) => {
      dispatch(changeTaskStatusAC(todoListID, taskID, isDone))
   }

   const updateTask = (todoListID: string, taskID: string, newTitle: string) => {
      dispatch(updateTaskTitleAC(todoListID, taskID, newTitle))
   }

   return (
      <div>
         <WednesdayAddItemForm callBack={addTodoListHandler}/>
         {todolists.map(tdl => {

               let tasksForTodoList = tasks[tdl.id]
               switch (tdl.filter) {
                  case 'active':
                     tasksForTodoList = tasks[tdl.id].filter(f => !f.isDone)
                     break
                  case "completed":
                     tasksForTodoList = tasks[tdl.id].filter(f => f.isDone)
                     break
                  default:
                     tasksForTodoList = tasks[tdl.id]
               }
               return (
                  <WednesdayTodoList key={tdl.id}
                                     todoListID={tdl.id}
                                     TasksHeaderTitle={tdl.title}
                                     tasks={tasksForTodoList}
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