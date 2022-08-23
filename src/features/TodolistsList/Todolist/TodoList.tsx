import React, {useCallback} from 'react';
import TasksList from "../../TaskList/TasksList";
import {AddItemForm, AddItemFormSubmitHelperType} from "../../../components/AddItemForm/AddItemForm";
import TodoListHeader from "../../../components/TodoListHeader/TodoListHeader";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {TaskType} from "../../../api/types";
import {tasksActions, todolistsActions} from "../index";
import {useActions, useAppDispatch} from "../../../utils/redux-utils";
import {Button, Paper} from "@mui/material";

type TodoListPropsType = {
   todolist: TodolistDomainType
   tasks: Array<TaskType>
   demo?: boolean
}

export const TodoList = React.memo(({demo = false, todolist, tasks, ...props}: TodoListPropsType) => {
   const {changeTodolistFilterAC, removeTodolistTC, changeTodolistTitleTC} = useActions(todolistsActions)

   const dispatch = useAppDispatch()

   const addTaskCallback = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
      let thunk = tasksActions.addTaskTC({todolistId: todolist.id, title: title})
      const resultAction = await dispatch(thunk)

      if (tasksActions.addTaskTC.rejected.match(resultAction)) {
         if (resultAction.payload?.errors?.length) {
            const errorMessage = resultAction.payload?.errors[0]
            helper.setError(errorMessage)
         } else {
            helper.setError('Some error occured')
         }
      } else {
         helper.setTitle('')
      }

   }, [todolist.id])

   const removeTodolist = () => {
      removeTodolistTC(todolist.id)
   }

   const changeTodolistTitle = useCallback((title: string) => {
      changeTodolistTitleTC({todolistId: todolist.id, title: title})
   }, [todolist.id])

   const onFilterButtonClickHandler = useCallback((filter: FilterValuesType) => changeTodolistFilterAC({
      filter: filter,
      todolistId: todolist.id
   }), [todolist.id])

   // const renderFilterButton = (buttonFilter: FilterValuesType,
   //                             color: string,
   //                             text: string) => {
   //    return <Button variant={todolist.filter === buttonFilter ? 'outlined' : 'text'}
   //                   onClick={() => onFilterButtonClickHandler(buttonFilter)}
   //                   color={color}>{text}
   //    </Button>
   // }
   return (
      <Paper style={{padding: '10px', position: 'relative'}}>
         <TodoListHeader changeTodolistTitle={changeTodolistTitle}
                         removeTodoList={removeTodolist}
                         todolistId={todolist.id}
                         title={todolist.title}
                         entityStatus={todolist.entityStatus}
         />
         <AddItemForm addItem={addTaskCallback} entityStatus={todolist.entityStatus}/>
         <TasksList tasks={tasks}
                    todolistId={todolist.id}
                    filter={todolist.filter}
                    demo={demo}
         />
         {/*<div style={{paddingTop: '10px'}}>*/}
         {/*   {renderFilterButton('all', 'default', 'All')}*/}
         {/*   {renderFilterButton('active', 'primary', 'Active')}*/}
         {/*   {renderFilterButton('completed', 'secondary', 'Completed')}*/}
         {/*</div>*/}
      </Paper>
   );
})
