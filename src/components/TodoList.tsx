import React, {useCallback, useEffect} from 'react';

import TasksList from "./TasksList";
import {AddItemForm} from "./AddItemForm";
import TodoListHeader from "./TodoListHeader";
import {Button} from "@mui/material";
import {TaskStatuses, TaskType} from "../api/todolists-api";
import {FilterValuesType} from "../state/todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../state/tasks-reducers";
import {RequestStatusType} from "../state/app-reducer";

type TodoListPropsType = {
   todoListID: string
   title: string
   tasks: Array<TaskType>
   removeTask: (todoListID: string, id: string) => void
   addTask: (todoListID: string, title: string) => void
   changeTodolistFilter: (todoListID: string, filter: FilterValuesType) => void
   changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
   filter: FilterValuesType
   removeTodoList: (todoListID: string) => void
   changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
   changeTodolistTitle: (todoListID: string, newTitle: string) => void
   entityStatus: RequestStatusType
}

export const TodoList = React.memo((props: TodoListPropsType) => {
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(fetchTasksTC(props.todoListID))
   }, [])


   const addTaskHandler = useCallback((NewTitle: string) => {
      props.addTask(props.todoListID, NewTitle)
   }, [props.addTask, props.todoListID])

   const onAllClickHandler = useCallback(() => props.changeTodolistFilter(props.todoListID,"all"), [props.todoListID, props.changeTodolistFilter])
   const onActiveClickHandler = useCallback(() => props.changeTodolistFilter(props.todoListID,"active"), [props.todoListID, props.changeTodolistFilter])
   const onCompletedClickHandler = useCallback(() => props.changeTodolistFilter(props.todoListID,"completed"), [props.todoListID, props.changeTodolistFilter])
   debugger
   return (
      <div>
         <TodoListHeader changeTodolistTitle={props.changeTodolistTitle} removeTodoList={props.removeTodoList} todoListID={props.todoListID} title={props.title} entityStatus={props.entityStatus}/>
         <AddItemForm callBack={addTaskHandler} entityStatus={props.entityStatus}/>
         <TasksList tasks={props.tasks}
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    todoListID={props.todoListID}
                    changeTaskTitle={props.changeTaskTitle}
                    filter={props.filter}
         />
         <div>
            <Button variant={props.filter === "all" ? "outlined" : "contained"} color="secondary" onClick={onAllClickHandler}>
               All
            </Button>
            <Button variant={props.filter === "active" ? "outlined" : "contained"} color="success"  onClick={onActiveClickHandler}>
               Active
            </Button>
            <Button variant={props.filter === "completed" ? "outlined" : "contained"} color="error" onClick={onCompletedClickHandler}>
               Compleated
            </Button>


            {/*<ButtonTodoList btnClass={props.filter === "all" ? "btn_active" : ""}*/}
            {/*                onClickHandler={() => props.changeFilter(props.todoListID,"all")}*/}
            {/*                title={"All"}*/}
            {/*/>*/}
            {/*<ButtonTodoList btnClass={props.filter === "active" ? "btn_active" : ""}*/}
            {/*                onClickHandler={() => props.changeFilter(props.todoListID,"active")}*/}
            {/*                title={"Active"}*/}
            {/*/>*/}
            {/*<ButtonTodoList btnClass={props.filter === "completed" ? "btn_active" : ""}*/}
            {/*                onClickHandler={() => props.changeFilter(props.todoListID,"completed")}*/}
            {/*                title={"Completed"}*/}
            {/*/>*/}
         </div>
      </div>
   );
})
