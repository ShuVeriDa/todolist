import {TuesadayButton} from "./TuesadayButton";

type TuesdayTodoListHeaderPropsType = {
   title: string
   callBack: () => void
   removeTodoList: (todolistID: string) => void
   todoListID: string
}

export const TuesdayTodoListHeader = (props:TuesdayTodoListHeaderPropsType) => {
   const clickHandler = () => {
      props.callBack()
   }

   const removeTodoListHandler = () => {
      props.removeTodoList(props.todoListID)
   }
   return (
      <h3 onClick={clickHandler}>
         {props.title}
         <TuesadayButton title={'x'} callback={removeTodoListHandler} />
      </h3>
   )
}