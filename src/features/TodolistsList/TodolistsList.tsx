import React, {useCallback, useEffect} from 'react';
import {useAppSelector} from "../../app/store";
import {useDispatch} from "react-redux";
import {
   addTodolistTC, changeTodolistFilterAC,
   changeTodolistTitleTC,
   fetchTodolistsTC,
   FilterValuesType,
   removeTodolistTC
} from "./todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./tasks-reducers";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./Todolist/TodoList";
import {Navigate} from "react-router-dom";

type PropsType = {
   demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false, ...props}) => {
   const todolists = useAppSelector(state => state.todolists)
   const tasks = useAppSelector(state => state.tasks)
   const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
   const dispatch = useDispatch();

   useEffect(() => {
      if (!isLoggedIn) {
         return;
      }
      const thunk = fetchTodolistsTC()
      dispatch(thunk)
   }, [])

   //todolists
   const addTodoList = useCallback((title: string) => {
      dispatch(addTodolistTC(title))
   }, [dispatch])

   const removeTodoList = useCallback((todolistId: string) => {
      dispatch(removeTodolistTC(todolistId))
   }, [dispatch])

   const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
      dispatch(changeTodolistTitleTC(todolistId, newTitle))
   }, [dispatch])

   const changeTodolistFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
      dispatch(changeTodolistFilterAC({todolistId, filter}))
   }, [dispatch])


   //tasks
   const addTask = useCallback((todolistId: string, title: string) => {
      dispatch(addTaskTC({todolistId, title}))
   }, [dispatch])

   const removeTask = useCallback((todolistId: string, taskId: string) => {
      dispatch(removeTaskTC({todolistId, taskId}))
   }, [dispatch])

   const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
      dispatch(updateTaskTC({todolistId, taskId, model:{status}}))
   }, [dispatch])

   const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
      dispatch(updateTaskTC({todolistId, taskId, model:{title: newTitle}}))
   }, [dispatch])

   if (!isLoggedIn) {
      return <Navigate to={'login'}/>
   }
   return <>
      <Grid container style={{padding: '20px'}}>
         <AddItemForm callBack={addTodoList}/>
      </Grid>
      <Grid container spacing={3}>
         {
            todolists.map(tl => {
               let allTodolistTasks = tasks[tl.id]

               return <Grid item key={tl.id}>
                  <Paper style={{padding: '10px'}}>
                     <TodoList todolist={tl}
                               title={tl.title}
                               tasks={allTodolistTasks}
                               filter={tl.filter}
                               entityStatus={tl.entityStatus}
                               demo={demo}

                               removeTodoList={removeTodoList}
                               changeTodolistFilter={changeTodolistFilter}
                               changeTodolistTitle={changeTodolistTitle}

                               addTask={addTask}
                               removeTask={removeTask}
                               changeTaskTitle={changeTaskTitle}
                               changeTaskStatus={changeTaskStatus}
                     />
                  </Paper>
               </Grid>
            })
         }
      </Grid>
   </>
};