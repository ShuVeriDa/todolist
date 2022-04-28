import React from 'react';
import ButtonTodoList from "../ButtonTodoList";
import todoList from "./TodoList";
import {EditableSpan} from "./EditableSpan";
import {Button} from "@mui/material";

type TodoListHeaderPropsType = {
   todoListID: string
   title: string
   removeTodoList: (todoListID: string) => void
   updateTodoListTitle: (todoListID: string, newTitle: string) => void
}

const TodoListHeader = (props: TodoListHeaderPropsType) => {
   const removeTodoListHandler = () => {
      props.removeTodoList(props.todoListID)
   }

   const EditableSpanForH3Handler = (newTitle: string) => {
      props.updateTodoListTitle(props.todoListID, newTitle)
   }

   return (
      <div>
         <h3>
            <EditableSpan title={props.title} callBack={EditableSpanForH3Handler} />
            {/*<ButtonTodoList title={'x'} onClickHandler={removeTodoListHandler}/>*/}
            <Button onClick={removeTodoListHandler} size="small" variant="contained">x</Button>
         </h3>
      </div>
   );
};

export default TodoListHeader;
