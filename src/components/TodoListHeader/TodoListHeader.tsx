import React from 'react';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {RequestStatusType} from "../../features/Application/application-reducer";
import {Delete} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

type TodoListHeaderPropsType = {
   todolistId: string
   title: string
   removeTodoList: (todolistId: string) => void
   changeTodolistTitle: ( newTitle: string) => void
   entityStatus?: RequestStatusType
}

const TodoListHeader = (props: TodoListHeaderPropsType) => {
   const removeTodoListHandler = () => {
      props.removeTodoList(props.todolistId)
   }

   const EditableSpanForH3Handler = (newTitle: string) => {
      props.changeTodolistTitle(newTitle)
   }

   return (
      <div>
         <h3>
            <EditableSpan title={props.title} onChange={EditableSpanForH3Handler} />
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
