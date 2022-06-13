import React from 'react';
import ButtonTodoList from "../ButtonTodoList";
import {EditableSpan} from "./EditableSpan";
import {Button} from "@mui/material";
import {RequestStatusType} from "../state/app-reducer";
import {Delete} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

type TodoListHeaderPropsType = {
   todoListID: string
   title: string
   removeTodoList: (todoListID: string) => void
   changeTodolistTitle: (todoListID: string, newTitle: string) => void
   entityStatus?: RequestStatusType
}

const TodoListHeader = (props: TodoListHeaderPropsType) => {
   const removeTodoListHandler = () => {
      props.removeTodoList(props.todoListID)
   }

   const EditableSpanForH3Handler = (newTitle: string) => {
      debugger
      props.changeTodolistTitle(props.todoListID, newTitle)
   }

   return (
      <div>
         <h3>
            <EditableSpan title={props.title} callBack={EditableSpanForH3Handler} />
            {/*<ButtonTodoList title={'x'} onClickHandler={removeTodoListHandler}/>*/}
            {/*<Button disabled={props.entityStatus === 'loading'}  onClick={removeTodoListHandler} size="small" variant="contained">x</Button>*/}
            <IconButton onClick={removeTodoListHandler} disabled={props.entityStatus === 'loading'} >
               <Delete/>
            </IconButton>
         </h3>
      </div>
   );
};

export default TodoListHeader;
