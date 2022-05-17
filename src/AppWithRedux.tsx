import React, {useCallback, useReducer} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {Container, Grid, Paper} from "@mui/material";
import ButtonAppBar from "./components/ButtonAppBar";
import {
   addTodolistAC,
   changeFilterAC,
   changeTodoListTitle,
   removeTodoListAC,
   todolistsReducer
} from "./state/todolists-reducer";
import {
   addTaskAC,
   changeTaskStatusAC,
   removeTaskAC,
   tasksReducer,
   updateTaskTitleAC
} from "./state/tasks-reducers";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksStateType} from "./state/tasks-reducers.test";
import {Wednesday} from "./Wednesday/Wednesday";

export type TaskType = {
   id: string
   title: string
   isDone: boolean //выполнено ли
}

export type TodoListsType = {
   id: string
   title: string
   filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed"

export type taskObjectType = {
   [key: string]: Array<TaskType>
}


function AppWithRedux() {
   //С - create
   //R - read !!!!!!
   //U - update
   //D - delete

   const todolists = useSelector<AppRootStateType, Array<TodoListsType>>(state => state.todolists)
   const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
   const dispatch = useDispatch()

   //todolists
   const removeTodoList = useCallback((todoListID: string) => {
      dispatch(removeTodoListAC(todoListID))
   }, [dispatch])

   const addTodoList = useCallback((title: string) => {
      dispatch(addTodolistAC(title))
   }, [dispatch])

   const updateTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
      dispatch(changeTodoListTitle(todoListID, newTitle))
   }, [dispatch])

   const changeFilter = useCallback((todoListID: string, filter: FilterValuesType) => {
      dispatch(changeFilterAC(todoListID, filter))
   }, [dispatch])

   //tasks
   const removeTask = useCallback((todoListID: string, taskID: string) => {
      dispatch(removeTaskAC(todoListID, taskID))
   }, [dispatch])

   const addTask = useCallback((todoListID: string, title: string) => {
      dispatch(addTaskAC(todoListID, title))
   }, [dispatch])

   const updateTask = useCallback((todoListID: string, taskID: string, newTitle: string) => {
      dispatch(updateTaskTitleAC(todoListID, taskID, newTitle))
   }, [dispatch])

   const changeStatus = useCallback((todoListID: string, taskID: string, isDoneValue: boolean) => {
      dispatch(changeTaskStatusAC(todoListID, taskID, isDoneValue))
   }, [dispatch])

   return (
      <div className="App">
         <ButtonAppBar/>

         <Container fixed>
            <Grid container style={{padding: '20px'}}>
               <AddItemForm callBack={addTodoList}/>
            </Grid>

            <Grid container spacing={3}>

               {todolists.map((tdl) => {
                  let allTodolistTasks = tasks[tdl.id]
                  let tasksForTodoList = allTodolistTasks

                  return (<Grid item key={tdl.id}>
                        <Paper style={{padding: '10px'}}>
                           <TodoList
                              key={tdl.id}
                              todoListID={tdl.id}
                              title={tdl.title}
                              tasks={tasksForTodoList}
                              removeTask={removeTask}
                              addTask={addTask}
                              changeFilter={changeFilter}
                              changeStatus={changeStatus}
                              filter={tdl.filter}
                              removeTodoList={removeTodoList}
                              updateTask={updateTask}
                              updateTodoListTitle={updateTodoListTitle}
                           />
                        </Paper>
                     </Grid>
                  )

               })}

               {/*<AppReducers />*/}
               {/*<Test2 />*/}
               {/*<Tuesday />*/}
               {/*<Wednesday />*/}
            </Grid>

         </Container>
      </div>
   );
}

export default AppWithRedux;