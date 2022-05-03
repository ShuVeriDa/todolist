import {WednesdayButton} from "./WednesdayButton";
import {WednesdayEditableSpan} from "./WednesdayEditableSpan";

type WednesdayTodoListHeaderPropsType = {
   title: string
   callBack: () => void
   removeTodoList: (todolistID: string) => void
   todoListID: string
   updateTodoListTitle: (todoListID: string, newTitle: string) => void
}

export const WednesdayTodoListHeader = (props:WednesdayTodoListHeaderPropsType) => {
   const clickHandler = () => {
      props.callBack()
   }

   const removeTodoListHandler = () => {
      props.removeTodoList(props.todoListID)
   }

   const EditableSpanForH3Handler = (newTitle: string) => {
      props.updateTodoListTitle(props.todoListID, newTitle)
   }

   return (
      <h3 onClick={clickHandler}>
         <WednesdayEditableSpan title={props.title} callBack={EditableSpanForH3Handler} />
         <WednesdayButton title={'x'} callback={removeTodoListHandler} />
      </h3>
   )
}