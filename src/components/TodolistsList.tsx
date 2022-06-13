import React, {useCallback, useEffect} from 'react';
import {useAppSelector} from "../state/store";
import {useDispatch} from "react-redux";
import {
   addTodolistTC, changeTodolistFilterAC,
   changeTodolistTitleTC,
   fetchTodolistsTC,
   FilterValuesType,
   removeTodolistTC
} from "../state/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../state/tasks-reducers";
import {TaskStatuses} from "../api/todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "./AddItemForm";
import {Todolist} from "../Reducers/Todolist";
import {TodoList} from "./TodoList";

export const TodolistsList = () => {
   const todolists = useAppSelector(state => state.todolists)
   const tasks = useAppSelector(state => state.tasks)

   const dispatch = useDispatch();

   useEffect(() => {
      debugger
      dispatch(fetchTodolistsTC())
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
      dispatch(changeTodolistFilterAC(todolistId, filter))
   }, [dispatch])


   //tasks
   const addTask = useCallback((todolistId: string, title: string) => {
      dispatch(addTaskTC(todolistId, title))
   }, [dispatch])

   const removeTask = useCallback((todolistId: string, taskId: string) => {
      dispatch(removeTaskTC(todolistId, taskId))
   }, [dispatch])

   const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
      dispatch(updateTaskTC(todolistId, taskId, {status}))
   }, [dispatch])

   const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
      dispatch(updateTaskTC(todolistId, taskId,{title: newTitle}))
   }, [dispatch])

   return <>
      <Grid container style={{padding: '20px'}}>
         <AddItemForm callBack={addTodoList} />
      </Grid>
      <Grid container spacing={3}>
         {
            todolists.map(tl => {
               let allTodolistTasks = tasks[tl.id]

               return <Grid item key={tl.id}>
                  <Paper style={{padding: '10px'}}>
                     <TodoList
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={allTodolistTasks}
                        removeTask={removeTask}
                        changeTodolistFilter={changeTodolistFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                        entityStatus={tl.entityStatus}
                     />
                  </Paper>
               </Grid>
            })
         }
      </Grid>
   </>
};