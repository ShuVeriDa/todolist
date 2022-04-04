import React from 'react';
import Button from "./Button";
import todoList from "./TodoList";

type TodoListHeaderPropsType = {
   todoListID: string
   title: string
   removeTodoList: (todoListID: string) => void
}

const TodoListHeader = (props: TodoListHeaderPropsType) => {
   const removeTodoListHandler = () => {
      props.removeTodoList(props.todoListID)
   }

   return (
      <div>
         <h3>
            {props.title}
            <Button title={'x'} onClickHandler={removeTodoListHandler}/>
         </h3>
      </div>
   );
};

export default TodoListHeader;
