import React, {useState} from 'react';
import {FilterValuesType, TaskType} from "../App";

import ButtonTodoList from "../ButtonTodoList";
import TasksList from "./TasksList";
import {AddItemForm} from "./AddItemForm";
import TodoListHeader from "./TodoListHeader";
import {Button} from "@mui/material";

type TodoListPropsType = {
   todoListID: string
   title: string
   tasks: Array<TaskType>
   removeTask: (todoListID: string, id: string) => void
   addTask: (todoListID: string, title: string) => void
   changeFilter: (todoListID: string, filter: FilterValuesType) => void
   changeStatus: (todoListID: string, id: string, isDone: boolean) => void
   filter: FilterValuesType
   removeTodoList: (todoListID: string) => void
   updateTask: (todoListID: string, taskID: string, newTitle: string) => void
   updateTodoListTitle: (todoListID: string, newTitle: string) => void
}

const TodoList = (props: TodoListPropsType) => {
   const addTaskHandler = (NewTitle: string) => {
      props.addTask(props.todoListID, NewTitle)
   }

   return (
      <div>
         <TodoListHeader updateTodoListTitle={props.updateTodoListTitle} removeTodoList={props.removeTodoList} todoListID={props.todoListID} title={props.title}/>
         <AddItemForm callBack={addTaskHandler} />
         <TasksList tasks={props.tasks}
                    removeTask={props.removeTask}
                    changeStatus={props.changeStatus}
                    todoListID={props.todoListID}
                    updateTask={props.updateTask}
         />
         <div>
            <Button variant={props.filter === "all" ? "outlined" : "contained"} color="secondary" onClick={() => props.changeFilter(props.todoListID,"all")}>
               All
            </Button>
            <Button variant={props.filter === "active" ? "outlined" : "contained"} color="success"  onClick={() => props.changeFilter(props.todoListID,"active")}>
               Active
            </Button>
            <Button variant={props.filter === "completed" ? "outlined" : "contained"} color="error" onClick={() => props.changeFilter(props.todoListID,"completed")}>
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
};

export default TodoList;
