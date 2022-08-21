import React, {useCallback, useEffect} from 'react';
import {useAppSelector} from "../../app/store";
import {useSelector} from "react-redux";
import {Grid, Paper} from "@mui/material";
import {AddItemForm, AddItemFormSubmitHelperType} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./Todolist/TodoList";
import {Navigate} from "react-router-dom";
import {selectIsLoggedInAC} from "../Auth/selectors";
import {todolistsActions} from "./index";
import {useActions, useAppDispatch} from "../../utils/redux-utils";

type PropsType = {
   demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false, ...props}) => {
   const todolists = useAppSelector(state => state.todolists)
   const tasks = useAppSelector(state => state.tasks)
   const isLoggedIn = useSelector(selectIsLoggedInAC)

   const dispatch = useAppDispatch();

   const {fetchTodolistsTC} = useActions(todolistsActions)


   const addTodolistCallback = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
      let thunk = todolistsActions.addTodolistTC(title)
      const resultAction = await dispatch(thunk)

      if (todolistsActions.addTodolistTC.rejected.match(resultAction)) {
         if (resultAction.payload?.errors?.length) {
            const errorMessage = resultAction.payload?.errors[0]
            helper.setError(errorMessage)
         } else {
            helper.setError('Some error occured')
         }
      } else {
         helper.setTitle('')
      }
   }, [])

   useEffect(() => {
      if (demo || !isLoggedIn) {
         return
      }
      if (!todolists.length) {
         fetchTodolistsTC()
      }
   }, [])


   if (!isLoggedIn) {
      return <Navigate to={'login'}/>
   }
   return <>
      <Grid container style={{padding: '20px'}}>
         <AddItemForm addItem={addTodolistCallback}/>
      </Grid>
      <Grid container spacing={3}>
         {
            todolists.map(tl => {
               let allTodolistTasks = tasks[tl.id]

               return <Grid item key={tl.id}>
                  <Paper style={{padding: '10px'}}>
                     <TodoList todolist={tl}
                               tasks={allTodolistTasks}
                               demo={demo}
                     />
                  </Paper>
               </Grid>
            })
         }
      </Grid>
   </>
};