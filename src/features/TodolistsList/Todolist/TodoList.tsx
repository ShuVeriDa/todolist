import React, {useCallback} from 'react';

import TasksList from "../../TaskList/TasksList";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import TodoListHeader from "../../../components/TodoListHeader/TodoListHeader";
import {Button} from "@mui/material";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {RequestStatusType} from "../../../app/app-reducer";

type TodoListPropsType = {
   todolist: TodolistDomainType
   title: string
   tasks: Array<TaskType>
   filter: FilterValuesType
   entityStatus: RequestStatusType
   demo?: boolean

   removeTodoList: (todoListID: string) => void
   changeTodolistTitle: (todoListID: string, newTitle: string) => void
   changeTodolistFilter: (todoListID: string, filter: FilterValuesType) => void

   removeTask: (todoListID: string, id: string) => void
   addTask: (todoListID: string, title: string) => void
   changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
   changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
}

export const TodoList = React.memo(({demo = false, ...props}: TodoListPropsType) => {

   const addTaskHandler = useCallback((newTitle: string) => {
      props.addTask(props.todolist.id, newTitle)
   }, [props.todolist.id, props.addTask ])

   const onAllClickHandler = useCallback(() => props.changeTodolistFilter(props.todolist.id,"all"), [props.todolist.id, props.changeTodolistFilter])
   const onActiveClickHandler = useCallback(() => props.changeTodolistFilter(props.todolist.id,"active"), [props.todolist.id, props.changeTodolistFilter])
   const onCompletedClickHandler = useCallback(() => props.changeTodolistFilter(props.todolist.id,"completed"), [props.todolist.id, props.changeTodolistFilter])

   return (
      <div>
         <TodoListHeader changeTodolistTitle={props.changeTodolistTitle}
                         removeTodoList={props.removeTodoList}
                         todoListID={props.todolist.id}
                         title={props.title}
                         entityStatus={props.entityStatus}
         />
         <AddItemForm callBack={addTaskHandler} entityStatus={props.entityStatus}/>
         <TasksList tasks={props.tasks}
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    todoListID={props.todolist.id}
                    changeTaskTitle={props.changeTaskTitle}
                    filter={props.filter}
                    demo={demo}
         />
         <div>
            <Button variant={props.filter === "all" ? "outlined" : "contained"} color="secondary" onClick={onAllClickHandler}>
               All
            </Button>
            <Button variant={props.filter === "active" ? "outlined" : "contained"} color="success"  onClick={onActiveClickHandler}>
               Active
            </Button>
            <Button variant={props.filter === "completed" ? "outlined" : "contained"} color="error" onClick={onCompletedClickHandler}>
               Completed
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
