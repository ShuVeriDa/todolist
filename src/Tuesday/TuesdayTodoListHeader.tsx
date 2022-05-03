import {TuesadayButton} from "./TuesadayButton";
import {TuesdayEditableSpan} from "./TuesdayEditableSpan";

type TuesdayTodoListHeaderPropsType = {
   title: string
   callBack: () => void
   removeTodoList: (todolistID: string) => void
   todoListID: string
   updateTodoListTitle: (todoListID: string, newTitle: string) => void
}

export const TuesdayTodoListHeader = (props:TuesdayTodoListHeaderPropsType) => {
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
         <TuesdayEditableSpan title={props.title} callBack={EditableSpanForH3Handler} />
         <TuesadayButton title={'x'} callback={removeTodoListHandler} />
      </h3>
   )
}