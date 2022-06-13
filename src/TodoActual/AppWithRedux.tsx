import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {Container, Grid, Paper} from "@mui/material";
import ButtonAppBar from "./components/ButtonAppBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {
   addTodolistAC,
   changeTodolistFilterAC,
   changeTodolistTitleAC,
   fetchTodolistTC, FilterValuesType, removeTodolistAC,
   TodolistDomainType
} from "./state/todolists-reducer";
import {
   addTaskTC, changeTaskTitleAC, deleteTaskTC, updateTaskStatusTC
} from "./state/tasks-reducers";
import {TaskStatuses, TaskType} from "./api/todolists-api";

export type TasksStateType = {
   [key: string]: Array<TaskType>
}

function AppWithRedux() {
   //С - create
   //R - read !!!!!!
   //U - update
   //D - delete

   const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
   const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
   const dispatch = useDispatch();

   useEffect(() => {
      debugger
      dispatch(fetchTodolistTC())
   }, [])

   //todolists
   const addTodoList = useCallback((title: string) => {
      dispatch(addTodolistAC(title))
   }, [dispatch])

   const removeTodoList = useCallback((todolistId: string) => {
      dispatch(removeTodolistAC(todolistId))
   }, [dispatch])

   const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
      dispatch(changeTodolistTitleAC(todolistId, newTitle))
   }, [dispatch])

   const changeTodolistFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
      dispatch(changeTodolistFilterAC(todolistId, filter))
   }, [dispatch])


   //tasks
   const addTask = useCallback((todolistId: string, title: string) => {
      dispatch(addTaskTC(todolistId, title))
   }, [dispatch])

   const removeTask = useCallback((todolistId: string, taskId: string) => {
      dispatch(deleteTaskTC(todolistId, taskId))
   }, [dispatch])

   const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
      dispatch(updateTaskStatusTC(todolistId, taskId, status))
   }, [dispatch])

   const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
      dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
   }, [dispatch])

   debugger

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

                  return (<Grid item key={tdl.id}>
                        <Paper style={{padding: '10px'}}>
                           <TodoList
                              key={tdl.id}
                              todoListID={tdl.id}
                              title={tdl.title}
                              tasks={allTodolistTasks}
                              removeTask={removeTask}
                              addTask={addTask}
                              changeTodolistFilter={changeTodolistFilter}
                              changeTaskStatus={changeTaskStatus}
                              filter={tdl.filter}
                              removeTodoList={removeTodoList}
                              changeTaskTitle={changeTaskTitle}
                              changeTodolistTitle={changeTodolistTitle}
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